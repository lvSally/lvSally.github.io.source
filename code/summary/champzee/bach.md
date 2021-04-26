## bach相关总结

### submodule
>子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

```
git submodule add -b master git@git.cmpz.com:frontend/CPZAdminUI.git src/CPZAdminUI

# 更新 submodule 到远端最新
git submodule update --remote

# 要对 submodule 进行修改，先要进入 submodule 的目录，然后 checkout master 分支，然后再修改
cd src/CPZAdminUI
git checkout master
```

#### 插件
将子模块作为一个插件， 通过Vue.use(CPZAdminUI, {})引入
1 Vue.js 的插件应该有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
2 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成

#### 组件
全局注册
发生在new之前
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })

局部注册
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})

### beans
1 pkg.main
>main定义了包的入口文件，在NodeJs环境，语句import pkg from 'package-name'时，其实导入的就是main定义的文件，它可以是CommonJs格式的, 也可以是umd格式

2.1 [pkg.unpkg](https://unpkg.com/) 
>unpkg是一个快速的全球内容交付网络，适用于npm上的所有内容。使用它可以使用以下URL快速轻松地从任何包加载任何文件：`unpkg.com/:package@:version/:file`
与npm包管理区别，npm中会有编译版(比如vue.runtime.esm.js)和非编译版，编译版需要配合编译工具编译。
2.2 npm配合编译工具
ES Module：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：
* 为打包工具提供的 ESM：为诸如 webpack 2 或 Rollup 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行`tree-shaking`并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (pkg.module) 是只有运行时的 ES Module 构建 (vue.runtime.esm.js)。
* 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 <script type="module"> 直接导入。

3 pkg.sideEffects
>"side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

参考：
[vue 安装](https://cn.vuejs.org/v2/guide/installation.html)
[tree shaking](https://webpack.docschina.org/guides/tree-shaking/#src/components/Sidebar/Sidebar.jsx)

### TODO
[Node-modules理解]（https://juejin.im/post/5ab3f77df265da2392364341）
[npm发包]（https://juejin.im/post/5b231f6ff265da595f0d2540）
[JavaScript 模块](https://zhuanlan.zhihu.com/p/26567790)