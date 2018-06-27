import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Classify from '@/pages/Classify'
import Cart from '@/pages/Cart'
import Member from '@/pages/Member'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ResetPass from '@/pages/ResetPass'

import Order from '@/pages/member/Order'
import NoticeList from '@/pages/member/NoticeList'
import Address from '@/pages/member/Address'
import AddAddress from '@/pages/member/AddAddress'
import Setting from '@/pages/member/Setting'
import AboutUs from '@/pages/member/AboutUs'

import Product from '@/pages/Product'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "首页"
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
        title: "购物车"
      }
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member,
      meta: {
        title: "个人中心"
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
        title: "收货地址管理"
      }
    },
    {
      path: '/AddAddress',
      name: 'AddAddress',
      component: AddAddress,
      meta: {
        title: "新增收货地址"
      }
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      meta: {
        title: "我的订单"
      }
    },
    {
      path: '/NoticeList',
      name: 'NoticeList',
      component: NoticeList,
      meta: {
        title: "消息列表"
      }
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting,
      meta: {
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
