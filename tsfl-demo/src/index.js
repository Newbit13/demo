import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";

// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow/tfjs-backend-wasm";

import { Camera } from "./camera";
import { STATE } from "./params";
import { setBackendAndEnvFlags } from "./util";

import image from "./model.jpg";

async function app() {
  let rafId;
  // 选择？movenet，posenet，BlazePose?区别？
  // 前两个都是返回17个keypoints
  // BlazePose可以返回33个keypoints
  const model = poseDetection.SupportedModels.MoveNet;
  STATE.model = model; //用于Camera的drawKeypoints
  // 加载并初始化model
  let detector = await poseDetection.createDetector(model);
  // let imgDom = document.getElementById("myimg");
  // imgDom.setAttribute("src", image);
  // imgDom.onload = async function () {
  //   let poses = await detector.estimatePoses(imgDom);
  //   console.log(poses);
  // };

  // 初始化相机
  let camera = await Camera.setupCamera(STATE.camera);

  async function renderResult() {
    // readyState
    // 0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
    // 1 = HAVE_METADATA - 关于音频/视频就绪的元数据
    // 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
    // 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
    // 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
    if (camera.video.readyState < 2) {
      await new Promise((resolve) => {
        camera.video.onloadeddata = () => {
          resolve(video);
        };
      });
    }

    let poses = null;

    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (detector != null) {
      // FPS only counts the time it takes to finish estimatePoses.
      // beginEstimatePosesStats();//暂不引入fps显示

      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      try {
        poses = await detector.estimatePoses(camera.video, {
          // maxPoses: STATE.modelConfig.maxPoses,
          // flipHorizontal: false,
        });
      } catch (error) {
        detector.dispose();
        detector = null;
        alert(error);
      }

      // endEstimatePosesStats();////暂不引入fps显示
    }

    camera.drawCtx();

    if (poses && poses.length > 0) {
      camera.drawResults(poses);
    }
  }

  async function renderPrediction() {
    await renderResult();
    rafId = requestAnimationFrame(renderPrediction); // window.cancelAnimationFrame(rafId);
  }
  renderPrediction();
}

app();
