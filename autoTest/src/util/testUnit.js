const t = require('babel-types');

// test("xxxx", () => {
//   bbbb
// });
module.exports =  function testUnit(des,bodyList){
    return (
        t.expressionStatement(
            t.callExpression(
                t.identifier('test'),
                [
                    t.stringLiteral(des),
                    t.arrowFunctionExpression(
                        [],
                        t.blockStatement(
                            bodyList,
                            []
                        ),
                        false
                    )
                ]
            )
        )
    )
}