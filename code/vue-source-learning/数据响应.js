const obj = {
  a: 1
}
let watchFn = null
let container = []

const config = {
  get: () => {
    container.push(watchFn)
  },
  set: () => {
    container.forEach(fn => fn())
  }
}
Object.defineProperty(obj, 'a', config)

function $watch(key, fn) {
  watchFn = fn
  obj[key]
}

$watch('a', () => {
  console.log('see')
})
$watch('a', () => {
  console.log('see see see')
})


export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Define a property.
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

Object.prototype.toString.call(obj) // 使用toString()检测对象类型,返回 "[object type]"
const _toString = Object.prototype.toString
export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

// Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
// 描述节
// 默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 __proto__ 属性可以被更改。Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。

Object.create(proto, [propertiesObject])
// 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
// polyfill,创建新对象为啥没有修订constructor属性..
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
}

var o = Object.create({c: 3});
o.__proto__ = {a: 1, b: 2}
o.a // 1
o.c // undefined, 通过create参数方式创建的__proto__被替换
var o1 = Object.create(null);
o1.__proto__ = {a: 1, b: 2}
o1.a // undefined
o1.__proto__.a // 1

function A() { this.a = 1 }
A.prototype.b = 2 // prototype为Function.prototype的属性，等于__proto__,不受构造函数中的属性和new以后的对象的属性影响，只可以通过Function.prototype，'实例'.__proto__修改
var a = new A()
a.__proto__.a // undefined
a.__proto__.b // 2
a.__proto__ === A.prototype // true
String.__proto__ === String.prototype // false
''.__proto__ === String.prototype // true
// Boolean.prototype 属性表示Boolean 构造函数的原型。
// Function.prototype 属性存储了 Function 的原型对象。
// Object.prototype 属性表示 Object 的原型对象。
// String.prototype 属性表示 String原型对象。


Object.getOwnPropertyNames() //方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
Object.getOwnPropertyDescriptor(obj, prop) //方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

// 搜索时发现竟然有小伙伴和我一样的状态，隔一段时间不看原型就忘记了，本次复习，温故知新
// prototype： 构造函数上的属性, 原型，函数以及String，Boolean等上包含（拼写和property`属性`类似）
// __proto__： 实例属性， 通过new关键字产生的实例
// prototype === __proto__
// 复习： 构造函数，原型，原型链关系， new 一个实例都发生哪些变化
// Object.create({c: 3}) 方法使用

// 技巧1
// 由 通过__proto__ = {...}引发的爆炸，得出结论，赋值后可以通过`实例.属性访问`或者`实例.__proto__` 访问
// 技巧2
const augment = hasProto
  ? protoAugment
  : copyAugment
augment(value, arrayMethods, arrayKeys)
