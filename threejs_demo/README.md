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

# 光源
环境光( AmbientLight )：笼罩在整个空间无处不在的光
点光源( PointLight )：向四面八方发射的单点光源
聚光灯( SpotLight )：发射出锥形状的光， 模拟手电筒，台灯等光源
平行光( DirectinalLight )：平行的一束光，模拟从很远处照射的太阳光

# 参考资料
[一步步带你实现web全景看房——three.js](https://juejin.cn/post/6844903918409875469)
[three.js官方文档](https://threejs.org/docs/)
[《Three.js 入门指南》3.1.1 - 基本几何形状 - 球体（SphereGeometry）](https://www.cnblogs.com/jaycethanks/p/12032947.html)
[关于从入门three.js到做出3d地球这件事(第四篇: 贴图地球)](https://www.it610.com/article/1381281198894030848.htm)

别人收集的教程，demo，工具：
[ThreeJS For Fun](https://github.com/chenjsh36/ThreeJSForFun/)

# 文中涉及的api
[AxesHelper](http://www.yanhuangxueyuan.com/doc/Three.js/AxesHelper.html)