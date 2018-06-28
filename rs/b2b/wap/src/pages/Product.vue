<template>
  <div id="index">
	 <div class="main">
		<div class="banner" w-750-750 aspectratio aspect-ratio="750/750">
		  <div aspectratio-content>
			 <span class="goBack" @click="goback"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
			 <router-link to="/Cart" class="goCart"><i class="rsiconfont rsicon-31gouwuche"></i></router-link>
			 <mt-swipe :class="mint-swipe" :auto="0" :speed="400">
				<mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in productInfo.proBannerList" :key="index"><img :src="slider.style.sliderImg" /></mt-swipe-item>
			 </mt-swipe>
		  </div> 
		</div>
		<div class="good-detail">
		  <p class="g-name"><span class="labelty">{{productInfo.proLabel}}</span>{{productInfo.proName}}</p> 
		  <p class="g-code">编号：{{productInfo.proNo}}</p> 
		  <p class="g-address"><span></span><span style="margin: 0px;">{{productInfo.proDec}}</span></p> 
		  <p class="g-price"><span>¥ </span><strong>{{productInfo.proPrice}}</strong><s>¥{{productInfo.proOldPrice}}</s></p>
		</div>
		<div class="go-mall">
		  <figure>
			 <img :src="productInfo.proStore.storeLogoImg" lazy="loaded">
		  </figure> 
		  <p><span>{{productInfo.proStore.storeName}}</span> <small>{{productInfo.proStore.storeDec}}</small></p> 
		  <router-link class="goStore" to="/Store">进入店铺<i class="rsiconfont rsicon-qiehuanqiyou"></i></router-link>
		</div>
		<div class="product-recommend">为您推荐</div> 
		<TypeGoodsList/>
	 </div>
	 <footer class="footer">
		<div class="top">
		  <label>数量</label>
		  <div class="editNum">
		  <button class="minusBtn" @click="editSaleNum('minu')"><i class="rsiconfont rsicon-jian"></i></button> 
		  <input readonly="readonly" type="number" class="goodsNum" :value="productInfo.saleNum" /> 
		  <button class="addBtn" @click="editSaleNum('add')"><i class="rsiconfont rsicon-jia"></i></button>    
		  </div>    
		</div>
		<div class="btm">
		  <nav>
			 <div class="btm-I">
				<div class="btm-II">
				  <i class="rsiconfont rsicon-kefu1"></i>客服
				</div>
				<div class="btm-II">
				  <i class="rsiconfont rsicon-shoucang"></i>收藏
				</div>
				<router-link to="/Cart" class="btm-II">
				  <i class="rsiconfont rsicon-31gouwuche"></i>购物车
					<em class="num" v-show="cartCount > 0">{{cartCount}}</em>
				</router-link>
			 </div>
			 <div class="btm-I">
				<div class="btm-III buyCart" @click="addCart">
					加入购物车
				</div>
				<div class="btm-III buyNow">
					立即购买
				</div>
			 </div>
		  </nav>
		</div>  
	 </footer>
  </div>
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';
export default {
  name: 'Index',
  data() {
	 return {
		message: '',
		mint:null,
		swipe:null,
		mt:null,
		item:null,		
		productInfo:{
			proId: "0001",
			proLabel:"自营",
			proName:"法国品牌凯旋1664白啤瓶装330ml",
			proNo:"5513213245aasd",
			proDec:"法国品牌授权中国区生产，国产啤酒",
			proPrice:10,
			proOldPrice:100,
			saleNum:1,
			proBannerList:[
				{
					title: "slide1",
					style: {
						sliderImg: "/static/images/wap-20.png"
					}
				},
				{
					title: "slide2",
					style: {
						sliderImg: "/static/images/wap-20.png"
					}
				},
				{
					title: "slide3",
					style: {
						sliderImg: "/static/images/wap-20.png"
					}
				}
			],
			proStore:{
				storeId:"0001",
				storeName:"1919凯旋官方旗舰店",
				storeDec:"酒厂直供   正品保证",
				storeLogoImg:"/static/images/storeLogo.png"
			}
		}
	 }
  },
  components: {
		TypeGoodsList
	},
	mounted(){
		
	},
	computed: {
		cartCount(){
			return this.$store.state.cartCount;
		}
	},
	methods:{
		editSaleNum(flag) {
				let num = 0;
				if(flag == 'add') {
						this.productInfo.saleNum++;
						num = 1;
        }else if(flag == 'minu') {
					if(this.productInfo.saleNum <= 1) {
						return
					}
					this.productInfo.saleNum--;
					num = -1;
        }
		  },
		  goback(){
				this.$store.commit('goback')
			},
			addCart(){
				let num = this.productInfo.saleNum
				let pro = this.proStore
				this.$store.commit('updateCartCount',num)
				console.log(num,'num')
			}
	}
};
</script>

