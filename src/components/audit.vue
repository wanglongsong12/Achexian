<template lang="html">
  <div class="checkingAudit">
    <div class="login2">
      <div v-if="this.$store.state.status=='02'" class="registerText">审核中</div>
      <div v-if="this.$store.state.status=='00'" class="registerText">审核通过</div>
      <div v-if="this.$store.state.status=='03'" class="registerText">禁用</div>
    </div>
    <div class="linear"></div>
    <ul class="showMessage">
      <li>
        <span class="word"></span>
        <span class="bolder">投保城市</span>
        <span class="lineer"><input type="text" name=""  :disabled="disabled"  value="" v-model="cityName"></span>
      </li>
      <li>
        <span class="word"></span>
        <span class="bolder">交易市场</span>
        <span class="lineer"><input type="text" name="" :disabled="disabled" value="" v-model="marketName"></span>
      </li>
      <li>
        <span class="word"></span>
        <span class="bolder">车商姓名</span>
        <span class="lineer"><input type="text"  name="" :disabled="disabled"  value="" v-model="carDealerName"></span>
      </li>
      <li>
        <span class="word"></span>
        <span class="bolder">商户名称</span>
        <span class="lineer"><input type="text" name="" :disabled="disabled"  value="" v-model="merchantName"></span>
      </li>
      <li>
        <span class="word"></span>
        <span class="bolder">商户地址</span>
        <span class="lineer"><input type="textarea" name="" :disabled="disabled"  value="" v-model="merchantAddr"></span>
      </li>
      <li>
        <span class="word"></span>
        <span class="bolder">联系电话</span>
        <span class="lineer"><input type="text" name="" :disabled="disabled"  v-model="linkPhone" value=""></span>
      </li>
    </ul>
    <i class="icon iconfont icon-shenhe01"  v-if="state=='02'"></i>  <!--  审核中 02-->
    <i class="icon iconfont icon-jinyong" v-if="state=='03'"></i>  <!--禁 &nbsp用  03-->
    <i class="icon iconfont icon-approved iconApproved"v-if="state=='00'"></i>    <!--  00审核通过-->
    <div class="content" v-if="state=='00'"></div>
    <div class="content" v-if="state=='00'"></div>
    <div class="picture" v-for="(item,index) in imgUrls">
      <img class="imgBig"  @click="showPreviewer(index)" :src="item.src">
    </div>
    <div class="content" v-if="state=='00'"></div>
    <div class="content" v-if="state=='00'"></div>
    <p class="remain" v-if="state=='00'">恭喜您,审核已通过</p>
    <p class="remain" v-if="state=='00'">{{time}}秒中跳转...
      <span @click="instantJump">立即跳转 <i class="iconfont icon-xiayiye"></i></span>
    </p>
    <imag :list="imgUrls" ref="previewer" :options="options"></imag>
  </div>
</template>
<script>
import imag from './image.vue'
import { MessageBox,Toast } from 'mint-ui';
import {reminder,getAxios} from '../domain.js'
export default {
  components: {imag},
  watch:{"popImage":"backtrack"},
  data(){
    return{
      disabled:true,//禁用输入框
      time :10,//自动跳转时间
      cityName:'',//城市
      marketName:'',//市场
      merchantName:'',//商户名称
      merchantAddr:'',//商户地址
      carDealerName:'',//车商名称
      linkPhone:'',//联系人电话
      shopImgUrl:'',//门店图片从后台传过来的
      state:'08',//有效标识
      timeout:'',
      PictureImg:'',
      popImage:'',
      imgUrls: [{src:'',w:'',h:''}],
      options:{
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      }
    }
  },
  methods:{
    showDel(){this.$refs.previewer.showDel();},
    instantJump(){this.$router.push('/');clearTimeout(this.timeout)},
    showClose(val){this.$refs.previewer.showClose(val);this.popImage = 1;},
    showPreviewer(index,imgUrls){
       this.$refs.previewer.show(index,imgUrls);
       history.pushState(null, null, location.href);
       this.popImage = 2;
     },
     backtrack(){
       var that = this;
       window.onpopstate=function(){
         if(that.popImage == 1){
             that.show = false;
         }else if( that.popImage == 2){
           that.showClose(1);
         }
       }
     },
     initaleFirst(){
      var that= this;
      that.timeout = setInterval(function(){
        that.time--;
        if(that.time==0){that.$router.push('/')}
      },1000)
      that.$store.commit('modeTimeout',that.timeout);
    },
    initale(){
      var that = this;
      this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
      var cuanData ={};
      getAxios('carDealer/getInfo.json',cuanData).then((data) => {
        if (data.code == '0000'){
          that.cityName       =   data.result.cityName;
          that.marketName     =   data.result.marketName;
          that.merchantName   =   data.result.merchantName;
          that.merchantAddr   =   data.result.merchantAddr;
          that.carDealerName  =   data.result.carDealerName;
          that.linkPhone      =   data.result.linkPhone;
          that.shopImgUrl     =   data.result.shopImgUrl;
          that.state          =   data.result.state;
          that.imgUrls[0].src =   that.shopImgUrl;
          var img = new Image();
          img.src = that.shopImgUrl;
          document.querySelectorAll('.imgBig')[0].onload=function(){
            that.imgUrls[0].w = img.width;
            that.imgUrls[0].h = img.height;
          }
          if(data.result.state=='00'){
            that.initaleFirst();
            that.$indicator.close();
          }
          that.$store.commit('modeify0',data.result.state);
          that.$indicator.close();
         }
       },(err) => {
        that.$indicator.close();
      })
    }
  },
  mounted(){
    this.showDel();
    if(this.$store.state.status=='02'||this.$store.state.status=='03'||this.$store.state.status=='00'){
      this.initale();
    }
  }
}
</script>
<style lang="less">
  .checkingAudit{
    .registerText{text-align: center;}
    .icon.iconApproved{color:#7ed499;}
    margin-bottom: 15px;
    margin-top: 45px;
    background: #fff;
    .icon{
      position: absolute;
      left: 58%;
      top: 5%;
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
      font-size: 107px;
      z-index: 2;
      color: hsl(0, 100%, 50%);
    }
    .showMessage{
      background-color: #fff;
      width: 100%;
      margin-top: 12px;
      li{
        display: block;
        height:40px;
        line-height: 40px;
        color:#272727;
        margin-right: 15px;
        margin-left: 5.33%;
        border-bottom: 1px solid #ececec;
        .word{
          display: inline-block;
          width: 3px;
          height: 15px;
          vertical-align: middle;
          background-color: #439efb;
        }
        .maohao{
          font-size: 16px;
          font-weight: bold;
          vertical-align: middle;
          margin-left: 16px;
        }
        .bolder{
          color: #323232;
          padding-left: 16px;
          font-size: 16px!important;
          vertical-align: middle;
        }
        .lineer{
          color:#5f5f5f;
          padding-left:4%;
          font-size: 14px;
          vertical-align: middle;
          input{
              outline:none;
              width: 120px;
              background: hsl(0, 0%, 100%);
              color: hsl(0, 0%, 0%);
          }
        }
      }
    }
    .picture{
      width: 100%;
      margin: 16px 0;
      text-align: center;
      img{
        display: inline-block;
        width:150px;
        height:88px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
    .remain{
      font-size: 16px;
      margin-top: 20px;
      color:#373737;
      text-align: center;
    }
  }
</style>
