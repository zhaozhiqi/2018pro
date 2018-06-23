<template>
  <div id="index">
    <SeachHeader :bannerHeight="bannerHeight" />
    <!-- <router-view></router-view> -->
    <banner ref="banner"/>
    <Notice />
    <List />
    <!-- <Grid /> -->
    <Recommend />
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
      bannerHeight: 270
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
#index{
  padding-bottom: 100px;
}  
</style>
