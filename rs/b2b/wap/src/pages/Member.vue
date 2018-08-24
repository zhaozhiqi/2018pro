<template>
  <div id="member">
    <div class="main">
      <header class="header">
        <div class="top">
          <router-link to="/setting" class="memberSetLink">
            <i class="rsiconfont rsicon-31shezhi"></i>
          </router-link>
          <router-link to="/noticeList" class="noticeListLink">
            <i class="rsiconfont rsicon-31xiaoxi"></i>
          </router-link>
        </div>
        <div class="memberInfo">
          <figure><img class="memberLogo" :src="userInfo.headThumb"></figure>
          <div class="userInfoCon">
            <p class="userInfoName">{{userInfo.name}}</p>
            <p class="userInfoId">{{userInfo.mobile}}</p>
            <p class="typeName">{{userInfo.typeName}}</p>
          </div>
        </div>
      </header>
      <section class="section">
        <router-link :to="{ name: 'Order', params:{ userId: userInfo.id, orderTabActive: 'allOrder'}}" class="itemLink">
          <span class="linkName">
            <i class="rsiconfont rsicon-quanbudingdan"></i>
            <em>全部订单</em>
          </span>
          <span class="linkRouter">
            <em></em>
            <i class="rsiconfont rsicon-qiehuanqiyou"></i>
          </span>
        </router-link>
        <div class="orderMenu">
          <nav>
            <!-- <router-link :to="{ name: 'Order', params:{ userId: userInfo.id, orderTabActive: item.type}}" class="orderMenuLink" v-for="(item, index) in orderMenuList" :key="index">
							<i class="rsiconfont" :class="item.iconClass"></i>
							<span>{{item.name}}</span>
							<b class="line"></b>
							<em class="num">{{item.num}}</em>
						</router-link> -->
            <router-link :to="{ name: 'Order', params:{ userId: '0001', orderTabActive: 'payOrder'}}" class="orderMenuLink">
              <i class="rsiconfont rsicon-31daifukuan"></i>
              <span>待付款</span>
              <b class="line"></b>
              <em class="num" v-show="orderCountList.noPay>0">{{orderCountList.noPay}}</em>
            </router-link>
            <router-link :to="{ name: 'Order', params:{ userId: '0001', orderTabActive: 'sendOrder'}}" class="orderMenuLink">
              <i class="rsiconfont rsicon-31daifahuo"></i>
              <span>待发货</span>
              <b class="line"></b>
              <em class="num" v-show="orderCountList.noSend>0">{{orderCountList.noSend}}</em>
            </router-link>
            <router-link :to="{ name: 'Order', params:{ userId: '0001', orderTabActive: 'receiveOrder'}}" class="orderMenuLink">
              <i class="rsiconfont rsicon-31daishouhuo"></i>
              <span>待收货</span>
              <b class="line"></b>
              <em class="num" v-show="orderCountList.noTrue>0">{{orderCountList.noTrue}}</em>
            </router-link>
            <router-link :to="{ name: 'Order', params:{ userId: '0001', orderTabActive: 'refundOrder'}}" class="orderMenuLink">
              <i class="rsiconfont rsicon-tuikuantuihuo"></i>
              <span>退货</span>
              <b class="line"></b>
              <em class="num" v-show="orderCountList.noEnd>0">{{orderCountList.noEnd}}</em>
            </router-link>
          </nav>
        </div>
        <router-link :to="item.path" class="itemLink" v-if="memberMenuList.length>0" v-for="(item, index) in memberMenuList" :key="index">
          <span class="linkName">
            <i class="rsiconfont rsicon-radio"></i>
            <em>{{item.name}}</em>
          </span>
          <span class="linkRouter">
            <em>{{item.con}}</em>
            <i class="rsiconfont rsicon-qiehuanqiyou"></i>
          </span>
        </router-link>
      </section>
      <!-- <div class="car-member-recommend">为您推荐</div> 
			<TypeGoodsList /> -->
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrderCount, getUserInfo } from '@/api/m_api'

import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie'

export default {
  name: 'Member',
  data() {
    return {
      userInfo: {
        id: "0001",
        name: "王XX",
        typeName: "用户",
        mobile: "",
        headThumb: "static/images/memberLogo.jpg",
        type: ''
      },
      orderCountList: {
        all: 0,
        noPay: 0,
        noSend: 0,
        noTrue: 0,
        noEnd: 0
      },
      memberMenuList: []
    }
  },
  computed: {
    ...mapGetters([
      'rank',
      'id',
      'name',
      'mobile',
      'headThumb',
      'type'
    ])
  },
  components: {
    TypeGoodsList,
    Footer
  },
  created() {
    console.log(this.rank)
    this.init()
  },
  mounted() { },
  methods: {
    init() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        console.log(res,'GetUserInfo')
        this.userInfo.id = res.data.id
        this.userInfo.name = res.data.name
        this.userInfo.mobile = res.data.mobile
        this.userInfo.headThumb = res.data.headThumb
        this.userInfo.type = res.data.type
        switch (this.userInfo.type) {
          case 'C': this.userInfo.typeName = "消费者"
            // this.memberMenuList = [
            //   {
            //     href: '',
            //     iconClass: "rsicon-31daifukuan",
            //     name: "我的拼团",
            //     con: "",
            //     num: 1,
            //     path:{ name: 'Order', params:{ userId: this.userInfo.id, orderTabActive: 'allOrder', isShop:true}}
            //   }
            // ]
            break
          case 'D': this.userInfo.typeName = "经销商"
          case 'W': this.userInfo.typeName = "批发商"
          case 'R': this.userInfo.typeName = "零售商"
            this.memberMenuList = [
              //  {
              //   href: 'Seach',
              //   iconClass: "rsicon-31daifukuan",
              //   name: "我的商品",
              //   con: "",
              //   num: 1
              // }, 
              {
                href: 'Order',
                iconClass: "rsicon-31daifukuan",
                name: "店铺订单",
                con: "",
                num: 1,
                path:{ name: 'Order', params:{ userId: this.userInfo.id, orderTabActive: 'allOrder', isShop:true}}
              }
            ]
            break
          default:this.userInfo.typeName = "消费者"
            this.memberMenuList = [
              {
                href: 'Order',
                iconClass: "rsicon-31daifukuan",
                name: "我的拼团",
                con: "",
                num: 1,
                path:{ name: 'Order', params:{ userId: this.userInfo.id, orderTabActive: 'allOrder', isShop:true}}
              }
            ]
            break
        }
      })
      getOrderCount().then(res => {
        if (res.code === 200) {
          this.orderCountList.noPay = res.data.unpaidCount
          this.orderCountList.noSend = res.data.notYetShippedCount
          this.orderCountList.noTrue = res.data.unconfirmedCount
          this.orderCountList.noEnd = res.data.refundingCount
          this.orderCountList.all = parseInt(res.data.unpaidCount + res.data.notYetShippedCount + res.data.unconfirmedCount + res.data.refundingCount)
        }
      })
    }
  }
};
</script>
