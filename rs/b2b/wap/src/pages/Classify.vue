<template>
  <div id="classify">
    <SeachHeader  :style="bannerStyle" :bannerHeight="0"/>
    <div id="typeI">
      <nav>
        <div class="typeI-item" 
        v-for="(item, index) in typeIList" 
        :key="index" 
        :class="{ active:item.isActive }"
        @click="getProIbnfo(index)">{{item.name}}</div>
      </nav>
    </div>
    <TypeList :proinfo="proinfo" />
    <Footer />
  </div>
</template>

<script>
import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import TypeList from '@/components/TypeList.1';
import Footer from '@/components/Footer';


export default {
  name: 'Classify',
  data(){
    return {
      bannerStyle:{
        backgroundColor: '#1655bf'
      },
      typeIList:[
        { id:1,type:"1",name:"白酒",isActive:true,
          proList:[
            {
              typeII:"1",
              typeIIName:"全部",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
            },
            {
              typeII:"2",
              typeIIName:"分类II-1",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
            },
            {
              typeII:"3",
              typeIIName:"分类II-2",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
            },
          ]
        },
        { id:2,type:"2",name:"葡萄酒",isActive:false,proList:[]},
        { id:3,type:"3",name:"洋酒",isActive:false,proList:[]},
        { id:4,type:"4",name:"啤酒",isActive:false,proList:[]},
        { id:5,type:"5",name:"黄酒",isActive:false,proList:[]},
        { id:6,type:"6",name:"酒具",isActive:false,proList:[]},
        { id:7,type:"7",name:"白酒",isActive:false,proList:[]},
        { id:8,type:"8",name:"葡萄酒",isActive:false,proList:[]},
        { id:9,type:"9",name:"洋酒",isActive:false,proList:[]},
        { id:10,type:"10",name:"啤酒",isActive:false,proList:[]},
        { id:11,type:"11",name:"酒具",isActive:false,proList:[]},
        { id:12,type:"12",name:"其他",isActive:false,proList:[]}
      ],
      proinfo: []
    }
  },
  components: {
    SeachHeader,
    TypeList,
    Footer
  },
  mounted(){
    this.proinfo = this.typeIList[0].proList;
  },
  methods:{
    checkTypeI(index){
      let _index = index;
      for(const item of this.typeIList) {
        item.isActive === true?item.isActive = false:item.isActive = false;
      }
      this.typeIList[_index].isActive = true;
      let id = this.typeIList[_index].id;
      return id;
    },
    getProIbnfo(index){
      let _id = this.checkTypeI(index);
      for (const item of this.typeIList){
        if(item.id === _id){
          this.proinfo = item.proList;    
        }        
      }
      console.log(this.proinfo,'proinfo')
    }

  }
};
</script>

<style>
#classify{
  overflow: hidden;
  background: #fff;
  height: 100%;
}

#typeI {
  /* position: fixed;
  top: 100px; */
  margin-top: 100px;
  width: 100%;
  line-height: 74px;
  height: 80px;
  text-align: center;
  vertical-align: middle;
}
#typeI nav{
  display: flex;  
  overflow-x: auto;
  border-bottom: 1px solid #efefef;
}
#typeI nav .typeI-item{
  flex: 0 0 12.5%;
  border-bottom: 3px solid #fff;
}
#typeI nav .typeI-item.active{
  border-color: #1655bf;
}
</style>
