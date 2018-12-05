<template>
  <div class="single-choice">
    <div class="s-c-question">{{index+1+" . "+SC.question}}</div>
    <div class="s-c-answer">
      <el-radio-group v-model="SC.answer">
        <el-radio class="radio" label="A">{{SC.A}}</el-radio>
        <el-radio class="radio" label="B">{{SC.B}}</el-radio>
        <el-radio class="radio" label="C">{{SC.C}}</el-radio>
        <el-radio class="radio" label="D">{{SC.D}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "singlechoice",
  data() {
    return {};
  },
  props: {
    index: Number,
    SC: Object
  }
};
</script>

<style scoped>
.single-choice {
    padding: 8px 10px;
    
}
.s-c-answer{
    margin-top: 4px;
    margin-left: 10px;
}
.radio{
    display: block;
    margin-left:0!important;
    padding: 4px 0;
}
</style>