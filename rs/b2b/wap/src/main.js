// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css'
Vue.use(MintUI);
Vue.use(Vuex);
//表单验证
import {VeeValidate, Veeconfig} from '@/validation';
Vue.use(VeeValidate,Veeconfig);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    login:false,
    nickName:'',
    cartCount:11,
    cartList:[
      {
        storeId:"00001",
        storeName:"三只松鼠",
        storeIink:"/index",
        checked:false,
        list : [
          {checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:1,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
          {checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
        ]
      },
      {					
        storeId:"00002",
        storeName:"三只松鼠",
        storeIink:"/index",
        checked:false,				
        list : [
          {checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
          {checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
        ]
      },
      {					
        storeId:"00003",
        storeName:"三只松鼠",
        storeIink:"/index",
        checked:false,					
        list : [
          {checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
          {checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
        ]
      },
    ],
    orderList:[
      {
        orderType:"allOrder",
        orderCount:2,
        button:[
          {
            name:"取消订单",
            link:"/CancelOrder"
          },
          {
            name:"去支付",
            link:"/PayOrder"
          }
        ],
        list:[
          {							
            state:"1",
            stateName:"待付款",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"1",
            stateName:"待付款",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
      {
        orderType:"payOrder",
        orderCount:2,
        button:[
          {
            name:"取消订单",
            link:"/CancelOrder"
          },
          {
            name:"去支付",
            link:"/PayOrder"
          }
        ],
        list:[
          {							
            state:"1",
            stateName:"待付款",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"1",
            stateName:"待付款",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
      {
        orderType:"sendOrder",
        orderCount:2,
        button:[
          {
            name:"提醒发货",
            link:"/CancelOrder"
          },
        ],
        list:[
          {							
            state:"2",
            stateName:"待发货",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"2",
            stateName:"待发货",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
      {
        orderType:"receiveOrder",
        orderCount:2,
        button:[
          {
            name:"确认收货",
            link:"/CancelOrder"
          },
          {
            name:"查看物流",
            link:"/PayOrder"
          }
        ],
        list:[
          {							
            state:"3",
            stateName:"待收货",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"3",
            stateName:"待收货",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
      {
        orderType:"estimateOrder",
        orderCount:2,
        button:[
          {
            name:"评价",
            link:"/CancelOrder"
          }
        ],
        list:[
          {							
            state:"4",
            stateName:"待评价",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"4",
            stateName:"待评价",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
      {
        orderType:"refundOrder",
        orderCount:2,
        button:[
        ],
        list:[
          {							
            state:"5",
            stateName:"退货/售后",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817M",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:4,
            orderMoney:1200
          },
          {	
            state:"5",
            stateName:"退货/售后",
            storeName:"二哈宠物商城",
            orderId:"B2CK18062205817L",
            productList:[
              {
                proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              }
            ],
            proAllNum:2,
            orderMoney:600
          }
        ]
      },
    ]

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
    },
    goback(){
      window.history.go(-1)
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