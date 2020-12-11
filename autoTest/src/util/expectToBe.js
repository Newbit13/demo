const t = require('babel-types');

function generateBaseLiteral(v){
    let result;
    switch (Object.prototype.toString.call(v)){
        case '[object Number]':result = t.numericLiteral(v);break;
        case '[object String]':result = t.stringLiteral(v);break;
        case '[object Null]':result = t.nullLiteral();break;
        case '[object Undefined]':result = t.identifier("undefined");break;
        case '[object Boolean]':result = t.booleanLiteral(v);break;
        // case '[object Object]':result = t.booleanLiteral(v);break;
        // case '[object Array]':result = t.booleanLiteral(v);break;
        // case '[object Date]':result = t.booleanLiteral(v);break;
        // case '[object Function]':result = t.booleanLiteral(v);break;
    }
    return result;
}
//expect(xx(yyy)).toBe(zzz);
module.exports = function expectToBe(fnName,params,theValtoBe){
    var paramsList = params.map(v=>{
        return generateBaseLiteral(v);
    });
    return (
        t.expressionStatement(
            t.callExpression(
                t.memberExpression(
                    t.callExpression(
                        t.identifier('expect'),
                        [
                            t.callExpression(
                                t.identifier(fnName),
                                paramsList
                            )
                        ]
                    ),
                    t.identifier('toBe')
                ),
                [
                    generateBaseLiteral(theValtoBe)
                ]
            )
        )
    )
}