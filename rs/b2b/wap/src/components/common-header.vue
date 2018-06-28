<template>
    <header class="commonHeader" :style="commonHeaderObj.bgStyle">
        <span class="goBack item" @click="goBack" ><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
        <h2>{{commonHeaderObj.title}}</h2>
        <span class="other item" v-show="commonHeaderObj.isOtherShow" @click="goOther(commonHeaderObj.otherLink)">
            <i class="rsiconfont" :class="commonHeaderObj.otherIconClass" @click="childrenClick"></i>
        </span>
    </header>
</template>

<script>
export default {
    name:"commonHeader",
    props: {
        'commonHeaderObj':{
            type: Object,
            default: function () {
                return {
                    bgStyle: {
                        color:"#333",
                        backgroundColor:"#fff"
                    },
                    title: "消息",
                    isOtherShow: true,
                    otherIconClass: "rsicon-gengduo",
                    otherLink: {
                        path: '/'
                    }
                }
            }
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        goBack(){
            this.$store.commit('goback')
        },
        goOther(link){
            this.$router.push(link)
        },
        childrenClick(){
            this.$emit('otherClick','childParam'); 
        }
    }
}
</script>

<style scopde>
.commonHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid #efefef;
}

.commonHeader .bule{
    background: #1655bf;
}

.commonHeader h2{
    width: 100%;
    font-size: 34px;
}

.commonHeader .item{
    display: block;
    width: 80px;
    height: 100%;
    position: absolute;
    top: 0;

}

.commonHeader .other{
	right: 0;
}

.commonHeader .goBack{
	left: 0;
}
.commonHeader .goBack i{
	font-size: 28px;
}
.commonHeader .rsicon-wenhao{
	font-size: 40px;
}
</style>
