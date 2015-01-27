/**
 * Created by bakhtiar.galib on 1/26/15.
 * implementation of modified Shaunting Yard algorithm to evaluate mathematical expression
 *
 */



function evaluate(expression) {

    var tokens = getTokens(expression);

    var valueStack = [];

    var operatorStack = [];

    console.log(tokens);

    for( var i=0; i<tokens.length; i++ ){

        var token = tokens[i].trim();
        console.log(token);

        if( isValue(token) )
        {
            console.log("Token is value "+token+" pushing to value stack");
            valueStack.push(token);
        }

        else if( isOperator(token) )
        {
            console.log("Token is Operator "+token);

            while( operatorStack.length != 0 && precedenceValue( operatorStack[operatorStack.length - 1] ) >= precedenceValue(token) )
            {
                console.log("OpStack top "+token+" has higher precedence");
                valueStack.push( applyOperation(operatorStack.pop(), valueStack.pop(), valueStack.pop()) );
            }

            operatorStack.push(token);
        }

        else if( token == "(" )
        {
            console.log("Left Parenthesis");
            operatorStack.push(token);
        }

        else if( token == ")" )
        {
            console.log("Right Parenthesis");

            while( operatorStack[ operatorStack.length - 1 ] != "(" )
            {
                valueStack.push( applyOperation( operatorStack.pop(),valueStack.pop(),valueStack.pop() ) );
            }

            if( operatorStack.length == 0 ) throw "INVALID PARENTHESIS MATCHING";
            operatorStack.pop();
        }

        console.log("Value Stack "+valueStack);
        console.log("Operation Stack"+operatorStack);
    }

    while( operatorStack.length != 0 )
    {
        valueStack.push( applyOperation(operatorStack.pop(),valueStack.pop(), valueStack.pop()) );
    }

    return valueStack.pop();


}

function getTokens(expression) {

    return expression.split(/\s+/);
}

function isValue(token) {

    return !isNaN(token);
}

function isOperator(token) {

    if (token == "+" || token == "-" || token == "*" || token == "/"
        || token == "%" || token == "^")
        return true;
    else
        return false;
}

function precedenceValue(operator) {

    if (operator == "+" || operator == "-")
        return 1;
    else if (operator == "*" || operator == "/" || operator == "%")
        return 2;
    else if (operator == "^")
        return 3;

    else
        return 0;
}

function applyOperation(operator, b, a) {

    a = Number(a);
    b = Number(b);

    if (operator == "+")
        return a + b;

    else if (operator == "-")
        return a - b;

    else if (operator == "*")
        return a * b;

    else if (operator == "/") {
        if (b == 0)
            throw  "Cannot divide by zero";
        return a / b;
    } else if (operator == "%") {
        if (b == 0)
            throw "Cannot divide by zero";
        return a % b;
    } else if (operator == "^")
        return Math.pow(a, b);

}


//alert( evaluate("2 / 0") );
//console.log(evaluate("2 + 3"));
