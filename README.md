# ExamSystem
> 一个外包，是一个考试模拟系统，功能不够完善。（2020/02/25）

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
>     account:"",
>     password:"",
>     isStudent:""
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
> GET    /teacher/:id
>
> ```js
> //返回内容（老师信息）
> {
>     
> }
>           
> ```
>
> POST 	/student/:id 
>
> ```js
> //发送表单
> {
>     
> }
> ```
>
> POST	/teacher/:id
>
> ```js
> //发送表单
> {
>     
> }
> ```
>
> 




#### 试卷页面

> Student：
>
> GET　/paper/:id
>
> ```js
> //发送表单内容
> {
>     id:"",
>     isStudent:""
> }
> //返回内容（试卷信息）如果是老师会获得更多信息
> {
>     
> }
> ```
>
> POST   /paper
>
> ```js
> //发送表单内容
> {
>     id:"",
>     operation:"",//0是新建，1是修改，2则删除
>     problems:[]//题目的id数组
> }
> //返回内容
> {
>     operation:"",//0是新建，1是修改，2则删除
>     //state,0则成功，1则失败
>     state：""
> }
> ```
>
> POST   /problem 
>
> ```js
> //修改问题，
> //发送表单内容
> {
>     id:"",
>     operation:"",  //0是新建，1是修改，2则删除
>     problem:{}//新建的题目或者修改后的题目
> }
> ```
>

#### 新增api

>获得题库的试卷
>
>GET    /papers?type=&offset=&limit=
>
>获得学生做过的试卷
>
>GET    /student/papers？id=&offset=&limit=
>
>获得老师建立的试卷
>
>GET    /teacher/papers？id=&offset=&limit=
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
