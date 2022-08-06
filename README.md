## 一、拉取项目代码

- 使用 HTTP

```
git clone xxxx[本地目录名称]
```

- 使用 SSH

1. 生成 SSH 私钥公钥

```
ssh-keygen -t rsa -C "邮件地址名"
```

2. 配置 gitLab SSH Key

   > 登录云道 -> User Setting -> SSH Keys -> 复制生成的公钥到 Key 中 -> Add Key

3. 拉取代码

```
git clone git@xxxx [本地目录名称]
```

4.提示

```
ssh 切换 http
git remote set-url origin [远程地址]

http 切换 ssh
git remote set-url origin [远程地址]

查看远程源地址
git remote -v

切换分支
git checkout [分支名称]


本地会新建一个分支名叫 dev ，会自动跟踪远程的同名分支dev。
git checkout --track origin/dev

将本地分支和远程分支进行关联
git branch --set-upstream-to=origin/dev dev
```

## 二、运行项目

- 构建：yarn install
- 启动：yarn start **访问:http://localhost:8000/**
- 打包：yarn build **默认 dist 目录**
- 技术栈：React + Umi.js + Antd

## 三、相关规范

### 公共

1. HTML、CSS、JS 等缩进均采用 soft tab（2 个空格）
2. 开启 eslint 插件 stylelint 插件

### Less

1. 类名使用小写字母，以中划线分隔 例如'top-box' ;id 采用驼峰式命名 例如`User-Wrapper`

### JS/TS

1. 语句结束后必须加 `;` 分号结尾
2. 变量和方法名采用小驼峰形式，常量名采用全大写加下划线形式，类名采用大驼峰形式

   ```javascript
   // 变量
   let testNum = 1;
   // 方法
   function testFunc() {}
   // 常量
   const MAX_NUM = 20;
   // 类名
   function BigPerson() {}
   class Dep {}
   ```

### git 提交规范

#### (英文冒号后面有个空格) 例如(`git commit -m 'test: 增加单元测试'`)

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动(依赖包)
- revert 回退代码
- perf 代码优化性能优化

### 其他

> 开启 eslint stylelint 插件 \ 变量命名 函数命名 原要清楚干什么,要见名知其意

1. 目录名用小写过长时写加 "-" 分割的形式，如 `cultural-boutique " (公共组件目录,私有组件目录名大驼峰)， 组件名一律大驼峰命名 路由组件一律为 index.tsx
2. 全局公共组件，放在 src/components 文件 common 中 全局业务组件 business 文件中 组件目录名称或者组件名必须大驼峰命名
3. 私有组件，存放在对应页面下的 "components" 文件夹中，并且组件文件夹以 "S-" 开头命名，如 login 中私有组件 :` S-Login-Form`
4. React 组件名必须大写字母开头(index.tsx 路由组件命名除外),当前页面的一些公共方法,常量等当前目录下的`utils.ts中`
5. 事件处理方法命名由 "handle" + "相关元素" + "事件名" 组成。 如处理导航栏子元素点击事件的方法`handleNavItemClick`
6. 网络请求函数命名由 api + '其他' ，根据请求内容合理命名 例如: `apiGetUserinfoByQuery ,apiDeleteUserinfo ,apiCreateUserInfo`。
7. 图片 视频 资源命名以 `_` 连接 例如:`login_bg.png ,user_video.mp4`
8. 路由页面目录包含:`index.tsx(路由组件入口) index.less 或者 styles.less(样式) service.ts(请求) type.d.ts(TS 类型) model.ts(可选)
9. eslint stylelint 规范等团队自行配置约定

## 四、项目配置

1. 编译配置

- config/config.js 文件下 详细配置见 [umi.js 文档 ](https://umijs.org/zh-CN/config)

2. 运行时配置

- src/app.ts 文件 详细配置见 [umi.js 文档 ](https://umijs.org/zh-CN/config)

## 五、目录结构

```
config #umi配置
 |
public #静态资源
 │
src
 ├─assets #静态资源
 │  │
 │  ├─fonts #字体
 │  │
 │  ├─icons #图标
 │  │
 │  └─imgs #图片
 │
 ├─components #全局组件
 │  │
 │  ├─business #业务组件
 │  │
 │  └─common #公共组件
 │
 ├─constants #系统常量
 │      index.ts
 │
 ├─hooks #自定义hooks
 │      index.ts
 │
 ├─layouts #布局组件
 │      AuthLayout.tsx
 │      BasicLayout.tsx
 │
 ├─models #全局状态
 │      authModel.ts
 │
 ├─pages #路由组件
 │      document.ejs #默认index.html
 │
 ├─services #请求模块
 │      http.ts 封装请求函数
 │      public.ts 公共请求接口
 │
 ├─styles #style样式
 │      variables.less
 │
 ├─app.ts #运行时配置
 │
 ├─global.ts #全局ts
 │
 ├─global.less #全局less
 │
 ├─typings.d.ts #全局ts声明文件
 │
 └─utils #工具方法
        index.ts

```
