# ExamSystem

## 一、项目需求

### 前端

- 首页

  > 登陆
  >
  > 注册

- 个人详情页

  > 查询个人信息

- 试卷页面

  > 学生：
  >
  > 得到试题
  >
  > 做题，提交得到分数
  >
  > 老师：
  >
  > 看到所有的试题，可以编辑试题
  >
  > 查看学生分数

## 二、数据库设计

学生表

老师表

题表

## 三、API接口设计

#### 首页

> POST    /login
>
> ```js
>  //发送表单内容
> {
>     account:"",
>     password:"",
>     isStudent:""
> }
> //返回内容（学生或老师的id）
> {
>     id：""
> }
> ```
>
> 
>
> POST   /register
>
> ```javascript
> //发送表单内容
> {
>     account:""
>     password:""
> }
> 
> //返回内容（学生信息）
> {
>     //state,0则注册成功，1则已经注册
>     state:1
> }
> ```

#### 个人信息页面

> GET    /student/:id
>
> ```javascript
> //返回内容（学生信息）
> {
>    
> }
> ```
>
> 
>
> GET    /teacher/:id
>
> ```js
> //返回内容（老师信息）
> {
>     
> }
> ```

#### 试卷页面

> Student：
>
> GET　/paper
>
> 
>
> 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
