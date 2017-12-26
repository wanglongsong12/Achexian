<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidde">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->
          <!-- <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> -->
          <!-- <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
    <i v-show="audio" class="list-img-close iconfont icon-lajitong" @click='delImage'></i>
    <i class="list-img-xuanzhuan iconfont icon-xuanzhuan" @click.stop='rotateA'></i>
    <span v-show="showDate" class="listImgL">
          车牌号码&nbsp&nbsp<input type="text" v-model="licenseNo"style="text-transform:uppercase;">
    </span>
    <span v-show="showDate" class="listImgV">
          车架号码&nbsp&nbsp<input type="text" v-model="vIN" maxlength="17"style="text-transform:uppercase;">
    </span>
    <span v-show="showDate" class="listImgE">
          发动机号&nbsp&nbsp<input type="text" v-model="engineNo"style="text-transform:uppercase;">
    </span>
    <span v-show="showDate" class="listImgVI">
          品牌型号&nbsp&nbsp<input type="text" v-model="vehicleName"style="text-transform:uppercase;">
    </span>
    <span v-show="showDate" class="listImgDate">
          注册日期&nbsp&nbsp<yd-datetime start-date="2000-01-01"  type="date" v-model="enrollDate"
          slot="right"></yd-datetime>
    </span>
  </div>
</template>
<script>
import { MessageBox} from 'mint-ui';
export default {
  data(){return{
    imgUrls:[],
    idx:'',
    audio:true,
    vIN:'',
    engineNo:'',//发动机号
    licenseNo:'',//车牌号码
    vehicleName:'',//品牌型号
    showDate:false,
    current:90,
    currentAge:0,
    enrollDate:''
  }},
  methods: {
    showDel(){this.audio = false;},
    showDateFun(){this.showDate = true;},
    showClose(val){this.photoswipe.close(val);},
    rotateA(){
      this.currentAge += 180;
      document.querySelectorAll('.list-img-xuanzhuan')[0].style.transform = 'rotate('+this.currentAge+'deg)';
      if(document.querySelectorAll('.pswp__img').length==2){
          document.querySelectorAll('.pswp__img')[1].style.transform = 'rotate('+this.current+'deg)';
      }else{
          document.querySelectorAll('.pswp__img')[0].style.transform = 'rotate('+this.current+'deg)';
      }
      this.current +=90;
    },
    init(index) {
      var that = this;
      var pswpElement = document.querySelectorAll('.pswp')[0];
      let options = Object.assign({
          history: false,
          shareEl: false,
          tapToClose: true,
          index: index
      },this.options)
      this.photoswipe = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.list,options);
      this.photoswipe.init();
      this.photoswipe.listen('close', function() {
        that.$emit('moderVin',that.vIN);
        that.$emit('moderifNo',that.engineNo);
        that.$emit('moderifLice',that.licenseNo);
        that.$emit('moderifVehic',that.vehicleName);
        that.$emit('moderifDate',that.enrollDate);
      });
    },
    show(index,imgUrls){
      this.init(index);
      this.imgUrls=imgUrls;
      this.idx = index;
    },
    showVin(index,imgUrls,vin,engineNo,licenseNo,vehicleName,enrollDate){
        this.init(index);
        this.imgUrls = imgUrls;
        this.idx = index;
        this.vIN= vin;
        this.engineNo= engineNo;
        this.licenseNo= licenseNo;
        this.vehicleName= vehicleName;
        this.enrollDate= enrollDate;
    },
    delImage: function(){
      var vm = this;
      MessageBox({
       title: '提示',
       //  message: '确定执行此图片吗?',
       showCancelButton: true
      });
     MessageBox.confirm('确定执行此图片吗?').then(action => {
       vm.imgUrls.splice(vm.idx,1);
       vm.photoswipe.close();
       vm.$emit('child',true);
     });
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index:{
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default(){return {}}
    }
  }
}
</script>
<style media="screen">
.list-img-close{
  position: fixed;
  right: 50px;
  font-size: 16px;
  top: 14px;
  -webkit-transform: translateX(10px);
  transform: translateX(10px);
  color: hsl(0, 0%, 100%);
}
.list-img-xuanzhuan{
  position: fixed;
  right: 65px;
  font-size: 20px;
  top: 12px;
  color: hsl(0, 0%, 100%);
  font-weight: bold;
}
.listImgL,.listImgV,.listImgE,.listImgVI,.listImgDate{
    position: fixed;
    left: 15px;
    top:5px;
    color:#fff;
}
.listImgV{top:23px;}
.listImgE{top:41px;}
.listImgVI{top:59px;}
.listImgDate{top:77px;}
input{text-indent: 5px;width: 10rem;border-radius: 3px;}
</style>
