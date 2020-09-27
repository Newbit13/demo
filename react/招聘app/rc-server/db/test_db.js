const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/rc_zaopin')
const connection = mongoose.connection
connection.on('connected',function(){
    console.log('数据库连接成功')
})

const schema = mongoose.Schema

let TestSchema = new schema({
    uname:{type:String},
    password:{type:String},
})

const TestModel = mongoose.model('Test',TestSchema)
function save(){
    var TestEntity = new TestModel({
        uname:"tt",
        password:md5('123')
    })
    TestEntity.save(function(err,docs){
        if(err)console.log(err)
        console.log('保存成功',docs)    
    })
}

TestModel.findOne({uname:'lala'},function(err,docs){
    if(err)console.log(err)
    console.log('保存成功',docs)    
})