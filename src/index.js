function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const cleanedExpression = expr.replace(/\s+/g, '').match(/\d+\.?\d*|[-()+*\/]/g);

    if (cleanedExpression.reduce((depth, el) => el === '(' ? depth += 1 : el === ')' ? depth -= 1 : depth, 0)) {
        throw new Error('ExpressionError: Brackets must be paired');
    }
    
    const operandPriority = {
        '(': 0,
        ')': 1,
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3
    };
    
    let reverseNotation = [];
    let stack = [];
    
    for (let i = 0; i < cleanedExpression.length; i++) {
        if (!(cleanedExpression[i] in operandPriority)) {
            reverseNotation.push(Number(cleanedExpression[i]));
        } else {
            if (!stack.length || cleanedExpression[i] === '(') {
                stack.push(cleanedExpression[i]);
            } else if (cleanedExpression[i] === ')'){
                while (stack[stack.length - 1] !== '(') {
                    reverseNotation.push(stack.pop());
                }
                stack.pop();
            } else {
                while (operandPriority[cleanedExpression[i]] <= operandPriority[stack[stack.length - 1]]) {
                    reverseNotation.push(stack.pop());
                }
                stack.push(cleanedExpression[i]);
            }
        }
    }
    
    reverseNotation.push(...stack.reverse());
    stack.length = 0;
    
    for (let i = 0; i < reverseNotation.length; i++) {
        if (!(reverseNotation[i] in operandPriority)) {
            stack.push(reverseNotation[i]);
        } else {
            const op2 = stack.pop();
            const op1 = stack.pop();
            switch (reverseNotation[i]) {
                case '+': {
                    stack.push(op1 + op2);
                    break;
                }
                case '-': {
                    stack.push(op1 - op2);
                    break;
                }
                case '*': {
                    stack.push(op1 * op2);
                    break;
                }
                case '/': {
                    if (op2 === 0) {
                        throw new Error('TypeError: Division by zero.');
                    } else {
                        stack.push(op1 / op2);
                        break;
                    }
                }
            }
        }
    }
    
    return stack[0];
}

module.exports = {
    expressionCalculator
}
