const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/rc_zaopin')
const coon = mongoose.connection
coon.on('connected',function(){
    console.log('db connect success');
})

const Schema = mongoose.Schema
const UserSchema = new Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    head:{type:String},
    title:{type:String},
    company:{type:String},
    salary:{type:String},
    info:{type:String}
})
const ImageSchema = new Schema({
    sourid:{type:String,require:true},
    path:{type:String,require:true},
    createTime:{type:Date,require:true},
    isdisable:{type:Number,default:0}
})

const ChatSchema = new Schema({
    from:{type:String,require:true},
    to:{type:String,require:true},
    chat_id:{type:String,require:true},
    content:{type:String,require:true},
    createTime:{type:Date,require:true},
    isRead:{type:Number,default:0},
})

const UserModel = mongoose.model('user',UserSchema)
const ImageModel = mongoose.model('asset',ImageSchema)
const ChatModel = mongoose.model('chat',ChatSchema)

exports.UserModel = UserModel
exports.ImageModel = ImageModel
exports.ChatModel = ChatModel