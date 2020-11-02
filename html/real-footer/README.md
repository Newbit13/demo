# 真正的页脚
页脚应该附在页面/窗口底部（当内容高度不够时）
vh:IE9及以上适用

index.html
```
<body>
    <div class="content">Content</div>
    <div class="content2">Content2</div>
    <footer>footer</footer>
</body>
```

1. position: sticky;(IE 8~15不适用)

    兼容性不好

```
body {
        min-height: 100vh;
    }
    footer {
        position: sticky;
        top: 100vh;
        background: #8e90e4;
    }
```

2. 利用calc vh position:absolute padding(IE 8不适用)

    需要知道页脚高度

```
body {
    min-height: calc(100vh - 200px);
    padding-bottom: 200px;
    position: relative;
}
footer {
    height: 200px;
    position: absolute;
    width: 100%;
}
```

3. flex-grow: 1; 内容不足占用剩余空间(IE 8~11不适用)
```
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.content {
    flex-grow: 1;
}
```