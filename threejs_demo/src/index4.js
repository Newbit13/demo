let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshLambertMaterial();

	mesh = new THREE.Mesh(geometry, material);
	// 物体产生影子
	mesh.castShadow = true;
	// mesh.rotation.x = 1
	// mesh.rotation.y = 1
	scene.add(mesh);

	// 添加第二个东西
	let geometry2 = new THREE.SphereGeometry(0.1, 50, 50);
	// let material2 = new THREE.MeshNormalMaterial();
	let material2 = new THREE.MeshLambertMaterial();
	let mesh2 = new THREE.Mesh(geometry2, material2);
	mesh2.castShadow = true;
	mesh2.position.x = 0.2
	mesh2.position.y = 0.2
	scene.add(mesh2);

	// 添加第三个东西
	let geometry3 = new THREE.SphereGeometry(0.1, 50, 50);
	// let material2 = new THREE.MeshNormalMaterial();
	let material3 = new THREE.MeshBasicMaterial({
		color: 0x59bff2,
		wireframe: true
	});
	let mesh3 = new THREE.Mesh(geometry3, material3);
	mesh3.castShadow = true;
	mesh3.position.x = 0.2
	mesh3.position.y = 0.2
	scene.add(mesh3);


	let axesHelper = new THREE.AxisHelper(0.4);
	// axesHelper.position.z = 0.1
	// axesHelper.rotation.x = -0.5
	// axesHelper.rotation.y = -0.5
	// axesHelper.rotation.z = -0.5
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	const light = new THREE.DirectionalLight(0xffffff, 2)
	// 光产生影子
	light.castShadow = true;//暂时没看到效果
	light.position.x = 0.6
	light.position.y = 0.6
	light.position.z = 0.6
	scene.add(light);
	// 地面接受影子
	// ground.receiveShadow = true;

	renderer = new THREE.WebGLRenderer({ antialias: true });//antialias:平滑，抗锯齿
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	function render() {
		renderer.render(scene, camera);
	}
	render();

	// 轨道控制器
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener("change", render);
}