grammar Hvm

import 'terminals'

entry File:
    (expressions+=Expression)*
;

// An expression is a non-RHS Constructor followed by a Statement
Expression:
    lhs=Constructor<false> '=' rhs=Statement
;

// <--- Constructors -->

// A Constructor can have no arguments or have 'n' arguments
Constructor<isRHS>:
    NullaryConstructor | N_aryConstructor<isRHS>
;

// A Nullary Constructor is just a capitalized name
NullaryConstructor infers Constructor:
    name=CAPITALIZED_ID
;

// A N-ary Constructor is always between parenthesis
// A N-ary Constructor on the RHS can have BinaryOPs as arguments, on the LHS it can not
N_aryConstructor<isRHS> infers Constructor:
    '(' name=CAPITALIZED_ID (
        <!isRHS> (args+=(Constructor<false> | Variable | U60 | STRING))*
        |<isRHS> (args+=Term)*
    )')'
;

// <-- Statements -->

// A Statement can always be between any amount of parenthesis pairs, including none when not mandatory
Statement:
    '(' Statement ')' | Term | LetStatement | LambdaStatement
;

Term:
    Constructor<true> | Variable | BinaryOP | U60 | STRING
;

Variable:
    name=NOT_CAPITALIZED_ID
;

LetStatement:
    'let' var=Variable '=' value=Term (';')?
    continuation=Statement
;

LambdaStatement:
    ('@'|'λ') var=Variable continuation=Statement
;

// <-- U60 operations -->

BinaryOP:
    '(' op=Operator arg1=Term arg2=Term ')'
;

Operator returns string:
    MathOperator | BitwiseOperator | EqualityOperator
;

fragment MathOperator returns string:
    '+' | '-' | '*' | '/' | '%'
;

fragment BitwiseOperator returns string:
    '&' | '||' | '<<' | '>>'
;

fragment EqualityOperator returns string:
    '==' | '!=' | '<' | '<=' | '>' | '>='
;
