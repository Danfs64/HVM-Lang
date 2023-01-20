import {
    ValidationAcceptor,
    ValidationChecks
} from 'langium';
import { Constructor, Expression, File, HvmAstType, isConstructor, isTerm, isVariable, Statement } from './generated/ast';
import type { HvmServices } from './hvm-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HvmServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HvmValidator;
    const checks: ValidationChecks<HvmAstType> = {
        File: validator.checkArity,
        Expression: validator.checkVariables,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HvmValidator {
    /**
     * Given an expression, check its LHS for repeated variables,
     * and then check its RHS for unbound variables
     */
    checkVariables(exp: Expression, accept: ValidationAcceptor): void {
        /**
         * Return the set of variables names of a LHS Constructor
         * It highlights warnings on repeated variables
         */
        const get_LHS_vars = (c: Constructor, vars_so_far: Set<string>) : Set<string> => {
            // Add its vars to the set of variable names
            for(const v of c.args) {
                if(isVariable(v)) {
                    const var_name = v.name
                    if(vars_so_far.has(var_name)) {
                        accept('warning', "A variable with the same name is already declared", { node: v })
                    } else {
                        vars_so_far.add(var_name)
                    }
                }
            }
            // Recursively checks the nested constructors
            for(const cons of c.args) {
                if(isConstructor(cons)) {
                    get_LHS_vars(cons, vars_so_far)
                }
            }
            return vars_so_far
        }

        /**
         * Checks if every variable used inside the Statement is reachable,
         * either from the LHS, or from a let/lambda
         */
        const check_vars = (s: Statement, accesible_vars: Set<string>) : void => {
            switch (s.$type) {
                case 'Variable':
                    if(!accesible_vars.has(s.name)) {
                        accept('error', "Unbound variable", { node: s })
                    }
                    break;
                case 'LetStatement':
                    check_vars(s.value, accesible_vars)
                case 'LambdaStatement':
                    accesible_vars.add(s.var.name)
                    check_vars(s.continuation, accesible_vars)
                    accesible_vars.delete(s.var.name)
                    break
                case 'BinaryOP':
                    check_vars(s.arg1, accesible_vars)
                    check_vars(s.arg2, accesible_vars)
                    break
                case 'Constructor':
                    for(const x of s.args) {
                        if(isTerm(x)) {
                            check_vars(x, accesible_vars)
                        }
                    }
                    break
                default:
                    break
            }
        }

        const lhs_vars = get_LHS_vars(exp.lhs, new Set<string>())
        check_vars(exp.rhs, lhs_vars)
    }

    /**
     * Given a File, check if every LHS constructor has consistent arity
     */
    checkArity(file: File, accept: ValidationAcceptor): void {
        const map = new Map<string, number>()

        for(const exp of file.expressions) {
            const cons = exp.lhs
            const arity = map.get(cons.name)
            // First time reading this constructor, save the arity
            if(arity === undefined) {
                map.set(cons.name, cons.args.length)
            }
            // Not first time reading it, check the arity against the one saved
            else if(arity !== cons.args.length) {
                accept("error", "This constructor has inconsistent arity compared to a previously declared one", { node: cons })
            }
        }
    }
}
