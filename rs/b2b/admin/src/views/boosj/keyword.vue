<template>
  <div class="app-container">
    <el-row class="marT20">
      <dateCom :comData="query" v-on:changeDate='changeDate'></dateCom>
    </el-row>

    <el-row class="marT20">
      <deviceCom :comData="query" v-on:changeDevice='changeDevice'></deviceCom>
    </el-row>

    <!-- <elTableCom ref="kwTable" :elTableData="elTableList[0]" class="marT20"></elTableCom> -->

    <el-col :span="20" class="marT20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="按搜索引擎" name="first">
          <elTableCom ref="kwSystemTable" :elTableData="elTableList[1]"></elTableCom>
        </el-tab-pane> -->
        <el-tab-pane label="按流量" name="second">
          <elTableCom ref="kwFluxTable" :elTableData="elTableList[2]"></elTableCom>
        </el-tab-pane>
      </el-tabs>
    </el-col>

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
  name: 'boosjOperator',
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'second',
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
            { 'label': '关键词', 'con': 'd1', width: '150', align: 'center' },
            tba.pv
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '关键词', 'con': 'd1', width: '150', align: 'center' },
            tba.pv
          ],
          'data': []
        },
        {
          'hasPage': true,
          'title': '',
          'theader': [
            { 'label': '关键词', 'con': 'd1', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.nuv,
            tba.ip,
            tba.avgTimeSpentOnPageView,
            tba.bounceRate
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
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getData() {
      this.getDetail()
    },
    getDetail() {
      const queryKw = JSON.parse(JSON.stringify(this.query))
      queryKw.dimension = 16
      const queryKwSystem = JSON.parse(JSON.stringify(this.query))
      queryKwSystem.dimension = 16
      const queryKwFlux = JSON.parse(JSON.stringify(this.query))
      queryKwFlux.dimension = 16

      // getCommonPageDetail(queryKw).then(response => {
      //   const data = response.data.records
      //   if (data === null || data === undefined) {
      //     this.elTableList[0].data = {}
      //   } else {
      //     this.elTableList[0].data = data
      //   }
      //   this.$refs.kwTable.fetchData()
      // })
      // getCommonPageDetail(queryKwSystem).then(response => {
      //   const data = response.data.records
      //   if (data === null || data === undefined) {
      //     this.elTableList[1].data = {}
      //   } else {
      //     this.elTableList[1].data = data
      //   }
      //   this.$refs.kwSystemTable.fetchData()
      // })
      getCommonPageDetail(queryKwFlux).then(response => {
        const data = response.data.records
        if (data === null || data === undefined) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.kwFluxTable.fetchData()
      })
    }
  }
}
</script>
