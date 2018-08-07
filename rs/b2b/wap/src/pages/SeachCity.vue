<template>
	<div id="seach-city">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
		<main class="main">
      <div class="seachCon" v-show="false">
        <label class="seachIntOut">
          <i class="rsiconfont rsicon-sousuo"></i>
          <input 	type="text"
              class="seachInt"
              placeholder="搜索"/>
        </label>
      </div>
      <div class="siteCon">
        <mt-index-list>
          <mt-index-section v-for="(item,index) in cityData" :index="item.name" :key="index">
            <div v-for="(itemI,indexI) in item.cities" :key="indexI"  @click="changeCity(itemI)">
            <mt-cell       
            :title="itemI.name" 
            :tags="itemI.tags" 
            :cityId="itemI.cityid" 
            ></mt-cell></div>
          </mt-index-section>
        </mt-index-list>
      </div>
		</main>
			
		
	</div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import Cookies from 'js-cookie'
import { cityData } from '@/utils'
export default {
	name: 'SeachCity',
	data(){
		return {
      commonHeaderObj: {
          bgStyle: {
              color:"#fff",
              backgroundColor:"#1655bf"
          },
          title: "城市选择",
          isOtherShow: false,
          otherIconClass: "rsicon-gengduo"
      },
      cityDataAction:null
		}
	},
	components: {
    CommonHeader
  },
  created(){
    this.cityData = cityData
  },
	mounted(){
		console.log('mounted')
	},
	methods:{
		goBack(){
      window.history.go(-1)
    },
    changeCity(obj){
      const key = 'DEFAULT_CITY'
      console.log(obj, 'obj')
      Cookies.set(key, obj.name)
      this.$router.push({ path: '/SeachSite' })
    }
	}
}
</script>
