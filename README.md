# CURD-backstage

### 简介
使用了dva写的一个CURD系统。如果缺少服务器，本项目带了mockjs，切换即可

线上部署的方法，见文件夹下的word文档。
### 效果图
![效果gif](https://github.com/feiaaa/CURD-backstage/blob/master/static/final.gif)
### 运行方法
```
npm install
npm start
```
### 目前可以看到的网页
> [体验地址(没备案，所以显示不安全)](http://www.niwa.club)
> 用户名 guest 密码guests
> 

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
- [【拓展阅读】Node.js v10.8.0 文档](http://nodejs.cn/api/)

### bug解决
- [路由问题解决（hashHistory设置为browserhistory）](https://www.jianshu.com/p/649e97ff4354)
- [react router升到4以后直接访问二级路由出错的解决办法](https://github.com/dkvirus/dva/issues/9)
- [使用browserHistory，部署以后点击浏览器刷新404的解决办法](https://github.com/LoeiFy/Recordum/issues/15)：Nginx里要配置+文件夹里生成一个indexHTML
- [部署以后首次加载过慢的解决办法](https://github.com/dvajs/dva/issues/1128):把无关的页面先分出来
- [axios 使用post方式传递参数，后端接受不到](https://segmentfault.com/a/1190000012635783)
### 工具
> 开发阶段的跨域问题，
- 法1：roadhog的配置文件设置proxy
- 法2：[Allow-Control-Allow-Origin谷歌跨域扩展插件](https://download.csdn.net/download/zz975896590/10266971)
