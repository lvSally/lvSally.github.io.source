---
title: ajax请求从前端至后端
date: 2018-03-22 17:19:47
categories: js
tags: ajax
---
![](/img/ajax请求从前端至后台.png)
[图片地址](https://www.processon.com/view/link/5ab372ace4b018c271bf55a1)


## 由express中的request引发的血案
  像论坛上说的一样，express框架几乎不用怎么阅读文档就可以搞起了。最最常见的就是处理`get`和`post`请求了，处理过程中获取get和post数据相差很大，处理post请求还需要额外引入一些包。前端的ajax请求jQ已经帮我们封装好了，所以感知不到get和post的传值的不同。
  >出于想搞明白这些问题做了一些实验
  1 express如何处理get、post
  2 Content-Type是个什么东西，对后端处理数据有什么影响
  3 原生xhr都做了什么

## 前端对于post和get的不同处理
  ### 理解总结
  get
  追加在URL后通过序列化的字符串提交

  post
  协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。实际上，开发者完全可以自己决定消息主体的格式，只要最后发送的 HTTP 请求满足上面的格式就可以。
  主要有四种POST数据提交方式，前两种格式比较常用
  1 `application/x-www-form-urlencoded`（jq，默认的表单提交格式）
  通常写法: `param1=111&param2=222`
  在XMLHttpRequest2中创建了FormData格式，方便数据表现形式为
  ```
  var form = new FormData();
  form.append('param1', '111');
  form.append('param2', '222');
  xhr.send(form);
  ```
  2 `application/json`（由于json格式的流行，这种格式被广泛接受）
  3 `text/xml`
  4 `multipart/form-data`

  ### 使用原生ajax写法
  简易版get:
    ```
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/run/getMarks?param=999&param2=%E6%88%91%E4%BB%AC%E4%BD%A0%E4%BB%AC999');
    xhr.send();
    xhr.onload = function () {
      console.log(xhr.response);
    }
    ```

  简易版post1(application/x-www-form-urlencoded;charset=UTF-8):
    ```
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/run/setMarks');
    // 使用application/x-www-form-urlencoded
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send('param=999&param2=%E6%88%91%E4%BB%AC%E4%BD%A0%E4%BB%AC999');
    xhr.onload = function () {
      console.log(xhr.response);
    }
    ```

  简易版post2(application/json):
    ```
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/run/setMarks');
    // 使用application/json
    xhr.setRequestHeader('Content-Type', 'application/json');
    var json = {
      param: '9999',
      param2: '我们'
    };
    xhr.send(JSON.stringify(json));
    xhr.onload = function () {
      console.log(xhr.response);
    }
    ```

  Jq版post1:
    ```
    var json = {
      param: '999',
      param2: '我们你们999'
    };
    $.ajax({
      url:"http://localhost:3000/api/run/setMarks",
      type: 'POST',
      data: json,
      success: function(res) {
        console.log(res);
      }
    });
  ```

  Jq版post2:
    ```
    var json1 = {
      param: '888',
      param2: '我们你们'
    };
    $.ajax({
      url:"http://localhost:3000/api/run/setMarks",
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(json1),
      success: function(res) {
        console.log(res);
      }
    });
    ```

  完整版：
    ```
    define(['utils'], function (Utils) {

      /* global args */
      var xhrTimeout;
      var timeout = 15000;
      var TIMEOUT_MSG = '连接超时，请稍后重试';
      // 维护页面跳转情况 1 服务器返回小于100，大于300的状态， 2 error
      var core = {

        // Method that performs the ajax request
        ajax: function (method, url, args, loading) {

          // Creating a promise
          var promise = new Promise(function (resolve, reject) {

            // Instantiates the XMLHttpRequest
            var xhr = new XMLHttpRequest();
            var uri = url;

            if (loading && loading === 'nojuhua') {
              f7.hideIndicator();
            } else {
              f7.showIndicator();
            }

            xhr.open(method, uri);

            if (args && (method === 'POST' || method === 'PUT')) {
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
              xhr.send(Utils.serialize(args));
            } else {
              xhr.send();
            }

            xhr.onabort = function () {
              if (xhrTimeout) {
                clearTimeout(xhrTimeout);
              }
              f7.hideIndicator();
              reject(TIMEOUT_MSG);
            };
            xhrTimeout = setTimeout(function () {
              xhr.abort();
            }, timeout);

            xhr.onload = function () {
              if (xhrTimeout) {
                clearTimeout(xhrTimeout);
              }
              if (this.status >= 200 && this.status < 300) {
                var res = JSON.parse(this.response);
                if (res.error_no.toString() === '0' || !res.error_no) {
                  resolve(res);
                  f7.hideIndicator();
                } else {
                  reject(res.error_info);
                  f7.hideIndicator();
                }
              } else {
                if (this.status === 500 || this.status === 502 || this.status === 503 || this.status === 504) {
                  displayView.loadPage('pages/acct/notfound.html');
                  f7.hideIndicator();
                } else {
                  f7.hideIndicator();
                  reject(this.statusText);
                }
              }

            };
            xhr.onerror = function () {
              if (xhrTimeout) {
                clearTimeout(xhrTimeout);
              }
              f7.hideIndicator();
              reject(this.statusText);
            };
          });

          return promise;
        }
      };

      // Adapter pattern
      return {
        get: function (url, loading) {
          return core.ajax('GET', url, null, loading);
        },
        post: function (url, args) {
          return core.ajax('POST', url, args);
        },
        put: function (url, args) {
          return core.ajax('PUT', url, args);
        },
        delete: function (url) {
          return core.ajax('DELETE', url, args);
        }
      };
    });

    ```


## 在http中post和get数组的存放位置
  get参数存放在请求行中
  post参数存在于请求正文, 通常不会写在url中..
  [HTTP 协议简介](http://funhacks.net/2017/03/01/http/)
## express对于post和get的不同处理
  ```
  var express = require('express');
  var bodyParser = require("body-parser");

  var app = express();
  app.use(bodyParser.json()); // application/json
  app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded;charset=UTF-8

  app.post('/api/run/setMarks', function(req, res){
    console.log(req.query); // 输出get的参数
    console.log(req.body); // 输出post参数
    res.json({test: 'test'});
  })
  ```
## 写在最后
花了很多时间去验证一些想法花了很多时间，不过很开心，后期有时间还是要系统去看看http相关的知识:-D。
