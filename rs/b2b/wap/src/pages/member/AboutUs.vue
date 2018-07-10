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
                usEwmLogo:"static/images/memberLogo.jpg",
                usDec:"插卡机拉克丝就放开手大房间辣说快递积分快递就发了说快递积分阿说快递积分拉克丝的解放路口驾驶的离开纠纷阿萨德飞机阿萨德李开复",
                usContact:"联系客服：400-698-6565"
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
    },
    methods:{
        logout(){
            console.log('logout')
        }
    }
}
</script>

