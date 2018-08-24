<template>
  <div id="noticeList">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="noticeItem">
        <div class="msg-01">
          <i class="rsiconfont rsicon-31daipingjia"></i>
          <span>{{notice.notice}}</span>
        </div>
        <div class="msg-02">
          <!-- <p>{{item.notice}}</p> -->
        </div>
        <div class="msg-03">
          <span class="notice-time">{{notice.createTime}}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getNotice } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
export default {
  name: "NoticeDetails",
  data() {
    return {
      notice: {},
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "消息详情",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      }
    }
  },
  components: {
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
      const id = this.$route.query.id
      getNotice(id).then(res => {
        if (res.code === 200 && res.data) {
          this.notice = res.data
        }
      })
    }
  }
}
</script>
