<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <span class="grid-content bg-purple">商品数量总计：0</span>
        <el-select v-model="goodsSelectValue" placeholder="请选择">
          <el-option v-for="item in goodsOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary">新增</el-button>
      </el-col>
      <el-col :span="12">
        <el-input v-model="input" placeholder="按商品名搜索" clearable style="width:200px"></el-input>
        <el-button type="primary">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getCommonSyntheticData, getCommonPageDetail, getCommonPie, getDevicePie } from '@/api/boosjAll'

export default {
  name: 'goodsManage',
  data() {
    return {
      goodsOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '待审核商品'
      }, {
        value: '2',
        label: '在售商品'
      }, {
        value: '3',
        label: '待售商品'
      }, {
        value: '4',
        label: '缺货商品'
      }, {
        value: '5',
        label: '拼团商品'
      }],
      goodsSelectValue: '0'
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
