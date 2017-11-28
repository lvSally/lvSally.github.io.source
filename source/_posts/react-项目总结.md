---
title: react 项目总结
date: 2017-11-28 20:42:10
categories: react
tags: 工作总结
---

## 格式规范
1 将大部分的正则校验放入reg文件中，统一管理，方便复用
2 将h5调用原生的方法统一放入util文件中，方便查看项目中都使用了哪些原生方法，同时可以达到复用的效果

## 使用正则匹配style中为px的数据
由于消息的详情页可能来自后台录入，录入的文章包含一些样式，由于项目中使用了flexible，使用px组件的显示都比较小，比较方便的方式就是通过正则匹配
```javascript
  pxToRem: function(_s){
    //匹配:20px或: 20px不区分大小写
    var reg = /(\:\s*)+(\d)+(px)/gi;
    let newStr= _s.replace(reg, function(_x){
      _x = _x.replace(/(\:|: )/,'').replace(/px/i,'');
      return ':' + (parseFloat(_x) * 2 / 75).toFixed(5) + 'rem';
    });
    return newStr;
  }
```
## 在一些安卓手机中border不显示
由于1px转换为rem后可能只有0.01，数值过小导致边框显示不出，
1 大多数的处理方法是不对1px的边框进行转换
  postcss-pxtorem 文档说明

  A message about ignoring properties
  ```
  // `px` is converted to `rem`
  .convert {
      font-size: 16px; // converted to 1rem
  }

  // `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers
  .ignore {
      border: 1Px solid; // ignored
      border-width: 2PX; // ignored
  }
  ```
2 [7 种方法解决移动端 Retina 屏幕 1px 边框问题](https://juejin.im/entry/584e427361ff4b006cd22c7c)

## 对js模块化理解增强
理解初始于，这样的一段代码
```
import React, { Component } from 'react';
let moduleList = [];
class Message extends Component {
  componentDidMount() {
    ...
  }

  componentWillUnmount() {
    ...
  }

  render() {
    return (
      <div className="page page-msg">
        ...
      </div>
    );
  }
}
export default Message;
```
在class外部定义的变量`moduleList`并不会被销毁，babel把一个个的实例变成了立即执行函数，查看babel编译后的文件可以看到该字段是闭包中的一个私有变量，由于在闭包中字段不会销毁并且能保留数据操作后的状态，同时也可以通过调用class中的方法来修改该字段。当然该字段也存在闭包所存在的方法，正确使用有助于提高代码的质量。
同时想到那些require.js sea.js import export, jquery之类的处理方法为了不污染外部变量都采用了再立即执行的作用域内最终return对外公开的对象，通过该对象可以操作闭包中的方法和属性，达到一些代码封装和模块加载的功能

```
// 测试
(function() {
    var _userId = 1;
    var exportTest = {};
    function converter(userId) {
        _userId = ++userId;
        return _userId;
    }
    exportTest.getUserId = function() {
        return converter(_userId);
    }
    window.exportTest = exportTest;
} ());
exportTest.getUserId()// 此时的user id 会不断增加，因为闭包中的私有变量不会被清除，除非exportTest = null,释放对闭包函数的引用
```
>总结
1 过程立即执行函数执行，同时export一个闭包函数，保存着对闭包的引用
2 当执行exportTest.getUserId() 私有变量_userId被重新赋值，呈自增（空间从未被释放）
3 exportTest = null，闭包中的变量引用，以及闭包函数被释放

## 对ref的理解
1 复杂组件可以获取对外的一些属性和方法
2 简单的可以获取一个dom节点

## 高阶组件，及高阶组件生命周期
## 生命周期

## 滚动加载组件
```
import React, { Component } from 'react';

let timer = null;

class LoadingMore extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log('scrolling');
      const loadMoreFn = this.props.loadMoreFn || function () {};
      const loadingDom = this.refs.loading;
      const loadingDomTop = loadingDom.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (loadingDomTop && loadingDomTop < windowHeight) {
        loadMoreFn();
      }
    }, 100);
  }

  componentDidMount() {
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
      pageContent.addEventListener('scroll', this.scroll, false);
    } else {
      window.addEventListener('scroll', this.scroll, false);
    }
  }

  componentWillUnmount() {
    console.log('window removeEventListener');
    const pageContent = document.querySelector('.page-content');

    if (pageContent) {
      pageContent.removeEventListener('scroll', this.scroll, false);
    } else {
      window.removeEventListener('scroll', this.scroll, false);
    }
    timer = null;
  }

  render() {
    return (
      <div className="loading-component" ref="loading">
        <div>
          <span className="font">加载中...</span>
        </div>
      </div>
    );
  }
}

export default LoadingMore;
```
优化，滚动至底部是显示没有更多数据

## webpack神器
配制：devtool: 'source-map', 结合react插件就可以打断点了
## 思想转变
由于惯性思维，设置一些status时，只想到通过两种状态如何控制视图的显示。有时候一些逻辑只用true或者false两种状态是不够的，可以使用status（1,2,3...）
## 在入口页面判断是否登录
之前错误的处理逻辑为，把入口页面index作为一个容器，根据情况平判断加载login页面还是首页，这样操作的问题是，在同一个页面中处理两套生命周期比较是比较复杂的
1 render先执行根据默认值会加载login页面
2 当didmound中拿到登录状态发现已经登录，再去加载首页

处理：
在没有拿到登录状态时先不渲染，拿到登录状态了，如果用户已经登陆在入口页加载首页，如果没有直接跳转至登录页面

## ios fix 布局
由于position: fixed在ios中存在的问题较大，使用了相对定位做了替代
>页面结构修改
由于ios对fix属性支持的不好，因此用absolute来替换
需要处理的内容，如果不需要顶部固定可以做不处理
1 顶部标题栏（header）和页面内容（page-content）和页脚（footer）为并列关系，被page包含，都是用绝对定位
2 页面内容（page-content）需要设置为纵向滚动，据顶部的距离为头部的高度
3 此时的滚动加载更多的组件滚动区域不是相对于window而是page-content
4 需要定位的固定在底部的元素可以在page-content外面绝对定位，需要区别个别手机键盘将文字顶起的情况,还有滚动一段距离固定的问题

## 低版本手机中不支持set
react 16 依赖 Set、Map、requestAnimationFrame，如果在不支持的浏览器请使用 pollyfil,处理这个问题的时候怂了，由于不清楚react16还有什么坑，我把版本设为了15.6。

## h5资源本地化的理解
就是将我们的部分文件放在手机内存中，目前的app仅有10M,由于菜单等信息都是接口获取的，暂时没有考虑资源本地化

## react路由以及props改变时触发的触发的钩子函数 componentWillReceiveProps
[React router 4 带参数的路由，从"/album?id=1"访问"/album?id=2"该如何重新渲染？](https://segmentfault.com/q/1010000012169944?_ea=2905143) 还是第一次在sf上回答，有点小激动，嘻嘻~

## jsx语法遍历对象
通过`Object.keys(obj)`来将对象转成数组，再用map去处理，其中需要注意的是，jsx语法中render的是一个对象他只会对这个对象执行，render一个组件才会被渲染在是视图中
eg:
`{<component />}` // 不会被渲染
`<component />` // 会渲染

## require的神奇情况
require在一些情况下直接读一个变量会报错，如果这样写require('../abc'+data)才可以，很神奇，情况不明


## 待处理
1 对应一个分页的页面，滚动一定的距离，进入详情页面，再返回的时候，列表页中滚动条的位置不应该被初始化到顶部
2 对于项目中的四个tab也，每次切换的时候都会有接口调用，会出现屏闪的问题，页面优化
