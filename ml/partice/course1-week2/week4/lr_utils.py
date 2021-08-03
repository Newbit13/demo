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

    # classes = np.array(test_dataset["list_classes"]) # the list of classes
    
    train_set_y_orig = train_set_y_orig.reshape((1, train_set_y_orig.shape[0]))
    test_set_y_orig = test_set_y_orig.reshape((1, test_set_y_orig.shape[0]))
    
    return train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig#, classes

def sigmoid(z):
    """
    参数：
        z  - 任何大小的标量或numpy数组。

    返回：
        s  -  sigmoid（z）
    """
    s = 1 / (1 + np.exp(-z))
    return s

def relu(z):
    """
    参数：
        z  - 任何大小的标量或numpy数组。

    返回：
        s  -  relu
    """
    s = max(0,z)
    return s