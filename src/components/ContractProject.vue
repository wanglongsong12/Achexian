<template lang="html">
  <div class="ContractProject">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click.stop="gobackbao"></i>
      <span class="registerText">承保方案</span>
    </div>
    <div class="linear"></div>
    <ul class='InputMessage'>
      <li>
        <div class="contet">
          <span class="nav">投保地区</span>
          <el-select v-model="cityment" @change="switCity(cityment)">
            <el-option v-for="(item,index) in cityList" :label="item.cityName":key="item.cityName" :value="item.cityName"></el-option>
          </el-select>
        </div>
        <div class="contet">
          <span class="nav">车价</span>
          <div class="dataFirst">
            <span>{{carPrice}}</span>
            <span>万</span>
          </div>
        </div>
      </li>
      <li>
        <div class="contet">
          <span class="nav" style="margin-left: 13px;">座位数</span>
          <el-select  v-model="seatNum" @change="switSeat(seatNum)">
            <el-option size=small  v-for="(item,index) in seatNumList":key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="units" @change="switSeat(seatNum)">座</span>
        </div>
        <div class="contet">
          <span class="nav">排量</span>
          <el-select  v-model="displacement" @change="switLitre(displacement)">
            <el-option size=small  v-for="(item,index) in displacementList" :label="item.value" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="unitSecond">升</span>
        </div>
      </li>
    </ul>
    <div class="opacaty">
      <p>{{MainCompanyName}}</p>
      <el-select v-model="reCompanyName"  placeholder="请选择" @change="chooseCompId">
        <el-option v-for="item in subCompanyName"  :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="lineCont"><div></div></div>
    <div class="insure">
      <span class="fl">
        <i class="i2"></i>
        <span>大众投保率</span>
      </span>
      <span class="fr AllCoverage" @click="AllXian">
        <i class="i1 iconfont icon-103-copy" :class="{i3:selectI3==1}"></i>
        <span class="opacatyLevel">全险</span>
      </span>
    </div>
    <ul class="table">
      <li class="backImg" v-for="(item,index) in insListOption" @click = "trickInsList(index,item)">
        <span v-show="item.insCode=='JQX'"class="iconfont icon-jiaoqiangxian"></span>
        <span v-show="item.insCode=='A'"  class="iconfont icon-zhisuncheguanli"></span>
        <span v-show="item.insCode=='B'"  class="iconfont icon-pengzhuangbaojing"></span>
        <span v-show="item.insCode=='C'"  class="iconfont icon-dao"></span>
        <span v-show="item.insCode=='SCX'"  class="iconfont icon-siji"></span>
        <span v-show="item.insCode=='F'"  class="iconfont icon-679ranshao"></span>
        <span v-show="item.insCode=='G'"  class="iconfont icon-car_SFontCN"></span>
        <span v-show="item.insCode=='H'"  class="iconfont icon-fadongji"></span>
        <span v-show="item.insCode=='I'"  class="iconfont icon-diandongchechuang"></span>
        <span v-show="item.insCode=='Z'"  class="iconfont icon-diandongchechuang"></span>
        <p>
          <label>{{item.insName}}</label>
          <label @click="switmetre(index,item.amount)">{{item.defaultAmount}}</label>
        </p>
        <i v-show="item.insueredPercentage">{{item.insueredPercentage}}</i>
      </li>
    </ul>
      <div class="bottom" v-show="disable">
        <button class="register" type="button" name="button"@click="checkQuote">查看报价</button>
      </div>
      <div class="bottom" v-show="!disable">
        <button class="register" style="background: hsl(0, 0%, 80%);border-bottom: none"@click="checkQuote" :disabled="true">查看报价</button>
      </div>
      <div class="premiumDetail" v-show="show">
        <div style="height:10px;background-color:hsl(0, 0%, 96%)"></div>
        <div class="premiumHead">
          <span class="registerText">保费详情</span>
          <i class="calculator iconfont icon-TFDD-" @click='Prcal' v-show="quoteInsList"></i>
        </div>
        <div class="lineSecond"></div>
        <ul class="insureDate">
          <li>
            <span class="fl insureFirst">交强险</span>
            <div class="fr date">
              <i class="rili iconfont icon-rili"></i>
              <span class="dateSecond">
                <span>{{ciStartDate}}</span>
                至
                <span>{{ciEndDate}}</span>
              </span>
            </div>
          </li>
          <li>
            <span class="fl insureFirst">商业险</span>
            <div class="fr date">
              <i class="rili iconfont icon-rili"></i>
              <span class="dateSecond">
                <span><yd-datetime  type="date" v-model="biStartDate" slot="right"></yd-datetime></span>
                至
                <span>{{biEndDate}}</span>
              </span>
            </div>
          </li>
        </ul>
        <ul class="insureCarear">
          <li v-for="(item,index) in insureType" :class="{i4:selecteSecd==index}"@click="switThree(index)">{{item}}</li>
        </ul>
        <div class="insListShowTol">
          <ul class="insListShowA">
            <li v-for="item in insList">
              <span class="insName" style="background-color:#40c6b2;color:#fff;" v-show="item.insCode=='JQX'||item.insCode=='CCX'">
                <i v-show="item.insCode=='JQX'"class="iconfont icon-jiaoqiangxian"></i>
                <i v-show="item.insCode=='CCX'"  class="iconfont icon-diandongchechuang"></i>
                <span>{{item.insName}}</span>
              </span>
              <span class="insName" style="background-color:#5a90e6;color:#fff;" v-show="item.insCode!='JQX'&&item.insCode!='CCX'">
                <i v-show="item.insCode=='A'"  class="iconfont icon-zhisuncheguanli"></i>
                <i v-show="item.insCode=='B'"  class="iconfont icon-pengzhuangbaojing"></i>
                <i v-show="item.insCode=='C'"  class="iconfont icon-dao"></i>
                <i v-show="item.insCode=='SCX'"  class="iconfont icon-siji"></i>
                <i v-show="item.insCode=='F'"  class="iconfont icon-679ranshao"></i>
                <i v-show="item.insCode=='G'"  class="iconfont icon-car_SFontCN"></i>
                <i v-show="item.insCode=='H'"  class="iconfont icon-fadongji"></i>
                <i v-show="item.insCode=='I'"  class="iconfont icon-diandongchechuang"></i>
                <i v-show="item.insCode=='Z'"  class="iconfont icon-diandongchechuang"></i>
                <span>{{item.insName}}</span>
              </span>
              <span class="insName">{{item.premium}}元</span>
            </li>
            <li>
              <span class="insName"><i></i><span>签单保费</span></span>
              <span class="insName">{{quoteList.totalPremium}}元</span>
            </li>
          </ul>
          <ul class="insListShowB">
            <li>
              <span class="span1">折扣</span>
              <span class="span2">{{quoteList.syxRebate}}</span>
              <span class="span3">标准保费</span>
              <span class="span4">{{quoteList.standartPremium}}元</span>
            </li>
            <li v-show ="syxUserFeeRatio||jqxUserFeeRatio" >
              <span class="span1">返点</span>
              <span class="span2" v-show="!jqxSyc">{{jqxUserFeeRatio}}</span>
              <span class="span2"  v-show="jqxSyc">{{syxUserFeeRatio}}</span>
              <span class="span3">实收保费</span>
              <span class="span4">{{quoteList.carDealerPurePremium}}元</span>
            </li>
          </ul>
        </div>
          <div class="premiumEnd">
            <mt-button type="primary" v-show="quoteInsList" @click="confirmBuy">确认购买</mt-button>
            <mt-button type="primary" v-show="quoteInsListFirst" @click='recalculate'>重新计算</mt-button>
            <mt-button type="primary" v-show="quoteInsDate" @click='recalbaojia'>重新报价</mt-button>
            <mt-button type="primary" v-show="quoteInsList" @click='sendquote'>发送报价</mt-button>
          </div>
          <div class="Mcover" v-show="showNote||showCalc">
            <div class="imagePictureSecond" v-show="showNote">
              <div class="Prcal"><span>发送报价短信</span></div>
              <ul>
                <li class="phoneNoP">
                  <span style="padding-left:20px;">手机号：</span>
                  <input  type='tel' v-model="phoneNo">
                </li>
              </ul>
              <mt-button type="primary" @click="sendMessage">发送</mt-button>
            </div>
            <span class="guanbi">
              <i class="iconfont icon-guanbi" @click='send' v-show="showNote"></i>
            </span>
            <div class="imagePictureFirst" v-show="showCalc">
              <div class="Prcal"><span>保费计算器</span></div>
              <ul>
                <li class="phoneNoP">
                  <span>签单保费: </span>
                  <span class="phoneNoPFirst">{{quoteList.totalPremium}}</span>
                </li>
                <li class="phoneNoP">
                  <p v-show="!jqxSyc">
                    <span>车商佣金: </span>
                    <span>{{CarDealerFee}}  {{quoteList.jqxCarDealerFeeRatio}}%</span>
                  </p>
                  <p v-show="jqxSyc">
                    <span>车商佣金: </span>
                    <span>{{CarDealerFee}} &nbsp  &nbsp {{quoteList.syxCarDealerFeeRatio}}%</span>
                  </p>
                  <p><span>车商实缴: </span>
                  <span class="phoneNoPFirst">{{quoteList.carDealerPurePremium}}</span></p>
                </li>
                <li class="phoneNoP">
                  <p>
                    <span>客户优惠: </span>
                    <span>{{carDealerDiscounts}}</span>
                  </p>
                  <p v-show="!jqxSyc">
                    <span>客户返点: </span>
                    <input v-model="jqxUserFeeRatio">
                    <span class="phoneNoPFirst">{{quoteList.jqxCarDealerFeeRatio}}</span>
                  </p>
                  <p v-show="jqxSyc">
                    <span>客户返点: </span>
                    <input type="tel" v-model="syxUserFeeRatio"></input>
                    <span class="phoneNoPFirst">{{quoteList.syxCarDealerFeeRatio}}</span>
                  </p>
                  <p><span>客户实缴: </span>
                  <span class="phoneNoPFirst">{{carDealerToken}}</span></p>
                </li>
                <li class="phoneNoP">
                  <span>车商净利: </span>
                  <span class="phoneNoPFirst">{{carDealerProfit}}</span>
                </li>
              </ul>
              <mt-button type="primary" @click='calculate'>确定</mt-button>
            </div>
            <span class="guanbi">
              <i class="iconfont icon-guanbi" @click='calculate' v-show="showCalc"></i>
            </span>
          </div>
        </div>
      <mt-actionsheet :actions= "data" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
