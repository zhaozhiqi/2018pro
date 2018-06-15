<template>
  <div id="app">
    <!-- <index></index> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Index from '@/pages/Index';


import Banner from '@/components/Banner';
import Grid from '@/components/Grid';
import Block from '@/components/Block';
import List from '@/components/List';
import NavBar from '@/components/NavBar';

export default {
  name: 'App',
  data: function(){
    return {
      
    }
  },
  components: {
    Index,



    Banner,
    Grid,
    Block,
    List,
    NavBar
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
#app{
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}
* {
  box-sizing: inherit;

  /* &:before,
  &:after {
    box-sizing: inherit;
  } */
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
</style>
