// Copyright 2014 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:hello_world/Foo2.dart';

import 'AnimatedSwitcherCounterRoute.dart';
import 'Foo.dart';
import 'HeroAnimationRoute.dart';


void main() => runApp(MaterialApp(
    title: 'Gold Rupee',
    theme: ThemeData(
      primarySwatch: Colors.orange,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    ),
    // home: Foo2()
    // home: HeroAnimationRoute()
    home: AnimatedSwitcherCounterRoute()
    ));
