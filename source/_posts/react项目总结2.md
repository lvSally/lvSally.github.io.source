---
title: react项目总结2
date: 2018-02-02 07:51:56
categories: react
tags: 工作总结
---

### react项目，ios光标问题
  重现这个问题：在react官网上下载appdome, 随便添加一个input，在手机app或者Safari上操作，先让input `focus`，然后点击其他元素（包括按钮之类的元素），光标不会消失
  最终知道是react框架的问题，框架中在`document上绑定了blur`，导致的
  解决方案
  ```
  <script>document.addEventListener('touchstart',function(e){(document.activeElement && document.activeElement != e.target) && document.activeElement.blur();});</script>
  ```
  [参考文件](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html )

### 光标问题2
  使用absolute代替了fix解决了顶部固定问题，然而h5还是逃不过一些致命的问题，比如一个页面中存在输入框，ios的键盘又占据页面的一些空间，页面就会出现滚动条，而这种控制已经超越了h5，让我不禁想起那些追求完美的企业对于这种表单是不是直接使用原生解决了

### 写了一个自己的polyfill
  1 将相应的polyfill方法放入自执行的方法中（可以来自mdn或者github）(function() {})()
  2 在页面刚开始的时候引入 import "polyfill";

### 处理class
  1 classList，提供了add、remove、toggle以及contains等方法

  2
  var classVal = document.getElementById("id").getAttribute("class");

  //删除的话
  classVal = classVal.replace("someClassName","");
  document.getElementById("id").setAttribute("class",classVal );

  //添加的话
  classVal = classVal.concat(" someClassName");
  document.getElementById("id").setAttribute("class",classVal );

  //替换的话
  classVal = classVal.replace("someClassName","otherClassName");

### 展开运算符和剩余运算符
  `剩余运算符`
  剩余运算符要命名个变量名称的，可以用在函数参数，还有 解构赋值上{a,b,...obj}= {a:1,b:2,c:3,d:4}
  `展开运算符`
  剩余参数语法允许我们将一个不定数量的参数表示为一个数组。
  扩展语法允许一个表达式在期望多个参数（用于函数调用）或多个元素（用于数组字面量）或多个变量（用于解构赋值）的位置扩展。

  举个栗子
  <MyHead name={name} phone={tel} image={image} {...this.props}/>
  {...this.props}使用了展开运算符，会把this.props中的属性展开。
  {}是jsx识别js使用
  name={name} phone={tel} image={image} {...this.props}将作为属性传给MyHead

### 安卓手机一些兼容性问题总结及扩展
  1 webview 相当于一个浏览器
  2 a 标签 `_blank`之类的客户端可以定义一些协议去做特殊解析*
  3 android4.4部分flex， svg, canvas属性不支持
  4 file浏览器支持，但是部分webview包不支持
  5 新版本的chrome不支持window.jtoJHandle，需要判断这个属性是否存在
  6 安卓机型下，用户设置整个手机字体大小时，我们app内字体大小受影响，导致页面样式错乱。
  原因：我们app的字体大小继承到手机设置的字体大小。
  解决方案：需找安卓开发，修改安卓客户端，禁止app继承手机所设置的大小。
  7 安卓手机的分水岭4.0-4.3， 4.4
### APP调试小结
  1 很蠢很方便的方法: alert
  2 原生打debug包，然后将手机设置为允许调试状态，那么安卓可以通过`chrome://inspect/#devices`查看手机上的页面
  3 ios有mac就比较方便了，可以在`Safari`上找到相应的手机，然后找到相应的app
  4 比较方便的还是使用[vConsole](https://www.npmjs.com/package/vconsole)
  使用: 因入库，实例化对象，那么手机手机上就会出现一个悬浮按钮，点击可看一些日志

### 项目调试遇到的坑
  遇到一些网址打不开，或者一些开发的服务连不上，或者一些配置信息没有读到，可以能是一下原因，哭
  1 网址不能访问可能是开了翻墙软件
  2 开发的服务ping不到可能是开了防火墙
  3 node的配置文件死活读不到，可能是文件读错了，可以通过打印信息看一些日志。

### [redux学习总结](https://lvsally.github.io/2018/02/01/redux/)

### 单页面思考模块切换
  江海：spa+f7，增加了view的概念，可以方便模块切换时保存模块的状态，拥有自己的路由和页面跳转方法
  浙商：spa+react 想保存某些模块的内容可能只能存在缓存中（利用闭包）
  手淘分享，模块切换的问题多是放在原生解决

### 开屏广告实现方案
  开屏广告实现方案：由于h5接口获取和展示页面可能会导致页面一段时间内白屏，因此放在原生处理，利用客户端缓存上一次的广告页，那么展示的也是上一次的广告

### 第三方app解决方案
  涉及第三方网站和我们app有交互，放弃使用iframe，使用h5+原生，其中原生通过新打开一个webview展示第三方，其中返回我的的页面的时候考虑两种情况： 1 直接关闭新的webview，那么再次进入第三方页面时的页面状态将不会保存。 2 隐藏新的webview，原生端认为实现起来比较麻烦，不能和其他项目统一处理
