# 学习笔记
1.快捷键
Alt + 鼠标/方向键
F
鼠标&鼠标滚轮中键

选择一个物体，按v,可以选择顶点，用于顶点吸附用（这样两物体可以无缝贴紧）

选中摄像机（或者物体），调整你在场景看到的画面 ， ctrl + shift + f 可以将选中的物体位置进行改变

## 关于优化
 [occlusion culling 遮挡剔除](https://www.bilibili.com/video/BV12s411g7gU?p=16)
 
 [levels of detail 多细节层次](https://www.bilibili.com/video/BV12s411g7gU?p=17)


# 关于VISUAL STUDIO 2019里写c#
ctrl + K + D 自动对齐代码
ctrl + K + c 注释
ctrl + K + u 取消注释

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
```

对我来说的新语法：
ref
out

# 资料
[史上最全Unity3D教程](https://www.bilibili.com/video/BV12s411g7gU)