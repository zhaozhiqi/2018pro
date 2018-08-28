<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="100" class="lineItem">
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
    </el-row>
    <el-row :gutter="100" class="lineItem">
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
    </el-row>
    <el-row :gutter="100" class="lineItem">
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple item"><p class="count">0</p><p class="title">1</p></div></el-col>
    </el-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getEditorsSyntheticRankingData } from '@/api/boosjAll'

export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dashboard-container {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

  .lineItem{
    margin-bottom: 30px;
    .item{
      background: #20a1ff;
      color: #fff;
      text-align: center;

      .count{
        line-height: 120px;
        margin: 0;
      }
      .title{
        line-height: 40px;
        margin: 0;
      }
    }
  }

}
</style>