import {MessageBox,Toast } from 'mint-ui';
import {reminderOther,getAxios,formatDate} from '../domain.js'
export default {
  destroyed(){this.popImage= ''},
  data(){
    return {
      port:'',
      carId:'',
      applyId:'',
      applyIdFirst:'',//保存订单查询过来的信息
      applyDate:'',
      appstate:'',
      addFlag:0,
      idx:'',//当前选择索引的险别
      data: [],//action sheet 的配置
      dataAmount:[],//加入不投保之后的数字
      sheetVisible: false,// 操作sheetVisible可以控制显示与隐藏
                                    // 第一部分
      cityList:[],//所有的城市
      cityment:'',//当前选的城市
      citymentFirst:'',//后台传的默认城市数据
      cityId:'',//当前选的城市Id

      carPrice:'',//车辆价格
      seatNumList:[],//所有的座位数
      seatNum:'',//当前选的座位数
      seatNumFirst:'',//后台传的默认座位数据

      displacementList:[],//所有的排量值
      displacement:'',//当前选的排量值
      displacementFirst:'',//后台传的默认排量数据

      selectI3:1,//控制全险那个按钮
      MainCompanyName:'',//置顶保险公司名称     // 第二部分
      reCompanyName:'',//推荐保险公司
      subCompanyName:[],//不推荐主险公司
      insuranceCompany:[],//所有的保险信息
      insuranceCuan:[],//传的数据

      insListOption:[],//险别信息
      insListOptionAll:[],//再点一次返回上一层
      insListOptionSource:[],//复制险别信息，供全险使用
      insListCuan:[],

      quoteList:{},
      quoteListFirst:[],
      quoteListSecond:[],
      ciStartDate:'',//交强险起期
      ciEndDate:'',//交强险止期
      biStartDate:'',//商业险起期
      biStartDateFirst:"",//模拟
      biStartDateSecond:'',//用于判断是否日期发生改变
      biEndDate:'',//商业险止期
      insureType:[],//Tab选项卡数据
      insList:[],//Tab选项卡下面的数据
      show:false,//显示报价下方内容
      jqxSyc:true,//判断商业险和交强险
      quoteInsDate:false,
      quoteInsList:true,
      quoteInsListFirst:false,
      dataABC:1,//用于监控重新计算等按钮数据是否改变
      jqxUserFeeRatio:'',//交强险返点
      syxUserFeeRatio:'',//商业险返点
      carDealerDiscounts:'0',//客户优惠
      carDealerToken:'',//客户实缴
      carDealerProfit:'',//车商净利
      CarDealerFee:'',//车商佣金
      selecteSecd:0,//判断i4
      showNote:false,//显示发送短信
      showCalc:false,//显示计算器
      phoneNo:'',//电话号码
      disable:true,//查看报价的2种状态
      popImage:''//控制从订单进报价还是从报价进报价
    }
  },
  watch:{
    "biStartDate":'dataToatl',
    "biStartDateSecond":'recodeAgain',
    "syxUserFeeRatio":'PrcalFirst',
    "popImage":"backtrack",
    "port":"checkPort",
    "showNote":'bbbbb',
    "showCalc":'aaaaa'
  },
  methods:{
    send(){this.showNote=false;},//发送报价下面X时候关闭
    calculate(){this.showCalc=false;},//点击计算器确定时取消
    gobackbao(){history.go(-1);this.popImage=1;},//返回键
    gopageAbc(e){var url = "/" + e;this.$router.push({path: url});},//调整路由
    checkPort(){if(this.port>3||this.port==3){this.$indicator.close()}},//刚进入承保公司页面加载3个接口关闭圈
    bbbbb(){if(this.showNote==false){this.popImage = 1;}},//控制发送报价安卓体验
    aaaaa(){if(this.showCalc==false){this.popImage = 1;}},//控制计算器安卓体验
    sendquote(){//发送信息弹框
      this.showNote=true;
      this.popImage = '';
      history.pushState(null, null, location.href);
    },
    Prcal(){//计算器弹框
      this.CarDealerFee = (this.quoteList.totalPremium - this.quoteList.carDealerPurePremium).toFixed(2);
      this.carDealerToken=this.quoteList.totalPremium;//默认等于全保额
      this.carDealerProfit = (this.CarDealerFee - this.carDealerDiscounts).toFixed(2);
      this.showCalc=true;
      this.popImage = '';
      history.pushState(null, null, location.href);
    },
    backtrack(){//安卓体验
      var that = this;
      window.onpopstate=function(){
        if(that.popImage == 1){
          history.go(-1);
        }else{
          that.showNote=false;
          that.showCalc=false;
        }
      }
    },
    copyArr(arr){//深拷贝所有险别信息
      return arr.map((e)=>{
        if(typeof e === 'object'){
          return Object.assign({},e)
        }else{return e}
      })
    },
    AllXian(){//点击触发全险
      if(this.addFlag%2==1){
        this.applyIdFirst=this.$route.query.applyId;
      }else{
        this.applyIdFirst = '';
      }
      if(this.selectI3 == 2){
        this.selectI3 = 1;
        this.insListOptionAll = this.copyArr(this.insListOption);
        this.insListOption = this.copyArr(this.insListOptionSource);
      }else if(this.selectI3 == 1){
        this.selectI3 = 2;
        this.insListOption = this.copyArr(this.insListOptionAll);
      }
      this.addFlag+=1;
      this.AllcheckInfo(this.insListOption);
      if(this.insListCuan){this.insListjdg();}
    },
    chooseCompId(){//判断是否选择保险公司传给后台
      var that = this;var listFir;var listSec;
      listFir = this.insuranceCompany.filter(function(value, index, array){
        return value.companyName==that.MainCompanyName;
      });
      listSec = this.insuranceCompany.filter(function(value, index, array){
        return value.companyName==that.reCompanyName;
      });
      if(this.insuranceCuan.indexOf(listFir[0].companyId)==-1){
        this.insuranceCuan.push(listFir[0].companyId);
      }
      if(this.insuranceCuan.indexOf(listSec[0].companyId)==-1){
        this.insuranceCuan.push(listSec[0].companyId);
      }
    },
    recodeAgain(){//是否显示重新计算等按钮
      if(this.show){
        if(this.dataABC==2){
          this.quoteInsList =false;
          this.quoteInsListFirst =true;
        }else{
          this.quoteInsList =true;
          this.quoteInsListFirst =false;
        }
      }
    },
    switCity(val){//城市信息
      for(var i=0;i<this.cityList.length;i++){
        if(this.cityList[i].cityName == val){
          this.cityId =this.cityList[i].cityId;
        }
      }
      if(val!=this.citymentFirst){this.dataABC = 2;}
      else{this.dataABC = 1;}
      this.getCompanyList(this.cityId);
      this.recodeAgain();
    },
    switSeat(val){//座位信息
      this.seatNum = val;
      if(val!=this.seatNumFirst){this.dataABC = 2;}
      else{this.dataABC = 1;}
      this.recodeAgain();
    },
    switLitre(val){//排量信息
      this.displacement = val;
      if(val!=this.displacementFirst){this.dataABC = 2;}
      else{this.dataABC = 1;}
      this.recodeAgain();
    },
    switmetre(index,amountVal){//险别下面的下拉框
      this.idx = index;
      this.data = [];
      this.dataAmount = [];
      if(amountVal.length==0){this.sheetVisible=false;}else{
        for(var i=0;i<amountVal.length;i++)
        this.dataAmount.push(amountVal[i]);
        this.dataAmount.push('不投保');
        for(var i=0;i<this.dataAmount.length;i++){
          this.data.push({
            name: this.dataAmount[i],
            method : this.getCamera,// 调用methods中的函数
            index:index
          })
        }
        this.sheetVisible = true;
      }
    },
    getCamera:function(val){
      if(this.applyIdFirst){
        if(val.name=='不投保'){
          this.insListOption[this.idx].defaultSelected = 0;
          this.insListOption[val.index].defaultAmount= this.insListOption[this.idx].defaultAmount;
        }else{
          this.insListOption[this.idx].defaultSelected = 1;
          this.insListOption[val.index].defaultAmount  =val.name;
          var count = 0;
          for(var i = 0;i<this.insListOption.length;i++){
            if(this.insListOption[i].defaultAmount==this.insListOptionSource[i].defaultAmount){
              count++;
            }else{break;}
          }
            if(count==this.insListOption.length){this.selectI3 = 1;}else{this.selectI3 = 2;}
            if(this.insListCuan){this.insListjdg();}
          }
        }else{
          if(val.name=='不投保'){
            this.insListOption[this.idx].allInsSelectedFlag = 0;
            this.insListOption[val.index].defaultAmount= this.insListOption[this.idx].defaultAmount;
          }else{
            this.insListOption[this.idx].allInsSelectedFlag = 1;
            this.insListOption[val.index].defaultAmount  =val.name;
            var count = 0;
            for(var i = 0;i<this.insListOption.length;i++){
              if(this.insListOption[i].defaultAmount==this.insListOptionSource[i].defaultAmount){
                count++;
              }else{break;}
            }
            if(count==this.insListOption.length){this.selectI3 = 1;}else{this.selectI3 = 2;}
            if(this.insListCuan){this.insListjdg();}
          }
        }
      this.trickInsListFirst();
    },
    PrcalFirst(){//防止客户返点超过指定
      if(this.syxUserFeeRatio>=0&&this.syxUserFeeRatio<=this.quoteList.syxCarDealerFeeRatio){
        this.carDealerDiscounts = (this.quoteList.totalPremium * this.syxUserFeeRatio/100).toFixed(2);
        this.carDealerToken = (this.quoteList.totalPremium - this.carDealerDiscounts).toFixed(2);
        this.carDealerProfit = (this.CarDealerFee - this.carDealerDiscounts).toFixed(2);
      }else{alert('你输入的超过了范围')}
    },
    AllcheckInfo(result){  // 选中险别信息
      for(let i=0;i<result.length;i++){
        if(this.applyIdFirst){
          if(result[i].defaultSelected==1){
            document.querySelectorAll('.backImg')[i].classList.add("on");
          }else if(result[i].defaultSelected==0){
            document.querySelectorAll('.backImg')[i].classList.remove("on");
          }
      }else{
        if(result[i].allInsSelectedFlag==1){
          document.querySelectorAll('.backImg')[i].classList.add("on");
        }else if(result[i].allInsSelectedFlag==0){
          document.querySelectorAll('.backImg')[i].classList.remove("on");
        }
      }
    }
  },
  trickInsList(index,item){//选中险别信息，并且触发保费
    if(this.applyIdFirst){
      if(item.amount.length==0){
        if(this.insListOption[index].defaultSelected == 0){
          this.insListOption[index].defaultSelected = 1;
        }else{
          this.insListOption[index].defaultSelected = 0;
        }
        this.insListOption[index].defaultAmount= this.insListOption[index].defaultAmount;
      }else{
        this.switmetre(index,item.amount)
      }
    }else{
      if(item.amount.length==0){
        if(this.insListOption[index].allInsSelectedFlag == 0){
          this.insListOption[index].allInsSelectedFlag = 1;
        }else{
          this.insListOption[index].allInsSelectedFlag = 0;
        }
        this.insListOption[index].defaultAmount= this.insListOption[index].defaultAmount;
      }else{
        this.switmetre(index,item.amount)
      }
    }
    this.trickInsListFirst();
  },
  trickInsListFirst(){//判断全险点亮标志，以及是否重新计算
    var count = 0;
    for(var i = 0;i<this.insListOption.length;i++){
      if(this.applyIdFirst){
        if(this.insListOption[i].defaultSelected==this.insListOptionSource[i].defaultSelected
          &&this.insListOption[i].defaultAmount==this.insListOptionSource[i].defaultAmount){
              count++;
        }else{break;}
      }else{
        if(this.insListOption[i].allInsSelectedFlag==this.insListOptionSource[i].allInsSelectedFlag
          &&this.insListOption[i].defaultAmount==this.insListOptionSource[i].defaultAmount){
              count++;
        }else{break;}
      }
    }
    if(count==this.insListOption.length){
      this.selectI3 = 1;
      this.dataABC = 1;
    }else{
      this.selectI3 = 2;
      this.dataABC = 2;
    }
    this.AllcheckInfo(this.insListOption);
    if(this.dataABC == 1){this.insListjdg();}
    if(this.dataABC == 2)this.recodeAgain();
  },
  insListjdg(){//判断是不是要重新计算
    var that = this;
    var count = 0;
    var listSec;
    if(this.applyIdFirst){
      for(var i = 0;i<that.insListOption.length;i++){
        if(that.insListOption[i].defaultSelected==1){
          count++;
        }
      }
    }else{
      for(var i = 0;i<that.insListOption.length;i++){
        if(that.insListOption[i].allInsSelectedFlag==1){
          count++;
        }
      }
    }
    for(var i = 0;i<that.insListCuan.length;i++){
      if(count!=that.insListCuan.length){
        this.dataABC=2;
        break;
      }else{
        listSec = that.insListOption.filter(function(value, index, array){
            return value.insCode==that.insListCuan[i].insCode;
        });
        if(this.insListCuan[i].amount!=listSec[0].defaultAmount){
          this.dataABC=2;
          break;
        }else{
          this.dataABC=1;
        }
      }
    }
    this.recodeAgain();
  },
  switThree(index){//下面的置顶和非置顶选择
    this.selecteSecd =index;
    if(index == 0){
      this.quoteList  =  this.quoteListFirst;
    }else if(index == 1){
      if( this.quoteListSecond.state=='02'){
        reminderOther(this.quoteListSecond.message);
        this.selecteSecd = 0;
      }else{
        this.quoteList  =  this.quoteListSecond;
      }
    }
    this.insList = [];
    for(var j = 0;j<this.quoteList.insList.length;j++){
      this.insList.push(this.quoteList.insList[j])
    }
  },
  dataToatl(){//日期
    var a = parseInt(this.biStartDate.slice(0,4))+1;
      this.biEndDate = a +  this.biStartDate.slice(4,10);
      this.biStartDateSecond=this.biStartDate.split('-').join('')
      if(this.biStartDateSecond==this.biStartDateFirst){
        this.dataABC = 1;
      }else{
        this.dataABC = 2;
      }
  },
  quoteBase:function(){   // 基本信息接口
    var that = this;
    this.$indicator.open({
     text: '加载中...',
     spinnerType: 'fading-circle'
    });
    var cuanData = JSON.stringify({"carId":that.carId});
    getAxios('quote/getBaseInfo.json',cuanData).then((data) => {
     if (data.code == '0000'){
      that.cityList=data.result.cityList;//城市列表
      that.cityId=data.result.cityList[0].cityId;//城市列表
      that.cityment= that.cityList[0].cityName;
      that.seatNumList = data.result.seatNumList;//座位数列表
      that.seatNum =   that.seatNumList[0].value;
      that.carPrice = data.result.carPrice;//车辆指导价
      that.displacementList =  data.result.displacementList;//排量列表
      that.displacement =   that.displacementList[0].value;
      that.port++;
    }
  },(err) => {
      that.$indicator.close();
    })
  },
  getCompanyList:function(valcode){      //保险公司
    var that = this;
    that.subCompanyName =[];
    that.insuranceCompany = [];
    that.reCompanyName = '';
    that.MainCompanyName = '';
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    var cuanData =JSON.stringify({"cityId":valcode});
    getAxios('base/getCompanyList.json',cuanData).then((data) => {
      if(data.code == '0000'){
        that.insuranceCompany = data.result;
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].state == '01'){
            that.MainCompanyName=data.result[i].companyName;
          }else if(data.result[i].state == '02'){
            that.reCompanyName=data.result[i].companyName;
          }else if(data.result[i].state == '03'){
            that.subCompanyName.push(data.result[i].companyName)
          }
        }
      that.chooseCompId(that);
      that.port++;
     }
    },(err) => {
      that.$indicator.close();
    })
  },
  checkInfoQuery:function(){// 险别信息
  var that = this;
  var cuanData = '';
  that.insListOption = [];
  this.$indicator.open({
   text: '加载中...',
   spinnerType: 'fading-circle'
  });
  getAxios('/base/getInsList.json',cuanData).then((data) => {
    if (data.code == '0000'){
      for(var i =0;i<data.result.length;i++){
        that.insListOption.push(data.result[i]);

        if(data.result[i].amount){
          data.result[i].amount=data.result[i].amount.split('|')
        }else{
          data.result[i].amount = [];
        }
      }
      setTimeout(function(){that.AllcheckInfo(data.result);},0);
      that.insListOptionSource =that.copyArr(that.insListOption);
      that.insListOptionAll =that.copyArr(that.insListOption);
      that.port++;
     }
   },(err) => {
     that.$indicator.close();
   })
  },
  nextInsure(data){
    var that = this;
    for(var i = 0;i<data.result.quoteList.length;i++){
      if(data.result.quoteList[i].activeFlag=='0'){
        that.quoteListSecond = data.result.quoteList[i];
      }else if(data.result.quoteList[i].activeFlag=='1'){
        that.quoteListFirst = that.quoteList = data.result.quoteList[i];
        this.insList = [];
        for(var j = 0;j<that.quoteListFirst.insList.length;j++){
          this.insList.push(that.quoteListFirst.insList[j]);
        }
      }
      that.insureType.push(data.result.quoteList[i].companyName);
    }
    that.ciStartDate =formatDate(data.result.ciStartDate);
    that.ciEndDate =formatDate(data.result.ciEndDate);
    that.biStartDate =formatDate(data.result.biStartDate);
    that.biStartDateFirst = data.result.biStartDate;
  },
  preinsListCuan(){
    var that = this;
    that.insListCuan=[];
    if(this.applyIdFirst){
      var a={'insCode':'',"amount":'',"mpFlag":''};
      for(var i=0;i<this.insListOption.length;i++){
        if(this.insListOption[i].defaultSelected==1){
          a={'insCode':'',"amount":'',"mpFlag":''};
          a.insCode = this.insListOption[i].insCode;
          a.mpFlag = this.insListOption[i].mpFlag;
          a.amount = this.insListOption[i].defaultAmount;
          that.insListCuan.push(a);
        }
      }
    }else{
      var a={'insCode':'',"amount":'',"mpFlag":''};
      for(var i=0;i<this.insListOption.length;i++){
        if(this.insListOption[i].allInsSelectedFlag==1){
          a={'insCode':'',"amount":'',"mpFlag":''};
          a.insCode = this.insListOption[i].insCode;
          a.mpFlag = this.insListOption[i].mpFlag;
          a.amount = this.insListOption[i].defaultAmount;
          that.insListCuan.push(a);
        }
      }
    }
  },
  checkQuote(){  // 提交报价
    var that = this;
    that.insListCuan=[];
    this.$indicator.open({
     text: '加载中...',
     spinnerType: 'fading-circle'
   });
  that.preinsListCuan();
  that.seatNumFirst =  that.seatNum;
  that.displacementFirst =  that.displacement;
  that.citymentFirst =  that.cityment;
  var cuanData = JSON.stringify({
    "cityId":that.cityId,
    "carId":that.carId,
    "carPrice":that.carPrice,
    "seatNum":that.seatNum,
    "displacement":that.displacement,
    "companyList":that.insuranceCuan,
    "insList":that.insListCuan
  })
 getAxios('quote/doQuote.json',cuanData).then((data) => {
  if(data.code == '0000'){
    that.disable =false;
    that.nextInsure(data);
    that.applyId = data.result.applyId;
    that.show = true;
    setTimeout(function(){window.scrollTo(100,610)},0);
    that.$indicator.close();
    }else if(data.code == '0003'){
        reminderOther(data.message);
        that.$indicator.close();
      }
    },(err) => {
      that.$indicator.close();
    })
  },
  sendMessage(){       //  发送短信
    var that = this;
    this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
     var cuanData =JSON.stringify({
       "phoneNo":that.phoneNo,
       "quotedId":that.quoteList.quoteId
     })
      getAxios('base/sendSms.json',cuanData).then((data) => {
        if (data.code == '0000'){
          that.$indicator.close();
          that.showNote= false;
         }
       },(err) => {
        that.$indicator.close();
      })
    },
  recalculate(){        // 重新计算
    this.syxUserFeeRatio = '';
    this.jqxUserFeeRatio ='';
    this.applyIdFirst = '';
    var that = this;
    this.$indicator.open({
     text: '加载中...',
     spinnerType: 'fading-circle'
    });
    that.preinsListCuan();
    var cuanData =JSON.stringify({
      "applyId":that.applyId,
      "biStartDate":that.biStartDateFirst,
      "cityId":that.cityId,
      "seatNum":that.seatNum,
      "displacement":that.displacement,
      "companyList":that.insuranceCuan,
      "insList":that.insListCuan
    })
   getAxios('quote/recalculate.json',cuanData).then((data) => {
    if (data.code == '0000'){
      that.nextInsure(data);
      that.quoteInsDate = false;
      that.quoteInsList=true;
      that.quoteInsListFirst=false;
      that.$indicator.close();
   }
   },(err) => {
    that.$indicator.close();
  })
  },
  confirmBuy(){    //  确认购买
    var that = this;
    this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
     var cuanData = JSON.stringify({
       "quoteId":that.quoteList.quoteId,//报价单Id
       "jqxUserFeeRatio":that.jqxUserFeeRatio,//交强险返点
       "syxUserFeeRatio":that.syxUserFeeRatio//商业险返点
     });
		getAxios('quote/confirmBuy.json',cuanData).then((data) => {
     if (data.code == '0000'){
       that.$store.commit('confirm',data.result);
       that.popImage = '';
       that.gopageAbc('FillOrder');
       that.$indicator.close();
        }
      },(err) => {
         that.$indicator.close();
     })
   },
  getInfo(){      // 订单基本信息查询
    var that = this;
    var newDate = new Date();
    newDate = newDate.getFullYear().toString()+(newDate.getMonth()+1).toString()+newDate.getDate().toString()
    if(newDate-that.applyDate>=1){
        that.quoteInsDate = true;
        that.quoteInsList = false;
        that.quoteInsListFirst = false;
    }
    this.$indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
     });
     var cuanData =JSON.stringify({"applyId":that.applyId});
			getAxios('quote/getInfo.json',cuanData).then((data) => {
     if (data.code == '0000'){
       if(that.appstate == '01'){that.show = false;}
       if(that.appstate == '02'){that.show = true;}
       that.disable = false;
       that.cityList=data.result.cityList;//城市列表
       that.cityId=data.result.cityList[0].cityId;//城市列表
       that.cityment= that.cityList[0].cityName;
       that.seatNumList = data.result.seatNumList;//座位数列表
       that.seatNum =   that.seatNumList[0].value;
       that.carPrice = data.result.carPrice;//车辆指导价
       that.displacementList =  data.result.displacementList;//排量列表
       that.displacement =   that.displacementList[0].value;
       for(var i=0;i<data.result.quoteList.length;i++){
         if(data.result.quoteList[i].state == '01'){
           that.MainCompanyName=data.result.quoteList[i].companyName;
         }else if(data.result.quoteList[i].state == '02'){
           that.reCompanyName=data.result.quoteList[i].companyName;
         }else if(data.result.quoteList[i].state == '03'){
           that.subCompanyName.push(data.result.quoteList[i].companyName)
         }
       }
       for(var i =0;i<data.result.planInsList.length;i++){
           that.insListOption.push(data.result.planInsList[i]);
         if(data.result.planInsList[i].amount){
           data.result.planInsList[i].amount=data.result.planInsList[i].amount.split('|')
         }else{
           data.result.planInsList[i].amount = [];
         }
       }
     setTimeout(function(){
       that.insListOption = data.result.planInsList;
       that.insListOptionSource = that.copyArr(that.insListOption);
       that.insListOptionAll =that.copyArr(that.insListOption);
       that.trickInsListFirst();
     },0);
     that.nextInsure(data);
     that.seatNumFirst =  that.seatNum;
     that.displacementFirst =  that.displacement;
     that.citymentFirst =  that.cityment;
     that.preinsListCuan();
     that.$indicator.close();
      }
    },(err) => {
       that.$indicator.close();
   })
  },
    recalbaojia(){        // 重新报价
      this.syxUserFeeRatio = '';
      this.jqxUserFeeRatio ='';
      this.applyIdFirst = '';
      var that = this;
      this.$indicator.open({
         text: '加载中...',
         spinnerType: 'fading-circle'
       });
        that.preinsListCuan();
        that.biStartDate = formatDate(that.biStartDate);
        var cuanData =JSON.stringify({
          "applyId":that.applyId,
          "biStartDate":that.biStartDateFirst,
          "cityId":that.cityId,
          "seatNum":that.seatNum,
          "displacement":that.displacement,
          "companyList":insurCopId,
          "insList":that.insListCuan
        });
  	 getAxios('quote/reQuote.json',cuanData).then((data) => {
       if(data.code == '0000'){
         that.nextInsure(data);
         that.show = true;
         that.$indicator.close();
       }
     },(err) => {
        that.$indicator.close();
      })
    }
  },
  mounted(){
    var that = this;
    this.popImage = 1;
    if(this.$route.query.carId){//我要报价
      this.carId = this.$route.query.carId;
      this.quoteBase();
      this.checkInfoQuery();
      this.port = 0;
    }else if(this.$route.query.applyId){//订单查询
      this.applyId = this.$route.query.applyId;
      this.applyIdFirst = this.$route.query.applyId;
      this.applyDate = this.$route.query.applyDate;
      this.appstate = this.$route.query.appstate;
      this.port = 3;
      this.getInfo();
    }
  }
}
</script>
<style lang="less">
    .ContractProject{
      .bottom{text-align: center;margin: 10px 0 0 0;}
      .on{background-color: #73a3eb!important;color:#fff;}
      .el-select{width:65px;padding-left: 10px;
      .el-input__icon{width: 20px;}
      .el-input__inner{
        padding-right: 0;
        border:none;
        border-bottom: 1px solid hsl(212, 25%, 80%);
        height: 20px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .lineSecond{
      width: 100%;
      height: 7px;
      background: -webkit-gradient(linear, center top, center bottom,from(hsl(0, 0%, 94%)), to(hsl(0, 0%, 99%)));
    }
    .table{
      overflow: hidden;
      width: 100%;
      background-color: hsl(0, 0%, 96%);
      .backImg{
        width: 23%;
        float: left;
        height: 75px;
        text-align:center;
        background-color: #fff;
        display: inline-block;
        position: relative;
        margin-top: 5px;
        margin-left: 1.6%;
        p{
          display: inline-block;
          padding-top: 5px;}
        span{
          margin-top: 5px;
          display: block;
          font-size: 30px;
        }
      }
      i{
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        color:#fff;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        background-color:#ffa70d;
      }
    }
    .opacaty{
      height:54px;
      background-color:#f5f5f5;
      position: relative;
      .el-input__inner{height: 30px;}
      .el-select-dropdown__empty{display: none;}
      .el-select{
        float: right;
        width: 100px;
        height: 30px;
        margin-top:12px;
        margin-right: 40px;
        color: hsl(206, 100%, 56%);
      }
      p{
        min-width: 100px;
        height: 30px;
        display: inline-block;
        margin-left: 40px;
        margin-top: 12px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
      }
    }
    .lineCont{
      background-color:#f5f5f5;
      width:100%;
      div{
        margin:0 10px;
        height:1px;
        background-color:#dcdcdc;
      }
    }
  .InputMessage{
    padding: 10px 5px 0 5px;
    margin-top: 40px;
    li{
      display: flex;
      height: 30px;
      padding-top: 10px;
      justify-content:space-between;
      .contet:nth-child(1){padding-left: 10px}
      .contet:nth-child(2){padding-right: 10px;min-width: 137px;}
      .contet{position: relative;
      .el-select-dropdown{min-width: 65px!important}
      span{
        color:#888;
        padding-bottom: 5px;
        display: inline-block;
      }
      .nav{
        display: inline-block;
        color:#3f3f3f;
        font-size: 16px;
      }
      .units{
        position: absolute;
        right: 24px;
        top:2px;
        color:#888;
        font-size: 14px;
      }
      .unitSecond{
        position: absolute;
        right: 53px;
        top:2px;
        color:#888;
        font-size: 14px;
      }
      .dataFirst{
          border-bottom: 1px solid hsl(0, 0%, 60%);
          min-width: 65px;
          margin-left: 10px;
          display: inline-block;
          font-size: 14px;
          span:nth-child(1){
            height: 13px;
            text-align:right;
            color:#888;
            padding-right: 2px;
          }
        }
      }
    }
  }
  .insure{
    height: 45px;
    line-height:44px;
    padding: 0 20px;
    background-color: hsl(0, 0%, 96%);
    .AllCoverage{
      padding: 0px 5px;
      margin-left:30px;
      .opacatyLevel{
        color:#474747;
        font-size: 14px;
      }
      .i1{color: hsl(0, 0%, 80%);}
      .i1.i3{color:hsl(211, 100%, 50%);}
    }
    .i2{
      width: 15px;
      height: 15px;
      border-radius: 10px;
      vertical-align: sub;
      display: inline-block;
      background-color:#ffa70d;
    }
  }
  .baoxian1>label{
    width: 75px;
    height: 75px;
    background-color: red;
    flex:1;
  }
  .premiumDetail{
    .premiumHead{
      height: 48px;
      line-height: 48px;
      .calculator{
        float: right;
        font-size: 25px;
        margin-right: 10px;
      }
    }
    .insureDate{
      border-bottom: 1px dashed #eee;
      margin-top: 10px;
      li{
        overflow: hidden;
        margin-bottom: 15px;
      .insureFirst{
          height: 34px;
          line-height: 34px;
          color: #469cfa;
          font-size: 16px;
          margin-left: 20px;
        }
      .date{
          border:1px solid #d2d2d2;
          font-size: 14px;
          margin-right: 20px;
          width: 64%;
          .rili{
            font-size: 22px;
            padding-left: 5px;
            vertical-align: middle;
          }
          .dateSecond{
            height: 34px;
            line-height: 34px;
            margin-right: 1%;
          }
        }
      }
    }
    .insListShowTol{
      padding-left:4%;
      background-color: #eee;
      .insListShowA{
          padding-left: 4%;
          padding-top: 20px;
          background-color: #fff;
          li{
              height: 40px;
              line-height:40px;
              padding-bottom: 10px;
            .insName{
              float: left;
              display: inline-block;
              font-size: 16px;
              width: 48%;
              background-color: #eee;
              text-align: center;
              i{ color:#fff;}
            }
          }
          li>span:nth-child(1){background-color: #40c6b2;color: #fff;}
      }
      .insListShowB{
        padding-left: 4%;
        background-color: #fff;
        li{
          height: 40px;
          line-height:40px;
          padding-bottom: 10px;
          span{
            float: left;
            display: inline-block;
            font-size: 16px;
            text-align: center;
          }
          .span1{
            width: 22%;
            background-color: #5a90e6;
          }
          .span2{
            width: 22%;
            background-color: #eee;
            margin-right: 4%;
          }
          .span3{
            width: 23%;
            background-color:#eee;
            border-right: 1px solid #fff;
          }
          .span4{
            width: 24%;
            background-color:#eee;
          }
        }
      }
    }
    .insureCarear{
      overflow: hidden;
      height: 44px;
      line-height: 57px;
      padding-top: 20px;
      background: #f5f5f5;
      li{
        float:left;
        width: 32%;
        text-align: center;
        height: 43px;
        line-height: 43px;
        color: hsl(0, 0%, 100%);
        background-color: #dbdbdb;
        margin-left: 10%;
        font-size: 15px;
      }
      li.i4{
        background-color: #fff;
        color: #5890e3;
      }
    }
    .premiumEnd{
      text-align: center;
      margin: 10px 0;
    }
  }
  .Prcal{
      width:100%;
      height: 40px;
      line-height: 40px;
      text-align:center;
      font-size:18px;
      color:#fff;
      border-bottom: 1px solid #ccc;
      background-color: #5a90e6;
  }
  .Mcover {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    .guanbi{
      display: block;
      text-align: center;
      i{
        font-size: 48px;
        color:#fff;
      }
    }
    .mint-button--normal{
      margin-left: 50%;
      transform: translateX(-56px);
      width: 112px;
      height: 37px;
      border-radius: 5px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .imagePictureSecond{
      width: 70%;
      margin-top: 30%;
      margin-left: 15%;
      background-color: #edf1f5;
      cursor: move;
      font-size: 16px;
      input{
        width: 140px;
        height: 20px;
        border: 1px solid #d2d2d2;
      }
      .phoneNoP{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
      }
    }
    .imagePictureFirst{
      width: 65%;
      margin: 20% 0 0 17%;
      background-color: #fff;
      cursor: move;
      font-size: 16px;
      .phoneNoP{
        line-height: 30px;
        background: #fff;
        margin: 0 20px;
        border-bottom:1px solid #a0a0a0;
        .phoneNoPFirst{font-size: 14px;}
        span:nth-child(1){
          font-size: 16px;
          color:#363636;
        }
        input{
          width: 40px;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: right;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
