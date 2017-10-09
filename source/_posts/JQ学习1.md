---
title: JQ学习1
date: 2017-05-15 12:52:23
categories: js
tags: jquery
---

### jq结构
```javascript
(function( window, undefined ) {
  // If there is a window object, that at least has a document property,
  // define jQuery and $ identifiers
  if ( typeof window === "object" && typeof window.document === "object" ) {
    window.jQuery = window.$ = jQuery;
  }
})( window );
```
传入window对象时防止压缩时window被处理为普通变量
undefined在一些浏览器中可以对undefined进行修改

### JQ对象上的属性和方法
```javascript
jQuery = function( selector, context ) {
  // The jQuery object is actually just the init constructor 'enhanced'
  return new jQuery.fn.init( selector, context, rootjQuery );
}
jquery.fn = jquery.prototype = {
  jquery: 版本, 
  constructor: 修正指针指向问题,  
  init: 初始化和参数管理,
  selector: 存储选择字符串, 
  length: this对象的长度,
  toArray: 传数组,
  ...
}
jQuery.fn.init.prototype = jQuery.fn;
```
[参考文章](https://github.com/chyingp/blog/blob/master/jquery/jQuery%E6%BA%90%E7%A0%81-%E6%A0%B8%E5%BF%83%E7%BB%93%E6%9E%84.md)

### init方法
```javascript
jQuery.fn = jQuery.prototype = {
  init: function() {
    $(""), $(null), $(undefined), $(false)

    $('#div1') 
    $('.box') $('div')  $('#div1 div.box')
    $('<li>')  $('<li>1</li><li>2</li>')
    
    $(this)  $(document)    
    $(function(){})   
    $([])  $({})
    
    return jQuery.makeArray( selector, this );
  }
}
```

备注：
1 constructor以字面量的方式定义对象，需要指定当前的constructor
2 prototype,  constructor, 面向对象概念理解 

