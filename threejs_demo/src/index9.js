import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from '../node_modules/three/examples/jsm/loaders/STLLoader';
let camera, scene, renderer;
let geometry, material, mesh;

import ganda from './ganda.stl';
// import ganda from './blasterG.stl';
// import ganda from './ARM.stl';
// import ganda from './NARUTO.stl';
init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = 500;
	camera.position.y = 0.3;
	camera.position.x = 0.3;

	scene = new THREE.Scene();

	let axesHelper = new THREE.AxisHelper(0.4);
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	var loader = new STLLoader();
	loader.load(ganda, function (geometry) {
		//创建纹理
		// var mat = new THREE.MeshLambertMaterial();
		var mat = new THREE.MeshNormalMaterial();
		// let mat = new THREE.MeshBasicMaterial({
		// 	color: 0xFFFFFF,
		// 	wireframe: true
		// });
		var mesh = new THREE.Mesh(geometry, mat);
		mesh.rotation.x = -0.4 * Math.PI; //将模型摆正
		// mesh.scale.set(4, 4, 4); //缩放
		geometry.center(); //居中显示
		scene.add(mesh);
	});

	// geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	// // material = new THREE.MeshNormalMaterial();
	// material = new THREE.MeshLambertMaterial();
	// // material = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true, transparent: true, opacity: 0.85 });
	// mesh = new THREE.Mesh(geometry, material);
	// scene.add(mesh);

	//添加光源
	const light = new THREE.DirectionalLight(0xffffff, 2)
	light.castShadow = true;//暂时没看到效果
	light.position.x = 1000
	light.position.y = 1000
	light.position.z = 1000
	scene.add(light);

	// 添加环境光,只对MeshLambertMaterial有用
	const light2 = new THREE.AmbientLight(0xffffff)
	scene.add(light2);

	renderer = new THREE.WebGLRenderer({ antialias: true });//antialias:平滑，抗锯齿
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	// 场景开启阴影
	renderer.shadowMap.enabled = true
	document.body.appendChild(renderer.domElement);

	function render() {
		renderer.render(scene, camera);
	}
	// render();
	function animation(time) {
		render();
		controls.update();
	}

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	// controls.target = new THREE.Vector3(0,-0.1,0);
	controls.addEventListener("change", render);
	// controls.autoRotate = true;//需要不断调用controls.update
	// controls.object.position.y = 0.5//控制摄像机
	// controls.update(); // 控制器需要 
	// controls.target.copy(mesh.position);
}