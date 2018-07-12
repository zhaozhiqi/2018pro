<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/pages/home';

export default {
  name: 'App',
  data: function(){
    return {
      
    }
  },
  components: {
    Home
  }
};
</script>

