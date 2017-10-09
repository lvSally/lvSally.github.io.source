---
title: es6 函数总结
date: 2017-10-07 16:55:53
categories: js
tags: es6
---

>es6增加了很多语法糖，比如增加了一些方便判断的属性，写法上更加简单了

## 函数形参的默认值
  形参默认值，即定义函数的时候可以给形参赋值，赋值的内容可以是`常量`，`变量`，`表达式`
  >需要注意的是：
  1 默认值对arguments对象有影响
  2 默认参数的临时死区

## 处理无命名参数
  由于javascript函数的参数想传多少就传多少，之前会使用`arguments`对象处理无命名，现在可以使用`...arg`方式替代
  >注意
  1 不定参后面不能有其他参数
  2 不定参不能用于对象字面量setter中，因为setter中的参数有且只有一个
  3 无论是否有不定参，arguments对象总是包含所有传入的参数

## 增强function构造函数
  function构造函数，几乎没有用过...
  ```
  // 使用案例
  var add = new function('first', 'second=1', 'return first + second');
  ```

## 展开运算符
  这是一个语法糖，嘿嘿，和不定参很像，不定参可以让各自独立的一些参数最终以数组的方式访问，展开运算的则是将数组打乱成各自独立的参数
  ```
  Math.max(25, 50, 70, 100);
  // 同样写法
  let val = [25, 50, 70, 100];
  Math.max(...val);

  也支持这种写法
  Math.max(...val, 101);
  ```

## name属性
  `Function.name`, 方便开发者追踪栈记录

## 函数的多重用途
  ### 用途
  1 和`new`一起使用作为构造函数 内部调用[[Constructor]]
  2 函数使用 内部调用[[Call]]
  ### 判断函数是否作为构造函数在使用
  es5
  `p1 instanceof Person` 但是无法区分是通过Person.call()还是new关键字得到的实例
  es6
  通过new.target来判断
  当调用函数的[[Constructor]]方法时，会为new.target赋值new操作符的目标，通常为new时候的`构造函数`，如果函数调用的是[[Call]],new.target则为`undefined`
  // 通过new关键字创建
  eg: typeof new.target !== "undefined"

## 块级函数
  es5严格模式下，在代码块中声明函数会报异常，而在es6中作为一个块级声明（`严格模式`），在作用域内可以使用，一旦代码块执行完毕后，函数也结束了，非严格模式下会被提升至外围函数或者全局作用域中
  块级函数与let函数表达式类似，区别为块级函数会被提升至块的顶部，let 函数表达式不会

## 箭头函数
  箭头函数很像c#中的lambda表达式
  >特点
  1 没有 this, super, arguments, new.target的绑定，这些都由外围最近一层的非箭头函数决定
  2 不能通过new关键字调用
  3 没有原型
  4 不可改变this的绑定
  5 不支持arguments对象
  6 不支持重复的命名参数

  ### 语法
  ```
  let doNothing = () => {}; // 创建空函数
  let getName = () => Nicholas;// 无参
  let reflect = value => value;// 一个参数
  let sum = (num1, num2) => num1+mum2; // 多个参数，一个表达式的函数体
  let sum = (num1, num2) => { // 多个参数，由多个表达式组成的函数体
    return num1+mum2;
  };

  // 如果返回结果是对象，需要将该字面量包在`()`中,这样是为了与函数体区分
  let getTempItem = id => ({id: id, name: 'temp'});

  //创建立即执行函数
  let person = ((name) => {
    return {
      getName: function() {
        return name;
      }
    }
  })('Nicholas');
  ```

  ### 其它
  1 简化sort,map,reduce的写法，eg: `values.sort((a, b) => a-b)`
  2 在箭头函数上调用apply, call, bind和普通函数类似，只是箭头函数中的this不会受这些方法的影响

## 尾调用优化
  >系统引擎优化

  ```
  function a() {
    return b(); // 尾调用
  }
  ```
