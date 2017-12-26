<template lang="html">
  <div class="getCreditInfo">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">出险记录详情</span>
    </div>
    <div>
      <div class="checkDetail">
        <img src="../../static/image/personCenter.png" alt="">
        <ul class="ulFirst">
          <li><span>{{licenseNo}}</span></li>
          <li><span>{{modelName}}</span></li>
        </ul>
        <ul class="ulSecond">
          <li>
            <span>出险次数</span>
            <br>
            <span>{{totleRecord}}次</span>
          </li>
          <li></li>
          <li>
            <span>总金额</span>
            <br>
            <span>{{totleMoney}}元</span>
          </li>
        </ul>
      </div>
      <div class="creditData" v-for="item in creditList">
        <table>
          <tr>
            <td>出险时间</td>
            <td class="fl"><div>{{item.LossTime}}</div></td>
          </tr>
          <tr>
            <td>理赔金额</td>
            <td class="fl"><div>{{item.PayAmount}}元</div></td>
          </tr>
          <tr>
            <td>保险公司</td>
            <td class="fl"><div>{{item.PayCompanyName}}</div></td>
          </tr>
          <tr>
            <td>结案时间</td>
            <td class="fl"><div>{{item.EndcaseTime}}</div></td>
          </tr>
        </table>
      </div>
      <div v-show="totleMoney" class="text">
        <p>最近的保单的保险期间的出险记录,结果仅供参考</p>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate,getAxios,reminderOther} from '../domain.js'
import {Toast,MessageBox } from 'mint-ui';
export default {
  data(){
    return{
      carId:'',
      totleRecord:'',     //出险次数
      totleMoney:'',      //总金额
      creditList:[],     //出险信息列表
      licenseNo:'',
      modelName:'',
      popImage:''
    }
  },
  watch:{"popImage":"backtrack"},
  destroyed(){this.popImage= ''},
  methods:{
    goback(){history.go(-2);this.popImage = ''},
    formatDate(Datea){return formatDate(Datea)},
    backtrack(){
      var that = this;
      window.onpopstate=function(){
        if(that.popImage == 1){
          history.go(-1);
        }
      }
    },
    Violation(){
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
       var cuanData = JSON.stringify({"carId":that.carId});
 			getAxios('car/getCreditList.json',cuanData).then((data) => {
         if(data.code == '0000'){
           that.totleMoney=data.result.totleMoney;
           that.totleRecord=data.result.totleRecord;
           that.licenseNo=data.result.licenseNo;
           that.modelName=data.result.modelName;
           for(var i=0;i<data.result.creditList.length;i++){
             that.creditList.push(data.result.creditList[i]);
           }
           for(var i = 0;i<that.creditList.length;i++){
             that.creditList[i].LossTime = that.creditList[i].LossTime;
             that.creditList[i].EndcaseTime = that.creditList[i].EndcaseTime;
           }
             that.$indicator.close();
          }else if(data.code == '0003'){
            reminderOther(data.message);
            that.$indicator.close();
          }
        },(err) => {
          //  Toast('请求失败'+err);
           that.$indicator.close();
         })
      }
    },
    mounted(){
      this.popImage = 1;
      this.$indicator.close();
      this.carId = this.$route.query.carId;
      this.Violation();
    }
  }
</script>
<style lang="less" scoped>
.getCreditInfo{
  background-color: #f5f5f5;
  font-size: 16px;
  .checkDetail{
    padding-top:10px;
    margin-top: 40px;
    width: 100%;
    position: relative;
    img{
      width: 100%;
      height: 140px;
    }
    .ulFirst{
      position: absolute;
      left: 5%;
      top: 25%;
      width: 90%;
      border-bottom: 1px solid #fff;
      display: flex;
      li{
        color: #fff;flex:1;
        padding-bottom: 10px;
        text-align: center;
      }
    }
    .ulSecond{
      position: absolute;
      left: 0;
      top: 60%;
      transform: translateY(-22px);
      width: 100%;
      display: flex;
      li{
        color: #fff;
        flex:1;
        text-align: center;
        span:nth-child(1){display:block;}
        }
        li:nth-child(2){
          flex: inherit;
          width: 2px;
          height: 45px;
          line-height: 45px;
          background-color: #fff;
        }
      }
    }
  .creditData{
    width: 90%;
    margin-left: 5%;
    background: #fff;
    table{
      margin-left:10px;
      margin-top: 16px;
      width: 94%;
      tr{
        height: 45px;
        border-bottom: 1px dashed #d2d2d2;
        td{word-wrap:break-word;}
        td:nth-of-type(1){
          word-break: keep-all;
          color:#363636;
          vertical-align: middle;
        }
        td:nth-of-type(2){
          margin-left: 30px;
          color:#878787;
          div{
            margin: 12px 0;
            line-height: 25px;
          }
        }
      }
    }
  }
  .text{
    font-family: "Helvetica";
    text-align: center;
    font-size: 12px;
    padding: 10px 0;
  }
}
</style>
