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
			default: ()=>
					[
						{bable:"新品",proImg:"static/images/pro-02.jpg",name:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",price:"58",num:"26",proId:"1"},
						{bable:"新品",proImg:"static/images/pro-17.jpg",name:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"4399",num:"68",proId:"2"},
						{bable:"新品",proImg:"static/images/pro-09.jpg",name:"哈根达斯 81g小纸杯整箱冰淇淋冰激凌 24杯 江浙沪皖包邮",price:"500",num:"12",proId:"3"},
						{bable:"新品",proImg:"static/images/pro-06.jpg",name:"香其酱包邮东北大酱原厂香其酱哈尔滨香其酱农家黄豆酱调味酱",price:"26",num:"5365",proId:"4"},
						{bable:"新品",proImg:"static/images/wap-20.png",name:"52度剑南春（新包装）500ml",price:"888.00",num:"888",proId:"5"},
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
