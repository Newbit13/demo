const PENDDING = "PENDDING"; // 初始化pendding状态
const RESOLVED = "RESOLVED"; // 正确完成resolve状态
const REJECTED = "REJECTED"; // 错误完成reject状态

class MyPromise{
    constructor(executor){
        this.status = PENDDING;
        this.value = undefined;
        this.reason = undefined;

        this.resolves = [];
        this.rejects = [];

        const resolve = (value)=>{
            if(this.status === PENDDING){
                this.status = RESOLVED;
                this.value = value;

                while(this.resolves.length){
                    const callback = this.resolves.shift();
                    callback(value);
                }
            }
        }

        const reject = (reason)=>{
            if(this.status === PENDDING){
                this.status = REJECTED;
                this.reason = reason;

                while(this.rejects.length){
                    const callback = this.rejects.shift();
                    callback(reason);
                }
            }
        }

        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
        
    }

    then(resolve,reject){
        if(this.status === RESOLVED){
            resolve(this.value);
        }

        if(this.status === REJECTED){
            reject(this.reason)
        }

        if(this.status === PENDDING){
            this.resolves.push(resolve);
            this.rejects.push(reject);
        }
    }

    static resolve(value) {
        return new MyPromise((resolveFn, rejectFn) => {
            setTimeout(function(){
                resolveFn(value)
            })
        })
    }
}

module.exports = MyPromise;