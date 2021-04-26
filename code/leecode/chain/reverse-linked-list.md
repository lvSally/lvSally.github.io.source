## 递归
``` javascript
  function factorial(n) {
    console.log(n)
    debugger
    if (n == 1) return n;
    let a = factorial(n - 1)
    let total  = n * a
    return total
  }

  function factorial(n) {
    if (n == 1) return n;
    debugger
    return n*factorial(n - 1)
  }
```

## 翻转链表
``` javascript
  // 构建基本的琏结构。
  let head, tall, pointer,length = 0
  function Node(value) {
    return {
      value,
      next: null,
      pre: null
    }
}

// 迭代生成链结构
[1, 2, 3, 4].forEach((data, idx, arr) => {
  let node = new Node(data)
  if(idx === 0) {
    head = node
  } else {
    [node.pre, pointer.next] = [pointer, node]
    idx === arr.length-1 && (tall = node)
  }
  pointer = node
  ++length
})

pointer = head

// 翻转链表函数
function reverseFn(head) {
  debugger
  if(head.next === null) {
    return head
  }
  let last = reverseFn(head.next)
  head.next.next = head
  head.next = null
  return last
}
```

## 总结
>1 递归执行过程: 递归执行过程 判断结束条件一直调用自身(递过程)，满足结束条件开始(归操作)

>2 使用递归:
1 将大问题拆成两个子问题
2 子问题的求解方式和大问题一样
3 存在最小子问题

>3 翻转链表递归方案用到的知识
1 链表数据结构
2 生成链表
3 理解递归使用场景
4 递归的调用顺序（判断结束条件一直调用自身(递过程)，满足结束条件开始(归操作)）

>4 对递归思考
树结构，链表结构，factorial等重复性可以通过递归解决，循环也可以解决重复问题，什么时候使用递归呢，清晰的表达某个单纯的实现过程？