<template>
  <div class="user">
    <Navbar/>
    <div class="content">
      <div class="u-wrap">
        <div class="avatar-wrap">
          <el-card shadow="always" body-style="padding:5px">
            <img :src="getUser.avatar" class="avatar">
          </el-card>
        </div>
        <div class="info">
          <div class="i-name-wrap">
            <div class="name">{{getUser.name}}</div>
            <div class="identity">{{getIdentity}}</div>
            <div class="gender">
              <img v-if="getUser.gender=='男'" src="../assets/icons/male.png" alt="男">
              <img v-if="getUser.gender=='女'" src="../assets/icons/female.png" alt="女">
            </div>
            <i class="el-icon-setting" @click="updateUser"></i>
          </div>
          <div class="i-other">
            <div class="i-o-item">
              <div class="i-o-title">院系</div>
              <div class="i-o-content">{{getUser.institution}}</div>
            </div>
            <div class="i-o-item">
              <div class="i-o-title">年龄</div>
              <div class="i-o-content">{{getUser.age}}</div>
            </div>
            <div class="i-o-item">
              <div class="i-o-title">已做试卷</div>
              <div class="i-o-content">{{getUser.paperNum}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="record">
        <div class="r-title">
          <i class="el-icon-edit"></i>&nbsp;&nbsp;做题记录&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="新建试卷" placement="top-start">
            <el-button icon="el-icon-plus" circle @click="PEDialogVisible = true"></el-button>
          </el-tooltip>
        </div>
        <el-card
          shadow="hover"
          body-style="padding:20px;;"
          class="r-item"
          v-for="(item,index) in getBriefPapers"
          :key="index"
          @click.native="GetPaper(index)"
        >
          <div>
            <div class="r-info-1">
              <div :class="[item.timeConsuming==''?'':'r-i-finish','r-i-name']">{{item.name}}</div>
              <div class="r-i-level">
                <el-rate v-model="item.level" :texts="texts" disabled show-text></el-rate>
              </div>
              <div class="r-i-date">{{item.date}}</div>
            </div>
            <div class="r-info-2">
              <div class="r-i-time">
                <div class="r-i-timelimit">限时：{{item.timeLimit}}分钟</div>
                <div
                  class="r-i-timeconsuming"
                >耗时：{{item.timeConsuming==""?"未完成":item.timeConsuming+"分钟"}}</div>
              </div>
              <div class="r-i-score">
                <div class="r-i-totalscore">总分：{{item.total}}</div>
                <div class="r-i-totalscore">得分：</div>
                <div
                  :class="[item.score==''?'':'r-i-finish','r-i-userscore']"
                >{{item.score==""?"无":item.score}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- Form -->
    <!-- 用户信息设置的模态框 -->
    <el-dialog title="用户设置" :visible.sync="userFormVisible" width="35%">
      <el-form :model="getUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="getUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="院系" :label-width="formLabelWidth">
          <el-input v-model="getUser.institution" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="getUser.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属板块" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择所属板块">
            <el-option label="英语四六级" value="shanghai"></el-option>
            <el-option label="计算机二级" value="beijing"></el-option>
            <el-option label="软件工程" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="userFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="userFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 试卷编辑的模态框 -->
    <el-dialog title="试卷信息" :visible.sync="PEDialogVisible" width="35%">
      <el-form :model="newPaper" label-width="70px">
        <el-form-item label="试卷名称">
          <el-input v-model="newPaper.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试卷难度">
          <el-input-number
            v-model="newPaper.level"
            @change="handleChange"
            :min="1"
            :max="5"
            label="难度"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="试卷总分">
          <el-input v-model="newPaper.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input v-model="newPaper.timeLimit" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="PEDialogVisible = false">PEDialogVisible = false取 消</el-button> -->
        <el-button type="primary" @click="PEConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "user",
  data() {
    return {
      userFormVisible: false,
      // 新建试卷的模态框状态
      PEDialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      newPaper: {
        name: "",
        level: "",
        total: "",
        score: "",
        date: "2019-03-02",
        timeConsuming: "",
        timeLimit: ""
      },
      formLabelWidth: "70px",
      texts: ["简单", "容易", "一般", "困难", "极难"],
      // papers: [],
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(["getIdentity", "getUser","getBriefPapers"])
  },
  methods: {
    ...mapMutations(["init"]),
    GetPaper(index) {
      //点击跳转到paper页面
      this.$router.push({path:"paper",query: { index }});
    },
    //修改用户信息
    updateUser() {
      this.userInfo = this.$store.getters.getUser;
      console.log(this.userInfo.account);
      this.userFormVisible = true;
    },
    // 新建试卷确认
    PEConfirm() {
      this.PEDialogVisible = false;
      // 向后台发送新建试卷请求
      let newPaper = this.newPaper;
      newPaper.id = this.papers.length;
      this.papers.push(newPaper);
      this.newPaper = {
        id: "",
        name: "",
        level: "",
        total: "",
        score: "",
        date: "2018-07-25",
        timeConsuming: "",
        timeLimit: ""
      };
    }
  },
  created() {
    if (!this.$store.state.user.name) {
      if (sessionStorage.getItem("ES_User")) {
        this.init("reload");
      } else {
        console.log("无登陆状态，返回主页");
        //this.$router.push({name: 'home'});
      }
    }
  },
  components: {
    Footer,
    Navbar
  }
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px 30px;
  width: 1040px;
}

.u-wrap {
  display: flex;
}

.avatar {
  width: 200px;
  height: 200px;
}

.info {
  flex: 1;
  padding: 0 40px;
}

.i-name-wrap {
  display: flex;
  align-items: center;
}

.name {
  font-size: 24px;
  font-weight: normal;
  line-height: 30px;
}

.identity {
  margin: 0 10px;
  padding: 4px 8px;
  color: white;
  font-size: 16px;
  border-radius: 12px;
  background-color: #009688;
}

.gender {
  display: flex;
  align-items: center;
  flex: 1;
}

.i-other {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  border-top: 1px solid #ddd;
  padding: 20px 0;
}

.i-o-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.i-o-content {
  font-size: 18px;
  color: #666;
}

.i-o-item {
  text-align: center;
  flex: 1;
}

.i-o-item + .i-o-item {
  border-left: 1px solid #ddd;
}

.record {
  padding: 20px 0;
}

.r-title {
  font-size: 22px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.r-info-1 {
  display: flex;
  align-items: center;
}

.r-info-2 {
  display: flex;
  align-items: flex-end;
  padding: 20px 0 0 0;
}

.r-item {
  margin: 20px 0;
  cursor: pointer;
}

.r-i-name {
  font-size: 18px;
  color: rgb(255, 208, 75);
  font-weight: bold;
}
.r-i-finish {
  color: #009688 !important;
}

.r-i-level {
  flex: 1;
  padding: 0 0 0 20px;
}

.r-i-date {
  color: rgb(95, 95, 95);
}

.r-i-time {
  display: flex;
  align-items: flex-end;
  flex: 1;
  font-size: 16px;
}

.r-i-timelimit {
  margin-right: 20px;
}

.r-i-score {
  display: flex;
  align-items: flex-end;
}

.r-i-totalscore {
  margin-right: 20px;
}

.r-i-userscore {
  font-size: 40px;
  color: rgb(255, 208, 75);
}

.footer {
  margin: 20px 0;
}

.el-icon-setting {
  font-size: 24px;
  cursor: pointer;
}
</style>