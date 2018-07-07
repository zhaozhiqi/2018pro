import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Classify from '@/pages/Classify'
import Group from '@/pages/Group'
import Cart from '@/pages/Cart'
import Member from '@/pages/Member'
import Seach from '@/pages/Seach'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ResetPass from '@/pages/ResetPass'

import Order from '@/pages/member/Order'
import NoticeList from '@/pages/member/NoticeList'
import Address from '@/pages/member/Address'
import EditAddress from '@/pages/member/EditAddress'
import Setting from '@/pages/member/Setting'
import AboutUs from '@/pages/member/AboutUs'

import Product from '@/pages/Product'
import GroupProduct from '@/pages/GroupProduct'
import Pay from '@/pages/Pay'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Group',
      component: Group,
      meta: {
        title: "拼团"
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify,
      meta: {
        title: "商品分类"
      }
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      meta: {
        auth:true,
        title: "购物车"
      }
    },
    {
      path: '/Group',
      name: 'Group',
      component: Group,
      meta: {
        title: "拼团"
      }
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member,
      meta: {
        auth:true,
        title: "个人中心"
      }
    },
    {
      path: '/Seach',
      name: 'Seach',
      component: Seach,
      meta: {
        title: "搜索"
      }
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product,
      meta: {
        title: "商品详情"
      }
    },
    {
      path: '/GroupProduct',
      name: 'GroupProduct',
      component: GroupProduct,
      meta: {
        title: "拼团商品"
      }
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: Pay,
      meta: {
        auth:true,
        title: "支付"
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: "账号登录"
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        title: "快速登录/注册"
      }
    },
    {
      path: '/ResetPass',
      name: 'ResetPass',
      component: ResetPass,
      meta: {
        title: "重置密码"
      }
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address,
      meta: {
        auth:true,
        title: "收货地址管理"
      }
    },
    {
      path: '/EditAddress',
      name: 'EditAddress',
      component: EditAddress,
      meta: {
        auth:true,
        title: "编辑收货地址"
      }
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      meta: {
        auth:true,
        title: "我的订单"
      }
    },
    {
      path: '/NoticeList',
      name: 'NoticeList',
      component: NoticeList,
      meta: {
        auth:true,
        title: "消息列表"
      }
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting,
      meta: {
        auth:true,
        title: "设置"
      }
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: AboutUs,
      meta: {
        title: "关于我们"
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title: "测试"
      }
    }
  ]
})
