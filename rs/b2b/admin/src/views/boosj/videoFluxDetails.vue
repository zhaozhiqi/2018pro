<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <elTableCom ref="kwTable" :elTableData="elTableList[0]"></elTableCom>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="kwPie" :pieChartsData='kwOption'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="systemPie" :pieChartsData='systemOption'></pie-chart>
      </div>
    </el-col>
    <!-- <el-row class="marT20">
      <el-button type="primary" :plain="comAttr !== 'pv'"   @click="changeComAttr('pv')">PV</el-button>
      <el-button type="primary" :plain="comAttr !== 'uv'"   @click="changeComAttr('uv')">UV</el-button>
      <el-button type="primary" :plain="comAttr !== 'ip'"   @click="changeComAttr('ip')">IP</el-button>
      <el-button type="primary" :plain="comAttr !== 'nuv'"   @click="changeComAttr('nuv')">新UV</el-button>
    </el-row> -->

    <elTableCom ref="kwTable" :elTableData="elTableList[0]"></elTableCom>
  </div>
</template>

<script>
import { getCommonPie, getCommonPageDetail } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import elTableCom from '@/components/table/elTable'
import PieChart from '@/components/Charts/PieChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjVideoFluxDetails',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      kwOption: null,
      systemOption: null,
      elTableList: [
        {
          'hasPage': true,
          'title': '视频排行榜',
          'theader': [
            { 'label': '时间段', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip
          ],
          'data': []
        }
      ],
      listLoading: false
    }
  },
  components: {
    elTableCom,
    PieChart,
    dateCom,
    deviceCom
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
    getData() {
      this.getDetail()
      this.getPie()
    },
    getPie() {
      const queryKw = JSON.parse(JSON.stringify(this.query))
      queryKw.dimension = 7
      const querySystem = JSON.parse(JSON.stringify(this.query))
      querySystem.dimension = 6

      getCommonPie(queryKw).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.kwOption = {}
        } else {
          this.kwOption = data[this.comAttr]
        }
      })
      getCommonPie(querySystem).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.systemOption = {}
        } else {
          this.systemOption = data[this.comAttr]
        }
      })
    },
    getDetail() {
      const queryKw = JSON.parse(JSON.stringify(this.query))
      queryKw.dimension = 16

      getCommonPageDetail(queryKw).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.kwTable.fetchData()
      })
    }
  }
}
</script>
