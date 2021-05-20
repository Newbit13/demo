import 'package:flutter/material.dart';
// import 'package:flutter_application_1/MyHomePage2.dart';
import 'package:flutter_application_1/MyHomePage.dart';

import 'MyHomePage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo2',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page233'),
    );
  }
}
