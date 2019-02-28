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
              :competition="item"
              :index="index"
              :isStu="false"
              :myAnswer.sync="item.myAnswer"
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
          <el-form-item label="答案">
            <el-input v-model="focusQuestion.myAnswer"></el-input>
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
            </div> -->
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
      <el-form :model="paper" label-width="90px">
        <el-form-item label="试卷名称" >
          <el-input v-model="paper.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试卷难度" >
          <el-input-number v-model="paper.level" @change="handleChange" :min="1" :max="5" label="难度"></el-input-number>
        </el-form-item>
        <el-form-item label="试卷总分" >
          <el-input v-model="paper.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试时间" >
          <el-input v-model="paper.timeLimit" autocomplete="off"><template slot="append">分</template></el-input>
        </el-form-item>
        <el-form-item label="选择题分值" >
          <el-input v-model="paper.scorePerSC" autocomplete="off"><template slot="append">分每题</template></el-input>
        </el-form-item>
        <el-form-item label="填空题分值" >
          <el-input v-model="paper.scorePerC" autocomplete="off"><template slot="append">分每空</template></el-input>
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
        
      },
      paper: {
        id: "0",
        name: "软件工程开发考试",

        level: "3",
        total: "100",
        score: "85",
        date: "2018-07-25",
        timeConsuming: "35",
        timeLimit: "60",
        scorePerSC:5,
        scorePerC:2,
        singleChoice: [
          {
            id: "0",
            question:
              "在软件开发过程中，我们可以采用不同的过程模型，下列有关 增量模型描述正确的是（ ）",
            A: "是一种线性开发模型，具有不可回溯性",
            B: "把待开发的软件系统模块化，将每个模块作为一个增量组件，从而分批次地分析、设计、编码和测试这些增量组件",
            C: "适用于已有产品或产品原型（样品），只需客户化的工程项目",
            D: "软件开发过程每迭代一次，软件开发又前进一个层次",
            answer: "",
            myAnswer:""
          },
          {
            id: "1",
            question: "下面有关值类型和引用类型描述正确的是？（ ）",
            A: "值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。",
            B: "值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上。",
            C: "引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。",
            D: "值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。",
            answer: "",
            myAnswer:""
          },
          {
            id: "2",
            question: "如何在多线程中避免发生死锁？（ ）",
            A: "允许进程同时访问某些资源。",
            B: "允许进程强行从占有者那里夺取某些资源。",
            C: "进程在运行前一次性地向系统申请它所需要的全部资源。",
            D: "把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。",
            answer: "",
            myAnswer:""
          },
          {
            id: "3",
            question: "以下为求0到1000以内所有奇数和的算法，从中选出描述正确的算法。（ ）",
            A: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
            B: "①s=0；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
            C: "①s=1；②i=1；③s=s+i；④i=i+2；⑤如果i≤1000，则返回③；⑥结束",
            D: "①s=1；②i=1；③i=i+2；④s=s+i；⑤如果i≤1000，则返回③；⑥结束",
            answer: "",
            myAnswer:""
          },
          {
            id: "4",
            question: "关于递归法的说法不正确的是（ ）",
            A: "程序结构更简洁",
            B: "占用CPU的处理时间更多",
            C: "要消耗大量的内存空间，程序执行慢，甚至无法执行",
            D: "递归法比递推法的执行效率更高",
            answer: "",
            myAnswer:""
          },
          {
            id: "5",
            question: "下面是一段关于计算变量s的算法： ①变量s的初值是0 ②变量i从1起循环到n，此时变量s的值由下面的式子表达式计算 ③s=s+(-1)*i ④输出变量s的值 这个计算s值的算法中，s的代数式表示是（ ）",
            A: "1-2+3-4+„+(-1)n*(n-1)",
            B: "1-2+3-4+„+(-1)n-1*n",
            C: "1+2+3+4+...+(n-1)+n",
            D: "-1-2-3-4-...-n",
            answer: "",
            myAnswer:""
          }

        ],
        competition: [
          {
            question:
              "计算机网络由负责信息处理的资源子网和负贵信息传递的_______组成。",
            answer: ["接收方窗口"],
            myAnswer:[" "]
          },
          {
            question:
              "计算机网络的功能主要表现在硬件、软件资源的共享以及用户间______ 三个方面。",
            answer: ["接收方窗口"],
            myAnswer:[" "]
          },
          {
            question:
              ".按照网络采用的传输技术可将计算机网络分为广播式网络和_________网络，还有_________等事情，软件资源的共享以及用户间______ 三个方面。",
            answer: ["接收方窗口","sad", "ASD"],
            myAnswer:[" "," "," "]
          },
          {
            question:
              ".网络体系结构是计算机网络各层次结构模型及其_____的集合。",
            answer: ["接收方窗口"],
            myAnswer:[" "]
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