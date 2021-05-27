# 值得注意
```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

@mixin 定义方法，然后@include引用

@extend 引用已有的样式，注意跟@mixin+@include有所区分,功能相近但extend更适用于有继承概念的语义化方面

