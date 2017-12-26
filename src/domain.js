  import { MessageBox,Toast } from 'mint-ui';
  import axios from 'axios'
  import { Loading } from 'element-ui';
  const domain = 'http://192.168.10.201/api/';
  // const domain = 'http://app.acx.test.achexian.cn/api/';
  export default {testUrl: domain}
  export function trim(data){return data.replace(/^\s\s*/, '').replace(/\s\s*$/, '');}
  export function formatDate(Date){
    var lth = Date.length;
    if(lth == 8){
      var year = Date.substr(0,4)
      var month = Date.substr(4,2);
      var day = Date.substr(6,2);
      var total = year + '-' + month + '-' + day
      return total
    }else if(lth == 12){
      var year = Date.substr(0,4)
      var month = Date.substr(4,2);
      var day = Date.substr(6,2);
      var hour = Date.substr(8,2);
      var second = Date.substr(10,2);
      var total = year + '-' + month + '-' + day + '-' + hour + '-' + second
    }else if(lth == 14){
      var year = Date.substr(0,4)
      var month = Date.substr(4,2);
      var day = Date.substr(6,2);
      var hour = Date.substr(8,2);
      var minture = Date.substr(10,2);
      var second = Date.substr(12,2);
      var total = year + '-' + month + '-' + day + '-' + hour + '-' + minture +'-'+second
    }
    return total
  }
  export function modifyHeight(){
    var oHeight = $(document).height();
    $(window).resize(function(){
      if($(document).height() < oHeight){
        $("#register").css("display","none");
    }else{
        $("#register").css("display","block");
      }
    });
    return oHeight
  }
  export function  reminder(message){
   MessageBox({
      title: '提示',
      message:message
    });
  MessageBox.alert(message,'').then(() => {history.go(-1);},() => {});
  }
 export function  reminderOther(message){
   var that = this;
     MessageBox({
      title: '提示',
      message:message
    });
    MessageBox.alert(message,'').then(() => {},() => {});
   }
   export function getAxios(dataUr,data){
      var that = this;
      var _url = domain + dataUr;
      return new Promise((resolve, reject) =>{
      axios({
         method:'post',
         url:_url,
         cache:false,
         headers: {'Content-Type': 'application/json;charset=UTF-8'},
         crossDomain: true,
         data:data,
         dataType: "json",
       }).then(function (response){
        if(response.data.code=='0000'){
          resolve(response.data);
        }else if(response.data.code=='9999'){
          reminderOther(response.data.message);
          that.$Loading.close();
        }else if(response.data.code=='0003'){
          resolve(response.data);
        }else if(response.data.code=='9998'){
          reminderOther(response.data.message);
          that.$Loading.close();
        }else if(response.data.code=='9800'){
          reminderOther(response.data.message);
          that.$Loading.close();
        }else{
          reminderOther(response.data.message);
          that.$Loading.close();
        }
      }).catch(function(err){reject(err)})
    })
  }
