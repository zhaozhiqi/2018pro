<template>
	<div id="classify">
		<header class="header">
			<SeachHeader  :style="bannerStyle" :bannerHeight="0"/>
			<div class="product-typeList">
				<nav>
					<div class="product-typeList-item" 
					v-for="(item, index) in typeIList" 
					:key="index" 
					:class="{ active:item.isActive }"
					@click="getProIbnfo(index)">{{item.name}}</div>
				</nav>
			</div>
			<div class="product-catalog">
				<ul>
					<li :class="{'active':sortObj.sortActive == 'default'}" @click="changeSortActive('default')">综合排序</li> 
					<li :class="{'active':sortObj.sortActive == 'sales'}" @click="changeSortActive('sales')"><span>销量</span><input type="hidden" value=""></li> 
					<li :class="{'active':sortObj.sortActive == 'price'}" @click="changeSortActive('price')"><span>价格</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></li>
				</ul>
			</div>
		</header>   
		<div id="main">
			<aside class="product-brands">
				<ul>
					<li class="product-brands-item " :class="{'active': -1 == productBrandsIndex}" @click="changeProductBrands(-1)">全部<li>
					<li class="product-brands-item" 
					v-for="(item, index) in typeIIList" 
					:key="index" 
					:id="item.id" 
					:class="{'active':index == productBrandsIndex}"
					@click="changeProductBrands(index)"
					>{{item.name}}</li>
				</ul>
			</aside>
			<TypeGoodsList :proList="typeIIList[0].content" class="proList" /> 
		</div>
		<Footer />
	</div>
</template>

<script>
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';


