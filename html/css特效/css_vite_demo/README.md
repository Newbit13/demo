box-shadow 可以创造许多和盒子一样大小的东西：

```css
.manyCicyle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 0 #000, 10px 10px 0 0 #000, 20px 20px 0 0 #000, 30px 30px 0
      0 #000, 40px 40px 0 0 #000;
}
```

mix-blend-mode
color-dodge
Brightens the backdrop color to reflect the source color.调亮背景色以反映源色
为的是与背景的颜色更好的融合在一起
...

SVG 滤镜
https://github.com/chokcoco/cnblogsArticle/issues/27

```html
<svg>
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feOffset in="blur" dx="30" dy="30" result="offsetBlur" />

      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="blur" />
      </feMerge>
    </filter>
  </defs>
</svg>
```

```css
.svgFilter {
  filter: url(#blur);
}
```

in="SourceGraphic" 属性指明了模糊效果要应用于整个图片
stdDeviation 属性定义了模糊的程度。
最后，在 CSS 中，使用了 filter: url(#blur) 去调用 HTML 中定义的 id 为 blur 的滤镜。

不同滤镜作用的效果可以通过 result 产出一个中间结果（也称为 primitives 图元），其他滤镜可以使用 in 属性导入不同滤镜产出的 result，继续操作。

使用 feMerge 配合 feMergeNode 的 in，可以合并多个效果（滤镜可以多个搭配使用）

通用属性:x,y,width,height,result,in
    其中 in:
        SourceGraphic	该关键词表示图形元素自身将作为 <filter> 原语的原始输入
        SourceAlpha	该关键词表示图形元素自身将作为 <filter> 原语的原始输入。SourceAlpha 与 SourceGraphic 具有相同的规则除了 SourceAlpha 只使用元素的非透明部分
        BackgroundImage	与 SourceGraphic 类似，但可在背景上使用。 需要显式设置
        BackgroundAlpha	与 SourceAlpha 类似，但可在背景上使用。 需要显式设置
        FillPaint	将其放置在无限平面上一样使用填充油漆
        StrokePaint	将其放在无限平面上一样使用描边绘画


