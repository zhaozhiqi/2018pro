<template>
  <div id="groupList"> 
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
							<div class="groupProGroupPercent" v-show="false">
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
