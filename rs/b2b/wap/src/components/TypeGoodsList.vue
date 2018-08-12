<template>
  <div id="typeGoodsList"> 
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
								<strong><b>¥</b>{{item.retailPrice}}</strong>
								<s>¥{{item.retailPrice}}</s>
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
export default {
  name: 'TypeGoodsList',
  data() {
		return {
			routerPath:'/Product'
		}
	},
	created(){
		console.log(this.proList,'proList')
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
