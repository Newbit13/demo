# 步骤
1.设置相机
```js
camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;
```
2.设置场景
```js
scene = new THREE.Scene();
```
3.创建mesh（由几何体（geometry）和材质（material）组成）,并添加到场景中
```js
geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
material = new THREE.MeshNormalMaterial();

mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

//加个辅助线（可不加）
let axesHelper = new THREE.AxisHelper(0.5);
scene.add(axesHelper);
```
4.往页面中添加渲染器
```js
renderer = new THREE.WebGLRenderer( { antialias: true } );//antialias:平滑，抗锯齿
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```
5.执行渲染
```js
function render(){
    renderer.render( scene, camera );
}
render();
```

## 其他
- 可以设置鼠标控制相机的位置
```diff
// 轨道控制器
render();

+ const controls = new THREE.OrbitControls(camera, renderer.domElement);
+ controls.addEventListener("change", render);
```

- 可以设置动画
```diff
renderer.setSize( window.innerWidth, window.innerHeight );
+ renderer.setAnimationLoop( animation );
---------------------------------------------
- function render(){
-     renderer.render( scene, camera );
- }
- render();
+ function animation( time ) {
+ 
+ 	mesh.rotation.x = time / 2000;
+ 	mesh.rotation.y = time / 1000;
+ 
+ 	renderer.render( scene, camera );
+ 
+ }
```
- 旋转90°
`geometry.rotation.x = Math.PI / 2`

- 添加后期处理效果demo 在html中引入如下index.js(需要配置webpack之类的打包工具，并且`npm i three`)
```js
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
```
# 优化
1.用BufferGeometry代替Geometry，BufferGeometry 会缓存网格模型，性能更高效。

    BufferGeometry
    BufferGeometries 将信息（例如顶点位置，面索引，法线，颜色，uv和任何自定义属性）存储在buffers —— 也就是， typed arrays. 这使得它们通常比标准Geometries更快，缺点是更难用。

[摘自官方资料](https://threejs.org/docs/#manual/zh/introduction/How-to-update-things)

2.使用clone()方法
```js
// 创建一个立方体（大小默认为 1,1,1）
const baseBoxBufferGeometry = new THREE.BoxBufferGeometry()
// 克隆几何体
const geometry = baseBoxBufferGeometry.clone()
// 通过缩放设置几何体的大小
geometry.scale(20, 20, 20)
```
3.不再需要的物体应该进行销毁操作dispose



# 光源
环境光( AmbientLight )：笼罩在整个空间无处不在的光
点光源( PointLight )：向四面八方发射的单点光源
聚光灯( SpotLight )：发射出锥形状的光， 模拟手电筒，台灯等光源
平行光( DirectinalLight )：平行的一束光，模拟从很远处照射的太阳光

# 参考资料
[Three.js和其它webgl框架](https://blog.csdn.net/qq_30100043/article/details/82014971)
[一步步带你实现web全景看房——three.js](https://juejin.cn/post/6844903918409875469)
[three.js官方文档](https://threejs.org/docs/)
[《Three.js 入门指南》3.1.1 - 基本几何形状 - 球体（SphereGeometry）](https://www.cnblogs.com/jaycethanks/p/12032947.html)
[关于从入门three.js到做出3d地球这件事(第四篇: 贴图地球)](https://www.it610.com/article/1381281198894030848.htm)
[深度解析，用Threejs临摹微信跳一跳 (1)](https://juejin.cn/post/6844903966573068302)

别人收集的教程，demo，工具：
[ThreeJS For Fun](https://github.com/chenjsh36/ThreeJSForFun/)

# 文中涉及的api
[AxesHelper](http://www.yanhuangxueyuan.com/doc/Three.js/AxesHelper.html)

# 学习笔记
# OrbitControls.js
`controls.enablePan = false`禁止摄像机可以平移（通过鼠标右键）