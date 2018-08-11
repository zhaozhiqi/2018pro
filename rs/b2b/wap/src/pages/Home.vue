<template>
  <div id="index">
    <SeachHeader :bannerHeight="bannerHeight" />
    <!-- <router-view></router-view> -->
    <banner ref="banner" :banner='banner'/>
    <Notice :prizeList='prizeList' />
    <List :proList='proList' :listParent='listParent'/>
    <!-- <Grid /> -->
    <!-- <Recommend /> -->
    <Footer />
    <!-- <navBar /> -->
  </div>
</template>

<script>
import { getHome, getGoodsList } from '@/api/m_api'
import Cookies from 'js-cookie'

import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import Banner from '@/components/Banner'
import Grid from '@/components/Grid'
import Block from '@/components/Block'
import List from '@/components/List'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Notice from '@/components/Notice'
import Recommend from '@/components/Recommend'


export default {
  name: 'Home',
  data(){
    return {
      bannerHeight: 270,
      listParent:'home',
      banner:[],      
      prizeList: [],
      proList:[]
    }
  },
  components: {
    Banner,
    Grid,
    Block,
    List,
    NavBar,
    SeachHeader,
    Footer,
    Notice,
    Recommend
  },
  mounted(){
    this.setheaderheight()
    this.init()
  },
  methods:{
    setheaderheight() {
      this.bannerHeight = this.$refs.banner.$el.offsetHeight
    },
    init(){
      getHome().then(result => {
        this.banner = result.data.banners
        this.prizeList = result.data.headlines        
      })
      this.lng = Cookies.get('AREA_LNG')
      this.lat = Cookies.get('AREA_LAT')
      const paramsGoodsList = {
        lng: this.lng,
        lat: this.lat
      }
      getGoodsList(paramsGoodsList).then(result => {
        this.proList = result.data.records   
      })
    }
  }
};
</script>

