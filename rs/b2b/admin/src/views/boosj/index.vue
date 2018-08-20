<template>
  <div class="app-container">
    <!-- <el-row class="mainI">
      <el-col :span="6" class="squareInfo" v-for="(item, index) in mainIList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="body">
          <div class="bodyItem"><span>全站</span><span class="con">{{item.data.all.con|getAns}}</span><span><i class="iconfont" :class="iconSorX(item.data.all.contrast)"></i>{{contrastAbs(item.data.all.contrast)}}%</span></div>
          <div class="bodyItem"><span>广场舞</span><span class="con">{{item.data.gcw.con|getAns}}</span><span><i class="iconfont" :class="iconSorX(item.data.gcw.contrast)"></i>{{contrastAbs(item.data.gcw.contrast)}}%</span></div>
          <div class="bodyItem"><span>童趣</span><span class="con">{{item.data.baby.con|getAns}}</span><span><i class="iconfont" :class="iconSorX(item.data.baby.contrast)"></i>{{contrastAbs(item.data.baby.contrast)}}%</span></div>
          <div class="bodyItem"><span>酷玩</span><span class="con">{{item.data.cool.con|getAns}}</span><span><i class="iconfont" :class="iconSorX(item.data.cool.contrast)"></i>{{contrastAbs(item.data.cool.contrast)}}%</span></div>
          <div class="bodyItem"><span>其他</span><span class="con">{{item.data.other.con|getAns}}</span><span><i class="iconfont" :class="iconSorX(item.data.other.contrast)"></i>{{contrastAbs(item.data.other.contrast)}}%</span></div>
          <div class="contrast">日同比 <i class="iconfont" :class="iconSorX(item.data.contrast)"></i>{{contrastAbs(item.data.contrast)}}%</div>
        </div>
        <div class="footer">日均流量 {{item.data.avgCount}}</div>
      </el-col>
    </el-row> -->
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

    <div class="elTableOut" style="marginTop: 20px">
      <el-table :data="elTableList[0].data" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.label}}
          </template>
        </el-table-column>
        <el-table-column label="流量（PV）" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.pageView}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.pvContrastRatio)"></i>{{contrastAbs(scope.row.pvContrastRatio)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户（UV）" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.visitorVol}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.uvContrastRatio)"></i>{{contrastAbs(scope.row.uvContrastRatio)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放量（VV）" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.videoView}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.vvContrastRatio)"></i>{{contrastAbs(scope.row.vvContrastRatio)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传量" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.upVol}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.upVolContrastRatio)"></i>{{contrastAbs(scope.row.upVolContrastRatio)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核量" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.checkVol}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.checkVolContrastRatio)"></i>{{contrastAbs(scope.row.checkVolContrastRatio)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户上传" width=160 align=center >
          <template slot-scope="scope">
            {{scope.row.userUpVol}}<br/>
            <span>同比：
              <i class="iconfont" :class="iconSorX(scope.row.userUpVolContrastRatio)"></i>{{contrastAbs(scope.row.userUpVolContrastRatio)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="terminalPie" :pieChartsData='terminalPie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="sourcePie" :pieChartsData='sourcePie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="areaPie" :pieChartsData='areaPie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="visitorPie" :pieChartsData='visitorPie'></pie-chart>
      </div>
    </el-col>

    <div class="tableTitle">视频流量</div><br/>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="channelFluxPie" :pieChartsData='channelFluxPie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="newVideoPie" :pieChartsData='newVideoPie'></pie-chart>
      </div>
    </el-col>

    <el-col :span="12" class="marT20">
      <div class="chart-wrapper">
        <pie-chart ref="oldVideoPie" :pieChartsData='oldVideoPie'></pie-chart>
      </div>
    </el-col>

    <elTableCom ref="videoFluxTable" :elTableData="elTableList[1]"></elTableCom>
    
    <elTableCom ref="columnFluxTable" :elTableData="elTableList[2]"></elTableCom>

    <!-- <elTableCom ref="rankTable" :elTableData="elTableList[3]"></elTableCom> -->
  </div>
</template>

<script>
import { getCommonSyntheticData, getCommonPageDetail, getCommonPie, getDevicePie } from '@/api/boosjAll'
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
  name: 'boosjIndex',
  data() {
    return {
      fullscreenLoading: false,
      query: {
        'channel': 'ALL'
      },
      elTableList: [
        {
          'hasPage': false,
          'title': '总数据',
          'theader': [],
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
          'data': {}
        },
        {
          'hasPage': true,
          'title': '栏目流量排名',
          'theader': [
            tba.seq,
            { 'label': '栏目名称', 'con': 'd4', width: '150', align: 'center' },
            tba.pv,
            tba.uv,
            tba.vv,
            { 'label': '频道', 'con': 'd3', width: '150', align: 'center' }
          ],
          'data': {}
        },
        {
          'hasPage': false,
          'title': '运营综合排名',
          'theader': [],
          'data': {}
        }
      ],
      comAttr: 'uv',
      terminalPie: null,
      sourcePie: null,
      areaPie: null,
      visitorPie: null,
      channelFluxPie: null,
      newVideoPie: null,
      oldVideoPie: null,
      pageInfo: {
        total: null,
        page: 1,
        limit: 5
      },
      listLoading: false
    }
  },
  components: {
    elTableCom,
    LineChart,
    PieChart,
    dateCom,
    deviceCom,
    channelCom,
    attrCom
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
    iconSorX(val) {
      if (parseInt(val) >= 0) {
        return 'admin-shangsheng'
      } else {
        return 'admin-xiajiang'
      }
    },
    contrastAbs(val) {
      const _val = Math.abs(val)
      return _val + '%'
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
      console.log(`当前页: ${val}`)
    },
    getData() {
      this.getPie()
      this.getDetail()
    },
    getPie() {
      const queryTerminal = JSON.parse(JSON.stringify(this.query))
      queryTerminal.dimension = 0
      const querySource = JSON.parse(JSON.stringify(this.query))
      querySource.dimension = 13
      const queryArea = JSON.parse(JSON.stringify(this.query))
      queryArea.dimension = 7
      const queryVisitor = JSON.parse(JSON.stringify(this.query))
      queryVisitor.dimension = 1

      const queryChannelFlux = JSON.parse(JSON.stringify(this.query))
      queryChannelFlux.dimension = 19
      const queryNewVideo = JSON.parse(JSON.stringify(this.query))
      queryNewVideo.dimension = 20
      const queryOldVideo = JSON.parse(JSON.stringify(this.query))
      queryOldVideo.dimension = 21

      getDevicePie(queryTerminal).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.terminalPie = {}
        } else {
          this.terminalPie = data[this.comAttr]
        }
      })
      getCommonPie(querySource).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.sourcePie = {}
        } else {
          this.sourcePie = data[this.comAttr]
        }
      })
      getCommonPie(queryArea).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.areaPie = {}
        } else {
          this.areaPie = data[this.comAttr]
        }
      })
      getCommonPie(queryVisitor).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.visitorPie = {}
        } else {
          this.visitorPie = data[this.comAttr]
        }
      })

      getCommonPie(queryChannelFlux).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.channelFluxPie = {}
        } else {
          this.channelFluxPie = data[this.comAttr]
        }
      })
      getCommonPie(queryNewVideo).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.newVideoPie = {}
        } else {
          this.newVideoPie = data[this.comAttr]
        }
      })
      getCommonPie(queryOldVideo).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.oldVideoPie = {}
        } else {
          this.oldVideoPie = data[this.comAttr]
        }
      })
    },
    getDetail() {
      const querySyntheticData = JSON.parse(JSON.stringify(this.query))
      querySyntheticData.dimension = 0
      querySyntheticData.loadUploadAndAuditingData = 1

      const queryVideoFlux = JSON.parse(JSON.stringify(this.query))
      queryVideoFlux.dimension = 11
      const queryColumnFlux = JSON.parse(JSON.stringify(this.query))
      queryColumnFlux.dimension = 9
      const queryRank = JSON.parse(JSON.stringify(this.query))
      queryRank.dimension = 9

      getCommonSyntheticData(querySyntheticData).then(response => {
        const data = response.data
        if (data === null || data === undefined || data === []) {
          this.elTableList[0].data = {}
        } else {
          this.elTableList[0].data = data
        }
      })

      getCommonPageDetail(queryVideoFlux).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[1].data = {}
        } else {
          this.elTableList[1].data = data
        }
        this.$refs.videoFluxTable.fetchData()
      })

      getCommonPageDetail(queryColumnFlux).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[2].data = {}
        } else {
          this.elTableList[2].data = data
        }
        this.$refs.columnFluxTable.fetchData()
      })

      /* getCommonPageDetail(queryRank).then(response => {
        const data = response.data.records
        if (data === null || data === undefined || data === []) {
          this.elTableList[3].data = {}
        } else {
          this.elTableList[3].data = data
        }
        this.$refs.rankTable.fetchData()
      })*/
    }
  }
}
</script>
