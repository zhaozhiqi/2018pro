<template>
  <div>
    <el-button type="primary"
               :plain="channel !== 'ALL'"
               @click="changeChannel('ALL')">全站</el-button>
    <el-button type="primary"
               :plain="channel !== 'GCW'"
               @click="changeChannel('GCW')">广场舞</el-button>
    <el-button type="primary"
               :plain="channel !== 'BABY'"
               @click="changeChannel('BABY')">童趣</el-button>
    <el-button type="primary"
               :plain="channel !== 'COOL'"
               @click="changeChannel('COOL')">酷玩</el-button>
    <el-button type="primary"
               :plain="channel !== 'OTHER'"
               @click="changeChannel('OTHER')"
               >其他</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      channel: 'ALL'
    }
  },
  props: {
    comData: {
      type: Object,
      default: function() {
        return {
          channel: 'ALL'
        }
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    changeChannel(type) {
      this.channel = type
      this.$emit('changeChannel', this.channel)
    },
    initData() {
      this.channel = this.comData.channel
    }
  }
}
</script>
