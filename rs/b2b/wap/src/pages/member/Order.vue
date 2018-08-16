<template>
  <div id="order">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <div class="orderMenu">
      <nav>
        <div class="orderItem" :class="{'active':'allOrder' === orderTabActive}" @click="orderTabClick('allOrder')">全部订单</div>
        <div class="orderItem" :class="{'active':'payOrder' === orderTabActive}" @click="orderTabClick('payOrder')">待付款</div>
        <div class="orderItem" :class="{'active':'sendOrder' === orderTabActive}" @click="orderTabClick('sendOrder')">待发货</div>
        <div class="orderItem" :class="{'active':'receiveOrder' === orderTabActive}" @click="orderTabClick('receiveOrder')">待收货</div>
        <div class="orderItem" :class="{'active':'refundOrder' === orderTabActive}" @click="orderTabClick('refundOrder')">退货</div>
        <!-- <div class="orderItem" v-for="(item, index) in orderTabList" :key="index" :class="{'active':item.id === orderTabActive}" @click="orderTabClick(item.id)">{{item.name}}</div> -->
      </nav>
    </div>
    <main class="main">
      <!-- <div class="orderItem" v-for="(itemI, index) in orderList" :key="index" v-show="itemI.orderType == orderTabActive">
        <Nodata :nodata="nodataObj" v-if="itemI.list.length <= 0"></Nodata>
        <div class="orderItemCon" v-for="(itemII, index) in itemI.list" :key="index" :state="itemII.stateName" v-else>
          <div class="itemTitle">
            <i class="rsiconfont rsicon-dianpu"></i>
            <b>{{itemII.storeName}}</b>
            <span>{{itemII.stateName}}</span>
          </div>
          <div class="itemCon">
            <p class="orderId">订单编号:{{itemII.orderId}}</p>
            <ul>
              <li class="" v-for="(itemIII, index) in itemII.productList" :key="index">
                <figure><img :src="itemIII.proImg"></figure>
                <div>
                  <h4>
                    <span></span>{{itemIII.proName}}</h4>
                  <p>
                    <span>¥</span>{{itemIII.proPrice}}
                    <span>×{{itemIII.proNum}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="itemOperate">
            <p>
              <span>共{{itemII.proAllNum}}件商品 实付:
                <b>¥</b>
                <b>{{itemII.orderMoney}}</b>
              </span>
            </p>
            <p>
              <router-link class="btn" v-for="(itemIIII, index) in itemI.button" :key="index" :id="itemII.orderId" :to="itemIIII.link">{{itemIIII.name}}</router-link>
            </p>
          </div>
        </div>
      </div> -->
      <div class="orderItem" v-for="(itemI, index) in orderList" :key="index" v-show="itemI.orderType == orderTabActive">
        <Nodata :nodata="nodataObj" v-if="itemI.list.length <= 0"></Nodata>
        <div class="orderItemCon" v-for="(itemII, index) in itemI.list" :key="index" :state="itemII.stateName" v-else>
          <div class="itemTitle">
            <i class="rsiconfont rsicon-dianpu"></i>
            <b>{{itemII.storeName}}</b>
            <span>{{itemII.stateName}}</span>
          </div>
          <div class="itemCon">
            <p class="orderId">订单编号:{{itemII.orderId}}</p>
            <ul>
              <li class="" v-for="(itemIII, index) in itemII.productList" :key="index">
                <figure><img :src="itemIII.proImg"></figure>
                <div>
                  <h4>
                    <span></span>{{itemIII.proName}}</h4>
                  <p>
                    <span>¥</span>{{itemIII.proPrice}}
                    <span>×{{itemIII.proNum}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="itemOperate">
            <p>
              <span>共{{itemII.proAllNum}}件商品 实付:
                <b>¥</b>
                <b>{{itemII.orderMoney}}</b>
              </span>
            </p>
            <p>
              <router-link class="btn" v-for="(itemIIII, index) in itemI.button" :key="index" :id="itemII.orderId" :to="itemIIII.link">{{itemIIII.name}}</router-link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getOrderList } from '@/api/m_api'

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
      query:{
        status: null
      },
      userId: 0,
      orderTabActive: "allOrder",
      orderList: []
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
    init(){
      getOrderList(this.query).then(result => {
        console.log(result,'result')
        if(result.code === 200){
          this.orderList = result.data.records
        }
      })
    },
    orderTabClick(type) {
      this.orderTabActive = type;
    }
  }
};
</script>
