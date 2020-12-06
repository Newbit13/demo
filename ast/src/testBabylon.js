const babylon = require('babylon');
const traverse = require("babel-traverse").default;
const t = require('babel-types');
const generate = require('babel-generator').default;
const template = require("babel-template");
// console.log(traverse);
// console.log(generate);
//Babel的解析器 Babylon

const code = `
function square(n) {
  return n * n;
}


function add() {
    return 1 + 2;
}
`;

// const code = `
//     <div>123</div>
// `;

// 生成ast
let ast = babylon.parse(code,{
    // sourceType: "module", // default: "script"
    // plugins: ["jsx"] // default: []
});
// console.log(ast.program.body[0]);
// console.log(ast);
// traverse(ast,{
//     enter(path){
//         if (
//             path.node.type === "Identifier" &&
//             path.node.name === "n"
//         ) {
//             // console.log(1);
//             path.node.name = "x";
//         }
//     }
// });

//转换、修改ast
traverse(ast,{
    // enter(path){
    //     // console.log(path.node);
    //     // if (t.isIdentifier(path.node,{name:"n"})) {
    //     //     path.node.name = "x";
    //     // }
    //     if (t.isReturnStatement(path.node)) {
    //         // console.log(path.node);
    //         path.node.argument = t.binaryExpression("*", t.identifier("aaaa"), t.identifier("b22"));
    //     }
    // },
    BinaryExpression(path) {
        if (path.node.operator !== "*") {
            return;
        }
        
        path.node.left = t.identifier("sebmck");
        path.replaceWith(
            // t.binaryExpression("**", path.node.left, t.identifier("newbit"))
            t.binaryExpression("**", path.node.left, t.numericLiteral(2))
        );
    },
    // 可用
    // ReturnStatement(path) {
    //     path.replaceWithMultiple([
    //         t.expressionStatement(t.stringLiteral("Is this the real life?")),
    //         t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
    //         t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
    //     ]);
    // }
    FunctionDeclaration(path) { 
        // path.replaceWithSourceString(function add(a, b) { return a + b; }); 
        // path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
        path.traverse({
            Identifier(path){
                if(path.isIdentifier({name:'add'})){
                    let functionPath = this.functionPath;
                    functionPath.traverse({
                        BlockStatement(path){
                            // path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                            // path.unshiftContainer('body',t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                            // path.pushContainer('body',t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                            path.node.body.unshift(
                                t.expressionStatement(
                                    t.callExpression(
                                        t.memberExpression(
                                            t.identifier("console"),
                                            t.identifier("log")
                                        ),
                                        [t.stringLiteral(functionPath.node.id.name + " is be called")]
                                    )
                                )
                            );
                            // insetBlockStart
                        }
                    })
                    functionPath.insertBefore(
                        t.expressionStatement(
                            t.callExpression(
                                t.memberExpression(
                                    t.identifier("console"),
                                    t.identifier("log")
                                ),
                                [t.stringLiteral(functionPath.node.id.name + " is be definded")]
                            )
                        )
                    );
                }
            }   
        },{functionPath:path})
        // path.insertBefore(
        //     t.expressionStatement(
        //         t.callExpression(
        //             t.memberExpression(
        //                 t.identifier("console"),
        //                 t.identifier("log")
        //             ),
        //             [t.stringLiteral(path.node.id.name + " is be call")]
        //         )
        //     )
        // );
    },
    // Identifier(path){
    //     console.log(path.node.name);
    // }
});

//根据ast生成代码
const res = generate(ast, {}, code);
console.log(res.code);

//??????????
//Babel Types模块拥有每一个单一类型节点的定义，包括节点包含哪些属性，什么是合法值，如何构建节点、遍历节点，以及节点的别名等信息
// defineType("BinaryExpression", {
//     builder: ["operator", "left", "right"],
//     fields: {
//         operator: {
//         validate: assertValueType("string")
//         },
//         left: {
//         validate: assertNodeType("Expression")
//         },
//         right: {
//         validate: assertNodeType("Expression")
//         }
//     },
//     visitor: ["left", "right"],
//     aliases: ["Binary", "Expression"]
// });
//Babel Types的应用
// let ast2 = t.binaryExpression("*", t.identifier("aaaa"), t.identifier("b22"));
// let ast2 = t.expressionStatement(
//     t.callExpression(
//         t.memberExpression(
//             t.identifier("console"),
//             t.identifier("log")
//         ),
//         [t.numericLiteral(1)]
//     )
// );
// let ast2 = t.callExpression(
//     t.memberExpression(
//         t.identifier("console"),
//         t.identifier("log")
//     ),
//     [t.numericLiteral(1)]
// );
// console.log(ast2);
// const res2 = generate(ast2, {}, code);
// console.log(res2.code);

// const templateStr = template(`
//     var k = haha(x);
// `)
// const ast233 = templateStr({
//     k: t.identifier("iddddd"),
//     x: t.stringLiteral("my-module"),
//     haha:t.identifier("xxxxx"),
// });
// console.log(generate(ast233).code);

