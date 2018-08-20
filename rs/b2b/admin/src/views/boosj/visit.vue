<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <elTableCom ref="domainTable" :elTableData="elTableList[0]" style="marginTop: 20px"></elTableCom>
    <elTableCom ref="pageTable" :elTableData="elTableList[1]"></elTableCom>
  </div>
</template>

<script>
import { getCommonPageDetail } from '@/api/boosjAll'
import { initQuery } from '@/utils'
import dateCom from '@/components/condition/dateCom'
import elTableCom from '@/components/table/elTable'
import { tba } from '@/utils/tableArg'

export default {
  name: 'boosjVisit',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      elTableList: [
        {
          'hasPage': true,
          'title': '受访域名分析',
          'theader': [
            { 'label': '受访域名', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.ip,
            { 'label': '人均浏览页面', 'con': 'avgPageViewPerVisitor', width: '95', align: 'center' }
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '受访页面',
          'theader': [
            { 'label': '', 'con': 'd1', width: '300', align: 'center' },
            tba.pv,
            tba.uv,
            tba.ip,
            tba.avgPageViewPerVisitor,
            tba.avgTimeSpentOnPageView,
            tba.nuv,
            tba.totalvisitVol,
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
    getData() {
      this.getDetail()
    },
    getDetail() {
      const queryDomain = JSON.parse(JSON.stringify(this.query))
      queryDomain.dimension = 14
      const queryPage = JSON.parse(JSON.stringify(this.query))
      queryPage.dimension = 15

      getCommonPageDetail(queryDomain).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.domainTable.fetchData()
      })
      getCommonPageDetail(queryPage).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.pageTable.fetchData()
      })
    }
  }
}
</script>
