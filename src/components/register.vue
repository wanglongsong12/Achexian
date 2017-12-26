<template lang="html">
  <div class="DealeRegistration" ref="title">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">车商注册</span>
    </div>
    <div class="linear"></div>
    <table>
      <tr>
        <td class="bolder">投保城市</td>
        <td class="fr">
          <el-select  v-model="valueFirst" placeholder="请选择"@change="rotate">
             <el-option size=small  v-for="item in cityList"
             :key="item.cityId"  :value="item.cityName">
             </el-option>
           </el-select>
           <i v-show="showcity" class="icon iconfont icon-modifying"></i>
        </td>
      </tr>
      <tr>
        <td  class="bolder">交易市场</td>
        <td class="lineer" ref="title">
          <span class="spanThree" :class="{i2:selected==index}" v-for="(item,index) in marketList"
           @click="swit(index,item.marketId)">
            <i class="iconfont icon-103-copy"></i>
            <span>{{item.marketName}}</span>
          </span>
          <span  class="showarketIdText" v-show="showMarketId">暂无市场数据</span>
          <i v-show="showarketId" class="icon iconfont icon-modifying"></i>
        </td>
      </tr>
      <tr class="bolderFirst"></tr>
      <tr>
        <td  class="bolder">车商姓名</td>
        <td class="lineer">
          <input type="text" :class="{checked:test}"   placeholder="请输入车商姓名"
            v-model="carDealerName" @blur="checked(carDealerName,1)">
          <i v-show="showDealerName" class="icon iconfont icon-modifying"></i>
        </td>
      </tr>
      <tr>
        <td  class="bolder">商户名称</td>
        <td class="lineer">
          <input type="text"  placeholder="请输入商户名称"@blur="checked(merchantName,2)" v-model="merchantName">
          <i v-show="showChantName" class="icon iconfont icon-modifying"></i>
        </td>
      </tr>
      <tr>
        <td class="bolder">商户地址</td>
        <td class="lineer">
          <input type="text" placeholder="请输入商户地址" @blur="checkedAddr(merchantAddr)" v-model="merchantAddr">
          <i v-show="showChantAddr" class="icon iconfont icon-modifying"></i>
        </td>
      </tr>
      <tr>
        <td>
          <td  class="bolder">联系电话</td>
          <td class="lineer">
            <input type="text" placeholder="请输入联系电话" @blur="checkPhone(linkPhone)" v-model="linkPhone">
            <i v-show="showIcon" class="icon iconfont icon-modifying"></i>
          </td>
        </td>
      </tr>
    </table>
    <div class="content"></div>
      <div class="image-list">
         <div class="list-default-img" v-show="isPhoto" @click.stop="addPic">
          <i class="iconfont icon-xiangji"></i>
          <p>上传门店照片</p>
          <input id="inputImage" type="file" accept="image/*" @change="onFileChange" style="display: none;">
         </div>
          <ul  v-show="!isPhoto">
            <li  class="listUl" v-for="(iu, index) in imgUrls">
             <img @click="showPreviewer(index,imgUrls)" class="listImg" :class="{on:selectedList==index}" :src="iu.src">
           </li>
          </ul>
      </div>
      <div class="content"></div>
      <div class="endRegister">
        <button class="register" style="width:37%;" type="button" name="button" @click="register">注&nbsp&nbsp册&nbsp </button>
      </div>
      <imag :list="imgUrls" @child="listenToMyBoy" ref="previewer" :options="options"></imag>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { MessageBox} from 'mint-ui';
