<template lang="html">
  <div class="personalCenter">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">个人中心</span>
    </div>
    <div class="pesonal">
      <p class="tupian"><img src="../../static/image/personCenter.png"></p>
      <div class="main">
        <p class="picture"><img :src="headImgUrl"></p>
        <p class="declareName">{{nickName}}</p>
      </div>
      <table class="profit">
        <tr>
          <td @click="gopageAbc('ProfitList',totalProfit)">
            <span>保险收益 ( 元 ) </span>
            <i class="iconfont icon-xiayiye"></i>
          </td>
          <td class="personDataFirst" >{{totalProfit}}</td>
        </tr>
        <tr>
          <td @click="gopageAbc('PointList',totalPoint)">
            <span>积分 ( 分 ) </span>
            <i class="iconfont icon-xiayiye" ></i>
          </td>
          <td class="personDataSecond">{{totalPoint}}</td>
        </tr>
      </table>
    </div>
    <div class="MyCar">
      <p>
        <span></span>
        <span>我的车辆</span>
      </p>
    </div>
    <div class="carData">
      <ul>
        <li v-for="item in carList" @click="gopageCarId('carDeatil',item.carId)">
          <span class="carLogo" v-show ="item.icon != 'icon-mini'"><span class="carMark iconfont" :class="[item.icon]"></span></span>
          <span class="carLogo" v-show ="item.icon == 'icon-mini'"><span class="carMark1 iconfont icon-mini"></span></span>
            <div class="carDeatil">
              <p>{{item.licenseNo}}</p>
              <p>{{item.vehicleName}}</p>
            </div>
        </li>
      </ul>
    </div>
    <div class="MyCar">
      <p>
        <span></span>
        <span>最新交易</span>
      </p>
    </div>
    <div class="carData carDataFirst">
      <ul>
        <li v-for="item in carListFirst" @click="gopageApplyId(routerTo,applyId,dateArry,state)">
          <span class="carLogo" v-show ="item.icon != 'icon-mini'"><span class="carMark iconfont" :class="[item.icon]"></span></span>
          <span class="carLogo" v-show ="item.icon == 'icon-mini'"><span class="carMark1 iconfont icon-mini"></span></span>
          <div class="carDeatil">
            <p>{{item.licenseNo}}</p>
            <p>{{item.applyDate}}</p>
          </div>
          <span class="tubiao" v-show="item.state=='00'">交易完成</span>
          <span class="tubiao" v-show="item.state=='01'">待人工报价</span>
          <span class="tubiao chengjiao" v-show="item.state=='02'">已报价</span>
          <span class="tubiao" v-show="item.state=='03'">待上传凭条</span>
          <span class="tubiao" v-show="item.state=='04'">收款审核</span>
          <span class="tubiao tuihui" v-show="item.state=='05'">收款审核退回</span>
          <span class="tubiao" v-show="item.state=='06'">等待出单</span>
          <span class="tubiao" v-show="item.state=='07'">出单确认退回</span>
          <span class="tubiao" v-show="item.state=='08'">待配送</span>
          <span class="tubiao" v-show="item.state=='99'">废弃</span>
        </li>
      </ul>
    </div>
    <router-link to="/AllCar">
      <div class="endRegister">
        <button class="register" style="width:37%" type="button" name="button">更多车辆 </button>
      </div>
    </router-link>
  </div>
