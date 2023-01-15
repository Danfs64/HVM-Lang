hidden terminal WS: /\s+/;
// terminal ID: /[_a-zA-Z][\w_]*/;
terminal NOT_CAPITALIZED_ID: /[a-z][\w_]*/;
terminal CAPITALIZED_ID: /[A-Z][\w_]*/;
terminal U60 returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'|`[^`]*`/;

// hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
