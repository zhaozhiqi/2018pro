<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <elTableCom ref="allTable" :elTableData="elTableList[0]" style="float: left"></elTableCom>

    <el-col :span="8" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="sourcePie" :pieChartsData='sourceOption'></pie-chart>
      </div>
    </el-col>

    <elTableCom ref="newVideoTable" :elTableData="elTableList[1]"></elTableCom>
    <elTableCom ref="oldVideoTable" :elTableData="elTableList[2]"></elTableCom>
    <!-- <elTableCom ref="dramaTable" :elTableData="elTableList[3]"></elTableCom>
    <elTableCom ref="specialTable" :elTableData="elTableList[4]"></elTableCom> -->

  </div>
</template>

<script>
import { getCommonPageDetail, getDevicePie } from '@/api/boosjAll'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import elTableCom from '@/components/table/elTable'
import PieChart from '@/components/Charts/PieChart'
import LineChart from '@/components/Charts/LineChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'myFluxDetails',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL',
        'dateType': 'YESTERDAY',
        'date': null,
        'device': 'ALL'
      },
      comAttr: 'uv',
      sourceOption: null,
      elTableList: [
        {
          'hasPage': false,
          'title': '流量明细',
          'theader': [
            { 'label': '', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.nuv,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '新视频TOP100',
          'theader': [
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv,
            tba.upUser
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '老视频TOP100',
          'theader': [
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv,
            tba.upUser
          ],
          'data': []
        },
        {
          'hasPage': false,
          'title': '剧集页TOP20',
          'theader': [
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv
          ],
          'data': []
        },
        {
          'hasPage': false,
          'title': '专题页TOP20',
          'theader': [
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv
          ],
          'data': []
        }
      ],
      lineChartData: {
        'title': '流量趋势',
        'expectedData': [100, 120, 161, 134, 105, 160, 165],
        'actualData': [120, 82, 91, 154, 162, 140, 145]
      },
      listLoading: false
    }
  },
  components: {
    dateCom,
    deviceCom,
    elTableCom,
    PieChart,
    LineChart
  },
  created() {
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
      const querySource = JSON.parse(JSON.stringify(this.query))
      querySource.dimension = 0
      querySource.currentUserData = 1

      getDevicePie(querySource).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          this.sourceOption = {}
        } else {
          this.sourceOption = data[this.comAttr]
        }
      })
    },
    getDetail() {
      const queryAll = JSON.parse(JSON.stringify(this.query))
      queryAll.dimension = 3
      queryAll.currentUserData = 1

      const queryNewVideo = JSON.parse(JSON.stringify(this.query))
      queryNewVideo.dimension = 25
      queryNewVideo.currentUserData = 1

      const queryOldVideo = JSON.parse(JSON.stringify(this.query))
      queryOldVideo.dimension = 26
      queryOldVideo.currentUserData = 1
      /* const queryDrama = JSON.parse(JSON.stringify(this.query))
      queryDrama.dimension = 0
      queryDrama.dimension = 0
      const querySpecial = JSON.parse(JSON.stringify(this.query))
      querySpecial.dimension = 0 */

      getCommonPageDetail(queryAll).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.allTable.fetchData()
      })

      getCommonPageDetail(queryNewVideo).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.newVideoTable.fetchData()
      })
      getCommonPageDetail(queryOldVideo).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.oldVideoTable.fetchData()
      })
      /* getCommonPageDetail(queryDrama).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[3].data = {}
        } else {
          this.elTableList[3].data = data
        }
        this.$refs.dramaTable.fetchData()
      })
      getCommonPageDetail(querySpecial).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[4].data = {}
        } else {
          this.elTableList[4].data = data
        }
        this.$refs.specialTable.fetchData()
      })*/
    }
  }
}
</script>
