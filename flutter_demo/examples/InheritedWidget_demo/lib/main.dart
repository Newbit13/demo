// Copyright 2014 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'Cart/ProviderRoute.dart';
import 'inheritedwidget/InheritedWidgetTestRoute.dart';
import 'inheritedwidget/testWidget.dart';

void main() => runApp(MaterialApp(
    title: 'Gold Rupee',
    theme: ThemeData(
      primarySwatch: Colors.orange,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    ),
    // home: InheritedWidgetTestRoute(child: TestWidget(),)
    home: ProviderRoute()));
