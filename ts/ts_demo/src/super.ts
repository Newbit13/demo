// 举例说明 "高级用法" 的使用场景
type Combine<T> = (T extends any ? (args: T) => any : never) extends (args: infer A) => any ? A : never;

/**
 * 合并多个参数的返回数值并返回
 * @param { Function[] } reducerCreators
 * @returns { Object }
 */
function combineReducersParamFactory<T extends ((args?: any) => object)[]>(...reducerCreators: T): Combine<ReturnType<T[number]>> {
    return reducerCreators.reduce<any>((acc, creator) => ({ ...acc, ...creator() }), {});
}

// test ...

function todosReducer(state: object[], action: { [x: string]: string }) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

function counterReducer(state: number, action: { [x: string]: string }) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

// 这里不需要显示传入类型，这里就可以得到正确的代码提示
const ret = combineReducersParamFactory(
    () => ({ todosReducer }),
    () => ({ counterReducer })
);
// { todosReducer: [Function: todosReducer], counterReducer: [Function: counterReducer] }

//试验开始
type testType<T extends (() => object)[]> = T[number];
type r = testType<[() => ({ ha: 2 }), () => ({ la: 3 })]>

type testType2<T extends (() => object)[]> = ReturnType<T[number]>;
type r2 = testType2<[() => ({ ha: 2 }), () => ({ la: 3 })]>
// let sss:r2 = {ha:2,la:3} //or

type testType3<T extends (() => object)[]> = Combine<ReturnType<T[number]>>;
type r3 = testType3<[() => ({ ha: 2 }), () => ({ la: 3 })]>
// let sss3:r3 = {ha:2,la:3} //and

//了解Combine,为什么or可以变成and，这是因为使用了两次extends
type haha1 = {
    ha: string
} | {
    la: number
};
type testType4 = Combine<haha1>;

type haha2 = {
    ha: string;
} & {
    la: number;
}

type testInfer = haha1 extends haha2 ? "a" : "b"

// 好像基本类型才可以有以下效果
type AB<T> = T extends 'x' ? 'a' : 'b';
type All = AB<'x' | 'y'>; // 非确定条件，可能是 'x' 或 'y'
// 得到 type All = 'a' | 'b';
type testInfer2 = ({ ha: string } | { la: string }) extends { ha: string } ? "a" : "b"



//测试  infer的类型推导
type i1 = ((args: haha1) => any) extends (args: infer A) => any ? A : never;
type t2 = (haha1 extends any ? (args: haha1) => any : never)
// 没有Combine的效果
type t3 = (haha1 extends any ? (args: haha1) => any : never) extends (args: infer A) => any ? A : never;

type t4<T> = (T extends any ? (args: T) => any : never);
//注意比较 t2 和 tt4的区别！！！
type tt4 = t4<haha1>;

type t5 = (((args: { la: string }) => any) | ((args: { sa: number }) => any)) extends (args: infer A) => any ? A : never;
let tt5: t5 = { la: "", sa: 2 };

//extends 测试
type e1 = { ha: string } extends { ha: string } ? 1 : 2;//1
type e2 = { ha: string, la: number } extends { ha: string } ? 1 : 2;//1
type e3 = { ha: string } extends { ha: string, la: number } ? 1 : 2;//2
type e4 = ({ ha: string } | { la: string }) extends { ha: string, la: number } ? 1 : 2;//2
type e5 = ({ ha: string } | { la: string }) extends { ha: string } ? 1 : 2;//2
type e6 = ({ ha: string } | { la: string }) extends ({ ha: string } | { la: string }) ? 1 : 2;//1
// 注意e7和t5的区别！！！
type e7 = ({ ha: string } | { la: string }) extends infer A ? A : never;//{ha:string} | {la:string}

type Exclude2<T, U> = T extends U ? never : T;
type e8 = Exclude2<("x" | "y" | "z"), ("y")>;//"x" | "z"
type e9 = Exclude2<("y"), ("x" | "y" | "z")>;//never
type e10 = Exclude2<({ ha: string } | { la: string } | { sa: string }), { ha: string }>;

//体验keyof在某些情况下的表现
type myKeyOf<T> = keyof T;
type myIn<T> = {
    [p in keyof T]?: T[p]
}
type rC1 = myKeyOf<{ ha: 2, dsa: 23 }>;
type rC2 = myKeyOf<haha1>;
type rC3 = myKeyOf<haha2>;

type rN1 = myIn<haha1>;
type rN2 = myIn<haha2>;

//is
function isA(x:any): x is rN2 {
    return true;
  }


