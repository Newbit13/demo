视频学习：[TensorFlow 官方入门实操课程](https://www.bilibili.com/video/BV1rz4y117p1)
从上述视频提到的实训实验平台:[中国大学 MOOC 在线实训平台](https://ot.icourse163.org/)

在这个实训平台里我觉得我可以学习到怎么使用 tensorflow，所以我暂时不看上面的视频，转而学习这个平台里的教程

# 第一章 深度学习的 hello world

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

# 第二章 计算机视觉实例

```python
import tensorflow as tf

mnist = tf.keras.datasets.fashion_mnist #这里是取得准备好的数据集，获取的来源我暂时不知道具体步骤
# 调用load_data方法会得到两个元组，每个元组包含两个列表；存储图形数据和标签值
(training_images, training_labels), (test_images, test_labels) = mnist.load_data()


# 打印某个训练图像和训练标签看看
import matplotlib.pyplot as plt
plt.imshow(training_images[0]) # 打印图像
print(training_labels[0]) #标签值，这里是一个数字
print(training_images[0]) #这里打印的是一个二维数组，每个值为0~255，我认为算是图形二进制数据

# 出于多种原因，如果把所有的值都处理成0和1之间，那就更容易得到较好的训练效果。这个过程叫做 "归一化"
training_images  = training_images / 255.0
test_images = test_images / 255.0

# 重点，设计这个图片分类的模型
model = tf.keras.models.Sequential([tf.keras.layers.Flatten(),
                                    tf.keras.layers.Dense(128, activation=tf.nn.relu),
                                    tf.keras.layers.Dense(10, activation=tf.nn.softmax)])

# Sequential   定义了神经网络层的层数序列   （这里个人这样认为，把神经网络想象成一层层，那么这里就规定了每一层都有什么，每一层作为参数传给了Sequential函数）   
# Flatten   把之前那个二维数组变成一维的集合（拍平）    
# Dense     每一层神经元都需要一个激活函数来告诉它们该做什么（这里一个Dense应该就是一层，激活函数有很多种）
# Relu      这里的作用是：如果X>0返回X，否则返回0"它所做的只是将值0或更大的值传递给网络的下一层  
# Softmax   采用一组值，有效地选择最大的值，因此，例如，如果最后一层的输出看起来像[0.1,0.1,0.05,0.1,9.5,0.1,0.05,0.05,0.05]，它可以寻找最大的值，并将其转化为[0,0,0.1,0,0,0,0,0] - 目标是节省大量编码

# 通过设置优化器和损失函数，然后调用model.fit来训练它
model.compile(optimizer = tf.optimizers.Adam(),
              loss = 'sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(training_images, training_labels, epochs=5)
# 可以从执行的结果看到准确率

# 看看测试的数据的准确率如何，一般会低一点，这时候得通过一些手段提高准确率
model.evaluate(test_images, test_labels)
```

目前不清楚的点：
metrics 衡量指标，对应的值有什么
优化器，损失函数各有什么类型的，作用跟适用范围
