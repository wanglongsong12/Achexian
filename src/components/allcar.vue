<template lang="html">
  <div class="AllCar">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">所有车辆</span>
    </div>
    <div class="contain">
      <el-select  v-model="valueFirst" placeholder="状态" @change="changeStuts">
        <el-option size=small  v-for="(item ,index) in status":label="item.val" :key="item.val" :value="item.val"></el-option>
      </el-select>
      <span class="carNumber">车牌号</span>
      <input class="inputSearch" placeholder="车牌号"  v-model="search">
      <i class="inputIcon iconfont icon-fangdajing" @click="searchAll"></i>
    </div>
    <div class="carData">
      <ul>
        <li v-for="data in searchData" @click="gopage('carDeatil',data.carId)">
          <span class="carLogo"><span class="carMark iconfont" :class="[data.icon]"></span></span>
          <div class="carDeatil">
            <p>{{data.licenseNo}}</p>
            <p>{{data.vehicleName}}</p>
          </div>
          <div class="Ysold"  v-show="data.state=='02'">已出售</div>
          <div class="Nosold" v-show="data.state=='01'">未出售</div>
        </li>
      </ul>
    </div>
    <div class="blockEnd" >
      <ul>
        <li @click="preEnd" :class="{i2:preNext==1}"><i class="iconfont icon-xiayiye1"></i><span>上一页</span></li>
        <li><span>第{{pageNo}}/{{pageTotle}}页</span></li>
        <li @click="nextEnd" :class="{i2:preNext==2}"><span>下一页</span><i class="iconfont icon-xiayiye"></i></li>
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
      status:[{"idx":'',"val":"全部"},
              {"idx":'02',"val":"已出售"},
              {"idx":'01',"val":"未出售"}],
      show:false,
      selected:'1111',
      search:'',
      pageNo:1,//页码
      pageTotle:5,//总页数
      recTotle:5,//总记录数
      carList:[],
      searchData:[],
      statusValue:'',
      valueFirst:''
    }
  },
  methods: {
    goback(){history.go(-1);},
    searchAll(){this.allCaragain(this.search,this.statusValue,1,6)},
    handleCurrentChange(val){this.allCaragain(this.search,'',val,6)},
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
         if(this.pageTotle==0){
           this.pageNo = 0;
         }else{this.pageNo=1;}
       }
     }
   },
   nextEnd(){
     var that = this;
        this.preNext = 2;
        setTimeout(function(){that.preNext = 3;},30)
        if(this.pageNo<this.pageTotle){
           this.pageNo++;
           this.allCaragain(this.search,this.statusValue,this.pageNo,6)
       }else{
           this.pageNo = this.pageTotle
       }
     },
     gopage(e, id) {
        var url = "/" + e;
        this.$router.push({
          path: url,
          query: {'carId':id}
        })
      },
      searchDataFirst:function(){
        var search = this.search.toLowerCase();
        if(search){
          return this.carList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1;
            })
          })
        }
        return this.carList;
      },
      changeStuts(val){
        var val = this.status.filter(function(value, index, array) {
            return value.val==val
        });
        this.statusValue=val[0].idx
        this.allCaragain(this.search,this.statusValue,1,6)
      },
      allCaragain:function(licenseNo,saleFlag,pageNo,pageSize){
        var that = this;
        this.$indicator.open({
           text: '加载中...',
           spinnerType: 'fading-circle'
         });
         var cuanData=JSON.stringify({
           "licenseNo":licenseNo,
           "state":saleFlag,
           "pageNo" : pageNo,
           "pageSize": pageSize
         });
       getAxios('car/getList.json',cuanData).then((data) => {
        if(data.code == '0000'){
          that.carList=[];
          for(var i = 0;i<data.result.carList.length;i++){
            that.carList.push(data.result.carList[i])
            that.carList[i].icon = "icon-"+that.carList[i].icon;
          }
          that.searchData = that.searchDataFirst();
          that.pageNo = data.result.pageNo;//页码
          that.pageTotle = data.result.pageTotle; //总页数
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
    this.allCaragain('',this.statusValue,1,6);}
  }
  </script>
  <style lang="less">
  .AllCar{
    .blockEnd{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      ul{li.i2{background-color: #1d90e6;}
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
      }
    }
    .contain{
    .el-input__inner{height: 30px;}
      width: 100%;
      height: 40px;
      background-color: #eee;
      position: relative;
      text-align:center;
      margin-top: 47px;
      .el-select{
        width: 25%;
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
        top: 8px;
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
        color:#757575;
      }
    }
    .cover{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #ccc;
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
        .carMark{
          font-size: 43px;
          color: hsl(180, 25%, 25%);
        }
      }
      .carDeatil{
        display: inline-block;
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
      .Ysold,.Nosold{
        position:absolute;
        top:14px;
        right:4px;
        padding:4px;
        font-size:13px;
        color:#8dafee;
        border:1px solid #8dafee;
      }
      .Nosold{
        color:#ffce07;
        border:1px solid #ffce07;
      }
    }
    li:last-child{
      border: none;
      margin-bottom: 0;
    }
  }
}
</style>
