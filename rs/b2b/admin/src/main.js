import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization //import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import vueFilter from './utils/filter'
for (const key in vueFilter) {
  Vue.filter(key, vueFilter[key])
}
import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

import { getPurview } from '@/api/login'
import { constantRouterMap, baseRouterMap } from '@/router'
// getPurview().then((result) => {
//   console.log('请求权限', result.data.weight)
//   if (result.data.weight === 2) {
//     const roles = 'admin'
//     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
//       router.addRoutes(constantRouterMap) // 动态添加可访问路由表
//     })
//   } else {
//     const roles = 'editor'
//     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
//       router.addRoutes(baseRouterMap) // 动态添加可访问路由表
//     })
//   }
// }).catch((err) => {
//   console.log(err, '权限 main')
// })

const roles = 'admin'
store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
  router.addRoutes(constantRouterMap) // 动态添加可访问路由表
})
