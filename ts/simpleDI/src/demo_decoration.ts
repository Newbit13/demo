import 'reflect-metadata';

//类装饰器
function TestClass():Function{
    return (target)=>{
        console.log("我是类装饰器");
        Reflect.defineMetadata('zzz', 123, target);
        target.ha = 333;
        target.prototype.zz = 23333;
    }
}

//属性装饰器
function TestProper(): PropertyDecorator{
    return (target,propertyKey)=>{
        // console.log("这是属性装饰器");
        console.log(propertyKey);
        const something = Reflect.getMetadata("design:type", target, propertyKey);// 获取被装饰属性的类型
        console.log({something});
    }
}
//属性装饰器--加强
function TestProper2():MethodDecorator{
    return (target,propertyKey,descriptor:TypedPropertyDescriptor<any>)=>{
        console.log("对propertyKey进行改造");
        const rawFn = descriptor.value;
        // descriptor.value = 123;
        descriptor.value = function(...args){
            console.log("我对牛逼进行了一定的改造");
            rawFn(...args);
            console.log("我对牛逼进行了一定的改造2");
        }
        // return descriptor;
    }
}

class B{}

@TestClass()
class A{
    static ha:String
    public zz:String

    @TestProper()
    private testP:B

    @TestProper2()
    niubi(num:number){
        console.log(num);
        // return "这是niubi的返回值";
    }

}

const a = new A();
// console.log(A.ha);
// console.log(a.zz);
// console.log(Reflect.getMetadata('zzz', A));
a.niubi(123);
a.niubi(432);
// console.log(a.niubi);

// console.log(a.niubi());

