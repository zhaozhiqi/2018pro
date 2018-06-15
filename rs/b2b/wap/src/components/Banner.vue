<template>
  <div id="banner" class="container" flexcontainer> 
    <div w-750-235 aspectratio aspect-ratio="750/235"> 
     <div aspectratio-content>      
      <Slider></Slider>
      <!-- <img :src="imgList1" alt="" width="100%" height="100%"> 
      <img :src="imgList2" alt="" width="100%" height="100%"> 
      <img :src="imgList3" alt="" width="100%" height="100%"> 
      <img :src="imgList4" alt="" width="100%" height="100%"> 
      <img :src="imgList5" alt="" width="100%" height="100%">  -->
     </div> 
    </div> 
   </div>
</template>

<script>
import Slider from '@/components/slider'// 引入slider组件

import imgList1 from "@/assets/images/wap-10.png"
import imgList2 from "@/assets/images/wap-01.png"
import imgList3 from "@/assets/images/wap-02.png"
import imgList4 from "@/assets/images/wap-03.png"
import imgList5 from "@/assets/images/wap-04.png"
export default {
  name: 'Banner',
  data () {
    return {
      imgList1,imgList2,imgList3,imgList4,imgList5
    }
  },
  components: {
    Slider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  [w-750-235] {
    width: 750px;
    z-index: 10;
  }
  [w-750-235]{
    aspect-ratio:'750:540';
  }
</style>
