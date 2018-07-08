<template>
  <div id="group">
    <SeachHeader :bannerHeight="bannerHeight" />
    <nav>
      <div class="navItem" :class="{'active':item.active}" @click="changeType(item.id)" v-for="(item, index) in navList" :key="index">{{item.val}}</div>
    </nav>
    <GroupList :proList='proList' :listParent='listParent'/>
    <Recommend />
    <Footer />
  </div>
</template>

<script>
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
          val:'全部',
          id:'1',
          active:true
        },
        {
          val:'最热',
          id:'2',
          active:false
        },
        {
          val:'最新',
          id:'3',
          active:false
        },
      ],
      proList:[
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"../../static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"},
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/2567690040/TB2GHhSaFqZBuNjt_jqXXamzpXa_!!2567690040.jpg",name:"裙子夏女2018新款韩版露背小心机显瘦小个子ins超火的吊带连衣裙",price:"2222",num:"888",proId:"1"},
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/101126324/TB2WhPbvgmTBuNjy1XbXXaMrVXa_!!101126324.jpg",name:"小番茄定制 连衣裙女夏2018新款假两件拼接收腰裙小心机开叉裙子",price:"21",num:"888",proId:"2"},
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/87731160/TB2bqZjreuSBuNjy1XcXXcYjFXa_!!87731160.jpg",name:"连衣裙夏季2018新款女装韩版显瘦印花雪纺收腰超仙温柔风中长裙子",price:"21",num:"888",proId:"5"},
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"},
				{bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/757632702/TB2jiRCrf5TBuNjSspmXXaDRVXa_!!757632702.jpg",name:"雪纺连衣裙女夏季显瘦高腰韩国V领女装夏装气质拼接超仙imiss裙子",price:"21",num:"888",proId:"6"}
      ]
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
    this.setheaderheight();
  },
  methods:{
    setheaderheight() {
      this.bannerHeight = this.$refs.banner.$el.offsetHeight
    },
    changeType(id) {
      this.navList.forEach((item)=>{
        if(item.id === id){
          item.active = true
        }else{
          item.active = false
        }
      })
      if(id === '1'){
        this.proList=[
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"../../static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"},
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/2567690040/TB2GHhSaFqZBuNjt_jqXXamzpXa_!!2567690040.jpg",name:"裙子夏女2018新款韩版露背小心机显瘦小个子ins超火的吊带连衣裙",price:"2222",num:"888",proId:"1"},
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/101126324/TB2WhPbvgmTBuNjy1XbXXaMrVXa_!!101126324.jpg",name:"小番茄定制 连衣裙女夏2018新款假两件拼接收腰裙小心机开叉裙子",price:"21",num:"888",proId:"2"},
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/87731160/TB2bqZjreuSBuNjy1XcXXcYjFXa_!!87731160.jpg",name:"连衣裙夏季2018新款女装韩版显瘦印花雪纺收腰超仙温柔风中长裙子",price:"21",num:"888",proId:"5"},
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"},
          {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/757632702/TB2jiRCrf5TBuNjSspmXXaDRVXa_!!757632702.jpg",name:"雪纺连衣裙女夏季显瘦高腰韩国V领女装夏装气质拼接超仙imiss裙子",price:"21",num:"888",proId:"6"}
        ]
      }else if(id === '2'){
        this.proList=[
          {bable:"最热",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"../../static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"},
          {bable:"最热",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/101126324/TB2WhPbvgmTBuNjy1XbXXaMrVXa_!!101126324.jpg",name:"小番茄定制 连衣裙女夏2018新款假两件拼接收腰裙小心机开叉裙子",price:"21",num:"888",proId:"2"},
          {bable:"最热",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"}
        ]
      }else if(id === '3'){
        this.proList=[
          {bable:"最新",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"},
          {bable:"最新",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/757632702/TB2jiRCrf5TBuNjSspmXXaDRVXa_!!757632702.jpg",name:"雪纺连衣裙女夏季显瘦高腰韩国V领女装夏装气质拼接超仙imiss裙子",price:"21",num:"888",proId:"6"},
          {bable:"最新",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"../../static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"}
        ]
      }
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

</style>
