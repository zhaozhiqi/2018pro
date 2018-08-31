<template>
    <div id="aboutUs">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <img class="usEwmLogo" :src="usInfo.usEwmLogo" />
            <div class="usDec">{{usInfo.usDec}}</div>
            <div class="usContact">{{usInfo.usContact}}</div>
        </main>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
export default {
    name:"NoticeList",
    data(){
        return {
            usInfo:{
                usEwmLogo:"static/images/usLogo.png",
                usDec:"公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息公司信息",
                usContact:"联系客服：400-xxx-xxxx"
            },
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "关于我们",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            }
        }
    },
    components: {
        CommonHeader
    }
}
</script>

