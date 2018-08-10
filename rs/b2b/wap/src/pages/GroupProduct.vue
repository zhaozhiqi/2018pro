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
            <mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in productInfo.proBannerList" :key="index"><img :src="slider.style.sliderImg" /></mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="good-detail">
        <p class="g-name">
          <span class="labelty">{{productInfo.proLabel}}</span>{{productInfo.proName}}</p>
        <p class="g-code">厂商：{{productInfo.proManufacturer}}</p>
        <p class="g-code">编号：{{productInfo.proNo}}</p>
        <p class="g-code">规格：{{productInfo.proStandard}}</p>
        <p class="g-code">单位：{{productInfo.proUnit}}</p>
        <p class="g-price">
          <span>建议零售价：¥ </span>
          <strong>{{productInfo.proPrice}}</strong>
          <s v-show="false">¥{{productInfo.proOldPrice}}</s>
        </p>
      </div>
      <div class="group-order">
        <div class="group-order-all">200人在拼单
          <span class="group-order-getAll" @click="showAllGroupOrder()">查看更多
            <i class="rsiconfont rsicon-qiehuanqiyou"></i>
          </span>
        </div>
        <div class="group-order-con">
          <mt-swipe :class="mint-swipe" :auto="3000" :speed="600" :show-indicators="false">
            <mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in productInfo.groupOrder.list" :key="index">
              <div class="group-order-item">
                <button class="joinGroupBtn" @click="joinGroupOrder()">去拼团</button>
                <div class="groupOrderInfo">
                  <p class="t">还差
                    <span>{{slider.orderLack}}人</span>拼成</p>
                  <p class="b">{{slider.djs}}</p>
                </div>
                <div class="orderUserIcon">
                  <img class="orderUserImage" :src="slider.orderUserImage" alt="" style="width:50px;height:50px;">
                </div>
                <span class="orderUserName">{{slider.orderUserName}}</span>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="go-mall">
        <figure>
          <img :src="productInfo.proStore.storeLogoImg" lazy="loaded">
        </figure>
        <p>
          <span>{{productInfo.proStore.storeName}}</span>
          <small>{{productInfo.proStore.storeDec}}</small>
        </p>
        <router-link class="goStore" to="/Store">进入店铺
          <i class="rsiconfont rsicon-qiehuanqiyou"></i>
        </router-link>
      </div>
      <div class="product-details">
        <img class="detailImg" v-for="(item, index) in productInfo.proDetList" :key="index" :src="item" alt="商品详情">
      </div>
      <!-- <div class="product-recommend">为您推荐</div> 
		<TypeGoodsList/> -->
    </div>
    <footer class="footer">
      <!-- <div class="top">
		  <label>数量</label>
		  <div class="editNum">
		  <button class="minusBtn" @click="editSaleNum('minu')"><i class="rsiconfont rsicon-jian"></i></button> 
		  <input readonly="readonly" type="number" class="goodsNum" :value="productInfo.saleNum" /> 
		  <button class="addBtn" @click="editSaleNum('add')"><i class="rsiconfont rsicon-jia"></i></button>    
		  </div>    
		</div> -->
      <div class="btm">
        <nav>
          <div class="btm-I">
            <router-link to="/group" class="btm-II">
              <i class="rsiconfont rsicon-pintuanzhuanqu"></i>拼团首页
            </router-link>
            <div class="btm-II">
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
              ¥{{productInfo.proOldPrice}}<br/>单独购买
            </div>
            <div class="btm-III groupNow" @click="groupNow">
              ¥{{productInfo.proPrice}}<br/>发起拼团
            </div>
          </div>
        </nav>
      </div>
    </footer>
    <WidgetsCover :class="{'show':widgetsCoverShow}" v-on:widgetsCoverShow="closeWidgetsCover" v-on:saveDecideVal="getDecideVal" :saleType="saleType" :changeInfo="productInfo"></WidgetsCover>
  </div>
</template>