<style scoped>
.main{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 200px;
}

[w-750-750] {
  width: 750px;
  z-index: 10;
}
[w-750-750]{
  aspect-ratio:'750:750';
}

.banner{
  padding: 20px;
  border-bottom: 1px solid #efefef;
}

.mint-swipe-indicator{
  width: 40px;
  height: 40px;
  margin:  0 20px; 
}

.mint-swipe-indicator.is-active{
  background: #1655bf!important;
}

.goBack,.goCart{
  position: absolute;
  top: 20px;
  width: 80px;
  height: 80px;
  z-index: 2;
  line-height: 80px;
  text-align: center;
}

.goBack{
  left: 20px;
}

.goCart{
  right: 20px;
}

.goBack .rsiconfont,.goCart .rsiconfont{
  display: block;
  width: 100%;
  height: 100%;
  font-size: 40px;
}

.goCart .rsiconfont{
  font-size: 50px;
}

.good-detail {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 26px;
  margin-bottom: 20px;
}
span.labelty {
	 border: 0;
	 border-radius: 2px;
	 margin-right: 10px;
	 line-height: 0;
	 padding: 0 4px;
	 background-color: #fa4d3e;
	 font-size: 22px;
	 color: #fff;
}
.good-detail .g-code {
	 color: #999;
}
.good-detail .g-address,.good-detail .g-price {
	 margin-top: 10px;
}
.good-detail .g-price span {
	 font-size: 26px;
	 color: #fa4d3e;
}
.good-detail .g-price strong {
	 font-size: 36px;
	 color: #fa4d3e;
	 margin-right: 40px;
	 font-weight: 500;
}
.go-mall {
	 margin: 20px 0;
	 padding: 20px;
	 font-size: 26px
}

.go-mall figure {
	 width: 100px
}

.go-mall figure img {
	 width: 100%
}

.go-mall>p {
	 margin-left: 30px
}

.go-mall>p span {
	 display: block;
	 font-size: 30px
}

.go-mall>p small {
	 display: block;
	 color: #999
}

.go-mall>.goStore {
	 display: block;
	 float: right
}
.go-mall .rsiconfont{
  color: #ccc;
  font-size: 30px;
  margin-left: 20px;
}
.product-recommend{
  line-height: 40px;
	height: 40px;
	margin: 20px 0;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
}

.footer{
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  background-color: #fff;
  color: #666;
}
.footer .top{
  padding: 0 20px;
  overflow: hidden;
  line-height: 80px;
  height: 80px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
}

.footer .top .editNum{
  display: flex;
  float: right;
  flex-direction: row!important;  
  padding: 20px 0;
}

.minusBtn,.addBtn,.goodsNum{
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 50%;
	border: 1px solid #1655bf;
  text-align: center;
	background: #fff;
	color: #1655bf;
	overflow: hidden;
}
.footer .top .editNum .rsiconfont{
  width: 100%;
  height: 100%;
  display: block;
  font-size: 20px;
}


.goodsNum{
	display: inline-flex;
	margin: 0 10px;
	width: 60px;
	border-radius: 0;
	border: none;
	text-align: center;
}

.footer .btm{
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.footer .btm nav{
  display: flex;
}

.footer .btm nav .btm-I{
  flex: 1;
  display: flex;
}

.footer .btm nav .btm-II{
	position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 50px;
  font-size: 20px;
  border-right: 1px solid #efefef;
}
.footer .btm nav .btm-II .rsiconfont{
  font-size: 40px;
}
.footer .btm nav .btm-II>em{
    position: absolute;
		top: 0;
		right: 10%;
		display: block;
		width:30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #fa4d3e;
		font-size: 22px;
		color: #fff;
		border-radius: 50%;
		overflow: hidden;
}
.footer .btm nav .btm-III{
  flex: 1;
  line-height: 100px;
  font-size: 28px;
  color: #fff;
}

.buyCart{
	background: #2f363c;
}

.buyNow{
	background: #1655bf;
}

</style>