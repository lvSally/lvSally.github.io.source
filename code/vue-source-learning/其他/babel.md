(babel扮演的角色)[https://mp.weixin.qq.com/s/AURDiWwspdfRExopNf4YLQ]
>1 Babel主要是一个容器，真正实现编译还是需要添加相应的Plugins，preset（一组特定的Plugins组合）完成。
2 而最为常用，也是被官网推荐的，是@babel/preset-env。默认情况下，所有已被纳入规范的语法（ES2015, ES2016, ES2017, ES2018, Modules）所需要使用的plugins都包含在env这个preset中。
3 babel的插件专注于对语法做转换，而API的调用并非什么新鲜的语法，这部分并不属于babel插件的管辖范围。因此对于一些不存在的方法需要引入相应的polyfill
