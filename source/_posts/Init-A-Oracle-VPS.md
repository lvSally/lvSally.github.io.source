---
title: Init A Oracle VPS
date: 2023-04-11 16:42:42
categories: services
tags: VPS
---

## Apply for a free tire cloud service
- address: https://www.oracle.com/ca-en/cloud/free/
>tips: <br/>
1 This address is only for applicantions form Canada <br/>
2 Make sure all the informations is correct.


## Create a VPS

### choose vps os
for me is CentOS-8-Stream

### change Boot volume
- 1 Select Specify a custom boot volume size
- 2 choose the appropriate `Boot volume performance`

### save ssh keys or username+password to login
- ssh keys need save private key, then login use `ssh -i your/ssh-key/path username@IPAddress`, before login need change the ssh key right like
```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/ssh-key-oracle.key
```

- username+password
&nbsp;&nbsp; 1 open `advanced options`
&nbsp;&nbsp; 2 select `Paste cloud-init script`
&nbsp;&nbsp; 3 copy below, yourPassword is password 
```
#!/bin/bash
echo root:yourPassword |sudo chpasswd root
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config;
sudo service sshd restart
```
&nbsp;&nbsp; 4 then login with `ssh root@IPAdress`


## Install git
```
yum install git
git --version
```
## nginx

### init
&nbsp;&nbsp; 1 install
&nbsp;&nbsp; 2 init ` systemctl enable nginx # 设置开机启动; service nginx start # 启动 nginx 服务`
&nbsp;&nbsp; 3 close firewall
&nbsp;&nbsp; 4 setting Ingress Rules（入口规则）, like  `22 for ssh; 80 for default; and others`
&nbsp;&nbsp; 5 testing!

```
yum install nginx #安装nginx

#常用操作
systemctl enable nginx # 设置开机启动 
service nginx start # 启动 nginx 服务
service nginx stop # 停止 nginx 服务
service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用。
systemctl status nginx    # 检查 Nginx 服务状态

# 语法检测及重启
nginx -t -c /etc/nginx/nginx.conf ## 检查语法问题
service nginx restart # 重启 nginx 服务

# 设置防火墙
#停止firewall
systemctl stop firewalld.service
#禁止firewall开机启动
systemctl disable firewalld.service

# 修改文件权限
udo su - # 使用root权限
chmod 777 home/ #修改单文件
chmod -R 777 /home # 递归修改

# 测试 nginx是否生效
Curl localhost:80
Curl IpAddress:80

# 常用目录
/usr/share/nginx/html/ # 默认的文件路径，其他目录可能没有访问权限
/etc/nginx/nginx.conf # 配置文件地址

# 查看日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

```
### brief sample of config
```
server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        autoindex on;
        autoindex_exact_size off;
        index index.html;
        try_files $uri $uri/ /resume/index.html;
    }
}
```

## delete vps instances
> can't delete by ourself, later will be delete by system

