---
title: canvas学习笔记
date: 2017-05-03 13:49:46
categories: js
tags: canvas
---

###   简单例子
```javascript
<html>
 <head>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
```
### 直接可以绘制图形的方法
`fillRect(x, y, width, height) `绘制一个填充的矩形
`strokeRect(x, y, width, height)`绘制一个矩形的边框
`clearRect(x, y, width, height)`清除指定矩形区域，让清除部分完全透明。

###  绘制基本图形，文本，图片，变换
`translate(x, y)`translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如右图所示。
`rotate(angle)`这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。
`scale(x, y)`scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
`fillStyle = color`设置图形的填充颜色。
`strokeStyle = color`设置图形轮廓的颜色。
`globalAlpha = transparencyValue`这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。
`lineWidth = value`设置线条宽度。
`lineCap = type`设置线条末端样式。
`shadowOffsetX = float` shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
`shadowOffsetY = float` shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
`shadowBlur = float` shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
`shadowColor = color` shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

###  绘制路径
`beginPath()`新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
`closePath()`闭合路径之后图形绘制命令又重新指向到上下文中。当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。  
`stroke()`通过线条来绘制图形轮廓。
`fill()`通过填充路径的内容区域生成实心的图形
`moveTo(x, y)`将笔触移动到指定的坐标x以及y上。或者你可以想象一下在纸上作业，一支钢笔或者铅笔的笔尖从一个点到另一个点的移动过程。
`lineTo(x, y)`绘制一条从当前位置到指定x以及y位置的直线。
`arc(x, y, radius, startAngle, endAngle, anticlockwise)`画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
`quadraticCurveTo(cp1x, cp1y, x, y)`绘制贝塞尔曲线，cp1x,cp1y为控制点，x,y为结束点。
`rect(x, y, width, height)`绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
`save()restore()`save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
###  推荐基于canvas小游戏
 基于canvas的[小游戏](https://github.com/white-shirt/HTML5-Game.git)

###  详细canvas API
MDN[canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
