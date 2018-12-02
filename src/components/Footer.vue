<template>
  <div class="footer">
    <div class="f-list">
      <div class="f-item" v-for="(item,index) in list" :key="index">
          {{item.name}}
      </div>
    </div>
    <div class="f-company">
        Copyright © 2018 计算机等级考试
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {
      list:[
          {
              name:'关于我们',
              url:''
          },
          {
              name:'客户服务',
              url:''
          },
          {
              name:'服务条款',
              url:''
          },
          {
              name:'意见反馈',
              url:''
          }
      ]
    };
  },
  components: {
   
  }
};
</script>

<style scoped>
.footer{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #c2c2c2;
}
.f-list{
    display: flex;
    justify-content: center;
    padding: 5px 0;
}
.f-item{
    padding: 0 20px;
    
}
.f-item+.f-item{
    border-left: 1px solid #c2c2c2;
}
</style>