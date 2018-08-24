<template>
  <div id="pay">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="order" v-if="orderInfo!=={}">
        <div class="store">{{orderInfo.shop.name}}</div>
        <div class="con" v-for="(item,index) in orderInfo.goodsInfoList" :key="index">
          <div class="imgOut">
            <img :src="item.displayDiagram" alt="item.title">
          </div>
          <div class="orderInfo">
            <div class="orderName">{{item.title}}</div>
            <div class="orderType">{{item.unit}} {{item.specifications}}</div>
            <div class="orderUnitPrice">¥{{item.money | priceFormat}}</div>
            <div class="orderUnitPrice">x{{item.count}}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number-line">
            <label for="number">创建时间： {{orderInfo.createTime}}</label><br/>
            <label for="number">创建时间： {{orderInfo.createTime}}</label><br/>
            <label for="number">收货人： {{orderInfo.consigneeName}}</label><br/>
            <label for="number">收件人电话： {{orderInfo.consigneeMobile}}</label><br/>
            <label for="number">收货地址： {{orderInfo.consigneeAddress}}</label>
          </div>
        </div>
      </div>
      <div class="payList">
        <div class="payItem payWeixin" v-for="(item, index) in payList" :key="index" :class="item.className" :dataType="item.dataType" :payTypeId="item.payTypeId" @click="changePay(item.payTypeId)">
          <i class="rsiconfont l" :class="item.iconClassName"></i>
          {{item.payName}}
          <i class="rsiconfont rsicon-xuanzhong1 r" v-show="item.isActive"></i>
        </div>
      </div>
    </main>
    <footer class="footer">
      <span>
        <i class="rsiconfont rsicon-yduidunpaishixin"></i>实付款：</span>
      <span class="total">¥{{orderInfo.money | priceFormat}}</span>
      <!-- <span class="freight">免运费</span> -->
      <button class="payBtn" @click="paySend">立即支付</button>
    </footer>
  </div>
</template>

<script>
import { getGroupCaseInfo, getOrder, getAddressList } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
export default {
  name: "pay",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "支付",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      payList: [
        {
          className: 'payWeixin',
          dataType: 'weixin',
          payTypeId: '1',
          iconClassName: 'rsicon-unie655',
          payName: '微信支付',
          isActive: true
        }
        // ,
        // {
        //     className: 'payZhifubao',
        //     dataType: 'zhifubao',
        //     payTypeId: '2',
        //     iconClassName: 'rsicon-zhifubao',
        //     payName: '支付宝支付',
        //     isActive: false
        // }
      ],
      orderInfo:{
        shop:{
          name:''
        },
        money:0
      }
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
      this.orderNo = this.$route.query.id
      const params = {
        outTradeNo: this.orderNo
      }
      this.orderType = this.$route.query.type
      getOrder(params).then(result => {
        console.log(result, 'getOrder')
        if (result.code === 200&&result.data) {
          this.orderInfo = result.data
        }
      })
    },
    changePay(id) {
      this.payList.forEach(item => {
        if (item.payTypeId === id) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      });
    },
    paySend() {
      let that = this;
      this.$indicator.open();
      setTimeout(function () {
        that.$indicator.close();
        that.$toast({
          message: '支付成功',
          type: 'warning',
          duration: 1000
        })
        that.$router.push({ path: '/Group' })
      }, 1000)

    }

  }
}
</script>

