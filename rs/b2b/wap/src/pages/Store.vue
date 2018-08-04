<template>
    <div id="store">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <div class="storeInfo" :style="{ backgroundImage: 'url(' + storeObj.storeTopBg + ')' }">
              <div class="filmBg">
                <div class="top">
                    <div class="storeLogo">
                        <img src="static/images/storeLogo.png" alt="">
                    </div>
                    <div class="storeName">和顺批发</div>
                </div>
                <div class="btm">
                    <p>店铺最低发货金额200.00元</p>
                    <p>总销量：353</p>
                </div>
              </div>
            </div>
            <div class="storeTab">
                <mt-navbar v-model="defaultTab">
                    <mt-tab-item id="index"><i class="rsiconfont rsicon-home1"></i>首页</mt-tab-item>
                    <mt-tab-item id="class"><i class="rsiconfont rsicon-fenlei"></i>分类</mt-tab-item>
                    <mt-tab-item id="GroupList"><i class="rsiconfont rsicon-shangpin"></i>拼团列表</mt-tab-item>
                    <mt-tab-item id="intro"><i class="rsiconfont rsicon-jieshao"></i>公司介绍</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="defaultTab">
                    <mt-tab-container-item id="index" >
                        <img src="static/images/reImg-01.png" />
                        <List :proList='proList'/>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="class">
                        <div class="title">一级分类</div>
                        <div class="classCon">
                            <div class="classItem" @click="changeClass()">
                                <img src="static/images/wap-13.png" />
                                <span>全部</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="static/images/wap-20.png" />
                                <span>饮料</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="static/images/wap-14.png" />
                                <span>服装</span>
                            </div>
                            <div class="classItem" @click="changeClass()">
                                <img src="static/images/wap-04.png" />
                                <span>食品</span>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="GroupList">
                      <GroupList :proList='groupList'/>
                    </mt-tab-container-item>
                    <mt-tab-container-item class="intro" id="intro">
                        <div><span>公司名称</span> 和顺批发</div>
                        <div><span>公司地址</span> 浙江省杭州市滨江区xxxx大厦xxx楼</div>
                        <div><span>主营产品</span> 和顺批发</div>
                        <h3>店铺资格</h3>
                        <img src="static/images/pro-det-01.jpg" />

                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </main>
        <footer>
          <div class="storeCollect" @click="storeCollect">
              <i v-show="!isCollect" class="rsiconfont rsicon-shoucang"></i>
              <i v-show="isCollect" class="rsiconfont rsicon-shoucangfill"></i>
              <span>收藏</span>
          </div>
          <div class="storeCall"><i class="rsiconfont rsicon-dianhua"></i><span>联系卖家</span></div>
        </footer>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import List from '@/components/List'
import GroupList from '@/components/GroupList'

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
            isCollect: false,
            storeObj: {
              storeTopBg: 'static/images/storeTopBg.png'
            },
            proList:[
              {bable:"新品",proImg:"static/images/pro-02.jpg",title:"【可口可乐】 雪碧纤维+零糖零卡路里 迪丽热巴 碳酸饮料500ml*12",price:"58",num:"26",proId:"1"},
              {bable:"新品",proImg:"static/images/pro-17.jpg",title:"Intel/英特尔 酷睿i7-8700k盒装处理器 电脑CPU 六核非散片8700k",price:"4399",num:"68",proId:"2"},
              {bable:"新品",proImg:"static/images/pro-09.jpg",title:"哈根达斯 81g小纸杯整箱冰淇淋冰激凌 24杯 江浙沪皖包邮",price:"500",num:"12",proId:"3"},
              {bable:"新品",proImg:"static/images/pro-06.jpg",title:"香其酱包邮东北大酱原厂香其酱哈尔滨香其酱农家黄豆酱调味酱",price:"26",num:"5365",proId:"4"},
            ],
            groupList:[
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"static/images/wap-19.png",name:"ROUWANBABY180601/180602夏天就要穿美裙娃娃款连衣裙闺蜜装",price:"21",num:"888",proId:"4"},
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/2567690040/TB2GHhSaFqZBuNjt_jqXXamzpXa_!!2567690040.jpg",name:"裙子夏女2018新款韩版露背小心机显瘦小个子ins超火的吊带连衣裙",price:"2222",num:"888",proId:"1"},
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i3/101126324/TB2WhPbvgmTBuNjy1XbXXaMrVXa_!!101126324.jpg",name:"小番茄定制 连衣裙女夏2018新款假两件拼接收腰裙小心机开叉裙子",price:"21",num:"888",proId:"2"},
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/87731160/TB2bqZjreuSBuNjy1XcXXcYjFXa_!!87731160.jpg",name:"连衣裙夏季2018新款女装韩版显瘦印花雪纺收腰超仙温柔风中长裙子",price:"21",num:"888",proId:"5"},
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i1/752260885/TB25xdLe_qWBKNjSZFxXXcpLpXa_!!752260885.jpg",name:"妃儿雪纺连衣裙女夏季装2018新款气质显瘦温柔超仙女收腰长裙裙子",price:"21",num:"888",proId:"3"},
              {bable:"新品",spec:"规格：500ml 单位：1瓶",jobPrice:"99.99",groupPrice:"29.99",mustNum:"100",percent:"50",proImg:"https://gw.alicdn.com/imgextra/i2/757632702/TB2jiRCrf5TBuNjSspmXXaDRVXa_!!757632702.jpg",name:"雪纺连衣裙女夏季显瘦高腰韩国V领女装夏装气质拼接超仙imiss裙子",price:"21",num:"888",proId:"6"}
            ]
        }
    },
    components: {
        CommonHeader,
        List,
        GroupList
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

<style scoped>
#store .main .storeInfo .filmBg{
  background-image: url('/static/images/film.png')
}
</style>
