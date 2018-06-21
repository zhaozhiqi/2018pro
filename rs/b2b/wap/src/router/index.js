import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Classify from '@/pages/Classify'
import Cart from '@/pages/Cart'
import Member from '@/pages/Member'

import Product from '@/pages/Product'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
