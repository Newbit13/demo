import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Animations from "./animation";
import bingdundunModel from "./assets/bingdundun.glb";

import landModel from "./assets/land.glb";
let skyTexture = "./assets/sky.jpg";
function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true }); //antialias 抗锯齿，虽然我看不出有什么改善
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; //开启阴影，待观察
  document.body.appendChild(renderer.domElement); //renderer.domElement 一个canvas
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load(skyTexture);
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
          child.material.roughness = 0.8;//粗糙度,越低越光滑，光滑的效果就是反光很明显
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

  // 新增一个红色球
  const geometry = new THREE.SphereGeometry(1, 10, 10);
  //材质一般是应用在mesh上，用来模拟物体的表面，在光线、阴影等因素的作用下所展示出来的最终效果。
  //比如我们经常说的高光材质，漫反射材质等等，其实都是在描述物体的表面如何处理光线作用。不同的作用结果，最终将呈现不同的效果到我们的眼睛。
  //threejs常见的内置材质有基础材质（MeshBasicMaterial），高光材质（MeshPhongMaterial），漫反射材质（MeshLambertMaterial），标准PBR材质（MeshStandardMaterial）等。
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  // 没看到效果，估计不能这样用？
  // material.metalness = 0.5;
  // material.roughness = 0.5;
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // 坐标轴辅助线
  scene.add(new THREE.AxisHelper(1000)); //辅助线，绿色：y 红色：x 蓝色：z

  controls.update(); // 控制器需要
  controls.target.copy(mesh.position);

  function render() {
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
//https://mp.weixin.qq.com/s/Z0AkpppCJBoe1m58eOZtog
//https://zhuanlan.zhihu.com/p/142773940