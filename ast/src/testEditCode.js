const babylon = require('babylon');
const traverse = require("babel-traverse").default;
const t = require('babel-types');
const generate = require('babel-generator').default;

const code = `function square(n) {
  return n * n;
}`;

let ast = babylon.parse(code,{
    // sourceType: "module", // default: "script"
    // plugins: ["jsx"] // default: []
});

//转换、修改ast
traverse(ast,{
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
    FunctionDeclaration(path) {
        path.insertBefore(
            t.expressionStatement(
                t.callExpression(
                    t.memberExpression(
                        t.identifier("console"),
                        t.identifier("log")
                    ),
                    [t.stringLiteral(path.node.id.name + " is be call")]
                )
            )
        );
    }
});

//根据ast生成代码
const res = generate(ast, {}, code);
console.log(res.code);
