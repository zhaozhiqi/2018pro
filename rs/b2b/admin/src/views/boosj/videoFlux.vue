<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <elTableCom ref="videoTable" :elTableData="elTableList[0]" class="marT20"></elTableCom>

    <el-col :span="20" class="marT20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频流量" name="first">
          <line-chart ref="videoFluxLine" :chart-data="videoFluxLine"></line-chart>
        </el-tab-pane>
        <!-- <el-tab-pane label="视频量" name="second">
          <line-chart ref="videoNumLine" :chart-data="videoNumLine"></line-chart>
        </el-tab-pane> -->
      </el-tabs>
    </el-col>

    <elTableCom ref="videoFluxTable" :elTableData="elTableList[1]" class="marT20"></elTableCom>

    <el-col :span="20" class="marT20">
      <el-tabs v-model="activeNameBtm" @tab-click="handleClickBtm">
        <el-tab-pane label="详细报表" name="first">
          <elTableCom ref="videoDetailsTable" :elTableData="elTableList[2]" class="marT20"></elTableCom>
        </el-tab-pane>
        <!-- <el-tab-pane label="占比" name="second">
          <elTableCom ref="videoRatioTable" :elTableData="elTableList[3]" class="marT20"></elTableCom>
        </el-tab-pane> -->
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import { getCommonPageDetail, getCommonLine } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import elTableCom from '@/components/table/elTable'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjVideoFlux',
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'first',
      activeNameBtm: 'first',
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      videoFluxLine: null,
      videoNumLine: null,
      elTableList: [
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.checkVol,
            tba.upVol,
            tba.userUpVol,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '视频流量排名',
          'theader': [
            tba.seq,
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv,
            tba.upUser,
            tba.upTime,
            tba.category,
            tba.type
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
            tba.checkVol,
            tba.upVol,
            tba.userUpVol
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
            tba.checkVol,
            tba.upVol,
            tba.userUpVol
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
    handleClick(tab, event) {
      setTimeout(() => {
        this.$refs.videoFluxLine.chart.resize()
        this.$refs.videoNumLine.chart.resize()
        console.log(tab, event, 'tab')
      }, 200)
    },
    handleClickBtm(tab, event) {
      console.log(tab, event)
    },
    getData() {
      this.getDetail()
      this.getLine()
    },
    getLine() {
      const queryVideoFlux = JSON.parse(JSON.stringify(this.query))
      queryVideoFlux.dimension = 23
      queryVideoFlux.loadUploadAndAuditingData = 1
      const queryVideoNum = JSON.parse(JSON.stringify(this.query))
      queryVideoNum.dimension = 3

      getCommonLine(queryVideoFlux).then(response => {
        const data = eval('(' + response.data + ')')
        if (data === null || data === undefined) {
          this.videoFluxLine = {}
        } else {
          this.videoFluxLine = data
        }
      })
      // getCommonLine(queryVideoNum).then(response => {
      //   const data = eval('(' + response.data + ')')
      //   if (data === null || data === undefined) {
      //     this.videoNumLine = {}
      //   } else {
      //     this.videoNumLine = data
      //   }
      // })
    },
    getDetail() {
      const queryVideo = JSON.parse(JSON.stringify(this.query))
      queryVideo.dimension = 22
      queryVideo.loadUploadAndAuditingData = 1
      const queryVideoFlux = JSON.parse(JSON.stringify(this.query))
      queryVideoFlux.dimension = 11
      const queryVideoDetails = JSON.parse(JSON.stringify(this.query))
      queryVideoDetails.dimension = 23
      queryVideoDetails.loadUploadAndAuditingData = 1
      const queryRatio = JSON.parse(JSON.stringify(this.query))
      queryRatio.dimension = 16

      getCommonPageDetail(queryVideo).then(response => {
        const data = response.data.records
        if ((data === null || data === undefined || data === [])) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.videoTable.fetchData()
      })
      getCommonPageDetail(queryVideoFlux).then(response => {
        const data = response.data.records
        if ((data === null || data === undefined || data === [])) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.videoFluxTable.fetchData()
      })
      getCommonPageDetail(queryVideoDetails).then(response => {
        const data = response.data.records
        if ((data === null || data === undefined || data === [])) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.videoDetailsTable.fetchData()
      })
      /* getCommonPageDetail(queryRatio).then(response => {
        const data = response.data.records
        if ((data === null || data === undefined || data === [])) {
          this.elTableList[3].data = {}
        } else {
          this.elTableList[3].data = data
        }
        this.$refs.videoRatioTable.fetchData()
      })*/
    }
  }
}
</script>
