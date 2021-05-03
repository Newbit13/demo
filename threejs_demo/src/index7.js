let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);
	camera.position.z = 1;
	camera.position.y = 0.3;
	camera.position.x = 0.3;
	// 无效原因，相机被OrbitControls接管
	// camera.rotateX(1);

	scene = new THREE.Scene();

	// const texture = new THREE.TextureLoader().load('./kjl.webp');
	// const material = new THREE.MeshBasicMaterial({
	// 	map: texture
	// })
	// const geometry = new THREE.SphereGeometry(0.05, 50, 50);
	// // geometry.scale(-1, 1, 1);//对球形几何网格进行x轴反转，使所有的面点向内，否则就是朝外
	// material.side = THREE.DoubleSide;
	// // 加入纹理
	// const mesh = new THREE.Mesh(geometry, material)
	// // 放入几何
	// scene.add(mesh);
	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshLambertMaterial();

	mesh = new THREE.Mesh(geometry, material);
	// 物体产生影子
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	// mesh.rotation.x = 1
	// mesh.rotation.y = 1
	scene.add(mesh);

	const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const points = [];
	points.push( new THREE.Vector3( - 0.5, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 0.5, 0 ) );
	points.push( new THREE.Vector3( 0.5, 0, 0 ) );
	
	const LineGeometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( LineGeometry, lineMaterial );
	scene.add( line );

	let geometry2 = new THREE.SphereGeometry(0.05, 50, 50);
	// let material2 = new THREE.MeshNormalMaterial();
	let material2 = new THREE.MeshLambertMaterial();
	let mesh2 = new THREE.Mesh(geometry2, material2);
	mesh2.position.x = 0.2
	mesh2.position.y = 0.2
	mesh2.castShadow = true;
	scene.add(mesh2);

	// let geometry3 = new THREE.SphereGeometry(0.1, 10, 10);
	// let material3 = new THREE.MeshNormalMaterial();
	// // let material3 = new THREE.MeshBasicMaterial({
	// // 	color: 0x59bff2,
	// // 	wireframe: true
	// // });
	// let mesh3 = new THREE.Mesh(geometry3, material3);
	// mesh3.castShadow = true;
	// mesh3.position.x = 0.2
	// mesh3.position.y = 0.2
	// scene.add(mesh3);

	// let geometry4 = new THREE.SphereGeometry(0.09, 10, 10);
	// // let material2 = new THREE.MeshNormalMaterial();
	// let material4 = new THREE.MeshBasicMaterial({
	// 	color: 0xff0000,
	// 	wireframe: true
	// });
	// let mesh4 = new THREE.Mesh(geometry4, material4);
	// mesh4.castShadow = true;
	// // mesh4.position.x = 0.2
	// // mesh4.position.y = 0.2
	// scene.add(mesh4);


	let axesHelper = new THREE.AxisHelper(0.4);
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z

	//创建地面
	const planeGeometry = new THREE.PlaneBufferGeometry(10e2, 10e2, 1, 1)
	const planeMeterial = new THREE.MeshLambertMaterial()
	// const planeMeterial = new THREE.MeshBasicMaterial({color: 0xff0000,})

	const plane = new THREE.Mesh(planeGeometry, planeMeterial);
	plane.position.y = -0.2;
	// plane.position.z = -0.2;
	plane.rotation.x = -Math.PI / 2
	// 接收阴影
	plane.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(plane);


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
	// 场景开启阴影
	renderer.shadowMap.enabled = true
	document.body.appendChild(renderer.domElement);

	function render() {
		renderer.render(scene, camera);
	}
	// render();
	function animation(time) {
		// mesh3.rotation.x = time / 2000;
		// mesh3.rotation.y = time / 1000;
		// mesh4.rotation.y = -time / 2000;
		render();
		controls.update();
	}

	// 轨道控制器
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	// controls.target = new THREE.Vector3(0,-0.1,0);
	controls.addEventListener("change", render);
	// controls.autoRotate = true;//需要不断调用controls.update
	// controls.object.position.y = 0.5//控制摄像机
	// controls.update(); // 控制器需要 
	// controls.target.copy(mesh.position);
}