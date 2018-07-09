<template>
    <div id="store">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <div class="storeInfo">
                <div class="top">
                    <div class="storeLogo">
                        <img src="../../static/images/storeLogo.png" alt="">
                    </div>
                    <div class="storeName">和顺批发</div>
                    <div class="storeCollect" @click="storeCollect">
                        <i v-show="!isCollect" class="rsiconfont rsicon-shoucang"></i>
                        <i v-show="isCollect" class="rsiconfont rsicon-shoucangfill"></i>
                        <span>收藏</span>
                    </div>
                    <div class="storeCall"><i class="rsiconfont rsicon-dianhua"></i><span>联系卖家</span></div>
                </div>
                <div class="btm">
                    <p>店铺最低发货金额200.00元</p>
                    <p>总销量：353</p>
                </div>
            </div>
            <div class="storeTab">
                <mt-navbar v-model="defaultTab">
                    <mt-tab-item id="index"><i class="rsiconfont rsicon-home1"></i>首页</mt-tab-item>
                    <mt-tab-item id="class"><i class="rsiconfont rsicon-fenlei"></i>分类</mt-tab-item>
                    <!-- <mt-tab-item id="intro"><i class="rsiconfont rsicon-shangpin"></i>商品列表</mt-tab-item> -->
                    <mt-tab-item id="intro"><i class="rsiconfont rsicon-jieshao"></i>公司介绍</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="defaultTab">
                    <mt-tab-container-item id="index" >
                        <img src="../../static/images/reImg-01.png" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="class">
                        <div class="title">一级分类</div>
                        <div class="classCon">
                            <div class="classItem" @click="changeClass()">
                                <img src="../../static/images/wap-13.png" />
                                <span>全部</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="../../static/images/wap-20.png" />
                                <span>饮料</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="../../static/images/wap-14.png" />
                                <span>服装</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="../../static/images/wap-04.png" />
                                <span>食品</span>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <!-- <mt-tab-container-item id="proList">
                        <div class=""></div>
                    </mt-tab-container-item> -->
                    <mt-tab-container-item class="intro" id="intro">
                        <div><span>公司名称</span> 和顺批发</div>
                        <div><span>公司地址</span> 浙江省杭州市滨江区xxxx大厦xxx楼</div>
                        <div><span>主营产品</span> 和顺批发</div>
                        <h3>店铺资格</h3>
                        <img src="../../static/images/pro-det-01.jpg" />

                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </main>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
export default {
    name:"pay",
    data(){
        return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "店铺主页",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            },
            defaultTab:"index",
            isCollect: false
        }
    },
    components: {
        CommonHeader
    },
    mounted(){
        let addressList = this.$store.state.addressList
    },
    methods:{
        changeClass(){
            this.$router.push({path:'/seach'})
        },
        storeCollect(){
            if(this.isCollect === false){
                this.$toast({
                   message: '已收藏',
                   type: 'warning',
                   duration: 1000
                });
                this.isCollect = true
            }else{
                this.$toast({
                   message: '取消收藏',
                   type: 'warning',
                   duration: 1000
                });
                this.isCollect = false
            }
        }
    }
}
</script>