import {reminder,getAxios,trim} from '../domain.js'
import imag from './image.vue'
export default {
  components: {imag},
  watch:{"popImage":"backtrack"},
  data(){
   return{
     selectedList:'wa',
     showcity:false,
     showarketId:false,
     showIcon:false,
     showDealerName:false,
     showChantName:false,
     showChantAddr:false,
     selected:'王',
     test:false,//测试
     popImage:'',
     cityId:'',
     cityList:[],//城市显示
     marketList:[],//交易市场
     marketId:'',
     carDealerName:'',//车商姓名
     merchantName:'',//商品名称
     merchantAddr:'',//商品地址
     linkPhone:'',//联系电话
     shopImgUrl:'',
     valueFirst: '',
     urlr:'',//城市列表接口
     showMarketId:'',
     filePath:'',//后台还的字符串
     positionCityId:'',
     imgUrls: [{src:'',w  :'',h:''}],
     imgUrlSubstr:'',//截取字符串给后台
     isPhoto: true,
     options:{
       history: false,
       focus: false,
       showAnimationDuration: 0,
       hideAnimationDuration: 0,
       timeToIdle: 4000
     }
   }
  },
 methods: {
   goback(){history.go(-1);this.$indicator.close();},
   listenToMyBoy: function(somedata){this.isPhoto = somedata},
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
    checked(val,idx){
      if(!/^[\u4e00-\u9fa5]+$/gi.test(trim(val))){
        if(idx == 1){
          this.showDealerName = true;
        }else if(idx == 2){
          this.showChantName = true;
        }
      }else{
        if(idx == 1){
          this.showDealerName = false;
        }else if(idx == 2){
          this.showChantName = false;
        }
      }
    },
    checkedAddr(val){
      if(val==''){
        this.showChantAddr = true;
      }else{
        this.showChantAddr = false;
      }
    },
    swit(index,iteMarketId){
      this.selected = index;
      this.marketId=iteMarketId;
      this.checkNullswit();
    },
    checkNullswit(){
      if(this.marketId==''){
        this.showarketId=true;
      }else{
        this.showarketId=false;
      }
    },
    checkPhone(sId){
      if(!/^1[34578]\d{9}$/.test(trim(sId))){
         this.showIcon = true;
       }else{
         this.showIcon = false;
       }
     },
    addPic: function(e) {
      var btnNode = document.getElementById('inputImage');
      btnNode.click();
    },
    onFileChange: function(e){
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
        var files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;
        this.createImage(files, e);
      },
      createImage: function(file, e){
  			let vm = this;
  			vm.imgUrls=[{src:'',w:'',h:''}];
  			lrz(file[0], {width:1000}).then(function(rst) {
  				vm.imgUrls[0].src = rst.base64;
  				var img = new Image();
  				img.src =vm.imgUrls[0].src;
  				img.onload = function(){
  					vm.imgUrls[0].w = img.width;
  					vm.imgUrls[0].h = img.height;
  				};
  				setTimeout(function(){
  						if(img.width>img.height){
  							vm.selectedList = 0;
  						}
  				},0)
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
    vm.imgUrlSubstr=urlArr[0]
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
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'x-fileName':encodeURI(a),
          'x-spaceName':"upload",
          'x-token':token
        },
        url:'http://upload.test.achexian.cn/simpleUpload.json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        data:this.imgUrlSubstr,
        dataType: "json"}).then(function(res){
          if(res.data.code!='0000'){
            that.imgUrlSubstr=[];
            that.isPhoto = true;
            reminder(data.message)
            that.$indicator.close();
          }else{
            that.isPhoto = false;
            that.filePath=res.data.result.filePath
            that.$indicator.close();
          }
        }).catch(function(err){
          Toast('请求失败'+err);
      })
    },
    judgeHasDegree:function(){
      var that = this;
      var longitude;
      var latitude;
      that.$indicator.open({
           text: '加载中...',
           spinnerType: 'fading-circle'
         });
       navigator.geolocation.getCurrentPosition(function(pos){ // 该函数有如下三个参数// 如果成果则执行该回调函数
        longitude = pos.coords.longitude;
        latitude  = pos.coords.latitude;
         var cuanData=JSON.stringify({
           "longitude":longitude,
           "latitude":latitude
         });
        getAxios("base/getCityList.json",cuanData).then((res) => {
          if(res.code == '0000'){
           that.cityList=res.result.cityList;
           that.positionCityId = res.result.positionCityId;
           for(var i = 0;i<res.result.cityList.length;i++){
             if(res.result.cityList[i].cityId == that.positionCityId){
               that.valueFirst = res.result.cityList[i].cityName;
             }
           }
           that.$indicator.close();
          }
         },(err) => {
          //  Toast('请求失败'+err);
           that.$indicator.close();
         })
       },function(err){
         var cuanData=JSON.stringify({
           "longitude":'',"latitude":''
         });
         getAxios('base/getCityList.json',cuanData).then((res) => {
           if (res.code == '0000'){
             that.cityList=res.result.cityList;
             that.positionCityId = res.result.positionCityId;
             for(var i = 0;i<res.result.cityList.length;i++){
              if(res.result.cityList[i].cityId == res.positionCityId){
                that.valueFirst =res.result.cityList[i].cityName;
              }
            }
          that.$indicator.close();
          }
        },(err) => {
          // Toast('请求失败'+err);
          that.$indicator.close();
        })
      },{
       enableHighAccuracy: false,
      //  timeout: 30000,
       maximumAge: 1000
     })
    },
    reminder(message){
      MessageBox({
         title: '提示',
         message:message,
         showCancelButton: false
       });
       MessageBox.alert(message).then(action => {});
    },
  checkCityid(){
    if(this.valueFirst==''){
      this.showcity=true;
      this.reminder('请选择投保城市');
    }else{
      this.showcity=false;
    }
  },
  rotate(cityId){
  this.checkCityid();
  var that = this;
  var cityId = that.cityList.filter(function(value, index, array) {
        return value.cityName==cityId;
    });
    that.cityId=cityId[0].cityId;
    that.marketList=[];
    this.selected="wang";
    this.marketId='';
    this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
       var cuanData=JSON.stringify({"cityId":that.cityId});
       getAxios('base/getMarketList.json',cuanData).then((data) => {
         if(data.result[0]==undefined){
            that.showMarketId = true
          }else{
             that.showMarketId = false
           }
         if(data.code=='0000'){
           for(var i = 0;i<data.result.length;i++){
              that.marketList.push(data.result[i])
            }
            that.$indicator.close();
          }
       },(err) => {
        //  Toast('请求失败'+err);
         that.$indicator.close();
       })
      },
      register(){
        this.checkPhone(this.linkPhone);
        if(this.showIcon){
          this.reminder('请输入11位联系电话');
        }
        this.checkedAddr(this.merchantAddr);
        if(this.showChantAddr){
          this.reminder('请输入商户地址');
        }
        this.checked(this.merchantName,2);
        if(this.showChantName){
          this.reminder('请输入商户名称');
        }
        this.checked(this.carDealerName,1);
        if(this.showDealerName){
           this.reminder('请输入车商姓名');
        }
        if(this.marketId==''){
          this.showarketId=true;
          this.reminder('请选择交易市场');
        }else{
          this.showarketId=false;
        }
        if(this.valueFirst==''){
          this.showcity=true;
          this.reminder('请选择投保城市');
        }else{
          this.showcity=false;
        }
        if(this.showcity == false&&this.showarketId == false&&
          this.showDealerName == false&&this.showChantName == false&&
          this.showChantAddr == false&&this.showIcon == false){
            if(this.isPhoto == false){
                this.registerSecond();
            }else{
              this.reminder('请上传图片')
            }
          }
      },
      registerSecond(){
      var that = this;
      this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        var cuanData=JSON.stringify({
          "cityId":that.cityId,
          "marketId":that.marketId,
          "merchantName":that.merchantName,
          "merchantName":that.merchantName,
          "merchantAddr":that.merchantAddr,
          "carDealerName":that.carDealerName,
          "linkPhone":that.linkPhone,
          "shopImgUrl":that.filePath,
        });
        getAxios('carDealer/register.json',cuanData).then((data) => {
          if(data.code=='0000'){
             that.$store.commit('modeify',that.imgUrls);
             that.$store.commit('modeifyImgUrls',that.imgUrls)
             that.$router.push('/Audit')
             that.$indicator.close();
          }
        },(err) => {
          //  Toast('请求失败'+err);
           that.$indicator.close();
         })
       }
     },
     mounted(){
       this.$indicator.close();
       this.judgeHasDegree();
     }
  }
