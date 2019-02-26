<template>
  <div class="paper">
    <Navbar/>
    <Content>
      <template slot="left">
        <!-- <el-rate v-model="paper.level" :texts="texts" disabled show-text></el-rate> -->
      </template>
      <template slot="content">
        <h2>
          {{paper.name}}
          <span class="c-subtitle">总分：{{paper.total}}</span>
          <span class="c-subtitle">限时：{{paper.timeLimit}}分钟</span>
          <span class="c-subtitle">难度：{{paper.level}}</span>
          <span class="c-subtitle">创建日期：{{paper.date}}</span>
          <span class="c-subtitle">
            <el-button type="primary" icon="el-icon-edit" round @click="PEDialogVisible = true">编辑试卷</el-button>
          </span>
        </h2>
        <div class="single-choice">
          <h3>一. 单项选择题：本大题共24小题，每小题1分，共24分。在每小题列出的备选项中 只有一项是最符合题目要求的，请将其选出</h3>
          <div v-for="(item,index) in paper.singleChoice" :key="index">
            <SingleChoice
              @question-edit="qusetioneEdit('single-choice',index)"
              @question-delete="questionDelete('single-choice',index)"
              :isStu="false"
              :SC="item"
              :index="index"
            ></SingleChoice>
          </div>
        </div>
        <div class="competition">
          <h3>二. 填空题：本大题共15空，每空1分，共15分。</h3>
          <div v-for="(item,index) in paper.competition" :key="index">
            <Competition
              @question-edit="qusetioneEdit('competition',index)"
              @question-delete="questionDelete('competition',index)"
              :competition="item"
              :index="index"
              :isStu="false"
            ></Competition>
          </div>
        </div>
        <div class="submit">
          <el-button type="primary" style="width:150px">提交试卷</el-button>
        </div>
      </template>
      <template slot="right">
        <!-- <div class="countdown">完成度：
          <el-progress type="circle" width="60" :percentage="80" color="#8e71c7"></el-progress>
        </div>-->
      </template>
    </Content>
  
    <!-- 题目编辑的模态框 -->
    <el-dialog title="题目修改" :visible.sync="QEDialogVisible" width="35%">
      <el-form :label-position="right" label-width="70px" :model="focusQuestion">
        <el-form-item label="问题名称">
          <el-input v-model="focusQuestion.question"></el-input>
        </el-form-item>
        <div class="focus-question-s" v-if="focusQuestion.type=='single-choice'">
          <el-form-item label="答案A">
            <el-input v-model="focusQuestion.A"></el-input>
          </el-form-item>
          <el-form-item label="答案B">
            <el-input v-model="focusQuestion.B"></el-input>
          </el-form-item>
          <el-form-item label="答案C">
            <el-input v-model="focusQuestion.C"></el-input>
          </el-form-item>
          <el-form-item label="答案D">
            <el-input v-model="focusQuestion.D"></el-input>
          </el-form-item>
        </div>
        <div class="focus-question-c" v-else-if="focusQuestion.type=='competition'">
          <el-form-item
            v-for="(answer,index) in focusQuestion.answer"
            :label="'答案'+(index+1)"
            :key="index"
          >
            <el-input v-model="focusQuestion.answer[index]">
              <el-button slot="append" @click.prevent="removeAnswer(index)">删除</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!focusQuestion.A" @click="addAnswer">添加答案</el-button>
        <el-button @click="QEDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-button type="text" @click="PEDialogVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <!-- 试卷编辑的模态框 -->
    <el-dialog title="试卷信息" :visible.sync="PEDialogVisible" width="35%">
      <el-form :model="paper" label-width="70px">
        <el-form-item label="试卷名称" >
          <el-input v-model="paper.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试卷难度" >
          <el-input-number v-model="paper.level" @change="handleChange" :min="1" :max="10" label="难度"></el-input-number>
        </el-form-item>
        <el-form-item label="试卷总分" >
          <el-input v-model="paper.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试时间" >
          <el-input v-model="paper.timeLimit" autocomplete="off"><template slot="append">分钟</template></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="PEDialogVisible = false">PEDialogVisible = false取 消</el-button> -->
        <el-button type="primary" @click="PEConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import SingleChoice from "../components/SingleChoice";
