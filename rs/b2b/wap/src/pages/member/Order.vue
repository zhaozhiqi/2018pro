<template>
  <div id="order">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <div class="orderMenu">
      <nav>
        <div class="orderItem" :class="{'active':'allOrder' === orderTabActive}" @click="orderTabClick('allOrder',0)">全部订单</div>
        <div class="orderItem" :class="{'active':'payOrder' === orderTabActive}" @click="orderTabClick('payOrder',1)">待付款</div>
        <div class="orderItem" :class="{'active':'sendOrder' === orderTabActive}" @click="orderTabClick('sendOrder',2)">待发货</div>
        <div class="orderItem" :class="{'active':'receiveOrder' === orderTabActive}" @click="orderTabClick('receiveOrder',3)">待收货</div>
        <div class="orderItem" :class="{'active':'refundOrder' === orderTabActive}" @click="orderTabClick('refundOrder',4)">退货</div>
        <!-- <div class="orderItem" v-for="(item, index) in orderTabList" :key="index" :class="{'active':item.id === orderTabActive}" @click="orderTabClick(item.id)">{{item.name}}</div> -->
      </nav>
    </div>
    <main class="main">
      <div class="orderItem" v-for="(itemI, index) in orderList" :key="index" v-show="orderList.indexOf(itemI) === orderTabActiveIndex">
        <Nodata :nodata="nodataObj" v-show="itemI.length <= 0 "></Nodata>
        <div class="orderItemCon" v-for="(itemII, index) in itemI" :key="index" :state="getStatusName(itemII.status)" v-show="orderList[0].length > 0 ">
          <div class="itemTitle">
            <i class="rsiconfont rsicon-dianpu"></i>
            <b>{{itemII.shop.name}}</b>
            <span>{{getStatusName(itemII.status)}}</span>
          </div>
          <div class="itemCon">
            <p class="orderId">订单编号:{{itemII.orderNo}}</p>
            <ul>
              <li class="" v-for="(itemIII, index) in itemII.goodsInfoList" :key="index">
                <figure><img :src="itemIII.displayDiagram"></figure>
                <div>
                  <h4>
                    <span></span>{{itemIII.title}} </h4>
                  <p>
                    <span>¥</span>{{itemIII.money | priceFormat}}
                    <span>×{{itemIII.count}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="itemOperate">
            <p>
              <span>创建时间:{{itemII.createTime}}</span>
              <span>共{{itemII.count}}件商品 实付:
                <b>¥{{itemII.money | priceFormat}}</b>
                <b></b>
              </span>
            </p>
            <p v-if="itemII.status===1000&&isShop===false">
              <router-link class="btn" :to="{path:'/Pay', query: { id: itemII.outTradeNo }}">去支付</router-link>
              <button class="btn" @click="cancelOrder(itemII.orderNo)">取消订单</button>
            </p>
            <p v-else-if="itemII.status===1002&&paytType!==2&&isShop===false">
              <button class="btn" @click="refundOrder(itemII.orderNo)">申请退款</button>
            </p>
            <p v-else-if="itemII.status===1003&&paytType!==2&&isShop===false">
              <button class="btn" @click="refundOrder(itemII.orderNo)">申请退款</button>
              <button class="btn" @click="confirmedOrder(itemII.orderNo)">确认订单</button>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getOrderList, getShopOrderlist, cancelOrder, refundOrder,confirmedOrder } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata'
