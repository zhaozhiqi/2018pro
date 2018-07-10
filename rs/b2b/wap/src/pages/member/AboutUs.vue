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

<style scopde>
#aboutUs{
	overflow: hidden;
	height: 100%;
    background-color: #fff;
}

#aboutUs .main{
	position: absolute;
	top: 100px;
	left: 0;
    right: 0;
	width: 100%;
	overflow: auto;    
    font-size: 26px;
    padding: 0 20px;
    color: #999;
    font-size: 28px;
    line-height: 48px;
}

.usEwmLogo{
    display: block;
    width: 240px;
    height: 240px;
    margin: 100px auto 50px;
}

.usDec{
    text-indent: 48px;
    padding: 20px 0;
}

.usContact{
    text-align: center;
    margin-top: 160px;
}

</style>
