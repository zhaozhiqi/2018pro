<template>
  <div id="pay">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="order">
        <div class="store">ROUWANBABY旗舰店</div>
        <div class="con">
          <div class="imgOut">
            <img src="static/images/wap-19.png" alt="">
          </div>
          <div class="orderInfo">
            <div class="orderName">肉完ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装</div>
            <div class="orderType">货号：一件</div>
            <div class="orderUnitPrice">¥29.99/件</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number-line">
            <label for="number">购买数量： {{saleNum}}</label><br/>
            <label for="number">收货地址： 浙江省杭州市滨江区百得利大厦</label>
            <!-- <span class="J_limitTxt limit-txt"></span>
                        <div class="number">
                            <button class="decrease" :class="{'disabled':saleNum <= 1}" @click="editSaleNum('minu')">-</button> 
                            <input id="number" type="number" v-model="saleNum"> 
                            <button class="increase" :class="{'disabled':saleNum >= maxNum}" @click="editSaleNum('add')">+</button>
                        </div> -->
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
      <span class="total">¥29.99</span>
      <span class="freight">免运费</span>
      <button class="payBtn" @click="paySend">立即支付</button>
    </footer>
  </div>
</template>

<script>
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
      orderId: null,
      orderType: null,
      saleNum: 1,
      maxNum: 3,
      userInfo: {
        addr: {

        }
      }
    }
  },
  components: {
    CommonHeader
  },
  created() {
    this.orderId = this.$route.query.id
    this.orderType = this.$route.query.type
  },
  mounted() {
  },
  methods: {
    changePay(id) {
      this.payList.forEach(item => {
        if (item.payTypeId === id) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      });
    },
    // editSaleNum(flag) {
    //   let num = 0;
    //   if (flag == 'add') {
    //     if (this.saleNum >= this.maxNum) {
    //       return
    //     }
    //     this.saleNum++;
    //     num = 1;
    //   } else if (flag == 'minu') {
    //     if (this.saleNum <= 1) {
    //       return
    //     }
    //     this.saleNum--;
    //     num = -1;
    //   }
    // },
    paySend() {
      let that = this;
      this.$indicator.open();
      setTimeout(function () {
        that.$indicator.close();
        that.$toast({
          message: '支付成功',
          type: 'warning',
          duration: 1000
        });
        that.$router.push({ path: '/Group' })
      }, 1000)

    }

  }
}
</script>

