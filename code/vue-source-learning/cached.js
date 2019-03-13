function cached (fn) {
  const cache = Object.create(null)
  return (function cachedFn (str) {
    console.log(cache)
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

const idToTemplate = cached(id => {
  debugger
  return id
})
console.log(idToTemplate(1))
console.log(idToTemplate(12))
console.log(idToTemplate(123))

// 内部函数可以访问定义它们的外部函数的参数和变量（除了this和arguments之外）
// 如果需要访问对象的name属性的话，就需要显示的定义一个变量that来引用this，而这个变量此时就指向object对象了。
