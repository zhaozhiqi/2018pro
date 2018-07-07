<template>
  <div id="groupList"> 
			<!-- <Nodata :nodata="nodataObj" v-if="proList.length <= 0"></Nodata>
			<div v-else class="container" flexcontainer>  -->
			<!-- <div class="container" flexcontainer> 
			<ul class="block-item" w-369 v-for="(item, index) in proList" :key="index"> 
				<li> 
					<router-link  :to="{path:routerPath, query: { id: item.proId }}"> 
						<figure> 
							<img :src="item.proImg" alt="" class="proImg"> 
						</figure> 
						<figcaption> 
							<h2>
								<span class="bable" v-show="false">{{item.bable}}</span>
								{{item.title}}</h2> 
							<div>
							
							<span><i>¥</i>{{item.price}}</span>
							<span v-if="listParent === 'group'">已拼{{item.num}}件</span>
							<span v-else>已有{{item.num}}人付款</span>
							</div> 
						</figcaption>
					</router-link>
				</li> 
			</ul> 		
			</div> -->
			<div class="groupProItem" v-for="(item, index) in proList" :key="index">
					<div class="imgOut">
							<img :src="item.proImg" alt="">
					</div>
					<div class="groupProInfo">
							<div class="groupProName"><span>{{item.bable}}</span>{{item.name}}</div>
							<div class="groupProSpec">{{item.spec}}</div>
							<div class="groupProJobPrice">批发价：<i>¥</i>{{item.jobPrice}}</div>
							<div class="groupProGroupPrice">拼团价：<i>¥</i>{{item.groupPrice}}</div>
							<div class="groupProGroupMustNum">拼团规模：{{item.mustNum}}件</div>
							<router-link class="groupProLink"  
							:to="{path:routerPath, query: { id: item.proId }}">立即拼团</router-link>
							<div class="groupProGroupPercent">
								<div class="conColor" :style="{width: item.percent + 'px'}"></div>
							</div>
					</div>
				
			</div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata';
export default {
  name: 'List',
  data() {
    return {
      nodataObj:{
					iconName:"rsicon-jingshi",
					nodataMsg:"暂无信息"
			},
			routerPath:'/Product',
		}
	},
	components:{
		Nodata
	},
	mounted(){
		if(this.listParent === 'group'){
			this.routerPath = '/GroupProduct'
			console.log(this.routerPath)
		}
	},
	props: {
		proList: {
			type: Array,
			required: true
		},
		listParent: {
			type: String
		}
	}
};
</script>

<style scoped>	

</style>
