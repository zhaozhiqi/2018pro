<template>
  <div id="group">
    <SeachHeader :bannerHeight="bannerHeight" />
    <nav>
      <div class="navItem" :class="{'active':sortObj.sortActive == 'hot'}" @click="changeSortActive('hot')">销量</div> 
      <div class="navItem" :class="{'active':sortObj.sortActive == 'time'}" @click="changeSortActive('time')"><span>最新</span><input type="hidden" value=""></div> 
      <div class="navItem" :class="{'active':sortObj.sortActive == 'money'}" @click="changeSortActive('money')"><span>金额</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></div>
    </nav>
    <GroupList :proList='proList' :listParent='listParent'/>
    <!-- <Recommend /> -->
    <Footer />
  </div>
</template>

<script>
import { getGroupsList } from '@/api/m_api'
import Cookies from 'js-cookie'

import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import Banner from '@/components/Banner';
import Grid from '@/components/Grid';
import Block from '@/components/Block';
import GroupList from '@/components/GroupList';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Notice from '@/components/Notice';
import Recommend from '@/components/Recommend';


export default {
  name: 'Group',
  data(){
    return {
      bannerHeight: 270,
      listParent:'group',
      navList:[
        {
          val:'销量',
          id:'hot',
          active:true
        },
        {
          val:'',
          id:'time',
          active:false
        },
        {
          val:'金额',
          id:'money',
          active:false
        },
      ],
      sortObj:{
				sortActive: "hot",
				sortPriceIcon:"rsicon-jiangxu",
				sortSequence:"desc"
      },
      query:{
        lng: null,
        lat: null
      },
      proList:[]
    }
  },
  components: {
    Banner,
    Grid,
    Block,
    GroupList,
    NavBar,
    SeachHeader,
    Footer,
    Notice,
    Recommend
  },
  mounted(){
    // this.setheaderheight();
    this.init()
  },
  methods:{
    // setheaderheight() {
    //   this.bannerHeight = this.$refs.banner.$el.offsetHeight
    // },
    init(){
      this.query.lng = Cookies.get('AREA_LNG')
      this.query.lat = Cookies.get('AREA_LAT')
      this.getGroupsList()
    },
		changeSortActive(index){
			if(index === 'money'){
				if(this.sortObj.sortActive !== 'money'){
					this.sortObj.sortActive = 'money';
				}else{
					if(this.sortObj.sortSequence === "desc"){
						this.sortObj.sortSequence = "asc"//升序
						this.sortObj.sortPriceIcon = "rsicon-shengxu"
					}else{
						this.sortObj.sortSequence = "desc"//降序
						this.sortObj.sortPriceIcon = "rsicon-jiangxu"
					}
				}
			}else{
        this.sortObj.sortActive = index;        
        this.sortObj.sortSequence = "desc"//降序
        this.sortObj.sortPriceIcon = "rsicon-jiangxu"
      }
      this.getGroupsList() 
    },
    getGroupsList(){      
      const parasmGetGroups = JSON.parse(JSON.stringify(this.query))
      parasmGetGroups.sortField = this.sortObj.sortActive
      parasmGetGroups.sort = this.sortObj.sortSequence
      getGroupsList(parasmGetGroups).then(result => {
        if(result.code === 200 && result.data.records){          
          const data = result.data.records
          this.proList = data
          console.log(data, 'result')
        }
      })
    }
  } 
};
</script>

