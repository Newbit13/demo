import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
let camera, scene, renderer;
let geometry, material, mesh;

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = 0.5;
	camera.position.y = 0.3;
	camera.position.x = 0.3;

	scene = new THREE.Scene();

	let axesHelper = new THREE.AxisHelper(0.4);
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	//demo start
	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	//demo end

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
	const composer = new EffectComposer(renderer);
	const renderPass = new RenderPass(scene, camera);
	composer.addPass(renderPass);

	const glitchPass = new GlitchPass();
	composer.addPass(glitchPass);
	// 场景开启阴影
	renderer.shadowMap.enabled = true
	document.body.appendChild(renderer.domElement);
	composer.render();
	function animation(time) {
		composer.render();
	}

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.addEventListener("change", render);
}