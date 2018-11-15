---
title: vue源码阅读1
date: 2018-11-15 10:44:13
categories: js
tags: vue
---

>3-4月前，在丁香园面试那个架构师就问为什么要阅读源码，我们需要阅读源码吗，当时他给我的结论是是不需要阅读源码，在没有目标时无需跟风去阅读源码，那个时候的收获可能也不会多。这些时间断断续续开始了vue的源码阅读之路，觉得阅读源码还是蛮重要的，感觉分为几个维度：
1 从init开始阅读了解大型成熟框架的结构，对框架有个整体认识
2 一行行阅读源码的时候好像在玩游戏，主线是必须走的，有些分支感兴趣想去玩一下可以去看一下，说不定会有意外收获
3 主要查看部分： 响应式，数据驱动...

>这个阶段大多数是在巩固之前的基础知识

## constructorFn
  将方法按照功能分类放在不同的函数中，执行函数绑定方法，使结构更加清晰

  ```
  // 构造函数
  function Vue() {
    if (!this instanceof Vue) {
      console.log('必须使用关键字')
    }
    this.name  = '__vue'
    this._init()
  }
  // 给构造函数增加属性或方法

  // 直接添加
  Vue.prototype.testFn = () => {}

  // 调用函数添加
  initFn(Vue)
  otherFn(Vue)
  function initFn(vue) {
    vue.prototype._init = function() {
      console.log('init');
    }
  }
  function otherFn(vue) {
    vue.prototype._other = function() {
      console.log('ohter')
    }
  }

  // 实例化构造函数
  var vue = new Vue()
  Vue.prototype.testFn2 = () => {
    console.log('testFn2')
  }

  vue._other()
  vue.testFn2()
  console.log(vue.hasOwnProperty('name')) // true
  console.log(vue.hasOwnProperty('testFn')) // false
  console.log(vue.hasOwnProperty('otherFn')) // false
  console.log(vue.hasOwnProperty('testFn2')) // false
  ```
## defineProperty
  阅读js对象是，红宝书用了很多页在描述这个属性，然而自己用不到..

  ```
  function Vue() {}

  // 给构造函数添加属性(添加静态方法)

  Vue.options = Object.create(null) // 没有继承的属性
  Vue.options._base = '_base'

  // config
  const config = {
    opt1: "opt1",
    opt2: "opt2"
  }
  const configDef = {}
  configDef.get = () => config
  Object.defineProperty(Vue, 'config', configDef) // 通过defineProperty细化的定义属性，给构造原函数定义属性
  // Object.defineProperty(Vue, 'config', { get: () => config }) // 同上
  console.log(Vue.options)
  console.log(Vue.config) // 可以访问只读属性config
  console.log(Vue) // 变了Vue的属性中不会遍历config

  // 通过defineProperty给实例定义属性
  let vue = new Vue()
  Object.defineProperty(vue, 'config', { get: () => '实例' })
  console.log(vue.config)
  ```
## cached
  这个方法目前还不清楚用来做什么..,使用了闭包将数据保存在内存中,`内部函数可以访问定义它们的外部函数的参数和变量（除了this和arguments之外）`
  ```
  function cached (fn) {
    const cache = Object.create(null)
    return (function cachedFn (str) {
      console.log(cache)
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    })
  }

  const idToTemplate = cached(id => {
    debugger
    return id
  })
  console.log(idToTemplate(1))
  console.log(idToTemplate(12))
  console.log(idToTemplate(123))

  // 内部函数可以访问定义它们的外部函数的参数和变量（除了this和arguments之外）
  // 如果需要访问对象的name属性的话，就需要显示的定义一个变量that来引用this，而这个变量此时就指向object对象了。
  ```
## mount
  mount没有关注有什么功劳，但是写法很好玩，先是将原始的prototype.$mount赋值给一个变量，然后重新定义改属性并通过call应用之前的功能实现拓展。
  ```
  function Vue() {
    this.name = 'name'
  }
  // 定义静态属性，通过Vue.static_pro访问
  Vue.static_pro = 'static_pro'
  Vue.prototype.$mount = function() {
    console.log('old')
  }
  const mount = Vue.prototype.$mount
  Vue.prototype.$mount = function () {
    console.log(this.name) // 通this访问当前对象的上的属性
    console.log('new')
    return mount.call(this)
  }
  const vue = new Vue();
  console.log(vue.$mount())

  // call使用
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }

  console.log(new Food('cheese', 5).name);

  // --------------插曲---------------
  // 重新赋值
  let test = {
    a: 1,
    b: 2
  }
  let test1 = test
  test1 = {
    c: 3
  }
  console.log(test, test1)

  // 修改引用
  let test = {
    a: 1,
    b: 2
  }
  let test1 = test
  test1.c = 3
  console.log(test, test1)
  ```
## performance
  好玩的属性出体验--window.performance,之前竟然不知道有这么个检测性能的属性
  ```
  // ------------mark,measure定义--------------
  export let mark
  export let measure

  if (process.env.NODE_ENV !== 'production') {
    const perf = inBrowser && window.performance
    /* istanbul ignore if */
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = tag => perf.mark(tag)
      measure = (name, startTag, endTag) => {
        perf.measure(name, startTag, endTag)
        perf.clearMarks(startTag)
        perf.clearMarks(endTag)
        perf.clearMeasures(name)
      }
    }
  }

  // ------------mark,measure使用--------------
  if (template) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      mark('compile')
    }

    const { render, staticRenderFns } = compileToFunctions(template, {
      shouldDecodeNewlines,
      shouldDecodeNewlinesForHref,
      delimiters: options.delimiters,
      comments: options.comments
    }, this)
    options.render = render
    options.staticRenderFns = staticRenderFns

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      mark('compile end')
      measure(`vue ${this._name} compile`, 'compile', 'compile end')
    }
  }
  ```

## `_data`同名属性访问器
  众多技巧只有，通过this可以方便的访问到data中的属性
  vue实例之所以能访问`_data`中的同名属性，是因为在对象上添加了同名属性, 添加技巧，通过`Object.defineProperty(obj, key, config)`重写get和set方法实现
  ```
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {}
  }
  export function proxy (target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }
  ```
