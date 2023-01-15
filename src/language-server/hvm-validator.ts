import {
    // ValidationAcceptor,
    ValidationChecks
} from 'langium';
import { HvmAstType } from './generated/ast';
import type { HvmServices } from './hvm-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HvmServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HvmValidator;
    const checks: ValidationChecks<HvmAstType> = {
        // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HvmValidator {

//     checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
//         if (person.name) {
//             const firstChar = person.name.substring(0, 1);
//             if (firstChar.toUpperCase() !== firstChar) {
//                 accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
//             }
//         }
//     }

}
