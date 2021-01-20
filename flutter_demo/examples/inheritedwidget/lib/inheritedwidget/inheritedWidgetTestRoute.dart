import 'package:flutter/material.dart';
import 'package:hello_world/inheritedwidget/testWidget2.dart';

import 'shareDataWidget.dart';
import 'testWidget.dart';

class InheritedWidgetTestRoute extends StatefulWidget {
  InheritedWidgetTestRoute({Key key, this.child, this.child2})
      : super(key: key);
  final Widget child;
  final Widget child2;

  @override
  _InheritedWidgetTestRouteState createState() =>
      new _InheritedWidgetTestRouteState();
}

class _InheritedWidgetTestRouteState extends State<InheritedWidgetTestRoute> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ShareDataWidget(
        //使用ShareDataWidget
        data: count,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(bottom: 20.0),
              child: widget.child,
              // child: TestWidget(), //子widget中依赖ShareDataWidget
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 20.0),
              child: widget.child2,
              // child: TestWidget(), //子widget中依赖ShareDataWidget
            ),
            RaisedButton(
              child: Text("Increment"),
              //每点击一次，将count自增，然后重新build,ShareDataWidget的data将被更新
              onPressed: () => setState(() => ++count),
            ),
            // TestWidget2()
          ],
        ),
      ),
    );
  }
}
