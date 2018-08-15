<template>
  <div id="RegisterChange">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <router-link :to="{path:item.path}" v-for="(item, index) in list" :key="index">
        <div class="con">{{item.label}}</div>
      </router-link>
    </main>
  </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
export default {
  name: "registerChange",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "注册服务选择",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      list: [
        {
          label: '消费者注册',
          path: '/Register'
        },
        {
          label: '商家入驻',
          path: '/SettledChange'
        }
      ]
    }
  },
  components: {
    CommonHeader
  }
}
</script>

