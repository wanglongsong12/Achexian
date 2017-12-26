<template lang="html">
  <div>
    <div class="login2">
      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
      <span class="registerText">关于我们</span>
    </div>
    <div class="imgLogo"></div>
    <p class="textArea">北京小马车联科技有限公司是一家提供咨询、
          投保、风控、定价等综合解决方案的保险服务平台。
          我们专注于二手车市场，根据客户差异化风险特征，
          利用互联网大数据与精算技术，与国内一流保险公司深度合作，
          为二手车经销商提供车险服务解决方案，为客户提供量身定做的车险产品。
    </p>
    <p class="text">
      公司成立于2015年7月，核心团队在保险和互联网领域的大数据分析、
      风险定价、成本管控、技术实现、商业模式、保险直销运营、理赔、
      营销等方面拥有丰富的实践经验和前瞻性的独到见解，并致力于为用
      户提供最好的保险产品，为中国保险行业提供源源不断的创新动力。
    </p>
  </div>
</template>

<script>
export default{
  methods:{
    goback(){history.go(-1);}
  }
}
</script>
<style lang="css">
  .textArea,.text{
    font-family: "Helvetica";
    text-indent:32px;
    margin-top: 10px;
    font-size: 16px;
    padding: 0 10px;
    line-height: 21px;
  }
  .text{margin-top:0px;}
  .imgLogo{
    margin-top: 47px;
    background: url('../../static/image/xiaoma.jpg');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    height: 100px;
  }
</style>
