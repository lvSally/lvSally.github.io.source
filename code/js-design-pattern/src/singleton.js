export function createDiv() {
  let div = document.createElement('div')
  div.innerHTML = '我是唯一的div'
  document.body.append(div)
  return div
}

export let getSingle = function(fn) {
  let res
  return function () {
    return res || (res = fn.apply(this, arguments))
  }
}

export default function() {}

// 确保只有一个实例，并提供全局访问。