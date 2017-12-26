<template lang="html">
  <div class="orderCar">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">订单查询</span>
    </div>
    <div class="contain">
      <el-select  v-model="valueFirst" placeholder="请选择状态" @change="changeStuts">
        <el-option size=small  v-for="(item ,index) in status":label="item.val" :key="item.val" :value="item.val"></el-option>
      </el-select>
      <div class="containFirst">
        <span class="carNumber">车牌号</span>
        <input class="inputSearch" placeholder="车牌号"  v-model="search">
        <i class="inputIcon iconfont icon-fangdajing" @click="searchAll"></i>
      </div>
    </div>
    <div class="carData">
      <ul>
        <li v-for="(data,index) in searchData" @click="gopage(data,index)">
          <span class="carLogo" v-show ="data.icon != 'icon-mini'"><span class="carMark iconfont" :class="[data.icon]"></span></span>
          <span class="carLogo" v-show ="data.icon == 'icon-mini'"><span class="carMark1 iconfont icon-mini"></span></span>
          <div class="carDeatil">
            <p>
              <span>{{data.licenseNo}}</span>
              <span>({{data.seatNum}}座/{{data.displacement}})</span>
            </p>
            <p>{{data.applyDate}}</p>
          </div>
          <span class="tubiao" v-show="data.state=='00'">交易完成</span>
          <span class="tubiao" v-show="data.state=='01'">待人工报价</span>
          <span class="tubiao chengjiao" v-show="data.state=='02'">已报价</span>
          <span class="tubiao" v-show="data.state=='03'">待上传凭条</span>
          <span class="tubiao" v-show="data.state=='04'">收款审核</span>
          <span class="tubiao tuihui" v-show="data.state=='05'">收款审核退回</span>
          <span class="tubiao" v-show="data.state=='06'">等待出单</span>
          <span class="tubiao" v-show="data.state=='07'">出单确认退回</span>
          <span class="tubiao" v-show="data.state=='08'">待配送</span>
          <span class="tubiao" v-show="data.state=='99'">废弃</span>
        </li>
      </ul>
    </div>
    <div class="blockEnd" >
      <ul>
        <li @click="preEnd" :class="{i2:preNext==1}">
          <i class="iconfont icon-xiayiye1"></i>
          <span>上一页</span>
        </li>
        <li><span>第{{pageNo}}/{{pageTotal}}页</span></li>
        <li @click="nextEnd" :class="{i2:preNext==2}">
          <span>下一页</span>
          <i class="iconfont icon-xiayiye"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {reminder,getAxios} from '../domain.js'
