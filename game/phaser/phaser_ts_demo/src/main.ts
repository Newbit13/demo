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
  this.load.image("ground", "assets/ground.png");
}

function create(this: Phaser.Scene) {
  // 添加天空
  // this.add.image(400, 300, "sky");//由于原本图片定位是在其中心点，此处的sky大小为800*600，所以为了显示在左上角，就需要右移400，下移300
  this.add.image(0, 0, "sky").setOrigin(0, 0); //将把图像的绘制定位点重置为左上角

  // 设置红色的彗星，并且会从大变小
  var particles = this.add.particles("red");
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: "ADD",
  });

  var logo = this.physics.add.image(400, 100, "logo");
  logo.setVelocity(100, 200); //设置初始的速度（方向）
  logo.setBounce(1, 1); //设置x，y的弹力
  logo.setCollideWorldBounds(true); //让世界的边界可以被碰撞到
  // 添加红色的彗星尾巴特效给logo
  emitter.startFollow(logo);

  // 设置物理系统中的静态物体，它可以被触碰，但是不会动，一般可以用来设置墙，地面
  let platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
}

// let oo = {
//   add: function (this: any, n: number) {
//     console.log(n);
//     console.log(this);
//   },
// };
// oo.add(1);
