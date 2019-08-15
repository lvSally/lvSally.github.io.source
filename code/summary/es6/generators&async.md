>
昨天开始阅读迭代器与生成器，看到生成器对迭代器提供的各种帮助，由于平时也没有用过，一脸懵逼，读到最后生成器对于异步编程写法，发现生成器(`* + yield`)好像es7中的(`async + await`),迫不及待想和小伙伴沟通下，后面还是选择自己搜一下。[Async-Await≈Generators+Promises](https://juejin.im/post/5b04c7db6fb9a07aa542a772)

## 迭代器与生成器(generators)
`迭代器:` 迭代器被设计专用于迭代的对象，带有特定的接口，所有的迭代器对象都拥有next方法，会返回一个结果对象`{done: false, value: val}`, 当最后一个值返回时，会返回`{done: true, value: undefined}`
`生成器:` 能返回一个迭代器的函数
```javascript
function *createIterator() {
  yield 1
  yield 2
  yield 3
}
```

### 可迭代对象与for-of循环
可迭代对象(iterable), 是包含Symbol.iterator属性的对象，可以通过for-of进行遍历， `所有的集合（数组、Map、Set）以及字符串都是可迭代对象`

`for-of`用于可迭代对象，不可以遍历普通对象，因为不是iterable
`for-in` 只遍历可枚举属性， 可以遍历普通对象属性 [for-in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)

### 访问默认迭代器
```javascript
let arr = [1, 2, 3]
let iterator = arr[Symbol.iterator]()
for(item of iterator) {
  console.log(item)
}
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 判断是否为可迭代对象
function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function'
}
```

### 创建可迭代对象
```javascript
let collection = {
  items: [1, 2, 3],
  items2: [6, 7, 8],
  *[Symbol.iterator]() {
    for(let item of this.items) {
      yield item
    }
    for(let item of this.items2) {
      yield item
    }
  },
}

for(let x of collection) {
  console.log(x)
}

let test = {a: 1, b:2}
for(let x of test) {
  console.log(x)
}
```

## Async-Await≈Generators+Promises

```javascript
  function doTask1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('test1')
      }, 1000)
    })
  }
  function doTask2(res) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`upper1: ${res},test2`)
      }, 1000)
    })
  }
  function doTask3(res) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`upper2: ${res},test3`)
      }, 500)
    })
  }

  async function init() {
    const res1 = await doTask1()
    console.log(res1)
    const res2 = await doTask2(res1)
    console.log(res2)
    const res3 = await doTask3(res2)
    console.log(res3)
    return res3
  }

  function *initGen() {
    const res1 = yield doTask1()
    console.log(res1)
    const res2 = yield doTask2(res1)
    console.log(res2)
    const res3 = yield doTask3(res2)
    console.log(res3)
    return res3
  }

  function runner(genFn) {
    const itr = genFn()
    function run(arg) {
      const reslut = itr.next(arg)
      if(reslut.done) {
        return reslut.value
      } else {
        return Promise.resolve(reslut.value).then(run)
      }
    }

    return run()
  }

  // generators + promise
  runner(initGen)

  // async + await
  // init()

  //* + yield
  // let g = initGen()
  // g.next() // value: promise, done: false
  // g.next() // value: promise, done: false
  // g.next() // value: promise, done: false
  // g.next() // value: promise, done: true

```


## 其他
总觉的可迭代可枚举都可以迭代，感觉有些傻傻分不清了，查了下可枚举的定义
[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
可枚举属性是指那些内部 “可枚举” 标志设置为 true 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true，对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false。可枚举的属性可以通过 for...in 循环进行遍历（除非该属性名是一个 Symbol）。