import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from '../node_modules/three/examples/jsm/loaders/STLLoader';
let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = 5;
	camera.position.y = 0.3;
	camera.position.x = 0.3;

	scene = new THREE.Scene();

	let axesHelper = new THREE.AxisHelper(0.4);
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	//BufferGeometry demo start
	const MAX_POINTS = 500;
	// geometry
	const geometry = new THREE.BufferGeometry();

	// attributes
	let positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	// draw range
	const drawCount = 5; // draw the first 2 points, only
	geometry.setDrawRange(0, drawCount);

	// material
	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// line
	const line = new THREE.Line(geometry, material);
	scene.add(line);

	positions = line.geometry.attributes.position.array;

	let x, y, z, index;
	x = y = z = index = 0;

	for (let i = 0, l = MAX_POINTS; i < l; i++) {

		positions[index++] = x;
		positions[index++] = y;
		positions[index++] = z;

		x += (Math.random() - 0.5) * 30;
		y += (Math.random() - 0.5) * 30;
		z += (Math.random() - 0.5) * 30;

	}
	//BufferGeometry demo end

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