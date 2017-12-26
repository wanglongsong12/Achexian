<template lang="html">
    <div class="policyState">
      <div class="login2">
        <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
        <span class="registerText" v-show = "routeId ==5">政策公告</span>
        <span class="registerText" v-show = "routeId ==7">Q&A</span>
      </div>
      <div class="imgLogo"></div>
    </div>
</template>

<script>
export default{
mounted(){this.routeId = this.$route.query.routeId;},
  data(){
    return{
      routeId:''
    }
  },
  methods:{
    goback(){
      history.go(-1);
    }
  }
}
</script>

<style lang="css">
.imgLogo{
  margin-top: 47px;
  background: url('../../static/image/xiaoma.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
  height: 100px;
}
</style>
