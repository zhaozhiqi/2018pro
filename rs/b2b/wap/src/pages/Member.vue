<template>
	<div id="member">
		<div class="main">
			<header class="header">			
				<div class="top">
					<router-link to="/setting"  class="memberSetLink" ><i class="rsiconfont rsicon-31shezhi"></i></router-link>
					<router-link to="/noticeList" class="noticeListLink"><i class="rsiconfont rsicon-31xiaoxi"></i></router-link>
				</div>
				<div class="memberInfo">
					<figure><img class="memberLogo" :src="memberInfo.memberLogoImg"></figure>
					<div class="memberInfoCon">
						<p class="memberInfoName">{{memberInfo.memberName}}</p>
						<!-- <p class="memberInfoStore">{{memberInfo.memberStoreName}}</p> -->
						<p class="memberInfoRank">{{memberInfo.memberInfoRank}}</p>
						<p class="memberInfoId">{{memberInfo.memberId}}</p>
					</div>
				</div>
			</header>
			<section class="section">
				<router-link :to="{ name: 'Order', params:{ userId: memberInfo.memberId, orderTabActive: 'allOrder'}}" class="itemLink"><span class="linkName"><i class="rsiconfont rsicon-quanbudingdan"></i><em>全部订单</em></span><span class="linkRouter"><em></em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span></router-link>
				<div class="orderMenu">
					<nav>
						<router-link :to="{ name: 'Order', params:{ userId: memberInfo.memberId, orderTabActive: item.type}}" class="orderMenuLink" v-for="(item, index) in orderMenuList" :key="index">
							<i class="rsiconfont" :class="item.iconClass"></i>
							<span>{{item.name}}</span>
							<b class="line"></b>
							<em class="num">{{item.num}}</em>
						</router-link>
					</nav>
				</div>
				<router-link  
				:to="{ name: item.href, params:{ userId: memberInfo.memberId, orderTabActive: 'allOrder'}}" 
				class="itemLink" 
				v-for="(item, index) in memberMenuList" 
				:key="index">
					<span class="linkName">
						<i class="rsiconfont rsicon-radio"></i><em>{{item.name}}</em>
					</span>
					<span class="linkRouter"><em>{{item.con}}</em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span>
				</router-link>
			</section>
			<!-- <div class="car-member-recommend">为您推荐</div> 
			<TypeGoodsList /> -->
			<Footer />
		</div>
	</div>
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie'

export default {
	name: 'Member',
	data(){
		return {
			RANK:"",
			memberInfo:{
				memberId:"0001",
				memberName:"王XX",
				memberInfoRank:"用户",
				memberInfoStore:"",
				memberStoreName:"和顺批发",
				memberLogoImg:"static/images/memberLogo.jpg"
			},
			orderMenuList:[
				{
					type:'payOrder',
					iconClass:"rsicon-31daifukuan",
					name:"待付款",
					num:1
				},
				{
					type:'sendOrder',
					iconClass:"rsicon-31daifahuo",
					name:"待发货",
					num:2
				},
				{
					type:'receiveOrder',
					iconClass:"rsicon-31daishouhuo",
					name:"待收货",
					num:3
				},
				{
					type:'estimateOrder',
					iconClass:"rsicon-31daipingjia",
					name:"待评价",
					num:4
				},
				{
					type:'refundOrder',
					iconClass:"rsicon-tuikuantuihuo",
					name:"退款退货",
					num:5
				}
			],
			memberMenuList:[],
			proinfo: []
		}
	},
	components: {
		TypeGoodsList,
		Footer
	},
	mounted(){
		this.orderMenuList.forEach((item)=>{
			let typeName = item.type;
			let orderList = this.$store.state.orderList;
			orderList.forEach((index)=>{
				if(typeName === index.orderType){
					let num = index.orderCount
					item.num = num
					return
				}
			})			
		})
		this.RANK = Cookies.get('RANK')
		switch (this.RANK) {
			case '0':	this.memberInfo.memberInfoRank =  "经销商";
							this.memberMenuList=[
									{
										href:'',
										iconClass:"rsicon-31daifukuan",
										name:"我的客户",
										con:"",
										num:1
									},{
										href:'Seach',
										iconClass:"rsicon-31daifukuan",
										name:"我的商品",
										con:"",
										num:1
									},{
										href:'Order',
										iconClass:"rsicon-31daifukuan",
										name:"我的订单",
										con:"",
										num:1
									}
							]
				break;
			case 'admin2':	this.memberInfo.memberInfoRank =  "分销商";
							this.memberMenuList=[
									{
										href:'/',
										iconClass:"rsicon-31daifukuan",
										name:"我的客户",
										con:"",
										num:1
									},{
										href:'Seach',
										iconClass:"rsicon-31daifukuan",
										name:"我的商品",
										con:"",
										num:1
									},{
										href:'Order',
										iconClass:"rsicon-31daifukuan",
										name:"我的订单",
										con:"",
										num:1
									}
							]
				break;
			case 'admin3':	this.memberInfo.memberInfoRank =  "超市";
							this.memberMenuList=[
									{
										href:'/',
										iconClass:"rsicon-31daifukuan",
										name:"我的客户",
										con:"",
										num:1
									},{
										href:'Seach',
										iconClass:"rsicon-31daifukuan",
										name:"我的商品",
										con:"",
										num:1
									},{
										href:'Order',
										iconClass:"rsicon-31daifukuan",
										name:"我的订单",
										con:"",
										num:1
									}
							]			
				break;
			case 'admin4':	this.memberInfo.memberInfoRank =  "用户";	
							this.memberMenuList=[
									{
										href:'',
										iconClass:"rsicon-31daifukuan",
										name:"XXXXXXX",
										con:"",
										num:1
									}
							]		
				break;		
			default:
				break;
		}
		console.log(this.RANK,'RANK');

	},
	methods:{

	}
};
</script>
