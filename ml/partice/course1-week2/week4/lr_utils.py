import numpy as np
import h5py
    
    
def load_dataset():
    train_dataset = h5py.File('datasets/train_catvnoncat.h5', "r") # r表示readonly
    # print(train_dataset["train_set_x"]) #HDF5 dataset "train_set_x" 类型
    train_set_x_orig = np.array(train_dataset["train_set_x"]) # your train set features
    train_set_y_orig = np.array(train_dataset["train_set_y"]) # your train set labels

    test_dataset = h5py.File('datasets/test_catvnoncat.h5', "r")
    test_set_x_orig = np.array(test_dataset["test_set_x"]) # your test set features
    test_set_y_orig = np.array(test_dataset["test_set_y"]) # your test set labels

    classes = np.array(test_dataset["list_classes"]) # the list of classes
    
    train_set_y_orig = train_set_y_orig.reshape((1, train_set_y_orig.shape[0]))
    test_set_y_orig = test_set_y_orig.reshape((1, test_set_y_orig.shape[0]))
    
    return train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig, classes

def sigmoid(z):
    """
    参数：
        z  - 任何大小的标量或numpy数组。

    返回：
        s  -  sigmoid（z）
    """
    s = 1 / (1 + np.exp(-z))
    return s,z

def sigmoid_backward(dA, cache):
    """
    Implement the backward propagation for a single SIGMOID unit.

    Arguments:
    dA -- post-activation gradient, of any shape
    cache -- 'Z' where we store for computing backward propagation efficiently

    Returns:
    dZ -- Gradient of the cost with respect to Z
    """

    Z = cache

    s = 1/(1+np.exp(-Z))
    dZ = dA * s * (1-s)

    assert (dZ.shape == Z.shape)

    return dZ

def relu(z):
    """
    参数：
        z  - 任何大小的标量或numpy数组。

    返回：
        s  -  relu
    """
    s = np.maximum(0,z)
    return s,z

def relu_backward(dA, cache):
    """
    Implement the backward propagation for a single RELU unit.

    Arguments:
    dA -- post-activation gradient, of any shape
    cache -- 'Z' where we store for computing backward propagation efficiently

    Returns:
    dZ -- Gradient of the cost with respect to Z
    """

    Z = cache
    dZ = np.array(dA, copy=True) # just converting dz to a correct object.

    # When z <= 0, you should set dz to 0 as well. 
    dZ[Z <= 0] = 0

    assert (dZ.shape == Z.shape)

    return dZ

def tanh(z):
    """
    参数：
        z  - 任何大小的标量或numpy数组。

    返回：
        s  -  tanh
    """
    s = np.tanh(z)
    return s,z

def tanh_backward(dA, cache):
    Z = cache
    a = (np.exp(Z) - np.exp(-Z))/(np.exp(Z)+np.exp(-Z))
    dZ = np.multiply(dA, 1 - np.power(a, 2))

    return dZ