import 'package:flutter/material.dart';
import 'package:flutter_application_1/D.dart';

class MyHomePage2 extends StatefulWidget {
  MyHomePage2({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePage2State createState() => _MyHomePage2State();
}

class _MyHomePage2State extends State<MyHomePage2> {
  @override
  Widget build(BuildContext context) {
    print(MediaQuery.of(context).size.width);
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              width: 100,
              height: 100,
              color: Colors.red,
              child: Center(
                child: Text(
                  "1",
                  style: TextStyle(color: Colors.white, fontSize: 38),
                ),
              ),
            ),
            Container(
              width: 100,
              height: 100,
              color: Colors.pink,
              child: Center(
                child: Text(
                  "2",
                  style: TextStyle(color: Colors.white, fontSize: 38),
                ),
              ),
            ),
            Container(
              width: 100,
              height: 100,
              color: Colors.blue,
              child: Center(
                child: Text(
                  "3",
                  style: TextStyle(color: Colors.white, fontSize: 38),
                ),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Row(
              children: [
                Expanded(
                    flex: 1,
                    child: Container(
                      decoration: BoxDecoration(color: Colors.amber),
                      color: Colors.blue,
                    )),
                Expanded(
                    flex: 1,
                    child: Container(
                      height: 30,
                      color: Colors.red,
                    ))
              ],
            ),
            D(
              color: Colors.blue,
            ),
            D(
              color: Colors.red,
              key: Key("1"),
            ),
            D(
              color: Colors.green,
              key: Key("2"),
            ),
          ],
        ),
      ),
    );
  }
}
