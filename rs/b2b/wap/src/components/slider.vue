<template>
  <mt-swipe :class="mint-swipe" :auto="3000" :speed="300">
    <mt-swipe-item :class="mt-swipe-item" v-for="(slider, index) in pages" :key="index">
      <a :href='slider.link'>
        <img :src="slider.image" :alt="slider.title" />
      </a>
    </mt-swipe-item>
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
      item:null
    }
  },
  props:{
    pages:{
      type: Array,
      default: () => [{title: "slide1",style: {sliderImg: "static/images/wap-17.png"}}]
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
