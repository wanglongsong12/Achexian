  <template lang="html">
    <div class="AarDeatil">
      <div class="login2">
        <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
        <span class="registerText">车辆详情</span>
      </div>
      <p class="takeStuts"></p>
      <div class="Mcover">
        <div class="option">
          <span class="carLogo"><span class="carMark iconfont"></span></span>
          <div class="optionStatus">
            <table>
              <tr>
                <td class="boldFirst">车牌号码</td>
                <td class="boldSecond">
                  <input type="text"  readonly="readonly"  v-model="carList.licenseNo">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车架号码</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.vin">
                </td>
              </tr>
              <tr>
                  <td class="boldFirst">发动机号</td>
                  <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.engineNo">
                  </td>
              </tr>
              <tr>
                <td class="boldFirst">品牌型号</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.brandName">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">注册日期</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.enrollDate">
                </td>
              </tr>
            <tr>
              <td class="boldFirst">座位数目</td>
              <td class="boldSecond">
                <input type="text" readonly="readonly" v-model="carList.seatNum">座
              </td>
            </tr>
            <tr>
              <td class="boldFirst">排气量 </td>
              <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.displacement">升
              </td>
            </tr>
            <tr>
              <td class="boldFirst">车辆状态</td>
              <td class="boldSecond" v-if="carList.state=='01'">未出售</td>
              <td class="boldSecond" v-if="carList.state=='02'">已出售</td>
            </tr>
          </table>
      </div>
			<el-collapse accordion>
				<el-collapse-item title="更多详细数据">
          <div class="optionStatu">
            <table>
              <tr>
                <td class="boldFirst">厂商名称</td>
                <td class="boldSecond"><input type="text" readonly="readonly" v-model="carList.factoryName"></td>
              </tr>
              <tr>
                <td class="boldFirst">品牌名称</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.brandName">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车系名称</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.familyName">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车型代码</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.vehicleCode">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">新车购置价</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.newCarPrice">元
                </td>
              </tr>
              <tr>
                <td class="boldFirst">年款</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.modelYear">年
                </td>
              </tr>
              <tr>
                <td class="boldFirst">国产进口标志</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.chinaOrImport">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">能源类型</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.fuelType">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">变速箱类型</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.gearboxType">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">配置</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.configure">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车辆类型</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.cllx">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车辆级别</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.cljb">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车身形式</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.csxs">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">车门数</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.cms">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">档位数</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.dws">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">变速箱描述</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.bsxms">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">驱动方式</td>
                <td class="boldSecond">
                  <input type="text" readonly="readonly" v-model="carList.qdfs">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">发动机缸数</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.fdjgs">个
                </td>
              </tr>
              <tr>
                <td class="boldFirst">发动机最大功率</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.fdjgl">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">发动机型号</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.fdjxh">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">燃油标号</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.rybh">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">排放标准</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.pfbz">
                </td>
              </tr>
              <tr>
                <td class="boldFirst">VIN年份</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.vinnf">年
                </td>
              </tr>
              <tr>
                <td class="boldFirst">生产年份</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.scnf">年
                </td>
              </tr>
              <tr>
                <td class="boldFirst">停产年份</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.tcnf">年
                </td>
              </tr>
              <tr>
                <td class="boldFirst">上市年份</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.ssnf">年
                </td>
              </tr>
              <tr>
                <td class="boldFirst">上市月份</td>
                <td class="boldSecond">
                    <input type="text" readonly="readonly" v-model="carList.ssyf">月
                </td>
              </tr>
            </table>
          </div>
				</el-collapse-item>
		    </el-collapse>
        <div class="endbutton">
          <div>
            <button class="register" @click.stop="gopageAbc('ContractProject',carId)"
             type="button" name="button">去报价 </button>
          </div>
          <div>
            <button class="register" @click="gopageAbc('QueryDauger',carId)"
            type="button" name="button">查询出险记录 </button>
          </div>
        </div>
        </div>
        <div class="newTransaction">
          <ul class="transaction" v-show ="applyDate">
            <li class="record">
              <span>最新交易记录</span>
              <i @click="gopageAbc('ContractProject',carId)"
               class="checkSee iconfont icon-xiayiye"></i>
            </li>
            <li>
              <span class="boldNew">时间 :&nbsp</span>
              <span class="time">{{applyDate}}</span>
            </li>
            <li>
              <span class="boldNew">保费  :&nbsp</span>
              <span class="time">{{premium}}元</span>
              <span class="statusValue">状态 :&nbsp</span>
              <span v-if="applyState=='01'" style="font-size:15px;">未报价</span>
              <span v-if="applyState=='02'" style="font-size:15px;">已报价</span>
            </li>
          </ul>
          <div class="endstatus">
            <button class="register" type="button"v-if="carList.state=='01'"
                @click="sell" name="button">车未出售 </button>
            <button class="register" style="background: hsl(0, 0%, 80%);border: none;"
                type="button" v-if="carList.state=='02'"
             name="button">车已出售 </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {formatDate,getAxios,reminderOther} from '../domain.js'
