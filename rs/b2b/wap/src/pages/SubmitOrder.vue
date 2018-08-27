<template>
  <div id="submitOrder">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="addr">
        <router-link :to="{path:'/address'}" class="right">
          <i class="rsiconfont rsicon-qiehuanqiyou"></i>
        </router-link>
        <span class="left">
          <i class="rsiconfont rsicon-address"></i>
        </span>
        <div class="con">
          <p>
            <span>{{defaultAddressInfo.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{defaultAddressInfo.moible}}</span>
          </p>
          <p>
            <span>{{defaultAddressInfo.address}}</span>
          </p>
        </div>
      </div>
      <div class="order" v-for="(item,index) in orderInfo.items" :key="index">
        <div class="store">
          <!-- <router-link :to="{path:'/store',query:{ id: item.shopId}}"> -->
          {{item.shopName}}
          <!-- </router-link> -->
        </div>
        <div class="con" v-for="(itemI, index) in item.itemGoodsInfoList" :key="index">
          <div class="imgOut">
            <img :src="itemI.displayDiagram" alt="itemI.title">
          </div>
          <div class="orderInfo">
            <div class="orderName">商品：{{itemI.title}}</div>
            <!-- <div class="orderType">货号：一件</div> -->
            <div class="orderUnitPrice">价格：¥{{itemI.money | priceFormat}}</div>
            <div class="orderType">数量：{{itemI.count}}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number-line">
            <label for="number">总数量：{{orderInfo.totalAmount}}</label>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">
      <span>
        <i class="rsiconfont rsicon-yduidunpaishixin"></i>实付款：</span>
      <span class="total">¥{{orderInfo.totalPrice | priceFormat}}</span>
      <!-- <span class="freight">免运费</span> -->
      <button class="payBtn" @click="paySend">提交订单</button>
    </footer>
  </div>
</template>

<script>
import { getGroupCaseInfo, createOrder, getAddressList, getCartBalance } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
export default {
  name: "submitOrder",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "提交订单",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      orderId: null,
      orderType: null,
      saleNum: 1,
      orderInfo: {},
      defaultAddressInfo: {}
    }
  },
  components: {
    CommonHeader
  },
  created() {

    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      let that = this
      this.orderType = this.$route.query.type
      console.log(this.orderType)
      if (this.orderType === 'group') {
        getGroupCaseInfo().then(result => {
          // console.log(result, 'result')
          if (result.code === 200) {
            this.orderInfo = result.data
          }
        })
      } else if (this.orderType === 'self') {
        getCartBalance().then(result => {
          // console.log(result, 'result')
          if (result.code === 200) {
            this.orderInfo = result.data
          }
        })
      }
      getAddressList().then(result => {
        // console.log(result, 'result add')
        if (result.code === 200) {
          if(result.data){
            const addressList = result.data
            addressList.forEach((item, index) => {
              if (item.isDefault === 1) {
                this.defaultAddressInfo = item
                return
              }
            })
          }else{
            this.$toast({
              message: '您还没有设置收货地置,请设置收货地址',
              type: 'warning'
            })
            that.$router.push({ path: '/Address' })
          }
        }
      })
    },
    paySend() {
      let that = this;
      this.$indicator.open();
      const params = new URLSearchParams()
      console.log(this.orderInfo)
      if (this.orderType === 'group') {
        if (this.orderInfo.caseId !== undefined && this.orderInfo.caseId !== null) {
          params.append('caseId', this.orderInfo.caseId)
        }
        params.append('goodsGroupPurchaseId', this.orderInfo.groupPurchaseId)
        params.append('lot', this.orderInfo.lot)
        params.append('addressId', this.defaultAddressInfo.id)
      }else if (this.orderType === 'self') {
        params.append('buyerCartGoodsIds', this.orderInfo.buyerCartGoodsIds)
        params.append('lot', this.orderInfo.totalAmount)
        params.append('addressId', this.defaultAddressInfo.id)
      }

      createOrder(params).then(result => {
        console.log(result, 'result')
        if (result.code === 200) {
          that.$indicator.close();
          that.$toast({
            message: '提交成功',
            type: 'warning',
            duration: 1000
          })
          that.$router.push({ path: '/Pay', query: { id: result.data, type: 'group' } })
        }
      })
    }
  }
}
</script>

