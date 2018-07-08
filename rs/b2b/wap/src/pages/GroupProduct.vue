<template>
  <div id="index">
	 <div class="main">
		<div class="banner" w-750-750 aspectratio aspect-ratio="750/750">
		  <div aspectratio-content>
			 <span class="goBack" @click="goback"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
			 <!-- <router-link to="/Cart" class="goCart"><i class="rsiconfont rsicon-31gouwuche"></i></router-link> -->
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
		<div class="group-order">
			<div class="group-order-all">200人在拼单 <span class="group-order-getAll" @click="showAllGroupOrder()">查看更多<i class="rsiconfont rsicon-qiehuanqiyou"></i></span></div>
			<div class="group-order-con" >
				<mt-swipe :class="mint-swipe" :auto="3000" :speed="600" :show-indicators="false">
					<mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in productInfo.groupOrder.list" :key="index">
							<div class="group-order-item">
								<button class="joinGroupBtn" @click="joinGroupOrder()">去拼团</button>
								<div class="groupOrderInfo">
									<p class="t">还差<span>{{slider.orderLack}}人</span>拼成</p>
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
		<div class="product-recommend">为您推荐</div> 
		<TypeGoodsList/>
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
		saleType:'group',
		widgetsCoverShow:false,	
		productInfo:{
			proId: "0001",
			proLabel:"自营",
			proName:"肉完ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",
			proNo:"5513213245aasd",
			proDec:"谜秀连衣裙女夏pphome裙子文艺",
			proPrice:29.99,
			proOldPrice:99.99,
			proSelfPrice:99.99,
			proGroupPrice:29.99,
			proStock: 9,
			saleNum:1,
			proStore:{
				storeId:"0001",
				storeName:"ROUWANBABY旗舰店",
				storeDec:"品牌旗舰店",
				storeLogoImg:"../../static/images/storeLogo.png"
			},
			proChangeImage:'https://img.alicdn.com/imgextra/i3/2398639760/TB1_HXTa_tYBeNjy1XdXXXXyVXa_!!0-item_pic.jpg_200x200Q50s50.jpg',
			proChangeList:[
					{
						typeId:1,
						typeName:'颜色分类',
						con:[
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
							typeId:2,
							typeName:'尺码',
							con:[
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
			proBannerList:[
				{
					title: "slide1",
					style: {
						sliderImg: "../../static/images/wap-19.png"
					}
				},
				{
					title: "slide2",
					style: {
						sliderImg: "../../static/images/wap-14.png"
					}
				}
			],
			groupOrder:{
				allPeoPleNum: '200',
				list:[
					{
						id:'1',
						orderUserName:'王建国',
						orderUserImage:'../../static/images/storeLogo.png',
						orderLack: '1',
						orderEndTime: '2018,08,07 12:00:00:00' 
					},
					{
						id:'2',
						orderUserName:'张建军',
						orderUserImage:'../../static/images/storeLogo.png',
						orderLack: '1',
						orderEndTime: '2018,07,07 13:00:00:00' 
					},
					{
						id:'3',
						orderUserName:'刘德华',
						orderUserImage:'../../static/images/storeLogo.png',
						orderLack: '1',
						orderEndTime: '2018,07,06 14:00:00:00' 
					},
				]
			},
			proDetList:[
				"../../static/images/pro-det-06.png",
				"../../static/images/pro-det-05.jpg",
				"../../static/images/pro-det-04.jpg",
				"../../static/images/pro-det-03.jpg",
				"../../static/images/pro-det-02.jpg",
				"../../static/images/pro-det-01.jpg"
			]
		}
	 }
  },
  components: {
		TypeGoodsList,
		WidgetsCover
	},
	created(){
		this.productInfo.groupOrder.list.map((item, index)=>{
			this.$set(item, 'djs' ,countDown(item.orderEndTime))
		})
		this.changeOrderDjs()
	},
	mounted(){
		// console.log(countDown("2018,07,07 12:00:00"))
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
			buySelf(){
				// let num = this.productInfo.saleNum
				// let pro = this.proStore
				// this.$store.commit('updateCartCount',1)
				// console.log(num,'num')
				this.saleType = 'self';
				this.openWidgetsCover()
				console.log('buySelf', this.saleType)
			},
			groupNow(){
				this.saleType = 'group';
				console.log('groupNow',	this.saleType)
				this.openWidgetsCover()
			},
			openWidgetsCover(){
				this.widgetsCoverShow = true
			},
			closeWidgetsCover(val){
				this.widgetsCoverShow = val
			},
			getDecideVal(val){
				console.log(val, val.id, val.num, val.typeList,'getDecideVal')
				this.goPay()
			},
			goPay(){
				let that = this;
				this.$indicator.open();
				setTimeout(function(){
						that.$indicator.close();
						that.$router.push({ path: '/Pay'})
				},300)
			},
			reverseArr(arr){
				let _arr = arr 
				_arr = _arr.reverse() 
				return _arr
			},
			showAllGroupOrder(){
				console.log('showAllGroupOrder')
			},
			joinGroupOrder(id){
				this.$messagebox.confirm('参与该拼单？').then(action => {
					this.groupNow()
				}).catch(err=>{
					if(err == 'cancel') {
							console.log('取消');
							return
					}
				});				
				console.log('joinGroupOrder')
			},
			changeOrderDjs(){
				let that = this
				let timer = setInterval(()=>{
					this.productInfo.groupOrder.list.forEach(item => {
						let newDjs = countDown(item.orderEndTime)
						newDjs!==false?item.djs = '剩余 '+ countDown(item.orderEndTime):item.djs = '已过期'
					});
				},100)			
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
  padding-bottom: 100px;
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
	background:rgba(51, 51, 51, 0.5);
	color: #fff;
	border-radius: 50%;
}

.goCart{
  right: 20px;
}

.goBack .rsiconfont,.goCart .rsiconfont{
	text-align: center;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 34px;
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

.group-order{
	background: #fff;
	margin-bottom: 20px;
	
}

.group-order-all{
	height: 80px;
	line-height: 80px;
	padding: 0 20px;
	font-size: 28px;
	border-bottom: 1px solid #e5e5e5;
}
.group-order-getAll{
	float: right;
	color: #666
}
.group-order-getAll>i{
	font-size: 28px;
	line-height: 28px;
	color: #666
}

.group-order-con{
	height: 140px;
}

.group-order .group-order-item{
	padding: 0 20px;
	overflow: hidden;
}

.group-order .joinGroupBtn{
	float: right;
	width: 20%;
	line-height: 80px;
	height: 80px;
	margin: 30px 0; 
	border: none;
	background: #e02e24;
	color: #fff;
	border-radius: 10px;
}

.group-order .groupOrderInfo{
	float: right;
	line-height: 40px;
	height: 80px;
	margin: 30px 10px 30px 0; 
	text-align: center
}

.group-order .groupOrderInfo .t{
	color: #333;
	font-size: 30px;
}
.group-order .groupOrderInfo .t>span{
	color: #e02e24;
}
.group-order .groupOrderInfo .b{
	color: #666;
	font-size: 26px;
}
.group-order .orderUserIcon{
	float: left;
	margin: 20px 0;
	border-radius: 50%;
	overflow: hidden;
}
.group-order .orderUserIcon .orderUserImage{
	height: 100%;
	display: block
}
.group-order .orderUserName{
	float: left;
	height: 80px;
	line-height: 80px;
	margin: 30px 0 30px 10px;
	font-size: 30px;
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
  font-size: 50px;
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

.footer .btm nav .btm-III.buySelf{
	background: #f2aba7;
	line-height: 50px; 
}

.footer .btm nav .btm-III.groupNow{
	background: #e02e24;
	line-height: 50px; 
}

.product-details{
	display: flex;
	flex-direction: column-reverse;
	overflow: hidden;
}
.product-details .detailImg{
	flex: 1;	
}
</style>