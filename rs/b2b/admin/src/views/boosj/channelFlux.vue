<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <el-row class="marT20">
      <el-button type="primary"
               :plain="comNewold !== 'ALL'"
               @click="changeComNewold('ALL')">全部</el-button>
      <el-button type="primary"
                :plain="comNewold !== 'NEW'"
                @click="changeComNewold('NEW')">新视频</el-button>
      <el-button type="primary"
                :plain="comNewold !== 'OLD'"
                @click="changeComNewold('OLD')">老视频</el-button>
    </el-row>


    <elTableCom ref="channelTable" :elTableData="elTableList[0]" class="marT20"></elTableCom>
  </div>
</template>

<script>
import { getCommonPageDetail } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import deviceCom from '@/components/condition/deviceCom'
import elTableCom from '@/components/table/elTable'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjChannekFulx',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      comNewold: 'ALL',
      areaOption: null,
      ipsOption: null,
      elTableList: [
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '频道', 'con': 'd3', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            tba.ip,
            tba.avgPageViewPerVisitor,
            tba.avgTimeSpentOnPageView,
            { 'label': '栏目（VV）MAX', 'con': 'd4', width: '95', align: 'center' }
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
    changeComNewold(type) {
      this.comNewold = type
      this.getData()
    },
    getData() {
      this.getDetail()
    },
    getDetail() {
      const queryChannel = JSON.parse(JSON.stringify(this.query))
      switch (this.comNewold) {
        case 'ALL':queryChannel.dimension = 19
          break
        case 'NEW':queryChannel.dimension = 20
          break
        case 'OLD':queryChannel.dimension = 21
          break
        default:queryChannel.dimension = 19
          break
      }

      getCommonPageDetail(queryChannel).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.channelTable.fetchData()
      })
    }
  }
}
</script>
