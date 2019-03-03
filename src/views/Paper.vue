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
          <span class="c-subtitle" v-if="!getIsStu">
            <el-button type="primary" icon="el-icon-edit" round @click="PEDialogVisible = true">编辑试卷</el-button>
          </span>
          <span class="c-subtitle" v-if="isCheck">
            得分：
            <span class="c-subtitle-score">{{paper.score}}</span>
          </span>
        </h2>
        <div class="single-choice">
          <h3>一. 单项选择题：本大题共24小题，每小题1分，共24分。在每小题列出的备选项中 只有一项是最符合题目要求的，请将其选出</h3>
          <div v-for="(item,index) in paper.singleChoice" :key="index">
            <SingleChoice
              @question-edit="qusetioneEdit('single-choice',index)"
              @question-delete="questionDelete('single-choice',index)"
              @question-add="questionAdd('single-choice',index)"
              :isStu="getIsStu"
              :isCheck="isCheck"
              :SC="item"
              :index="index"
              v-model="item.myAnswer"
            ></SingleChoice>
          </div>
        </div>
        <div class="competition">
          <h3>二. 填空题：本大题共15空，每空1分，共15分。</h3>
          <div v-for="(item,index) in paper.competition" :key="index">
            <Competition
              @question-edit="qusetioneEdit('competition',index)"
              @question-delete="questionDelete('competition',index)"
              @question-add="questionAdd('competition',index)"
              :competition="item"
              :index="index"
              :isStu="getIsStu"
              :isCheck="isCheck"
              :myAnswer.sync="item.myAnswer"
            ></Competition>
          </div>
        </div>
        <div class="submit" v-if="!isCheck">
          <el-button
            type="primary"
            style="width:150px"
            @click="submitPaper"
            :loading="submitLoading"
          >{{submitContent}}</el-button>
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
          <el-form-item label="答案">
            <el-input v-model="focusQuestion.answer"></el-input>
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
            <!-- <div>
              {{focusQuestion.myAnswer}}
            </div>-->
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!focusQuestion.A" @click="addAnswer">添加答案</el-button>
        <el-button @click="QEDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-button type="text" @click="PEDialogVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <!-- 试卷编辑的模态框 -->
    <el-dialog title="试卷信息" :visible.sync="PEDialogVisible" width="35%">
      <el-form :model="paper" label-width="90px">
        <el-form-item label="试卷名称">
          <el-input v-model="paper.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试卷难度">
          <el-input-number
            v-model="paper.level"
            @change="handleChange"
            :min="1"
            :max="5"
            label="难度"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="试卷总分">
          <el-input v-model="paper.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input v-model="paper.timeLimit" autocomplete="off">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="选择题分值">
          <el-input v-model="paper.scorePerSC" autocomplete="off">
            <template slot="append">分每题</template>
          </el-input>
        </el-form-item>
        <el-form-item label="填空题分值">
          <el-input v-model="paper.scorePerC" autocomplete="off">
            <template slot="append">分每空</template>
          </el-input>
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "paper",
  data() {
    return {
      isCheck: false,
      submitLoading: false,
      QEDialogVisible: false,
      PEDialogVisible: false,
      time: 15,
      answer: {
        singleChoice: [],
        competition: []
      },
      focusQuestion: {},
      paper: {}
    };
  },
  computed: {
    ...mapState(["papers"]),
    ...mapGetters(["getIsStu", "getPaperByIndex"]),
    submitContent() {
      if (this.$store.getters.getIsStu == false) {
        return "保存修改";
      } else {
        return this.submitLoading == true ? "提交中" : "提交试卷";
      }
    }
  },
  methods: {
    ...mapMutations([
      "init",
      "submitPaperScore",
      "changePaper",
      "deletePaperQuestion",
      "addPaperQuestion"
    ]),
    addAnswer() {
      this.focusQuestion.answer.push("");
      this.focusQuestion.myAnswer.push("");
    },
    removeAnswer(index) {
      this.focusQuestion.answer.splice(index, 1);
      this.focusQuestion.myAnswer.splice(index, 1);
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
          this.deletePaperQuestion({
            questionIndex: index,
            type,
            paperIndex: this.$route.query.index
          });
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
    questionAdd(type, index) {
      console.log("问题增加");
      if(type=="single-choice"){
        this.focusQuestion={
          isNew:true,
          type,
          index,
          question:"",
          answer:"",
          myAnswer:"",
          A:"",
          B:"",
          C:""
        };
      }else if(type == "competition"){
          this.focusQuestion={
            isNew:true,
            type,
            index,
            question:"",
            answer:[""],
            myAnswer:[""]
          }
      }
      this.QEDialogVisible=true;
      
    },
    // 问题编辑后确认
    editConfirm() {
      let focusQuestion = this.focusQuestion;
      let { type, index,isNew} = focusQuestion;
      delete focusQuestion.type;
      delete focusQuestion.index;
      delete focusQuestion.isNew;

      if(isNew){
        // 增加
        this.addPaperQuestion({
            questionIndex: index,
            type,
            paperIndex: this.$route.query.index,
            question:focusQuestion
          });
          this.QEDialogVisible=false;
        return;
      }
      
      if (type == "single-choice") {
        this.paper.singleChoice[index] = focusQuestion;
        //关闭 修改问题模态框
        this.QEDialogVisible = false;
      } else if (type == "competition") {
        this.paper.competition[index] = focusQuestion;
        //关闭 修改问题模态框
        this.QEDialogVisible = false;
      }
      this.focusQuestion={};
      //TODO  发送修改题目的请求
    },
    //试卷编辑后确认
    PEConfirm() {
      let that = this;
      // 将试卷编辑结果发个后台
      that.PEDialogVisible = false;
    },
    // 提交试卷
    submitPaper() {
      let that = this;
      // 老师
      if (!this.$store.getters.getIsStu) {
        this.$confirm("此操作将修改该试卷, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changePaper({
              paper: this.paper,
              paperIndex: this.$route.query.index
            });
            this.$notify({
              title: "成功",
              message: "试卷修改成功!",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify.info({
              title: "消息",
              message: "已经取消修改该试卷！"
            });
          });

        return;
      }

      // 学生
      that.submitLoading = true;
      let paper = that.paper;
      let singleChoice = paper.singleChoice;
      let competition = paper.competition;
      console.log(singleChoice);
      let SCScore = singleChoice.reduce((total, current, index, arr) => {
        return (
          total + (current.answer == current.myAnswer ? paper.scorePerSC : 0)
        );
      }, 0);
      let CScore = competition.reduce((total, current, index, arr) => {
        for (let i = 0; i < current.answer.length; i++) {
          if (current.answer[i] == current.myAnswer[i]) {
            total += paper.scorePerC;
          }
          return total;
        }
      }, 0);
      // 提交分数
      this.submitPaperScore({
        score: CScore + SCScore,
        paperIndex: this.$route.query.index
      });

      // h是用于js创建页面元素的Element中的函数
      const h = that.$createElement;
      //模拟交卷过程
      setTimeout(() => {
        this.$msgbox({
          title: "成绩报告 ：",
          message: h("p", null, [
            h("div", null, "选择题得分：" + SCScore),
            h("div", null, "填空题得分：" + CScore),
            h("div", null, "总得分：" + (SCScore + CScore))

            // h("i", { style: "color: teal" }, "VNode")
          ]),
          showCancelButton: true,
          confirmButtonText: "查看答卷",
          cancelButtonText: "回到主页",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              // 查看试卷
              this.isCheck = true;
              window.scroll(0, 0);
              done();
            } else {
              // 回到主页
              this.$router.push({ name: "user" });
              done();
            }
            that.submitLoading = false;
          }
        }).then(action => {
          // 模态框关闭之后的操作
          // this.$message({
          //   type: "info",
          //   message: "action: " + action
          // });
        });
      }, 500);

      console.log(SCScore);
      console.log(CScore);
    }
  },
  created() {
    if (!this.$store.state.user.name) {
      if (sessionStorage.getItem("ES_User")) {
        this.init("reload");
        this.paper = this.$store.getters.getPaperByIndex(
          this.$route.query.index
        );
        console.log("huifu");
        console.log(this);
      } else {
        console.log("无登陆状态，返回主页");
        //this.$router.push({name: 'home'});
      }
    } else {
      this.paper = this.$store.getters.getPaperByIndex(this.$route.query.index);
    }
    window.scroll(0, 0);

    // 判断是否做过此卷子
    if (this.paper.score != "" && this.$store.getters.getIsStu == true) {
      this.isCheck = true;
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
.c-subtitle-score {
  font-size: 40px;
  color: #009688;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
</style>