import React,{Component} from 'react'

import './user-head.less'
const defaultImg = require('../../assets/imgs/pkq.jpg')
export  default class UserHead extends Component{
    constructor(props){
        super(props)
        this.state = {
            imgurl:this.props.imgurl?'/handlerImg?sid='+this.props.imgurl:defaultImg
        }   
    }

    handlerSendImg = (e)=>{
        var src, url = window.URL || window.webkitURL || window.mozURL,
        files = e.target.files;
        var formData = new FormData();
        for (var i = 0, len = files.length; i < len; ++i) {
            var file = files[i];
            if (url) {
                src = url.createObjectURL(file);
            } else {
                console.log('没有url');
                //src = e.target.result;这个没用的
            }
            this.setState({
                imgurl:src
            })
            formData.append('files', files[i]);
            //formData就是要上传的图片数据
            require('../../api/index').reqUploadImg(formData,this.props.sid)
        }
    }
    componentDidMount(){

    }
    render(){
        return (
            <div className='user_class_box'>
                <div className="user_img" style={{backgroundImage:'url('+this.state.imgurl+')'}}>
                    <input type="file" onChange={(e)=>{this.handlerSendImg(e)}}/>
                </div>
                <p>{this.props.username}</p>
            </div>
        )
    }
}