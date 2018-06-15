<template>
    <div class="container" flexcontainer> 
        <div class="navBar" w-750-500 aspectratio aspect-ratio="750/500"> 
            <div aspectratio-content>
                <mt-navbar v-model="selected" >
                    <mt-tab-item id="1">选项一</mt-tab-item>
                    <mt-tab-item id="2">选项二</mt-tab-item>
                    <mt-tab-item id="3">选项三</mt-tab-item>
                    <mt-tab-item id="4">选项四</mt-tab-item>
                    <mt-tab-item id="5">选项五</mt-tab-item>
                    <mt-tab-item id="6">选项六</mt-tab-item>
                    <mt-tab-item id="7">选项七</mt-tab-item>
                    <mt-tab-item id="8">选项八</mt-tab-item>
                </mt-navbar>

                <!-- tab-container -->
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <mt-cell v-for="(n, index) in 10" :title="'content ' + n" :key="index"/>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <mt-cell v-for="(n, index) in 10" :title="'content ' + n" :key="index"/>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <mt-cell v-for="(n, index) in 10" :title="'content ' + n" :key="index"/>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <mt-cell v-for="(n, index) in 10" :title="'content ' + n" :key="index"/>
                    </mt-tab-container-item>
                </mt-tab-container> 
            </div>
        </div>
    </div>
</template>

<script>
    import { Navbar, TabItem } from 'mint-ui';
    export default {
        name: 'NavBar',
        data () {
            return {
                selected:'1'
            }
        }
    };
</script>

<style scoped>
  [w-750-500] {
    width: 750px;
    z-index: 5000;
  }
  [w-750-500]{
    aspect-ratio:'750:500';
  }
</style>
