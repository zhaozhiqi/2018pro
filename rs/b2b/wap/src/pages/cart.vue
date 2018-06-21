<template>
	<div id="cart">
		<main class="main">
			<header class="header">
				<a class="back" v-show="0">返回</a>
				<h2>购物车</h2>
				<a class="edit" v-show="0">编辑</a>
			</header>
			<div class="car-empty" v-if="hasGoods">
				<i class="ico-car"></i>
				<p>亲，购物车空空如也，快去逛逛</p>
				<router-link to="/classify" class="link">看酒去</router-link>        
			</div>
			<div v-else>
				<div class="car-caption" v-show="carCaptionShow">
					注意：如在15分钟内未进行支付，库存将自动解锁,商品数量将会受影响
					<label @click="closeCarCaption">×</label>
				</div>
				<div class="order-list" v-for="(storeItem, index) in cartList" :key="index" >
					<div class="storeInfo">
						<span class="wi-qu-inp">
							<input type="checkbox" :checked="storeItem.checked" @click="editCart('storeChecked',storeItem)"/>
						</span>
						<b class="storeHint-I">{{storeItem.storeName}}</b>
						<b class="storeHint-II">浙江杭州江干区景昙路店</b>
						<b class="storeHint-III">浙江杭州江干区景昙路店</b>
						<span>去店铺逛逛</span>
					</div>
					<div class="goodsList" >
						<ul>
							<li v-for="(listItem, index) in storeItem.list" :key="index">
								<span class="wis-que-checkbox"><input type="checkbox" :checked="listItem.checked" value="1016790" @click="editCart('checked', listItem , storeItem)"></span> 
								<a href="#/product-details/?id=451686176875638784&amp;vendorType=TYPE_B" class="fl">
									<figure><img class="goodsImg" src="https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/1a665fe8-dc80-4c96-9f86-825a1d698c24"></figure>
								</a> 
								<div class="right">
									<a href="#/product-details/?id=451686176875638784&amp;vendorTypes=TYPE_B" class="goodsLink">{{listItem.proName}}</a> 
									<div class="goodsEdit">
										<label class="goodsPrice"><b>¥ </b>408.70</label>
										<div class="goodsNumbox" value="1">
											<button class="minusBtn" @click="editCart('minu', listItem)"><i class="rsiconfont rsicon-jian"></i></button> 
											<input readonly="readonly" type="number" class="goodsNum" :value="listItem.proNum" /> 
											<button class="addBtn" @click="editCart('add', listItem)"><i class="rsiconfont rsicon-jia"></i></button>
										</div>                  
										<button class="deleteBtn" @click="delCart(listItem, storeItem)">删除</button>
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
		<footer class="footer">
			<div class="innter">
				<span class="wi-qu-inp">
					<input type="checkbox" :checked="checkAllFlag" @click="toggleCheckAll"/>
				</span>
				<span class="leftTitle">全选</span>
				<span class="leftSolid"></span>
				<div class="con">
					<p>合计：<b>¥ </b><b>{{totalPrice}}</b></p>
					<p>(不含运费)</p>
				</div>
				<button class="settlement" v-show="hasProChecked">结算</button>
				<button class="noSettlement" v-show="!hasProChecked">结算</button>
				<!-- <button class="Settlement">结算</button> -->
			</div>
		</footer>
		<Footer />
	</div>
</template>

<script>
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';



