<template>
  <div id="group">
    <SeachHeader :bannerHeight="bannerHeight" />
    <banner ref="banner"/>
    <Notice />
    <List :proList='proList' :listParent='listParent'/>
    <Recommend />
    <Footer />
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
  name: 'Group',
  data(){
    return {
      bannerHeight: 270,
      listParent:'group',
      proList:[
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"2222",num:"888",proId:"1"},
				{bable:"新品",proImg:"https://img.alicdn.com/imgextra/i4/2578685019/TB2hrY7c2NNTKJjSspeXXaSwpXa_!!2578685019.jpg_760x760Q50s50.jpg",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"21",num:"888",proId:"4"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"21",num:"888",proId:"2"},
				{bable:"新品",proImg:"https://img.alicdn.com/imgextra/i4/2578685019/TB2hrY7c2NNTKJjSspeXXaSwpXa_!!2578685019.jpg_760x760Q50s50.jpg",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"21",num:"888",proId:"5"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"21",num:"888",proId:"3"},
				{bable:"新品",proImg:"https://img.alicdn.com/imgextra/i4/2578685019/TB2hrY7c2NNTKJjSspeXXaSwpXa_!!2578685019.jpg_760x760Q50s50.jpg",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"21",num:"888",proId:"6"},
				// {bable:"新品",proImg:"//gw.alicdn.com/mt/TB1cuCrSpXXXXafaXXXXXXXXXXX-369-560.png",title:"Asus/华硕 ROG STRIX Z270H GAMING 猛禽系列 Z270超频游戏主板",price:"21",num:"888",proId:"9"},
				// {bable:"新品",proImg:"//gw.alicdn.com/mt/TB1cuCrSpXXXXafaXXXXXXXXXXX-369-560.png",title:"Asus/华硕 ROG STRIX Z270H GAMING 猛禽系列 Z270超频游戏主板",price:"21",num:"888",proId:"10"},
				{bable:"新品",proImg:"https://img.alicdn.com/imgextra/i3/654519625/TB1Dp.Fh4rI8KJjy0FpXXb5hVXa_!!0-item_pic.jpg_760x760Q50s50.jpg_.webp",title:"Asus/华硕 ROG STRIX Z270H GAMING 猛禽系列 Z270超频游戏主板",price:"21",num:"888",proId:"7"},
				{bable:"新品",proImg:"https://img.alicdn.com/imgextra/i3/654519625/TB1Dp.Fh4rI8KJjy0FpXXb5hVXa_!!0-item_pic.jpg_760x760Q50s50.jpg_.webp",title:"Asus/华硕 ROG STRIX Z270H GAMING 猛禽系列 Z270超频游戏主板",price:"21",num:"888",proId:"8"}
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

<style>
html {
  margin: 0;
  padding: 0;
  height: 100vh;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f4f4f4;
}

img {
  width: 100%;
  height: auto;
  vertical-align: top;
  content: normal !important;
}
  [aspectratio] {
	  position: relative;
  }
  [aspectratio]::before {
	  content: '';
	  display: block;
	  width: 1px;
	  margin-left: -1px;
	  height: 0;
  }

  [aspectratio-content] {
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  width: 100%;
	  height: 100%;
  }
  [flexContainer] {
    display: flex;
    width: 750px;
  }
  .block {
    margin-top: 15px;
  }
  ul,li {
    list-style: none outside none;
    margin: 0;
    padding: 0;
  }
  figure {
    display: block;
    margin: 0;
  }
#group{
  padding: 100px 0;
}  
</style>
