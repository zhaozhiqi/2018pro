<template>
  <div id="groupProduct">
    <div class="main">
      <div class="banner" w-750-750 aspectratio aspect-ratio="750/750">
        <div aspectratio-content>
          <span class="goBack" @click="goback">
            <i class="rsiconfont rsicon-qiehuanqizuo"></i>
          </span>
          <!-- <router-link to="/Cart" class="goCart"><i class="rsiconfont rsicon-31gouwuche"></i></router-link> -->
          <mt-swipe :class="mint-swipe" :auto="0" :speed="400">
            <mt-swipe-item :class="mt-swipe-item" v-for="(url, index) in productInfo.images" :key="index"><img :src="url" /></mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="good-detail">
        <p class="g-name">
          <span class="labelty" v-if="productInfo.proLabel">{{productInfo.proLabel}}</span>{{productInfo.title}}</p>
        <p class="g-code">厂商：{{productInfo.manufacturerName}}</p>
        <p class="g-code">编号：{{productInfo.code}}</p>
        <p class="g-code">规格：{{productInfo.specifications}}</p>
        <p class="g-code">单位：{{productInfo.unit}}</p>
        <p class="g-price">
          <span>建议零售价：¥ </span>
          <strong>{{productInfo.retailPrice}}</strong>
          <s v-show="false">¥{{productInfo.proOldPrice}}</s>
        </p>
      </div>
      <div class="group-order" v-if="hasGroupList">
        <div class="group-order-all">已{{productInfo.groupPurchaseNumber}}人参与
          <span class="group-order-getAll" @click="openAllGroupOrder()">查看更多
            <i class="rsiconfont rsicon-qiehuanqiyou"></i>
          </span>
        </div>
        <div class="group-order-con" v-if="productInfo.groupPurchaseCases">
          <mt-swipe :class="mint-swipe" :auto="3000" :speed="600" :show-indicators="false">
            <mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in productInfo.groupPurchaseCases.records" :key="index">
              <div class="group-order-item">
                <button class="joinGroupBtn" @click="joinGroupOrder(index,slider.id)" v-show="slider.djs !== '已过期'">去拼团</button>
                <div class="groupOrderInfo">
                  <p class="t">还差
                    <span>{{slider.surplusCaseLot}}</span>份拼成</p>
                  <p class="b">{{slider.djs}}</p>
                </div>
                <div class="orderUserIcon">
                  <img class="orderUserImage" :src="slider.headThumb" alt="" style="width:50px;height:50px;">
                </div>
                <span class="orderUserName">{{slider.nick}}<br/>(每份为该商品*{{slider.count/slider.caseLot}})</span>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="go-mall">
        <figure>
          <img :src="productInfo.shop.logo" lazy="loaded">
        </figure>
        <p>
          <span>{{productInfo.shop.name}}</span>
          <!-- <small>{{productInfo.shop.storeDec}}</small> -->
        </p>
        <router-link class="goStore" :to="{path:routerStorePath, query: { id: productInfo.shop.id }}">进入店铺
          <i class="rsiconfont rsicon-qiehuanqiyou"></i>
        </router-link>
      </div>
      <div class="product-details" v-html="productInfo.product.detail"></div>
      <!-- <div class="product-recommend">为您推荐</div> 
		<TypeGoodsList/> -->
    </div>
    <footer class="footer">
      <!-- <div class="top">
        <label>数量</label>
        <div class="editNum">
        <button class="minusBtn" @click="editSaleNum('minu')"><i class="rsiconfont rsicon-jian"></i></button> 
        <input readonly="readonly" type="number" class="goodsNum" v-model="saleNum" /> 
        <button class="addBtn" @click="editSaleNum('add')"><i class="rsiconfont rsicon-jia"></i></button>    
        </div>    
      </div> -->
      <div class="btm">
        <nav>
          <div class="btm-I">
            <router-link to="/group" class="btm-II">
              <i class="rsiconfont rsicon-pintuanzhuanqu"></i>拼团首页
            </router-link>
            <div class="btm-II" @click="openService">
              <i class="rsiconfont rsicon-kefu1"></i>客服
            </div>
            <!-- <div class="btm-II">
				  <i class="rsiconfont rsicon-shoucang"></i>收藏
				</div>
				<router-link to="/Cart" class="btm-II">
				  <i class="rsiconfont rsicon-31gouwuche"></i>购物车
					<em class="num" v-show="cartCount > 0">{{cartCount}}</em>
				</router-link> -->
          </div>
          <div class="btm-I">
            <div class="btm-III buySelf" @click="buySelf">
              ¥{{productInfo.money}}<br/>单独购买
            </div>
            <div class="btm-III groupNow" @click="groupNow()" v-if="hasGroup">
              ¥{{productInfo.shopGroupPurchase.money}}<br/>发起拼团
            </div>
          </div>
        </nav>
      </div>
    </footer>
    <section class="popup-center" v-show="serviceShow">
      <div class="explain">
        <h3>联系客服</h3>
        <div class="con">
          <h4>
            <i class="rsiconfont rsicon-dianhuahover"></i>客服电话:</h4>
          <p v-for="(item,index) in productInfo.customerServices" :key="index">{{item.name}}：
            <b>{{item.mobile}}</b>
          </p>
        </div>
        <div class="closeBtn" @click="closeService">知道了</div>
      </div>
    </section>
    <section class="popup-center" v-show="allGroupOrderShow">
      <div class="group-order">
        <div class="closeOut"><mt-button type="danger" @click="closeAllGroupOrder">取消</mt-button></div>
        <div class="group-order-con">
          <div class="group-order-item" v-for="(slider, index) in productInfo.groupPurchaseCases.records" :key="index">
            <button class="joinGroupBtn" @click="joinGroupOrder(index,slider.id)" v-show="slider.djs !== '已过期'">去拼团</button>
            <div class="groupOrderInfo">
              <p class="t">还差
                <span>{{slider.surplusCaseLot}}</span>份拼成</p>
              <p class="b">{{slider.djs}}</p>
            </div>
            <div class="orderUserIcon">
              <img class="orderUserImage" :src="slider.headThumb" alt="" style="width:50px;height:50px;">
            </div>
            <span class="orderUserName">{{slider.nick}}<br/>
            <!-- (每份为该商品*{{slider.count/slider.caseLot}}) -->
            </span>
          </div>
        </div>
      </div>
    </section>
    <WidgetsCover :class="{'show':widgetsCoverShow}" v-on:widgetsCoverShow="closeWidgetsCover" v-on:saveDecideVal="getDecideVal" :saleType="saleType" :groupIndex="groupIndex" :changeInfo="productInfo"></WidgetsCover>
  </div>
