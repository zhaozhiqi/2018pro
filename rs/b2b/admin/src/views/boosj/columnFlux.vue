<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <!-- <el-row class="marT20">
      <channelCom :comData="query" v-on:changeChannel='changeChannel'></channelCom>
    </el-row> -->

    <elTableCom ref="columnTable" :elTableData="elTableList[0]"></elTableCom>
  </div>
</template>

<script>
import { getCommonPageDetail } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import channelCom from '@/components/condition/channelCom'
import elTableCom from '@/components/table/elTable'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjOperator',
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
          'title': '栏目流量排名',
          'theader': [
            tba.seq,
            { 'label': '栏目', 'con': 'd4', width: '150', align: 'center' },
            { 'label': '频道', 'con': 'd3', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.avgTimeSpentOnPageView,
            tba.avgPageViewPerVisit
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    elTableCom,
    dateCom,
    channelCom
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
      const queryColumn = JSON.parse(JSON.stringify(this.query))
      queryColumn.dimension = 9

      getCommonPageDetail(queryColumn).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.columnTable.fetchData()
      })
    }
  }
}
</script>
