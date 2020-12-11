const t = require('babel-types');

// const {sum,minus} = require("./sum");
module.exports =  function insertRequire(requireName,fnNameList){
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