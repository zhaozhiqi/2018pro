<template>
  <div id="cart">
    <main class="main" :class="{'noGoods':cartList.length <= 0}">
      <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
      <div class="car-empty" v-if="!hasGoods">
        <i class="ico-car"></i>
        <p>亲，购物车空空如也，快去逛逛</p>
        <router-link to="/classify" class="link">查看商品</router-link>
      </div>
      <div v-else>
        <div class="car-caption" v-show="carCaptionShow">
          注意：如在15分钟内未进行支付，库存将自动解锁,商品数量将会受影响
          <label @click="closeCarCaption">×</label>
        </div>
        <div class="order-list" v-for="(storeItem, index) in cartList.items" :key="index">
          <div class="storeInfo">
            <span class="wi-qu-inp">
              <input type="checkbox" :checked="storeItem.checked" @click="editCart('storeChecked',storeItem)" />
            </span>
            <b class="storeHint-I">{{storeItem.shopName}}</b>
            <!-- <b class="storeHint-II">浙江杭州江干区景昙路店</b>
						<b class="storeHint-III">浙江杭州江干区景昙路店</b> -->
            <span>
              <router-link :to="{path:'/store', query: { id: storeItem.shopGoodsId }}">去店铺逛逛</router-link>
            </span>
          </div>
          <div class="goodsList">
            <ul>
              <li v-for="(listItem, index) in storeItem.itemGoodsInfoList" :key="index">
                <span class="wis-que-checkbox"><input type="checkbox" :checked="listItem.checked" value="1016790" @click="editCart('checked', listItem , storeItem)"></span>
                <router-link :to="{path:'/groupProduct', query: { id: listItem.shopGoodsIdentifier }}" class="fl">
                  <figure><img class="goodsImg" :src="listItem.displayDiagram"></figure>
                </router-link>
                <div class="right">
                  <router-link :to="{path:'/groupProduct', query: { id: listItem.shopGoodsIdentifier }}" class="goodsLink">{{listItem.title}}</router-link>
                  <div class="goodsEdit">
                    <label class="goodsPrice">
                      <b>¥ </b>{{listItem.money | priceFormat}}</label>
                    <div class="goodsNumbox" value="1">
                      <button class="minusBtn" @click="editCart('minu', listItem , storeItem)">
                        <i class="rsiconfont rsicon-jian"></i>
                      </button>
                      <input readonly="readonly" type="number" class="goodsNum" :value="listItem.count" />
                      <button class="addBtn" @click="editCart('add', listItem , storeItem)">
                        <i class="rsiconfont rsicon-jia"></i>
                      </button>
                    </div>
                    <button class="deleteBtn" @click="delCart(listItem, storeItem)">删除</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <footer class="footer">
          <div class="innter">
            <span class="wi-qu-inp">
              <input type="checkbox" :checked="checkAllFlag" @click="toggleCheckAll" />
            </span>
            <span class="leftTitle">全选</span>
            <span class="leftSolid"></span>
            <div class="con">
              <p>合计：
                <b>¥ </b>
                <b>{{totalPrice | priceFormat}}</b>
              </p>
              <p>(不含运费)</p>
            </div>
            <button class="settlement" v-show="hasProChecked" @click="goPay">结算</button>
            <button class="noSettlement" v-show="!hasProChecked">结算</button>
            <!-- <button class="Settlement">结算</button> -->
          </div>
        </footer>
      </div>
      <!-- <div class="car-hot-recommend">热门推荐</div> 
			  <TypeGoodsList class=""/> -->
    </main>
    <Footer />
  </div>
</template>

<script>
import { getCart, delCart, cartSave, saveCartBalance } from '@/api/m_api'
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'

import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import CommonHeader from '@/components/common-header'
import TypeGoodsList from '@/components/TypeGoodsList'
import Footer from '@/components/Footer'

