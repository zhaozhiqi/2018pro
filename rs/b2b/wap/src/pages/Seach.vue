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
		<main class="main" v-if="!seachInit">
      <mt-navbar v-model="defaultTab">
          <mt-tab-item id="product"><i class="rsiconfont rsicon-shangpin"></i>商品</mt-tab-item>
          <mt-tab-item id="store"><i class="rsiconfont rsicon-dianpu"></i>店铺</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="defaultTab">
        <mt-tab-container-item id="product">
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
              <li :class="{'active':sortObj.sortActive == 'default'}" @click="changeSortActive('default')">最新</li> 
              <li :class="{'active':sortObj.sortActive == 'sales'}" @click="changeSortActive('sales')"><span>销量</span><input type="hidden" value=""></li> 
              <li :class="{'active':sortObj.sortActive == 'price'}" @click="changeSortActive('price')"><span>价格</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></li>
            </ul>
          </div>
          <TypeGoodsList class="goodsList"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="store">
          <StoresList />
        </mt-tab-container-item>
      </mt-tab-container>     
		</main>
			
		
	</div>
</template>

<script>
import TypeGoodsList from '@/components/TypeGoodsList';
import StoresList from '@/components/StoresList';

export default {
	name: 'Seach',
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
      delItem:{},
      defaultTab:"product",
		}
	},
	components: {
    TypeGoodsList,
    StoresList
	},
	mounted(){
		console.log('mounted')
	},
	filters: {
		getNum: function (value) {
			return parseInt(value);
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
		}
	}
};
</script>
