<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <!-- <el-row class="marT20">
      <channelCom :comData="query" v-on:changeChannel='changeChannel'></channelCom>
    </el-row> -->

    <elTableCom ref="rankTable" :elTableData="elTableList[0]" class="marT20"></elTableCom>
  </div>
</template>

<script>
import { getEditorsFlowRankingData } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import channelCom from '@/components/condition/channelCom'
import elTableCom from '@/components/table/elTable'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjRank',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      areaOption: null,
      ipsOption: null,
      elTableList: [
        {
          'hasPage': true,
          'title': '',
          'theader': [
            tba.name,
            tba.flowCount,
            tba.flowRanking,
            tba.uploadCount,
            tba.uploadRanking,
            tba.auditingCount,
            tba.auditingRanking,
            tba.newVideoFlow,
            tba.oldVideoFlow
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    dateCom,
    channelCom,
    elTableCom
  },
  created() {
    this.query = initQuery(this.query)
  },
  mounted() {
    this.getData()
  },
  methods: {
    changeDate(obj) {
      this.query.date = obj.date
      this.query.dateType = obj.dateType
      this.getData()
    },
    changeChannel(type) {
      this.query.channel = type
      this.getData()
    },
    getData() {
      this.getDetail()
    },
    getDetail() {
      const queryRank = JSON.parse(JSON.stringify(this.query))
      queryRank.dimension = 0

      getEditorsFlowRankingData(queryRank).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        console.log(this.elTableList[0].data, 'this.elTableList[0].data')
        this.$refs.rankTable.fetchData()
      })
    }
  }
}
</script>
