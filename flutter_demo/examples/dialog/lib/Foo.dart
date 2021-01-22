import 'package:flutter/material.dart';
import 'package:hello_world/UpdateChild.dart';

class Foo extends StatefulWidget {
  @override
  _FooState createState() => _FooState();
}

class _FooState extends State<Foo> {
  bool withTree = false; // 复选框选中状态

  Future<bool?> showDeleteConfirmDialog1() {
    // print(context);
    //showDialog是showGeneralDialog的一个封装
    return showDialog<bool?>(
      context: context,
      builder: (context) {
        // print(context);
        return AlertDialog(
          title: Text("提示"),
          content: Text("您确定要删除当前文件吗?"),
          actions: <Widget>[
            FlatButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(), // 关闭对话框
            ),
            Row(
              children: <Widget>[
                Text("同时删除子目录？"),
                UpdateChild(builder: (context,_setState) {
                  return Checkbox(
                    value: withTree,
                    onChanged: (bool? value) {
                      print(withTree);
                      //复选框选中状态发生变化时重新构建UI
                      _setState(() {
                        //更新复选框状态
                        withTree = !withTree;
                      });
                    },
                  );
                }),
              ],
            ),
            FlatButton(
              child: Text("删除"),
              onPressed: () {
                //关闭对话框并返回true
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> changeLanguage() async {
    int? i = await showDialog<int?>(
        context: context,
        builder: (BuildContext context) {
          return SimpleDialog(
            title: const Text('请选择语言'),
            children: <Widget>[
              SimpleDialogOption(
                onPressed: () {
                  // 返回1
                  Navigator.pop(context, 1);
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: const Text('中文简体'),
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  // 返回2
                  Navigator.pop(context, 2);
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: const Text('美国英语'),
                ),
              )
            ],
          );
        });

    print(i);
  }

  Future<void> showListDialog() async {
    int? index = await showDialog<int?>(
      context: context,
      builder: (BuildContext context) {
        var child = Column(
          children: <Widget>[
            ListTile(title: Text("请选择")),
            Expanded(
                child: ListView.builder(
              itemCount: 30,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: Text("$index"),
                  onTap: () => Navigator.of(context).pop(index),
                );
              },
            )),
          ],
        );
        //使用AlertDialog会报错
        // return AlertDialog(content: child);
        // return Dialog(child: child);
        return UnconstrainedBox(
          constrainedAxis: Axis.vertical,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 280),
            child: Material(
              child: child,
              type: MaterialType.card,
            ),
          ),
        );
      },
    );
    if (index != null) {
      print("点击了：$index");
    }
  }

  Future<T?> showCustomDialog<T>({
    required BuildContext context,
    bool barrierDismissible = true,
    required WidgetBuilder builder,
  }) {
    final ThemeData? theme = Theme.of(context);
    return showGeneralDialog(
      context: context,
      pageBuilder: (BuildContext buildContext, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        final Widget pageChild = Builder(builder: builder);
        return SafeArea(
          child: Builder(builder: (BuildContext context) {
            return theme != null
                ? Theme(data: theme, child: pageChild)
                : pageChild;
          }),
        );
      },
      barrierDismissible: barrierDismissible,
      barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
      barrierColor: Colors.black12, // 自定义遮罩颜色
      transitionDuration: const Duration(milliseconds: 150),
      transitionBuilder: _buildMaterialDialogTransitions,
    );
  }

  Widget _buildMaterialDialogTransitions(
      BuildContext context,
      Animation<double> animation,
      Animation<double> secondaryAnimation,
      Widget child) {
    // 使用缩放动画
    return ScaleTransition(
      scale: CurvedAnimation(
        parent: animation,
        curve: Curves.easeOut,
      ),
      child: child,
    );
  }

  @override
  Widget build(BuildContext context) {
    print('rebuild');
    return Container(
        color: Colors.white,
        child: Center(
            child: Column(mainAxisSize: MainAxisSize.min, children: [
          RaisedButton(
            child: Text("AlertDialog"),
            onPressed: () async {
              //弹出对话框并等待其关闭
              bool? delete = await showDeleteConfirmDialog1();
              print(delete);
              if (delete == null) {
                print("取消删除");
              } else {
                print("已确认删除");
                //... 删除文件
              }
            },
          ),
          RaisedButton(
            child: Text("SimpleDialog"),
            onPressed: () async {
              await changeLanguage();
            },
          ),
          RaisedButton(
            child: Text("Dialog"),
            onPressed: () async {
              await showListDialog();
            },
          ),
          RaisedButton(
            child: Text("showGeneralDialog"),
            onPressed: () async {
              await showCustomDialog<bool?>(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    title: Text("提示"),
                    content: Text("您确定要删除当前文件吗?"),
                    actions: <Widget>[
                      FlatButton(
                        child: Text("取消"),
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                      FlatButton(
                        child: Text("删除"),
                        onPressed: () {
                          // 执行删除操作
                          Navigator.of(context).pop(true);
                        },
                      ),
                    ],
                  );
                },
              );
            },
          )
        ])));
  }
}
