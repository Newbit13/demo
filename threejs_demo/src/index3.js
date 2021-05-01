let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	let axesHelper = new THREE.AxisHelper(0.4);
	scene.add(axesHelper);//辅助线，绿色：y 红色：x 蓝色：z
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );//antialias:平滑，抗锯齿
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	function render(){
		renderer.render( scene, camera );
	}
	render();

	// 轨道控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
}