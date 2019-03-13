function Vue() {
  this.name = 'name'
}
// 定义静态属性，通过Vue.static_pro访问
Vue.static_pro = 'static_pro'
Vue.prototype.$mount = function() {
  console.log('old')
}
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function () {
  console.log(this.name) // 通this访问当前对象的上的属性
  console.log('new')
  return mount.call(this)
}
const vue = new Vue();
console.log(vue.$mount())

// call使用
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);

// 重新赋值
let test = {
  a: 1,
  b: 2
}
let test1 = test
test1 = {
  c: 3
}
console.log(test, test1)

// 修改引用
let test = {
  a: 1,
  b: 2
}
let test1 = test
test1.c = 3
console.log(test, test1)
