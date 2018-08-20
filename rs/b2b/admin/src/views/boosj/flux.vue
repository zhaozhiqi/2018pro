<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <elTableCom ref="fluxTable" :elTableData="elTableList[0]" class="marT20"></elTableCom>

    <el-col :span="20" class="marT20">
      <line-chart ref="fluxLine" :chart-data="fluxLine"></line-chart>
    </el-col>

    <el-col :span="24" class="marT20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="详细报表" name="first">
          <elTableCom ref="fluxDetailsTable" :elTableData="elTableList[1]" class="marT20"></elTableCom>
        </el-tab-pane>
        <!-- <el-tab-pane label="占比" name="second">
          <elTableCom ref="fluxRatioTable" :elTableData="elTableList[2]" class="marT20"></elTableCom>
        </el-tab-pane> -->
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import { getCommonPageDetail, getCommonLine } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import elTableCom from '@/components/table/elTable'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjFlux',
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'first',
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      fluxLine: null,
      elTableList: [
        {
          'hasPage': false,
          'title': '',
          'theader': [
            { 'label': '视频标题', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit,
            tba.avgPageViewPerVisitor,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '时间段', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit,
            tba.avgPageViewPerVisitor,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '时间段', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit,
            tba.avgPageViewPerVisitor,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    dateCom,
    LineChart,
    PieChart,
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
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getData() {
      this.getDetail()
      this.getLine()
    },
    getLine() {
      const queryFlux = JSON.parse(JSON.stringify(this.query))
      queryFlux.dimension = 24

      getCommonLine(queryFlux).then(response => {
        const data = eval('(' + response.data + ')')
        // const data = JSON.parse(response.data)
        console.log(data, 'data')
        if (data === null || data === undefined) {
          this.fluxLine = {}
        } else {
          this.fluxLine = data
        }
      })
    },
    getDetail() {
      const queryFlux = JSON.parse(JSON.stringify(this.query))
      queryFlux.dimension = 0
      const queryFluxDetails = JSON.parse(JSON.stringify(this.query))
      queryFluxDetails.dimension = 24
      const queryFluxRatio = JSON.parse(JSON.stringify(this.query))
      queryFluxRatio.dimension = 16

      getCommonPageDetail(queryFlux).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.fluxTable.fetchData()
      })
      getCommonPageDetail(queryFluxDetails).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.fluxDetailsTable.fetchData()
      })
      /* getCommonPageDetail(queryFluxRatio).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.fluxRatioTable.fetchData()
      })*/
    }
  }
}
</script>
