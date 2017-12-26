<template lang="html">
  <div class="Orderdetail">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">收益详情</span>
    </div>
    <div>
      <div class="checkDetail">
        <img src="../../static/image/personCenter.png" alt="">
          <ul>
            <li>
              <span>保险收益</span>
              <br>
              <span>{{totalProfit}}元</span>
            </li>
          </ul>
      </div>
      <div class="creditData" v-for="item in ProfitList">
        <table >
          <tr>
              <td>总保费</td>
              <td class="fl">
                <div>{{ProfitList.totlePremium}}元</div>
            </td>
          </tr>
          <tr>
            <td>车牌号</td>
            <td class="fl">
              <div>{{ProfitList.licenseNo}}</div>
            </td>
          </tr>
          <tr>
            <td>收益</td>
            <td class="fl">
              <div>{{ProfitList.profit}}</div>
            </td>
          </tr>
          <tr>
            <td>车商净保费</td>
            <td class="fl">
              <div>{{ProfitList.carDealerPremium}}</div>
            </td>
          </tr>
          <tr>
            <td>实收保费</td>
            <td class="fl">
              <div>{{ProfitList.realPremium}}</div>
            </td>
          </tr>
          <tr>
            <td>操作时间</td>
            <td class="fl">
              <div>{{ProfitList.operateDate}}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate,reminder,getAxios} from '../domain.js'
import { MessageBox,Toast } from 'mint-ui';
export default {
  data(){
    return{
        ProfitList:[],
        totalProfit:''
    }
  },
  methods:{
    goback(){history.go(-1);},
    formatDate(Datea){return formatDate(Datea)},
    allCaragain:function(){
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
       var cuanData = "";
		   getAxios('carDealer/getProfitList.json',cuanData).then((data) => {
        if (data.code == '0000'){
          for(var i = 0;i<data.result.length;i++){
              that.ProfitList.push(data.result[i]);
              that.ProfitList[i].operateDate = that.formatDate(that.ProfitList[i].operateDate);
          }
          that.$indicator.close();
         }
       },(err) => {
        // Toast('请求失败'+err);
        that.$indicator.close();
      })
    }
  },
  mounted(){
    this.allCaragain();
    this.totalProfit = this.$route.query.totalProfit;
  }
}
</script>
<style lang="less" scoped>
.Orderdetail{
    background-color: #f5f5f5;
    font-size: 16px;
    .checkDetail{
      margin-top: 47px;
      width: 100%;
      position: relative;
      img{
        width: 100%;
        height: 120px;
      }
      ul{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-22px);
        width: 100%;
        display: flex;
        li{
          color: #fff;
          flex:1;
          text-align: center;
          span:nth-of-type(1){
            color:#d9e1ee;
          }
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
