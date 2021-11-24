使用movenet

https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet


await是否能写在函数外？
参考以下：
顶层（top-level）await
https://www.jianshu.com/p/7e0b26310008


多体与单体姿势检测 推理速度、准确率相差不大，可以认为多体跟单体表现一样优秀

poseDetection.createDetector 接受两个参数：
1. model
2. detectorConfig（可选）
    modelType：
        值为poseDetection.movenet.modelType下的
            SINGLEPOSE_LIGHTNING （默认）：最快的单体姿势detector
            SINGLEPOSE_THUNDER          ：更准确但是更慢的单体姿势detector
            MULTIPOSE_LIGHTNING         ：多体姿势检测，最多6个
    
    enableSmoothing：true(默认) 是否使用时间过滤器（temporal filter）来平滑的预测keypoints（文档说用来模拟不同fps用的，暂不研究）

    modelUrl：可以传model的链接（目测可以加载缓存的model优化加载速度）

    minPoseScore ：设置置信度（每个keypoints都会有相应的置信度，这里应该是指整体姿势的置信度（应该是判断是不是人或者人被遮挡时的姿势预测吧））

    multiPoseMaxDimension ：暂不研究。大意是设置最大的姿势尺寸，越大计算越慢。估计可以通过这个设置提高解析速度


    enableTracking ：（布尔值）只用于多体姿势模型中，开启后可以给检测中的每个人一个id以区分及追踪此人

    trackerType ：TrackerType 类型，选择使用什么tracker，默认使用边界框跟踪（bounding box tracking）

    trackerConfig：TrackerConfig类型。暂不研究
    
通过poseDetection.createDetector创建的detector。
detector.estimatePoses接收各类图片或视频通过这些格式：tf.Tensor3D, ImageData, HTMLVideoElement, HTMLImageElement, HTMLCanvasElement.

Calculate Distance or Size of an Object in a photo image：
https://www.scantips.com/lights/subjectdistance.html