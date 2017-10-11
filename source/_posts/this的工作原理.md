---
title: this的工作原理
date: 2017-10-10 13:34:38
categories: js
tags: js基础
---
this有一下五种指向
1 全局范围内的this，指向全局对象
2 function中的this，指向全局对象
3 方法中的this,指向当前对象
4 通过new关键字生成的，指向新生成的对象
5 通过call, apply, bind方法时，函数的this指向第一个参数

[参考页面，js秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/#function.this)
