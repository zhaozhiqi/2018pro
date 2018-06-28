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
					<li class="product-brands-item" v-for="(item, index) in 20" 
					:key="index" 
					:class="{'active':index == productBrandsIndex}"
					@click="changeProductBrands(index)"
					>日耳曼战车{{index}}</li>
				</ul>
			</aside>
			<TypeGoodsList :proinfo="proinfo" class="proList" /> 
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
			productBrandsIndex:-1,
			proinfo: []
		}
	},
	components: {
		SeachHeader,
		TypeGoodsList,
		Footer
	},
	mounted(){
		this.proinfo = this.typeIList[0].proList;
	},
	methods:{
		checkTypeI(index){
			let _index = index;
			for(const item of this.typeIList) {
				item.isActive === true?item.isActive = false:item.isActive = false;
			}
			this.typeIList[_index].isActive = true;
			let id = this.typeIList[_index].id;
			return id;
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
			let _id = this.checkTypeI(index);
			for (const item of this.typeIList){
				if(item.id === _id){
					this.proinfo = item.proList;    
				}        
			}
			console.log(this.proinfo,'proinfo')
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
}
.product-typeList nav .product-typeList-item{
	flex: 0 0 12.5%;
	border-bottom: 3px solid #fff;
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
