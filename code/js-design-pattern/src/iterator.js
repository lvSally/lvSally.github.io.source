// 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

// demo1 内部迭代器
// function each(arr, cbfn) {
//   for(let i=0; i<arr.length; i++ ) {
//     cbfn.call(arr[i], i, arr)
//   }
// }

// demo2 外部迭代器
// let iterator = function (obj) {
//   let current = 0
//   let next = function() {
//     current += 1
//   }
//   let isDone = function() {
//     current >= obj.length
//   }
//   let getCurItem = function() {
//     return obj[current]
//   }
//   return {
//     next,
//     isDone,
//     getCurItem,
//   }
// }

// demo3 可以迭代数组和对象的迭代器
let each = function(obj, cbfn) {
  let value,
    i = 0,
    length = obj.length
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      value = cbfn.call(obj[i], i, obj)
      // 约定如果回调函数的执行结果返回 false，则提前终止循环
      if (value === false) {
        break
      }
    }
  } else {
    for (let i in obj) {
      value = cbfn.call(obj[i], i, obj)
      if (value === false) {
        break
      }
    }
  }
  return obj
}

each([1, 2, 3], function(item, i) {
  console.log(item, i)
})

each({ a: 1, b: 2, c: 3 }, function(item, i) {
  console.log(item, i)
})
