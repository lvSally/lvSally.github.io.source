---
title: css选择器
date: 2017-09-29 10:45:58
categories: css
tags: 选择器
---

> 总结选择器感觉就是像在记流水账，，，不过css的选择器功能确实挺强大的，有些匹配和正则的匹配方式是一致的，有些是css3新增的，旧版本的浏览器可能会不支持，可以通过caniuse网站来查看兼容性。

![](/img/选择器.png)
[详细脑图](http://naotu.baidu.com/file/cb535512773b5dcc4ecc10ddcd92c0d3)

## css历史
  >css1 1996
  css2 1992
  css2.1 2007
  css3 2001-.

## 外部文件引入方式
 `<link rel="stylesheet" href="css.css"></link>`

## 浏览器私有属性
  >chrome，safari
  `-webkit-`
  firefox
  `-moz-`
  IE
  `-ms-`
  opera
  `-o-`

## 语法
  注释
  `/**/`
  选择器 {
    属性声明
  }

  属性声明=属性名：属性值

  属性值语法：
  margin:[<length>|<percentage>|auto]{1,4}
         基本元素 组合符号 数量符号

  基本类型
  关键字, 类型, 符号（/,）, inherit, initial

 组合符号
  空格（必填，顺序有关）
  &&（必填，顺序无关，）
  ||（至少出现一个）
  | （只能出现一个）
  [] 分组

 数量符号
  无
  `+` 可以出现一次货多次
  `?` 可出现也可以不出现
  `{2,4}`
  `*`
  `#` 一次或者多次

  规则语法
  @标示符 xxx;
  @ 标示符 {}

  规则
  @media
  @keyframes
  @font-face
  @import

## 选择器
  ID选择器
  类选择器
  标签选择器
  `*`通配符选择器

  ### 属性选择器
  ```
  [attr]
  [attr="val"] 表示val中包含符号或者空格
  [attr=val]  #nav{} == [id=nav]{}
  [attr~=val] .sport{} == [class~=sports]{}，可用于除了class以为的其它属性
  [attr|=val] 特定属性选择器，一般用于匹配属性lang的值
  [attr^=val]
  [attr$=val]
  [attr*=val]
  ```
  ### 伪类选择器
  ```
  a:link
  a:visited
  a:hover
  a:active
  :enabled, disabled, checked
  :only-child

  :first-child
  :last-child
  :nth-child(even|odd)
  :nth-child(n+1)
  :nth-last-child(n+1)

  dd:first-of-type{}(同上)

  :empty
  :root
  :not eg: :not(p)选择非p元素
  :target
  :lang()
  ```
  ### 伪元素选择器
  ```
  (应用在元素内容的选择器)在css3中为了区别伪元素和伪类在前面添加::
  ::first-letter
  ::first-line
  ::before (和content一起使用)
  ::after
  ::selection
  ```

  ### 组合选择器
  ```
  后代选择器
  .main h2
  子选择权
  .main>h12
  兄弟选择器
  h2+p(获取前面为h2的一个p元素)
  h2~p(获取前面为h2的所有兄弟)
  ```
  ### 选择器分组
  `h1,h2,h3...`
## css优先级
  !important
  a = 行内样式                       `1000`
  b = ID选择器的数量                  `100`
  c = 类、属性选择器的数量             `10`
  d = 标签选择器和伪元素选择器的数据量   `1`

## 兼容性测试网站
  https://www.quirksmode.org/css/
  http://caniuse.com/
