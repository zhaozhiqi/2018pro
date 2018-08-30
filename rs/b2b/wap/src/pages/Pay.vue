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
import { getWechatConfig, postPay } from '@/api/c_api'
import { isWeiXin } from '@/utils'

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
          payTypeId: 0,
          iconClassName: 'rsicon-unie655',
          payName: '微信支付',
          isActive: true
        },
        {
          className: 'payOnDelivery',
          dataType: 'ondelivery',
          payTypeId: 2,
          iconClassName: 'rsicon-huodaofukuan',
          payName: '线下支付',
          isActive: false
        }
      ],
      orderInfo: {
        orderNo: null,
        payType: null,
        groupPurchaseCaseId: 0,
        shop: {
          name: ''
        },
        money: 0
      },
      payInfo: {
        orderNo: null,
        type: null
      },
      userInfo: {},
      isGroup: false,
      isWechat: false
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
      this.getData()
      this.getWeChatConfingData()
      this.isWechat = isWeiXin()
      this.$store.dispatch('GetUserInfo').then((res) => {
        //console.log(res, 'GetUserInfo')
        if (res.code === 200) {
          this.userInfo = res.data
        }
      }).then(() => {
        this.setPayType()
      })
    },
    getWeChatConfingData() {
      getWechatConfig().then(res => {
        console.log(res, 'getWechatConfig')
        if (res.code === 200) {
          wx.config({
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'chooseImage', //拍照或从手机相册中选图接口
              'previewImage', //预览图片接口
              'uploadImage', //上传图片接口
              'downloadImage', //下载图片接口
              'chooseWXPay',//微信支付接口
              'openLocation',//使用微信内置地图查看位置接口
              'getLocation' //获取地理位置接口
            ]
          })
        }
      })
    },
    getData() {
      const params = {
        outTradeNo: this.orderNo
      }
      this.orderType = this.$route.query.type
      getOrder(params).then(result => {
        console.log(result, 'getOrder')
        if (result.code === 200 && result.data) {
          this.orderInfo = result.data
          this.payInfo.orderNo = result.data.orderNo
          if (this.orderInfo.groupPurchaseCaseId === 0) {
            this.isGroup = false
          } else {
            this.isGroup = true
          }
        }
      })
    },
    setPayType() {
      if (this.isGroup === true) {
        this.payList = [
          {
            className: 'payWeixin',
            dataType: 'weixin',
            payTypeId: 0,
            iconClassName: 'rsicon-unie655',
            payName: '微信支付',
            isActive: true
          }
        ]
      } else {
        if (this.userInfo.type === 'C') {
          this.payList = [
            {
              className: 'payWeixin',
              dataType: 'weixin',
              payTypeId: 0,
              iconClassName: 'rsicon-unie655',
              payName: '微信支付',
              isActive: true
            }
          ]
        } else {
          this.payList = [
            {
              className: 'payOnDelivery',
              dataType: 'ondelivery',
              payTypeId: 2,
              iconClassName: 'rsicon-huodaofukuan',
              payName: '线下支付',
              isActive: true
            }
          ]
        }
      }
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
      this.payList.forEach(item => {
        if (item.isActive === true) {
          this.payInfo.type = item.payTypeId
        }
      })
      console.log(this.payInfo, 'this.payInfo')
      // let that = this
      // this.$indicator.open()
      postPay(this.payInfo).then(res => {
        console.log(res, 'postPay')
        if (res.code === 200) {
          if (this.payInfo.type === 2) {
            this.$toast({
              message: '支付成功',
              type: 'warning'
            })
            this.$router.push({ path: '/group' })
          } else if (this.payInfo.type === 0) {
            if (this.isWechat === true) {
              wx.chooseWXPay({
                timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: '', // 支付签名随机串，不长于 32 位
                package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: '', // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                }
              })
            } else {
              this.$toast({
                message: 'h5调起支付',
                type: 'warning'
              })
            }
          }
        } else {
          this.$toast({
            message: res.msg,
            type: 'warning'
          })
        }
      })
      // postPay(this.payInfo.type).then(res=>{
      // })
      // setTimeout(function () {
      //   that.$indicator.close();
      //   that.$toast({
      //     message: '支付成功',
      //     type: 'warning',
      //     duration: 1000
      //   })
      //   that.$router.push({ path: '/Group' })
      // }, 1000)
    }

  }
}
</script>

