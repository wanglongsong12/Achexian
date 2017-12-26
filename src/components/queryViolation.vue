<template lang="html">
  <div class="getCreditInfo">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">违章记录详情</span>
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
            <span>违章次数</span>
            <br>
            <span>{{totleRecord}}次</span>
          </li>
          <li>
            <span>违章扣分</span>
            <br>
            <span>{{totleScore}}分</span>
          </li>
          <li>
            <span>违章金额</span>
            <br>
            <span>{{totleMoney}}元</span>
          </li>
        </ul>
      </div>
      <div class="creditData" v-for="item in violationList">
        <table>
          <tr>
            <td>违章时间</td>
            <td class="fl"><div>{{item.date}}</div></td>
          </tr>
          <tr>
            <td>违章地点</td>
            <td class="fl"><div>{{item.address}}</div></td>
          </tr>
          <tr>
            <td>违章描述</td>
            <td class="fl"><div>{{item.describ}}</div></td>
          </tr>
          <tr>
            <td>违章扣分</td>
            <td class="fl"><div>{{item.score}}分</div></td>
          </tr>
          <tr>
            <td>违章金额</td>
            <td class="fl"><div>{{item.money}}元</div></td>
          </tr>
          <tr>
            <td>违章处理</td>
            <td class="fl" v-if="item.dealFlag==0"><div>未处理</div></td>
            <td class="fl" v-if="item.dealFlag==1"><div>已处理</div></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate,getAxios} from '../domain.js'
import {Toast,MessageBox } from 'mint-ui';
export default {
  data(){
    return{
      carId:'',
      violationList:[],
      totleScore:'',    //违章扣分总计
      totleRecord	:'', 	//违章次数总计
      totleMoney:'',//违章罚款金额总计
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
       var cuanData =JSON.stringify({"carId":that.carId});
       getAxios('car/getViolationList.json',cuanData).then((data) => {
         if (data.code == '0000'){
           that.totleScore = data.result.totleScore;
           that.totleRecord = data.result.totleRecord;
           that.totleMoney = data.result.totleMoney;
           that.licenseNo = data.result.licenseNo;
           that.modelName = data.result.modelName;
           if(data.result.violationList){
             for(var i = 0;i<data.result.violationList.length;i++){
                   that.violationList.push(data.result.violationList[i])
             }
             for(var i = 0;i<that.violationList.length;i++){
               that.violationList[i].date = that.formatDate(that.violationList[i].date);
             }
           }else{
             that.violationList=[];
           }
           that.$indicator.close();
        }else if(data.code == '0003'){
          reminderOther(data.message);
          that.$indicator.close();
          }
      },(err) => {
        // Toast('请求失败'+err);
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
    margin-top: 40px;
    padding-top:10px;
    width: 100%;
    position: relative;
    img{
      width: 100%;
      height: 160px;
    }
    .ulFirst{
      position: absolute;
      left: 5%;
      top: 22%;
      width: 90%;
      border-bottom: 1px solid #fff;
      display: flex;
      li{color: #fff;flex:1;
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
        span:nth-of-type(1){color:#d9e1ee;}
        span:nth-of-type(2){
          display: inline-block;
          margin-top: 10px;
          color:#feffff;
        }
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
      margin-bottom: 10px;
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
}
</style>
