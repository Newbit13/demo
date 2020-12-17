const babylon = require('babylon');
const traverse = require("babel-traverse").default;
const t = require('babel-types');
const generate = require('babel-generator').default;

const fs = require('fs');
const path = require('path');

function runTrans(){

    const code = fs.readFileSync('./dist/dest.js').toString();

    let ast = babylon.parse(code,{
        // sourceType: "module", // default: "script"
        // plugins: ["jsx"] // default: []
    });

    //转换、修改ast
    traverse(ast,{
        ObjectProperty(rowPath){
            if(!t.isObjectExpression(rowPath.node.value)){
                rowPath.traverse({
                    StringLiteral(rowPath2){
                        let objV = rowPath2.node.value;
                        if(objV.indexOf('function') > -1){
                            let jsStr = `var a = ${objV}`;
                            let tempAst = babylon.parse(jsStr,{})
                            traverse(tempAst,{
                                FunctionExpression(path){
                                    rowPath.node.value = path.node;
                                }
                            })
                        }

                        if(objV.indexOf('[') > -1 && objV.indexOf(']') > -1){
                            let jsStr = `var a = ${objV}`;
                            let tempAst = babylon.parse(jsStr,{})
                            traverse(tempAst,{
                                ArrayExpression(path){
                                    rowPath.node.value = path.node;
                                }
                            })
                        }
                    }
                })
            }
        }
    });
    //根据ast生成代码
    const res = generate(ast, {}, code);
    fs.writeFileSync('./dist/final.js',res.code);

}

module.exports = runTrans;