</template>
<script>
import {Loading} from 'element-ui';
import {reminder,getAxios} from '../domain.js'
import { MessageBox,Toast } from 'mint-ui';
export default {
  data(){
    return{
      port:'',
      state:'',
      applyId:'',
      dateArry:'',
      show:false,
      routerTo:'',
      nickName:'',
      headImgUrl:'',
      totalProfit:'',
      totalPoint:'',
      carList:[],
      carListFirst:[]
    }
  },
  watch:{port:"checkPort"},
  methods:{
  goback(){history.go(-1);},
  checkPort(){if(this.port>2||this.port==2){this.$indicator.close()}},
  gopageAbc(e,id){
    var url = "/" + e;
    this.$router.push({
      path: url,
      query: {'totalProfit':id}
    })
  },
  gopageCarId(e,id){
    var url = "/" + e;
    this.$router.push({
      path: url,
      query: {'carId':id}
    })
  },
  gopageApplyId(e,id,dateArry,state){
    history.pushState(null, null, location.href);
    var url = "/" + e;
    this.$router.push({
      path: url,
      query: {
        'applyId':id,
        "applyDate":dateArry,
        "appstate":state
      }
    })
  },
  personalCenter:function(){
    var that = this;
    this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
     var cuanData ={}
     getAxios('carDealer/getInfo.json',cuanData).then((data) => {
       if (data.code == '0000'){
        that.nickName = data.result.nickName;
        that.totalProfit =data.result.totalProfit;
        that.totalPoint =data.result.totalPoint;
          if(data.result.headImgUrl){
            that.headImgUrl =data.result.headImgUrl;
          }else{
            that.headImgUrl = '../../static/image/headImgUrl.png'
          }
          that.port++;
         }
       },(err) => {
        that.$indicator.close();
      })
    },
    applyGetList(){
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
       var cuanData = JSON.stringify({
         "pageNo":'1',
         "pageSize":'1'
       });
        getAxios('apply/getList.json',cuanData).then((data) => {
          if (data.code == '0000'){
            for(var i = 0;i<data.result.applyList.length;i++){
              that.carListFirst.push(data.result.applyList[i]);
              that.state= data.result.applyList[i].state;
              that.dateArry = data.result.applyList[i].applyDate;
              that.applyId = data.result.applyList[i].applyId;
              that.carListFirst[i].icon = "icon-"+that.carListFirst[i].icon;
              that.carListFirst[i].applyDate =data.result.applyList[i].applyDate.slice(0,4)+'年'+
                                              data.result.applyList[i].applyDate.slice(4,6)+'月'+
                                              data.result.applyList[i].applyDate.slice(6,8)+'日 '+
                                              data.result.applyList[i].applyDate.slice(8,10)+'时'+
                                              data.result.applyList[i].applyDate.slice(10,12)+'分'
              }
              if(that.state=='00'){
                  that.routerTo = '';
              }else if(that.state=='01'){
                that.routerTo = 'ContractProject';
              }else if(that.state=='02'){
                that.routerTo = 'ContractProject';
              }else if(that.state=='03'){
                that.routerTo = '';
              }else if(that.state=='04'){
                that.routerTo = '';
              }else if(that.state=='05'){
                that.routerTo = '';
              }else if(that.state=='06'){
                that.routerTo = '';
              }else if(that.state=='07'){
                that.routerTo = '';
              }else if(that.state=='08'){
                that.routerTo = '';
              }else if(that.state=='99'){
                that.routerTo = '';
              }
              that.port++;
          }
          },(err) => {
          that.$indicator.close();
          })
    },
  Mycar:function(){
    var vm = this;
    vm.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
     var cuanData = JSON.stringify({"pageNo" : 1,"pageSize": 3});
     getAxios('car/getList.json',cuanData).then((data) => {
     if(data.code == '0000'){
       for(var i = 0;i<data.result.carList.length;i++){
         vm.carList.push(data.result.carList[i]);
         vm.carList[i].icon = "icon-"+vm.carList[i].icon;
       }
        vm.port++;
        }
      },(err) => {that.$indicator.close();})
    }
  },
  mounted(){
    this.$indicator.close();
    this.personalCenter();
    this.Mycar();
    this.applyGetList();
  }
}
</script>
<style lang="less">
.personalCenter{
  .mint-button{
    margin-left:50%;
    transform:translateX(-75px);
    margin-top:20px;
    width:150px;
    border-radius:10px;
  }
  .pesonal{
    position: relative;
    margin-top: 47px;
    .tupian{
      img{
        display: inline-block;
        width: 100%;
      }
    }
    .main{
      top: 7%;
      left: 20px;
      padding-top:16px;
      position: absolute;
      .picture{
        width: 60px;
        height: 60px;
        border-radius:30px;
        border: 1px solid #ccc;
        img{
          width: 62px;
          height: 62px;
          border-radius: 30px;
        }
      }
    .declareName{
        width: 97px;
        position: absolute;
        left: 89px;
        top: 26px;
        font-size: 16px;
        color:#fff;
      }
    }
  .profit{
    display: flex;
    height: 70px;
    margin-top: -72px;
    tr{
      flex:1;
      justify-content: center;
      margin-right: 10px;
      td{
        display: block;
        font-size: 18px;
        text-align: center;
        span{
          font-size: 14px;
          margin: 10px 0;
          display: inline-block;
          color:#ecebfb;
          }
          span~i{color:#fff;}
        }
        .personDataFirst,.personDataSecond{color: #fbfbfb;}
        .personDataFirst{margin-left: -61px;}
        .personDataSecond{margin-left: -22px;}
      }
    }
  }
  .MyCar{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
    p>span:nth-child(1){
      display: inline-block;
      height: 17px;
      width: 2px;
      background-color: #538fe0;
      vertical-align: sub;
      margin-right: 5px;
    }
    p>span:nth-child(2){
      font-size: 16px;
      color: #363636;
      font-weight: bold;
    }
  }
  .carData{
    margin-left: 10px;
    position: relative;
    li{
      border-bottom: 1px solid #dbdbdb;
      position: relative;
      .carLogo{
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        display: inline-block;
        .carMark{font-size: 43px;}
        .carMark1{font-size: 24px;}
      }
      .carDeatil{
        position: absolute;
        top: 7px;
        left: 60px;
        p:nth-child(1){
          font-size: 15px;
          color: #4f5255;
          font-weight: 650;
          margin-bottom: 10px;
          margin-top: 5px;
        }
        p:nth-child(2){
          font-size: 12px;
          color: #d2d2d2;
        }
      }
      .tubiao{
        position: absolute;
        right: 10px;
        top: 14px;
        padding: 4px;
        font-size: 13px;
        color: hsl(219, 74%, 74%);
        border: 1px solid hsl(219, 74%, 74%);
      }
      .tubiao.tuihui{
        color:  #ffd007;
        border: 1px solid  #ffd007;
      }
      .tubiao.chengjiao{
        color:   #3dc395;
        border: 1px solid   #3dc395;
      }
    }
    li:last-child{border: none;}
  }
  .carDataFirst{
    border-bottom: 1px solid #dbdbdb;
    margin-left: 0;
    padding-left: 10px;
  }
  .endRegister{
    margin-top: 10px;
    text-align:center;
  }
}
</style>
