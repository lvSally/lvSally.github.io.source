## curry
>只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

function trueCurrying(fn, ...args) {

    if (args.length >= fn.length) {

        return fn(...args)

    }

    return function (...args2) {

        return trueCurrying(fn, ...args, ...args2)

    }
}

## 参考
[JS中的柯里化(currying)](https://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
[js函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)