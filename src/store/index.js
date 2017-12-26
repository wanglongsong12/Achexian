import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
const state = {
   status:'',
   confirmBuyData:'',
   orderId:'',
   imgUrls:[],
   showCar:'',
   timeout:'',
   quoteList:{}
 }
const mutations = {
modeify(state){state.status = '02'},
confirmIndent(state,val){state.orderId = val},
confirm(state,val){state.confirmBuyData = val},
confirmQuoteList(state,val){state.quoteList = val},
modeifyShow(state,showCar){state.showCar = showCar;},
modeTimeout(state,timeout){state.timeout = timeout;},
modeifyImgUrls(state,imgUrls){state.imgUrls = imgUrls;},
modeify0(state,n){if(n=='01'){state.status = '08';}else{state.status = n;}}}
export default new Vuex.Store({
  state,
  mutations
})