<script>
import { getGroupsList } from '@/api/m_api'
import Cookies from 'js-cookie'

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
      query:{},
      saleType: 'group',
      widgetsCoverShow: false,
      productInfo: {
        proId: "0001",
        proLabel: "自营",
        proName: "肉完ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",
        proManufacturer: "谜秀连衣裙",
        proNo: "5513213245aasd",
        proStandard: "XX",
        proUnit: "XXXX",
        proDec: "谜秀连衣裙女夏pphome裙子文艺",
        proPrice: 29.99,
        proOldPrice: 99.99,
        proSelfPrice: 99.99,
        proGroupPrice: 29.99,
        proStock: 9,
        saleNum: 1,
        proStore: {
          storeId: "0001",
          storeName: "ROUWANBABY旗舰店",
          storeDec: "品牌旗舰店",
          storeLogoImg: "static/images/storeLogo.png"
        },
        proChangeImage: 'https://img.alicdn.com/imgextra/i3/2398639760/TB1_HXTa_tYBeNjy1XdXXXXyVXa_!!0-item_pic.jpg_200x200Q50s50.jpg',
        proChangeList: [
          {
            typeId: 1,
            typeName: '颜色分类',
            con: [
              {
                dataName: '藏蓝',
                dataValue: '1001:01',
                dataImage: '//gw.alicdn.com/bao/uploaded/TB1hQQaspuWBuNjSspnL6R1NVXa',
                dataChecked: false
              },
              {
                dataName: '黄色',
                dataValue: '1001:02',
                dataImage: '//gw.alicdn.com/bao/uploaded/TB1jDTKgnCWBKNjSZFtL6SC3FXa',
                dataChecked: false,
                dataPrice: 39.99
              },
              {
                dataName: '橘色',
                dataValue: '1000:03',
                dataImage: '//gw.alicdn.com/bao/uploaded/TB1veDEgbZnBKNjSZFrL6SRLFXa',
                dataChecked: false
              }
            ]
          },
          {
            typeId: 2,
            typeName: '尺码',
            con: [
              {
                dataName: 'S',
                dataValue: '1002:01',
                dataChecked: false
              },
              {
                dataName: 'M',
                dataValue: '1002:02',
                dataChecked: false
              },
              {
                dataName: 'L',
                dataValue: '1002:03',
                dataChecked: false
              }
            ]

          }
        ],
        proBannerList: [
          {
            title: "slide1",
            style: {
              sliderImg: "static/images/wap-19.png"
            }
          },
          {
            title: "slide2",
            style: {
              sliderImg: "static/images/wap-14.png"
            }
          }
        ],
        groupOrder: {
          allPeoPleNum: '200',
          list: [
            {
              id: '1',
              orderUserName: '王建国',
              orderUserImage: 'static/images/storeLogo.png',
              orderLack: '1',
              orderEndTime: '2018,08,17 12:00:00:00'
            },
            {
              id: '2',
              orderUserName: '张建军',
              orderUserImage: 'static/images/storeLogo.png',
              orderLack: '1',
              orderEndTime: '2018,10,07 13:00:00:00'
            },
            {
              id: '3',
              orderUserName: '刘德华',
              orderUserImage: 'static/images/storeLogo.png',
              orderLack: '1',
              orderEndTime: '2018,07,06 14:00:00:00'
            },
          ]
        },
        proDetList: [
          "static/images/pro-det-01.jpg",
          "static/images/pro-det-02.jpg",
          "static/images/pro-det-03.jpg",
          "static/images/pro-det-04.jpg",
          "static/images/pro-det-05.jpg",
          "static/images/pro-det-06.jpg"
        ]
      }
    }
  },
  components: {
    TypeGoodsList,
    WidgetsCover
  },
  created() {
    this.productInfo.groupOrder.list.map((item, index) => {
      this.$set(item, 'djs', countDown(item.orderEndTime))
    })
    this.changeOrderDjs()
  },
  mounted() {
    // console.log(countDown("2018,07,07 12:00:00"))
    this.init()
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  methods: {
    init(){
      this.query.lng = Cookies.get('AREA_LNG')
      this.query.lat = Cookies.get('AREA_LAT')
      this.getGroup()
    },
    getGroup(){
      const parasmGetGroups = JSON.parse(JSON.stringify(this.query))
      parasmGetGroups.identifier = this.$route.query.id
      getGroupsList(parasmGetGroups).then(result => {
        console.log(result,'result')
      })
      
    },
    editSaleNum(flag) {
      let num = 0;
      if (flag == 'add') {
        this.productInfo.saleNum++;
        num = 1;
      } else if (flag == 'minu') {
        if (this.productInfo.saleNum <= 1) {
          return
        }
        this.productInfo.saleNum--;
        num = -1;
      }
    },
    goback() {
      this.$store.commit('goback')
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
    groupNow() {
      this.saleType = 'group';
      console.log('groupNow', this.saleType)
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
        let num = this.productInfo.saleNum
        let pro = this.proStore
        this.$toast({
          message: '添加至购物车',
          type: 'warning',
          duration: 1000
        });
        this.$store.commit('updateCartCount', num)
        console.log(num, 'num')
      } else if (val.saleType === 'group') {
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
    },
    reverseArr(arr) {
      let _arr = arr
      _arr = _arr.reverse()
      return _arr
    },
    showAllGroupOrder() {
      console.log('showAllGroupOrder')
    },
    joinGroupOrder(id) {
      this.$messagebox.confirm('参与该拼单？').then(action => {
        this.groupNow()
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消');
          return
        }
      });
      console.log('joinGroupOrder')
    },
    changeOrderDjs() {
      let that = this
      let timer = setInterval(() => {
        this.productInfo.groupOrder.list.forEach(item => {
          let newDjs = countDown(item.orderEndTime)
          newDjs !== false ? item.djs = '剩余 ' + countDown(item.orderEndTime) : item.djs = '已过期'
        });
      }, 100)
    }
  }
};
</script>
