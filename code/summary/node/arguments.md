## 环境变量传参

### 直接添加命令
npm run hello tom
console.log('hello ', process.argv[2]); // hello,tom, 数组组的前两位保存其他信息

### 设置NODE_ENV变量
cross-env NODE_ENV=dev node test.js // 将NODE_ENV设置为dev
console.log(process.env.NODE_ENV);

### process.env.npm_config_message
npm run test -m evn:test
console.log(process.env.npm_config_message) // evn:test

### yargs，与minimist类似
```javascript
  const {execSync} = require('child_process')
  let yargs = require('yargs')
  let argv = yargs
    .options('app', {
      default: 'development',
      type: 'string',
    }).argv
  process.env.APP_ENV = argv.app
  let cmd = `taro build --env ${argv.env} --watch`
  execSync(cmd, {
    stdio: 'inherit',
    env: process.env,
  })
```

### minimist
是一个专门用于处理Node.js启动参数的库，可以将 process.argv 中的参数列表转换成更加易于使用的格式

### 其他
```javascript
  // 获取当前分支
  const CURRENT_BRANCH = execSync('git symbolic-ref --short -q HEAD')
  .toString()
  .replace(/\n/, '')

  // 获取最后一次提交记录
  const GIT_COMMIT_MSG = execSync('git log --oneline --format=%B -n 1 HEAD')
  .toString()
  .replace(/[\r\n]/g, '')
```