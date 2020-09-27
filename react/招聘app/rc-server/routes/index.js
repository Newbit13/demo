const express = require('express');
const md5 = require('blueimp-md5')
const fs = require('fs')

const {UserModel,ImageModel,ChatModel} = require('../db/models')
const formidable = require("formidable")
const filter = {password:0,__v:0}
var router = express.Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/register', function(req, res) {
  const {username,password,type} = req.body
  if(username === 'admin'){
    res.send({code:1,msg:'已存在该用户!'})
  }else {
    UserModel.findOne({username},function(err,user){
      if(user){
        res.send({code:1,msg:'该用户名已存在！'})
      }else{
        UserModel.create({username,type,password:md5(password)},function(err,user){
          res.cookie('user_id',user._id,{maxAge:1000*60*60*24*7})
          const {username,type,_id} = user
          res.send({code:0,data:{username,type,_id}})
        })
      }
    })
  }
})

router.post('/login',function(req,res){
  const {username,password} = req.body
  UserModel.findOne({username,password:md5(password)},filter,function(err,user) {
    if(user){
      res.cookie('user_id',user._id,{maxAge:1000*60*60*24*7})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或者密码错误！'})
    }
  })
})

router.post('/update',function(req,res){
  //判断登录
  const userid = req.cookies.user_id
  if(!userid){
    res.send({code:1,msg:'请先登录！'})
  }else{
    //const {title,company,salary,info} = req.body
    UserModel.findByIdAndUpdate({_id:userid},req.body,function(err,user) {
      if(!user){
        res.clearCookie('user_id')
        res.send({code:1,msg:'请先登录！'})
      }else{
        const {username,type,_id,head} = user
        res.send({code:0,data:Object.assign({username,type,_id,head},req.body)})
      }
    })
  }
})
router.get('/user',function(req,res){
  //判断登录
  const userid = req.cookies.user_id
  if(!userid){
    res.send({code:1,msg:'请先登录！'})
  }else{
    UserModel.findById({_id:userid},filter,function(err,user) {
      if(!user){
        res.clearCookie('user_id')
        res.send({code:1,msg:'请先登录！'})
      }else{
        res.send({code:0,data:user})
      }
    })
  }
})
router.get('/getUserList',function(req,res){
  //判断登录
  const userid = req.cookies.user_id
  if(!userid){
    res.send({code:1,msg:'请先登录！'})
  }else{
    const {type} = req.query
    UserModel.find({type},filter,function(err,users) {
        res.send({code:0,data:users})
    })
  }
})
//获取用户列表及数据
router.get('/getChatList',function(req,res){
  const userid = req.cookies.user_id
  const users = {}
  UserModel.find(function(err,userList) {
    userList.forEach((user)=>{
      const {_id,head,username} = user
      users[_id] = {head,username}
    })
    ChatModel.find({'$or':[{from:userid},{to:userid}]},function(err,chatList){
      let unReadCount = chatList.filter(chat=>chat.isRead === 0 && chat.to === userid).length
      res.send({code:0,data:{users,chatList,unReadCount}})
    })
  })
})
//读取未读消息
router.post('/readMsg',function(req,res){
  const userid = req.cookies.user_id
  const {from} = req.body
  ChatModel.update({to:userid,from:from,isRead:0},{isRead:1},{multi:true},function(err,doc){
    res.send({code:0,data:doc.nModified})
  })
})

// 用户上传头像
router.post('/uploadImg',function(req,res){
  const {sid} = req.query
  
  const form = new formidable.IncomingForm()
  form.uploadDir = './public/upload/temp/'
  form.parse(req,(eror,fields,files)=>{
    for (var key in files) {
      var file = files[key];
      var fName = (new Date()).getTime();
      switch (file.type) {
          case "image/jpeg":
              fName = fName + ".jpg";
              break;
          case "image/png":
              fName = fName + ".png";
              break;
          default:
              fName = fName + ".png";
              break;
      }
      var uploadDir = "./public/upload/" + fName;
      fs.rename(file.path, uploadDir, function(err) {
          if (err) {
              res.send({code:1,msg:'上传失败'});
          }
          //保存图片信息
          ImageModel.create({sourid:sid,path:uploadDir,createTime:new Date()},function(err,asset){
            if (err) {
              res.send({code:1,msg:'上传失败'});
            }
            const {_id} = asset
            //更新用户头像id
            UserModel.findByIdAndUpdate(sid,{head:_id},function(err,user) {
              if(user){
                res.send({code:0});
              }else{
                res.send({code:1,msg:'更新图片失败'});
              }
            })
          })
      })
    }
  })
})
// 根据图片id读取图片
router.get('/handlerImg',function(req,res){
  const {sid} = req.query
  ImageModel.findById(sid,function(err,asset) {
    if (err) {
      res.send({code:1,msg:'服务器出错了'})
    }
    if(asset){
      fs.readFile(asset.path, function(err, data){
        const stream = fs.createReadStream( asset.path );
        const responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
              responseData.push( chunk );
            });
            stream.on( 'end', function() {
               var finalData = Buffer.concat( responseData );
               res.write( finalData );
               res.end();
            });
        }        
      })
    }else{
      res.send({code:1,msg:'没有此资源'})
    }
  })
})

module.exports = router