</script>
<style lang="less">
  .DealeRegistration{
  .el-select{
    width: 104px;
    margin-right: 4px;
    .el-input,.el-input__inner{
      height: 30px;
      .el-input__icon{top: 70%;}
    }
  }
  table{
    background-color: #fff;
    width: 100%;
    margin-top: 52px;
    .bolderFirst{
      height:10px;
      background-color:#f5f5f5;
    }
    tr{
      display: block;
      height:45px;
      line-height: 45px;
      border-bottom:1px solid #ececec;
      color:#272727;
      padding-right: 15px;
      position: relative;
      .icon{
        position: absolute;
        right: 0;
        top: 0;
        color: hsl(0, 100%, 50%);
        font-size: 20px;
        vertical-align: middle;
      }
    .bolder{
        color:#353535;
        padding-left:5.3%;
        font-size: 16px;
        float: left;
      }
      .lineer{
        color:#656565;
        float: right;
        font-size: 14px;
        input{
          text-align: right;
          border-right: 1px solid #fff;
          display: inline-block;
          text-indent: 2px;
          padding-right: 5px;
          background:#fff;
          color:#000
        }
        .showarketIdText{
          display:inline-block;
          margin-right: 7px;
        }
        .checked{border-right-color:hsl(0, 100%, 50%);}
        .spanThree.i2{
          border: 1px solid hsl(211, 97%, 53%);
          color: #fff;
          font-size: 16px;
          background: #007aff;
          i{color:#fff;}
        }
        .spanThree{
          display: inline-block;
          padding: 3px;
          width: 67px;
          height: 18px;
          line-height: 18px;
          border-radius: 5px;
          border:1px solid #cccccc;
          color:#363636;
          text-align: center;
          font-size: 16px;
          margin-left:15px;
          margin-right: 4px;
          i{color:#ccc;}
        }
      }
    }
  }
  .listUl{
    display: inline-block;
    position: relative;
    text-align:center;
    .listImg-close{
      position: fixed;
      right: 52px;
      font-size: 18px;
      top: 8px;
      margin-top: 5px;
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
      z-index: 100000;
      color: hsl(0, 0%, 100%);
    }
    .listImg{
      max-height:150px;
      text-align:center;
      display:block;
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 5px;
    }
    .listImg.on{
      max-width:150px;
      max-height: none;
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 10px
    }
  }
  .image-list{
    position: relative;
    background-color: hsl(0, 0%, 100%);
    padding: 10px 0;
    overflow: hidden;
    ul{text-align: center;}
    .list-default-img{
      text-align: center;
      float: left;
      margin-left: 50%;
      transform: translate(-48px);
      p{
        font-size:16px;
        color:#444444;
        margin-top: 10px;
      }
      i{
        display: inline-block;
        color:#cccccc;
        font-size: 53px;
      }
    }
  }
  .endRegister{
    margin-top: 10px;
    text-align:center;
  }
}
</style>
