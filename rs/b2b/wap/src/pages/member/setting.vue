<template>
    <div id="setting">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <Nodata :nodata="nodataObj" v-if="setList.length <= 0"></Nodata>
            <div v-else>            
                <router-link class="setItem" v-if="item.setRouter" v-for="(item, index) in setList" :key="index" :to="item.setLink">
                    <span class="setTitle">{{item.setTitle}}</span>
                    <span class="setIcon" v-show="item.setIconShow"><i class="rsiconfont rsicon-qiehuanqiyou"></i></span>
                    <span class="setCon">{{item.setCon}}</span>
                </router-link>
                <div class="setItem" v-else>
                    <span class="setTitle">{{item.setTitle}}</span>
                    <span class="setIcon" v-if="item.setIconShow"><i class="rsiconfont rsicon-qiehuanqiyou"></i></span>
                    <span class="setCon">{{item.setCon}}</span>
                </div>
            </div>
            <button class="logout" @click="logout">退出登录</button>
        </main>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
export default {
    name:"NoticeList",
    data(){
        return {
            nodataObj:{
                iconName:"rsicon-31daipingjia",
                nodataMsg:"暂无消息"
            },
            setList:[
                {
                    setTitle:"版本号",
                    setCon:"V1.0",
                    setIconShow:false,
                    setRouter:false,
                    setLink:""                    
                },
                {
                    setTitle:"收货地址",
                    setCon:"",
                    setIconShow: true,
                    setRouter: true,
                    setLink:"/Address"                    
                },
                {
                    setTitle:"关于我们",
                    setCon:"",
                    setIconShow: true,
                    setRouter: true,
                    setLink:"/AboutUs"                    
                }
            ],
            commonHeaderObj: {
                bgStyle: {
                    color:"#fff",
                    backgroundColor:"#1655bf"
                },
                title: "设置",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            }
        }
    },
    components: {
        Nodata,
        CommonHeader
    },
    methods:{
        logout(){
          this.$store.dispatch('LogOut').then(()=>{
              this.$toast({
                message: '已退出登录',
                type: 'warning',
                duration: 1000
              })
              Cookies.remove('WPH_USER_LOGIN')
              this.$router.push({path:'/'})
          })
        }
    }
}
</script>
