// minimist 使用
const args = require('minimist')(process.argv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
console.dir(args, require('minimist'))
// node test.js -ab s ddd --modern --beep=boop
// 打印结果
// { _:
//   [ '/usr/local/bin/node',
//     '/Users/lvjingjing/lv/blog/code/summary/node/test.js',
//     'ddd' ],
//  modern: true,
//  report: false,
//  'report-json': false,
//  watch: false,
//  open: false,
//  copy: false,
//  https: false,
//  verbose: false,
//  a: true,
//  b: 's',
//  beep: 'boop' }

