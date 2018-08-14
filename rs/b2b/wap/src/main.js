// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import VueJsonp from 'vue-jsonp'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui';
import Cookies from 'js-cookie'
// import 'mint-ui/lib/style.css'
import '@/assets/css/base.css'
import position from '@/position'

Vue.use(VueJsonp)
Vue.use(MintUI);
//表单验证
import {VeeValidate, Veeconfig} from '@/validation';
Vue.use(VeeValidate,Veeconfig);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    // this.login();
  },
  methods:{
    // login(){
    //   console.log(this.$store.state.login);
    // }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.matched.some( m => m.meta.auth)){  
    let hasLogin = Cookies.get('WPH_USER_LOGIN')
    console.log(hasLogin,'hasLogin',hasLogin !== undefined , hasLogin !== null)
    // 对路由进行验证     
    if(hasLogin !== undefined && hasLogin !== null){ // 已经登陆
      console.log('已登录')    
      next()   // 正常跳转到你设置好的页面     
    } else{ 
      console.log('未登录')    
    // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
    　　 next({path:'/login',query:{ Rurl: to.fullPath} })
    } 
  }else{ 
    next() 
  } 
})