<template>
    <div id="addressList">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <Nodata :nodata="nodataObj" v-if="addressList.length <= 0"></Nodata>
            <div v-else class="addressItem" v-for="(item, index) in addressList" :key="index" >
                <!-- <h3>送至：{{item.deliveryAddress}}</h3>  -->
                <div><p><label>收货人：{{item.userName}}</label><span>{{item.userPhone}}</span></p> <span>收货地址：{{item.region.value}}  {{item.detailedAddress}}</span></div> 
                <p>
                    <a class="defaultAddr" v-if="item.default"><i class="rsiconfont rsicon-address"></i>默认地址</a> 
                    <a @click="setDefaultAddr(item.id)" class="setDefaultAddr" v-else><i class="rsiconfont rsicon-address"></i>设置为默认地址</a> 

                    <a @click="delConfirm(item.id)"><i class="rsiconfont rsicon-shanchu"></i>删除</a> 
                    <router-link :to="{path:'/editAddress', query: { id: item.id }}"><i class="rsiconfont rsicon-bianji"></i>编辑</router-link></p>
            </div>
        </main>
        <footer class="addressFooter">
            <router-link :to="{path:'/editAddress', query: { id: 'add' }}">+ 新增收货地址</router-link>
        </footer>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
export default {
    name:"Address",
    data(){
        return {
            nodataObj:{
                iconName:"rsicon-jingshi",
                nodataMsg:"暂无收货地址"
            },
            addressList:[],
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "收货地址管理",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            }
        }
    },
    components: {
        Nodata,
        CommonHeader
    },
    mounted(){
        this.addressList = this.$store.state.addressList;
    },
    methods:{
        delConfirm(item){
            this.$messagebox.confirm('确定执行此操作?').then(action => {
                if(action == 'confirm'){                             
                    this.$store.commit('editAddress', {id:item, operate :'del', obj:null});
                    this.$toast({
                        message: '操作成功',
                        type: 'warning'
                    });
                }
            }).catch(err=>{
                if(err == 'cancel') {
                    console.log('取消');
                    return
                }
            });
        },
        setDefaultAddr(id){
            console.log(4131)
            this.$store.commit('setDefaultAddr', id);
        }
    }
}
</script>

<style scopde>
#addressList{
	overflow: hidden;
	height: 100%;
}

.main{
	position: absolute;
	top: 100px;
    bottom: 100px;
	left: 0;
    right: 0;
	width: 100%;
	overflow: auto;
}

.addressItem{
    margin-bottom: 20px;
    background-color: #fff;
}

.addressItem h3{
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #efefef;
    padding: 0 20px;
    font-size: 30px;
}

.addressItem>div{
    line-height: 48px;
    padding: 20px;
    border-bottom: 1px solid #efefef;
    font-size: 28px;
}

.addressItem>div>p{
    display: flex;
    justify-content: space-between;
}

.addressItem>div>span{
    font-size: 26px;
    color: #999;
}

.addressItem>p{
    overflow: hidden;
    height: 88px;
    line-height: 88px;
    padding: 0 20px;
}

.addressItem>p>a{
    float: right;
    margin-left: 60px;
    color: #999;
    font-size: 26px;
}

.addressItem>p>a>i{
    font-size: 38px;
    margin-right: 10px;
}

.addressFooter{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%; 
}
.addressFooter a{
    display: block;
    line-height: 100px;
    height: 100px;
    background-color: #1655bf;
    color: #fff;
    font-size: 32px;
    text-align: center;
}

.addressItem>p>a.defaultAddr{
    float: left;
    color: #1655bf;
    margin: 0
}
.addressItem>p>a.setDefaultAddr{
    float: left;
    margin: 0
}
</style>
