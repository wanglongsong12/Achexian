  <template>
    <div class="orderFill">
      <div class="login2">
        <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
        <span class="registerText">订单填写</span>
      </div>
      <div class="linear"></div>
      <div class="info infoTop">
        <p class="baoren">
          <i></i>
          <span>投保人/被保人信息</span>
        </p>
        <div class="sao" @click.stop="addPic(1,'firSao')">
          <i class="erweimaFirst iconfont icon-erweima"></i>
          <span>扫一扫</span>
        </div>
      </div>
      <div class="card" v-show="confirmBuyData.idCardImgFlag">
        <div class="face">
          <span class="faceFirst iconfont icon-shangchuanshenfenzhengzheng" v-show="isPreviewFace" @click.stop="addPic(1,'face')"></span>
          <span v-show="!isPreviewFace"  v-for="(item,index) in imgUrlFace">
            <img class="imgBigFace"  @click="showPreviewerAbc(index,imgUrlFace,1)" :src="item.src">
          </span>
          <p>身份证正面<i>(仅北京)</i></p>
          <input id="inputFace" type="file" accept="image/*" @change="onFileChange" style="display: none;">
        </div>
        <div class="back">
          <span class="faceFirst iconfont icon-shangchuanshenfenzhengfan"  v-show="isPreviewBack" @click.stop="addPic(2)"></span>
          <span v-show="!isPreviewBack"  v-for="(item,index) in imgUrlBack">
            <img class="imgBigFace"  @click="showPreviewerAbc(index,imgUrlBack,2)" :src="item.src">
          </span>
          <p>身份证背面<i>(仅北京)</i></p>
          <input id="inputBack" type="file" accept="image/*" @change="onFileChange" style="display: none;">
        </div>
      </div>
      <div class="liner"></div>
      <ul class="toubaoren">
        <li><span>投保人</span></li>
        <li>
          <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
          <div class="rightFace">
            <input type="text"  v-model="holderName" placeholder="请输入投保人姓名" @blur="checked(holderName,1)">
            <i v-show="name1" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
        <li>
          <span>身份证号：</span>
          <div class="rightFace">
            <input  type="text"  v-model="holderIdCard" placeholder="请输入投保人身份证号"@blur="isCardID(holderIdCard,1)">
            <i v-show="textAreaFir" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
        <li class="linearFirst"></li>
        <li class ="info infoCenter">
          <span>被保险人</span>
          <i @click.stop="addPic(1,'secSao')">
          <i class="erweimaSecond iconfont icon-erweima"></i>
            扫一扫
          </i>
        </li>
        <li>
          <span> 姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
          <div class="rightFace">
            <input type="text" v-model="insuredName" placeholder="请输入被保险人姓名" @blur="checked(insuredName,2)">
            <i v-show="name2" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
        <li>
          <span>身份证号：</span>
          <div class="rightFace">
            <input type="text" placeholder="请输入被保险人身份证号"  v-model="insuredIdCard" @blur="isCardID(insuredIdCard,2)">
            <i v-show="textAreaSec" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
        <li>
          <span>联系电话：</span>
          <div class="rightFace">
            <input placeholder="请输入联系电话" type="tel" @blur="checkPhone(holderPhone,1)"  v-model="holderPhone">
            <i v-show="textAreaholderPhone" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
        <li>
          <span for="">电子邮箱：</span>
          <div class="rightFace">
            <input  type="email" placeholder="请输入电子邮箱" v-model="email" @blur="fChkMail(email)">
            <i v-show="textAreaEmail" class="icon iconfont icon-modifying"></i>
          </div>
        </li>
      </ul>
      <div class="liner"></div>
      <div v-show="confirmBuyData.expressFlag">
        <div class="info">
          <p class="baoren">
            <i></i>
            保单配送信息
          </p>
        </div>
        <ul class="toubaoren">
          <li>
            <span>联系 人:</span>
            <div class="rightFace">
              <input type="text" placeholder="请输入联系人姓名" v-model="linkManName" @blur="checked(linkManName,3)">
              <i v-show="name3" class="icon iconfont icon-modifying"></i>
            </div>
          </li>
          <li>
            <span>联系电话:</span>
            <div class="rightFace">
              <input placeholder="请输入联系电话" type="tel" @blur="checkPhone(linkManPhone,2)"  v-model="linkManPhone">
              <i v-show="textArealinkManPhone" class="icon iconfont icon-modifying"></i>
            </div>
          </li>
          <li>
            <span>配送地址：</span>
            <div class="rightFace">
              <input type="text" placeholder="请输入配送地址" v-model="address" @blur="checked(address,4)">
              <i v-show="name4" class="icon iconfont icon-modifying"></i>
            </div>
          </li>
        </ul>
        <div class="liner"></div>
      </div>
      <div v-show = "confirmBuyData.validateCarFlag">
        <div class="info"><p class="baoren"><i></i>验车照片</p></div>
        <div class="phoneImg">
          <ul class="phoneFirst">
            <li v-for="(item,index) in imageData">
              <span v-show ="!item" @click.stop="addPic(3,index)"></span>
              <img v-show ="item" :src="item" @click.stop="showPreviewerAbc(index,imgUrlMoney,3)">
            </li>
            <li><span @click.stop="addPic(3,5)"></span></li>
          </ul>
          <input id="money" type="file" accept="image/*" @change="onFileChange" style="display: none;">
        </div>
        <p class="textShow" v-show="confirmBuyData.carImgNote">{{confirmBuyData.carImgNote}}</p>
        <div class="liner"></div>
      </div>
      <div>
        <ul class="toubaoren">
          <li>
            <span>第一受益人：</span>
            <div class="rightFace"><input type="text" placeholder="请输入第一受益人" v-model="firstBeneficiary"></div>
          </li>
          <li class="insuranceNow">
            <i>即 时 起 保：</i>
            <div>
              <el-radio-group v-model="immediateEffectFlag">
                <el-radio-button label="0">是</el-radio-button>
                <el-radio-button label="1">否</el-radio-button>
              </el-radio-group>
            </div>
          </li>
        </ul>
      </div>
      <div class="liner"></div>
      <div class="creditData">
        <table>
          <tr>
            <td>车牌号</td>
            <td>{{confirmBuyData.licenseNo}}</td>
          </tr>
          <tr>
            <td>承保公司</td>
            <td>{{confirmBuyData.companyName}}</td>
          </tr>
          <tr>
            <td>订单金额</td>
            <td>{{confirmBuyData.orderAmount}}元</td>
          </tr>
          <tr>
            <td>交强险期限</td>
            <td><span>{{ciStartDate}}</span><br><span>{{ciEndDate}}</span></td>
          </tr>
          <tr>
            <td>商业险期间</td>
            <td><span>{{biStartDate}}</span><br><span>{{biEndDate}}</span></td>
          </tr>
        </table>
      </div>
      <div class="endReigest">
        <button class="register" type="button" name="button" @click="submitOrder">提交订单</button>
      </div>
      <imag  :list="imgUrls"  @child="listenToMyBoy" ref="previewer" :options="options"></imag>
    </div>
  </template>
  <script>
  import {reminderOther,trim,getAxios,formatDate,testUrl} from '../domain.js'
  import { MessageBox,Toast} from 'mint-ui';
  import imag from './image.vue'
  export default {
    components: {imag},
    watch:{"popImage":"backtrack"},
    data () {
      return {
        idx:'',
        dome:true,
        indexMoney:'',//点击的时候往里面传值
        indexAdd:5,//最后添加的图片
        imageJudgefirsao:false,//判断是不是一扫
        imageJudgesecsao:false,//判断是不是二扫
        imageFace:false,//判断是不是第一个正面
        popImage:'',
        Faceback:'8',//判断是身份证那一面
        imageJudge:'',
        imageData:new Array(5),
        immediateEffectFlag:0,
        imgUrlSubstr:'',
        urlArr: [],
        confirmBuyData:'',
        holderName:'',
        holderIdCard:'',
        holderPhone:'',
        insuredName:'',
        insuredIdCard:'',
        email:'',
        address:'',
        linkManName:'',
        linkManPhone:'',
        firstBeneficiary:'',
        carImgList:[],
        // 检验非空等
        name1:false,//投保人姓名
        name2:false,//被保险人姓名
        name3:false,//保单配送信息名字
        name4:false,//保单配送地址
        name5:false,//身份证正面
        name6:false,//身份证反面
        name7:false,//验车照片
        textAreaSec:false,
        textAreaFir:false,
        textAreaEmail:false,
        textArealinkManPhone:false,
        textAreaholderPhone:false,
        // 检验非空等
        ciStartDate:'',
        ciEndDate:'',
        biStartDate:'',
        biEndDate:'',
        isPreviewFace: true,
        isPreviewBack: true,
        imgUrls: [{src:'',w:'',h:''}],
        imgUrlFace: [{src:'',w:'',h:''}],
        imgUrlBack: [{src:'',w:'',h:''}],
        imgUrlMoney:[{src:'',w:'',h:''}],
        options:{
          history: false,
          focus: false,
          index:0,
          showAnimationDuration: 0,
          hideAnimationDuration: 0
        }
      }
    },
    methods:{
      goback(){history.go(-1);},
      gopageAbc(e) {var url = "/" + e;this.$router.push({path: url});},
      showClose(val){this.$refs.previewer.showClose(val);this.popImage = 1;},
      showPreviewer(index,imgUrls){
        history.pushState(null, null, location.href);
        this.$refs.previewer.show(index,imgUrls);
        this.popImage = 2;
      },
      listenToMyBoy(somedata){
        if(this.Faceback=='1'){
          this.isPreviewFace =somedata;
        }else if(this.Faceback=='2'){
          this.isPreviewBack = somedata;
        }else if(this.Faceback=='3'){
          this.$set(this.imageData,this.idx,'');
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
      showPreviewerAbc(index,imgUrls,val){
        this.Faceback = val;
        this.idx = index;
        if(val == 1){
          this.imgUrls[0].src = this.imgUrlFace[0].src;
        }else if(val == 2){
          this.imgUrls[0].src = this.imgUrlBack[0].src;
        }else if(val == 3){
          this.imgUrls[0].src = this.imageData[index];
        }
        this.showPreviewer(index,imgUrls)
      },
      checked(val,idx){
        if(val==''){
            if(idx == 1){this.name1 = true;
            }else if(idx == 2){this.name2 = true;
            }else if(idx == 3){this.name3 = true;
            }else if(idx == 4){this.name4 = true;
            }else if(idx == 5){this.name5 = true;
            }else if(idx == 6){this.name6 = true;
            }else if(idx == 7){this.name7 = true;}
        }else{
          if(idx == 1){this.name1 = false;
          }else if(idx == 2){this.name2 = false;
          }else if(idx == 3){this.name3 = false;
          }else if(idx == 4){this.name4 = false;
          }else if(idx == 5){this.name5 == false;
          }else if(idx == 6){this.name6 == false;
          }else if(idx == 7){this.name7 == false;}
        }
      },
      isCardID(sId,val){
        if(!/^\d{17}(\d|x)$/i.test(trim(sId))){
          if(val == 1){this.textAreaFir = true;
          }else if(val == 2){this.textAreaSec = true;}
        }else{
          if(val == 1){this.textAreaFir = false;
          }else if(val == 2){this.textAreaSec = false;
        }
      }
    },
    checkPhone(sId,val){
      if(!/^1[34578]\d{9}$/.test(trim(sId))){
        if(val == 1){
          this.textAreaholderPhone = true;
        }else if(val == 2){
          this.textArealinkManPhone = true;
        }
      }else{
        if(val == 1){
          this.textAreaholderPhone = false;
        }else if(val == 2){
          this.textArealinkManPhone = false;
        }
      }
    },
    fChkMail(val){
      if(!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(trim(val))){
        this.textAreaEmail = true;
      }else{
        this.textAreaEmail = false;
      }
    },
    DateModity(){
      this.ciStartDate =formatDate(this.confirmBuyData.ciStartDate);
      this.ciEndDate =formatDate(this.confirmBuyData.ciEndDate);
      this.biStartDate =formatDate(this.confirmBuyData.biStartDate);
      this.biEndDate = formatDate(this.confirmBuyData.biEndDate);
    },
    imageToggle(eve,rst){
      let vm = this;
      var img = new Image();
      img.src = rst.base64;
      img.onload = function(){
        vm.imgUrls[0].w = img.width;
        vm.imgUrls[0].h = img.height;
      }
      if(eve == 'face'){
        var b = [{src:'',w:'',h:''}];
        if(this.imageJudgefirsao||this.imageFace){
          vm.imgUrlFace[0].src=rst.base64;
          vm.saveImage(vm.imgUrlFace);
        }else if(this.imageJudgesecsao){
          b[0].src=rst.base64;
          vm.saveImage(b);
        }
      }else if(eve == 'back'){
        vm.imgUrlBack[0].src=rst.base64;
        vm.saveImage(vm.imgUrlBack);
      }else if(eve == 'money'){
        vm.imgUrlMoney[0].src=rst.base64;
        vm.saveImage(vm.imgUrlMoney);
        if(vm.indexMoney==5){
          vm.$set(vm.imageData,vm.indexAdd++,vm.imgUrlMoney[0].src);
        }else{
          vm.$set(vm.imageData,vm.indexMoney,vm.imgUrlMoney[0].src);
        }
      }
    },
    addPic(val,index){
      if(val==1){
        var btnNode = document.getElementById('inputFace');
        this.imageJudge = 'face';
        if(index == 'firSao'){
          this.imageJudgefirsao = true;
        }else if(index == 'face'){
          this.imageFace = true;
        }else if(index == 'secSao'){
          this.imageJudgesecsao = true;
        }
        btnNode.click();
      }
      if(val==2){
        var btnNode = document.getElementById('inputBack');
        this.imageJudge = 'back';
        btnNode.click();
      }
      if(val==3){
        var btnNode = document.getElementById('money');
        this.imageJudge = 'money';
        this.indexMoney = index;
        btnNode.click();
      }
    },
    onFileChange: function(e){
      this.$indicator.open({
        text: '图片上传中...',
        spinnerType: 'fading-circle'
      });
      var files = e.target.files || e.dataTransfer.files;
      if(!files.length) return;
      this.createImage(files, e,this.imageJudge);
     },
     createImage: function(file, e ,eve) {
       let vm = this;
       if(eve == 'face'){
         if(vm.imageJudgefirsao||vm.imageFace){
            vm.imgUrlFace=[{src:'',w:'',h:''}];
         }
       }else if(eve == 'back'){
         vm.imgUrlBack=[{src:'',w:'',h:''}];
       }else if(eve == 'money'){
         vm.imgUrlMoney=[{src:'',w:'',h:''}];
       }
       lrz(file[0],{width:1000}).then(function(rst) {
          vm.imageToggle(eve,rst);
         if(vm.imgUrlFace||vm.imgUrlBack||vm.imgUrlMoney){
           vm.UploadImage(rst,eve);
         }
         return rst;
       }).always(function() {
         e.target.value = null;
       });
     },
     saveImage: function(val){
      let vm = this;
      let urlArr = [];
      for(let i = 0; i < val.length; i++) {
      if(val[i].src.indexOf('file') == -1) {
        urlArr.push(val[i].src.split(',')[1]);
      }else{
        urlArr.push(val[i].src);
        }
      }
      vm.imgUrlSubstr=urlArr[0];
    },
    UploadImage(rst,imgVal){
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
        if(res.data.code=='0000'){
          that.carImgList.push(res.data.result.filePath)
          if(imgVal == 'face'||that.imageJudgesecsao){
            that.isPreviewFace= false;
            that.$indicator.close();
            that.imgUrlAnalysis(res.data.result.filePath)
          }
          if(imgVal == 'back'){
            that.isPreviewBack= false;
            that.$indicator.close();
          }
          if(imgVal == 'money'){
            that.$indicator.close();
          }
        }
      }).catch(function(err){
        that.$indicator.close();
        Toast('请求失败'+err);
      })
    },
    imgUrlAnalysis(imgUrlrit){
      var that = this;
      var _url = this.domain.testUrl
      this.$indicator.open({
        text: '图片扫描中...',
        spinnerType: 'fading-circle'
      });
      this.$ajax({
        cache:false,
        method: 'post',
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        url:_url+'base/idCardRecognition.json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        data:{"imgUrl":imgUrlrit},
        dataType: "json"}).then(function(res){
        if(res.data.code=='0000'){
            if(that.imageJudgefirsao){
              that.imageJudgefirsao = false;
              that.holderName=res.data.result.idCardName;//投保人名字
              that.holderIdCard=res.data.result.idCardNo;//投保人身份证
              if(that.insuredName==''){
                that.insuredName=res.data.result.idCardName;//被保险人名字
              }
              if(that.insuredIdCard==''){
                that.insuredIdCard=res.data.result.idCardNo;//被保险人身份证
              }
            }else if(that.imageFace){
              that.imageFace = false;
              that.holderName=res.data.result.idCardName;
              that.holderIdCard=res.data.result.idCardNo;
              if(that.insuredName==''){
                that.insuredName=res.data.result.idCardName;
              }
              if(that.insuredIdCard==''){
                that.insuredIdCard=res.data.result.idCardNo;
              }
            }else if(that.imageJudgesecsao){
              that.imageJudgesecsao = false;
              that.insuredName=res.data.result.idCardName;
              that.insuredIdCard=res.data.result.idCardNo;
            }
            that.$indicator.close();
        }else{
          reminderOther('扫描失败');
          that.$indicator.close();
        }
      }).catch(function(err){
        that.$indicator.close();
      })
    },
    submitOrder(){//验车照片
      if(this.confirmBuyData.validateCarFlag==1){
        this.checked(this.imageData,7);
        if(this.name7 == true){
            reminderOther('亲,你忘记传验车照片了!');
        }
      }else{
        this.name7 == false;
      }
      // 配送校验
      if(this.confirmBuyData.expressFlag==1){
        this.checked(this.address,4);
        if(this.name4 == true ){
          reminderOther('你没有输入地址');
        }
        this.checkPhone(this.linkManPhone,2);
        if(this.textArealinkManPhone == true){
          reminderOther('配送手机号码有误，请重填');
        }
        this.checked(this.linkManName,3);
        if(this.name3 == true ){
          reminderOther('请输入姓名');
        }
      }else{
        this.name3 == false;
        this.name4 == false;
        this.textArealinkManPhone = false;
      }
      // 被保险人校验
      this.fChkMail(this.email);
      if(this.textAreaEmail == true){
        reminderOther('你输入的邮箱不合规');
      }
      this.checkPhone(this.holderPhone,1);
      if(this.textAreaholderPhone == true){
        reminderOther('被保险人手机号码有误');
      }
      this.isCardID(this.insuredIdCard,2);
      if(this.textAreaSec == true){
        reminderOther('被保险人的身份证长度或格式错误');
      }
      this.checked(this.insuredName,2);
      if(this.name2 == true ){
        reminderOther('请输入被保人姓名');
      }
      // 投保人
      this.isCardID(this.holderIdCard,1);
      if(this.textAreaFir == true){
        reminderOther('投保人的身份证长度或格式错误');
      }
      this.checked(this.holderName,1);
      if(this.name1 == true ){
        reminderOther('请输入投保人姓名');
      }
      // 被保险人校验
      // 身份证正反面
      if(this.confirmBuyData.idCardImgFlag == 1){
        this.checked(this.imgUrlFace,5);
        if(this.name5 == true ){
          reminderOther('请输入身份证正面');
        }
        this.checked(this.imgUrlBack,6);
        if(this.name6 == true ){
          reminderOther('请输入身份证反面');
        }
      }else{
        this.name5 = false;
        this.name6 = false;
      }
      if(!this.textAreaFir&&!this.textAreaSec&&!this.textAreaholderPhone
        &&!this.textArealinkManPhone&&!this.textAreaEmail&&!this.name1
        &&!this.name2&&!this.name3&&!this.name4&&!this.name5&&!this.name6&&!this.name7){
          this.submitOr();
        }
    },
    submitOr(){
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
       var cuanData =JSON.stringify({
         "quoteId":that.confirmBuyData.quoteId,
         "holderName":that.holderName,
         "holderIdCard":that.holderIdCard,
         "holderPhone":that.holderPhone,
         "insuredName":that.insuredName,
         "insuredIdCard":that.insuredIdCard,
         "email":that.email,
         "address":that.address,
         "linkManName":that.linkManName,
         "linkManPhone":that.linkManPhone,
         "carImgList ":that.carImgList ,
         "firstBeneficiary":that.firstBeneficiary,
         "immediateEffectFlag":that.immediateEffectFlag,
       });
       getAxios('order/submit.json',cuanData).then((data) => {
       if(data.code == '0000'){
         that.$store.commit('confirmIndent',data.result.orderId);
         that.gopageAbc('IndentList');
         that.$indicator.close();
        }
        that.$indicator.close();
        },(err) => {
          that.$indicator.close();
        })
    }
    },
    mounted(){
      this.$indicator.close();
      this.confirmBuyData = this.$store.state.confirmBuyData;
      this.DateModity();
    }
  }
