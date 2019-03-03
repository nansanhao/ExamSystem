<template>
  <div :class=" [{editable:!isStu},'c-competition']">
    <div class="c-question">{{index+1+' . '+competition.question}}</div>
    <div class="c-answer">
      <div class="c-a-item" v-for="(item,answerIndex) in competition.answer" :key="answerIndex">
        <div class="c-a-index">{{'（'+(answerIndex+1)+'）'}}</div>
        <span class="c-a-input">
          <input type="text" v-model="myAnswer[answerIndex]" @input="handleInput">
        </span>
        <span :class="[myAnswer[answerIndex]==item?'correct':'wrong']" v-if="isCheck">
          {{"正确答案："+competition.answer[answerIndex]}}
        </span>
      </div>
    </div>
    <div class="s-c-action" v-if="!isStu">
      <el-button type="primary" icon="el-icon-edit" v-on:click="$emit('question-edit')" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" v-on:click="$emit('question-delete')" circle></el-button>
      <el-button type="info" icon="el-icon-plus" v-on:click="$emit('question-add')" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "competition",
  data() {
    return {
      
    };
  },
  props: {
    competition: Object,
    index: Number,
    isStu: Boolean,
    myAnswer: Array,
    isCheck:Boolean
  },
  methods: {
    handleInput(event) {
        console.log(this.myAnswer)
        console.log(event.data)
        
    //   let value = event;
      this.$emit("update:myAnswer", this.myAnswer);
    }
  }
};
</script>

<style scoped>
.correct{
  color: #009688;
}
.wrong{
  color: red;
}
.c-competition {
  padding: 8px 10px;
}
.c-a-item {
  padding: 4px 10px;
  display: flex;
  align-items: center;
}
.c-a-index {
  display: inline-block;
}
.c-a-input {
  display: inline-block;
  width: 200px;
  margin: 4px 40px 4px 0;
}
input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #409EFF;

  padding: 4px;
}
input:focus {
  outline: none;
}
/* 控制能否编辑 */
.editable {
  border: 4px solid white;
  padding: 10px;
}
.editable:hover {
  border: 4px solid #42b983;
  border-radius: 8px;
}
.s-c-action {
  display: none;
}
.editable:hover .s-c-action {
  display: block;
}
</style>