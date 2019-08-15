## 模块化

>每次查资料都是CommonJS,AMD,CMD,ES6,然后各种懵逼..[这篇](http://huangxuan.me/js-module-7day)描述最清晰了，没有之一

##[JavaScript 模块化七日谈](http://huangxuan.me/js-module-7day)

### 模块化一直在发展以及被广发使用的原因
- web被广泛使用
- js文件越来越大，难以维护，复用性也不好
- JavaScript语言本身问题，只存在函数作用域（因此好多模块化也是基于闭包去实现）
- 文件引用过多，导致http请求的次数增多

### day1
上古时期 -- 设计模式中模块模式..

### day2
石器时代 -- LAB.js 基于文件的依赖管理

### day3
蒸汽朋克 -- YUI3 Loader - Module Loader 基于模块的依赖管理

### day4
号角吹响 -- COMMONJS 同步/阻塞式加载

### day5
双塔奇兵 -- AMD/CMD
  AMD: RequireJS 依赖前置,提前加载 Early Download, Early Executing
  CMD: SeaJS 依赖就近，延迟执行 Early Download, Lazy Executing

### day6
精灵宝钻 -- BROWSERIFY/WEBPACK
NPM(Node Package Manger)

### day7
王者归来 -- ES6 MODULE