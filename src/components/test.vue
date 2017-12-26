<template lang="html">
  <div class="login">
    <div class="logo"></div>
    <div class="border"></div>
    <div class="cont" >
      <mt-swipe :show-indicators="false" :auto="5000">
        <mt-swipe-item><a href="#"><img src="../../static/image/xiaoma.jpg"></a></mt-swipe-item>
        <mt-swipe-item><a href="#"><img src="../../static/image/xiaoma.jpg"></a></mt-swipe-item>
        <mt-swipe-item><a href="#"><img src="../../static/image/xiaoma.jpg"></a></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="baojia">
      <p @click="inital(1)"></p>
      <p @click="inital(2)"></p>
    </div>
    <p class="line"></p>
    <ul class="main">
      <li class="fl" @click="inital('PersonalCenter')">
        <i class="iconfont icon-gerenzhongxin"></i>
        <span>个人中心</span>
      </li>
      <li class="fl">
        <i class="iconfont icon-dingdanchaxun1" @click="inital('OrderInder')"></i>
        <span>订单查询</span>
      </li>
      <li class="fl" @click="inital(3)">
        <i class="iconfont icon-cheliangzuoye-cheliangweizhang-"></i>
        <span>违章查询</span>
      </li>
      <li class="fl" @click="initalFirst(5)">
        <i class="iconfont icon-zanwutongzhi" style="font-weight:bold;"></i>
        <span>政策公告</span>
      </li>
    </ul>
    <ul class="main ">
      <li class="fl" @click="initalFirst(7)">
        <i class="iconfont icon-QA"></i>
        <span>Q&A</span>
      </li>
      <li class="fl" @click="initalFirst('OperationHelp')">
        <i class="iconfont icon-bangzhu1"></i>
        <span>操作帮助</span>
      </li>
      <li class="fl" @click="initalFirst('AboutUs')">
        <i class="iconfont icon-guanyu" ></i>
       <span >关于我们</span>
      </li>
      <li class="fl" ><span></span></li>
    </ul>
    <p class="line"></p>
    <p class="bottom">
      <span class="icon iconfont icon-fuwutongzhi"></span>
      <span class="descrip">体验团队倾力打造,设计和前端开发的便捷工具...</span>
    </p>
  </div>
</template>

<script>
import imag from './image.vue'
import {reminderOther} from '../domain.js'
export default {
  methods:{
    gopage(e){var url = "/" + e;  this.$router.push({path: url});},
    clearTimeout(){
      var that = this;
      if(that.$store.state.timeout){
        window.onpopstate=function(){
          clearTimeout(that.$store.state.timeout);
        }
      }
    },
    inital(para){
      if(this.$store.state.status == '01'){
        this.$router.push('/Register');
      }else if(this.$store.state.status == '02'||this.$store.state.status == '03'){
        this.$router.push('/Audit');
      }else if(this.$store.state.status == '00'||this.$store.state.status == '08'){
        if(para=='1'||para=='2'||para=='3'){
          this.$router.push({path: '/MyPrice',query: {'routeId':para}});
        }else{
          this.gopage(para);
        }
      }
    },
    initalFirst(para){
      if(para==5||para==7){//政策公告与QA
        this.$router.push({path: '/PolicyState',query: {'routeId':para}});
      }else{
        this.gopage(para);
      }
    },
    test(){
      var tokenUrl='';
      var stateUrl='';
      tokenUrl = this.GetQueryString("token");
      stateUrl = this.GetQueryString("state");
      document.cookie = "token="+tokenUrl+ ";domain=192.168.10.201";
      document.cookie = "state="+stateUrl+ ";domain=192.168.10.201";
      // document.cookie = "token="+tokenUrl+ ";domain=acx.test.achexian.cn";
      // document.cookie = "state="+stateUrl+ ";domain=acx.test.achexian.cn";
      if(!this.$store.state.status){this.$store.state.status=stateUrl;}
    },
    GetQueryString(matchName){
       var name,value;
       var str=location.href; //取得整个地址栏
           str = str.substr(0,str.length-2);
       var num=str.indexOf("?")
           str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
       var arr=str.split("&"); //各个参数放到数组里
       for(var i=0;i < arr.length;i++){
           num=arr[i].indexOf("=");
           if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            if(matchName == name)
              return value;
            }
          }
      return null;
    }
  },
  mounted(){
    this.$indicator.close();
    this.clearTimeout();
    this.test();
  }
}
</script>
<style lang="less" scoped>
  .border{
    width: 100%;
    height: 1px;
    background-color:#d2d2d2;
  }
  .main{
    display: flex;
    margin: 10px 20px 0;
    background-color:#fff;
    li{
      flex:1;
      text-align: center;
      a{
        color:#000;
        opacity: .8;
        font-size: 16px;
        font-weight: lighter;
      }
      i{
        display: inline-block;
        background-color:#fff;
        color:#5d95ea;
        font-size: 35px;
      }
      span{
        padding-top: 10px;
        font-size: 13px;
        display:block;
        color: hsl(163, 9%, 27%);
      }
    }
  }
  .logo{
    width: 100%;
    height: 47px;
    background-image: url('../../static/image/logo.jpg');
    background-repeat: no-repeat;
    background-size: 80px 35px;
    background-position:50% 4px;
  }
  .cont{
    width: 100%;
    position:relative;
    height: 137px;
    img{
      width: 100%;
      height: auto;
      text-align: center;
    }
  }
  .baojia{
    overflow: hidden;
    p{
      margin-top: 5px;
      margin-left: 4%;
      width: 44%;
      height: 80px;
    }
    p:nth-child(1){
      float: left;
      background: url('../../static/image/baojia.jpg');
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
    p:nth-child(2){
      margin-right: 4%;
      float: left;
      display: inline-block;
      background: url('../../static/image/riskcheck.jpg');
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
  }
  .line{
    height: 1px;
    margin: 10px 10px 0 10px;
    background-color:rgb(219,219,219);
  }
  .bottom{
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    .icon{
      display: inline-block;
      font-size: 14px;
      color:#5d95ea;
      font-weight: bold;
    }
    .descrip{
      font-size: 13px;
      color:#656565;
    }
  }
</style>
