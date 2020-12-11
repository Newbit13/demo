//const a = 1
function test1(){
    return (
        t.variableDeclaration("const",[
            t.variableDeclarator(
                t.identifier("a"),
                t.numericLiteral(1)
            )
        ])
    )
}

// const {
//     a
//   } = 1;
function test2(){
    //const a = 1
    return (
        t.variableDeclaration("const",[
            t.variableDeclarator(
                //声明的左边
                t.objectPattern([
                    t.objectProperty(
                        t.identifier("a"),
                        t.identifier("a"),
                        false,
                        true
                    )
                ]),
                //声明的右边
                t.numericLiteral(1)
            )
        ])
    )
}

// const {
//     a
//   } = require("./sum");
function test3(){
    //const a = 1
    return (
        t.variableDeclaration("const",[
            t.variableDeclarator(
                //声明的左边
                t.objectPattern([
                    t.objectProperty(
                        t.identifier("a"),
                        t.identifier("a"),
                        false,
                        true
                    )
                ]),
                //声明的右边
                t.callExpression(
                    t.identifier("require"),
                    [t.stringLiteral("./sum")]
                )
            )
        ])
    )
}

//expect(sum(1,2)).toBe(3);
function fnCall2(){
    return (
        t.expressionStatement(
            t.callExpression(
                t.memberExpression(
                    t.callExpression(
                        t.identifier('expect'),
                        [
                            t.callExpression(
                                t.identifier('minus'),
                                [
                                    t.numericLiteral(3),
                                    t.numericLiteral(2),
                                ]
                            )
                        ]
                    ),
                    t.identifier('toBe')
                ),
                [
                    t.numericLiteral(1)
                ]
            )
        )
    )
}

// test("xxx", () => {});
function fnCall(){
    return (
        t.expressionStatement(
            t.callExpression(
                t.identifier('test'),
                [
                    t.stringLiteral('xxx'),
                    t.arrowFunctionExpression(
                        [],
                        t.blockStatement(
                            [],
                            []
                        ),
                        false
                    )
                ]
            )
        )
    )
}
