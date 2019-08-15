# 问题及注意点
* 弹出支付框，取消是支付会触发`componentDidShow`
* 在调用栈中的state状态会被保存（待确认），执行`back`或者`reLaunch`state记录会被清除
* 微信数据与渲染分布在不同的线程，因此存在异步通讯问题
