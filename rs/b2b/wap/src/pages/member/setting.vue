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
        </main>
    </div>
</template>

<script>
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
                    setCon:"V5.0",
                    setIconShow:false,
                    setRouter:false,
                    setLink:""                    
                },
                {
                    setTitle:"关于我们",
                    setCon:"",
                    setIconShow: true,
                    setRouter: true,
                    setLink:"/Cart"                    
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
        
    }
}
</script>

<style scopde>
#setting{
	overflow: hidden;
	height: 100%;
}

.main{
	position: absolute;
	top: 100px;
	left: 0;
    right: 0;
	width: 100%;
	overflow: auto;    
    font-size: 26px;
}

.setItem{
    display: block;
    width: 100%;
    background-color: #fff;
    line-height: 80px;
    height: 80px;
    padding: 0 20px;
    color: #212121;
    margin-top: 20px;
}

.setTitle,setItem,.setIcon{
    display: block;
    height: 100%;
}

.setItem .setTitle{
    float: left;
}

.setItem .setCon,.setItem .setIcon{
    float: right;
}

.setIcon .rsiconfont{
    display: block;
    width: 100%;
    height: 100%;
    font-size: 28px;
    margin-left: 20px;
}
</style>
