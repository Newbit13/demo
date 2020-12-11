var babylon = require("babylon");
const traverse = require("babel-traverse").default;
const t = require('babel-types');
const generate = require('babel-generator').default;

const fs = require('fs');
const relativeDir = require('./util/fsUtil/relativeDir');

const {expectToBe,insertRequire,testUnit} = require('./util/');

function transType(v){
    var paramType = v.split(' ')[0];
    var paramValue = v.split(' ')[1];
    var v = paramValue;
    switch(paramType){
        case 'num':v =  Number(paramValue);break;
        case 'str':v =  String(paramValue);break;
        case 'bool':v =  Boolean(paramValue);break;
        case 'undefined':v =  undefined;break;
        case 'null':v =  null;break;
    }
    return v;
}

module.exports =  function generateTestCode(inputpath,desPath){
    fs.readFile(inputpath,function(err,data){
        if(err){
            console.log(err);
            return;
        }
        let code = data.toString();
        let ast = babylon.parse(code,{
            // sourceType: "module", // default: "script"
            // plugins: ["jsx"] // default: []
        });
    
        let testCommentsList = []
        //转换、修改ast
        traverse(ast,{
            //确定要测试的代码
            FunctionDeclaration(path){
                //约定第一行为测试函数名称，第二行为描述,第三行为参数，第四行为目标值
                if(path.node.leadingComments.length == 4){
                    if(path.node.leadingComments[0].value.indexOf('test')>-1){
                        testCommentsList.push({
                            name:path.node.leadingComments[0].value.split(':')[1],
                            des:path.node.leadingComments[1].value.split(':')[1],
                            params:path.node.leadingComments[2].value.split(':')[1].split(',').map((v)=>{
                                return transType(v);
                            }),
                            target: transType(path.node.leadingComments[3].value.split(':')[1]),
                        })
                    }
                }
            }
        });
    
        //根据ast生成代码
        let testAst = testCommentsList.map((v)=>{
            console.log(v.params);
            return (
                testUnit(v.des,[
                    expectToBe(v.name,v.params,v.target)
                ])
            );
        });
    
        let FnList = testCommentsList.map((v)=>{
            return v.name;
        });
    
        testAst.unshift(insertRequire(relativeDir(inputpath,desPath),FnList));
    
        let testCode = generate(
            t.program(testAst),
            {}
        ).code
    
        console.log(testCode);
        fs.writeFile(desPath,testCode,function(e){
            if(e){
                console.log(e);
            }
        });
    })
}
