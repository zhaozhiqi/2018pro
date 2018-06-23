<template>
    <div id="noticeList">
        <header class="header">
            <span class="goBack" @click="back"><i class="rsiconfont rsicon-qiehuanqizuo"></i></span>
            <h2>消息</h2>
            <span class="other"></span>
        </header>
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
            ]
        }
    },
    components: {
		Nodata
    },
    methods:{
        back(){
            window.history.go(-1)
        }
    }
}
</script>

<style>
#noticeList{
	overflow: hidden;
	height: 100%;
}

.main{
	position: absolute;
	top: 100px;
	left: 0;
	width: 100%;
	overflow: auto;
}

.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	line-height: 100px;
	height: 100px;
	font-size: 34px;
	padding: 0 10px;
	background: #fff;
	border-bottom: 1px solid #efefef;
}

.header h2{
	width: 100%;
	text-align: center
}
.header span{
	position: absolute;
	top: 0;
	line-height: 100px;
	height: 100px;
	font-size: 30px;
}

.header .other{
	right: 20px;
}

.header .goBack{
	left: 20px;
}
.header .goBack i{
	font-size: 40px;
}

.main{
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;        
}

.noticeItem{
    margin: 0px 20px 20px;
    padding: 20px;
    background-color: #fff;
}

.noticeItem .noticeLick{
    display: block;
    overflow: hidden;
}
.msg-01{
    position: relative;
}

.msg-01 i{
    position: absolute;
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
}
.msg-01 span{
    font-size: 28px;
    margin-left: 60px;
}
.msg-02{
    color: #848484;
    margin: 10px 0;
    border-bottom: 1px solid #e1e1e1;
}
.msg-02 p{
    padding-bottom: 20px;
}
.msg-03{
    overflow: hidden;
}
.msg-03 span{
    float: right;
    color: #868686;
}


</style>
