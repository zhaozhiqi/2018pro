<template>
  <div id="product">
    <div class="main">
      <div class="banner" w-750-750 aspectratio aspect-ratio="750/750">
        <div aspectratio-content>
          <span class="goBack" @click="goback">
            <i class="rsiconfont rsicon-qiehuanqizuo"></i>
          </span>
          <router-link to="/Cart" class="goCart">
            <i class="rsiconfont rsicon-31gouwuche"></i>
          </router-link>
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
      <div class="product-details" v-html="productInfo.product.detail">
        <!-- <img 
			class="detailImg"
			v-for="(item, index) in productInfo.proDetList"
			:key="index"
			:src="item" 
			alt="商品详情"> -->
      </div>
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
            <div class="btm-II">
              <i class="rsiconfont rsicon-kefu1"></i>客服
            </div>
            <!-- <div class="btm-II">
				  <i class="rsiconfont rsicon-shoucang"></i>收藏
				</div> -->
            <router-link to="/Cart" class="btm-II">
              <i class="rsiconfont rsicon-31gouwuche"></i>购物车
              <em class="num" v-show="cartCount > 0">{{cartCount}}</em>
            </router-link>
          </div>
          <div class="btm-I">
            <div class="btm-III buyCart" @click="addCart">
              加入购物车
            </div>
            <div class="btm-III buyNow" @click="buyNow">
              ¥{{productInfo.money}}<br/>立即购买
            </div>
          </div>
        </nav>
      </div>
    </footer>
    <WidgetsCover :class="{'show':widgetsCoverShow}" v-on:widgetsCoverShow="closeWidgetsCover" v-on:saveDecideVal="getDecideVal" :saleType="saleType" :changeInfo="productInfo" :saleNum="saleNum"></WidgetsCover>
  </div>

</template>

<script>
import { getGoods } from '@/api/m_api'

import TypeGoodsList from '@/components/TypeGoodsList';
import WidgetsCover from '@/components/widgets-cover';
import { countDown } from '@/utils'

export default {
  name: 'Index',
  data() {
    return {
      message: '',
      mint: null,
      swipe: null,
      mt: null,
      item: null,
      query: {},
      saleType: 'self',
      widgetsCoverShow: false,
      routerStorePath: '/Store',
      saleNum: 1,
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
      // productInfo:{
      // 	proId: "0001",
      // 	proLabel:"自营",
      //   proName:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",
      //   proManufacturer: "可口可乐公司",
      //   proNo:"5513213245aasd",
      //   proStandard:"XX",
      //   proUnit:"XXXX",
      // 	proDec:"501mL(含)-999mL(含)",
      // 	proPrice:58.00,
      // 	proOldPrice:80.00,
      // 	proSelfPrice:99.99,
      // 	proGroupPrice:29.99,
      // 	proStock: 9,
      // 	saleNum:1,
      // 	proStore:{
      // 		storeId:"0001",
      // 		storeName:"Coca-Cola可口可乐旗舰店",
      // 		storeDec:"品牌旗舰店",
      // 		storeLogoImg:"static/images/storeLogo2.png"
      // 	},
      // 	proChangeImage:'static/images/pro-02.jpg',
      // 	proChangeList:[
      // 			{
      // 				typeId:1,
      // 				typeName:'分类',
      // 				con:[
      // 					{
      // 						dataName: '新包装',
      // 						dataValue: '1001:01',
      // 						dataImage: 'static/images/pro-02-2.jpg',
      // 						dataChecked: false,
      // 						dataPrice: 58.00
      // 					},
      // 					{
      // 						dataName: '胶瓶装（小）',
      // 						dataValue: '1001:02',
      // 						dataImage: 'https://gw3.alicdn.com/bao/uploaded/i4/2656379929/TB1HWSebnqWBKNjSZFxXXcpLpXa_!!0-item_pic.jpg',
      // 						dataChecked: false,
      // 						dataPrice: 29.99
      // 					},
      // 					{
      // 						dataName: '听装',
      // 						dataValue: '1001:03',
      // 						dataImage: 'https://gw1.alicdn.com/bao/uploaded/i1/2809417192/TB2e.rsmfNNTKJjSspcXXb4KVXa_!!2809417192.jpg',
      // 						dataChecked: false,
      // 						dataPrice: 29.99
      // 					}
      // 				]
      // 			}
      // 	],
      // 	proBannerList:[
      // 		{
      // 			title: "slide1",
      // 			style: {
      // 				sliderImg: "static/images/pro-02.jpg"
      // 			}
      // 		},
      // 		{
      // 			title: "slide2",
      // 			style: {
      // 				sliderImg: "static/images/pro-02-2.jpg"
      // 			}
      // 		},
      // 		{
      // 			title: "slide3",
      // 			style: {
      // 				sliderImg: "static/images/pro-02-3.jpg"
      // 			}
      // 		},
      // 		{
      // 			title: "slide4",
      // 			style: {
      // 				sliderImg: "static/images/pro-02-4.jpg"
      // 			}
      // 		}
      // 	],
      // 	proDetList:[
      // 		"static/images/pro-det-07.jpg",
      // 		"static/images/pro-det-08.jpg",
      // 		"static/images/pro-det-09.jpg",
      // 		"static/images/pro-det-10.jpg",
      // 		"static/images/pro-det-11.jpg",
      // 		"static/images/pro-det-12.jpg",
      // 		"static/images/pro-det-13.jpg"
      // 	]
      // }
    }
  },
  components: {
    TypeGoodsList,
    WidgetsCover
  },
  mounted() {
    this.init()
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  methods: {
    init() {
      this.getGood()
    },
    getGood(){
      const paramsGetGoods = JSON.parse(JSON.stringify(this.query))
      paramsGetGoods.identifier = this.$route.query.id
      getGoods(paramsGetGoods).then(result => {
        this.productInfo = result.data
        console.log(this.productInfo, 'result')
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
      this.$store.commit('goback')
    },
    addCart() {
      this.saleType = 'addCart'
      this.openWidgetsCover()
    },
    buyNow() {
      this.saleType = 'self'
      this.openWidgetsCover()
    },
    openWidgetsCover() {
      this.widgetsCoverShow = true
    },
    closeWidgetsCover(val) {
      this.widgetsCoverShow = val
    },
    getDecideVal(val) {
      console.log(val, val.id, val.num, val.saleType, val.typeList, 'getDecideVal')
      if (val.saleType === 'addCart') {
        let num = val.num
        this.saleNum = num
        let pro = this.proStore
        this.$toast({
          message: '添加成功',
          type: 'warning',
          duration: 1000
        });
        this.$store.commit('updateCartCount', num)
        console.log(num, 'num')
      } else if (val.saleType === 'self') {
        this.goPay()
      }

    },
    goPay() {
      let that = this;
      this.$indicator.open();
      setTimeout(function () {
        that.$indicator.close();
        that.$router.push({ path: '/Pay' })
      }, 300)
    }
  }
};
</script>