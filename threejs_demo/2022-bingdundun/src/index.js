import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Animations from "./animation";
import bingdundunModel from "./assets/bingdundun.glb";

import landModel from "./assets/land.glb";
import flagModel from "./assets/flag.glb";
import treeModel from "./assets/tree.gltf";
import flagTexture from "./assets/flag.png";
import treeTexture from "./assets/tree.png";
import snowTexture from "./assets/snow.png";
// import skyTexture from "./assets/sky.jpg";

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true }); //antialias 抗锯齿，虽然我看不出有什么改善
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; //开启阴影，待观察
  document.body.appendChild(renderer.domElement); //renderer.domElement 一个canvas
  // 场景
  const scene = new THREE.Scene();
  //   scene.background = new THREE.TextureLoader().load(skyTexture);
  scene.background = new THREE.Color(0xffffff);
  // 相机
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 30, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 1;
  controls.maxDistance = 200;
  controls.enablePan = false;

  //添加光源
  // 直射光
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.intensity = 1;
  light.position.set(16, 16, 8);
  light.castShadow = true;
  light.shadow.mapSize.width = 512 * 12;
  light.shadow.mapSize.height = 512 * 12;
  light.shadow.camera.top = 40;
  light.shadow.camera.bottom = -40;
  light.shadow.camera.left = -40;
  light.shadow.camera.right = 40;
  scene.add(light);
  // 环境光:不能产生阴影，也不需要指定坐标位置。设置好颜色和强度就ok了
  const ambientLight = new THREE.AmbientLight(0xcfffff);
  ambientLight.intensity = 1;
  scene.add(ambientLight);

  // 有使用到GLTFLoader，这个manager才能生效
  const manager = new THREE.LoadingManager();
  manager.onStart = (url, loaded, total) => {
    console.log("start");
  };
  manager.onLoad = () => {
    console.log("Loading complete!");
  };
  manager.onProgress = (url, loaded, total) => {
    if (Math.floor((loaded / total) * 100) === 100) {
      // 镜头补间动画
      Animations.animateCamera(
        camera,
        controls,
        { x: 0, y: -1, z: 20 },
        { x: 0, y: 0, z: 0 },
        3600,
        () => {}
      ); //这个效果暂时没看到
    }
  };

  // 增加地面
  var loader = new GLTFLoader(manager);
  loader.load(landModel, function (mesh) {
    mesh.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.metalness = 0.1;
        child.material.roughness = 0.8;
      }
      // 地面
      if (child.name === "Mesh_2") {
        child.material.metalness = 0.5;
        child.receiveShadow = true;
      }
    });
    mesh.scene.rotation.y = Math.PI / 4;
    mesh.scene.position.set(15, -20, 0);
    mesh.scene.scale.set(0.9, 0.9, 0.9);
    let land = mesh.scene;
    scene.add(land);
  });

  //添加冰墩墩
  loader.load(bingdundunModel, (mesh) => {
    mesh.scene.traverse((child) => {
      if (child.isMesh) {
        //通过修改模型的透明度、金属度、粗糙度等材质参数实现  透明塑料或玻璃质感
        // 内部
        if (child.name === "oldtiger001") {
          child.material.metalness = 0.5; // 金属度
          child.material.roughness = 0.8; //粗糙度,越低越光滑，光滑的效果就是反光很明显
        }
        // 半透明外壳
        if (child.name === "oldtiger002") {
          child.material.transparent = true;
          child.material.opacity = 0.5;
          child.material.metalness = 0.2;
          child.material.roughness = 0;
          child.material.refractionRatio = 1;
          child.castShadow = true;
        }
      }
    });
    mesh.scene.rotation.y = Math.PI / 24;
    mesh.scene.position.set(-8, -12, 0);
    mesh.scene.scale.set(24, 24, 24);
    scene.add(mesh.scene);
  });

  //   奥运五环
  const fiveCycles = [
    { key: "cycle_0", color: 0x0885c2, position: { x: -250, y: 0, z: 0 } },
    { key: "cycle_1", color: 0x000000, position: { x: -10, y: 0, z: 5 } },
    { key: "cycle_2", color: 0xed334e, position: { x: 230, y: 0, z: 0 } },
    { key: "cycle_3", color: 0xfbb132, position: { x: -125, y: -100, z: -5 } },
    { key: "cycle_4", color: 0x1c8b3c, position: { x: 115, y: -100, z: 10 } },
  ];
  var fiveCyclesGroup = new THREE.Group();
  fiveCycles.map((item) => {
    let cycleMesh = new THREE.Mesh(
      //radius：圆环的半径 tube：管道的半径 radialSegments：圆环的分段数 tubularSegments：管道的分段数 arc：圆环的圆心角（单位是弧度），默认值为 Math.PI * 2
      new THREE.TorusGeometry(100, 10, 10, 50),
      new THREE.MeshLambertMaterial({
        color: new THREE.Color(item.color),
        side: THREE.DoubleSide,
      })
    );
    cycleMesh.castShadow = true;
    cycleMesh.position.set(item.position.x, item.position.y, item.position.z);
    // meshes.push(cycleMesh);
    fiveCyclesGroup.add(cycleMesh);
  });
  fiveCyclesGroup.scale.set(0.036, 0.036, 0.036);
  fiveCyclesGroup.position.set(0, 10, -8);
  scene.add(fiveCyclesGroup);

  let mixer;
  var clock = new THREE.Clock();
  // 添加插旗
  loader.load(flagModel, (mesh) => {
    mesh.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        // 旗帜
        if (child.name === "mesh_0001") {
          child.material.metalness = 0.1;
          child.material.roughness = 0.1;
          child.material.map = new THREE.TextureLoader().load(flagTexture);
        }
        // 旗杆
        if (child.name === "柱体") {
          child.material.metalness = 0.6;
          child.material.roughness = 0;
          child.material.refractionRatio = 1;
          child.material.color = new THREE.Color(0xeeeeee);
        }
      }
    });
    mesh.scene.rotation.y = Math.PI / 24;
    mesh.scene.position.set(2, -7, -1);
    mesh.scene.scale.set(4, 4, 4);
    // 动画,todo 了解
    let meshAnimation = mesh.animations[0];
    mixer = new THREE.AnimationMixer(mesh.scene);
    let animationClip = meshAnimation;
    let clipAction = mixer.clipAction(animationClip).play();
    animationClip = clipAction.getClip();
    scene.add(mesh.scene);
  });

  // 添加松树, todo 了解各个属性的效果
  let treeMaterial = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load(treeTexture),
    transparent: true,
    side: THREE.DoubleSide,
    metalness: 0.2,
    roughness: 0.8,
    depthTest: true,
    depthWrite: false,
    skinning: false,
    fog: false,
    reflectivity: 0.1,
    refractionRatio: 0,
  });
  let treeCustomDepthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    map: new THREE.TextureLoader().load(treeTexture),
    alphaTest: 0.5,
  });
  loader.load(treeModel, (mesh) => {
    mesh.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = treeMaterial;
        child.custromMaterial = treeCustomDepthMaterial; //没体验到什么明显的效果，todo 了解
        // todo 待验证：给网格添加 custromMaterial 自定义材质属性，custromMaterial可以实现透明外围 png 图片贴图的内容区域阴影。
        // child.castShadow = true;
      }
    });
    mesh.scene.position.set(14, -9, 0);
    mesh.scene.scale.set(16, 16, 16);
    scene.add(mesh.scene);
    // 克隆另两棵树
    let tree2 = mesh.scene.clone();
    tree2.position.set(10, -8, -15);
    tree2.scale.set(18, 18, 18);
    scene.add(tree2);
  });

  //   雪花，粒子效果
  let texture = new THREE.TextureLoader().load(snowTexture);
  let geometry = new THREE.BufferGeometry();
  let range = 100;
  let pointsMaterial = new THREE.PointsMaterial({
    size: 1,
    transparent: true,
    opacity: 0.8,
    map: texture,
    // 背景融合
    // 材质的.blending 属性主要控制纹理融合的叠加方式,todo 了解
    blending: THREE.AdditiveBlending,
    // 景深衰弱
    sizeAttenuation: true,
    depthTest: false,
  });
  let pointsArray = [];
  let points = [];
  for (let i = 0; i < 1500; i++) {
    let vertice = new THREE.Vector3(
      Math.random() * range - range / 2,
      Math.random() * range * 1.5,
      Math.random() * range - range / 2
    );
    // 纵向移速
    vertice.velocityY = 0.1 + Math.random() / 3;
    // 横向移速
    vertice.velocityX = (Math.random() - 0.5) / 3;
    // 加入到几何
    pointsArray.push(vertice);
  }
  geometry.setFromPoints(pointsArray);
  geometry.center();
  points = new THREE.Points(geometry, pointsMaterial);
  points.position.y = -30;
  scene.add(points);

  // 新增一个红色球
  // const myGeometry = new THREE.SphereGeometry(1, 10, 10);
  // #region 其他
  //材质
  //材质一般是应用在mesh上，用来模拟物体的表面，在光线、阴影等因素的作用下所展示出来的最终效果。
  //比如我们经常说的高光材质，漫反射材质等等，其实都是在描述物体的表面如何处理光线作用。不同的作用结果，最终将呈现不同的效果到我们的眼睛。
  //threejs常见的内置材质有基础材质（MeshBasicMaterial），高光材质（MeshPhongMaterial），漫反射材质（MeshLambertMaterial），标准PBR材质（MeshStandardMaterial）等。
  // ·MeshBasicMaterial 材质是一种较为基础材质，且不会受光照的影响，所以物体看上去并没有很多棱角，而偏向扁平化
  // ·MeshPhongMaterial 高光材质，用来模拟一些高光效果。类似金属，塑料这种有高光斑点的材质。
  // ·MeshLambertMaterial材质是漫反射材质，漫反射材质一般用来模拟表面较为粗糙，不会直接反射的表面，而是漫反射光线的材质。例如墙壁、衣服等。
  // ·MeshStandardMaterial 一种pbr(Physically based rendering)材质，用来模拟物理的材质属性。一般使用金属性metalness和粗糙度roughness来控制最终外观的效果。
  //   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  // const material = new THREE.MeshStandardMaterial({
  //   roughness: 0.6,
  //   metalness: 1,
  //   // color: 0xffffff //本来是设置材质颜色的，在这里变成了反光的颜色
  // });
  // Mesh翻译是网格、网状物的意思
  // const mesh = new THREE.Mesh(myGeometry, material);
  // scene.add(mesh);
  // #endregion

  // 坐标轴辅助线
  // scene.add(new THREE.AxisHelper(1000)); //辅助线，绿色：y 红色：x 蓝色：z

  controls.update(); // 控制器需要
  // controls.target.copy(mesh.position);//todo 什么作用

  function render() {
    let vertices = pointsArray;
    vertices.forEach(function (v) {
      v.y = v.y - v.velocityY;
      v.x = v.x - v.velocityX;
      if (v.y <= 0) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
    });
    // 顶点变动之后需要更新，否则无法实现雨滴特效
    // points.geometry.verticesNeedUpdate = true;
    geometry.setFromPoints(pointsArray);

    if (mixer !== undefined) {
      mixer.update(clock.getDelta());
    }
    renderer.render(scene, camera);
  }

  function r() {
    render();
    requestAnimationFrame(r);
  }
  r();
}

init();

//参考资料
//卧槽！用代码实现冰墩墩，太浪漫了吧https://mp.weixin.qq.com/s/Z0AkpppCJBoe1m58eOZtog
//Threejs效果调参在调什么？https://zhuanlan.zhihu.com/p/142773940


// todo
// 研究骨骼动画
// https://juejin.cn/post/6940079683740368933