let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);
	camera.position.z = 0.2;

	scene = new THREE.Scene();

	const texture  = new THREE.TextureLoader().load('./ss.png');
	// const texture  = new THREE.TextureLoader().load('./wang.png');
	const material = new THREE.MeshBasicMaterial({
		map: texture
	})
	const geometry = new THREE.SphereGeometry(0.05, 50, 50);
	geometry.scale(-1, 1, 1);//对球形几何网格进行x轴反转，使所有的面点向内，否则就是朝外
	// 加入纹理
	const mesh = new THREE.Mesh(geometry, material)
	// 放入几何
	scene.add(mesh);
	// geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	// material = new THREE.MeshLambertMaterial();

	// mesh = new THREE.Mesh(geometry, material);
	// // 物体产生影子
	// mesh.castShadow = true;
	// // mesh.rotation.x = 1
	// // mesh.rotation.y = 1
	// scene.add(mesh);

	// let geometry2 = new THREE.SphereGeometry(0.05, 50, 50);
	// // let material2 = new THREE.MeshNormalMaterial();
	// let material2 = new THREE.MeshLambertMaterial();
	// let mesh2 = new THREE.Mesh(geometry2, material2);
	// mesh2.castShadow = true;
	// scene.add(mesh2);

	let geometry3 = new THREE.SphereGeometry(0.1, 10, 10);
	// let material2 = new THREE.MeshNormalMaterial();
	let material3 = new THREE.MeshBasicMaterial({
		color: 0x59bff2,
		wireframe: true
	});
	let mesh3 = new THREE.Mesh(geometry3, material3);
	mesh3.castShadow = true;
	// mesh3.position.x = 0.2
	// mesh3.position.y = 0.2
	scene.add(mesh3);

	let geometry4 = new THREE.SphereGeometry(0.09, 10, 10);
	// let material2 = new THREE.MeshNormalMaterial();
	let material4 = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		wireframe: true
	});
	let mesh4 = new THREE.Mesh(geometry4, material4);
	mesh4.castShadow = true;
	// mesh4.position.x = 0.2
	// mesh4.position.y = 0.2
	scene.add(mesh4);


	// let axesHelper = new THREE.AxisHelper(0.4);
	// scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	const light = new THREE.DirectionalLight(0xffffff, 2)
	// 光产生影子
	light.castShadow = true;//暂时没看到效果
	light.position.x = 0.6
	light.position.y = 0.6
	light.position.z = 0.6
	scene.add(light);

	renderer = new THREE.WebGLRenderer({ antialias: true });//antialias:平滑，抗锯齿
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);


	const stat = new Stats();
    document.body.appendChild(stat.dom);

	function render() {
		renderer.render(scene, camera);

		stat.update();
	}
	// render();
	function animation(time) {
		// mesh3.rotation.x = time / 2000;
		mesh3.rotation.y = time / 1000;
		mesh4.rotation.y = -time / 2000;
		render();
	}

	// 轨道控制器
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener("change", render);
	controls.enablePan = false;
	// controls.autoRotate = true;
}