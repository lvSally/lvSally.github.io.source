//  对象的大多数状态都可以变为外部状态。
//  一个程序中使用了大量的相似对象。
//  由于使用了大量对象，造成很大的内存开销。
//  剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

// 上传
let Upload = function(uploadType) {
  this.uploadType = uploadType
}
Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this)
  if(this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }
  if(window.confirm('确定删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

// 工厂进行对象实例化
let UploadFactory = (function() {
  let createdFlyWeightObjs = {}
  return function(uploadType) {
    if(createdFlyWeightObjs[uploadType]) {
      return createdFlyWeightObjs[uploadType]
    }
    return createdFlyWeightObjs[uploadType] = new Upload(uploadType)
  }
})()

// 管理器封装外部状态
var uploadManager = (function() {
  var uploadDataBae = {}
  return {
    add: function(id, uploadType, fileName, fileSize) {
      let flyWeightObj = UploadFactory(uploadType) // 使用工厂函数创建实例
      let dom = document.createElement('div')
      dom.innerHTML = `
        <span>文件名称: ${fileName}, 文件大小： ${fileSize}</span>
        <button class="delFile">删除</button>
      `
      dom.querySelector('.delFile').onclick = function() {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadDataBae[id] = {
        fileName,
        fileSize,
        dom
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      var uploadData = uploadDataBae[id]
      for(i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

var id = 0
window.startUpload = function(uploadType, files) {
  for( let i = 0, file; file = files[ i++ ];) {
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
  }
}

startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000,
  },
  {
    fileName: '2.txt',
    fileSize: 3000,
  },
  {
    fileName: '3.txt',
    fileSize: 5000,
  }
])
startUpload('flash', [
  {
    fileName: '4.txt',
    fileSize: 1000,
  },
  {
    fileName: '5.txt',
    fileSize: 3000,
  },
  {
    fileName: '6.txt',
    fileSize: 5000,
  }
])