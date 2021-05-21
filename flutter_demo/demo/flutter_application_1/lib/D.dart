import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class D extends StatefulWidget {
  const D({Key key, this.color}) : super(key: key);
  final Color color;

  @override
  _DState createState() => _DState();
}

class _DState extends State<D> {
  int n = 0;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => {
        setState(() {
          n++;
        })
      },
      child: Container(
        width: 100,
        height: 100,
        color: widget.color,
        child: Center(
          child: Text(
            "$n",
            style: TextStyle(color: Colors.white, fontSize: 38),
          ),
        ),
      ),
    );
  }
}
