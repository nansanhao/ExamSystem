<template>

    <div class="home" :style="{height:height+'px'}">
        <div class="content">
            <div class="title">
                <div>计算机等级考试</div>
                <div>模拟系统</div>
            </div>

            <div class="form">
                <el-tabs type="border-card" stretch>
                    <el-tab-pane label="登陆">
                        <div class="f-input-list">
                            <div class="f-i-item">
                                <el-input placeholder="账号" prefix-icon="el-icon-message"
                                          v-model="loginForm.account"></el-input>
                            </div>
                            <div class="f-i-item">
                                <el-input
                                        placeholder="密码"
                                        prefix-icon="el-icon-edit-outline"
                                        type="password"
                                        v-model="loginForm.password"
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
                            <el-button class="f-b-login" type="primary" @click="loginClick">登陆</el-button>
                            <a href="#" class="f-b-forget">忘记密码?</a>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="注册">
                        <div class="f-input-list">
                            <div class="f-i-item">
                                <el-input placeholder="邮箱" prefix-icon="el-icon-message"
                                          v-model="registerForm.account"></el-input>
                            </div>
                            <div class="f-i-item">
                                <el-input
                                        placeholder="密码"
                                        prefix-icon="el-icon-edit-outline"
                                        type="password"
                                        v-model="registerForm.password"
                                ></el-input>
                            </div>
                            <div class="f-i-item">
                                <el-input
                                        placeholder="确认密码"
                                        prefix-icon="el-icon-edit-outline"
                                        type="password"
                                        v-model="registerForm.passwordRepeat"
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
                            <el-button class="f-b-login" type="primary" @click="registerClick">注册</el-button>
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
    import {mapActions} from 'vuex'

    export default {
        name: "home",
        data() {
            return {
                loginForm: {
                    account: "",
                    password: ""
                },
                registerForm: {
                    account: "",
                    password: "",
                    passwordRepeat: ""
                },
                isStu: true,
                height: window.innerHeight
            };
        },
        components: {
            Footer
        },
        methods: {
            ...mapActions([
                'login',
                'api'
            ]),
            loginClick() {
                let user = {
                    isStudent: this.isStu,
                    ...this.loginForm
                };
                console.log(user);

                this.login(user).then(()=>{
                    this.$notify.success({
                        title: '成功',
                        message: '登陆成功！',
                        duration:1000
                    });
                    this.$router.push({name:'user'})
                },(state)=>{
                    switch (state){
                        case 1:
                            this.$notify.error({
                                title: '错误',
                                message: '密码输入错误！'
                            });break;
                        case 2:
                            this.$notify.error({
                            title: '错误',
                            message: '此账号不存在！'
                        });break;
                    }
                    console.log("错误");
                });
            },
            registerClick() {
                if (this.registerForm.password == this.registerForm.passwordRepeat) {
                    let user = {
                        isStudent: this.isStu,
                        account: this.registerForm.account,
                        password: this.registerForm.password
                    }
                    this.$http.post("/register", user,{emulateJSON:true}).then(data => {
                        let state = data.body.Status;

                        switch (state) {
                            case 0:
                                this.registerForm = {
                                    account: "",
                                    password: "",
                                    passwordRepeat: ""
                                };
                                this.$notify.success({
                                    title: '成功',
                                    message: '注册成功！'
                                });
                                break;
                            case 1:
                                this.registerForm.password="";
                                this.registerForm.passwordRepeat="";
                                this.$notify.warning({
                                    title: '警告',
                                    message: '此邮箱已经注册过！'
                                })
                                break;
                        }
                    })
                } else {
                    this.registerForm.password="";
                    this.registerForm.passwordRepeat="";
                    this.$notify.error({
                        title: '错误',
                        message: '两次输入的密码不一致！'
                    });
                }

            }

        },
        created: function () {

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

