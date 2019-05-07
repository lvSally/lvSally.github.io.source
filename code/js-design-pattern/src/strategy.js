// 策略雏形
const strategis = {
  notEmpty: (str, msg) => {
    if(str.length === 0) {
      return msg
    }
  },
  phone: (phone, msg) => {
    if(!(/^1[34578]\d{9}$/.test(phone))){
      return msg
    }
  },
  email: (email, msg) => {
    if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))) {
      return msg
    }
  }
}

export function handler (keys, str) {
  let res = []
  keys.forEach(item => {
    res.push(strategis[item](str))
  })
  return res
}

// 完整基于表单验证策略

export function StrategyFn() {
  this.cache = []
}
StrategyFn.prototype.add = function (dom, rule, errMsg) {
  this.cache.push({
    val: dom.value,
    rule,
    errMsg
  })
}
StrategyFn.prototype.start = function () {
  for(let i = 0; i < this.cache.length; i++ ) {
    let rule = this.cache[i].rule
    let msg = strategis[rule](this.cache[i].val, this.cache[i].errMsg)
    if(msg && msg.length > 0) {
      return msg
    }
  }
}

// 策略模式主要是通过多肽和封装达到通过一个方法调用，让各种情况各司其职，顺利的返回结果
// 好处是组织结构更加清晰，代码可读性和可维护程度都可以提高

document.body.innerHTML =
`
    <form>
      <input type="text" id="name">
      <input type="text" id="phone">
      <input type="text" id="email">
      <div type="submit" id="submit">提交</div>
    </form>
  `

let form = {}
form.name = document.querySelector('#name')
form.phone = document.querySelector('#phone')
form.email = document.querySelector('#email')
function verify() {
  let strategy = new StrategyFn()
  strategy.add(form.name, 'notEmpty', '姓名不能为空')
  strategy.add(form.phone, 'phone', '手机号格式错误')
  strategy.add(form.email, 'email', '邮箱格式错误')
  return strategy.start()
}

function submit() {
  const errMsg = verify()
  if (errMsg && errMsg.length > 0) {
    alert(errMsg)
    return
  }
  console.log(form.name.value, form.phone.value, form.email.value)
}

document.querySelector('#submit').addEventListener('click', () => {
  submit()
})


