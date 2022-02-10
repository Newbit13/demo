// import THREE from 'three';
const THREE = require('three');
// 创建场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

//渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // canvas大小
document.body.appendChild(renderer.domElement);

//网格（mesh）又是由几何体（geometry）和材质（material）构成的
//geometry
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
//material
const material = new THREE.MeshLambertMaterial();

// 有了geometry和material,就可以创建一个mesh并追加到场景中：
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 光源,光也有很多种，常见的有平行光、点光源、环境光（环境光充满所有的几何体表面）、聚光灯
//直射光
const light = new THREE.DirectionalLight(0xffffff, 0.9)
// 光产生影子
light.castShadow = true;
// 地面接受影子
// ground.receiveShadow = true;
// 物体产生影子
mesh.castShadow = true;

// 轨道控制器
// 加上此控制器，就可以通过鼠标拖拽、滚动对整个画面进行拖拽放缩
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
    renderer.render(scene, camera);
});
controls.minDistance = 1;
controls.maxDistance = 2000;
controls.enablePan = false;
