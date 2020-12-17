const path = require('path');

var memFs = require("mem-fs");
var editor = require("mem-fs-editor");
const runTrans = require('./transFn.js');

var store = memFs.create();
var fs = editor.create(store);

// let dataObj = fs.readJSON(path.resolve(__dirname,'./database.json'));
let dataObj = require('./database.js');

function flatObj(obj,rowObj,father){
    var resultObj = rowObj || {};
    for(var key in obj){
        let type = Object.prototype.toString.call(obj[key]);
        let searchkey;
        if(father)searchkey = `${father}😁${key}`;
        let fatherKet = searchkey || key;

        switch (type){
            case '[object String]':
                resultObj[obj[key]] = fatherKet;
                break;
            case '[object Object]':
                flatObj(obj[key],resultObj,fatherKet);
                break;
            case '[object Function]':
                resultObj[obj[key]] = fatherKet;
                break;
            case '[object Array]':
                resultObj[obj[key]] = fatherKet;
                break;
        }
    }

    return resultObj;
}

//将数据库的中文对象中的value 作为 key，通过记录下来的访问链，去获取其他语种对应翻译
var tempDataObj = flatObj(dataObj.gb);
// fs.writeJSON(path.resolve(__dirname,'../dist/log.json'), tempDataObj);
// fs.commit(function(){
//     console.log("提交完毕");
// })
// return
// let sourceObj = fs.readJSON(path.resolve(__dirname,'./source.json'));
function getNoObjValue(obj,callBack){
    for(var key in obj){
        let keyVal = obj[key];
        let type = Object.prototype.toString.call(keyVal);
        switch (type){
            case '[object String]':
                callBack(keyVal);
                break;
            case '[object Object]':
                getNoObjValue(keyVal,callBack);
                break;
            case '[object Function]':
                callBack(keyVal.toString());
                break;
            case '[object Array]':
                callBack(keyVal.toString());
                break;
        }
    }
}
let sourceObj = require('./source.js');
//用于没有翻译时生成空的对象
var tempDataObj2 = flatObj(sourceObj.gb);
var tempSourceObj = {};
// var lanList = ['gb','en','vn','fr'];
var lanList = ['gb','en'];
lanList.forEach((lang)=>{
    let langObj = {};
    getNoObjValue(sourceObj.gb,function(cnValue){
        //查看数据库里有没有该翻译
        let dataKey = tempDataObj[cnValue];
        //在数据库里有对应的值
        if(dataKey){
            var accessList = dataKey.split('😁');
            //有对应的外语
            let foreignObj = dataObj[lang];
            if(foreignObj){
                var barObj = langObj;
                while(accessList.length){
                    var accessKey = accessList.shift();
                    if(typeof barObj[accessKey] == 'undefined'){
                        barObj[accessKey] = {}
                    }
                    foreignObj = foreignObj[accessKey];
                    //不用再访问时
                    if(accessList.length == 0){
                        barObj[accessKey] = foreignObj
                    }
                    barObj = barObj[accessKey]
                }
                //翻译后的值
                // console.log(barObj);
            }
        }else{
            var barObj = langObj;
            let dataKey = tempDataObj2[cnValue];
            var accessList = dataKey.split('😁');
            while(accessList.length){
                var accessKey = accessList.shift();
                if(typeof barObj[accessKey] == 'undefined'){
                    barObj[accessKey] = {}
                }
                //不用再访问时
                if(accessList.length == 0){
                    if(lang == 'gb'){
                        barObj[accessKey] = cnValue
                    }else{
                        barObj[accessKey] = null
                    }
                }
                barObj = barObj[accessKey]
            }
        }
    })

    tempSourceObj[lang] = langObj
});

// ！对象序列化，函数会被删除
//write只在commit后才能实际生效
function objFnStringfy(obj){
    for(var key in obj){
        let keyVal = obj[key];
        let type = Object.prototype.toString.call(keyVal);
        switch (type){
            case '[object Object]':
                objFnStringfy(keyVal);
                break;
            case '[object Function]':
                obj[key] = keyVal.toString();
                break;
            case '[object Array]':
                obj[key] = JSON.stringify(keyVal);
                break;
        }
    }
}

objFnStringfy(tempSourceObj);
fs.write(path.resolve(__dirname,'../dist/dest.js'), 
    `var txt = ${JSON.stringify(tempSourceObj,null,2)}`
);
fs.commit(function(){
    runTrans();
    console.log("提交完毕");
})