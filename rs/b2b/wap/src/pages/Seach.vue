<template>
	<div id="seach">
		<header class="header">
			<span class="goBack" @click="backLastPage"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
			<label class="seachIntOut">
				<i class="rsiconfont rsicon-sousuo"></i>
				<input 	type="text"
						class="seachInt"
						placeholder="搜索" 
            v-model="query.keyWord"/>
			</label>
			<span class="seachBtn" v-show="true" @click="seach()">搜索</span>
		</header>
		<main class="main" v-if="!seachInit">
      <mt-navbar v-model="defaultTab">
          <mt-tab-item id="product"><i class="rsiconfont rsicon-shangpin"></i>商品</mt-tab-item>
          <mt-tab-item id="shop"><i class="rsiconfont rsicon-dianpu"></i>店铺</mt-tab-item>
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
              <li :class="{'active':sortObj.sortActive == 'hot'}" @click="changeSortActive('hot')">销量</li> 
              <li :class="{'active':sortObj.sortActive == 'time'}" @click="changeSortActive('time')"><span>实际</span><input type="hidden" value=""></li> 
              <li :class="{'active':sortObj.sortActive == 'money'}" @click="changeSortActive('money')"><span>金额</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></li>
            </ul>
          </div>
          <TypeGoodsList class="goodsList" :proList="goodsList"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="shop">
          <StoresList  :storesList="storesList"/>
        </mt-tab-container-item>
      </mt-tab-container>     
		</main>
			
		
	</div>
</template>

<script>
import { getGoodsList, getShopList } from '@/api/m_api'
import Cookies from 'js-cookie'

import TypeGoodsList from '@/components/TypeGoodsList';
import StoresList from '@/components/StoresList';

export default {
	name: 'Seach',
	data(){
		return {
      seachInit: false,
      keyWord: null,
      query:{
        keyword: null,
        lng: null,
        lat: null
      },
			sortObj:{
				sortActive: "hot",
				sortPriceIcon:"rsicon-jiangxu",
				sortSequence:"desc"
      },
      goodsList:[],
      storesList:[],
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
      this.query.lng = Cookies.get('AREA_LNG')
      this.query.lat = Cookies.get('AREA_LAT')

		console.log('mounted')
	},
	filters: {
		getNum: function (value) {
			return parseInt(value)
		}
	},
	methods:{
    backLastPage() {
      this.$store.dispatch('backLastPage')
    },
		clearHistory(){
			this.historySeachList = []
		},
		changeSortActive(index){
      if (index === 'money') {
        if (this.sortObj.sortActive !== 'money') {
          this.sortObj.sortActive = 'money';
        } else {
          if (this.sortObj.sortSequence === "desc") {
            this.sortObj.sortSequence = "asc"//升序
            this.sortObj.sortPriceIcon = "rsicon-shengxu"
          } else {
            this.sortObj.sortSequence = "desc"//降序
            this.sortObj.sortPriceIcon = "rsicon-jiangxu"
          }
        }
      } else {
        this.sortObj.sortActive = index;        
        this.sortObj.sortSequence = "desc"//降序
        this.sortObj.sortPriceIcon = "rsicon-jiangxu"
      }
      this.seach()
    },
    seach(){
      console.log(this.defaultTab,'defaultTab')
      if(this.defaultTab === 'product'){
        const parasmGoods = JSON.parse(JSON.stringify(this.query))
        parasmGoods.sortField= this.sortObj.sortActive        
        parasmGoods.sort= this.sortObj.sortSequence

        getGoodsList(parasmGoods).then(result => {
          this.goodsList = result.data.records
          console.log(result, 'result')
        })
        console.log("查询商品", this.keyWord)
      }else if(this.defaultTab === 'shop'){
        const parasmShops = JSON.parse(JSON.stringify(this.query))
        getShopList(parasmShops).then(result => {
          this.storesList = result.data.records
          console.log(result, 'result')
        })
        console.log("查询店铺")
      }
    }
	}
};
</script>
