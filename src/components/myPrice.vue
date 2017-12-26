<template lang="html">
  <div class="MyPrice">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">
        <span v-show="routeId =='1'">我的报价</span>
        <span v-show="routeId =='2'">查询出险记录</span>
        <span v-show="routeId =='3'">查询违章记录</span>
      </span>
    </div>
    <div class="linear"></div>
    <div class="Mcover" v-show="show">
      <div class="option">
        <span class="confirm">车辆确认</span>
        <div class="images" v-for="(item,index) in imgUrls">
          <img class="imgBig" @click="showPreviewer(index,imgUrls,vin,engineNo,licenseNo,vehicleName,enrollDate)" :src="item.src" alt="">
        </div>
      <p class="remain">识别结果不一定精准，请核实信息</p>
      <table>
        <tr>
          <td class="boldFirst">车牌号码</td>
          <td class="boldSecond">
            <input type="text" v-model="licenseNo" style="text-transform:uppercase;">
          </td>
        </tr>
        <tr>
          <td class="boldFirst">车主姓名</td>
          <td class="boldSecond">
            <input type="text"  v-model="carInfo.carOwnerName">
          </td>
        </tr>
        <tr>
          <td class="boldFirst">发动机号</td>
          <td class="boldSecond">
            <input type="text" v-model="engineNo"
            style="text-transform:uppercase;">
          </td>
        </tr>
        <tr>
          <td class="boldFirst">车架号码</td>
          <td class="boldSecond">
            <input type="text" v-model="vin "
            style="text-transform:uppercase;">
          </td>
        </tr>
        <tr>
          <td class="boldFirst">品牌型号</td>
          <td class="boldSecond">
            <input type="text" v-model="vehicleName"
            style="text-transform:uppercase;">
          </td>
        </tr>
        <tr>
          <td class="boldFirst">注册日期</td>
          <td class="boldSecond">
            <yd-datetime  type="date" start-date="2000-01-01" v-model="enrollDate"
            slot="right"></yd-datetime>
          </td>
        </tr>
      </table>
      <div style="text-align:center;">
        <button class="register" type="button" style="margin-bottom:0;" @click="submits">
          <span v-show="routeId=='1'">查询报价</span>
          <span v-show="routeId=='2'">查询出险记录</span>
          <span v-show="routeId=='3'">查询违章记录</span>
        </button>
      </div>
      <i class="close iconfont icon-guanbi" @click='clear'></i>
    </div>
  </div>
  <div>
    <div class="list-img">
       <div class="list-default-img" @click="addPic">
          <i class="iconfont icon-shangchuanhangshizheng"></i>
          <p>上传行驶证</p>
          <input id="inputImage" type="file" accept="image/*" @change="onFileChange"  style="display: none;">
      </div>
    </div>
    <div class="digPicture"  v-show="isPreview"></div>
    <div class="imgCarData">
      <span>车牌号</span>
      <el-input placeholder="请选择车牌号"icon="search" v-model="search" @click="allCaragain(search,'',1,3)">
      </el-input>
    </div>
    <div class="content"></div>
    <div class="carData">
      <ul>
        <li v-for="data in searchData" @click="Mycar(data.carId)">
          <span class="carLogo" v-show ="data.icon != 'icon-mini'"><span class="carMark iconfont" :class="[data.icon]"></span></span>
          <span class="carLogo" v-show ="data.icon == 'icon-mini'"><span class="carMark1 iconfont icon-mini"></span></span>
          <div class="carDeatil">
            <p>{{data.licenseNo}}</p>
            <p>{{data.vehicleName}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="blockEnd">
      <ul>
        <li @click="preEnd" :class="{i2:preNext==1}">
          <i class="iconfont icon-xiayiye1"></i>
          <span>上一页</span>
        </li>
        <li>
          <span>第{{pageNo}}/{{pageTotle}}页</span>
        </li>
        <li @click="nextEnd" :class="{i2:preNext==2}">
          <span>下一页</span>
          <i class="iconfont icon-xiayiye"></i>
        </li>
      </ul>
    </div>
  </div>
  <imag :list="imgUrls" ref="previewer" :options="options"
    @moderVin="moderifVin" @moderifNo="moderifNo"
    @moderifLice="moderifLice"  @moderifVehic="moderifVehic"
    @moderifDate="moderifDate">
  </imag>
  </div>
</template>
<script>
import {formatDate,reminder,getAxios,trim} from '../domain.js'
import { MessageBox,Toast } from 'mint-ui';
import imag from './image.vue'
export default {
  components: {imag},
  watch:{"popImage":"backtrack"},
  data(){
     return{
         routeId:'',
         preNext:'3',
         show1:false,
         show2:false,
         search:'',//搜索的信息
         disabled:false,
         show : false,
         pageNo:'1',//页码
         pageTotle:'',//总页数
         recTotle:5,//总记录数
         carList:[],
         carInfo:{},
         engineNo:'',//发动机号
         licenseNo:'',//车牌号码
         enrollDate:'',//注册日期
         vehicleName:'',//品牌型号
         vin:'',//车架号码
         enrollDateSubmit:"",
         searchData:[],
         filePath:'',
         imgUrls: [{src:'',w  :'',h:''}],
         imgUrl:'',
         imgUrlSubstr:'',
         urlArr: [],
         btnTitle: '',
         isModify: false,
         previewImg:'',
         isPreview: false,
         popImage:'',
         options:{
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            tapToClose: false,
            closeOnVerticalDrag :false,
            preventHide:true
         }
       }
     },
     methods: {
      goback(){history.go(-1);},
      showDel(){this.$refs.previewer.showDel();},
      showDateFun(){this.$refs.previewer.showDateFun();},
      moderifVin(vIN){this.vin = vIN;},//修改VIN
      moderifNo(engineNo){this.engineNo = engineNo},//修改VIN
      moderifLice(licenseNo){this.licenseNo = licenseNo},//修改车牌号
      moderifVehic(vehicleName){this.vehicleName = vehicleName},//修改车牌号
      moderifDate(enrollDate){this.enrollDate = enrollDate},//修改日期
      showClose(val){this.$refs.previewer.showClose(val);this.popImage = 1;},
      gopageAbc(e,id) {
        var url = "/" + e;
        this.$router.push({
          path: url,
          query: {'carId':id}
        })
      },
      checkVio(){
          if(this.vin.length!=17){
        reminderOther('您输入了'+this.vin.length+'位车架号,请输入17位数字!');
        this.show1 = false;
      }else{
        this.show1 = true;
      }
      },
      showPreviewer(index,img,val,engineNo,licenseNo,vehicleName,enrollDate){
        this.$refs.previewer.showVin(index,img,val,engineNo,licenseNo,vehicleName,enrollDate);
        history.pushState(null, null, location.href);
        this.popImage = 2;
      },
      checkNofull(){
        if(this.licenseNo==''){reminderOther('请输入车牌号码');this.show2 = false;}
        if(this.carInfo.carOwnerName==''){reminderOther('请输入车主姓名'); this.show2 = false;}
        if(this.engineNo==''){reminderOther('请输入发动机号码'); this.show2 = false;}
        if(this.vehicleName==''){reminderOther('请输入品牌型号'); this.show2 = false;}
        if(this.licenseNo!=''&&this.carInfo.carOwnerName!=''
          &&this.engineNo!=''&&this.vehicleName!=''){
            this.show2 = true;
          }
      },
      checkDate(){
        if(this.enrollDate.indexOf("-")>0){
          this.enrollDateSubmit= this.enrollDate.split("-").join("");
        }
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
      clear(){
        this.show = false;
        this.carInfo={};
        history.go(-1);
        this.$indicator.close();
      },
      reminder(message){
        MessageBox({
               title: '提示',
               message:message,
               showCancelButton: false
             });
         MessageBox.alert(message).then(action => {});
      },
      preEnd(){
          var that = this;
          this.preNext = 1;
        setTimeout(function(){that.preNext = 3;},30)
        if(this.pageNo>1){
            this.pageNo--;
            this.allCaragain(this.search,'',this.pageNo,3)
        }else{
          if(this.pageNo>1){
              this.pageNo--;
              this.allCaragain(this.search,'',this.pageNo,3)
          }else{
            if(this.pageTotle==0){
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
          if(this.pageNo<this.pageTotle){
              this.pageNo++;
              this.allCaragain(this.search,'',this.pageNo,3)
          }else{
            this.pageNo = this.pageTotle
          }
      },
       searchDataFirst:function(){
         var search = this.search.toLowerCase();
         if(search) {
           return this.carList.filter(function(product) {
             return Object.keys(product).some(function(key) {
               return String(product[key]).toLowerCase().indexOf(search) > -1;
             })
           })
         }
         return this.carList;
       },
      allCaragain:function(licenseNo,saleFlag,pageNo,pageSize){
        var that = this;
        var testU = that.domain.testUrl;
        this.$indicator.open({
             text: '车辆加载中...',
             spinnerType: 'fading-circle'
           });
           var cuanData =JSON.stringify({
             "licenseNo":licenseNo,
             "state":saleFlag,
             "pageNo" : pageNo,
             "pageSize": pageSize
           })
	        getAxios('car/getList.json',cuanData).then((data) => {
            if (data.code == '0000'){
              that.carList=[];
              for(var i = 0;i<data.result.carList.length;i++){
                that.carList.push(data.result.carList[i]);
                that.carList[i].icon = "icon-"+that.carList[i].icon;
              }
              that.searchData = that.searchDataFirst()
              that.pageNo = data.result.pageNo;
              that.pageTotle = data.result.pageTotle;
              that.recTotle = data.result.recTotle;
              that.$indicator.close();
             }
           },(err) => {
              that.$indicator.close();
          })
        },
        Mycar:function(carId){
          var that = this;
          this.$indicator.open({
               text: '加载中...',
               spinnerType: 'fading-circle'
             });
           var cuanData =JSON.stringify({"carId" : carId});
	         getAxios('car/getInfo.json',cuanData).then((data) => {
           if (data.code == '0000'){
               that.carInfo=data.result;
               that.vin = data.result.vin;
               that.engineNo = data.result.engineNo;
               that.licenseNo = data.result.licenseNo;
               that.vehicleName = data.result.vehicleName;
             if(data.result.enrollDate.length==8){
               that.enrollDate=formatDate(data.result.enrollDate);
             }else{
               that.enrollDate = ''
             }
             that.imgUrl = data.result.imgUrl;
             that.imgUrls[0].src=that.imgUrl;
             var img = new Image();
             img.src = that.imgUrl;
             document.querySelectorAll('.imgBig')[0].onload=function(){
               that.imgUrls[0].w = img.width;
               that.imgUrls[0].h = img.height;
             }
             that.filePath = data.result.imgUrl;
             that.show = true;
             history.pushState(null, null, location.href);
             that.popImage = 1;
             that.$indicator.close();
            }
          },(err) => {
           that.$indicator.close();
         })
        },
        UploadImage(rst){
          var token;
          var that = this;
          var a = rst.origin.name;
          var cookies=document.cookie.split(";");
              for(var i = 0 ; i < cookies.length; i++){
                if(trim(cookies[i].split("=")[0]) =="token"){
                 token=trim(cookies[i].split("=")[1]);
                }
              }
          this.$ajax({
                cache:false,
                method: 'post',
                async:true,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'x-fileName':encodeURI(a),
                  'x-spaceName':"upload",
                  'x-token':token
                },
                url:'http://upload.test.achexian.cn/simpleUpload.json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:that.imgUrlSubstr,
                dataType: "json"}).then(function(res){
                  if(res.data.code=='0000'){
                    that.filePath =res.data.result.filePath;
                    that.$indicator.close();
                    that.imgUrlAnalysis(res.data.result.filePath);
                    history.pushState(null, null, location.href);
                  }
                }).catch(function(err){
                  Toast('请求失败'+err);
              })
        },
        imgUrlAnalysis(imgUrlrit){
          var vm = this;
          vm.$indicator.open({
               text: '解析中...',
               spinnerType: 'fading-circle'
             });
           var cuanData = JSON.stringify({"imgUrl":imgUrlrit});
           getAxios('base/drivingLicenseRecognition.json',cuanData).then((data) => {
              if (data.code == '0000'){
                vm.carInfo = data.result;
                vm.enrollDateSubmit = data.result.enrollDate;
                vm.vin = vm.carInfo.vin;
                vm.engineNo = vm.carInfo.engineNo;
                vm.vehicleName = vm.carInfo.vehicleName;
                vm.licenseNo = vm.carInfo.licenseNo;
                vm.enrollDate=formatDate(data.result.enrollDate);
                vm.$indicator.close();
               }
               vm.show=true;
           },(err) => {
              vm.$indicator.close();
            })
          },
          submits(){
            if(this.enrollDate.indexOf("-")>0){
              this.enrollDateSubmit= this.enrollDate.split("-").join("");
            }
            this.checkVio();
            this.checkNofull();
            this.$indicator.open({
               text: '加载中...',
               spinnerType: 'fading-circle'
             });
            if(this.show1&&this.show2){
              this.submitAjax();
            }
          },
          submitAjax(){
            var that = this;
            var cuanData =JSON.stringify({
             "licenseNo":that.licenseNo.toUpperCase(),
             "carOwnerName":that.carInfo.carOwnerName,
             "engineNo":that.engineNo.toUpperCase(),
             "vin":that.vin.toUpperCase(),
             "vehicleName":that.vehicleName.toUpperCase(),
             "enrollDate":that.enrollDateSubmit,
             "imgUrl":that.filePath
            });
		         getAxios('car/submitInfo.json',cuanData).then((data) => {
               if (data.code == '0000'){
                 if(that.routeId==1){
                   that.gopageAbc('ContractProject',data.result.carId);
                 };
                 if(that.routeId==2){
                   that.gopageAbc('QueryDauger',data.result.carId);
                 };
                 if(that.routeId==3){
                   that.gopageAbc('QueryViolation',data.result.carId);
                 };
                 that.$indicator.close();
                }
              },(err) => {
                 that.$indicator.close();
             })
          },
      addPic: function(e) {
        var btnNode = document.getElementById('inputImage');
            btnNode.click();
      },
      onFileChange: function(e) {
        this.$indicator.open({
             text: '上传中...',
             spinnerType: 'fading-circle'
           });
         var files = e.target.files || e.dataTransfer.files;
         if(!files.length) return;
         this.createImage(files, e);
       },
      createImage: function(file, e) {
         let vm = this;
         vm.imgUrls=[{src:'',w:'',h:''}];
         vm.imgUrl='';
         lrz(file[0],{width:1000}).then(function(rst) {
               vm.imgUrls[0].src = rst.base64;
               vm.imgUrl=vm.imgUrls[0].src;
               var img = new Image();
               img.src = vm.imgUrl;
               img.onload = function(){
                 vm.imgUrls[0].w = img.width;
                 vm.imgUrls[0].h = img.height;
               };
               vm.saveImage();
               vm.UploadImage(rst);
               return rst;
             }).always(function() {
               e.target.value = null;
             });
         },
       saveImage: function(){
         let vm = this;
         let urlArr = [];
           for(let i = 0; i < vm.imgUrls.length; i++) {
             if(vm.imgUrls[i].src.indexOf('file') == -1) {
                 urlArr.push(vm.imgUrls[i].src.split(',')[1]);
               }else{
                   urlArr.push(vm.imgUrls[i].src);
                 }
               }
          vm.imgUrlSubstr=urlArr[0];
      }
    },
    mounted(){
      this.$indicator.close();
      this.routeId = this.$route.query.routeId;
      this.allCaragain('','',1,3);
      this.showDel();
      this.showDateFun();
  }
}
</script>
<style lang="less">
    .MyPrice{
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
    .list-img{
        overflow: hidden;
        margin-top: 45px;
        .list-default-img{
          background-color: hsl(214, 28%, 95%);
          text-align: center;
          float: left;
          margin-left: 50%;
          margin-top: 25px;
          width: 175px;
          height: 110px;
          border: 2px dashed hsl(210, 9%, 82%);
          transform: translate(-88px);
          p{color:#666;font-size: 14px;}
          i{
            display: inline-block;
            font-size: 75px;
            text-align: center;
          }
        }
    }
.Mcover{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.1);
    .option {
        width: 86%;
        height: 80%;
        margin: 17% 0 10% 7%;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        .remain{color:red;font-family: monospace;}
        .confirm{
            display: inline-block;
            background-color: #3764a8;
            opacity:0.8;
            color: #fff;
            width: 100%;
            height: 47px;
            line-height: 47px;
            font-size: 16px;
          }
        .images{
          text-align: center;
          display: inline-block;
          padding: 5px 0;
          img{
            display: inline-block;
            width: 150px;
            height: 88px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
          }
        }
        .close{
          display: inline-block;
          font-size: 48px;
          padding: 5px 0;
        }
        table{
          width: 88%;
          margin-left: 20px;
          margin-right: 20px;
            tr{
              height: 40px;
              line-height: 40px;
              border-bottom:1px solid #dcdcdc;
              .boldFirst{
                float: left;
                font-size: 16px;
                color:#363636;
              }
              .boldSecond{
                float: right;
                font-size: 15px;
                .yd-datetime-input{color:#000;}
                input{
                  width: 11rem;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    .el-input{
      width: 180px;
      margin-top: 17px;
      margin-bottom: 10px;
      margin-left: 49%;
      height: 30px;
      transform: translateX(-62px);
      .el-input__inner{height: 30px;}
    }
    .imgCarData{
      position: relative;
      span{
        font-size: 16px;
        position: absolute;
        bottom: 15px;
        left: 47%;
        transform: translateX(-120px);
      }
    }
    .carData{
      padding-left: 10px;
      position: relative;
      border-bottom: 1px solid hsl(0, 0%, 86%);
      border-top: 1px solid hsl(0, 0%, 86%);
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
        }
        li:last-child{
          border: none;
          margin-bottom: 0;
        }
    }
  }
</style>
