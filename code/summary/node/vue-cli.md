### 
[ vue-cli 构建的打包工程](https://juejin.im/entry/5afbe1385188254267263d06)

### path
1. path模块
  >path 是 node.js 中的一个模块，用于处理目录的对象，提高开发效

#### 常用方法：
path.join(): 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix 系统是 ”/“，Windows系统是 ”\“
path.resolve() 用于将相对路径转为绝对路径

#### 常使用的文件路径
__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径


### process
>process对象是Node的一个全局对象，提供当前Node进程的信息。
  process 对象提供一系列属性，用于返回系统信息
  process.argv：返回当前进程的命令行参数数组。
  process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME
  process.pid：当前进程的进程号


### rimraf
>rimraf 包的作用：以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。
var rm = require('rimraf')

### ora
>实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等

var spinner = ora('building for production...')
spinner.start()
spinner.stop()


### minimist
> minimist 是一个专门用于处理Node.js启动参数的库，可以将 process.argv 中的参数列表转换成更加易于使用的格式

``` javascript
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv); // 在控制台中显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。

$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```