</template>

<script>
import { getGoods, setGroupCaseInfo, cartSave } from '@/api/m_api'
import Cookies from 'js-cookie'

import TypeGoodsList from '@/components/TypeGoodsList'
import WidgetsCover from '@/components/widgets-cover'
import { countDown } from '@/utils'
export default {
  name: 'groupProduct',
  data() {
    return {
      query: {
        caseId: null,
        goodsGroupPurchaseId: null,
        lot: null
      },
      message: '',
      serviceShow: false,
      allGroupOrderShow: false,
      mint: null,
      swipe: null,
      mt: null,
      item: null,
      hasGroup: null,
      hasGroupList: null,
      query: {},
      saleType: 'self',
      widgetsCoverShow: false,
      routerStorePath: '/Store',
      saleNum: 1,
      groupIndex: null,
      productInfo: {
        "saleNum": 1,
        "id": 0,
        "shopId": 0,
        "productId": 0,
        "classifyId": 0,
        "shopClassifyId": 0,
        "title": "",
        "summary": "",
        "code": "",
        "stock": 0,
        "money": 0,
        "manufacturerName": "",
        "retailPrice": 0,
        "specifications": "",
        "unit": "",
        "shelfState": 0,
        "salesAreaCode": 0,
        "updateTime": "",
        "createTime": "",
        "shop": {
          "id": 1,
          "name": "",
          "logo": "",
          "corporateAddress": "",
          "userId": 0,
          "areaCode": 0,
          "areaName": "",
          "valid": 0,
          "lng": 120.225985,
          "lat": 30.212834,
          "createTime": ""
        },
        "product": {},
        "classify": {},
        "shopClassify": {},
        "images": [],
        "identifier": "bw"
      }
    }
  },
  components: {
    TypeGoodsList,
    WidgetsCover
  },
  created() {
    this.init()
  },
  mounted() {
    // console.log(countDown("2018,07,07 12:00:00"))    
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  methods: {
    init() {
      // this.query.lng = Cookies.get('AREA_LNG')
      // this.query.lat = Cookies.get('AREA_LAT')
      this.getGroup()
    },
    getGroup() {
      const parasmGetGroups = JSON.parse(JSON.stringify(this.query))
      parasmGetGroups.identifier = this.$route.query.id
      getGoods(parasmGetGroups).then(result => {
        this.productInfo = result.data
        this.query.goodsGroupPurchaseId = this.productInfo.shopGroupPurchase.id
        /* 是否有拼团商品 */
        this.hasGroup = result.data.shopGroupPurchase !== undefined
        this.hasGroupList = (result.data.shopGroupPurchase !== undefined && this.productInfo.groupPurchaseCases.total > 0)
        //console.log(this.productInfo, 'this.productInfo' )
        if (this.hasGroupList === true) {
          this.productInfo.groupPurchaseCases.records.map((item, index) => {
            this.$set(item, 'djs', countDown(item.endTime))
          })
          this.changeOrderDjs()
        }
      })
    },
    editSaleNum(flag) {
      let num = 0;
      if (flag == 'add') {
        if (this.saleNum >= this.productInfo.stock) {
          return
        }
        this.saleNum++;
        num = 1;
      } else if (flag == 'minu') {
        if (this.saleNum <= 1) {
          return
        }
        this.saleNum--;
        num = -1;
      }
    },
    goback() {
      this.$store.dispatch('backLastPage')
    },
    buySelf() {
      // let num = this.productInfo.saleNum
      // let pro = this.proStore
      // this.$store.commit('updateCartCount',1)
      // console.log(num,'num')
      this.saleType = 'self';
      this.openWidgetsCover()
      console.log('buySelf', this.saleType)
    },
    groupNow(index) {
      this.saleType = 'group';
      if (index !== undefined) {
        this.groupIndex = index
      } else {
        this.groupIndex = null
        console.log('新开团')
      }
      this.openWidgetsCover()
    },
    openWidgetsCover() {
      this.widgetsCoverShow = true
    },
    closeWidgetsCover(val) {
      this.widgetsCoverShow = val
    },
    getDecideVal(val) {
      console.log(val, val.id, val.num, val.typeList, 'getDecideVal')
      if (val.saleType === 'self') {
        let num = val.num
        this.saleNum = num
        const parasm = {
          shopId: this.productInfo.shopId,
          shopGoodsId: this.productInfo.id,
          count: num
        }
        cartSave(parasm).then(result => {
          console.log(result, 'result')
          if (result.code === 200) {
            this.$toast({
              message: '已添加至购物车',
              type: 'warning',
              duration: 1000
            })
          }
        })
      } else if (val.saleType === 'group') {
        this.query.lot = val.groupNum
        this.goPay()
      }
    },
    goPay() {
      let that = this
      this.$indicator.open()
      setGroupCaseInfo(this.query).then(result => {
        console.log(result, 'result')
        if (result.code === 200) {
          that.$indicator.close()
          that.$router.push({ path: '/SubmitOrder', query: { type: this.saleType } })
        }
      })
    },
    reverseArr(arr) {
      let _arr = arr
      _arr = _arr.reverse()
      return _arr
    },
    joinGroupOrder(index, id) {
      this.query.caseId = id

      this.$messagebox.confirm('参与该拼单？').then(action => {
        this.groupNow(index)
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消');
          return
        }
      });
    },
    changeOrderDjs() {
      let that = this
      let timer = setInterval(() => {
        this.productInfo.groupPurchaseCases.records.forEach(item => {
          let newDjs = countDown(item.endTime)
          newDjs !== false ? item.djs = '剩余 ' + newDjs : item.djs = '已过期'
        });
      }, 100)
    },
    openService() {
      this.serviceShow = true
    },
    closeService() {
      this.serviceShow = false
    },
    openAllGroupOrder() {
      this.allGroupOrderShow = true
    },
    closeAllGroupOrder() {
      this.allGroupOrderShow = false
    }
    
  }
};
</script>
