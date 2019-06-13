// 命令模式
// 命令模式中的命令(command)指的是一个执行某些特定事情的指令。
// 有时候需要向某些对象发送请求，但是并不知道请求的接收 者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
// demo1
// document.body.innerHTML = `
//   <button id="refresh">刷新</button>
//   <button id="add">添加</button>
//   <button id="del">删除</button>
// `
// let btnRefresh = document.querySelector("#refresh")
// let btnAdd = document.querySelector("#add")
// let btnDel = document.querySelector("#del")

// let setCommand = function(button, command) {
//   button.onclick = function() {
//     command.execute()
//   }
// }

// // 任务具体操作
// let menuBar = {
//   refresh: function() {
//     console.log("刷新页面")
//   }
// }
// // 利用闭包处理receiver，无论接收者被保存为对象 的属性，还是被封闭在闭包产生的环境中，在将来执行命令的时候，接收者都能被顺利访问。
// let RefreshMenuBarCommand = function(receiver) {
//   return {
//     execute: function() {
//       receiver.refresh()
//     }
//   }
// }

// let refreshMenuBarCommand = RefreshMenuBarCommand(menuBar)
// setCommand(btnRefresh, refreshMenuBarCommand)

// demo2
document.body.innerHTML = `
<button id="replay">replay</button>
`
let ryu = {
  attack() {
    console.log("进攻")
  },
  defense() {
    console.log("防御")
  },
  jump() {
    console.log("跳跃")
  },
  crouch() {
    console.log("蹲下")
  }
}

let makeCommad = function(receiver, state) {
  return function() {
    receiver[state] && receiver[state]()
  }
}

const commands = {
  "119": "jump", // w
  "115": "crouch", // s
  "97": "defense", // a
  "100": "attack" //d
}

let commandStack = []
document.onkeypress = function(e) {
  var keycode = e.keyCode,
    command = makeCommad(ryu, commands[keycode])
  if (command) {
    command()
    commandStack.push(command)
  }
}

let replayBtn = document.querySelector("#replay")
replayBtn.onclick = function() {
  var command
  while ((command = commandStack.shift())) {
    command()
  }
}
