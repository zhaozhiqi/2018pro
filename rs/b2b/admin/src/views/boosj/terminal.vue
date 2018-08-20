<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <attrCom :comData="comAttr" v-on:changeComAttr='changeComAttr'></attrCom>
    </el-row>

    <elTableCom ref="terminalTable" :elTableData="elTableList[0]" class="marT20"></elTableCom>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="terminalPie" :pieChartsData='terminalPie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="20" class="marT20">
      <line-chart ref="terminalLine" :chart-data="terminalLine"></line-chart>
    </el-col>

    <el-col :span="20" class="marT20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="操作系统" name="first">
          <elTableCom ref="systemTable" :elTableData="elTableList[1]"></elTableCom>
        </el-tab-pane>
        <el-tab-pane label="浏览器" name="second">
          <elTableCom ref="browserTable" :elTableData="elTableList[2]"></elTableCom>
        </el-tab-pane>
        <el-tab-pane label="分辨率" name="third">
          <elTableCom ref="ratioTable" :elTableData="elTableList[3]"></elTableCom>
        </el-tab-pane>
        <el-tab-pane label="品牌厂商" name="fourth">
          <elTableCom ref="brandsTable" :elTableData="elTableList[4]"></elTableCom>
        </el-tab-pane>
      </el-tabs>
    </el-col>

  </div>
</template>

<script>
import { getDevicePie, getCommonPageDetail, getDeviceFlowDetail, getDeviceLine } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import attrCom from '@/components/condition/attrCom'
import elTableCom from '@/components/table/elTable'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjTerminal',
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'first',
      query: {
        'channel': 'ALL'
      },
      comAttr: 'uv',
      terminalPie: null,
      terminalLine: null,
      elTableList: [
        {
          'hasPage': false,
          'title': '',
          'theader': [
            { 'label': '', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '操作系统', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.nuv,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '浏览器', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.nuv,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '分辨率', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.nuv,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '品牌厂商', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.nuv,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    dateCom,
    attrCom,
    elTableCom,
    LineChart,
    PieChart
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
    changeComAttr(type) {
      this.comAttr = type
      this.getData()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getData() {
      this.getDetail()
      this.getPie()
      this.getLine()
    },
    getPie() {
      const queryTerminal = JSON.parse(JSON.stringify(this.query))
      queryTerminal.dimension = 0

      getDevicePie(queryTerminal).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.terminalPie = {}
        } else {
          this.terminalPie = data[this.comAttr]
        }
      })
    },
    getLine() {
      const queryTerminal = JSON.parse(JSON.stringify(this.query))
      queryTerminal.dimension = 0

      getDeviceLine(queryTerminal).then(response => {
        const data = eval('(' + response.data + ')')
        if (data === null || data === undefined) {
          this.terminalLine = {}
        } else {
          this.terminalLine = data
        }
      })
    },
    getDetail() {
      const queryTerminal = JSON.parse(JSON.stringify(this.query))

      const querySystem = JSON.parse(JSON.stringify(this.query))
      querySystem.dimension = 4
      const queryBrowser = JSON.parse(JSON.stringify(this.query))
      queryBrowser.dimension = 5
      const queryRatio = JSON.parse(JSON.stringify(this.query))
      queryRatio.dimension = 12
      const queryBrands = JSON.parse(JSON.stringify(this.query))
      queryBrands.dimension = 2

      getDeviceFlowDetail(queryTerminal).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.terminalTable.fetchData()
      })

      getCommonPageDetail(querySystem).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.systemTable.fetchData()
      })
      getCommonPageDetail(queryBrowser).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.browserTable.fetchData()
      })
      getCommonPageDetail(queryRatio).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[3].data = {}
        } else {
          this.elTableList[3].data = data
        }
        this.$refs.ratioTable.fetchData()
      })
      getCommonPageDetail(queryBrands).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[4].data = {}
        } else {
          this.elTableList[4].data = data
        }
        this.$refs.brandsTable.fetchData()
      })
    }
  }
}
</script>
