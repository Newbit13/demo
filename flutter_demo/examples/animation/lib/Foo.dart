import 'package:flutter/material.dart';

class Foo extends StatefulWidget {
  @override
  _FooState createState() => _FooState();
}

class _FooState extends State<Foo> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  initState() {
    super.initState();
    controller = new AnimationController(
        duration: const Duration(seconds: 3), vsync: this);
    //图片宽高从0变到300
    // animation = new Tween(begin: 0.0, end: 300.0).animate(controller)
    animation = new Tween(begin: 0.0, end: 300.0).animate(CurvedAnimation(parent: controller, curve: Curves.bounceIn))
      ..addListener(() {
        setState(() => {});
      });
    //启动动画(正向执行)
    controller.forward();
  }

  dispose() {
    //路由销毁时需要释放动画资源
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // print('rebuild');
    return Container(
        color: Colors.white,
        child: Center(
            child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text("Animation"),
          Image.asset("imgs/jjdjr.jpg",
              width: animation.value, height: animation.value)
        ])));
  }
}
