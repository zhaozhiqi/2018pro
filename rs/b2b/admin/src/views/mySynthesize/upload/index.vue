<template>
  <div class="app-container">
    <el-row class="myInfo">
      <el-col :span="3">上传总量 {{myInfo.myTotal}}<i class="iconfont" :class="upDownIcon"></i>{{myRatio}}</el-col>
      <el-col :span="3">排名： {{myInfo.myRank}}</el-col>
    </el-row>

    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row>
      <line-chart ref="uploadLine" :chart-data="uploadLine"></line-chart>
    </el-row>
  </div>
</template>

<script>
import { getEditorsSyntheticRankingData, getUploadLine } from '@/api/boosjAll'
import { iconSorX, contrastAbs } from '@/utils'
import dateCom from '@/components/condition/dateCom'
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
      uploadLine: null,
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
            tba.title,
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.vv,
            tba.nuv,
            tba.avgTimeSpentOnPageView
          ],
          'data': []
        }
      ],
      lineChartData: {
        'title': '上传量明细',
        'expectedData': [100, 120, 161, 134, 105, 160, 165],
        'actualData': [120, 82, 91, 154, 162, 140, 145]
      },
      listLoading: false
    }
  },
  components: {
    dateCom,
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
  },
  methods: {
    changeDate(obj) {
      this.query.date = obj.date
      this.query.dateType = obj.dateType
      this.getData()
    },
    getData() {
      this.getLine()
      this.getMyInfo()
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
          this.myInfo.myTotal = data.uploadCount
          this.myInfo.myRatio = data.uploadCountContrastRatio
          this.myInfo.myRank = data.uploadRanking
        }
      })
    },
    getLine() {
      const queryUpload = JSON.parse(JSON.stringify(this.query))

      getUploadLine(queryUpload).then(response => {
        const data = eval('(' + response.data + ')')
        if (data === null || data === undefined) {
          this.uploadLine = {}
        } else {
          this.uploadLine = data
        }
      })
    }
  }
}
</script>
