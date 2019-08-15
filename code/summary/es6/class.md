`一等公民`：在编程语言中，可以直接被当做值来使用的叫做一等公民，因此函数表达式和类表达式都属于一等公民
es6主要是借鉴了一些语言的好处，开发中踩过的坑，方便开发者比价优秀的写法，其实学习es6还是很有必要的。

## 整体认识
class 大多数是function的语法糖，大部分情况都可以通过es5的语法实现，同时拥有函数的很多特点： 类表达式，可计算属性，立即执行类，静态属性，继承也是基于原型继承封装，使用类更多是class的写法，写漂亮的代码

## 访问器属性
和其他面向对象一样，添加get,set
``` javascript
class Test {
  constructor(num) {
    this.element = num
  }
  get num() {
    return this.element
  }

  set num(val) {
    this.element = val+1
  }
}

let test = new Test(1)
test.num = 3
console.log(test.element) // 4
```

## Symbol.species
``` javascript
class MyArray extends Array {
  // 覆盖 species 到父级的 Array 构造函数上
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array);   // true
```

## new.target
在构造函数中利用new.target，用于模仿面向对象语言中抽象类不能被实例化行为

## Symbol
每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
Symbol属性（作为特定标识使用）
Symbol.iterator: 一个返回一个对象默认迭代器的方法。被 for...of 使用。
Symbol.species: 一个用于创建派生对象的构造器函数。