import 'package:flutter/widgets.dart';

class UpdateChild extends StatefulWidget {
  final StatefulWidgetBuilder builder;

  UpdateChild({Key? key,required this.builder}) : super(key: key);

  @override
  _UpdateChildState createState() => _UpdateChildState();
}

class _UpdateChildState extends State<UpdateChild> {
  @override
  Widget build(BuildContext context) {
    print("UpdateChild rebuild");
    return widget.builder(context,setState);
  }
}