export default {
	name: 'Cart',
	data(){
		return {
			hasGoods: false,
			carCaptionShow: true,
			cartList:[
				{
					storeId:"00001",
					storeName:"三只松鼠",
					storeIink:"/index",
					checked:false,
					list : [
						{checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:1,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						{checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
					]
				},
				{					
					storeId:"00001",
					storeName:"三只松鼠",
					storeIink:"/index",
					checked:false,				
					list : [
						{checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						{checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
					]
				},
				{					
					storeId:"00001",
					storeName:"三只松鼠",
					storeIink:"/index",
					checked:false,					
					list : [
						{checked:false,able:"新品",id:1,proId:"10001",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						{checked:false,bable:"新品",id:2,proId:"10002",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",proName:"荐形容的狠货厚高的工人的",proPrice:1,proNum:2,prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"}
					]
				},
			],
			delItem:{}
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
	filters: {
		getNum: function (value) {
			return parseInt(value);
		}
	},
	computed: {
		checkAllFlag() {
			return this.checkedStoreCount == this.cartList.length;				
		},
		checkedStoreCount() {
			let i = 0;
			this.cartList.forEach((item) => {
				if(item.checked === true) i++;
			})				
			return i
		},
		totalPrice(){
			let money = 0;
			this.cartList.forEach((item)=>{
				item.list.forEach((index)=>{						
					if(index.checked == true){
						money += parseFloat(index.proPrice)*parseInt(index.proNum);
					}
				})
			})
			return money;
		},
		hasProChecked(){
			let hasProChecked = false;
			this.cartList.forEach((item)=>{
				item.list.forEach((index)=>{						
					if(index.checked == true){
						hasProChecked = true;
						return 
					}
				})
			})
			return hasProChecked;
		}
	},
	methods:{
			delCart(item, parentItem) {//删除购物车商品
				this.delItem = item;
				parentItem.list.forEach((_item, index)=>{
					if(_item.proId === item.proId){
						parentItem.list.splice(index,1);
					}
				})
				
			},
        editCart(flag, item, parentItem) {
            let num = 0;
				
            if(flag == 'storeChecked'){//店铺全选按钮点击事件
					let state = item.checked === true?false:true;
					item.list.forEach((index) => {
						index.checked = state
					})	
					item.checked = !item.checked;
            } else if(flag == 'checked'){
                item.checked = item.checked== true?false:true;
					 this.storeCheckedListen(parentItem);
            } else if(flag == 'add') {
					console.log(item.proNum)
                item.proNum++;
					 num = 1;
            } else {
                if(item.proNum <= 1) {
                    return
                }
                item.proNum--;
                num = -1;
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
			  	let storeListLength = item.list.length;
				let storeListCheckedNum = 0;
				item.list.forEach((index) => {
					if(index.checked == '1') storeListCheckedNum++;
				})		
				return storeListLength === storeListCheckedNum;
		  },
		  storeCheckedListen(item) {//根据店铺组内是否全部选中状态 修改店铺全选的值
			  	let storeCheckedState = this.storeCheckedState(item);
				item.checked = storeCheckedState ? true : false;
		  },
		  toggleCheckAll () {
				let flag = !this.checkAllFlag;
				this.cartList.forEach((item)=>{
					item.checked = flag?true:false;
					item.list.forEach((index)=>{
						index.checked = flag?true:false;
					})
				})
				// axios.post("/users/editCheckAll",{
				// 	checkAll:flag
				// }).then((response)=>{
				// 	let res = response.data;
				// 	if(res.status == '0'){
				// 		console.log("update suc");
				// 	}
				// })
			},
		  closeCarCaption(){
			  this.carCaptionShow = false;
		  }
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
	bottom: 200px;
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

.header h2{
	width: 100%;
	text-align: center
}
.header a{
	position: absolute;
	top: 0;
	line-height: 100px;
	height: 100px;
	color: #1655bf;
	font-size: 30px;
}

.header a.edit{
	right: 20px;
}

.header a.back{
	left: 20px;
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

#app .wi-qu-inp,#app .wis-que-checkbox {
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
  text-align: center;
	background: #fff;
	color: #1655bf;
	overflow: hidden;
}

.goodsNumbox .rsiconfont{
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

.deleteBtn{
	flex: 0 0 100px;
	display: block;
	border: 0;
	background: #fa4d3e;
	color: #fff;
	text-align: center;
	width: 40px;
}


.footer{
	position: fixed;
	bottom: 100px;
	left: 0;
	right: 0;
	height: 100px;
	line-height: 100px;
	background: #fff;
	overflow: hidden;
}

.footer .innter{
	padding-left:80px; 
}

.footer .leftTitle,.footer .leftSolid,.footer .con{
	float: left;
}

.footer .leftSolid{
	display: block;
	margin: 15px 15px;
	width: 2px;
	height: 70px;
	border-right: 1px solid #ddd;
}
.footer .con{
	line-height: 50px;
}
.footer .con b{
	color: #fa4d3e;
}
.settlement,.noSettlement{
	display: block;
	width: 150px;
	height: 100px;
	border: none;
	background: #1655bf;
	color: #fff;
	text-align: center;
	position: absolute;
	right: 0;
	top: 0;
}

.noSettlement{
	background: #fa4d3e;
}
.noSettlement{
	background: #999;
}
</style>
