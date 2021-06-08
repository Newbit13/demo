# 学习笔记
1.快捷键
Alt + 鼠标/方向键
F
鼠标&鼠标滚轮中键

选择一个物体，按v,可以选择顶点，用于顶点吸附用（这样两物体可以无缝贴紧）

选中摄像机（或者物体），调整你在场景看到的画面 ， ctrl + shift + f 可以将选中的物体位置进行改变

# unity脚本
是个类，继承MonoBehaviour

类字段前加```[SerializeField]```能使私有字段也显示在unity编辑器中

类字段前加```[HideInInspector]```能使共有字段在unity编辑器中隐藏

类字段前加``` [Range(0,30)]```能使共有int字段在unity编辑器中有个取值范围

类的属性（有getter，setter那种）不会在unity编辑器里显示
不要在脚本里写构造函数（要写代码在Awake或Start里写）
## 生命周期
### 初始阶段
创建游戏对象->立即执行(永远早与Start)
作用：初始化
Awake

一启用就调用（可开开关关重复启用）
OnEnable

创建游戏对象->脚本启用（在编辑器里有勾选时）->立即执行
作用：初始化
Start

### 物理阶段
执行时机：每隔固定时间执行一次（可改）
FixedUpdate

当满足触发条件时
OnTriggerXXX 触发

当满足碰撞条件时
OnCollisionXXX 碰撞

### 游戏逻辑
Update

LateUpdate
在Update函数被调用后执行，适用于跟随逻辑（跟Update在同一帧执行）
### 输入事件
OnMouseXX

### 场景渲染
OnBecameVisible   当Mesh Renderer 在相机上可见时
OnBecameInvisible 当Mesh Renderer 在相机上不可见时

###结束阶段
OnDisable 当对象变为不可用
OnDestroy
OnApplicationQuit 当程序结束，退出时

# 调试
复杂的：
在调试过程中写代码：
右键--快速监视
或者 查看“即时窗口”

简单的：
用Debug.Log或者print，
或者用一个临时的public字段，可以在unity面板进行观察
## 关于优化
 [occlusion culling 遮挡剔除](https://www.bilibili.com/video/BV12s411g7gU?p=16)
 
 [levels of detail 多细节层次](https://www.bilibili.com/video/BV12s411g7gU?p=17)

# 常用api
Component:提供查找组件的功能（找自己，子，父）
Transform
GameObject
Object
Time


# 关于VISUAL STUDIO 2019里写c#
ctrl + K + D 自动对齐代码
ctrl + K + c 注释
ctrl + K + u 取消注释

在类中输入prop + tab + tab会快速生成类的自动属性

```c#
// 标准数字字符串格式化
Console.WriteLine("{0:c}",10); //¥10.00
Console.WriteLine("{0:d2}",5); //05
Console.WriteLine("{0:f1}",1.26); //1.3
Console.WriteLine("{0:p0}",0.1); //10%

// 尽量避免拆箱，装箱操作,会造成更多的性能消耗（虽然消耗也不大）
int i = 123;
string a = "" + i;//有装箱操作，应该改为如下：
// string a = "" + i.ToString();


// 枚举
[flags]//有这个证明该枚举可以多选
enum Xxx{
    first,
    second
}

// 类的构造函数
Class A{
    private name;
    private age;

    public Age{
        get(){
            return this.age;
        }
        set(){
            this.age = value;
        }
    }

    public string Password{get;set;}//自动属性 包含一个字段 2个方法 只有编译成中间语言时才存在，相当于
    /**
    private password;//实际不是叫做password，随便个名词  
    public Password{
        get(){
            return this.password;
        }
        set(){
            this.password = value;
        }
    }
    */

    public A(){
        Console.WriteLine("hh");
    }

    public A(string name):this(){//这样可以调用上面那个无参构造函数
        this.name = name;
    }

    public A(string name,int age):this(name){//这样可以调用上面那个一参数的构造函数
        this.Age = age;
    }
}
```

对我来说的新语法：
ref
out

类型转换的两种方式（这里不考虑隐式转换）：
显示转换 和 使用 as；显示转换可能报错（在使用类继承时，通过先隐式转为父类，再转为其他子类），用as如果转换失败会返回null

```List<int>``` 跟 ```int[]``` 不同，前者自带一些操作数组的方法

struct不可以设置无参构造函数；
已过时（作者本人不加也没报错）：在有参数的构造函数里使用自动属性的话需要加上```:this()```；
struct 是值类型，class是引用类型；
参考：[struct 结构体 和class的区别](https://www.bilibili.com/video/BV12s411g7gU?p=108)

数组清空方法：Array.clear

提高代码可读性：
#region XXX
#endregion


# 资料
[史上最全Unity3D教程](https://www.bilibili.com/video/BV12s411g7gU)