import {Loading} from 'element-ui';
import { MessageBox,Toast } from 'mint-ui';
export default {
  data(){
    return{
      carId:'',
      icon:'',
      show:false,
      disp:false,
      carList:'',
      applyDate:'',
      premium:'',
      applyState:''
    }
  },
  methods:{
    goback(){history.go(-1);},
    formatDate(Date){return formatDate(Date);},
    gopageAbc(e,id){
      var url = "/" + e;
      this.$router.push({
        path: url,
        query: {'carId':id}
      })
    },
    Mycar:function(){
      var vm = this;
      vm.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        var cuanData = JSON.stringify({"carId" : vm.carId});
        getAxios('car/getInfo.json',cuanData).then((data) => {
       if(data.code == '0000'){
         vm.carList=data.result;
         vm.applyGetList(vm.carList);
         vm.carList.enrollDate=vm.formatDate(data.result.enrollDate);
         vm.carList.icon = "icon-"+vm.carList.icon;
         document.querySelectorAll('.carMark')[0].classList.add( vm.carList.icon);
        }
       },(err) => {
         that.$indicator.close();
       })
    },
    updataStatus(){
        var that = this;
        this.$indicator.open({
             text: '加载中...',
             spinnerType: 'fading-circle'
           });
           var cuanData = JSON.stringify({
             "carId" : that.carId
           });
           getAxios('car/updateState.json',cuanData).then((data) => {
          if (data.code == '0000'){
              that.carList.state='02';
              that.$indicator.close();
           }
          },(err) => {
            that.$indicator.close();
        })
    },
    applyGetList(val){
      var that = this;
      this.$indicator.open({
           text: '加载中...',
           spinnerType: 'fading-circle'
         });
         var cuanData = JSON.stringify({
           "licenseNo":val.licenseNo,
           "state":val.state,
           "pageNo":'1',
           "pageSize":'1'
         });
          getAxios('apply/getList.json',cuanData).then((data) => {
          if (data.code == '0000'){
            if(data.result.applyList.length){
              that.applyDate =data.result.applyList[0].applyDate.slice(0,4)+'年'+
                              data.result.applyList[0].applyDate.slice(4,6)+'月'+
                              data.result.applyList[0].applyDate.slice(6,8)+'日 '+
                              data.result.applyList[0].applyDate.slice(8,10)+'时'+
                              data.result.applyList[0].applyDate.slice(10,12)+'分'
              that.premium = data.result.applyList[0].premium;
              that.applyState = data.result.applyList[0].state;
            }
            that.$indicator.close();
          }
          },(err) => {
          that.$indicator.close();
          })
    },
    sell() {
      var vm = this;
      MessageBox({
             message: '您确定出售此车？'
           });
           MessageBox.confirm('您确定出售此车?','').then(() => {
             vm.updataStatus();
             },() => {
            vm.carList.state='01';
           });
      },
  },
  mounted(){
    this.$indicator.close();
    this.carId = this.$route.query.carId;
    this.Mycar();
  }
}
</script>
<style lang="less">
.AarDeatil{
  background: hsl(0, 0%, 80%);
  margin-top: 47px;
  .el-collapse{
    position: relative;
    border: none;
    input{background-color: hsl(216, 100%, 99%);}
    .el-collapse-item__header{border-bottom: none;}
    .el-collapse-item__content{padding: 0;}
    .el-collapse-item__header{font-size: 16px;}
    .el-collapse-item__header__arrow{position: absolute;left:70%;top: 13px;}
  }
  .takeStuts{
    height: 130px;
    background-color: #9fb6de;
    background-image:url('../../static/image/topbg.png');
    background-repeat:no-repeat;
    background-size: 375px 130px;
  }
  .Mcover{
    width: 100%;
    position: absolute;
    top: 177px;
    left: 0;
    right: 0;
    z-index: 1;
    background: hsla(0, 0%, 0%, 0.1);
    .option {
      width: 90%;
      margin-left: 5%;
      text-align: center;
      background: hsl(0, 0%, 100%);
      border-radius: 10px;
      margin-top: -56px;
      .carLogo{
        width: 60px;
        height: 60px;
        line-height: 60px;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-30px);
        transform: translateX(-30px);
        top: -82px;
        background-color: hsl(180, 100%, 25%);
        border-radius: 30px;
        span{
          font-size: 45px;
          color:#fff;
        }
      }
      .optionStatus,.optionStatu{
        padding-top:35px;
        padding-bottom:3px;
        border-bottom: 1px solid #ddd;
        input{width: 90%;text-align: right;}
      }
      .optionStatu{padding-top:0;}
      table{
        margin: 0px 20px 6px;
        width: 88%;
          tr{
            height: 40px;
            line-height: 40px;
            .boldFirst{
              float: left;
              width: 40%;
              font-size: 16px;
              color:#848484;
            }
            .boldSecond{
              width: 60%;
              float: right;
              font-size: 15px;
              color:#464646;
              text-align: right;
            }
          }
        }
      }
    }
    .el-input{
      width: 188px;
      margin-top: 17px;
      margin-bottom: 10px;
      margin-left: 58%;
      height: 40px;
      transform: translateX(-62px);
    }
    .endbutton{
      display: flex;
      margin-bottom:10px;
      padding-bottom: 10px;
      height: 50px;
      line-height: 50px;
      div{flex:1;
      .register{width:73%;}
    }
  }
  .newTransaction{
    background-color: #fff;
    .transaction{
      margin-left: 20px;
      padding: 10px 0;
      li{
        height: 35px;
        line-height: 35px;
        position: relative;
        .time{float: left;font-size: 15px;}
        .boldNew{float: left;font-size: 16px;}
        .statusValue{font-size:16px;margin-left:20px;}
        .checkSee{
          position: absolute;
          right: 0;
          top: 9px;
          line-height: normal;
          font-size:14px;
        }
        button{
          position: absolute;
          right: 10%;
          top: 7px;
          color: hsl(200, 64%, 95%);
          background:#3764a8;
          border: none;
        }
      }
      .record{
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          margin-right: 5%;
          span{color: #9b9b9b;float: left;}
       }
     }
    }
    .endstatus{
        padding-top: 10px;
        background: hsla(0, 0%, 0%, 0.1);
        text-align: center;
    }
  }
</style>