export default {
  name: 'Order',
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "我的订单",
        isOtherShow: true,
        otherIconClass: "rsicon-home",
        otherLink: {
          path: '/'
        }
      },
      nodataObj: {
        iconName: "rsicon-quanbudingdan",
        nodataMsg: "还没有订单哦"
      },
      isShop:false,
      query: {
        status: null,
        page:1,
        pageSize:1000
      },
      userId: 0,
      orderTabActive: "allOrder",
      orderTabActiveIndex: 0,
      orderList: [[], [], [], [], []]
    }
  },
  components: {
    CommonHeader,
    Nodata
  },
  created() {
    this.init()
  },
  mounted() {
  },
  filters: {
    getNum: function (value) {
      return parseInt(value);
    }
  },
  computed: {

  },
  methods: {
    init() {
      this.orderTabActive = this.$route.params.orderTabActive?this.$route.params.orderTabActive:'allOrder'
      this.isShop = this.$route.params.isShop===true?true:false
      this.getList()
    },
    getList(){
      if(this.isShop === true){
        this.commonHeaderObj.title = '店铺订单'
        getShopOrderlist(this.query).then(result => {
          if (result.code === 200) {
            // console.log(result,'店铺订单-getShopOrderlist')
            const data = result.data.records
            if(!data||data.length<=0){
              return
            }
            let noPay = [],
              noSend = [],
              noTrue = [],
              noEnd = []
            data.forEach(item => {
              let _num = 0
              switch (item.status) {
                case 1000: noPay.push(item)
                  break
                case 1002: noSend.push(item)
                  break
                case 1003: noTrue.push(item)
                  break
                case 1004: 
                case 5001: noEnd.push(item)
                  break
                default:
                  break
              }
              item.goodsInfoList.forEach(good => {
                _num += good.count
              })
              item.count = _num
            })
            this.orderList = [data, noPay, noSend, noTrue, noEnd]
            // console.log(this.orderList.indexOf(this.orderList[0]))
          }
        })
      }else{
        getOrderList(this.query).then(result => {
          // console.log(result,'个人订单-getOrderList')
          if (result.code === 200) {
            const data = result.data.records
            if(!data||data.length<=0){
              return
            }
            let noPay = [],
              noSend = [],
              noTrue = [],
              noEnd = []
            data.forEach(item => {
              let _num = 0
              switch (item.status) {
                case 1000: noPay.push(item)
                  break
                case 1002: noSend.push(item)
                  break
                case 1003: noTrue.push(item)
                  break
                case 1004: 
                case 5001: noEnd.push(item)
                  break
                default:
                  break
              }
              item.goodsInfoList.forEach(good => {
                _num += good.count
              })
              item.count = _num
            })
            this.orderList = [data, noPay, noSend, noTrue, noEnd]
            // console.log(this.orderList.indexOf(this.orderList[0]))
          }
        })
      }
    },
    orderTabClick(type, index) {
      this.orderTabActive = type
      this.orderTabActiveIndex = index
    },
    getStatusName(status) {
      switch (status) {
        case 1000: return '待付款'
          break
        case 1001: return '待成团'
          break
        case 1002: return '待发货'
          break
        case 1003: return '待确认'
          break
        case 1004: return '退款中'
          break
        case 2000: return '已完成'
          break
        case 5000: return '已取消'
          break
        case 5001: return '已退款'
          break
        default:
          break
      }
    },
    cancelOrder(id) {
      this.$messagebox.confirm('确定取消该订单吗?').then(action => {
        if (action == 'confirm') {
          cancelOrder(id).then(res => {
            if (res.code === 200) {
              this.$toast({
                message: '操作成功',
                type: 'warning'
              })
              this.init()
            }
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消')
          return
        }
      })
    },
    refundOrder(id) {
      this.$messagebox.confirm('确定要申请退款吗?').then(action => {
        if (action == 'confirm') {
          refundOrder(id).then(res => {
            if (res.code === 200) {
              this.$toast({
                message: '操作成功',
                type: 'warning'
              })
              this.init()
            }
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消')
          return
        }
      })
    },
    confirmedOrder(id) {
      this.$messagebox.confirm('现在确认订单吗?').then(action => {
        if (action == 'confirm') {
          confirmedOrder(id).then(res => {
            if (res.code === 200) {
              this.$toast({
                message: '操作成功',
                type: 'warning'
              })
              this.init()
            }
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消')
          return
        }
      })
    }
  }
}
</script>
