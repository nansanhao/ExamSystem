<template>
  <div class="user">
    <Navbar/>
    <div class="content">
      <div class="u-wrap">
        <div class="avatar-wrap">
          <el-card shadow="always" body-style="padding:5px">
            <img :src="user.avatar" class="avatar">
          </el-card>
        </div>
        <div class="info">
          <div class="i-name-wrap">
            <div class="name">{{user.name}}</div>
            <div class="identity">{{getIdentity}}</div>
            <div class="gender">
              <img v-if="user.gender=='男'" src="../assets/icons/male.png" alt="男">
              <img v-if="user.gender=='女'" src="../assets/icons/female.png" alt="女">
            </div>
            <i class="el-icon-setting"></i>
          </div>
          <div class="i-other">
            <div class="i-o-item">
              <div class="i-o-title">院系</div>
              <div class="i-o-content">{{user.institution}}</div>
            </div>
            <div class="i-o-item">
              <div class="i-o-title">年龄</div>
              <div class="i-o-content">{{user.age}}</div>
            </div>
            <div class="i-o-item">
              <div class="i-o-title">已做试卷</div>
              <div class="i-o-content">{{user.paperNum}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="record">
        <div class="r-title">
          <i class="el-icon-edit"></i>&nbsp;&nbsp;做题记录
        </div>
        <el-card
          shadow="hover"
          body-style="padding:20px;;"
          class="r-item"
          v-for="(item,index) in papers"
          :key="index"
          @click.native="GetPaper(index)"
        >
          <div>
            <div class="r-info-1">
              <div class="r-i-name">{{item.name}}</div>
              <div class="r-i-level">
                <el-rate v-model="item.level" :texts="texts" disabled show-text></el-rate>
              </div>
              <div class="r-i-date">{{item.date}}</div>
            </div>
            <div class="r-info-2">
              <div class="r-i-time">
                <div class="r-i-timelimit">限时：{{item.timeLimit}}</div>
                <div class="r-i-timeconsuming">耗时：{{item.timeConsuming}}</div>
              </div>
              <div class="r-i-score">
                <div class="r-i-totalscore">总分：{{item.total}}</div>
                <div class="r-i-totalscore">得分：</div>
                <div class="r-i-userscore">{{item.score}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"

export default {
  name: "user",
  data() {
    return {
      isStu: true,
      texts: ["简单", "容易", "一般", "困难", "极难"],
      user: {
        name: "南三号",
        avatar:
          "http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180",
        paperNum: "121",
        gender: "男",
        age: "18",
        institution: "软件工程"
      },
      papers: [
        {
          id: 1,
          name: "全国大学生计算机考试",
          level: "2",
          total: "100",
          score: "85",
          date: "2018-07-25",
          timeConsuming: "35分钟",
          timeLimit: "60分钟"
        },
        {
          id: 1,
          name: "专业英语四级考试",
          level: "4",
          total: "100",
          score: "55",
          date: "2018-07-25",
          timeConsuming: "35分钟",
          timeLimit: "60分钟"
        },
        {
          id: 1,
          name: "专业英语四级考试",
          level: "4",
          total: "100",
          score: "55",
          date: "2018-07-25",
          timeConsuming: "35分钟",
          timeLimit: "60分钟"
        },
        {
          id: 1,
          name: "专业英语四级考试",
          level: "4",
          total: "100",
          score: "55",
          date: "2018-07-25",
          timeConsuming: "35分钟",
          timeLimit: "60分钟"
        },
        {
          id: 1,
          name: "专业英语四级考试",
          level: "4",
          total: "100",
          score: "55",
          date: "2018-07-25",
          timeConsuming: "35分钟",
          timeLimit: "60分钟"
        }
      ]
    };
  },
  computed: {
    getIdentity() {
      return this.isStu == true ? "学生" : "老师";
    }
  },
  methods:{
      GetPaper(index){
        
        this.$router.push('paper');
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
  color: #009688;
  font-weight: bold;
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
  color: #009688;
  font-size: 40px;
}
.footer {
  margin: 20px 0;
}

.el-icon-setting {
  font-size: 24px;
  cursor: pointer;
}
</style>