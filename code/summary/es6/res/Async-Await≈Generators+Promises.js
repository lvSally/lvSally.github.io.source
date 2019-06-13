
function doTask1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('test1')
    }, 1000)
  })
}
function doTask2(res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`upper1: ${res},test2`)
    }, 1000)
  })
}
function doTask3(res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`upper2: ${res},test3`)
    }, 500)
  })
}

async function init() {
  const res1 = await doTask1()
  console.log(res1)
  const res2 = await doTask2(res1)
  console.log(res2)
  const res3 = await doTask3(res2)
  console.log(res3)
  return res3
}

function* initGen() {
  const res1 = yield doTask1()
  console.log(res1)
  const res2 = yield doTask2(res1)
  console.log(res2)
  const res3 = yield doTask3(res2)
  console.log(res3)
  return res3
}

function runner(genFn) {
  const itr = genFn()
  function run(arg) {
    const reslut = itr.next(arg)
    if(reslut.done) {
      return reslut.value
    } else {
      return Promise.resolve(reslut.value).then(run)
    }
  }

  return run()
}

// generators + promise
runner(initGen)

// async + await
// init()

//* + yield
// let g = initGen()
// g.next() // value: promise, done: false
// g.next() // value: promise, done: false
// g.next() // value: promise, done: false
// g.next() // value: promise, done: true