export default {
	name: 'Classify',
	data(){
		return {
			bannerStyle:{
				backgroundColor: '#1655bf'
			},
			sortObj:{
				sortActive: "default",
				sortPriceIcon:"rsicon-shengxu",
				sortSequence:"as-order",//"as-order"
			},
			typeIList:[
				{ id:1,type:"JL",name:"酒类",isActive:true,
					proList:[
						{
							id:"01",
							type:"01",
							name:"果酒",
							content:[
									{bable:"新品",proImg:"../../static/images/wap-20.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
						{
							id:"02",
							type:"02",
							name:"啤酒",
							content:[
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
						{
							id:"03",
							type:"03",
							name:"烈酒",
							content:[
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
									{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
							]
						},
					]
				},
				{ id:2,type:"YL",name:"饮料",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"果汁饮料",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-02.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"碳酸饮料",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"茶饮料",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"水功能饮料",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:3,type:"XXBJ",name:"休闲保健",isActive:false,proList:[					
					{
						id:"01",
						type:"01",
						name:"饼干威化",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-03.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"糕点",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"糖巧果冻",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"熟食肠类",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"干果蜜饯",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"膨化食品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"07",
						type:"07",
						name:"保健品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:4,type:"FBSS",name:"方便速食",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"方便面\粉",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-04.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"牛奶乳品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"方便速食",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"麦片冲饮",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:5,type:"MMLY",name:"米面粮油",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"食用油",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-05.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"米",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"面",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"干货",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:6,type:"CFTL",name:"厨房调料",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"调味料",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-06.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"调味酱",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"调味汁",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:7,type:"ZPRH",name:"纸品日化",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"纸品湿巾",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-07.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"家居清洁",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"家洗用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"洗发护发",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"卫生用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"口腔",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"07",
						type:"07",
						name:"计生用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"08",
						type:"08",
						name:"染发造型",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"09",
						type:"09",
						name:"特殊护理",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"10",
						type:"10",
						name:"个人清洁",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"11",
						type:"11",
						name:"护理美妆",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:8,type:"BH",name:"百货",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"餐具水具酒具",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-08.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"汽车用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"收纳卫浴用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"一次性用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"内衣",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"厨房工具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"07",
						type:"07",
						name:"清洁工具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"08",
						type:"08",
						name:"五金工具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"09",
						type:"09",
						name:"床上用品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"10",
						type:"10",
						name:"鞋类",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"11",
						type:"11",
						name:"棋牌球饰",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"12",
						type:"12",
						name:"毛巾浴巾",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"13",
						type:"13",
						name:"雨具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"14",
						type:"14",
						name:"文具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"15",
						type:"15",
						name:"小家电",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:9,type:"LDLC",name:"冷冻冷藏",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"冰激淋",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-09.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"冷冻副食",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"低温奶品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"冷冻面点",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"热餐",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"常温奶品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"07",
						type:"07",
						name:"低温熟食",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"08",
						type:"08",
						name:"低温饮料",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"09",
						type:"09",
						name:"关东煮",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"10",
						type:"10",
						name:"品牌面包",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"11",
						type:"11",
						name:"热柜食品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"12",
						type:"12",
						name:"蒸制食品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"13",
						type:"13",
						name:"常温面包",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:10,type:"MYYP",name:"母婴用品",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"婴童用品",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-10.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"婴童清洁",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"婴童纸尿裤",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"婴童玩具",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"婴童护理",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"婴童奶粉",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:11,type:"RSZS",name:"润生专属",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"物料",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-11.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:12,type:"GSDL",name:"果蔬蛋类 ",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"蔬菜类",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-11.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"水果",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"蛋品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:13,type:"RSXS",name:"润生鲜食 ",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"米饭",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-12.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"烹饪面包",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"冷藏便当",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"冷藏甜食",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"05",
						type:"05",
						name:"冷藏蔬果",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"06",
						type:"06",
						name:"鲜食面包",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"07",
						type:"07",
						name:"鲜食奶品",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"08",
						type:"08",
						name:"鲜食熟食",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:14,type:"CZTH",name:"超值特惠 ",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"彩票",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-13.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"实物卷",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"票务旅行",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]},
				{ id:15,type:"JKSP",name:"进口商品 ",isActive:false,proList:[
					{
						id:"01",
						type:"01",
						name:"进口食品",
						content:[
								{bable:"新品",proImg:"../../static/images/pro-14.jpg",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"02",
						type:"02",
						name:"进口酒饮",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"03",
						type:"03",
						name:"进口日化百货",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					},
					{
						id:"04",
						type:"04",
						name:"进口粮油调料",
						content:[
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
								{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",name:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
						]
					}
				]}
			],
			typeIIList:[],
			productBrandsIndex:-1,
			proinfo: []
		}
	},
	components: {
		SeachHeader,
		TypeGoodsList,
		Footer
	},
	created(){
		this.typeIIList = this.typeIList[0].proList;
	},
	mounted(){
		
	},
	methods:{
		checkTypeI(index){
			let _index = index;
			for(const item of this.typeIList) {
				item.isActive === true?item.isActive = false:item.isActive = false;
			}
			this.typeIList[_index].isActive = true;
		},
		changeProductBrands(index){
			this.productBrandsIndex = index;
			console.log(this.productBrandsIndex,'index')
		},
		changeSortActive(index){
			if(index === 'price'){
				if(this.sortObj.sortActive !== 'price'){
					this.sortObj.sortActive = 'price';
				}else{
					if(this.sortObj.sortSequence === "de-order"){
						this.sortObj.sortSequence = "as-order"//升序
						this.sortObj.sortPriceIcon = "rsicon-shengxu"
					}else{
						this.sortObj.sortSequence = "de-order"//降序
						this.sortObj.sortPriceIcon = "rsicon-jiangxu"
					}
				}
			}else{
				this.sortObj.sortActive = index;
			}			
		},
		getProIbnfo(index){
			this.checkTypeI(index);
			this.typeIList.forEach(item=>{
				if(item.isActive === true){
					this.typeIIList = item.proList;
				}
			})
		}

	}
};
</script>

<style scoped>
#classify{
	overflow: hidden;
	/* background: #fff; */
	height: 100%;
}

#classify .header{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	padding-top: 100px;
	display: flex;
	flex-direction: column;
	background: #fff;
}

/*start 产品分类  I级菜单  顶部*/
.product-typeList {
	width: 100%;
	line-height: 74px;
	height: 80px;
	text-align: center;
	vertical-align: middle;
}
.product-typeList nav{
	display: flex;  
	overflow-x: auto;
	border-bottom: 1px solid #efefef;
	height: 100%;
}
.product-typeList nav .product-typeList-item{
	flex: 0 0 20%;
	border-bottom: 3px solid #fff;
	height: 100%;
}
.product-typeList nav .product-typeList-item.active{
	border-color: #1655bf;
}
/*  end 产品分类  I级菜单*/
/*start 产品筛查  II级菜单-上*/
.product-catalog{
	width: 100%;
	line-height: 78px;
	height: 80px;
	text-align: center;
	vertical-align: middle;
	border-bottom: 2px solid #efefef;
}
.product-catalog>ul{
	display: flex;
	flex-direction: row;
}

.product-catalog>ul>li{
	flex: 1;
	height: 79px;
}

.product-catalog>ul>li.active{
	color: #1655bf;
}

.product-catalog>ul>li>i{
	font-size: 30px;
}

/*  end 产品筛查  II级菜单-上*/
/*start 内容滚动区域*/
 #main{
		position: absolute;
		top: 280px;
		width: 100%;
		left: 0;
		bottom: 120px;
		overflow: auto;
}

/*start 产品品牌  II级菜单-左*/
.product-brands{
	float: left;
	width: 22%;
	height: 100%;
	margin-right: 3%;
	text-align: center;
	background: #fff;
	line-height: 60px;
	overflow-y: auto;
}

.product-brands-item.active{
	background-color: #efefef;
	line-height: 100px; 
}
/*  end 产品品牌  I级菜单-左*/
/*start 产品列表右*/
.proList{
	height: 100%;
	text-align: center;
	background: #fff;
	line-height: 60px;
	overflow-y: auto;
}
/*  end 产品列表右-右*/
/*end 内容滚动区域*/
</style>
