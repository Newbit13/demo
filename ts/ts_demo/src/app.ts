// 巧用注释
/** 什么什么是 */
interface Props {
  /** fofofof */
  foo: string;
  la: number;
  [key: string]: Props[keyof Props];
}

const props: Props = {
  foo: "bar",
  la: 12,
};
props["foo"] = "baz"; // ok
props["bar"] = 123; // error

//1
// function process(text: string | number): string | number {
//     return text;
// }

//2
// function process<T>(text: T): T {
//     return text;
// }

//3
function process<T extends string | number>(text: T): T {
  return text;
}
process("sss").toUpperCase(); // ???
process(1).toFixed();
process(true);

//4 ？？
type returnType233<T> = T extends string ? string : number;
function process2<T extends string | number>(text: T): returnType233<T> {
  let a: returnType233<T> = 2;
  return a;
}
let r = process2("233");
let s = process2(233);

// 巧用查找类型
type newProps = Props["la"];

// 巧用查找类型+泛型+keyof
interface Food {
  size: string;
}
interface API {
  "/user": { name: string };
  "/menu": { foods: Food[] };
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then((res) => res.json());
};

//上面的定义极大地增强了代码提示：
get("/user").then((res) => res.name);
get("/menu").then((res) => res.foods[0].size);

// 巧用 DeepReadonly,类似的有Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

const a = { foo: { bar: 22 } };
const b = a as DeepReadonly<typeof a>;
b.foo.bar = 33; // Hey, stop!

// 巧用 Omit
type ButtonProps = {
  size: string;
  color: string;
};
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type BigButtonProps = Omit<ButtonProps, "size">;
let hah: BigButtonProps = { color: "#ffffff", size: "xx" };

// Omit的实现：type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type tt = {
  a: string;
  b: number;
};
type dd = {
  b: number;
};
//1.去掉'a'
type a = Exclude<keyof tt, "a">;
//2.将去掉'a'后的type 的 剩余key，一个个拿出来组成新的type
//得到的效果：将type中某个key去掉，得到新type
type aa = Pick<tt, a>;

//巧用Record类型
type AnimalType = "cat" | "dog" | "frog";
interface AnimalDescription {
  name: string;
  icon: string;
}
const AnimalMap: Record<AnimalType, AnimalDescription> = {
  cat: { name: "猫", icon: " " },
  dog: { name: "狗", icon: " " },
  forg: { name: "蛙", icon: " " }, // Hey!
};
type testIn = {
  [p in AnimalType]: string;
};
enum AnimalType2 {
  CAT = "cat",
  DOG = "dog",
  FROG = "frog",
}
type testIn2 = {
  [p in AnimalType2]: string;
};

// in、keyof
type testIn3 = {
  [p in keyof tt]: number;
};

// 巧用Partial
type pp = Partial<tt>;

let ccc: pp = {};
ccc.a = "1";
let ddd: tt;
ddd = {
  a: "22",
  b: 22,
};

// infer
type ParamType<T> = T extends (param: infer P) => number ? P : T;

interface User {
  name: string;
  age: number;
}

type Func = (user: User) => void;
type Func2 = (user: User) => number;

type Param = ParamType<Func>; // Param = Func
type Param2 = ParamType<Func2>; // Param = User
type AA = ParamType<string>;

// 其他
type foo<T extends String | Number> = T;
let fff: foo<Number>;
let fff2: foo<Boolean>;

type foo2<T extends String = "ok"> = T;
let fff3: foo2 = "ok2";

declare type str2333 = {
  la?: boolean;
};
// 如何你的模块使用了 export 关键字导出了内容，上述的声明方式可能会失效
// 如果你依然想要将类型声明到全局，那么你就需要显式地声明到全局：
declare global {
  const ModuleGlobalFoo: string;
}
// 没有export的话，global会报错
// export const asssss = 2; //可以尝试注释这行
// export 还会影响到declare interface Window只能作用与本模块而无法与全局的Window进行接口合并

// 如何在 window 对象上显式设置属性
declare interface Window {
  MyNamespace: any;
}
window.MyNamespace = window.MyNamespace || {}; //没有上面的declare interface Window这里则会报错
(window as any).MyNamespace = {}; //any的写法不如扩展Window接口好

//如何为对象动态分配属性
let developer = {};
developer.name = "semlinker";
interface LooseObject {
  [key: string]: any;
}
let developer2: LooseObject = {};
developer2.name = "semlinker";


interface Developer {//name必须，age可选，还支持动态设置字符串类型的属性
  name: string;
  age?: number;
  [key: string]: any;
}

let developer3: Developer = { name: "semlinker" };
developer3.age = 30;
developer3.city = "XiaMen";
