<template>
  <div :class="[{editable:!isStu},'c-single-choice']">
    <div class="s-c-wrap">
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
    <div class="s-c-action" v-if="!isStu">
      <el-button type="primary" icon="el-icon-edit" v-on:click="$emit('question-edit')" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" v-on:click="$emit('question-delete')" circle></el-button>
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
    isStu:Boolean,
    index: Number,
    SC: Object
  }
};
</script>

<style scoped>
.c-single-choice {
  padding: 8px 10px;
}
.s-c-wrap {
  flex: 1;
}
.s-c-answer {
  margin-top: 4px;
  margin-left: 10px;
}
.radio {
  display: block;
  margin-left: 0 !important;
  padding: 4px 0;
}
.editable{
  border: 4px solid white;
  
}
.editable:hover {
  border: 4px solid #42b983;
  border-radius: 8px;
}
.s-c-action{
  display: none;
}
.editable:hover .s-c-action{
  display: block
}
</style>