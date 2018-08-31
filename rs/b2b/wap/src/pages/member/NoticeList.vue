<template>
  <div id="noticeList">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <Nodata :nodata="nodataObj" v-if="list.length <= 0"></Nodata>
      <div v-else class="noticeItem" v-for="(item, index) in list" :key="index">
        <div class="noRead" v-show="item.isView === 0"> </div>
        <router-link :to="{ name: 'NoticeDetails', query:{ id: item.id}}" class="noticeLick">
          <div class="msg-01">
            <i class="rsiconfont rsicon-31daipingjia"></i>
            <span>{{item.notice}}</span>
          </div>
          <div class="msg-02">
            <!-- <p>{{item.notice}}</p> -->
          </div>
          <div class="msg-03">
            <a class="notice-btn">查看详情</a>
            <span class="notice-time">{{item.createTime}}</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
export default {
  name: "NoticeList",
  data() {
    return {
      nodataObj: {
        iconName: "rsicon-31daipingjia",
        nodataMsg: "暂无消息"
      },
      list: [],
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
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
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getNoticeList().then(res => {
        // console.log(res, 'getNoticeList')
        if (res.code === 200 && res.data.records) {
          this.list = res.data.records
        }
      })
    }
  }
}
</script>
