// import THREE from 'three';
// const THREE = require('three');

function init() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);//renderer.domElement 一个canvas
    // 场景
    const scene = new THREE.Scene();
    // 相机
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.set(10, 0, 0);

    // 轨道控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.minDistance = 1;
    controls.maxDistance = 200;
    controls.enablePan = false;

    // 新增一个红色球
    const geometry = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // 坐标轴辅助线
    scene.add(new THREE.AxisHelper(1000));

    controls.update(); // 控制器需要
    controls.target.copy(mesh.position);

    function render() {
        renderer.render(scene, camera);
    }

    function r() {
        render();
        requestAnimationFrame(r)
    }
    r()
}

init();
