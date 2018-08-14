<template>
  <div id="treaty">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <img :src="treatyImgUrl" />
    </main>
  </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
export default {
  name: "treaty",
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "用户注册协议",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      treatyImgUrl: '../../static/images/treaty.jpg'
    }
  },
  components: {
    CommonHeader
  },
  mounted() {
  }
}
</script>

