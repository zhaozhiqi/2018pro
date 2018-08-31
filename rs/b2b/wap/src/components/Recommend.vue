<template>
<div>    
    <div class="container" flexcontainer> 
        <div class="block-item" w-750-250 aspectratio aspect-ratio="750/250" v-for="(item, index) in recommendList" :key="index"> 
            <div aspectratio-content > 
                <a :link="item.reLink">
                    <img :src="item.reImg" alt="" width="100%" height="100%">
                </a>
            </div> 
        </div> 
    </div>    
</div>
</template>

<script>
export default {
  name: 'Recommend',
  data() {
    return {
      recommendList:[
          // {reImg:"//gw.alicdn.com/mt/TB17hvaSXXXXXahXFXXXXXXXXXX-750-250.png",reLink:"http://gw.alicdn.com/mt/TB17hvaSXXXXXahXFXXXXXXXXXX-750-250.png"},
          // {reImg:"static/images/reImg-01.png",reLink:"//gw.alicdn.com/mt/TB17hvaSXXXXXahXFXXXXXXXXXX-750-250.png"}
      ]
    };
  }
};
</script>

<style scoped>
.container{
    flex-direction: column;
}
[w-750-250]{
    width: 750px;
    flex: 0 0 100%;
    margin-top: 10px;
}
[w-750-250]{
  aspect-ratio:'750:250';
}
</style>
