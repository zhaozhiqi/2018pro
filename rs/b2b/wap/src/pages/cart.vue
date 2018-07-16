<template>
	<div id="cart">
		<main class="main" :class="{'noGoods':cartList.length <= 0}">
			<CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
			<div class="car-empty" v-if="cartList.length <= 0">
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
						<!-- <b class="storeHint-II">浙江杭州江干区景昙路店</b>
						<b class="storeHint-III">浙江杭州江干区景昙路店</b> -->
						<span>去店铺逛逛</span>
					</div>
					<div class="goodsList" >
						<ul>
							<li v-for="(listItem, index) in storeItem.list" :key="index">
								<span class="wis-que-checkbox"><input type="checkbox" :checked="listItem.checked" value="1016790" @click="editCart('checked', listItem , storeItem)"></span> 
								<router-link :to="{path:'/product', query: { id: listItem.proId }}" class="fl">
									<figure><img class="goodsImg" :src="listItem.proImg"></figure>
								</router-link> 
								<div class="right">
									<router-link :to="{path:'/product', query: { id: listItem.proId }}" class="goodsLink">{{listItem.proName}}</router-link> 
									<div class="goodsEdit">
										<label class="goodsPrice"><b>¥ </b>{{listItem.proPrice}}</label>
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
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import CommonHeader from '@/components/common-header'
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';



export default {
	name: 'Cart',
	data(){
		return {
			carCaptionShow: true,
			cartList:[],
			delItem:{},
			commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
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
	created(){
		console.log('created')
	},
	mounted(){
		this.cartList = this.$store.state.cartList;
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
			let num = -item.proNum;
			parentItem.list.forEach((_item, index)=>{
				if(_item.proId === item.proId){
					parentItem.list.splice(index,1);
					this.$store.commit('updateCartCount',num)
					if(parentItem.list.length <= 0){
						this.delCartStore(parentItem)
					}					
				}
			})			
		},
		delCartStore(parentItem) {//删除购物车商铺
		console.log(this.cartList)
			this.cartList.forEach((item, index)=>{
				if(item.storeId === parentItem.storeId){
					this.cartList.splice(index,1);
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
				this.$store.commit('updateCartCount',num)
            } else {
                if(item.proNum <= 1) {
                    return
                }
                item.proNum--;
				num = -1;
				this.$store.commit('updateCartCount',num)
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
		},
		goPay(){
			this.$router.push({ path: '/Pay'})
		}
	}
};
</script>

<style scoped>
#cart .car-empty .ico-car {
	background-image: url('../../static/images/public/car-icon.png');
}
#app .wi-qu-inp,#app .wis-que-checkbox {
	background-image: url('../../static/images/public/sel-no.png') no-repeat;
}
</style>