</script>
<style lang="less" scoped>
  .info.infoTop{margin-top: 49px;}
  .info.infoCenter{margin: 0;padding: 0 10px;}
  .info{
    display: flex;
    justify-content: space-between;
    height:40px;
    border-bottom:1px solid #eee;
    margin: 0 10px;
    .erweimaSecond{font-size: 13px;vertical-align: middle;}
    .sao{
      line-height: 40px;
      .erweimaFirst{
        margin-right: 5px;
        font-size: 13px;
        display: inline-block;
      }
    }
    .baoren{
      padding-left:10px;
      position: relative;
      line-height:40px;
      font-weight: bold;
      color:#769fd3;
      font-size: 16px;
      i{
        display: block;
        width:3px;
        height:14px;
        background:#6689CB;
        position: absolute;
        top:15px;
        left:0px;
      }
    }
  }
  .phoneImg{
    margin: 0 0 0 11px;
    .phoneFirst{
      overflow: hidden;
      margin-top: 10px;
      li{
        float: left;
        width: 30%;
        margin-right: 10px;
        margin-bottom: 10px;
        span,img{
          display: inline-block;
          width: 100%;
          height: 80px;
        }
      }
      li:nth-child(1) span{
        background: url('../../static/image/pict/car_01.jpg');
        background-size:100% 80px;
      }
      li:nth-child(2) span{
        background: url('../../static/image/pict/car_02.jpg');
        background-size:100% 80px;
      }
      li:nth-child(3) span{
        background: url('../../static/image/pict/car_03.jpg');
        background-size:100% 80px;
      }
      li:nth-child(4) span{
        background: url('../../static/image/pict/car_04.jpg');
        background-size:100% 80px;
      }
      li:nth-child(5) span{
        background: url('../../static/image/pict/car_05.jpg');
        background-size:100% 80px;
      }
      li:last-child span{
        background: url('../../static/image/pict/car_06.jpg');
        background-size:100% 80px;
      }
    }
  }
  .textShow{
    font-size:14px;
    margin:0 10px 10px 10px;
    line-height: 20px;
  }
  .card{
    overflow: hidden;
    display: flex;
    padding:10px 0;
    .face,.back{
      flex:1;
      text-align: center;
      .faceFirst{
        display: block;
        font-size: 50px;
        margin-bottom: 10px;
      }
      p{font-size: 16px;
        i{
          font-size:14px;
          color:#BABABA;
          }
        }
      img{
        display: inline-block;
        height:50px;
        border:1px solid #ddd;
        margin-bottom:9px;
        border-radius: 5px;
      }
    }
  }
  .liner{
    width:100%;
    height:10px;
    background-color:#f5f5f5;
  }
  .toubaoren{
    li:last-child{border-bottom: none;}
    li.linearFirst{
      height:10px;
      margin:0;
      background-color: hsl(210, 29%, 95%);
      border-bottom:none;
    }
    li{
     border-bottom: 1px solid hsl(0, 0%, 93%);
     height:40px;
     line-height: 40px;
     position: relative;
     margin: 0 10px;
     span{font-size: 16px;}
     .rightFace{
       position: absolute;
       right:0px;
       top:13px;
       line-height: normal;
       input{
         text-align: right;
         display: inline-block;
         text-indent: 2px;
         color: hsl(0, 0%, 0%);
       }
       .icon{
         color: hsl(0, 100%, 50%);
         font-size: 20px;
         vertical-align: middle;
       }
     }
   }
   .insuranceNow{
     height: 45px;
     line-height: 45px;
     display: flex;
     justify-content: space-between;
     i{font-size:16px;}
     div{line-height: 40px;}
   }
  }
  .endReigest{
    text-align:center;
    background-color: #f5f5f5;
    padding:10px 0;
  }
  .creditData{
    margin-left: 5%;
    background: #fff;
    table{
      margin-left:10px;
      margin-top: 16px;
      margin-bottom: 10px;
      width: 90%;
      tr{
        height: 40px;
        line-height: 24px;
        border-bottom: 1px solid #ebebeb;
        td:nth-child(1){
          font-size: 16px;
          text-align: center;
          color:#fff;
          width: 40%;
          background-color:#169bd5;
          vertical-align: middle;
        }
        td:nth-child(2){
          font-size: 16px;
          text-align: center;
          color:#252525;
          background-color:#e4e4e4;
          vertical-align: middle;
        }
      }
    }
  }
  </style>
