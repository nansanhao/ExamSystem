import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isStu:"",
        user: {}
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getIdentity(state){
            return state.isStu == true ? "学生" : "老师";
        }
    },

    mutations: {
        init(state,initType){
            if(initType=='clear'){
                console.log("clear");
                state.isStu="";
                state.user={};
                sessionStorage.removeItem("ES_isStu");
                sessionStorage.removeItem("ES_User");

            }else if(initType=="reload") {
                console.log("reload");
                state.isStu=JSON.parse(sessionStorage.getItem("ES_isStu"));
                state.user=JSON.parse(sessionStorage.getItem("ES_User"));
            }

        },
        login(state, user) {
            state.user = user;
        },
        isStu(state,isStu){
            state.isStu=isStu;
        }

    },
    actions: {
        login(context, user) {

            return new Promise(function (resolve, reject) {
                Vue.http.post("/login", user).then(data => {
                    //console.log(data)
                    if(data.body.Status){
                        reject(data.body.Status);
                    }else {
                        let isStu=user.isStudent;
                        let User=data.body[0];

                        context.commit('isStu',isStu);
                        context.commit('login', User);

                        //登陆时存入session中
                        sessionStorage.setItem("ES_User",JSON.stringify(User));
                        sessionStorage.setItem("ES_isStu",JSON.stringify(isStu));

                        resolve();
                    }

                });
            })
        },
        api(context, path, method = "GET", data = {}) {
            return new Promise(function (resolve, reject) {
                Vue.http({
                    url: path,
                    method: method,
                    data: data

                }).then(data => {
                    resolve(data);
                })
            })
        }
    }
})
