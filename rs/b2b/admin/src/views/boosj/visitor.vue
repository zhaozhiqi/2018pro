<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <elTableCom ref="visitorTable" :elTableData="elTableList[0]" class="marT20" style="display: block"></elTableCom>
    
    <el-row :gutter="20" class="marT20">
      <el-col :span="12"><elTableCom ref="nVisitorTable" :elTableData="elTableList[1]"></elTableCom></el-col>
      <el-col :span="12"><elTableCom ref="oVisitorTable" :elTableData="elTableList[2]"></elTableCom></el-col>
    </el-row>
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
  name: 'boosjVisitor',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      comAttr: 'pv',
      areaOption: null,
      ipsOption: null,
      elTableList: [
        {
          'hasPage': false,
          'title': '',
          'theader': [
            { 'label': '', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.nuv,
            tba.vv,
            tba.totalvisitVol,
            tba.avgPageViewPerVisit,
            tba.avgPageViewPerVisitor
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '新访客来源',
          'theader': [
            { 'label': '来源', 'con': 'd1', width: '150', align: 'center' },
            tba.uv,
            tba.totalvisitVol
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '老访客来源',
          'theader': [
            { 'label': '来源', 'con': 'd1', width: '150', align: 'center' },
            tba.uv,
            tba.totalvisitVol
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
    changeDevice(type) {
      this.query.device = type
      this.getData()
    },
    getData() {
      this.getDetail()
    },
    getDetail() {
      const queryVisitor = JSON.parse(JSON.stringify(this.query))
      queryVisitor.dimension = 1
      const queryNVisitor = JSON.parse(JSON.stringify(this.query))
      queryNVisitor.dimension = 17
      const queryOVisitor = JSON.parse(JSON.stringify(this.query))
      queryOVisitor.dimension = 18

      getCommonPageDetail(queryVisitor).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
        this.$refs.visitorTable.fetchData()
      })
      getCommonPageDetail(queryNVisitor).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.nVisitorTable.fetchData()
      })
      getCommonPageDetail(queryOVisitor).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.oVisitorTable.fetchData()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
