function Flower() {
  console.log('flower')
}
function Ming(target) {
  this.sendFlower = function(target) {
    target.sendFlower()
  }
}

function B() {
  this.sendFlower = function() {
    Flower()
  }
}

function A() {
  this.receiveFlower = function (a) {
    a()
  }
}

var ming = {
  sendFlower(target) {
    target.sendFlower()
  }
}

var a = {
  receiveFlower(f) {
    console.log(f)
  }
}
var b = {
  sendFlower() {
    let flower = new Flower()
    a.receiveFlower(flower)
  }
}

// ming.sendFlower(b)

// 单一职责，将预加载和实际显示分离
let createImg = (function() {
  let img = document.createElement('img')
  document.body.appendChild(img)
  return {
    setImg(src) {
      img.src = src
    }
  } 
})()

let proxyImg = (function() {
  let img = new Image()
  img.onload = function() {
    createImg.setImg(this.src)
  }
  return {
    setProxyImg(src) {
      createImg.setImg( 'https://www.bing.com/th?id=OGC.5b1fe33d1621848930b98b0783ed56c9&pid=1.7&rurl=http%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f02%2fLoading-GIF-Image-14.gif&ehk=V57EbW33Cee4dejjGlO4UQ' );
      setTimeout(() => {
        img.src = src;
      }, 1000);
    }
  }
})()
// proxyImg.setProxyImg('https://tse3.mm.bing.net/th?id=OIP.VXGGNUya-d3HcIbSb6_irwHaFj&pid=Api&dpr=1')

// 虚拟代理
document.body.innerHTML =  `
  <input type="checkbox" id="1"></input>1
  <input type="checkbox" id="2"></input>2
  <input type="checkbox" id="3"></input>3
  <input type="checkbox" id="4"></input>4
  <input type="checkbox" id="5"></input>5
  <input type="checkbox" id="6"></input>6
  <input type="checkbox" id="7"></input>7
  <input type="checkbox" id="8"></input>8
  <input type="checkbox" id="9"></input>9
`

function showID(id) {
  console.log(`选中的元素为： ${id}`)
}

// let cache = []
// document.addEventListener('click', function() {
//   const checkbox = document.querySelectorAll('input')
//   for (let i = 0; i < checkbox.length; i++) {
//     if (checkbox[i].checked) {
//       if(cache.indexOf(checkbox[i].getAttribute('id')) === -1) {
//         cache.push(checkbox[i].getAttribute('id'))
//       }
//       setTimeout(() => {
//         showID(showID(cache.join(',')))
//       }, 2000);
//     }
//   }
// })


var proxySynchronousFile = (function(){
  var cache = [], // 保存一段时间内需要同步的 ID
  timer; // 定时器
  return function( id ){
    cache.push( id );
    if ( timer ){ // 保证不会覆盖已经启动的定时器
      return; 
    }
    timer = setTimeout(function(){ showID( cache.join( ',' ) ); clearTimeout( timer ); // 清空定时器 timer = null;
    cache.length = 0; // 清空 ID 集合
    }, 2000 ); 
    }
  // 2 秒后向本体发送需要同步的 ID 集合
})();

var checkbox = document.getElementsByTagName( 'input' ); 
for ( var i = 0, c; c = checkbox[ i++ ]; ){
  c.onclick = function(){
    if ( this.checked === true ){
    proxySynchronousFile( this.id ); }
  }
}