<template lang="html">
  <div class="Orderdetail">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">订单详情</span>
    </div>
    <div class="OrderdetailTop">
      <p class="OrderdetailTopFirst">
        <i></i>
        <span>车辆信息</span>
      </p>
      <div class="OrderdetailMain">
        <ul>
          <li>
            <span class="fl">
              <i class="spanFirst">车牌型号 : </i>
              <i >{{carInfo.vehicleName}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">座位数 : </i>
              <i >{{carInfo.seatNum}}座</i>
            </span>
          </li>
          <li>
            <span class="fl">
              <i class="spanFirst">车主姓名 : </i>
              <i >{{carInfo.carOwnerName}}</i>
            </span>
            <span class="fr">
              <i class="spanFirst">排量 : </i>
              <i >{{carInfo.displacement}}升</i>
            </span>
          </li>
          <li>
            <span class="fl">
              <i class="spanFirst">车牌号码 : </i>
              <i >{{carInfo.licenseNo}}</i>
            </span>
            <span class="fr">
              <i class="spanFirst">发动机号 : </i>
              <i >{{carInfo.engineNo}}</i>
            </span>
          </li>
          <li><span class="spanFirst">车架号 : </span><span>{{carInfo.vin}}</span></li>
          <li><span class="spanFirst">注册日期 : </span><span>{{carInfo.enrollDate}}</span></li>
        </ul>
      </div>
      <p class="OrderdetailTopFirst">
        <i class=""></i>
        <span>保险信息</span>
      </p>
      <div class="OrderdetailMain">
        <ul>
          <li>
            <span class="fl">
              <i class="spanFirst">承保城市 : </i>
              <i >{{insurance.cityName}}</i>
            </span>
            <span class="fr" style="margin-right:10px;">
              <i class="spanFirst">总保费 : </i>
              <i >{{insurance.totalPremium}}元</i>
            </span>
          </li>
          <li>
            <span class="fl">
              <i class="spanFirst">承保公司 : </i>
              <i >{{insurance.companyName}}</i>
            </span>
            <span class="fr">
              <i class="spanFirst">净保费 : </i>
              <i >{{insurance.purePremium}}元</i>
            </span>
          </li>
          <li><span   class="spanFirst">交强险起期 : </span><span>{{insurance.syxInsBeginDate}}</span></li>
          <li><span   class="spanFirst">商业险起期 : </span><span>{{insurance.jqxInsBeginDate}}</span></li>
        </ul>
      </div>
      <p class="OrderdetailTopFirst">
        <i class=""></i>
        <span>订单信息</span>
      </p>
      <div class="OrderdetailMain">
        <ul>
          <li>
            <span>
              <i class="spanFirst">投保人姓名 : </i>
              <i >{{orderInfo.holderName}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">投保人联系电话 : </i>
              <i >{{orderInfo.holderPhone}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">投保人身份证号 : </i>
              <i >{{orderInfo.holderIdCard}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">投保人联系电话 : </i>
              <i >{{orderInfo.holderPhone}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">被保人姓名 : </i>
              <i >{{orderInfo.insuredName}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">投保人身份证号 : </i>
              <i >{{orderInfo.holderIdCard}}</i>
            </span>
          </li>
          <li>
            <span>
              <i class="spanFirst">配送联系人 : </i>
              <i >{{orderInfo.linkManName}}</i>
            </span>
          </li>
            <li>
              <span>
                <i class="spanFirst">配送联系电话 : </i>
                <i >{{orderInfo.linkManPhone}}</i>
              </span>
            </li>
            <li><span   class="spanFirst">订单编号 : </span><span>01234567890123456</span></li>
            <li><span   class="spanFirst">订单状态 : </span><span>待确认报价</span></li>
            <li><span   class="spanFirst">下单时间 : </span><span>2016年10月23日 &nbsp&nbsp 15时16分</span></li>
            <li><span   class="spanFirst">投保人身份证号 : </span><span>{{orderInfo.holderIdCard}}</span></li>
            <li><span   class="spanFirst">被保人身份证号 : </span><span>{{orderInfo.insuredIdCard}}</span></li>
            <li><span   class="spanFirst">电子邮箱 : </span><span>{{orderInfo.email}}</span></li>
            <li><span   class="spanFirst">保单配送地址 : </span><span>{{orderInfo.address}}</span></li>
            <li><span   class="spanFirst">交强险保单号 : </span><span>{{orderInfo.jqxPolicyNo}}</span></li>
            <li><span   class="spanFirst">商业险保单号 : </span><span>{{orderInfo.syxPolicyNo}}</span></li>
            <li><span   class="spanFirst">申请日期 : </span><span>{{orderInfo.applyDate}}</span></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {reminder,getAxios} from '../domain.js'
import { MessageBox,Toast } from 'mint-ui';
export default {
  data(){
    return{
      carInfo:{},
      insurance:{},
      orderInfo:{}
    }
  },
  methods:{
    goback(){history.go(-1);},
    allCaragain:function(){
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
       var cuanData = JSON.stringify({"applyId":that.$route.query.applyId});
       getAxios('order/getInfo.json',cuanData).then((data) => {
         if(data.code == '0000'){
           that.carInfo=data.result.carInfo;
           that.carInfo.enrollDate = data.result.carInfo.enrollDate.slice(0,4)+'年'+
                                     data.result.carInfo.enrollDate.slice(4,6)+'月'+
                                     data.result.carInfo.enrollDate.slice(6,8)+'日';
           that.insurance = data.result.insurance;

           that.insurance.jqxInsBeginDate = data.result.insurance.jqxInsBeginDate.slice(0,4)+'年'+
                                            data.result.insurance.jqxInsBeginDate.slice(4,6)+'月'+
                                            data.result.insurance.jqxInsBeginDate.slice(6,8)+'日 '

           that.insurance.syxInsBeginDate = data.result.insurance.syxInsBeginDate.slice(0,4)+'年'+
                                             data.result.insurance.syxInsBeginDate.slice(4,6)+'月'+
                                             data.result.insurance.syxInsBeginDate.slice(6,8)+'日 '

           that.orderInfo = data.result.orderInfo;
           that.$indicator.close();
          }
        },(err) => {
        //  Toast('请求失败'+err);
         that.$indicator.close();
       })
    },
  },
  mounted(){this.allCaragain()}
}
</script>
<style lang="less" scoped>
.OrderdetailTop{
  padding-top: 7px;
  margin-top: 40px;
  .OrderdetailTopFirst{
    height: 40px;
    line-height:40px;
    font-size: 14px;
    color: #3963a7;
    background-color: #f5f5f5;
    padding-left: 10px;
    i{
      display: inline-block;
      height: 15px;
      line-height: 15px;
      width: 2px;
      background-color: hsl(217, 49%, 44%);
      vertical-align: middle;
      margin-right: 3px;
      margin-bottom: 4px;
    }
  }
  .OrderdetailMain{
    font-size: 16px;
    li{
      height: 40px;
      line-height: 40px;
      padding:0px 10px;
      .spanFirst{color: #888;}
      .spanSecond{color: #58585c;}
    }
  }
}
</style>
