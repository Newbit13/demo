import cat from './static/images/cat.jpg';

const componentList = [{
    component:"Text",//对应组件class
    label:'文字',//组件列表中显示的名字
    propV:'xxx',// 传给组件用的值
    key:1,
    style:{
        color:'#fff123'
    }
},
{
    component:"Button",
    label:'按钮',
    propV:'click',
    key:2,
    style:{
        color:'#ff0000'
    }
},
{
    component:"Image",
    label:'图片',
    propV:cat,
    key:3,
    style:{
        width: 50,
        height:50
    }
}]; 

export default componentList;