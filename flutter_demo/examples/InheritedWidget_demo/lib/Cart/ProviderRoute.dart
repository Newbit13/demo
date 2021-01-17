import 'package:flutter/material.dart';
import 'package:hello_world/Cart/CartModel.dart';
import 'package:hello_world/provider/ChangeNotifierProvider.dart';
import 'package:hello_world/provider/consumer.dart';

import 'item.dart';

class ProviderRoute extends StatefulWidget {
  @override
  _ProviderRouteState createState() => _ProviderRouteState();
}

class _ProviderRouteState extends State<ProviderRoute> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ChangeNotifierProvider<CartModel>(
        data: CartModel(),
        child: Builder(builder: (context) {
          print("ChangeNotifierProvider child build");

          return Column(
            children: <Widget>[
              Builder(builder: (context) {
                print("Text build");
                // var cart = ChangeNotifierProvider.of<CartModel>(context);
                // return Text("总价: ${cart.totalPrice}");

                //使用consumer使其更加语义化
                return Consumer<CartModel>(
                    builder: (context, cart) => Text("总价: ${cart.totalPrice}"));
              }),
              Builder(builder: (context) {
                print("Text build2");
                return Text("hello");
              }),
              Builder(builder: (context) {
                print("RaisedButton build"); //在后面优化部分会用到
                return RaisedButton(
                  child: Text("添加商品"),
                  onPressed: () {
                    //给购物车中添加商品，添加后总价会更新
                    ChangeNotifierProvider.of<CartModel>(context, listen: false)
                        .add(Item(20.0, 1));
                  },
                );
              }),
            ],
          );
        }),
      ),
    );
  }
}
