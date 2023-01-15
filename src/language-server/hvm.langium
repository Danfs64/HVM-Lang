grammar Hvm

import 'terminals'

entry File:
    (constructors+=Constructor)*
;

Constructor:
    NullaryConstructor // | N_aryConstructor
;

NullaryConstructor infers Constructor:
    name=CAPITALIZED_ID
;

N_aryConstructor infers Constructor:
    '('name=CAPITALIZED_ID (args+=(NOT_CAPITALIZED_ID | U60 | Constructor))* ')'
;

ConstructorDefinition:
    lhs=Constructor '=' rhs=Statement
;

Statement:
    '(' Statement ')' | Constructor // | BinaryOP | STRING
;

// BinaryOP:
//     '(' op=Operator arg1=(U60|BinaryOP) arg2=(U60|BinaryOP) ')'
// ;

// Operator returns string:
//     MathOperator | BitwiseOperator | EqualityOperator
// ;

// MathOperator returns string:
//     '+' | '-' | '*' | '/' | '%'
// ;

// BitwiseOperator returns string:
//     '&' | '||' | '<<' | '>>'
// ;

// EqualityOperator returns string:
//     '==' | '!=' | '<' | '<=' | '>' | '>='
// ;
