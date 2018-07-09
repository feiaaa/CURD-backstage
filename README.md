# CURD-backstage（开发中）


### 运行方法
```
npm install
npm start
```
### 目前可以看到的网页
> http://localhost:3005/#/articleList
> ps：有时候网站打不开的情况，是因为#号被地址栏截掉，后续会把hashHistory换成browserHistory，解决这个问题


### 问题处理
- 如果在打开时遇上 No 'Access-Control-Allow-Origin' header is present on the requested resource,
请去下载插件[Allow-Control-Allow-Origin谷歌跨域扩展插件](https://download.csdn.net/download/zz975896590/10266971)

### 部署
- [线上部署方式(根据自己的服务器的系统决定node包的版本)](https://blog.csdn.net/xerysherryx/article/details/78920978)
- 总的描述就是：先在服务器上装node和npm (node包里这两个都有了)，然后把dva build，在把build完成的内容放在apache相关的文件夹下面。
```
npm run build
```

### 文档
- [关于dva需要的最小知识集](https://github.com/dvajs/dva-knowledgemap)

- [【必读】教程如何做一个带有增删改读取数据的user列表](https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/tutorial/01-%E6%A6%82%E8%A6%81.md)
- [antd](https://ant.design/docs/react/introduce-cn)
- [dva社区(含图解和源码解析)](https://dvajs.com/guide/)
- [mockjs](http://mockjs.com/dist/mock.js)
- [dva使用mockjs](http://doc.okbase.net/tjc1996/archive/262169.html)

### 
2018-7-09：准备优化word的词性选项，路由问题修复中