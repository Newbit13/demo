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
    la: 12
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

//3 ???error
// function process<T extends string | number>(text: T): T extends string ? string : number {
//     return text;
// }
function process<T extends string | number>(text: T): T{
    return text;
}
process("sss").toUpperCase() // ???
process(1).toFixed()
process(true)

// 巧用查找类型
type newProps = Props["la"];


// 巧用查找类型+泛型+keyof
interface Food {
    size: string
}
interface API {
    '/user': { name: string },
    '/menu': { foods: Food[] },
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
    return fetch(url).then(res => res.json())
}

//上面的定义极大地增强了代码提示：
get('/user').then(res => res.name);
get('/menu').then(res => res.foods[0].size)


// 巧用 DeepReadonly,类似的有Readonly
type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
}

const a = { foo: { bar: 22 } }
const b = a as DeepReadonly<typeof a>
b.foo.bar = 33 // Hey, stop!

// 巧用 Omit
type ButtonProps = {
    size: string;
    color: string;
}
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type BigButtonProps = Omit<ButtonProps, 'size'>
let hah: BigButtonProps = { color: '#ffffff', size: 'xx' };

// Omit的实现：type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type tt = {
    a: string,
    b: number
}
type dd = {
    b: number,
};
//1.去掉'a'
type a = Exclude<keyof tt, 'a'>
//2.将去掉'a'后的type 的 剩余key，一个个拿出来组成新的type
//得到的效果：将type中某个key去掉，得到新type
type aa = Pick<tt, a>

//巧用Record类型
type AnimalType = 'cat' | 'dog' | 'frog';
interface AnimalDescription { name: string, icon: string }
const AnimalMap: Record<AnimalType, AnimalDescription> = {
    cat: { name: '猫', icon: ' ' },
    dog: { name: '狗', icon: ' ' },
    forg: { name: '蛙', icon: ' ' }, // Hey!
};
type testIn = {
    [p in AnimalType]: string
}
enum AnimalType2 {
    CAT = 'cat',
    DOG = 'dog',
    FROG = 'frog',
}
type testIn2 = {
    [p in AnimalType2]: string
}

// in、keyof
type testIn3 = {
    [p in keyof tt]: number
}


// 巧用Partial
type pp = Partial<tt>

let ccc:pp = {};ccc.a = "1";
let ddd:tt;ddd = {
    a:"22",
    b:22
}