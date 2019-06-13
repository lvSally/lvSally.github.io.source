// 组合模式将对象组合成树形结构,利用鸭子类型完成相同的方法，如果每个指令存在差异的话组合模式可能会使代码变的不可维护
// 请求从上到下沿着树进行传递，直到树的尽头。作为客户，只需要关心树最顶层的组合对象，客户只需要请求这个组合对象，请求便会沿着树往下传递，依次到达所有的叶对象。
// demo1 执行树结构，类似的功能还有扫描文件夹，对于叶子节点可以添加相关的校验提示，提示该节点为叶子节点，不能添加子节点
let MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      this.commandList.forEach(item => {
        item.execute()
      })
    }
  }
}
let openDoorCmd = {
  execute() {
    console.log("打开门")
  }
}

let openTVCmd = {
  execute() {
    console.log("打开电视")
  }
}
let openSoundCmd = {
  execute() {
    console.log("打开音响")
  }
}
let macroCmd1 = MacroCommand()
macroCmd1.add(openTVCmd)
macroCmd1.add(openSoundCmd)

let openPcCmd = {
  execute() {
    console.log("打开电脑")
  }
}
let openQQCmd = {
  execute() {
    console.log("打开QQ")
  }
}
let macroCmd2 = MacroCommand()
macroCmd2.add(openPcCmd)
macroCmd2.add(openQQCmd)

let macroCmd = MacroCommand()

macroCmd.add(openDoorCmd)
macroCmd.add(macroCmd1)
macroCmd.add(macroCmd2)

macroCmd.execute()

// demo2 通过引用父对象，实现文件夹删除操作
