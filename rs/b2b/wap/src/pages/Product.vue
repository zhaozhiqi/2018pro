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
		<div class="product-details">
			<img 
			class="detailImg"
			v-for="(item, index) in productInfo.proDetList"
			:key="index"
			:src="item" 
			alt="商品详情">
		</div>
		<!-- <div class="product-recommend">为您推荐</div> 
		<TypeGoodsList/> -->
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
					立即购买
				</div>
			 </div>
		  </nav>
		</div>  
	  </footer>
	 	<WidgetsCover 
	 :class="{'show':widgetsCoverShow}" 
	 v-on:widgetsCoverShow="closeWidgetsCover"
	 v-on:saveDecideVal="getDecideVal" 
	 :saleType="saleType"
	 :changeInfo="productInfo"></WidgetsCover>
  </div>
	
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';
import WidgetsCover from '@/components/widgets-cover';
import {countDown} from '@/utils'

export default {
  name: 'Index',
  data() {
	 return {
		message: '',
		mint:null,
		swipe:null,
		mt:null,
		item:null,	
		saleType:'self',
		widgetsCoverShow:false,			
		productInfo:{
			proId: "0001",
			proLabel:"自营",
			proName:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",
			proNo:"5513213245aasd",
			proDec:"501mL(含)-999mL(含)",
			proPrice:58.00,
			proOldPrice:80.00,
			proSelfPrice:99.99,
			proGroupPrice:29.99,
			proStock: 9,
			saleNum:1,
			proStore:{
				storeId:"0001",
				storeName:"Coca-Cola可口可乐旗舰店",
				storeDec:"品牌旗舰店",
				storeLogoImg:"static/images/storeLogo2.png"
			},
			proChangeImage:'static/images/pro-02.jpg',
			proChangeList:[
					{
						typeId:1,
						typeName:'分类',
						con:[
							{
								dataName: '新包装',
								dataValue: '1001:01',
								dataImage: 'static/images/pro-02-2.jpg',
								dataChecked: false,
								dataPrice: 58.00
							},
							{
								dataName: '胶瓶装（小）',
								dataValue: '1001:02',
								dataImage: 'https://gw3.alicdn.com/bao/uploaded/i4/2656379929/TB1HWSebnqWBKNjSZFxXXcpLpXa_!!0-item_pic.jpg',
								dataChecked: false,
								dataPrice: 29.99
							},
							{
								dataName: '听装',
								dataValue: '1001:03',
								dataImage: 'https://gw1.alicdn.com/bao/uploaded/i1/2809417192/TB2e.rsmfNNTKJjSspcXXb4KVXa_!!2809417192.jpg',
								dataChecked: false,
								dataPrice: 29.99
							}
						]
					}
			],
			proBannerList:[
				{
					title: "slide1",
					style: {
						sliderImg: "static/images/pro-02.jpg"
					}
				},
				{
					title: "slide2",
					style: {
						sliderImg: "static/images/pro-02-2.jpg"
					}
				},
				{
					title: "slide3",
					style: {
						sliderImg: "static/images/pro-02-3.jpg"
					}
				},
				{
					title: "slide4",
					style: {
						sliderImg: "static/images/pro-02-4.jpg"
					}
				}
			],
			proDetList:[
				"static/images/pro-det-07.jpg",
				"static/images/pro-det-08.jpg",
				"static/images/pro-det-09.jpg",
				"static/images/pro-det-10.jpg",
				"static/images/pro-det-11.jpg",
				"static/images/pro-det-12.jpg",
				"static/images/pro-det-13.jpg"
			]
		}
	 }
  },
  components: {
		TypeGoodsList,
		WidgetsCover
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
				this.saleType = 'addCart'
				this.openWidgetsCover()
				// let num = this.productInfo.saleNum
				// let pro = this.proStore
				// this.$toast({
				// 		message: '添加成功',
				// 		type: 'warning',
				// 		duration: 1000
				// });
				// this.$store.commit('updateCartCount',num)
				// console.log(num,'num')
			},
			buyNow(){
				this.openWidgetsCover()
			},
			openWidgetsCover(){
				this.widgetsCoverShow = true
			},
			closeWidgetsCover(val){
				this.widgetsCoverShow = val
			},
			getDecideVal(val){
				console.log(val, val.id, val.num, val.saleType, val.typeList,'getDecideVal')
				if(val.saleType === 'addCart'){
					let num = this.productInfo.saleNum
					let pro = this.proStore
					this.$toast({
							message: '添加成功',
							type: 'warning',
							duration: 1000
					});
					this.$store.commit('updateCartCount',num)
					console.log(num,'num')
				}else if(val.saleType === 'self'){
					this.goPay()
				}
				

			},
			goPay(){
				let that = this;
				this.$indicator.open();
				setTimeout(function(){
						that.$indicator.close();
						that.$router.push({ path: '/Pay'})
				},300)
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
  background: #ff0036!important;
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
	border-radius: 50%;
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

.product-details{
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.product-details .detailImg{
	flex: 1;	
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
	border: 1px solid #ff0036;
  text-align: center;
	background: #fff;
	color: #ff0036;
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
	background: #ff0036;
}

</style>