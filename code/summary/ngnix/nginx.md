## 基础
配置文件保存地址: /usr/local/etc/nginx/nginx.conf
ng默认配置文件 /usr/local/etc/nginx/nginx.conf.default

## 启动与关闭
nginx // 启用ng
nginx -s stop // 关闭ng


## 调用微信SDK需要相同域名操作花瓶和ng解决方案
  Charles:
  将远程地址映射至本地，场景：在微信中使用扫描功能需要同域名操作
  shelf.champzee.com/api* -> test1-shelf.champzee.com (测试环境接口映射)
  shelf.champzee.com -> 172.16.0.93 (本地代码映射)

  Nginx: 
  ```
    server {
      listen       80;
      server_name  shelf.champzee.com;

      charset UTF-8;

      location /api {
          proxy_pass https://test1-shelf.champzee.com;
      }

      location / {
          proxy_pass http://172.16.0.93:8080;
      }
    }
  ```

## (demo)[https://juejin.im/post/5bacbd395188255c8d0fd4b2]

### 权限控制
>自上至下执行， `deny: 拒绝`， `allow: 允许`

location / {
  deny  192.168.1.100;
  allow 192.168.1.10/200; # 允许192.168.1.10-200
  allow 10.110.50.16;
  deny  all;
}

### 创建本地web服务
```
server {
        listen       8080;
        server_name  localhost;
        root /usr/local/etc/nginx/webserver-test; # 静态文件入口

        charset UTF-8;

        location / {
            index indexa.html; # 首次进入显示的页面  
            autoindex on; # 当默认主页不存在时直接列出目录内文件树
         }
}
```

### 解决跨域
(参考)[https://xuexb.github.io/learn-nginx/example/autoindex.html]
server {
        listen       8080;
        # 1 server_name需要在host中配置才有效 0.0.0.0 webserver.test.com
        # 2 直接在http://localhost:8080中访问
        server_name  webserver.test.com; 
        root /usr/local/etc/nginx/webserver-test; # 静态文件入口

        charset UTF-8;

        location ^~/apis/ {
            # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
            rewrite ^/apis/(.*)$ /$1 break;
            proxy_pass https://www.kaola.com/;
         }
        

}

## 移动、pc设备适配
        location / {
            index indexa.html; # 首次进入显示的页面  
            autoindex on; # 当默认主页不存在时直接列出目录内文件树
            
            # 移动、pc设备适配
            if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
                  set $mobile_request '1';
            }
            if ($mobile_request = '1') {
                  rewrite ^.+ http://www.baidu.com;
            }
         }

## 合并请求
https://juejin.im/post/5bacbd395188255c8d0fd4b2
