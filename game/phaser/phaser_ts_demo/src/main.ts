import "./style.css";
import Phaser from "phaser";

let widW = window.innerWidth;
let widH = window.innerHeight;

let config = {
  type: Phaser.AUTO,
  width: widW / 1.1,
  height: widH / 1.1,
  physics: {
    default: "arcade", //有Arcade, Impact, Matter.js三种物理系统，Arcade物理系统，它简单，轻量，完美地支持移动浏览器
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  // this.load.setBaseURL("http://labs.phaser.io");

  // this.load.image("sky", "assets/skies/space3.png");
  // this.load.image("logo", "assets/sprites/phaser3-logo.png");
  // this.load.image("red", "assets/particles/red.png");
  this.load.image("sky", "assets/space3.png");
  // this.load.image("logo", "assets/phaser3-logo.png");
  this.load.image("red", "assets/red.png");
  this.load.image("ground", "assets/ground.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");

  // this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet("dude", "assets/dude.png", {
    //玩家，及每一帧的大小
    frameWidth: 32,
    frameHeight: 48,
  });
}

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let stars: Phaser.GameObjects.Group;
let bombs: Phaser.GameObjects.Group;
let score = 0;
let scoreText: Phaser.GameObjects.Text;

function create(this: Phaser.Scene) {
  // 添加天空
  // this.add.image(400, 300, "sky");//由于原本图片定位是在其中心点，此处的sky大小为800*600，所以为了显示在左上角，就需要右移400，下移300
  this.add.image(0, 0, "sky").setOrigin(0, 0); //将把图像的绘制定位点重置为左上角

  // 设置物理系统中的静态物体，它可以被触碰，但是不会动，一般可以用来设置墙，地面
  let platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // 添加一个玩家
  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  // player.body.setGravityY(300)//给玩家一个重力
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }), //使用0~3帧
    frameRate: 10, //跑动时每秒10帧
    repeat: -1, //表示动画循环播放
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms); //它接收两个对象，检测二者之间的碰撞，并使二者分开

  stars = this.physics.add.group({
    key: "star",
    repeat: 11, //重复11次，所以总共得到12颗星星
    setXY: { x: 12, y: 0, stepX: 70 }, //分别在x:12,y:0     x:82,y0    x:152,y0 ....以这样的规律分布
  });

  stars.children.iterate((child: any) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);

  //如果玩家和组中一颗星星重叠，则调用collectStar函数
  // 第五个参数用于传入this供回调函数使用
  this.physics.add.overlap(player, stars, collectStar, undefined, this);

  //记分
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    color: "#fff",
  });

  // 添加敌人：炸弹
  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.overlap(player, bombs, hitBomb, undefined, this);

  /*
  // 设置红色的彗星，并且会从大变小
  var particles = this.add.particles("red");
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: "ADD",
  });

  var specialStar = this.physics.add.image(400, 100, "star");
  specialStar.setVelocity(100, 200); //设置初始的速度（方向）
  specialStar.setBounce(1, 1); //设置x，y的弹力
  specialStar.setCollideWorldBounds(true); //让世界的边界可以被碰撞到
  // 添加红色的彗星尾巴特效给specialStar
  emitter.startFollow(specialStar);
  */
}

function collectStar(
  _player: Phaser.Physics.Arcade.Sprite | any,
  star: Phaser.Physics.Arcade.Image | any
) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    //判断星星存在的个数
    stars.children.iterate(function (child: any) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }

  //根据分数放出炸弹
  if (bombs.getLength() < score / 40) {
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb: Phaser.Physics.Arcade.Image = bombs.create(x, 16, "bomb");
    bomb.setBounce(1, 1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

function hitBomb(
  this: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite | any,
  _bombs: Phaser.Physics.Arcade.Image | any
) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("turn");
}

function update(this: Phaser.Scene) {
  // 添加键盘监控
  let cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    //判断玩家是否与地面接触，否则可以n连跳了
    player.setVelocityY(-300);
  }
}
