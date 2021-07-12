# 学习笔记
1.快捷键
Alt + 鼠标/方向键
F
鼠标&鼠标滚轮中键

选择一个物体，按v,可以选择顶点，用于顶点吸附用（这样两物体可以无缝贴紧）

选中摄像机（或者物体），调整你在场景看到的画面 ， ctrl + shift + f 可以将选中的物体位置进行改变

    为什么老是找不到改变物体颜色的面板？
    要创建Material资源，在Inspector面板进行设置
    最后将Material赋给元素
    
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

如果在同一端代码中，Awake会立即执行，Start会在下一帧执行
比如：
```c#
GameObject go = new GameObject();
go.AddComponent<Image>();
NumberSprite action = go.AddComponent<NumberSprite>();//动态添加NumberSprite脚本

// 如果这时候NumberSprite类中，在Start是拿不到刚刚添加的Image的，在Awake中才能拿到
```
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

# 数据持久化存储
## PlayerPrefs类
SetFloat(name,value) GetFloat(name)
SetString() GetString()
SetInt() GetInt()
HasKey(name)//判断是否有这个名字对应的值
DeleteAll()
DeleteKey()

# 场景切换
SceneManager类，需要引入UnityEngine.SceneManagement
SceneManager.LoadScene(int); //在发布游戏前有个build setting,把场景拖过去就有序号

# 资料
[史上最全Unity3D教程](https://www.bilibili.com/video/BV12s411g7gU)