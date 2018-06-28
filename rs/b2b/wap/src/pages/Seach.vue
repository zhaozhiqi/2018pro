<template>
	<div id="seach">
		<header class="header">
			<span class="goBack" @click="goBack"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
			<label class="seachIntOut">
				<i class="rsiconfont rsicon-sousuo"></i>
				<input 	type="text"
						class="seachInt"
						placeholder="搜索"/>
			</label>
			<span class="seachBtn" v-show="true" >搜索</span>
		</header>		
		<div class="seachInit" v-if="seachInit">	
			<h1>热门搜索</h1>			     
			<ul class="hot-seach">
				<li v-for="(item,index) in hotSeachList" :key="index">{{item.value}}</li>
			</ul>
			<h2 v-show="historySeachList.length > 0">搜索历史</h2>
			<ul class="history-seach" v-show="historySeachList.length > 0">
				<li v-for="(item,index) in historySeachList" :key="index"><i class="rsiconfont rsicon-naozhong"></i>{{item.value}}</li>
			</ul>
			<div><button @click="clearHistory" v-show="historySeachList.length > 0">清空历史记录</button></div>
			<div class="car-hot-recommend">热门推荐</div> 
			<TypeGoodsList class=""/>
		</div>
		<div v-else class="seachCon">
			<ul>
				<li :class="{'active':sortObj.sortActive == 'default'}" @click="changeSortActive('default')">综合排序</li> 
				<li :class="{'active':sortObj.sortActive == 'sales'}" @click="changeSortActive('sales')"><span>销量</span><input type="hidden" value=""></li> 
				<li :class="{'active':sortObj.sortActive == 'price'}" @click="changeSortActive('price')"><span>价格</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></li>
			</ul>
		</div>
		<main class="main" v-if="!seachInit">
			<TypeGoodsList class=""/>
		</main>
			
		
	</div>
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';

export default {
	name: 'Cart',
	data(){
		return {
			seachInit: false,
			sortObj:{
				sortActive: "default",
				sortPriceIcon:"rsicon-shengxu",
				sortSequence:"as-order",//"as-order"
			},
			hotSeachList:[{value:'五粮液'},{value:'泸州老窖'},{value:'守望堡'},{value:'拉维亭'},{value:'习酒酱香10'},{value:'茅台'}],
			historySeachList:[{value:'五粮液'},{value:'泸州老窖'},{value:'守望堡'},{value:'拉维亭'},{value:'习酒酱香10'},{value:'茅台'}],
			delItem:{}
		}
	},
	components: {
		TypeGoodsList
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
		goBack(){
            window.history.go(-1)
		},
		clearHistory(){
			this.historySeachList = []
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
#seach{
	overflow: hidden;
	height: 100%;
}

.main{
	position: absolute;
	top: 180px;
	width: 100%;
	left: 0;
	bottom: 0px;
	overflow: auto;
}

.header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	line-height: 100px;
	height: 100px;
	background-color: #fff;
	text-align: center;
	font-size: 30px;
	padding: 0 2%;
}

.header .goBack{
	float: left;
	width: 10%;	
}

.header .goBack i{
	font-size: 28px;
}

.header .seachBtn{
	float: right;
	width: 10%;	
}

.header .seachIntOut{
	display: flex;
	float: left;
	width: 70%;
	height: 60px;
	line-height: 60px;
	margin: 0 5%;
	border: 1px solid #e5e5e5;
	border-radius: 30px;
	background-color: #efefef;
	overflow: hidden;
}

.header .seachIntOut i{
	flex: 0 0 16%;
	font-size: 34px;
}

.header .seachIntOut input{
	flex: 0 0 84%;
	border: none;
	background-color: transparent;
}

.seachInit,.seachCon{
	position: fixed;
	top: 100px;
	left: 0;
	width: 100%;
}

.seachInit>h1{
	font-size: 26px;
    padding-left: 20px;
    padding-top: 34px;
    background-color: #ffffff;
    color: #999;
}

.seachInit .hot-seach{
	padding-left: 20px;
    padding-bottom: 34px;
    width: 100%;
    padding-right: 6px;
    background-color: #ffffff;
    overflow: hidden;
}

.seachInit .hot-seach>li{
	width: 25%;
    margin-top: 7px;
    color: #666;
    background-color: #efefef;
    float: left;
    border-right: 7px solid white;
    text-align: center;
    padding: 2px 0;
}

.seachInit>h2 {
    margin-bottom: 20px;
    color: #999999;
    font-size: 26px;
    margin-top: 34px;
    margin-left: 40px;
}

.seachInit .history-seach{
	margin: 0 20px;
    background-color: #ffffff;
    padding: 0 20px;
    max-height: 382px;
    overflow-y: auto;
}

.seachInit .history-seach>li{
	font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;
    color: #666666;
    padding: 20px 12px;
    line-height: 40px;
    background-size: 32px auto;
    border-bottom: 1px solid #efefef;
}

.seachInit .history-seach>li>i{
	font-size: 38px;
	float: left;
	margin-right: 15px;
}

.seachInit>div{
	padding: 0 20px;	
}

.seachInit>div>button{
	height: 88px;
    width: 100%;
	box-sizing: content-box;
    font-size: 28px;
    text-align: center;
    color: #666666;
    border: none;
    background-color: #ffffff;
}

.seachCon>ul{
	background: #FFFFFF;
    height: 80px;
    margin-top: 0px;
    margin-bottom: 14px;
    width: 100%;
    border-bottom: 1px solid #EFEFEF;
}

.seachCon>ul>li{
	float: left;
    text-align: center;
    width: 33.33333333%;
    color: #666666;
    padding: 0px;
    font-size: 26px;
	height: 80px;
    line-height: 80px;
    vertical-align: top;
	overflow: hidden;
}

.seachCon>ul>li.active{
	color: #1655bf;
}

.seachCon>ul>li>i{
	font-size: 30px;
}

.car-hot-recommend{
	width: 100%;	
	line-height: 40px;
	height: 40px;
	margin: 20px 10px;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
}
</style>
