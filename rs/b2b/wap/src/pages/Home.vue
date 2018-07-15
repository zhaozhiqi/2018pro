<template>
  <div id="index">
    <SeachHeader :bannerHeight="bannerHeight" />
    <!-- <router-view></router-view> -->
    <banner ref="banner"/>
    <Notice />
    <List :proList='proList' :listParent='listParent'/>
    <!-- <Grid /> -->
    <!-- <Recommend /> -->
    <Footer />
    <!-- <navBar /> -->
  </div>
</template>

<script>
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import Banner from '@/components/Banner';
import Grid from '@/components/Grid';
import Block from '@/components/Block';
import List from '@/components/List';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Notice from '@/components/Notice';
import Recommend from '@/components/Recommend';


export default {
  name: 'Home',
  data(){
    return {
      bannerHeight: 270,
      listParent:'home',
      proList:[
				{bable:"新品",proImg:"static/images/pro-02.jpg",title:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",price:"58",num:"26",proId:"1"},
				{bable:"新品",proImg:"static/images/pro-17.jpg",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"4399",num:"68",proId:"2"},
				{bable:"新品",proImg:"static/images/pro-09.jpg",title:"哈根达斯 81g小纸杯整箱冰淇淋冰激凌 24杯 江浙沪皖包邮",price:"500",num:"12",proId:"3"},
				{bable:"新品",proImg:"static/images/pro-06.jpg",title:"香其酱包邮东北大酱原厂香其酱哈尔滨香其酱农家黄豆酱调味酱",price:"26",num:"5365",proId:"4"},
      ]

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
    this.setheaderheight();
  },
  methods:{
    setheaderheight() {
      this.bannerHeight = this.$refs.banner.$el.offsetHeight
    }
  }
};
</script>

