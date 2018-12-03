<template>
  <div class="home" :style="{height:height+'px'}">
    <div class="content">
      <div class="title">
        <div>计算机等级考试</div>
        <div>模拟系统</div>
      </div>

      <div class="form">
        <el-tabs type="border-card" stretch="true">
          <el-tab-pane label="登陆">
            <div class="f-input-list">
              <div class="f-i-item">
                <el-input placeholder="账号" prefix-icon="el-icon-message" v-model="input2"></el-input>
              </div>
              <div class="f-i-item">
                <el-input
                  placeholder="密码"
                  prefix-icon="el-icon-edit-outline"
                  type="password"
                  v-model="input2"
                ></el-input>
              </div>
            </div>
            <div class="f-radio-list">
              <el-radio-group v-model="isStu">
                <el-radio :label="true">学生</el-radio>
                <el-radio :label="false">老师</el-radio>
              </el-radio-group>
            </div>
            <div class="f-btn">
              <el-button class="f-b-login" type="primary">登陆</el-button>
              <a href="#" class="f-b-forget">忘记密码?</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <div class="f-input-list">
              <div class="f-i-item">
                <el-input placeholder="邮箱" prefix-icon="el-icon-message" v-model="input2"></el-input>
              </div>
              <div class="f-i-item">
                <el-input
                  placeholder="密码"
                  prefix-icon="el-icon-edit-outline"
                  type="password"
                  v-model="input2"
                ></el-input>
              </div>
              <div class="f-i-item">
                <el-input
                  placeholder="确认密码"
                  prefix-icon="el-icon-edit-outline"
                  type="password"
                  v-model="input2"
                ></el-input>
              </div>
            </div>
            <div class="f-radio-list">
              <el-radio-group v-model="isStu">
                <el-radio :label="true">学生</el-radio>
                <el-radio :label="false">老师</el-radio>
              </el-radio-group>
            </div>
            <div class="f-btn">
              <el-button class="f-b-login" type="primary">注册</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "../components/Footer.vue";

export default {
  name: "home",
  data() {
    return {
      isStu: true,
      height: window.innerHeight
    };
  },
  components: {
    Footer
  }
};
</script>
<style scoped>
.title {
  font-family: "apercu", sans-serif;
  font-size: 80px;
  font-weight: 800;
  color: #fcfcfc;
  text-shadow: 8px 8px 8px #000000;
  letter-spacing: 10px;
  margin-top: 60px;
}
.home {
  background-image: url("../assets/home/home_bg.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 1000px;
  position: relative;
}
.content {
  display: flex;
  justify-content: space-around;

  padding-top: 15%;
  padding-right: 5%;
}
.form {
  width: 400px;
}
.f-input-list {
  margin: 20px 30px;
}
.f-i-item {
  padding: 10px 0;
}
.f-radio-list {
  margin: 20px 30px;
}
.f-b-login {
  width: 100%;
  margin: 0;
}
.f-b-forget {
  width: 100%;
  text-align: center;
  display: block;
  color: rgb(22, 137, 251);
  text-decoration: none;
  margin-top: 10px;
  font-size: 14px;
}
.f-btn {
  margin: 20px 30px;
}
.footer {
  position: absolute;
  bottom: 10px;
}
</style>

