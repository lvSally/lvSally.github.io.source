// 构造函数
function Vue() {
  if (!this instanceof Vue) {
    console.log('必须使用关键字')
  }
  this.name  = '__vue'
  this._init()
}
// 给构造函数增加属性或方法

// 直接添加
Vue.prototype.testFn = () => {}

// 调用函数添加
initFn(Vue)
otherFn(Vue)
function initFn(vue) {
  vue.prototype._init = function() {
    console.log('init');
  }
}
function otherFn(vue) {
  vue.prototype._other = function() {
    console.log('ohter')
  }
}

// 实例化构造函数
var vue = new Vue()
Vue.prototype.testFn2 = () => {
  console.log('testFn2')
}

vue._other()
vue.testFn2()
console.log(vue.hasOwnProperty('name')) // true
console.log(vue.hasOwnProperty('testFn')) // false
console.log(vue.hasOwnProperty('otherFn')) // false
console.log(vue.hasOwnProperty('testFn2')) // false
