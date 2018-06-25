// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
Vue.use(Vuex);
//表单验证
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
const VeeConfig = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
     zh_CN
  }
});
// import { Swipe, SwipeItem } from "mint-ui";
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// import { Header } from 'mint-ui';
// import { CellSwipe } from 'mint-ui';
// Vue.component(Header.name, Header);

// import { Checklist } from 'mint-ui';
// Vue.component(Checklist.name, Checklist);
// Vue.component(CellSwipe.name, CellSwipe);

//import { MessageBox } from 'mint-ui';

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    login:false,
    nickName:'',
    cartCount:10
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    this.login();
  },
  methods:{
    login(){
      console.log(this.$store.state.login);
    }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})