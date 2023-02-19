const cacheMap = new Map();

export function EnableCache(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log(name);
    console.log(target[name]);
    console.log(descriptor);
    
    const val = descriptor.value;
    descriptor.value = function(...args: any) {
        const cacheKey = name + JSON.stringify(args);
        if (!cacheMap.get(cacheKey)) {
            const cacheValue = val.apply(this, args);//Promise.resolve(val.apply(this, args)).catch((_) => cacheMap.set(cacheKey, null));
            cacheMap.set(cacheKey, cacheValue);
        }
        return cacheMap.get(cacheKey);
    };
    return descriptor;
}

class M {
  @EnableCache
  static sum(a: number,b: number){
    return a + b
  }
}

console.log(M.sum(1,2));
console.log(M.sum(1,2));

