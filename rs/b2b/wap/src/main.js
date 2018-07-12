// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui';
import Cookies from 'js-cookie'
// import 'mint-ui/lib/style.css'
import '@/assets/css/base.css'
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
    addressList:[
        {
          default:true,
          detailedAddress:"百得利大厦十二楼",
          otherAddress:"other",
          userName:"赵志启....",
          userPhone:"15584461111",
          userSex:"man",
          id:0,
          region:{
              value:"浙江省杭州市滨江区",
              province:null,
              city:null,
              county:null,
              provinceCode:null,
              cityCode:null,
              countyCode:123456789
          }                    
        },
        {
          default:false,
          detailedAddress:"百得利大厦十二楼",
          otherAddress:"other",
          userName:"赵志启1",
          userPhone:"15584462222",
          userSex:"man",
          id:1,
          region:{
              value:"浙江省杭州市滨江区",
              province:null,
              city:null,
              county:null,
              provinceCode:null,
              cityCode:null,
              countyCode:123456789
          }                    
        },
        {
          default:false,
          detailedAddress:"百得利大厦十二楼",
          otherAddress:"other",
          userName:"赵志启2",
          userPhone:"15584463333",
          userSex:"man",
          id:2,
          region:{
              value:"浙江省杭州市滨江区",
              province:null,
              city:null,
              county:null,
              provinceCode:null,
              cityCode:null,
              countyCode:123456789
          }                    
        },
    ],
    cartList:[
      {
        storeId:"00001",
        storeName:"Coca-Cola可口可乐旗舰店",
        storeIink:"/index",
        checked:false,
        list : [
          {checked:false,able:"新品",id:1,proId:"10001",proImg:"static/images/pro-02-2.jpg",proName:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",proPrice:58,proNum:2},
        ]
      },
      {					
        storeId:"00002",
        storeName:"ROUWANBABY旗舰店",
        storeIink:"/index",
        checked:false,				
        list : [
          {checked:false,able:"新品",id:1,proId:"10001",proImg:"static/images/wap-19.png",proName:"肉完ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",proPrice:99,proNum:1},
          {checked:false,bable:"新品",id:2,proId:"10002",proImg:"static/images/wap-14.png",proName:"肉完ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",proPrice:99,proNum:2}
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
            link:"/Pay"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
            link:"/Pay"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
            link:"/"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
              },
              {
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
                proImg:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
                proName:"荐形容的狠货厚高的工人的",
                proPrice:1,
                proNum:2,
                proLink:"http://gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
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
    login(state, stark){
      if((stark.account === 'admin'||stark.account === '15584461401'||stark.account === 'admin1'||stark.account === 'admin2'||stark.account === 'admin3')&&stark.password === '123456'){
        state.login = true;
        Cookies.set('Login', 'true', { expires: 7 });   
        Cookies.set('RANK', stark.account, { expires: 7 });   
        console.log(stark,'stark');
        state.nickName = stark.account;
        stark.that.$toast({
          message: '登录成功',
          type: 'warning'
        });      
      }else{
        stark.that.$toast({
          message: '账号或密码错误',
          type: 'warning'
        });
      }
    },
    logout(state){
      state.login = false;
      Cookies.set('Login', 'false');   
    },
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    },
    editAddress(state, stark){
      console.log(stark.operate )
      if(stark.operate === 'add'){
        // stark.obj.id = parseInt(state.addressList.length)
        state.addressList.push(stark.obj)
      }else if(stark.operate === 'edit'){
        state.addressList.forEach((item, index)=>{
          if(item.id == stark.id){          
            state.addressList[index] = stark.obj;
          }
        })
      }else if(stark.operate === 'del'){
        state.addressList.forEach((item, index)=>{
          if(item.id == stark.id){          
            state.addressList.splice(index,1);
          }
        })
      }
    },
    setDefaultAddr(state, id){
      state.addressList.forEach((item)=>{
        if(item.id == id){          
          item.default = true
        }else{
          item.default = false
        }
      })
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
  if(to.matched.some( m => m.meta.auth)){  
    let Login = Cookies.get('Login'); 
    // 对路由进行验证     
    if(Login === 'true'){ // 已经登陆       
      next()   // 正常跳转到你设置好的页面     
    } else{        
    // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
    　　 next({path:'/login',query:{ Rurl: to.fullPath} })
    } 
  }else{ 
    next() 
  } 
})