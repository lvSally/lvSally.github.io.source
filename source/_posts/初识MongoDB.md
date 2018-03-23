---
title: 初识MongoDB
date: 2018-03-23 09:35:47
categories: 服务端
tags: mongo
---

## 初识mongo
  >认识
  1 非关系型数据库，缺点是当两张表需要建立连接的时候处理起来比较麻烦
  2 以集合的方式操作和保存数据
  3 非常轻量，和node搭配实现了前端可以方便对数据进行存取，让前端找到了存在感..

## 安装和使用
  >1 [下载](https://www.mongodb.com/download-center#community)
  2 在mac中直接解压，进入二进制文件夹`bin`目录
  3 启动数据库，并制定数据存放位置
  ```
  cd Applications/mongodb/bin
  ./mongod --dbpath /Users/lvjingjing/mongo-data
  ```
  >4 在可视化工具(`robo 3T`)中查看数据. [下载](https://robomongo.org/download) [基本使用](https://www.cnblogs.com/dacongge/p/7346037.html)

## 方法封装
  - 通过下面的封装方法记录mongo基本的增删改查,以及node中如何引入mongodb
  ```
  /**
   * Created by Danny on 2015/9/25 9:31.
   */
  //这个模块里面封装了所有对数据库的常用操作
  var MongoClient = require('mongodb').MongoClient;
  var settings = require("../settings.js");
  //不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
  //封装成为内部函数
  function _connectDB(callback) {
      // "dburl" : "mongodb://localhost:27017/test", test对应的数据库
      var url = settings.dburl;   //从settings文件中，都数据库地址
      //连接数据库
      MongoClient.connect(url, function (err, db) {
          if (err) {
              callback(err, null);
              return;
          }
          callback(err, db);
      });
  }

  init();

  function init(){
      //对数据库进行一个初始化
      _connectDB(function(err, db){
          if (err) {
              console.log(err);
              return;
          }
          db.collection('users').createIndex(
              { "username": 1},
              null,
              function(err, results) {
                  if (err) {
                      console.log(err);
                      return;
                  }
                  console.log("索引建立成功");
              }
          );
      });
  }

  //插入数据
  exports.insertOne = function (collectionName, json, callback) {
      _connectDB(function (err, db) {
          db.collection(collectionName).insertOne(json, function (err, result) {
              callback(err, result);
              db.close(); //关闭数据库
          })
      })
  };

  //查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
  exports.find = function (collectionName, json, C, D) {
      var result = [];    //结果数组
      if (arguments.length == 3) {
          //那么参数C就是callback，参数D没有传。
          var callback = C;
          var skipnumber = 0;
          //数目限制
          var limit = 0;
      } else if (arguments.length == 4) {
          var callback = D;
          var args = C;
          //应该省略的条数
          var skipnumber = args.pageamount * args.page || 0;
          //数目限制
          var limit = args.pageamount || 0;
          //排序方式
          var sort = args.sort || {};
      } else {
          throw new Error("find函数的参数个数，必须是3个，或者4个。");
          return;
      }

      //连接数据库，连接之后查找所有
      _connectDB(function (err, db) {
          var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
          cursor.each(function (err, doc) {
              if (err) {
                  callback(err, null);
                  db.close(); //关闭数据库
                  return;
              }
              if (doc != null) {
                  result.push(doc);   //放入结果数组
              } else {
                  //遍历结束，没有更多的文档了
                  callback(null, result);
                  db.close(); //关闭数据库
              }
          });
      });
  }

  //删除
  exports.deleteMany = function (collectionName, json, callback) {
      _connectDB(function (err, db) {
          //删除
          db.collection(collectionName).deleteMany(
              json,
              function (err, results) {
                  callback(err, results);
                  db.close(); //关闭数据库
              }
          );
      });
  }

  //修改
  exports.updateMany = function (collectionName, json1, json2, callback) {
      _connectDB(function (err, db) {
          db.collection(collectionName).updateMany(
              json1,
              json2,
              function (err, results) {
                  callback(err, results);
                  db.close();
              });
      })
  }

  //得到总数量
  exports.getAllCount = function (collectionName,callback) {
      _connectDB(function (err, db) {
          db.collection(collectionName).count({}).then(function(count) {
              callback(count);
              db.close();
          });
      })
  }

  ```
