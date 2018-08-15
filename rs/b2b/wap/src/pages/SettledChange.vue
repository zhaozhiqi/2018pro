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
  name: "settledChange",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "入驻选择",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      list: [{
        label: '经销商入驻',
        path: '/DistributorSettled'
      },
      {
        label: '批发商入驻',
        path: '/WholesalerSettled'
      },
      {
        label: '零售商入驻',
        path: '/RetailerSettled'
      }]
    }
  },
  components: {
    CommonHeader
  }
}
</script>

