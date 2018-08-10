<template>
  <div id="groupList"> 
			<div class="groupProItem" v-for="(item, index) in proList" :key="index">
					<div class="imgOut">
							<img :src="item.goodsDetail.product.displayDiagram" alt="">
					</div>
					<div class="groupProInfo">
							<div class="groupProName"><span v-show="item.bable">{{item.bable}}</span>{{item.goodsDetail.title}}</div>
							<div class="groupProSpec">规格：{{item.goodsDetail.specifications}} 单位：{{item.goodsDetail.unit}}</div>
							<div class="groupProJobPrice">批发价：<i>¥</i>{{item.goodsDetail.money}}</div>
							<div class="groupProGroupPrice">拼团价：<i>¥</i>{{item.money}}</div>
							<div class="groupProGroupMustNum">拼团规模：{{item.count}}</div>
							<router-link class="groupProLink"
							:to="{path:routerPath, query: { id: item.goodsDetail.identifier }}">立即拼团</router-link>
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
  name: 'GroupList',
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

