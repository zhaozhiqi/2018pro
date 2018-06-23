<template>
	<div id="order">
		<header class="header">
			<span class="goBack" @click="back"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
			<h2 class="title">我的订单</h2>
			<router-link to="/Home" class="goHome"><i class="rsiconfont rsicon-home"></i></router-link>
		</header>
		<CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
		<div class="orderMenu">
			<nav>
				<div class="orderItem" v-for="(item, index) in orderTabList" :key="index" :class="{active:item.isActive}" @click="orderTabClick(item.id)">{{item.name}}</div>
			</nav>
		</div>
		<main class="main">
			<div class="orderItem" v-for="(itemI, index) in orderList" :key="index" v-show="itemI.isActive">
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
					id:"allOrder",
					isActive:true
				},
				{
					name:"待付款",
					id:"payOrder",
					isActive:false
				},
				{
					name:"待发货",
					id:"sendOrder",
					isActive:false
				},
				{
					name:"待收货",
					id:"receiveOrder",
					isActive:false
				},
				{
					name:"待评价",
					id:"estimateOrder",
					isActive:false
				},
				{
					name:"退货/售后",
					id:"refundOrder",
					isActive:false
				}
			],
			orderList:[
				{
					orderType:"allOrder",
					isActive: true,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"1",
							stateName:"待付款",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"1",
							stateName:"待付款",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
				{
					orderType:"payOrder",
					isActive: false,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"1",
							stateName:"待付款",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"1",
							stateName:"待付款",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
				{
					orderType:"sendOrder",
					isActive: false,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"2",
							stateName:"待发货",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"2",
							stateName:"待发货",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
				{
					orderType:"receiveOrder",
					isActive: false,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"3",
							stateName:"待收货",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"3",
							stateName:"待收货",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
				{
					orderType:"estimateOrder",
					isActive: false,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"4",
							stateName:"待评价",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"4",
							stateName:"待评价",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
				{
					orderType:"refundOrder",
					isActive: false,
					button:[
						{
							name:"取消订单",
							link:"/CancelOrder"
						},
						{
							name:"去支付",
							link:"/PayOrder"
						}
					],
					list:[
						{							
							state:"5",
							stateName:"退货/售后",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817M",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								},
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:4,
							orderMoney:1200
						},
						{	
							state:"5",
							stateName:"退货/售后",
							storeName:"二哈宠物商城",
							orderId:"B2CK18062205817L",
							productList:[
								{
									proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",
									proName:"荐形容的狠货厚高的工人的",
									proPrice:1,
									proNum:2,
									proLink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"
								}
							],
							proAllNum:2,
							orderMoney:600
						}
					]
				},
			]
		}
	},
	components: {
		CommonHeader,
		Nodata
	},
	mounted(){
		this.userId = this.$route.params.userId;
		this.orderTabActive = this.$route.params.orderTabActive;
		this.orderTabClick(this.orderTabActive);
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
			this.orderTabList.forEach((index)=>{
				if(index.id == this.orderTabActive){
					index.isActive = true;
				}else{
					index.isActive = false;
				}
			})
			this.orderMainChange()
		},
		orderMainChange(){
			this.orderList.forEach((item)=>{
				if(this.orderTabActive === item.orderType){
					item.isActive = true
				}else{
					item.isActive = false
				}
				
			})
		}
	}
};
</script>

<style scoped>
#order{
	overflow: hidden;
	height: 100%;	
	font-size: 26px;
}

.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100px;	
	line-height: 100px;
	font-size: 35px;
	background: #fff;
}

.header .title{
	width: 100%;
	height: 100%;
	text-align: center;
}

.goBack,.goHome{
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

.goHome{
  right: 20px;
}

.goBack .rsiconfont,.goHome .rsiconfont{
  display: block;
  width: 100%;
  height: 100%;
  font-size: 40px;
}

.goHome .rsiconfont{
  font-size: 50px;
}

.orderMenu{
	position: fixed;
	top: 100px;
	left: 0;
	width: 100%;;
	overflow: auto;
	line-height: 80px;
	text-align: center;
	background-color: #fff;
	border-bottom: 1px solid #efefef;
}

.orderMenu nav{
	height: 78px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}

.orderMenu nav .orderItem{
	box-sizing:content-box;
	flex: 0 0 16.6%;
	border-bottom: 2px solid #fff;
}
.orderMenu nav .orderItem.active{
	border-bottom-color: #1655bf;
	color: #1655bf;
}


.main{
	position: absolute;
	top: 100px;
	width: 100%;
	left: 0;
	top: 180px;
	overflow: auto;
	display: flex;
	flex-direction: column;
}

.orderItem{
	flex: 1;	
	color: #333;
	font-size: 26px;
}

.orderItem .orderItemCon{
	margin-bottom: 20px;
	padding: 0 20px;	
	background-color: #fff;
}

.orderItem .itemTitle{
	line-height: 80px;
	height: 80px;
}

.orderItem .itemTitle .rsiconfont{
	font-size: 30px;
}

.orderItem .itemTitle b{
	font-weight: 100;
}

.orderItem .itemTitle span{
	float: right;
	color: #1655bf;
}

.orderItem .itemCon{
	border: 1px solid #efeff4;
}

.orderItem .itemCon .orderId{
	padding: 0 20px;
    line-height: 60px;
    border-bottom: 1px solid #efeff4;
}

.orderItem .itemCon li{
	padding: 20px;
    border-bottom: 1px solid #efeff4;
    cursor: pointer;
	overflow: hidden;
}

.orderItem .itemCon li img{
	width: 128px;
    height: 128px;
    border: 1px solid #efeff4;
    float: left;
    margin-right: 30px;
}

.orderItem .itemCon li>div{
	overflow: hidden;
}

.orderItem .itemCon li>div h4{
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 70px;
    line-height: 36px;
}

.orderItem .itemCon li>div p{
	margin-top: 16px;
    color: #fa4d3e;
    font-size: 30px;
}

.orderItem .itemCon li>div p span:last-child{
	float: right;
    color: #212121;
}

.orderItem .itemOperate {
    background-color: #fff;
    width: 100%;
    font-size: 26px;
    height: 140px;
}

.orderItem .itemOperate>p:first-child {
	line-height: 60px;
	height: 60px;
}

.orderItem .itemOperate>p:first-child>span:last-child {
	float: right;
    color: #1655bf;
}

.orderItem .itemOperate>p:first-child>span:last-child>b{
	color: #fa4d3e;
    font-size: 30px;
	font-weight: 100;
}

.orderItem .itemOperate>p:last-child {
	float: left;
    width: 100%;
    margin-bottom: 20px;
}

.orderItem .itemOperate>p:last-child>.btn {
	height: 60px;
    line-height: 56px;
    padding: 0 20px;
    margin-left: 20px;
    background-color: #1655bf;
    font-size: 26px;
    border: none;
    border-radius: 8px;
    color: #fff;
    float: right;
}


</style>
