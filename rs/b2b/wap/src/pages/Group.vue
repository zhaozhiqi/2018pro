<template>
  <div id="group">
    <SeachHeader :bannerHeight="bannerHeight" />
    <nav>
      <div class="navItem" :class="{'active':sortObj.sortActive == 'hot'}" @click="changeSortActive('hot')">最新</div> 
      <div class="navItem" :class="{'active':sortObj.sortActive == 'time'}" @click="changeSortActive('time')"><span>实际</span><input type="hidden" value=""></div> 
      <div class="navItem" :class="{'active':sortObj.sortActive == 'money'}" @click="changeSortActive('money')"><span>价格</span> <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i></div>
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
          val:'实际',
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
				sortPriceIcon:"rsicon-shengxu",
				sortSequence:"asc",//"as-order"
      },
      query:{
        sortField: 'hot'
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
      }
      this.query.sortField = index
      this.getGoodsList()
      // this.proList=[
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"},
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/2567690040/TB2GHhSaFqZBuNjt_jqXXamzpXa_!!2567690040.jpg",name:"裙子夏女2018新款韩版露背小心机显瘦小个子ins超火的吊带连衣裙",price:"2222",num:"888",proId:"1"},
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/101126324/TB2WhPbvgmTBuNjy1XbXXaMrVXa_!!101126324.jpg",name:"小番茄定制 连衣裙女夏2018新款假两件拼接收腰裙小心机开叉裙子",price:"21",num:"888",proId:"2"},
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/87731160/TB2bqZjreuSBuNjy1XcXXcYjFXa_!!87731160.jpg",name:"连衣裙夏季2018新款女装韩版显瘦印花雪纺收腰超仙温柔风中长裙子",price:"21",num:"888",proId:"5"},
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"},
      //   {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/757632702/TB2jiRCrf5TBuNjSspmXXaDRVXa_!!757632702.jpg",name:"雪纺连衣裙女夏季显瘦高腰韩国V领女装夏装气质拼接超仙imiss裙子",price:"21",num:"888",proId:"6"}
      // ]

 
    },
    getGroupsList(){      
      const parasmGetGroups = JSON.parse(JSON.stringify(this.query))
      getGroupsList(parasmGetGroups).then(result => {
        const data = result.data.records
        this.proList = data
        console.log(data, 'result')
      })
    }
  } 
};
</script>

