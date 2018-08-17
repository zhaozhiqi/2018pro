<template>
  <div id="store">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="storeInfo" :style="{ backgroundImage: 'url(' + storeTopBg + ')' }">
        <div class="filmBg">
          <div class="top">
            <div class="storeLogo">
              <img :src="storeInfo.logo" alt="">
            </div>
            <div class="storeName">{{storeInfo.name}}</div>
          </div>
          <div class="btm">
            <!-- <p>店铺最低发货金额200.00元</p>
            <p>总销量：353</p> -->
          </div>
        </div>
      </div>
      <div class="storeTab">
        <mt-navbar v-model="defaultTab">
          <mt-tab-item id="index">
            <i class="rsiconfont rsicon-home1"></i>首页</mt-tab-item>
          <mt-tab-item id="class">
            <i class="rsiconfont rsicon-fenlei"></i>分类</mt-tab-item>
          <mt-tab-item id="GroupList">
            <i class="rsiconfont rsicon-shangpin"></i>拼团列表</mt-tab-item>
          <mt-tab-item id="intro">
            <i class="rsiconfont rsicon-jieshao"></i>公司介绍</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="defaultTab">
          <mt-tab-container-item id="index">            
            <div class="banner">
              <Slider :pages='storeInfo.banners'></Slider>
            </div>
            <List :proList='storeGoodsList' />
          </mt-tab-container-item>
          <mt-tab-container-item id="class">
            <!-- <div class="title">一级分类</div> -->
            <div class="classCon">
              <div class="classItem" @click="changeClass(storeInfo.id,null)">
                <img src="/static/images/allGoods.png" />
                <span>全部商品</span>
              </div>
              <div class="classItem" v-for="(item, index) in storeClassify" :key="index" @click="changeClass(item.shopId,item.id,item.parentId)">
                <img :src="item.image" />
                <span>{{item.label}}</span>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="GroupList">
            <GroupList :proList='storeGroupList' />
          </mt-tab-container-item>
          <mt-tab-container-item class="intro" id="intro">
            <div>
              <span>公司名称</span> {{storeInfo.name}}</div>
            <div>
              <span>公司地址</span> {{storeInfo.corporateAddress}}</div>
            <h3>店铺资格</h3>
            <img src="static/images/pro-det-01.jpg" />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </main>
    <footer>
      <!-- <div class="storeCollect" @click="storeCollect">
        <i v-show="!isCollect" class="rsiconfont rsicon-shoucang"></i>
        <i v-show="isCollect" class="rsiconfont rsicon-shoucangfill"></i>
        <span>收藏</span>
      </div> -->
      <div class="storeCall">
        <i class="rsiconfont rsicon-dianhua"></i>
        <span>联系卖家</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { getShopClassList, getShop, getShopList, getGroupsList, getGoodsList } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
import List from '@/components/List'
import GroupList from '@/components/GroupList'
import Slider from '@/components/slider'

export default {
  name: "pay",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "店铺主页",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      defaultTab: "index",
      isCollect: false,
      storeTopBg: 'static/images/storeTopBg.png',
      storeInfo: {},
      storeClassify: null,
      storeGoodsList: [],
      storeGroupList: []
    }
  },
  components: {
    CommonHeader,
    List,
    GroupList,
    Slider
  },
  mounted() {
    let addressList = this.$store.state.addressList
    this.init()
  },
  methods: {
    init() {
      const parasmShop = {
        shopId: this.$route.query.id
      }
      getShop(parasmShop).then(result => {
        this.storeInfo = result.data
        console.log(result,'店铺信息')
        const parasmGroupsList = {
          shopId: this.$route.query.id,
          lat: this.storeInfo.lat,
          lng: this.storeInfo.lng
        }
        getGroupsList(parasmGroupsList).then(result => {
          this.storeGroupList = result.data.records
          console.log(result,'店铺拼团信息')
        })

        const parasmGoodsList = {
          shopId: this.$route.query.id,
          lat: this.storeInfo.lat,
          lng: this.storeInfo.lng
        }
        getGoodsList(parasmGoodsList).then(result => {
          this.storeGoodsList = result.data.records
          console.log(result,'店铺商品列表信息')
        })        
      })

      const parasmShopClassList = {
        shopId: this.$route.query.id,
        parentId: 0
      }
      getShopClassList(parasmShopClassList).then(result => {
        this.storeClassify = result.data.records
        console.log(result.data.records,'店铺分类信息')
      })
    },
    changeClass(shopId,id,parentId) {
      const query = { 
        shopId: shopId,
        shopClassifyId: id,
        lat: this.storeInfo.lat,
        lng: this.storeInfo.lng
        //,parentId: parentId
      }
      this.$router.push({ path: '/seach', query:query })
    },
    storeCollect() {
      if (this.isCollect === false) {
        this.$toast({
          message: '已收藏',
          type: 'warning',
          duration: 1000
        });
        this.isCollect = true
      } else {
        this.$toast({
          message: '取消收藏',
          type: 'warning',
          duration: 1000
        });
        this.isCollect = false
      }
    }
  }
}
</script>

<style scoped>
#store .main .storeInfo .filmBg {
  background-image: url('/static/images/film.png');
}
</style>
