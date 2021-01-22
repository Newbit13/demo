import 'package:flutter/material.dart';

import 'HeroAnimationRouteB.dart';

class HeroAnimationRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        alignment: Alignment.center,
        child: Material(
            child: InkWell(
          child: Hero(
            tag: "avatar", //唯一标记，前后两个路由页Hero的tag必须相同
            child: ClipOval(
              child: Image.asset(
                "imgs/jjdjr.jpg",
                width: 50.0,
              ),
            ),
          ),
          onTap: () {
            //打开B路由
            Navigator.push(context, PageRouteBuilder(pageBuilder:
                (BuildContext context, Animation<double> animation,
                    Animation secondaryAnimation) {
              return new FadeTransition(
                opacity: animation,
                child: Scaffold(
                  appBar: AppBar(
                    title: Text("原图"),
                  ),
                  body: HeroAnimationRouteB(),
                ),
              );
            }));
          },
        ))
        // child: Column(
        //   children: [
        //     Hero(
        //       tag: "avatar", //唯一标记，前后两个路由页Hero的tag必须相同
        //       child: ClipOval(
        //         child: Image.asset(
        //           "imgs/jjdjr.jpg",
        //           width: 50.0,
        //         ),
        //       ),
        //     ),
        //     RaisedButton(onPressed: () {
        //       //打开B路由
        //       Navigator.push(context, PageRouteBuilder(pageBuilder:
        //           (BuildContext context, Animation<double> animation,
        //               Animation secondaryAnimation) {
        //         return new FadeTransition(
        //           opacity: animation,
        //           child: Scaffold(
        //             appBar: AppBar(
        //               title: Text("原图"),
        //             ),
        //             body: HeroAnimationRouteB(),
        //           ),
        //         );
        //       }));
        //     })
        //   ],
        // ),
        );
  }
}
