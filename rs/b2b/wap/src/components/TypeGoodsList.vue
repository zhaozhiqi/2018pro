<template>
  <Nodata :nodata="nodataObj" v-if="proList.length <= 0"></Nodata>
  <div v-else id="typeGoodsList">
		<ul class="">
			<li class="con-item" 
			v-for="(item, index) in proList"
			:key="index" >
				<router-link :to="{path:routerPath, query: { id: item.identifier }}">
					<figure>
							<img class="con-item-img" :src="item.product.displayDiagram"/>
					</figure>
					<figcaption> 
						<div class="con-item-info">
							<p class="con-item-info-title">{{item.title}}</p>
							<p class="con-item-info-price">
								<strong><b>¥</b>{{item.retailPrice | priceFormat}}</strong>
								<s>¥{{item.retailPrice | priceFormat}}</s>
							</p>
						</div>
						<!-- <div class="con-item-btn"><i class="ico-cart"></i></div> -->
					</figcaption>
				</router-link>	
			</li>
		</ul>
  </div>
</template>

<script>
import Nodata from '@/components/nodata';

export default {
  name: 'TypeGoodsList',
  data() {
		return {
      nodataObj:{
					iconName:"rsicon-jingshi",
					nodataMsg:"暂无数据"
			},
			routerPath:'/GroupProduct'
		}
  },
  components:{
		Nodata
	},
	created(){
		//console.log(this.proList,'proList')
	},
	mounted(){
		// this.proList = this.proinfo;
	},
	props:{
		proList:{
			type: Array,
			default: () =>	[]		
		}
	}
};
</script>

<style scoped>	
#typeGoodsList .ico-cart{
	background-image: url("../../static/images/public/nav-cart.png") no-repeat;
}
</style>
