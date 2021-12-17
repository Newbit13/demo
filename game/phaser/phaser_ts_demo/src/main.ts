import "./style.css";
import Phaser from "phaser";

let widW = window.innerWidth;
let widH = window.innerHeight;

let config = {
  type: Phaser.AUTO,
  width: widW,
  height: widH - 4,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};
new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  // this.load.setBaseURL("http://labs.phaser.io");

  // this.load.image("sky", "assets/skies/space3.png");
  // this.load.image("logo", "assets/sprites/phaser3-logo.png");
  // this.load.image("red", "assets/particles/red.png");
  this.load.image("sky", "assets/space3.png");
  this.load.image("logo", "assets/phaser3-logo.png");
  this.load.image("red", "assets/red.png");
}

function create(this: Phaser.Scene) {
  // this.add.image(400, 300, "sky");//由于原本图片定位是在其中心点，此处的sky大小为800*600，所以为了显示在左上角，就需要右移400，下移300
  this.add.image(0, 0, "sky").setOrigin(0, 0); //将把图像的绘制定位点重置为左上角

  var particles = this.add.particles("red");

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: "ADD",
  });

  var logo = this.physics.add.image(400, 100, "logo");

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

// let oo = {
//   add: function (this: any, n: number) {
//     console.log(n);
//     console.log(this);
//   },
// };
// oo.add(1);
