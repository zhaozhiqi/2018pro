<template>
	<div id="member">
		<div class="main">
			<header class="header">			
				<div class="top">
					<router-link to="/noticeList" class="noticeListLink"><i class="rsiconfont rsicon-31xiaoxi"></i></router-link>
					<router-link to="/memberSet"  class="memberSetLink" ><i class="rsiconfont rsicon-31shezhi"></i></router-link>
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
				<router-link to="/noticeList" class="itemLink"><span class="linkName"><i class="rsiconfont rsicon-quanbudingdan"></i><em>全部订单</em></span><span class="linkRouter"><em>水电费水电费水电费</em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span></router-link>
				<div class="orderMenu">
					<nav>
						<router-link to="/noticeList" class="orderMenuLink">
							<i class="rsiconfont rsicon-31daifukuan"></i>
							<span>待付款</span>
							<b class="line"></b>
						</router-link>
						<router-link to="/noticeList" class="orderMenuLink">
							<i class="rsiconfont rsicon-31daifahuo"></i>
							<span>待发货</span>
							<b class="line"></b>
						</router-link>
						<router-link to="/noticeList" class="orderMenuLink">
							<i class="rsiconfont rsicon-31daishouhuo"></i>
							<span>待收货</span>
							<b class="line"></b>
						</router-link>
						<router-link to="/noticeList" class="orderMenuLink">
							<i class="rsiconfont rsicon-31daipingjia"></i>
							<span>待评价</span>
							<b class="line"></b>
						</router-link>
						<router-link to="/noticeList" class="orderMenuLink">
							<i class="rsiconfont rsicon-tuikuantuihuo"></i>
							<span>退款退货</span>
							<b class="line"></b>
						</router-link>
					</nav>
				</div>
				<router-link to="/noticeList" class="itemLink" v-for="(item, index) in 4" :key="index"><span class="linkName"><i class="rsiconfont rsicon-quanbudingdan"></i><em>全部订单</em></span><span class="linkRouter"><em>水电费水电费水电费</em><i class="rsiconfont rsicon-qiehuanqiyou"></i></span></router-link>
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
			typeIList:[
				{ id:1,type:"1",name:"白酒",isActive:true,
					proList:[
						{
							typeII:"1",
							typeIIName:"全部",
							content:[
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
						{
							typeII:"2",
							typeIIName:"分类II-1",
							content:[
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
						{
							typeII:"3",
							typeIIName:"分类II-2",
							content:[
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
					]
				},
				{ id:2,type:"2",name:"葡萄酒",isActive:false,proList:[]},
				{ id:3,type:"3",name:"洋酒",isActive:false,proList:[]},
				{ id:4,type:"4",name:"啤酒",isActive:false,proList:[]},
				{ id:5,type:"5",name:"黄酒",isActive:false,proList:[]},
				{ id:6,type:"6",name:"酒具",isActive:false,proList:[]},
				{ id:7,type:"7",name:"白酒",isActive:false,proList:[]},
				{ id:8,type:"8",name:"葡萄酒",isActive:false,proList:[]},
				{ id:9,type:"9",name:"洋酒",isActive:false,proList:[]},
				{ id:10,type:"10",name:"啤酒",isActive:false,proList:[]},
				{ id:11,type:"11",name:"酒具",isActive:false,proList:[]},
				{ id:12,type:"12",name:"其他",isActive:false,proList:[]}
			],
			proinfo: []
		}
	},
	components: {
		TypeGoodsList,
		Footer
	},
	mounted(){

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
}

.header{
	flex-direction: column;
	background: #1655bf;
	color: #fff;
	padding-bottom: 20px;
}

.header .top{
	overflow: hidden;
	width: 100%;
	height: 60px;
	line-height: 60px;
	padding-right: 20px;
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.header .noticeListLink,.header .memberSet{
	padding-right: 20px;
	flex: 0 0 70px;
}

.memberInfo{
	padding: 0 20px 0 40px;
	width: 100%;
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


.car-member-recommend{
	line-height: 40px;
	height: 40px;
	margin: 20px 0;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
}
</style>
