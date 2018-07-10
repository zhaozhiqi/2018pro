<template>
    <div id="noticeList">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <Nodata :nodata="nodataObj" v-if="noticeList.length <= 0"></Nodata>
            <div v-else class="noticeItem" v-for="(item, index) in noticeList" :key="index" >
                <a :href="item.noticeLink" class="noticeLick">
                    <div class="msg-01"><i class="rsiconfont rsicon-31daipingjia"></i> <span>{{item.noticeName}}</span></div> 
                    <div class="msg-02"><p>{{item.noticeCon}}</p></div> 
                    <div class="msg-03"><a class="notice-btn">查看详情</a> <span class="notice-time">{{item.noticeTime}}</span></div>
                </a>
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
            noticeList:[
                {
                    noticeTitle:"618年中狂欢大促，0.1元起嗨翻全场",
                    noticeCon:"618年中大促，端午好酒相伴，巅峰秒杀低至0.1元。618万狂欢券现在开抢，6.16-6.19日满618减68神券每天12点限量抢。超值秒杀不停换新，白酒、红酒低至1元。8大会场实力助阵。点击直达618活动专场。",
                    noticeTime:"2018-06-16 11:11:33",
                    noticeLink:"http://www.baidu.com"                    
                },
                {
                    noticeTitle:"618年中狂欢大促，0.1元起嗨翻全场",
                    noticeCon:"618年中大促，端午好酒相伴，巅峰秒杀低至0.1元。618万狂欢券现在开抢，6.16-6.19日满618减68神券每天12点限量抢。超值秒杀不停换新，白酒、红酒低至1元。8大会场实力助阵。点击直达618活动专场。",
                    noticeTime:"2018-06-16 11:11:33",
                    noticeLink:"http://www.baidu.com"                    
                }
            ],
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "消息",
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
        back(){
            window.history.go(-1)
        }
    }
}
</script>
