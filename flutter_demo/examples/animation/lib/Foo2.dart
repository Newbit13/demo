import 'package:flutter/material.dart';

class AnimatedImage extends AnimatedWidget {
  AnimatedImage({Key? key, required Animation<double> animation})
      : super(key: key, listenable: animation);

  Widget build(BuildContext context) {
    print('AnimatedImage rebuild');
    final Animation<double> animation = listenable as Animation<double>;
    return new Center(
      child: Image.asset("imgs/jjdjr.jpg",
          width: animation.value, height: animation.value),
    );
  }
}

class Foo2 extends StatefulWidget {
  @override
  _Foo2State createState() => _Foo2State();
}

class _Foo2State extends State<Foo2> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  initState() {
    super.initState();
    controller = new AnimationController(
        duration: const Duration(seconds: 3), vsync: this);
    //图片宽高从0变到300
    // animation = new Tween(begin: 0.0, end: 300.0).animate(controller)
    animation = new Tween(begin: 0.0, end: 300.0)
        .animate(CurvedAnimation(parent: controller, curve: Curves.easeInOut));
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
    print('rebuild');
    return Container(
        color: Colors.white,
        child: Center(
            child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text("Animation"),
          // AnimatedImage(animation: animation),
          AnimatedBuilder(
            animation: animation,
            child: Image.asset("imgs/jjdjr.jpg"),
            builder: (BuildContext ctx, Widget? child) {
              print('rebuild2');
              return new Center(
                child: Container(
                  height: animation.value,
                  width: animation.value,
                  child: child,
                ),
              );
            },
          )
        ])));
  }
}
