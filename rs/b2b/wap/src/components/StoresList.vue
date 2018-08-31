<template>
  <div id="storesList"> 
		<ul class="">
			<li class="con-item" 
			v-for="(item, index) in storesList"
			:key="index" >
				<router-link :to="{path:routerStorePath, query: { id: item.id }}">
					<figure>
							<img class="con-item-img" :src="item.logo"/>
					</figure>
					<figcaption> 
						<div class="con-item-info">
							<p class="con-item-info-title">{{item.name}}</p>
							<!-- <p class="con-item-info-price">
								<strong><b>¥</b>{{item.price}}</strong>
								<s>¥{{item.price}}</s>
							</p> -->
						</div>
					</figcaption>
          <div class="goStore"><span>进店</span></div>
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
      routerStorePath:'/Store',
		}
	},
	created(){
		// console.log(this.storesList,'storesList')
	},
	mounted(){
		// this.storesList = this.proinfo;
	},
	props:{
		storesList:{
			type: Array,
			default: ()=>
					[
						// {bable:"新品",proImg:"static/images/storeLogo.png",name:"【可口可乐】旗舰店",price:"58",num:"26",proId:"1"},
						// {bable:"新品",proImg:"static/images/storeLogo.png",name:"Intel/英特尔 酷睿 旗舰店",price:"4399",num:"68",proId:"2"},
						// {bable:"新品",proImg:"static/images/storeLogo.png",name:"哈根达斯 旗舰店",price:"500",num:"12",proId:"3"},
            // {bable:"新品",proImg:"static/images/storeLogo.png",name:"香其酱包邮东北大酱原厂香其酱哈尔滨店",price:"26",num:"5365",proId:"4"}
					]	
			
		}
	}
};
</script>

<style scoped>	
#typeGoodsList .ico-cart{
	background-image: url("../../static/images/public/nav-cart.png") no-repeat;
}
</style>
