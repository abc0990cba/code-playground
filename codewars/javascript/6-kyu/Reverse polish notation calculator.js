// 6 kyu
// Reverse polish notation calculator
// https://www.codewars.com/kata/52f78966747862fc9a0009ae/

// Task description:
// Your job is to create a calculator which evaluates expressions in Reverse Polish notation.
// For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.
// For your convenience, the input is formatted such that a space is provided between every token.
// Empty expression should evaluate to 0.
// Valid operations are +, -, *, /.
// You may assume that there won't be exceptional situations (like stack underflow or division by zero).

// Solution:
function calc(expression) {
    if (expression === '') {
        return 0;
    }
 
    // \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
    let exprArr = expression.split(/\s/);
    const stack = [];
  
    const operators = {
      "+": (a, b) => stack.push(parseFloat(a) + parseFloat(b)),
      "-": (a, b) => stack.push(parseFloat(b) - parseFloat(a)), 
      "*": (a, b) => stack.push(parseFloat(a) * parseFloat(b)),
      "/": (a, b) => stack.push(parseFloat(b) / parseFloat(a)),
      "^": (a, b) => stack.push(Math.pow(parseInt(b), parseInt(a))),
    };
    
    for (let i = 0; i < exprArr.length; i++) {
        if (!isNaN(exprArr[i]) && isFinite(exprArr[i])) {
            stack.push(exprArr[i]);
        } else {
            let a = stack.pop();
            let b = stack.pop();
          
            if (operators[exprArr[i]]) {
              const operator = exprArr[i];
              operators[operator](a, b);
            }
            
        }
    }

    if (stack.length > 1) {
        return "ERROR";
    } else {
        return parseFloat(stack[0]);
    }
}
