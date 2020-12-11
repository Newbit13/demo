var babylon = require("babel-core");
const traverse = require("babel-traverse").default;
const t = require('babel-types');
const generate = require('babel-generator').default;

const fs = require('fs');

fs.readFile('./sum.js',function(err,data){
    if(err){
        console.log(err);
        return;
    }
    let code = data.toString();
    let ast = babylon.parse(code,{
        sourceType: "module", // default: "script"
        // plugins: ["jsx"] // default: []
    });

    //转换、修改ast
    traverse(ast,{
        //确定要测试的代码
        FunctionDeclaration(path){
            //约定第一行为测试函数名称，第二行为描述
            if(path.node.leadingComments.length == 2){
                console.log(path.node.leadingComments[0].value);
                console.log(path.node.leadingComments[1].value);
            }
        }
    });

    //根据ast生成代码
    let testAst;
    // testAst = t.expressionStatement(
    //     t.callExpression(
    //         t.memberExpression(
    //             t.identifier("console"),
    //             t.identifier("log")
    //         ),
    //         [t.stringLiteral("is be called")]
    //     )
    // )

    // testAst = t.expressionStatement(
    //     t.variableDeclaration("const",[
    //         t.variableDeclaration(null,[
    //             t.variableDeclarator(
    //                 t.objectPattern([
    //                     t.objectProperty(
    //                         t.identifier("sum"),
    //                         t.identifier("sum"),
    //                         false,
    //                         true,
    //                     )
    //                 ]),
    //                 t.callExpression()
    //             )
    //         ])
    //     ])
    // )

    testAst = fnCall();
    console.log(generate(testAst, {}).code);
})

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

// const {
//     sum,
//     minus
//   } = require("./sum");
function insertRequire(requireName,fnNameList){
    fnNameList = fnNameList.map((v)=>{
        return t.objectProperty(
            t.identifier(v),
            t.identifier(v),
            false,
            true
        )
    })
    //const a = 1
    return (
        t.variableDeclaration("const",[
            t.variableDeclarator(
                //声明的左边
                t.objectPattern(fnNameList),
                //声明的右边
                t.callExpression(
                    t.identifier("require"),
                    [t.stringLiteral(requireName)]
                )
            )
        ])
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