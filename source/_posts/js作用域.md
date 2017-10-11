---
title: js作用域
date: 2017-10-10 13:46:23
categories: js
tags: js基础
---

## javascript 作用域
  ### 全局作用域
  全局函数声明，`if`,`for`,`while`中定义的函数都属于全局作用域

  ### 函数作用域
  函数有自己的作用域,因此会有以下来定义局部作用域
  ```
  // 匿名函数被认为是表达式
  (function() {})()
  !function() {} ()
  +function(){}();
  (function(){}());
  var a = function() {return s}();
  ```

  #### 函数声明和变量声明会被前置
  ```
  var myvar = 'my value';  
  (function() {  
      alert(myvar);  
      var myvar = 'local value';  
  })();  
  ```

  变量声明前置缺省值为undefined
  >名称解析顺序：
  1 当前作用域内是否有 var foo 的定义。
  2 函数形式参数是否有使用 foo 名称的。
  3 函数自身是否叫做 foo。
  4 回溯到上一级作用域，然后从 `#1` 重新开始。

  #### 命名空间
  通过立即行函数实现，因为函数拥有自己的作用域。通过这种方式可以避免变量污染

  ```
  (function() {
      // 函数创建一个命名空间
      var $ = {};
      $.foo = function() {
        console.log(1)
          // 对外公开的函数，创建了闭包
      };
      window.$ = $;

  })(); // 立即执行此匿名函数
  ```

  ### eval作用域
  eval('var a = 1;'),由于不建议使用eval，暂不研究

  ### es6箭头函数作用域


## es3执行作用域
  执行上下文 Execution Context 简称ec
  变量对象(VO) 抽象概念主要包括（变量， 函数声明， 行数参数）
  活动对象(AO)
  执行上下文概念： 是一个抽象概念，函数执行前创建，将一系列活动组成一个栈栈底总是全局执行山下文，栈顶总是当前执行上下文
