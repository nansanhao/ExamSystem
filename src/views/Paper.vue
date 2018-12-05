<template>
  <div class="paper">
    <Navbar/>
    <Content>
      <template slot="left"></template>
      <template slot="content">
        <h2>{{paper.name}}</h2>
        <div class="single-choice">
          <h3>一. 选择题</h3>
          <div v-for="(item,index) in paper.singleChoice" :key="index">
            <SingleChoice :SC='item' :index="index"></SingleChoice>
          </div>
        </div>
        <div class="competition">
          <h3>二. 填空题</h3>
          <div v-for="(item,index) in paper.competition" :key="index">
            <Competition :competition="item" :index="index"></Competition>
          </div>
        </div>
      </template>
      <template slot="right"></template>
    </Content>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import SingleChoice from '../components/SingleChoice';
import Competition from '../components/Competition';

export default {
  name: "paper",
  data() {
    return {
      answer:{
        singleChoice:[],
        competition:[]
      },
      paper: {
        id: "0",
        name: "计算机二级网络考试",
        singleChoice: [
          {
            id: "",
            question:
              "请编写一C语言程序请编写一C语言程序请编写一C语言程序请编写一C语言程序，该程序的功能是通过键盘输入一个整数n，然后调用一个递归函数fun(int n)计算1+2+3+...+n,最后输出计算结果。",
            A: "public A",
            B: "private A",
            C: "protected A",
            D: "virtual public A",
            answer:""
          },
          {
            id: "",
            question:
              "请编写一C语言程序，该程序的功能是通过键盘输入一个整数n，然后调用一个递归函数fun(int n)计算1+2+3+...+n,最后输出计算结果。",
            A: "public A",
            B: "private A",
            C: "protected A",
            D: "virtual public A",
            answer:""
          },
          {
            id: "",
            question:
              "请编写一C语言程序，该程序的功能是通过键盘输入一个整数n，然后调用一个递归函数fun(int n)计算1+2+3+...+n,最后输出计算结果。",
            A: "public A",
            B: "private A",
            C: "protected A",
            D: "virtual public A",
            answer:""
          }
        ],
        competition: [
          {
            question: "TCP在进行流量控制和拥塞控制时，发送端的发送窗口上限值应取____和_____中较小的一个。",
            answer: ["接收方窗口","拥塞窗口"]
          },
          {
            question: "TCP在进行流量控制和拥塞控制时，发送端的发送窗口上限值应取____和_____中较小的一个。",
            answer: ["接收方窗口","拥塞窗口"]
          },
          {
            question: "TCP在进行流量控制和拥塞控制时，发送端的发送窗口上限值应取____和_____中较小的一个。",
            answer: ["接收方窗口","拥塞窗口"]
          }
        ]
      }
    };
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
.single-choice{
  padding: 0 10px;
}
</style>