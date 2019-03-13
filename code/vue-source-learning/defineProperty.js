function Vue() {}

// 给构造函数添加属性(添加静态方法)

Vue.options = Object.create(null) // 没有继承的属性
Vue.options._base = '_base'

// config
const config = {
  opt1: "opt1",
  opt2: "opt2"
}
const configDef = {}
configDef.get = () => config
Object.defineProperty(Vue, 'config', configDef) // 通过defineProperty细化的定义属性，给构造原函数定义属性
// Object.defineProperty(Vue, 'config', { get: () => config }) // 同上
console.log(Vue.options)
console.log(Vue.config) // 可以访问只读属性config
console.log(Vue) // 变了Vue的属性中不会遍历config






// 通过defineProperty给实例定义属性
let vue = new Vue()
Object.defineProperty(vue, 'config', { get: () => '实例' })
console.log(vue.config)


// Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
// configurable
// 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
// enumerable
// 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
// 数据描述符同时具有以下可选键值：
//
// value
// 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
// writable
// 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
// 存取描述符同时具有以下可选键值：
//
// get
// 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
// 默认为 undefined。
// set
// 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
// 默认为 undefined。

// 如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。
// 如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。
// 当属性不可配置时，不能在数据和访问器属性类型之间切换。
//
// 当试图改变不可配置属性（除了writable 属性之外）的值时会抛出TypeError，除非当前值和新值相同。
