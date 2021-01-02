import {createElement,useState} from 'react';

function Test(props){
    return (
        <div>
            <h1 style={props.style}>233333</h1>
            <p>66666666</p>
        </div>
    )
}

function transformComp(strV){
    let comp = null;
    switch (strV){
        case 'Test':comp = Test;break;
        default:break;
    }
    return comp;
}
let now = new Date();
function Drawer(){
    const [componentData,setComponentData] = useState([{
        component:"Test",
        key:now.getTime(),
        style:{
            color:'#fff123'
        }
    }]);

    return (
        <div>
            {componentData.map((item)=>{
                let DynamicComp = transformComp(item.component);
                return <DynamicComp key={item.key} style={item.style}/>;
            })}
        </div>
    )
}

export default Drawer;