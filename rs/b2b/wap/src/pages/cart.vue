<template>
  <div id="cart">
    <main class="main">
      <header class="header">
        <a>返回</a>
        <h2>购物车</h2>
        <a>编辑</a>
      </header>
      <div class="car-empty" v-if="hasGoods">
        <i class="ico-car"></i>
        <p>亲，购物车空空如也，快去逛逛</p>
        <router-link to="/classify" class="link">看酒去</router-link>        
      </div>
      <div v-else>
        <div class="car-caption">
          注意：如在15分钟内未进行支付，库存将自动解锁,商品数量将会受影响
          <label>×</label>
        </div>
        <div class="order-list" v-for="(item, index) in 3" :key="index" >
          <div class="storeInfo">
            <span class="wi-qu-inp">
              <input type="checkbox"/>
            </span>
            <b class="storeHint-I">浙江杭州江干区景昙路店</b>
            <b class="storeHint-II">浙江杭州江干区景昙路店</b>
            <b class="storeHint-III">浙江杭州江干区景昙路店</b>
            <span>去店铺逛逛</span>
          </div>
          <div class="goodsList" >
            <ul>
              <li v-for="(item, index) in 3" :key="index">
                <span class="wis-que-checkbox"><input type="checkbox" class="wi-qu-inp" value="1016790"></span> 
                <a href="#/product-details/?id=451686176875638784&amp;vendorType=TYPE_B" class="fl">
                  <figure><img class="goodsImg" src="https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/1a665fe8-dc80-4c96-9f86-825a1d698c24"></figure>
                </a> 
                <div class="right">
                  <a href="#/product-details/?id=451686176875638784&amp;vendorType=TYPE_B" class="goodsLink">52度川酒（红）500ml</a> 
                  <div class="goodsEdit">
                    <label class="goodsPrice"><b>¥ </b>408.70</label>
                    <div class="goodsNumbox" value="1">
                      <button class="minusBtn">-</button> 
                      <input readonly="readonly" type="number" class="goodsNum" value="0"> 
                      <button class="addBtn">+</button>
                    </div>                  
                    <button class="deleteBtn">删除</button>
                  </div>
                </div> 
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="car-hot-recommend">热门推荐</div> 
      <TypeGoodsList class=""/>
    </main>
    <Footer />
  </div>
</template>

<script>
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';



export default {
  name: 'Classify',
  data(){
    return {
      hasGoods:false,
      goodsList:[
          {bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
          {bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
      ],
      proinfo: []
    }
  },
  components: {
    SeachHeader,
    TypeGoodsList,
    Footer
  },
  mounted(){
    console.log('mounted')
  },
  methods:{

  }
};
</script>

<style scoped>
#cart{
  overflow: hidden;
  height: 100%;
}

.main{
    position: absolute;
    top: 100px;
    width: 100%;
    left: 0;
    bottom: 100px;
    overflow: auto;
}

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 100px;
  height: 100px;
  font-size: 34px;
  padding: 0 10px;
  background: #fff;
  border-bottom: 1px solid #efefef;
}

.header a{
  color: #1655bf;
  font-size: 30px;
}
/*空购物车时显示*/
.car-empty{
  padding: 60px 0;
  background-color: #fff;
  text-align: center;
}

.car-empty .ico-car {
    width: 128px;
    height: 128px;
    background-size: contain;
    display: block;
    margin: 0 auto;
    background-image: url('../../static/images/public/car-icon.png');
}

.car-empty p{
    line-height: 80px;
    font-size: 24px;
}

.car-empty .link{
    width: 240px;
    height: 66px;
    background-color: #1655bf;
    display: inline-block;
    text-align: center;
    line-height: 66px;
    color: #fff;
    border-radius: 6px;
    font-size: 24px;
}

/*购物车不为空时
  15分钟支付提示*/

.car-caption {
    padding: 10px 70px;
    margin-bottom: 20px;
    text-align: left;
    background-color: #1655bf;
    color: #fff;
    position: relative;
}

.car-caption label {
    position: absolute;
    right: 20px;
    top: -4px;
    font-size: 40px;
    height: 100%;
}

.mt-cell-swipe{
  line-height: 80px;
  height: 80px;
}

.car-hot-recommend{
  line-height: 40px;
  height: 40px;
  margin: 20px 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}


.order-list{
  margin-bottom: 20px;
  overflow: hidden;
}

.order-list .storeInfo{
    padding: 0 10px;
    position: relative;
    line-height: 80px;
    border-bottom: 1px solid #efeff4;
    background-color: #fff;
    padding-bottom: 10px;
}
.storeInfo span{
    color: #fa4d3e;
    font-size: 30px;
    position: absolute;
    right: 20px;
    top: 0;
}

#app .wi-qu-inp {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('../../static/images/public/sel-no.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 20px;
}

.order-list .storeInfo b{
    font-size: 28px;
    margin-left: 80px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;
}

.order-list .storeInfo b.storeHint-II,.order-list .storeInfo b.storeHint-III{
  line-height: 40px;
  height: 40px;
  font-size: 24px;
  color: #fa4d3e;
}

.order-list .goodsList{
    background-color: #fff;
    border-bottom: 1px solid #efeff4;
    float: left;
    width: 100%;
    position: relative;
}

.order-list .goodsList>ul>li {
    position: relative;
    padding: 20px 20px 20px 80px;
    border-bottom: 1px solid #efeff4;
    overflow: hidden;
}
.fl {
    float: left;
}

.order-list .goodsList .goodsImg {
    width: 128px;
    height: 128px;
    border: 1px solid #efeff4;
    float: left;
    margin-right: 30px;
}

.order-list .goodsList .right {
    overflow: hidden;
}

.order-list .goodsList .right .goodsLink {
    font-size: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 80px;
    line-height: 80px;
    color: #666;
}

.goodsEdit{
  display: flex;
  flex-direction: row!important;
}

.goodsPrice{
  color: #fa4d3e;
}

.goodsPrice,.numbox,.deleteBtn{  
  flex: 1;
}

.goodsNumbox{
  display: flex;
  flex-direction: row!important;
}

.minusBtn,.addBtn,.goodsNum{
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 1px solid #1655bf;
  font-size: 30px;
  font-weight: bold;
  background: #fff;
  color: #1655bf;
  overflow: hidden;
}

.goodsNum{
  display: inline-flex;
  margin: 0 10px;
  width: 35px;
  border-radius: 0;
  border: none;
  text-align: center;
}

.deleteBtn{
  flex: 0 0 100px;
  display: block;
  border: 0;
  background: #fa4d3e;
  color: #fff;
  text-align: center;
  width: 40px;
}
</style>
