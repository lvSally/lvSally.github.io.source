## 装饰器
>语法糖，既可以装饰类也可以装饰类属性

``` javascript
function Cat() {}
Object.defineProperty(Cat.prototype, "say", {
  value: function() { return console.log('meow ~')},
  enumerable: false,
  configurable: true,
  writable: true,
})

// --------- 作用类的装饰器 ---------
funtion isAnimal(target){
 target.isAnimal = true
 return target
}

@isAnimal
class Cat {}
console.log(Cat.isAnimal) // true


// --------- 作用于类属性的装饰器 ---------
// 语法糖
class Cat{
  @readonly
  say() {
    console.log('meow ~')
  }
}

// 实现
function readonly(target, prototype, discriptor) {
  discriptor.writable =false
  return discriptor
}

let discriptor = {
  value: function() { return console.log('meow ~')},
  enumerable: false,
  configurable: true,
  writable: true,
}

readonly(Cat.prototype, 'say', discriptor)
```

