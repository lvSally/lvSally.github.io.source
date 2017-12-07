---
title: promise学习
date: 2017-12-06 19:51:27
categories: js
tags: es6
---

>学习promise刚开始是相当痛苦的，抱着`深入理解es6`这本书就开始看promise是个什么东西，先读了事件和回调，并不知道promise存在的意义，读到串联promise我就放弃了，感觉学习这个知识一点也不开心，学起来也很费力。直到有一天学超分享了Promise.All()的方法，好像一下就顿悟了，js这个脚本语言根本就不会存在多线程这种概念，由于我们可以自定义promise类型，在then()方法中可以异步去执行一些逻辑，才知道promise用处不仅仅是在ajax外面new一个promise。promise其实很牛逼。

## 异步编程的几种情况
promise的出现不是取代其他的异步编程写法，而是在一些情况下使用promise处理时可以方便一些。
1 事件模式
2 回调函数（ajax）
3 定时器（setTimeout, setInterval）
4 promise

## promise的生命周期
pending->settled
settled包括Fulfilled和Rejected,对应then方法的then(resolve, reject);有些类似于ajax请求的过程，pending时并不知道什么时候会处理完成，当promise处理完成已有就会根据成功和失败执行相应的回调，不同的是，then方法可以链式调用。

## promise的方法和原型方法
// ====================创建未处理的Promise=====================
```
  // 由于每次返回的都是Promise对象因此可以链式的调用下面的两个方法
  Promise.prototype.catch() // 传入两个方法，resolve, reject
  Promise.prototype.then()

  let p = new Promise(function(resolve, reject) {
    //...
    resolve(res);
    reject(err);
  });
  p.then();
  p.catch();
```


// ====================创建已处理的Promise=====================
```
  // 创建一个已处理的promise，使用promise表示一个已知值，就可以直接使用下面方法创建已解决的promise。
  Promise.reject()
  Promise.resolve()

  //二者都是接受一个已知的值，并返回一个promise对象，因此该对象就可以链式调用了
  let p = Promise.resolve(42);
  p.then((res) => {
    console.log(res); // 42
  });

  // Thenable 对象：有用then()方法，并接受resolve，reject作为参数的普通对象就叫做Thenable 对象
  let thenable = {
    then: function(resolve, reject){
      resolve(42);
    }
  }
  // 通过调用Promise.resolve(),返回Promise对象。如果想Promise.resolve()传入一个promise对象，怎不会有任何变化
  let p = Promise.resolve(thenable);
  p.then(function(res) {
      console.log(res); // 42
  });
```

//=======================链式调用promise===================
```
  1 链式中没有return值调用then返回undefined
  2 链式中return值返回对应的值
  3 链式中return值返回Promise对象，then调用return中的Promise
  new Promise((res) => {
    res(123);
  }).then((res1) => {
    console.log(res1);
    if(res.error_no !== 0 ) {
      return Promise.reject(); // return一个自定义的Promise.reject()，那么调用then()方法只能执行第二参数，实现一些特殊效果
    }
  }).then(() => {}, ()=>{});
```

//=======================相应多个promise===================
```
  Promise.all() // 返回一个数组，对应相应的返回值。表示有一个执行成功就执行resolve，否则reject
  Promise.race() //返回一个值，表示有一个执行成功就执行resolve
```
