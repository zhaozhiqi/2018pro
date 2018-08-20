<template>
  <div class="app-container">
    <el-row class="myInfo">
      <el-col :span="3"><div class="grid-content bg-purple">流量：{{myInfo.myTotal}}<i class="iconfont" :class="upDownIcon"></i>{{myRatio}}</div></el-col>
      <el-col :span="3">排名： {{myInfo.myRank}}</el-col>
    </el-row>

    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <elTableCom ref="allTable" :elTableData="elTableList[0]"></elTableCom>

    <el-row>
      <line-chart ref="fluxLine" :chart-data="fluxLine"></line-chart>
    </el-row>
  </div>
</template>

<script>
import { getEditorsSyntheticRankingData, getCommonPageDetail, getCommonLine } from '@/api/boosjAll'
import { iconSorX, contrastAbs } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import elTableCom from '@/components/table/elTable'
import LineChart from '@/components/Charts/LineChart'
import { tba } from '@/utils/tableArg'

export default {
  name: 'myFluxIndex',
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
      fluxLine: null,
      myInfo: {
        myTotal: '--',
        myRank: '--',
        myRatio: 0
      },
      elTableList: [
        {
          'hasPage': false,
          'title': '流量概况',
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
        }
      ],
      listLoading: false
    }
  },
  components: {
    dateCom,
    deviceCom,
    elTableCom,
    LineChart
  },
  computed: {
    upDownIcon: function() {
      const _class = iconSorX(this.myInfo.myRatio)
      return _class
    },
    myRatio: function() {
      return contrastAbs(this.myInfo.myRatio)
    }
  },
  created() {
    this.getData()
    console.log(tba, 'tba---------------')
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
      this.getMyInfo()
      this.getDetail()
      this.getLine()
    },
    getMyInfo() {
      const queryMyInfoDay = JSON.parse(JSON.stringify(this.query))
      // queryMyInfoDay.dateType = 'YESTERDAY'
      // queryMyInfoDay.date = null
      queryMyInfoDay.dimension = 0

      getEditorsSyntheticRankingData(queryMyInfoDay).then(response => {
        const data = response.data
        if (data === null || data === undefined) {
          return false
        } else {
          this.myInfo.myTotal = data.flowCount
          this.myInfo.myRatio = data.flowCountContrastRatio
          this.myInfo.myRank = data.flowRanking
        }
      })
    },
    getDetail() {
      const queryAll = JSON.parse(JSON.stringify(this.query))
      queryAll.dimension = 0
      queryAll.currentUserData = 1

      getCommonPageDetail(queryAll).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.allTable.fetchData()
      })
    },
    getLine() {
      const queryFlux = JSON.parse(JSON.stringify(this.query))
      // queryFlux.dimension = 24
      queryFlux.dimension = 23
      queryFlux.currentUserData = 1

      getCommonLine(queryFlux).then(response => {
        const data = eval('(' + response.data + ')')
        if (data === null || data === undefined) {
          this.fluxLine = {}
        } else {
          this.fluxLine = data
        }
      })
    }
  }
}
</script>
