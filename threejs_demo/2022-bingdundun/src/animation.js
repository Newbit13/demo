import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
const Animations = {
  animateCamera: (camera, controls, newP, newT, time = 2000, callBack) => {
    var tween = new TWEEN.Tween({
      x1: camera.position.x,
      y1: camera.position.y,
      z1: camera.position.z,
      x2: controls.target.x,
      y2: controls.target.y,
      z2: controls.target.z,
    });
    tween.to(
      {
        x1: newP.x,
        y1: newP.y,
        z1: newP.z,
        x2: newT.x,
        y2: newT.y,
        z2: newT.z,
      },
      time
    );
    tween.onUpdate(function (object) {
      camera.position.x = object.x1;
      camera.position.y = object.y1;
      camera.position.z = object.z1;
      controls.target.x = object.x2;
      controls.target.y = object.y2;
      controls.target.z = object.z2;
      controls.update();
    });
    tween.onComplete(function () {
      controls.enabled = true;
      callBack();
    });
    tween.easing(TWEEN.Easing.Cubic.InOut);
    tween.start();
  },
};
export default Animations;
