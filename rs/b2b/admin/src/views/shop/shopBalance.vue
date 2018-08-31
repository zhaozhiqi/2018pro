<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        店铺余额：{{balance | priceFormat}}
      </el-col>
    </el-row>
</div>
</template>

<script>
import { getUserBalance } from '@/api/a_api'

export default {
  name: 'shopBalance',
  data() {
    return {
      shopInfo: null,
      balance: 0
    }
  },
  components: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getUserBalance().then(res => {
        console.log(res, 'getUserBalance')
        if (res.code === 200) {
          this.balance = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.tableImg,
.formImg {
  height: 100px;
  display: block;
  margin: 0 auto;
}
.filePathImg,.productSetails >>> .detailImg{
  display: block;
  width: 100%;
  margin:0 auto 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
