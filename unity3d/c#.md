# 关于VISUAL STUDIO 2019里写c#
ctrl + K + D 自动对齐代码
ctrl + K + c 注释
ctrl + K + u 取消注释

ctrl + r + m 把代码块提到新的方法里

选中变量，Alt + 回车，可以自动添加属性&字段等

在类中输入prop + tab + tab会快速生成类的自动属性
# C#基础
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

// int? 不再是原来的值类型，如果需要获得值类型数据，使用a.Value
```

对我来说的新语法：
ref
out 相当于拥有了多个函数返回值

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

```c#
// 非泛型和泛型
// 非泛型缺点：
// 1.性能不好，因为可能发生装箱
// 2.类型不安全，可能会发生类型转换的异常
// 3.使用不方便，用的时候可能需要手动做类型转换 
// 列表 ArrayList List<T>
// 字典 Hashtable Dictionary<TKey,TValue>
// 栈 Stack Stack<T>
// 队列 Queue Queue<T>
```