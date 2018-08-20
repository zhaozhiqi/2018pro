<template>
  <div class="app-container">

  </div>
</template>

<script>
// import { getCommonSyntheticData, getCommonPageDetail, getCommonPie, getDevicePie } from '@/api/boosjAll'
// import { initQuery } from '@/utils'
// import dateCom from '@/components/condition/dateCom'
// import deviceCom from '@/components/condition/deviceCom'
// import channelCom from '@/components/condition/channelCom'
// import attrCom from '@/components/condition/attrCom'
// import elTableCom from '@/components/table/elTable'
// import LineChart from '@/components/Charts/LineChart'
// import PieChart from '@/components/Charts/PieChart'
// import { tba } from '@/utils/tableArg'

export default {
  name: 'wphShopSet',
  data() {
    return {
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    changeMsg() {
      this.msg = 'Hello world.'
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }

  }
}
</script>
