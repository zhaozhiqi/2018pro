<template>
  <div id="addressList">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <Nodata :nodata="nodataObj" v-if="addressList.length <= 0"></Nodata>
      <div v-else class="addressItem" v-for="(item, index) in addressList" :key="index" @click="changeAddress(item)">
        <!-- <h3>送至：{{item.deliveryAddress}}</h3>  -->
        <div>
          <p>
            <label>收货人：{{item.name}}</label>
            <span>{{item.mobile}}</span>
          </p>
          <span>收货地址：{{item.address}}</span>
        </div>
        <p>
          <a class="defaultAddr" v-if="item.isDefault === 1">
            <i class="rsiconfont rsicon-address"></i>默认地址</a>
          <a @click="setDefaultAddr(item.id)" class="setDefaultAddr" v-else>
            <i class="rsiconfont rsicon-address"></i>设置为默认地址</a>

          <a @click="delConfirm(item.id)">
            <i class="rsiconfont rsicon-shanchu"></i>删除</a>
          <router-link :to="{path:'/editAddress', query: { id: item.id }}">
            <i class="rsiconfont rsicon-bianji"></i>编辑</router-link>
        </p>
      </div>

    </main>
    <footer class="addressFooter">
      <router-link :to="{path:'/editAddress', query: { id: 'add' }}">+ 新增收货地址</router-link>
    </footer>
  </div>
</template>

<script>
import { getAddressList, delAddress } from '@/api/m_api'
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'

import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
export default {
  name: "Address",
  data() {
    return {
      nodataObj: {
        iconName: "rsicon-jingshi",
        nodataMsg: "暂无收货地址"
      },
      addressList: [],
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
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
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init(){
      getAddressList().then(result => {
        // console.log(result, 'getAddressList')
        if (result.code === 200) {
          this.addressList = result.data
        }
      })
    },
    delConfirm(item) {
      this.$messagebox.confirm('确定执行此操作?').then(action => {
        if (action == 'confirm') {
          delAddress(item).then(result => {
            // console.log(result, 'delAddress')
            if (result.code === 200) {
              this.$toast({
                message: '操作成功',
                type: 'warning'
              })
              this.init()
            }
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          console.log('取消')
          return
        }
      })
    },
    setDefaultAddr(id) {
      this.$store.commit('setDefaultAddr', id)
    },
    changeAddress(item){
      const that = this
      if(this.$route.query.type!=='change'){
        return
      }else{
        const key = 'changeAddress'
        that.$messagebox.confirm('确定选取该地址吗?').then(action => {
          if (action == 'confirm') {
            setCookie(key,item.id)
            if(getCookie(key) ==item.id){
              that.$store.dispatch('backLastPage')
            }
          }
        }).catch(err => {
          if (err == 'cancel') {
            return
          }
        })
      } 
    }
  }
}
</script>
