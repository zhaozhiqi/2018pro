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
						<p class="memberInfoStore">{{memberInfo.memberStoreName}}</p>
						<p class="memberInfoId">{{memberInfo.memberId}}</p>
					</div>
				</div>
			</header>
			<section class="section">
				<router-link :to="{ name: 'Order', params:{ userId: memberInfo.memberId, orderTabActive: 'allOrder'}}" class="itemLink"><span class="linkName"><i class="rsiconfont rsicon-quanbudingdan"></i><em>全部订单</em></span><span class="linkRouter"><em>水电费水电费水电费</em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span></router-link>
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
				<router-link  :to="{ name: 'Order', params:{ userId: memberInfo.memberId, orderTabActive: 'allOrder'}}" class="itemLink" v-for="(item, index) in 4" :key="index"><span class="linkName"><i class="rsiconfont rsicon-quanbudingdan"></i><em>全部订单</em></span><span class="linkRouter"><em>水电费水电费水电费</em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span></router-link>
			</section>
			<div class="car-member-recommend">为您推荐</div> 
			<TypeGoodsList class=""/>
			<Footer />
		</div>
	</div>
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';


export default {
	name: 'Member',
	data(){
		return {
			memberInfo:{
				memberId:"0001",
				memberName:"二哈",
				memberStoreName:"二哈宠物店",
				memberLogoImg:"../../static/images/memberLogo.jpg"
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
			proinfo: []
		}
	},
	components: {
		TypeGoodsList,
		Footer
	},
	mounted(){
		this.orderMenuList.forEach((item)=>{
			let typeName = item.type
			let num = this.$store.state.order[typeName].num
			item.num = num
		})
	},
	methods:{

	}
};
</script>

<style scoped>
#member{
	overflow: hidden;
	/* background: #fff; */
	height: 100%;
}

.main{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding-bottom: 100px;
	overflow: hidden;
}

.header{
	flex-direction: column;
	background: #1655bf;
	color: #fff;
	height: 220px;
	padding-top: 20px;
	padding-bottom: 20px;
	
}

.header .top{
	overflow: hidden;
	width: 100%;
	height: 60px;
	line-height: 60px;
}

.header .noticeListLink,.header .memberSetLink{
	float: right;
	text-align: center;
	margin-right: 20px;
	width: 60px;
	height: 60px;
}

.memberInfo{
	padding: 0 20px 0 40px;
	width: 100%;
	height: 120px;
	overflow: hidden;
}

.memberInfo figure{
	float: left;
	width: 100px;
	height: 100px; 
	margin-right: 40px;
	border-radius: 50%;
	overflow: hidden;
}
.memberInfo figure{
	width: 120px;
	height: 120px; 
	border-radius: 50%;
	overflow: hidden;
}

.memberInfo .memberInfoCon{
	float: left;
}

.memberInfoName,.memberInfoStore,.memberInfoId{
	font-size: 30px;
	line-height: 40px;
	height: 40px;
}

.memberInfoId{
	font-size: 20px; 
}

.itemLink{
	background-color: #fff; 
	padding: 0 20px;
	overflow: hidden;
	display: block; 
	width: 100%;
	line-height: 80px;
	height: 80px;
	font-size: 25px;
	vertical-align: middle;
	border-bottom: 1px solid #efefef;
}

.itemLink .rsiconfont{
	font-size: 20px;
}

.itemLink .linkName{
	float: left;
}
.itemLink .linkRouter{
	float: right;
}

.itemLink .linkName .rsiconfont{
	color: #fa4d3e;
	font-size: 40px;
	margin-right: 10px;
}

.itemLink .linkRouter .rsiconfont{
	margin-left: 10px;
}

.orderMenu{
	background-color: #fff;
	margin-bottom: 20px;
}

.orderMenu nav{
	display: flex;
}

.orderMenu nav .orderMenuLink{
	position:relative;
	flex: 1;
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	text-align: center
}

.orderMenu nav .orderMenuLink .rsiconfont{
	display: block;
	line-height: 48px;
	height: 48px;
	font-size: 44px;
}

.orderMenu nav .orderMenuLink b{
	height: 1px;
	margin: 0 auto;
	min-width: 60px;
    display: block;
    background-color: #fa4d3e;
}

.orderMenu nav .orderMenuLink em{
	position: absolute;
    top: 20px;
    left: 56%;
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


.car-member-recommend{
	line-height: 40px;
	height: 40px;
	margin: 20px 0;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
}
</style>
