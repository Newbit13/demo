// 导入极光特效
import "./style.scss";

// 让极光动起来
var filter = document.querySelector("#turbulence");
var frames = 0;
var rad = Math.PI / 180;
var bfx,bfy,bf

function freqAnimation() {
  bfx = 0.005;
  bfy = 0.005;
  frames += 0.5;
  bfx += 0.0025 * Math.cos(frames * rad);
  bfy += 0.0025 * Math.sin(frames * rad);

  bf = bfx.toString() + " " + bfy.toString();
  filter.setAttributeNS(null, "baseFrequency", bf);
  window.requestAnimationFrame(freqAnimation);
}

window.requestAnimationFrame(freqAnimation);
