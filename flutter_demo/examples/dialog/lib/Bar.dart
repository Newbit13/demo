import 'package:flutter/material.dart';

class Bar extends StatefulWidget {
  @override
  _BarState createState() => _BarState();
}

class _BarState extends State<Bar> {
  Future<bool?> showDeleteConfirmDialog1() {
    print(context);
    return showDialog<bool?>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("提示"),
          content: Text("您确定要删除当前文件吗?"),
          actions: <Widget>[
            FlatButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(), // 关闭对话框
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

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        child: Text("对话框1"),
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
    );
  }
}
