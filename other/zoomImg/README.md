# Notice
you can experience it by [https://newbit13.github.io/demo/lazyLoad/index.html](https://newbit13.github.io/demo/lazyLoad/index.html)
# Features
zoomImg is a Jquery plugin to make a `img` tag enlarged when you click it.
# How to use it 
To use zoomImg,the following files should always be included.


    <script src=https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
	<script src="zoomImg.js" type="text/javascript"></script>
Suppose we want to use it to an element ine HTML,zoomImg makes it as simple as:
HTML:


	<img src="xxx.jpg" alt="">
JavaScript:


	$('img').zoomImg();
# Documentation
There're 2 parameters it set with zoomImg,none of which is compulsory.Default values are:

	width: '80%';
	background:'rgba(0,0,0,.3)';
width:the enlarged img's width
background:the color of the screen's background-color when the img tag is enlarged.
### Example

	$('img').zoomImg({
		width:200;//can be a num or percent(str)
		background:'#ccc'
	})
# About Author
zoomImg is developed by [JunYong Huang](http://www.huangjunyong.club/newbit/ "JunYong Huang"),a growing Web front-end designer.Check His personal site for more information.
## Follow He
Email [525842854@qq.com](525842854@qq.com "525842854@qq.com") if you wish to give her a dribbble invitation!


