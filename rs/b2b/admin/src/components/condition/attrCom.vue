<template>
  <div>
    <el-button type="primary"
               :plain="comAttr !== 'uv'"
               @click="changeComAttr('uv')">UV</el-button>
    <el-button type="primary"
               :plain="comAttr !== 'pv'"
               @click="changeComAttr('pv')">PV</el-button>
    <el-button type="primary"
               :plain="comAttr !== 'ip'"
               @click="changeComAttr('ip')">IP</el-button>
    <el-button type="primary"
               :plain="comAttr !== 'nuv'"
               @click="changeComAttr('nuv')">新UV</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comAttr: 'uv'
    }
  },
  props: {
    comData: {
      type: String,
      default: function() {
        return 'dv'
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    changeComAttr(type) {
      this.comAttr = type
      this.$emit('changeComAttr', this.comAttr)
    },
    initData() {
      this.comAttr = this.comData
    }
  }
}
</script>
