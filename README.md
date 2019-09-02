# 该脚本的简单实用


> 环境 
> * node@v10.16.0 
> * npm@6.9.0 
> * request@2.88.0

## 环境简单搭建

官网下载 node, npm 傻瓜式安装

node -v 查看版本
npm -v

可以淘宝镜像源

npm install -g cnpm --registry=https://registry.npm.taobao.org

## 安装依赖

cd library_script
cnpm i

## 使用

### 预约

npm run dev

### 目录说明

```bash

| - library_script
    | - node_modules npm安装模块
    | - config.js 需要配置的文件
    | - default.js 默认的配置文件，可以把用户名密码，常预约的时间点填写上去
    | - index.js 项目入口文件(主文件)
    | - README.md 文档

```

#### 详细配置文件

主要集中于config.js该文件(目前CPos1为C区的，其他区这个参数需要改变，暂未适配)

```javascript

"id": "", // 学号
"pwd": "", // 预约登录密码
"act": "login", // 不需要动
"currentTime": "2019-09-02", // 需要预约的日期
"startTime": "12:00", // 预约开始时间
"endTime": "14:00", // 预约结束时间
"dev_id": `${CPos1 + offsetPos}` // CPos1 已经定义好，不需要改变，默认为图书馆一楼C区1号位置， offsetPos为所预约位置与CPOS1的偏移量

```
default.js 文件

可以对defaultConfig对象属性进行一些变更，在这里写了某个属性config.js文件可以省略该属性,<br/>推荐使用长时间不变的数据，例如 login -> id & pwd * act, getSeat -> startTime & endTime