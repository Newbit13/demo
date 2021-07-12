
视频学习：[TensorFlow官方入门实操课程](https://www.bilibili.com/video/BV1rz4y117p1)
从上述视频提到的实训实验平台:[中国大学MOOC在线实训平台](https://ot.icourse163.org/)

在这个实训平台里我觉得我可以学习到怎么使用tensorflow，所以我暂时不看上面的视频，转而学习这个平台里的教程

# 第一章 深度学习的hello world
体会：我通过实训平台的中英文结合看，才能了解代码里参数的含义。

```python
# numpy库,支持大量的维度数组与矩阵运算,此外也针对数组运算提供大量的数学函数库
# keras库,一个定义神经网络的框架,它将神经元网络模型定义为一组Sequential层
import tensorflow as tf
import numpy as np
from tensorflow import keras

# 1.定义并编译神经元网络
model = tf.keras.Sequential([keras.layers.Dense(units=1, input_shape=[1])])
# 这里units=1表示这层只有一个神经元，input_shape=[1]表示它的输入只是一个数值

# 2.提供一个损失函数和一个优化器
model.compile(optimizer='sgd', loss='mean_squared_error')
# 损失函数将猜测结果与正确答案进行比较，衡量偏差程度。
# 使用优化器（optimizer函数再做一次猜测，努力使损失最小化）
# 这里sgd表示STOCHASTIC GRADIENT DESCENT，同步梯度下降；mean_squared_error表示MEAN SQUARED ERROR，平均平方误差

# 3.提供训练数据
xs = np.array([-1.0,  0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], dtype=float)
# 通过numpy这个库提供一个如代码所示的数据结构，这是一个标准做法（大家都这样做）   （此段落是我的意译）

# 4.训练神经元网络
model.fit(xs, ys, epochs=10)
# 在调用model.fit函数时，神经网络“学习”X和Y之间的关系。在这个过程中，它将一次又一次地完成上面所说的循环，即做一个猜测，衡量它有多好或多坏（又名损失），使用Opimizer进行再一次猜测，如此往复。训练将根据指定的遍数（epochs）执行此操作。当运行此代码时，将在输出结果中看到损失（loss）。
print(model.predict([10.0]))
# 这里模型训练好了，通过model.predict来看看它学习后对10.0预测的结果,大多数时候我们得到的是一个比较接近的结果，可以说我们几乎是在处理概率，而非确定的值，所以还需要进一步编写程序找出概率对应的结果
```