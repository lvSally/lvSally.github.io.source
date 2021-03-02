## 服务端解决不同源地址访问方案
* 设置response相应首部字段服务端配置
  Access-Control-Allow-Origin: <origin> | *
  Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
  Access-Control-Max-Age: <delta-seconds>
  Access-Control-Allow-Credentials: true
  Access-Control-Allow-Methods: <method>[, <method>]*
  Access-Control-Allow-Headers: <field-name>[, <field-name>]*

* request首部字段，无需手动设置
  Origin: <origin>
  Access-Control-Request-Method: <method>
  Access-Control-Request-Headers: <field-name>[, <field-name>]*

* 在一定情况下触发预检请求，可以避免跨域请求对服务器的用户数据产生未预期的影响。与之对应的是简单请求
  1 触发预检请求的条件(配置cors需要配置额外的请求头信息，因此会触发预检请求)
    使用了下面任一 HTTP 方法：
      PUT
      DELETE
      CONNECT
      OPTIONS
      TRACE
      PATCH
    人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
      Accept
      Accept-Language
      Content-Language
      Content-Type (需要注意额外的限制)
      DPR
      Downlink
      Save-Data
      Viewport-Width
      Width
    Content-Type 的值不属于下列之一:
      application/x-www-form-urlencoded
      multipart/form-data
      text/plain
    请求中的XMLHttpRequestUpload 对象注册了任意多个事件监听器。
    请求中使用了ReadableStream对象。
  2 “需预检的请求”要求必须首先使用`OPTIONS`
    HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“*”）使用该方法。

## 参考
[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#HTTP_%E8%AF%B7%E6%B1%82%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
[OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)
CORS: （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。