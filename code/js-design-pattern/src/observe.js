// 观察者模式
// 发布者提供一个容器，用于存放消息收集者，当在一定情况下把消息发布至消息收集者。可以在发布者发布时和收集者收集时做一些拦截处理
// ----------------------
// demo1
// let cusA = (data) => {
//   console.log(data.cusA)
// }
// let cusB = (data) => {
//   console.log(data.cusB)
// }
// let cusList = [cusA, cusB]
// let event = (data) => {
//   console.log(data, 'event')
//   cusList.forEach(item => {
//     item.call(this, data)
//   })
// }
// let salesDepartment = { event }
// salesDepartment.event({ cusA: 'cusAAA', cusB: 'cusBBB' })

// ---------------------
// demo2 派发给所有收集者
// cache， trigger， listen
// let salesDepartment = {
//   clientArr: [],
//   trigger: function() {
//     this.clientArr.forEach(item => {
//       item.apply(this, arguments)
//     })
//   },
//   listen: function(fn) {
//     this.clientArr.push(fn)
//   }
// }

// salesDepartment.listen((data) => {
//   console.log(data.cusA)
// })
// salesDepartment.listen((data) => {
//   console.log(data.cusB)
// })

// salesDepartment.trigger({ cusA: 'cusAAA', cusB: 'cusBBB' })


// ----------------------
//demo3 指定派发给某个收集者
// let salesDepartment = {
//   clientArr: [],
//   trigger: function() {
//     let key = Array.prototype.shift.call(arguments),
//         fns = this.clientArr[key]
//     if(!fns || fns.length === 0) {
//       return
//     }
//     fns.forEach(item => {
//       item.apply(this, arguments)
//     })
//   },
//   listen: function(key, fn) {
//     if(!this.clientArr[key]) {
//       this.clientArr[key] = []
//     }
//     this.clientArr[key].push(fn)
//   }
// }

// salesDepartment.listen('cusA', (data) => {
//   console.log(data.cusA)
// })
// salesDepartment.listen('cusB', (data) => {
//   console.log(data.cusB)
// })

// salesDepartment.trigger('cusA', { cusA: 'cusAAA', cusB: 'cusBBB' })
// salesDepartment.trigger('cusA', { cusA: 'cusA22', cusB: 'cusBBB' })

// demo 4 订阅模式通用实践
let event = {
  clientArr: [],
  trigger: function() {
    let key = Array.prototype.shift.call(arguments),
        fns = this.clientArr[key]
    if(!fns || fns.length === 0) {
      return
    }
    fns.forEach(item => {
      item.apply(this, arguments)
    })
  },
  listen: function(key, fn) {
    if(!this.clientArr[key]) {
      this.clientArr[key] = []
    }
    this.clientArr[key].push(fn)
  },
  remove: function(key, fn) {
    let fns = this.clientArr[key]
    if(!fns) {
      return
    }
    if(!fn) {
      fns && (fns.length = 0)
    } else {
      for(var i = 0; i < fns.length; i++) {
        if(fns[i] === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
}
// 复制event功能
let installEvent = function(obj) {
  for(i in event) {
    obj[i] = event[i]
  }
}
let salesDepartment = {}
installEvent(salesDepartment)

let cusAFn = (data) => {
  console.log(data.cusA, 'out-fn')
}
salesDepartment.listen('cusA', (data) => {
  console.log(data.cusA)
})
salesDepartment.listen('cusA', cusAFn)
salesDepartment.trigger('cusA', { cusA: 'cusAAA', cusB: 'cusBBB' })
salesDepartment.remove('cusA', cusAFn)
salesDepartment.trigger('cusA', { cusA: 'cusAAA-romeve', cusB: 'cusBBB' })

let test = {}
installEvent(test)

let testAFn = (data) => {
  console.log(data.testA, 'out-fn')
}
test.listen('testA', (data) => {
  console.log(data.testA)
})
test.listen('testA', testAFn)
test.trigger('testA', { testA: 'testAAA', testB: 'testBBB' })
test.remove('testA', testAFn)
test.trigger('testA', { testA: 'testAAA-romeve', testB: 'testBBB' })

// demo5 全局的发布
// let event = (function() {
//   let clientArr = []
//   let trigger = function() {
//     let key = Array.prototype.shift.call(arguments),
//         fns = this.clientArr[key]
//     if(!fns || fns.length === 0) {
//       return
//     }
//     fns.forEach(item => {
//       item.apply(this, arguments)
//     })
//   }
//   let listen = function(key, fn) {
//     if(!this.clientArr[key]) {
//       this.clientArr[key] = []
//     }
//     this.clientArr[key].push(fn)
//   }
//   let remove = function(key, fn) {
//     let fns = this.clientArr[key]
//     if(!fns) {
//       return
//     }
//     if(!fn) {
//       fns && (fns.length = 0)
//     } else {
//       for(var i = 0; i < fns.length; i++) {
//         if(fns[i] === fn) {
//           fns.splice(i, 1)
//         }
//       }
//     }
//   }
//   return {
//     clientArr,
//     trigger,
//     listen,
//     remove,
//   }
// })()

// event.listen('cusA', (data) => {
//   console.log(data.cusA)
// })
// event.listen('cusB', (data) => {
//   console.log(data.cusB)
// })

// event.trigger('cusA', { cusA: 'cusAAA', cusB: 'cusBBB' })
// event.trigger('cusA', { cusA: 'cusA22', cusB: 'cusBBB' })