import { MessageBox,Toast } from 'mint-ui';
export default {
  data(){
    return{
      preNext:'3',
      show:false,
      selected:'1111',
      search:'',
      pageNo:1,//页码
      pageTotal:5,//总页数
      recTotle:5,//总记录数
      applyList:[],
      searchData:[],
      backList:'',
      dateArry:[],
      valueFirst:'',
      statusValue:'',
      status:[{"idx":'00',"val":"交易完成"},
              {"idx":'01',"val":"待人工报价"},
              {"idx":'02',"val":"已报价"},
              {"idx":'03',"val":"待上传凭条"},
              {"idx":'04',"val":"收款审核"},
              {"idx":'05',"val":"收款审核退回"},
              {"idx":'06',"val":"等待出单"},
              {"idx":'07',"val":"出单确认退回"},
              {"idx":'08',"val":"待配送"},
              {"idx":'99',"val":"废弃"}]
    }
  },
methods: {
  goback(){history.go(-1);},
  preEnd(){
    var that = this;
    this.preNext = 1;
    setTimeout(function(){that.preNext = 3;},30)
    if(this.pageNo>1){
      this.pageNo--;
      this.allCaragain(this.search,this.statusValue,this.pageNo,6)
    }else{
      if(this.pageNo>1){
        this.pageNo--;
        this.allCaragain(this.search,this.statusValue,this.pageNo,6)
      }else{
        if(this.pageTotal==0){
          this.pageNo = 0;
        }else{
          this.pageNo=1
        }
      }
    }
  },
  nextEnd(){
    var that = this;
    this.preNext = 2;
    setTimeout(function(){that.preNext = 3;},30)
    if(this.pageNo<this.pageTotal){
      this.pageNo++;
      this.allCaragain(this.search,this.statusValue,this.pageNo,6)
    }else{
      this.pageNo = this.pageTotal
    }
  },
  gopage(data,index){
    var e;
    if(data.state=='01'||data.state=='02'){history.pushState(null, null, location.href);e = 'ContractProject';
  }else if(data.state=='04'||data.state=='05'||data.state=='03'){e='IndentList';
    }else if( data.state=='00'||data.state=='06'||data.state=='08'||data.state=='99'){e = 'Orderdetail';
    }else if(data.state=='07'){e = 'FillOrder';}
    var url = "/" + e;
    this.$router.push({
      path: url,
      query: {
        'applyId':data.applyId,
        "applyDate":this.dateArry[index],
        "appstate":data.state
      }
    })
  },
  searchDataFirst:function(){
    var search = this.search.toLowerCase();
    if(search){
      return this.applyList.filter(function(product) {
        return Object.keys(product).some(function(key) {
          return String(product[key]).toLowerCase().indexOf(search) > -1;
        })
      })
    }
    return this.applyList;
  },
  changeStuts(val){
    var val = this.status.filter(function(value, index, array) {
      return value.val==val
    });
    this.statusValue=val[0].idx
    this.allCaragain(this.search,this.statusValue,1,6)
  },
  searchAll(){this.allCaragain(this.search,this.statusValue,1,6)},
  allCaragain:function(licenseNo,saleFlag,pageNo,pageSize){
    var that = this;
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    var cuanData = JSON.stringify({
      "licenseNo":licenseNo,
      "state":saleFlag,
      "pageNo" : pageNo,
      "pageSize": pageSize
    })
    getAxios('apply/getList.json',cuanData).then((data) => {
      if(data.code == '0000'){
        that.applyList=[];
        for(var i = 0;i<data.result.applyList.length;i++){
          that.dateArry.push(data.result.applyList[i].applyDate);
          that.applyList.push(data.result.applyList[i]);
          that.applyList[i].icon = "icon-"+that.applyList[i].icon;
          that.applyList[i].applyDate =data.result.applyList[i].applyDate.slice(0,4)+'年'+
                                       data.result.applyList[i].applyDate.slice(4,6)+'月'+
                                       data.result.applyList[i].applyDate.slice(6,8)+'日 '+
                                       data.result.applyList[i].applyDate.slice(8,10)+'时'+
                                       data.result.applyList[i].applyDate.slice(10,12)+'分'
           }
           that.searchData = that.searchDataFirst()
           that.pageNo = data.result.pageNo;//页码
           that.pageTotal = data.result.pageTotal; //总页数
           that.recTotle = data.result.recTotle;  //总记录数
           that.$indicator.close();
          }
      },(err) => {
        that.$indicator.close();
      })
    },
  },
    mounted(){
      this.$indicator.close();
      this.allCaragain('',this.statusValue,1,6);
    }
  }
</script>
<style lang="less">
  .orderCar{
    .el-select{
      width: 115px;
      margin-left: 5px;
      float: left;
      font-size: 12px;
      margin-top: 10px;
    }
    .blockEnd{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      ul{
        overflow: hidden;
        margin-top: 10px;
        border-radius: 5px;
        display: inline-block;
        i{
          color:#fff;
          font-size: 13px;
          vertical-align: top;
        }
        li{
          float: left;
          text-align: center;
          color:#3a64a8;
          background-color:#409eff;
          padding: 0 10px;
          height: 41px;
          border-right: 1px solid #9fceff;
          span{color:#fff;}
        }
        li.i2{background-color: #1d90e6;}
      }
    }
    .contain{
      width: 100%;
      height: 40px;
      background-color: #eee;
      position: relative;
      text-align:center;
      margin-top: 47px;
      .el-input__inner{height: 30px;}
      .el-select{
        width: 35%;
        margin-left: 5px;
        float: left;
        font-size: 14px;
        margin-top: 5px;
        height: 20px;
        }
      .carNumber{
        font-size:14px;
        position: absolute;
        right: 164px;
        top: 13px;
        }
      .inputSearch{
        top: 9px;
        position: absolute;
        background-color: #fff;
        outline: none;
        height: 24px;
        border-radius: 10px;
        width: 146px;
        right: 10px;
        text-indent: 10px;
        }
      .inputIcon{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 15px;
        top: 13px;
        display: inline-block;
        }
      }
      .carData{
        padding: 0 10px;
        position: relative;
        border-top: 1px solid hsl(0, 0%, 86%);
        border-bottom: 1px solid hsl(0, 0%, 86%);
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
              left: 60px;
              top: 7px;
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
        li:last-child{
          border: none;
          margin-bottom: 0;
        }
      }
    }
</style>
