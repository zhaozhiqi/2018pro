<template>
	<div id="order">
		<CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
		<div class="orderMenu">
			<nav>
				<div class="orderItem" v-for="(item, index) in orderTabList" :key="index" :class="{'active':item.id === orderTabActive}" @click="orderTabClick(item.id)">{{item.name}}</div>
			</nav>
		</div>
		<main class="main">
			<div class="orderItem" v-for="(itemI, index) in orderList" :key="index" v-show="itemI.orderType == orderTabActive" >
				<Nodata :nodata="nodataObj" v-if="itemI.list.length <= 0"></Nodata>
				<div class="orderItemCon" v-for="(itemII, index) in itemI.list" :key="index" :state="itemII.stateName" v-else>
					<div class="itemTitle"><i class="rsiconfont rsicon-dianpu"></i> <b>{{itemII.storeName}}</b> <span>{{itemII.stateName}}</span></div>
					<div class="itemCon">
						<p class="orderId">订单编号:{{itemII.orderId}}</p> 
						<ul><li class="" v-for="(itemIII, index) in itemII.productList" :key="index"><figure><img :src="itemIII.proImg"></figure> 
							<div><h4><span></span>{{itemIII.proName}}</h4> <p><span>¥</span>{{itemIII.proPrice}}<span>×{{itemIII.proNum}}</span></p></div></li>
						</ul>
					</div>
					<div class="itemOperate">
						<p><!----> <span>共{{itemII.proAllNum}}件商品  实付: <b>¥</b> <b>{{itemII.orderMoney}}</b></span></p> 
						<p><router-link class="btn" v-for="(itemIIII, index) in itemI.button" :key="index" :id="itemII.orderId" :to="itemIIII.link">{{itemIIII.name}}</router-link></p>
					</div>
				</div>
			</div>
		</main>	
	</div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
export default {
	name: 'Order',
	data(){
		return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "我的订单",
                isOtherShow: true,
                otherIconClass: "rsicon-home"
            },
			nodataObj:{
                iconName:"rsicon-quanbudingdan",
                nodataMsg:"还没有订单哦"
            },
			userId:0,
			orderTabActive:"allOrder",
			orderTabList:[
				{
					name:"全部订单",
					id:"allOrder"
				},
				{
					name:"待付款",
					id:"payOrder"
				},
				{
					name:"待发货",
					id:"sendOrder"
				},
				{
					name:"待收货",
					id:"receiveOrder"
				},
				{
					name:"待评价",
					id:"estimateOrder"
				},
				{
					name:"退货/售后",
					id:"refundOrder"
				}
			],
			orderList:[]
		}
	},
	components: {
		CommonHeader,
		Nodata
	},
	mounted(){
		this.userId = this.$route.params.userId;
		if(this.$route.params.orderTabActive!==undefined){
			this.orderTabActive = this.$route.params.orderTabActive;
		}
		this.orderList = this.$store.state.orderList;

	},
	filters: {
		getNum: function (value) {
			return parseInt(value);
		}
	},
	computed: {

	},
	methods:{
		back(){
			window.history.go(-1)
		},
		orderTabClick(type){
			this.orderTabActive = type;
		},
	}
};
</script>