export default {
  name: 'Cart',
  data() {
    return {
      carCaptionShow: false,
      itemGoodsInfoList: [],
      cartList: { items: [] },
      delItem: {},
      query: {
        ids: null
      },
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "购物车",
        isOtherShow: true,
        otherIconClass: "rsicon-home",
        otherLink: {
          path: '/'
        }
      }
    }
  },
  components: {
    CommonHeader,
    SeachHeader,
    TypeGoodsList,
    Footer
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
    hasGoods() {
      let now = false
      now = this.cartList.items.length > 0 ? true : false
      return now
    },
    checkAllFlag() {
      return this.checkedStoreCount === this.cartList.items.length
    },
    checkedStoreCount() {
      let i = 0
      if (this.hasGoods === true) {
        this.cartList.items.forEach((item) => {
          if (item.checked === true) i++
        })
      }
      return i
    },
    totalPrice() {
      let money = 0
      if (this.hasGoods === true) {
        this.cartList.items.forEach((item) => {
          if (item.itemGoodsInfoList) {
            item.itemGoodsInfoList.forEach((index) => {
              if (index.checked === true) {
                money += parseFloat(index.money) * parseInt(index.count);
              }
            })
          }
        })
      }
      return money
    },
    hasProChecked() {
      let hasProChecked = false
      if (this.hasGoods === true) {
        this.cartList.items.forEach((item) => {
          if (item.itemGoodsInfoList) {
            item.itemGoodsInfoList.forEach((index) => {
              if (index.checked == true) {
                hasProChecked = true
                return
              }
            })
          }
        })
      }
      return hasProChecked
    }
  },
  methods: {
    init() {
      getCart().then(result => {
        // console.log(result, 'getCart')
        if (result.code === 200 && result.data) {
          const _data = result.data
          if (!_data.items) {
            this.cartList = { items: [] }
            return
          }
          // console.log(_data, ' getCart result.data _data.items')
            if(_data.items){
            _data.items.forEach(shop => {
              shop.checked = false
              if (shop.itemGoodsInfoList) {
                shop.itemGoodsInfoList.forEach(goods => {
                  goods.checked = false
                })
              }
            })
            this.cartList = _data
          }
        } else {
          this.cartList = { items: [] }
        }
      })
    },
    delCart(item, parentItem) {//删除购物车商品
      const params = {
        shopId: parentItem.shopId,
        shopGoodsId: item.shopGoodsId
      }
      this.$messagebox.confirm('确定删除该商品吗?').then(action => {
        if (action == 'confirm') {
          delCart(params).then(res => {
            if (res.code === 200) {
              this.$toast({
                message: '操作成功',
                type: 'warning'
              })
              this.init()
            }
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消')
          return
        }
      })
    },
    delCartStore(parentItem) {//删除购物车商铺
      // console.log(this.cartList, 'delCartStore-this.cartList')
      this.cartList.forEach((item, index) => {
        if (item.storeId === parentItem.storeId) {
          this.cartList.splice(index, 1);
        }
      })
    },
    editCart(flag, item, parentItem) {
      const that = this
      let num = 0;
      if (flag == 'storeChecked') {//店铺全选按钮点击事件
        let state = item.checked === true ? false : true;
        item.itemGoodsInfoList.forEach((index) => {
          index.checked = state
        })
        item.checked = !item.checked;
      } else if (flag == 'checked') {
        item.checked = item.checked == true ? false : true;
        this.storeCheckedListen(parentItem);
      } else if (flag == 'add') {
        // console.log(item.count)
        const params = {
          shopId: parentItem.shopId,
          shopGoodsId: item.shopGoodsId,
          count: item.count + 1
        }
        cartSave(params).then(res => {
          if (res.code === 200) {
            that.init()
          }
        })
        num = 1
      } else {
        if (item.count <= 1) {
          return
        }
        const params = {
          shopId: parentItem.shopId,
          shopGoodsId: item.shopGoodsId,
          count: item.count - 1
        }
        cartSave(params).then(res => {
          if (res.code === 200) {
            that.init()
          }
        })
        num = -1
      }

      // axios.post("/users/cartEdit", {
      //     productId: item.productId,
      //     productNum: item.productNum,
      //     checked: item.checked
      // }).then((response) => {
      //     let res = response.data;
      //     if(res.status=="0"){
      //         this.$store.commit("updateCartCount",num);
      //     }
      // })
    },
    storeCheckedState(item) {//判断店铺组内是否全部选中状态
      let storeListLength = item.itemGoodsInfoList.length;
      let storeListCheckedNum = 0;
      item.itemGoodsInfoList.forEach((index) => {
        if (index.checked === true) storeListCheckedNum++
      })
      return storeListLength === storeListCheckedNum
    },
    storeCheckedListen(item) {//根据店铺组内是否全部选中状态 修改店铺全选的值
      let storeCheckedState = this.storeCheckedState(item)
      item.checked = storeCheckedState ? true : false
    },
    toggleCheckAll() {
      let flag = !this.checkAllFlag
      if (this.hasGoods === true) {
        this.cartList.items.forEach((item) => {
          item.checked = flag ? true : false
          item.itemGoodsInfoList.forEach((index) => {
            index.checked = flag ? true : false
          })
        })
      }
      // axios.post("/users/editCheckAll",{
      // 	checkAll:flag
      // }).then((response)=>{
      // 	let res = response.data;
      // 	if(res.status == '0'){
      // 		console.log("update suc");
      // 	}
      // })
    },
    closeCarCaption() {
      this.carCaptionShow = false
    },
    goPay() {
      let that = this
      const _arr = []
      if (this.hasGoods === true) {
        this.cartList.items.forEach(shop => {
          shop.itemGoodsInfoList.forEach(good => {
            if (good.checked === true) {
              const _id = good.shopGoodsId
              _arr.push(_id)
            }
          })
        })
      }
      const params = new URLSearchParams()
      params.append('ids', _arr)
      saveCartBalance(params).then(result => {
        // console.log(result, 'saveCartBalance')
        if (result.code === 200) {
          removeCookie('changeAddress')
          that.$router.push({ path: '/SubmitOrder', query: { type: 'self' } })
        }
      })
    }
  }
};
</script>

<style scoped>
#cart .car-empty .ico-car {
  background-image: url('../../static/images/public/car-icon.png');
}
#app .wi-qu-inp,
#app .wis-que-checkbox {
  background-image: url('../../static/images/public/sel-no.png') no-repeat;
}
</style>
