<template>
	<div id="banner" class="container" flexcontainer> 
		<div w-750-235 aspectratio aspect-ratio="750/235"> 
			<div aspectratio-content>      
				<Slider :pages='banner'></Slider>
			</div> 
		</div> 
	</div>
</template>

<script>
import Slider from '@/components/slider'// 引入slider组件

export default {
  name: 'Banner',
  data () {
    return {}
  },
  props:{
    banner:{
      type: Array
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
    aspect-ratio:'750:420';
  }
</style>