import Competition from "../components/Competition";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "paper",
  data() {
    return {
      QEDialogVisible: false,
      PEDialogVisible:false,
      time: 15,
      answer: {
        singleChoice: [],
        competition: []
      },
      focusQuestion: {
        type: "single-choice",
        index: "0",
        id: "",
        question: "未来宽带、大容量通信网络的优选方案是",
        A: "多媒体网络",
        B: "全光网络",
        C: "移动互联网",
        D: "虚拟网络",
        answer: ["接收方窗口", "未来窗口"]
      },
      paper: {
        id: "0",
        name: "计算机二级网络考试",

        level: "2",
        total: "100",
        score: "85",
        date: "2018-07-25",
        timeConsuming: "35",
        timeLimit: "60",
        singleChoice: [
          {
            id: "",
            question:
              "未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是未来宽带、大容量通信网络的优选方案是",
            A: "多媒体网络",
            B: "全光网络",
            C: "移动互联网",
            D: "虚拟网络",
            answer: ""
          },
          {
            id: "",
            question: "对于点-点线路的通信子网，其采用的基本拓扑结构可以是",
            A: "星形",
            B: "无线通信型",
            C: "总线形",
            D: "卫星通信型",
            answer: ""
          },
          {
            id: "",
            question: "下列关于环形拓扑结构的优点表述错误的是",
            A: "电缆长度短",
            B: "网络性能稳定",
            C: "可使用光纤",
            D: "故障检测容易",
            answer: ""
          }
        ],
        competition: [
          {
            question:
              "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
            answer: ["接收方窗口"]
          },
          {
            question:
              "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
            answer: ["接收方窗口"]
          },
          {
            question:
              ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
            answer: ["接收方窗口", "", ""]
          },
          {
            question:
              ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
            answer: ["接收方窗口"]
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["init"]),
    addAnswer() {
      this.focusQuestion.answer.push("");
    },
    removeAnswer(index) {
      this.focusQuestion.answer.splice(index, 1);
    },
    // 问题编辑
    qusetioneEdit(type, index) {
      console.log("问题编辑" + type);
      if (type == "single-choice") {
        this.focusQuestion = {
          type,
          index,
          ...this.paper.singleChoice[index]
        };
        //拉起修改问题模态框
        this.QEDialogVisible = true;
      } else if (type == "competition") {
        this.focusQuestion = {
          type,
          index,
          ...this.paper.competition[index]
        };
        //拉起修改问题模态框
        this.QEDialogVisible = true;
      }
    },

    questionDelete(type, index) {
      console.log("问题删除");

      this.$confirm("此操作将删除该问题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //TODO 删除问题操作

          this.$notify.success({
            title: "成功",
            message: "删除成功！"
          });
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消删除"
          });
        });
    },
    // 问题编辑后确认
    editConfirm() {
      let focusQuestion = this.focusQuestion;
      let { type, index } = focusQuestion;
      delete focusQuestion.type;
      delete focusQuestion.index;

      if (type == "single-choice") {
        this.paper.singleChoice[index] = focusQuestion;
        //关闭 修改问题模态框
        this.QEDialogVisible = false;
      } else if (type == "competition") {
        this.paper.competition[index] = focusQuestion;
        //关闭 修改问题模态框
        this.QEDialogVisible = false;
      }

      //TODO  发送修改题目的请求
    },
    //试卷编辑后确认
    PEConfirm(){
      let that=this;
      // 将试卷编辑结果发个后台
      that.PEDialogVisible = false
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
    Navbar,
    Footer,
    Content,
    SingleChoice,
    Competition
  }
};
</script>

<style scoped>
.single-choice,
.competition {
  padding: 0 10px;
  border-top: 1px solid #ddd;
}
.submit {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
.left,
.right {
  width: 100px;
}
.c-subtitle {
  font-size: 14px;
  font-weight: normal;
  margin-left: 40px;
}
</style>