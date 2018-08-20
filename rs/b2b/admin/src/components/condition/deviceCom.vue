<template>
  <div>
    <el-button type="primary"
               :plain="device !== 'ALL'"
               @click="changeDevice('ALL')">全部终端</el-button>
    <el-button type="primary"
               :plain="device !== 'PC'"
               @click="changeDevice('PC')">PC端</el-button>
    <el-button type="primary"
               :plain="device !== 'WAP'"
               @click="changeDevice('WAP')">WAP端</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      device: 'ALL'
    }
  },
  props: {
    comData: {
      type: Object,
      default: function() {
        return {
          device: 'ALL'
        }
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    changeDevice(type) {
      this.device = type
      this.$emit('changeDevice', this.device)
    },
    initData() {
      this.device = this.comData.device
    }
  }
}
</script>
