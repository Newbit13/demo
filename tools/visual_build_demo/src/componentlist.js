import pkq from './static/images/pkq.jpg';

let componentList = [{
    component:"Text",//对应组件class
    label:'文字',//组件列表中显示的名字
    propV:{
        text:'xxx'
    },// 传给组件用的值
    key:1,
    havePoint:false,
    style:{
        // position: 'absolute',
        // top: 0,
        // left: 0,
        color:'#24a5ff',
        fontSize:20
    }
},
{
    component:"Button",
    label:'按钮',
    propV:{
        text:'click'
    },
    key:2,
    havePoint:true,
    style:{
        // position: 'absolute',
        // top: 0,
        // left: 0,
        color:'#ff0000',
        width: 50,
        height:30,
        fontSize:20
    }
},
{
    component:"Image",
    label:'图片',
    havePoint:true,
    key:3,
    style:{
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: 200,
        height:200
    },
    propV:{
        url:pkq
    }
}]; 

export default componentList;