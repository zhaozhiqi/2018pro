<template>
    <header id="header" ref="header" :class="{fixedHeader:fixed}">
        <div class="nav">
            <router-link to="/SeachSite" id="pos_address" v-show="rank === 'CUSTOMER'">{{areaName}}</router-link>
            <router-link to="/seach" id="search_shop">
                <span class="ico-search"></span>            
            </router-link>
        </div>
        <p class="msgage">
            <router-link to="/NoticeList" class="ico-msg"></router-link>
        </p>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

import Cookies from 'js-cookie'
export default {
    name:"seachHeader",
    data () {
        return {
          fixed:false,
          areaName: '正在定位',
          timer: null
        }
    },
    computed: {
      ...mapGetters([
        'rank'
      ])
    },
    created() {
    },
    mounted() {
        const key = 'AREA_NAME'
        const areaName = Cookies.get(key)
        if(areaName !== undefined) {
          this.areaName = areaName
        }else{
          this.timer = setInterval(this.init, 2000)
        }
        window.addEventListener('scroll',this.handleScroll)
    },
    methods:{
        handleScroll(e){
            //let headerHeight = this.$refs.header.offsetHeight;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop>=this.bannerHeight?this.fixed = true:this.fixed = false;
        },
        init() {
          const key = 'AREA_NAME'
          const areaName = Cookies.get(key)
          if(areaName !== undefined) {
            this.areaName = areaName
            if(this.timer !== null) {
              clearInterval(this.timer)
              console.log('清除获取地址')
            }
          }
        }
    },
    props:{
        bannerHeight:{
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped>
#header {
    width: 100%;    
    position: fixed;
    top: 0;
    display: flex;
    padding: 20px 3%;
    overflow: hidden;
    font-size: 24px;
    z-index: 11;
    align-items: center;
    background: #1655bf;
}

#header.fixedHeader{
    background: #1655bf;
}

#header .nav {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: inherit;
    background-color: #f4f3f1;
    flex: 1;
    display: flex;
    border-radius: 30px;
    overflow: hidden;
}

#header .nav #pos_address {
    max-width: 35%;
    color: #333;
    background-color: #efefef;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;            
}
#header .nav #search_shop {
  display: block;
  flex: 1;
}
#header .nav .ico-search {
    color: #666;
    display: inline-block;
    height: 100%;
    background: url('../../static/images/public/search_icon.png') 2px center no-repeat;
    background-size: 30px auto;
    padding-left: 44px;
}

#header .msgage {
    height: auto;
    line-height: 1;
    margin-left: 16px;
    color: #fff;
    text-align: right;
}

#header .msgage a {
    width: 50px;
    height: 40px;
    background-size: auto 40px; 
    position: relative;
    display: inline-flex;
    text-align: center;
    background-image: url('../../static/images/public/ico-msg.png');
    background-repeat: no-repeat;
}
</style>
