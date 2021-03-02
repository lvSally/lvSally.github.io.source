// 构建基本的琏结构。
let head, tall, pointer,length = 0
function Node(value) {
  return {
    value,
    next: null,
    pre: null
  }
}

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

// [demo](https://aotu.io/notes/2017/10/13/make-a-chain-class/index.html)