export const cs = (obj)=>{
    return Object.keys(obj).filter(key=>obj[key]).join(" ");
}