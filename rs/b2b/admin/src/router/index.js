import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/shopSet',
    name: 'shopSet',
    // meta: { title: '店铺设置', icon: 'admin-radio' },
    children: [
      {
        path: 'shopSet',
        name: 'shopSet',
        component: () => import('@/views/wph/shopSet'),
        // meta: { title: 'flux', icon: 'admin-radio' }
        meta: { title: '店铺设置' }
      }
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/shopSet',
    name: 'goodsManage',
    children: [
      {
        path: 'goodsManage',
        name: 'goodsManage',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '商品管理' }
      }
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/shopSet',
    name: 'customerManage',
    children: [
      {
        path: 'customerManage',
        name: 'customerManage',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '客户管理' }
      }
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/shopSet',
    name: 'orderManage',
    children: [
      {
        path: 'orderManage',
        name: 'orderManage',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '订单管理' }
      }
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/fundsManage',
    name: 'financeManage',
    meta: { title: '财务管理' },
    children: [
      {
        path: 'fundsManage',
        name: 'fundsManage',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '账户资金管理' }
      },
      {
        path: 'dealsManage',
        name: 'dealsManage',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '提现记录' }
      }
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/allGoodsList',
    name: 'statisticData',
    meta: { title: '数据统计' },
    children: [
      {
        path: 'allGoodsList',
        name: 'allGoodsList',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '全部商品列表' }
      },
      {
        path: 'manufacturersList',
        name: 'manufacturersList',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '厂商列表' }
      },
      {
        path: 'retailersList',
        name: 'retailersList',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '零售商列表' }
      },
      {
        path: 'visitorsList',
        name: 'visitorsList',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '访客列表' }
      },
      {
        path: 'generalizeList',
        name: 'generalizeList',
        component: () => import('@/views/wph/shopSet'),
        meta: { title: '推广列表' }
      }
    ]
  },

  {
    path: '/boosj',
    component: Layout,
    redirect: '/boosj/index',
    name: 'Boosj',
    meta: { title: '播视网总数据', icon: 'admin-radio' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/boosj/index'),
        // meta: { title: 'flux', icon: 'admin-radio' }
        meta: { title: '总数据概况' }
      }
    ]
  },

  // {
  //   path: '/tinymce',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'tinymce',
  //       name: '富文本编辑器',
  //       component: () => import('@/views/components-demo/tinymce'),
  //       meta: { title: '富文本编辑器' }
  //     }
  //   ]
  // },

  // {
  //   path: '/markdown',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'markdown',
  //       name: 'markdown',
  //       component: () => import('@/views/components-demo/markdown'),
  //       meta: { title: 'markdown' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export const baseRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/mySynthesize',
    component: Layout,
    redirect: '/mySynthesize/flux',
    name: 'MySyn',
    meta: { title: '我的综合概况', icon: 'admin-radio' },
    children: [
      {
        path: 'flux',
        name: 'flux',
        component: () => import('@/views/mySynthesize/flux/index'),
        meta: { title: '流量概况' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRouterMap
})

