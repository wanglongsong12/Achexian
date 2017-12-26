	<template>
		<div class="IndentList">
			<div class="login2">
	      <i class="jiantou iconfont icon-xiayiye1" @click="goback"></i>
				<span class="registerText">付款</span>
	    </div>
			<div class="linear"></div>
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
						<td> <span>{{ciStartDate}}</span><br><span>{{ciEndDate}}</span></td>
					</tr>
					<tr>
						<td>商业险期间</td>
						<td><span>{{biStartDate}}</span><br><span>{{biEndDate}}</span></td>
					</tr>
				</table>
			</div>
			<div class="content"></div>
			<section class="info">
			  <p class="baoren">
					<i></i>
					<span>收款凭证</span>
				</p>
			</section>
			<div class="image-list">
				<div class="list-default-img" v-show="isPhoto" @click.stop="addPic">
          <i class="iconfont icon-xiangji"></i>
          <p>上传收款凭证</p>
          <input id="inputImage" type="file" accept="image/*" @change="onFileChange" style="display: none;">
				</div>
				<ul v-show="!isPhoto">
				 <li  class="listUl" v-for="(iu, index) in imgUrls">
						<img @click="showPreviewer(index,imgUrls)" class="listImg" :class="{on:selectedList==index}" :src="iu.src">
				 </li>
				</ul>
			</div>
			<div class="content"></div>
			<div class="bottom">
				<button class="register" type="button" name="button" @click="payMoney">确认付款</button>
			</div>
			<imag  :list="imgUrls" @child="listenToMyBoy" ref="previewer" :options="options"></imag>
		</div>
	</template>

	<script>
	import imag from './image.vue'
	import { MessageBox,Toast} from 'mint-ui';
	import {trim,getAxios,formatDate} from '../domain.js'
	export default {
	components: {imag},
  watch:{"popImage":"backtrack"},
	data(){return {
		imgUrl:'',
   	popImage:'',
		selectedList:'wa',
		isPhoto:true,
		imgUrlSubstr:'',
		filePath:'',
		confirmBuyData:'',
		ciStartDate:'',
		ciEndDate:'',
		biStartDate:'',
		biEndDate:'',
		imgUrls: [{src:'',w  :'',h:''}],
		options:{
			history: false,
			focus: false,
			showAnimationDuration: 0,
			hideAnimationDuration: 0,
			timeToIdle: 4000
		}
	}},
	methods:{
		goback(){history.go(-1);},
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
				}else if(that.popImage == 2){
					that.showClose(1);
				}
			}
		},
		addPic: function(e) {
			var btnNode = document.getElementById('inputImage');
			btnNode.click();
		},
		onFileChange: function(e){
			this.$indicator.open({
				text: '图片上传中...',
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
		DateModity(){
		 this.ciStartDate =formatDate(this.confirmBuyData.ciStartDate);
		 this.ciEndDate =formatDate(this.confirmBuyData.ciEndDate);
		 this.ciStartDate =formatDate(this.confirmBuyData.biStartDate);
		 this.biEndDate =formatDate(this.confirmBuyData.biEndDate);
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
					 that.$indicator.close();
				 }else{
					 that.isPhoto = false;
					 that.filePath=res.data.result.filePath;
					 that.$indicator.close();
				 }
			 }).catch(function(err){
				 that.$indicator.close();
		 	})
		},
		remind(message){
			var that = this;
				MessageBox({
				 title: '提示',
				 message:message
			 });
			 MessageBox.alert(message,'').then(() => {
				 this.$router.push({path: '/'})
			 },() => {});
		 },
		payMoney(){
			var that = this;
			this.$indicator.open({
				 text: '加载中...',
				 spinnerType: 'fading-circle'
			 });
			 var cuanData = JSON.stringify({
				 "orderId":that.$store.state.orderId,
				 "payImgUrl":that.filePath
			 })
			 getAxios('order/pay.json',cuanData).then((data) => {
         if (data.code == '0000'){
					 	this.remind("付款成功");
						that.$indicator.close();
          }
        },(err) => {
				 that.$indicator.close();
       })
			}
		},
		mounted(){
			this.confirmBuyData = this.$store.state.confirmBuyData;
			if(this.confirmBuyData){this.DateModity();}
		}
	}
</script>
<style  lang="less">
	.IndentList{
		.bottom{text-align:center;margin: 10px 0;}
		.creditData{
		  margin-left: 5%;
			margin-top: 60px;
		  background: #fff;
	    table{
		    margin-left:5%;
		    margin-top: 16px;
		    margin-bottom: 16px;
		    width: 90%;
	      tr{
	        height: 40px;
	        line-height: 40px;
	        border-bottom: 3px solid #ebebeb;
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
		.info{
	    margin: 10px 0 0 10px;
			p{
				padding-left:10px;
				position: relative;
				font-weight: bold;
				color:#769fd3;
				font-size: 16px;
				i{
					display: inline-block;
					width:2px;
					height:14px;
					background:#6689CB;
				}
			}
		}
	}
</style>
