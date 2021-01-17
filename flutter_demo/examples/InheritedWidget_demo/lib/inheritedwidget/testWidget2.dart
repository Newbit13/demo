import 'package:flutter/material.dart';

class TestWidget2 extends StatefulWidget {
  @override
  __TestWidget2State createState() => new __TestWidget2State();
}

class __TestWidget2State extends State<TestWidget2> {
  @override
  Widget build(BuildContext context) {
    print("TestWidget2 build");
    //使用InheritedWidget中的共享数据
    return Center(
      child:
          RaisedButton(child: Text("Increment"), onPressed: () => print("111")),
    );
    // return Text("Hellow world");
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    //父或祖先widget中的InheritedWidget改变(updateShouldNotify返回true)时会被调用。
    //如果build中没有依赖InheritedWidget，则此回调不会被调用。
    print("Dependencies change2");
  }
}
