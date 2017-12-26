import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'//首页
import Register from '@/components/register'//注册页面
import Audit from '@/components/audit'//审核页面
import MyPrice from '@/components/MyPrice'//我的报价
import CarDeatil from '@/components/carDeatil' //车辆详情页面
import QueryDauger from '@/components/queryDauger'//查询出险记录详情
import QueryViolation from '@/components/queryViolation' //查询违章详情
import ContractProject from '@/components/ContractProject'//承保方案
import PersonalCenter from '@/components/personalCenter'//个人中心
import IndentList from '@/components/indentList'//付款
import AllCar from '@/components/allcar'// 个人中心所有车辆
import PointList from '@/components/pointList' //积分详情
import ProfitList from '@/components/profitList' //收益详情
import FillOrder from '@/components/FillOrder'//订单填写
import Orderdetail from '@/components/Orderdetail'//订单详情
import OrderInder from '@/components/orderInder' //订单
import AboutUs from '@/components/aboutUs' //关于我们
import PolicyState from '@/components/policyState' //政策公告
import error from '@/components/error'//失败
import OperationHelp from '@/components/operationHelp'//操作帮助
Vue.use(Router)

var router= new Router({
  routes: [{
      path: '/OrderInder',
      component: OrderInder//订单查询
    },{
      path: '/',
      component: test//首页
    },{
      path: '/Audit',
      component: Audit//审核页面
    },{
      path:'/Register',
      component:Register,//注册页面
    },{
      path:'/PointList',
      component:PointList,//积分页面
    },{
      path:'/ProfitList',
      component:ProfitList,//收益页面
    },{
      path:'/MyPrice',
      component:MyPrice//我的报价
    },{
      path:'/IndentList',
      component:IndentList//付款
    },{
      path:'/PersonalCenter',
      component:PersonalCenter,//个人中心
    },{
      path:'/FillOrder',
      component:FillOrder//订单填写
    },{
      path:'/ContractProject',
      component:  ContractProject//承包方案
    },{
      path:'/AllCar',
      component:AllCar//所有车辆
    },{
        path:'/QueryDauger',
        component:QueryDauger
    },{
      path:'/QueryViolation',
      component:QueryViolation
    },{
      path:'/error',
      component:error//查询出险记录
    },{
      path:'/CarDeatil',
      component:CarDeatil
    },{
      path:'/Orderdetail',
      component:Orderdetail
    },{
      path:'/AboutUs',
      component:AboutUs//关于我们
    },{
      path:'/PolicyState',
      component:PolicyState//政策通告
    },{
      path:'/OperationHelp',
      component:OperationHelp//政策通告
    }]
})
export default router
