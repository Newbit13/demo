import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow/tfjs-backend-wasm";
import image from "./caicai.jpg";

const model = poseDetection.SupportedModels.MoveNet;
poseDetection.createDetector(model).then(async (detector) => {
  let imgDom = document.getElementById("myimg");
  imgDom.setAttribute("src", image);
  imgDom.onload = function () {
    detector.estimatePoses(imgDom).then((poses) => {
      console.log(poses);
    });
  };
});
