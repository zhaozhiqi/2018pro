<template>
  <mt-swipe :class="mint-swipe" :auto="3000" :speed="300">
    <mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in pages" :key="index"><img :src="slider.style.sliderImg" /></mt-swipe-item>
  </mt-swipe>
</template>
 
<script>
export default {
  name: 'slider',
  data() {
    return {
      message: '',
      mint:null,
      swipe:null,
      mt:null,
      item:null,
      //图片列表[arr]
      pages: [
        // {
        //   title: "slide1",
        //   style: {
        //     sliderImg: "/static/images/ceshi.png"
        //   }
        // },
        {
          title: "slide1",
          style: {
            sliderImg: "/static/images/wap-17.png"
          }
        },
        {
          title: "slide2",
          style: {
            sliderImg: "/static/images/wap-16.png"
          }
        },
        {
          title: "slide3",
          style: {
            sliderImg: "/static/images/wap-12.png"
          }
        }
      ]
    }
  }
};
</script>

<style scoped>
.mint-swipe-indicator{
  width: 40px;
  height: 40px;
  margin:  0 20px; 
}
</style>
