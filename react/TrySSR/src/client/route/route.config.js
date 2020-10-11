import Fruit from '../pages/Fruit';
import Meet from '../pages/Meet';
import Drink from '../pages/Drink';

export const routeConfig = [{
    name:"Fruit",
    path:'/Fruit',
    key:'Fruit',
    exact:true,
    component:Fruit
},{
    name:"Meet",
    path:'/Meet',
    key:'Meet',
    exact:true,
    component:Meet
},{
    name:"Drink",
    path:'/Drink',
    key:'Drink',
    exact:true,
    component:Drink
}]