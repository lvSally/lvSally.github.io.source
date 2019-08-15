>通过虚拟dom构建树结构，然后渲染在真实的doms上，看了好多资料都是操作dom需要很大的成本，通过对比dom树去更新dom更加节省内存资源，实际开发中感觉最受益的虚拟dom更有利于组件构建，更加有利于节点数据监控，以对象的方式管理数据流，结合es6的class（使用类的方式为何model，类的优雅写法等）在各个方面提高开发体验

### 逐级对比
eact通过逐级的去比较两颗节点树的差异，这大大降低了复杂性，而且精准度上损失也不大，因为在Web应用程序中将组件树不同级的移动比较是非常罕见的。 组件通常只能在子组件横向移动。

### 列表List
通过给列表添加key区别列表的差异，方便识别新插入的元素

### 组件
不会去对比不同的组件之间的不同
例如，如果<Header>被<ExampleBlock>替换，则React将删除<Header>并创建一个<ExampleBlock>。 我们不需要花费宝贵的时间尝试匹配不太可能有相似之处的两个组件。

### 事件委托
React实现了一种称为“事件委托”的流行技术。 React更进一步，并重新实现了符合W3C标准的事件系统。这意味着Internet Explorer 8事件处理兼容问题将成为过去的事情，所有的事件名称在浏览器之间是一致的。
[React 事件系统分析与最佳实践](https://zhuanlan.zhihu.com/p/27132447)

### 渲染
#### 批量处理
每当您在组件上调用setState时，React会将其标记为脏。 在事件循环结束时，React会查看所有脏组件并重新渲染它们。
#### 子树处理
调用setState时，组件将重建其子项的虚拟DOM。如果您在根元素上调用setState，则会重新渲染整个React应用程序。将标记为脏的子组件进行rerender
#### 选择子树渲染
最后，您可以防止一些子树重新渲染。 如果在组件上使用以下方法：
boolean shouldComponentUpdate(object nextProps, object nextState)
基于组件的上一个和下一个props/state，您可以告诉React该组件没有更改，并且不需要重新渲染。


### 参考
[shouldComponentUpdate](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)
[diff](https://juejin.im/post/59fbecf4f265da43094482e9#heading-5)
[Vue为什么没有shouldComponentUpdate的生命周期？](https://www.zhihu.com/question/266656197)
[如何看待 snabbdom 的作者开发的前端框架 Turbine 抛弃了虚拟DOM？](https://www.zhihu.com/question/59953136/answer/170843322)
[https://zhuanlan.zhihu.com/p/26426054](https://zhuanlan.zhihu.com/p/26426054)