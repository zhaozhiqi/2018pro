<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <channelCom :comData="query" v-on:changeChannel='changeChannel'></channelCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <el-row class="marT20">
      <attrCom :comData="comAttr" v-on:changeComAttr='changeComAttr'></attrCom>
    </el-row>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="areaPie" :pieChartsData='areaOption'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="ipsPie" :pieChartsData='ipsOption'></pie-chart>
      </div>
    </el-col>

    <el-col :span="20" class="marT20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="地区列表" name="first">
          <elTableCom ref="areaTable" :elTableData="elTableList[0]"></elTableCom>
        </el-tab-pane>
        <el-tab-pane label="运营商" name="second">
          <elTableCom ref="ipsTable" :elTableData="elTableList[1]"></elTableCom>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import { getCommonPie, getCommonPageDetail } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import channelCom from '@/components/condition/channelCom'
import attrCom from '@/components/condition/attrCom'
import elTableCom from '@/components/table/elTable'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjOperator',
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'first',
      query: {
        'channel': 'ALL'
      },
      comAttr: 'uv',
      areaOption: null,
      ipsOption: null,
      elTableList: [
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '省份', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol,
            tba.nuv,
            tba.bounceRate
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '运营商', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.totalvisitVol,
            tba.nuv,
            tba.bounceRate
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    dateCom,
    deviceCom,
    channelCom,
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
    changeDevice(type) {
      this.query.device = type
      this.getData()
    },
    changeChannel(type) {
      this.query.channel = type
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
      this.getPie()
      this.getDetail()
    },
    getPie() {
      const queryArea = JSON.parse(JSON.stringify(this.query))
      queryArea.dimension = 7
      const queryIps = JSON.parse(JSON.stringify(this.query))
      queryIps.dimension = 6

      getCommonPie(queryArea).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.areaOption = {}
        } else {
          this.areaOption = data[this.comAttr]
        }
      })
      getCommonPie(queryIps).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.ipsOption = {}
        } else {
          this.ipsOption = data[this.comAttr]
        }
      })
    },
    getDetail() {
      const queryArea = JSON.parse(JSON.stringify(this.query))
      queryArea.dimension = 7
      const queryIps = JSON.parse(JSON.stringify(this.query))
      queryIps.dimension = 6

      getCommonPageDetail(queryArea).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.areaTable.fetchData()
      })

      getCommonPageDetail(queryIps).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.ipsTable.fetchData()
      })
    }
  }
}
</script>
