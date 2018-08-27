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
/* 常用导航（恒定导航）*/
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
  }

  // {
  //   path: '/wph',
  //   component: Layout,
  //   redirect: '/wph/shopSet',
  //   name: 'shopSet',
  //   // meta: { title: '店铺设置', icon: 'admin-radio' },
  //   children: [
  //     {
  //       path: 'shopSet',
  //       name: 'shopSet',
  //       component: () => import('@/views/wph/shopSet'),
  //       // meta: { title: 'flux', icon: 'admin-radio' }
  //       meta: { title: '店铺设置' }
  //     }
  //   ]
  // },
  // {
  //   path: '/wph',
  //   component: Layout,
  //   redirect: '/wph/shopSet',
  //   name: 'customerManage',
  //   children: [
  //     {
  //       path: 'customerManage',
  //       name: 'customerManage',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '客户管理' }
  //     }
  //   ]
  // },
  // {
  //   path: '/wph',
  //   component: Layout,
  //   redirect: '/wph/shopSet',
  //   name: 'orderManage',
  //   children: [
  //     {
  //       path: 'orderManage',
  //       name: 'orderManage',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '订单管理' }
  //     }
  //   ]
  // },
  // {
  //   path: '/wph',
  //   component: Layout,
  //   redirect: '/wph/fundsManage',
  //   name: 'financeManage',
  //   meta: { title: '财务管理' },
  //   children: [
  //     {
  //       path: 'fundsManage',
  //       name: 'fundsManage',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '账户资金管理' }
  //     },
  //     {
  //       path: 'dealsManage',
  //       name: 'dealsManage',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '提现记录' }
  //     }
  //   ]
  // },
  // {
  //   path: '/wph',
  //   component: Layout,
  //   redirect: '/wph/allGoodsList',
  //   name: 'statisticData',
  //   meta: { title: '数据统计' },
  //   children: [
  //     {
  //       path: 'allGoodsList',
  //       name: 'allGoodsList',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '全部商品列表' }
  //     },
  //     {
  //       path: 'manufacturersList',
  //       name: 'manufacturersList',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '厂商列表' }
  //     },
  //     {
  //       path: 'retailersList',
  //       name: 'retailersList',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '零售商列表' }
  //     },
  //     {
  //       path: 'visitorsList',
  //       name: 'visitorsList',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '访客列表' }
  //     },
  //     {
  //       path: 'generalizeList',
  //       name: 'generalizeList',
  //       component: () => import('@/views/wph/shopSet'),
  //       meta: { title: '推广列表' }
  //     }
  //   ]
  // },

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
  // }

]
// 权限路由 ['ADMIN','MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
export const asyncRouterMap = [
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/goodsManage',
    name: 'goodsManage',
    meta: {
      title: '产品管理',
      roles: ['ADMIN'] // you can set roles in root nav
    },
    children: [
      { path: 'productAudit', name: 'productAudit', component: () => import('@/views/wph/productAudit'), meta: { title: '产品审核' }},
      { path: 'productAuthorizeAudit', name: 'productAuthorizeAudit', component: () => import('@/views/wph/productAuthorizeAudit'), meta: { title: '产品授权审核' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/indexBanner',
    name: 'indexSetting',
    meta: {
      title: '站内设置',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'indexBanner', name: 'indexBanner', component: () => import('@/views/wph/indexBanner'), meta: { title: '首页轮播图设置' }},
      { path: 'indexHeadline', name: 'indexHeadline', component: () => import('@/views/wph/indexHeadline'), meta: { title: '首页头条设置' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/goodsSetting',
    name: 'goodsSetting',
    meta: {
      title: '订单相关设置',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'goodsSetting', name: 'goodsSetting', component: () => import('@/views/wph/goodsSetting'), meta: { title: '商品相关设置' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/orderSetting',
    name: 'orderSetting',
    meta: {
      title: '订单相关设置',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'orderSetting', name: 'orderSetting', component: () => import('@/views/wph/orderSetting'), meta: { title: '订单相关设置' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/aSpotCatSetting',
    name: 'aSpotCatSetting',
    meta: {
      title: '扣点管理',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'aSpotCatSetting', name: 'aSpotCatSetting', component: () => import('@/views/wph/aSpotCatSetting'), meta: { title: '扣点比例设置' }},
      { path: 'shopBalanceList', name: 'shopBalanceList', component: () => import('@/views/wph/shopBalanceList'), meta: { title: '商家余额列表' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/aSpotCatSetting',
    name: 'classifyManage',
    meta: {
      title: '分类管理',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'classifyManage', name: 'classifyManage', component: () => import('@/views/wph/classifyManage'), meta: { title: '分类管理' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/enterAudit',
    name: 'enterAudit',
    meta: {
      title: '入驻审核',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      { path: 'enterAudit', name: 'enterAudit', component: () => import('@/views/wph/enterAudit'), meta: { title: '入驻审核' }}
    ]
  },
  // 商家后台
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/productAuthorizeList',
    name: 'productAuthorizeList',
    meta: {
      title: '产品管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR']
    },
    children: [
      { path: 'productAuthorizeList', name: 'productAuthorizeList', component: () => import('@/views/shop/productAuthorizeList'), meta: { title: '产品授权列表' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/productAddSave',
    name: 'productAddSave',
    hidden: true,
    meta: {
      title: '产品管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR']
    },
    children: [
      { path: 'productAddSave', name: 'productAddSave', component: () => import('@/views/shop/productAddSave'), meta: { title: '新增产品' }},
      { path: 'productAuthorizeAddSave', name: 'productAuthorizeAddSave', component: () => import('@/views/shop/productAuthorizeAddSave'), meta: { title: '产品授权列表' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/productAddSave',
    name: 'productAddSave',
    hidden: true,
    meta: {
      title: '产品管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR']
    },
    children: [
      { path: 'productAddSave', name: 'productAddSave', component: () => import('@/views/shop/productAddSave'), meta: { title: '产品授权信息提交' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/goodsManage',
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'goodsManage', name: 'goodsManage', component: () => import('@/views/shop/goodsManage'), meta: { title: '商品管理' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/goodAddSave',
    name: 'goodAddSave',
    hidden: true,
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'goodAddSave', name: 'goodAddSave', component: () => import('@/views/shop/goodAddSave'), meta: { title: '新增商品' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/groupManage',
    name: 'goodsManage',
    meta: {
      title: '拼团管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'groupManage', name: 'groupManage', component: () => import('@/views/shop/groupManage'), meta: { title: '拼团管理' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/groupAddSave',
    name: 'goodAddSave',
    hidden: true,
    meta: {
      title: '拼团管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'groupAddSave', name: 'groupAddSave', component: () => import('@/views/shop/groupAddSave'), meta: { title: '新增拼团' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopBanner',
    name: 'shopBanner',
    meta: {
      title: '店铺设置',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'shopBanner', name: 'shopBanner', component: () => import('@/views/shop/shopBanner'), meta: { title: '店铺轮播图管理' }},
      { path: 'classifyManage', name: 'classifyManage', component: () => import('@/views/shop/classifyManage'), meta: { title: '店铺分类管理' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopBalance',
    name: 'shopBalance',
    meta: {
      title: '扣点余额管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'shopBalance', name: 'shopBalance', component: () => import('@/views/shop/shopBalance'), meta: { title: '余额' }},
      { path: 'shopDeductionsRecord', name: 'shopDeductionsRecord', component: () => import('@/views/shop/shopDeductionsRecord'), meta: { title: '扣点记录' }},
      { path: 'shopRechargeRecord', name: 'shopRechargeRecord', component: () => import('@/views/shop/shopRechargeRecord'), meta: { title: '充值记录' }}
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/orderManage',
    name: 'orderManage',
    meta: {
      title: '扣点余额管理',
      icon: 'lock',
      roles: ['DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [
      { path: 'orderManage', name: 'orderManage', component: () => import('@/views/shop/orderManage'), meta: { title: '订单管理' }}
    ]
  },
  {
    path: '/wph',
    component: Layout,
    redirect: '/wph/test',
    name: 'test',
    meta: {
      title: '测试页面',
      icon: 'lock',
      roles: ['ADMIN', 'MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
    },
    children: [{ path: 'test', name: 'test', component: () => import('@/views/wph/test'), meta: { title: '测试页面', roles: ['ADMIN', 'MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER'] }}]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

