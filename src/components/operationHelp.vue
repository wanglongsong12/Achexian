<template lang="html">
  <div class="operationHelp">
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">操作帮助</span>
    </div>
    <div class="linear"></div>
    <div class="MyCar" v-for="item in arr">
        <div class="logo">
          <span class="space"></span>
          <span class="title" v-show ="item.make" style="color:red">{{item.title}}</span>
          <span class="title" v-show ="!item.make">{{item.title}}</span>
        </div>
        <div class="image"><img :src=item.img  alt=""></div>
    </div>
  </div>
</template>

<script>
  export default{
    methods:{goback(){history.go(-1);}},
    data(){return{
      arr:[{
          title:'出险查询',
          make:'1',
          img:'../../static/image/operationHelp/credit_index.jpg'
          },
          {
          title:'上传行驶证并识别行驶证信息与选择车辆信息',
          img:'../../static/image/operationHelp/credit_select.jpg'
        },
          {
          title:'上传行驶证可以使用本地图册或拍照上传',
          img:'../../static/image/operationHelp/credit_upload.jpg'
        },
          {
          title:'点击核实并完善信息，识别信息仅供参考',
          img:'../../static/image/operationHelp/credit_car_confirm.jpg'
        },
          {
          title:'直接修改行驶证信息',
          img:'../../static/image/operationHelp/credit_card_confirm.jpg'
        },
          {
          title:'结果页(可能存在查不到出险记录的情况)',
          img:'../../static/image/operationHelp/credit_result_list.jpg'
        },
          {
          title:'违章查询',
          make:'2',
          img:'../../static/image/operationHelp/violation_index.jpg'
        },
          {
          title:'上传行驶证并识别行驶证信息,选择车辆信息',
          img:'../../static/image/operationHelp/violation_select.jpg'
        },
          {
          title:'上传行驶证可以使用本地图册或拍照上传',
          img:'../../static/image/operationHelp/violation_upload.jpg'
        },
          {
          title:'点击核实并完善信息,识别信息仅供参考',
          img:'../../static/image/operationHelp/violation_car_confirm.jpg'
        },
          {
          title:'直接修改行驶证信息',
          img:'../../static/image/operationHelp/violation_card_confirm.jpg'
        },
          {
          title:'结果页(可能存在查不到违章记录的情况)',
          img:'../../static/image/operationHelp/violation_result_list.jpg'
        },
      ]
    }}
  }
</script>

<style lang="less">
.operationHelp{
  margin-top: 49px;
  width: 100%;
  .MyCar{
    line-height: 40px;
    padding:0 10px;
    .logo{
        border-bottom: 1px solid #dbdbdb;
      .space{
        display: inline-block;
        height: 17px;
        width: 2px;
        background-color: #538fe0;
        vertical-align: sub;
        margin-right: 5px;
      }
      .title{
        font-size: 16px;
        color: #363636;
        font-weight: bold;
      }
    }
    .image{
      display: block;
      margin-top: 10px;
      text-align: center;
      img{width: 75%;}
    }
  }
}
</style>
