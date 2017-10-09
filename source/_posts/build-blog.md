---
title: build-blog
date: 2017-05-03 10:49:56
categories: 其它
type: "tags"
tags:  [Hexo]
---

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).


## Quick Start

### 导入hexo

``` bash
$ npm install -g hexo-cli --registry=https://registry.npm.taobao.org
```

### 初始化项目

``` bash
$ hexo init
```

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy

// 报错:ERROR Deployer not found: github
npm install hexo-deployer-git --save

deploy:
  type: git // 或者github
  repository: git@github.com:lvSally/lvSally.github.io.git
  branch: master
```


### 其它
1 使用hexo new page tags/categories 创建分类或标签
2 在themes _config.yml 控制主体显示
3 themes -> _config.yml -> baidu_analytics 添加百度统计id可添加百度统计功能
4 themes -> _config.yml -> avatar 设置头像
5 [next第三方服务集成](http://theme-next.iissnan.com/third-party-services.html)
6 [网易云跟帖](https://gentie.163.com/help.html) 悲剧的是类似`github.io`的子域名基本信息填写不能通过
7 [Disqus](https://disqus.com),最终选择了Disqus，缺点是需要翻墙，使用Disqus比较简单，注册一个账号，在主题的设置文件中添加以下shortname即可。
More info: [Deployment](https://hexo.io/docs/deployment.html)