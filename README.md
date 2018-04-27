# Node-taobao

> 初学node，为方便开发，暂时用脚手架搭建，之后有时间再改结构

> [前端地址](https://github.com/miracles1919/vue-taobao)


## 说明

-   技术栈: nodejs + express + mongodb + mongoose + es6/7
-   开发环境 macOS 10.12.6 node 8.9.0 Mongodb 3.6.3

## 开发构建

### 目录结构

```bash

├── app.js
├── bin
│ └── www
├── config.js
├── controller
│ ├── cart.js
│ ├── pay.js
│ ├── shop.js
│ └── user.js
├── index.js
├── models
│ ├── cart.js
│ ├── shop.js
│ └── user.js
├── package-lock.json
├── package.json
├── public
│ ├── images
│ ├── javascripts
│ └── stylesheets
├── routes
│ └── index.js
├── utils
│ └── mongo.js
├── utils.js
└── views
    ├── error.ejs
    └── index.ejs
```

### 快速开始

进入目录安装依赖并运行:

```bash
git clone https://github.com/miracles1919/node-taobao.git

cd node-taobao

npm i

# 如果提示nodemon: command not found
# 请先npm install -g nodemon

nodemon index.js
```


### FAQ
项目中遇到的问题

- 支持es6/es7
    1) ReferenceError: regeneratorRuntime is not defined)
    2) async await ...等 Unexpected token

```bash
# 下载babel
npm i babel-register babel-preset-env babel-polyfil --save-dev
npm i babel-plugin-transform-object-rest-spread --save-dev

# 创建.babelrc
{
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
    "plugins": ["syntax-async-functions","transform-regenerator","babel-polyfill","transform-object-rest-spread"]
}

# 将入口文件进行封装（入口文件不能包含import）
# 例如 index.js

require('babel-register');
```

- async 异步循环

```javascript
// 举个例子
let asyncFunc = () => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(1) }, 0)
  })
}

//获取不到返回值
console.log(asyncFunc())

let docs = [{}, {}, {}]

// 并发写法
let getAsync = async () => {
  let promises = docs.map(item => (async () => {
    item = await asyncFunc()
  })())

  await Promise.all(promises)
  // 输出[{x: 1}, {x: 1}, {x: 1}]
  console.log(docs)
}
getAsync()

// 继发写法
let getAsync = async () => {
  for (let doc of docs) {
    doc.x = await asyncFunc()
  }
  console.log(docs)
}
getAsync()

```
