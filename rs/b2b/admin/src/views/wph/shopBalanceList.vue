<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        店铺名称：<el-input v-model="listQuery.keyword" style="width:120px"></el-input>
        <el-button type="primary" @click="getList()">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column :label="$t('table.shopId')" width="80" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shopId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.balance')" width="80" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shopLogo')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.shop.logo" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shopInfo')" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>店铺名称  : {{ scope.row.shop.name }}</p>
                <p>公司地址: {{ scope.row.shop.corporateAddress }}</p>
                <p>所有者ID: {{ scope.row.shop.userId }}</p>
                <p>销售区域名称: {{ scope.row.shop.areaName }}</p>
                <p>销售区域编码: {{ scope.row.shop.areaCode }}</p>
                <p>创建时间: {{ scope.row.shop.createTime }}</p>
                <p>纬度: {{ scope.row.shop.lat }}</p>
                <p>经度: {{ scope.row.shop.lng }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.shop.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" v-if="scope.row.status === 2000">已通过</el-button>
              <el-button size="mini" type="warning" v-if="scope.row.status === 1001">已拒绝</el-button>
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row, 'deductions')">查看扣点记录</el-button>
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row, 'recharge')">查看充值记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination 
          background 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="listQuery.page" 
          :page-sizes="[10,20,30, 50]" 
          :page-size="listQuery.pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <el-table :data="dialogList">
        <el-table-column label="id" width="80" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.shopId')" width="80" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.shopId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.createTime')" width="180" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.orderNo')" width="180" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.balanceMoney')" width="180" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination 
        background 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="dialogListQuery.page" 
        :page-sizes="[10,20,30, 50]" 
        :page-size="dialogListQuery.pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="dialogTotal">
        </el-pagination>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { getUserBalanceList, getUserBalanceShopListDeductions, getUserBalanceShopListRecharge } from '@/api/a_api'

const auditTypeOptions = [
  { key: '1000', display_name: '待审核' },
  { key: '1001', display_name: '审核不通过' },
  { key: '2000', display_name: '审核通过' }
]
const auditTypeKeyValue = auditTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'shopBalanceList',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        keyword: null,
        title: null,
        type: null,
        sort: null,
        startTime: null,
        endTime: null
      },
      dialogTitle: null,
      dialogList: null,
      dialogTotal: null,
      dialogType: null,
      dialogListQuery: {
        page: 1,
        pageSize: 20,
        keyword: null,
        title: null,
        type: null,
        sort: null,
        startTime: null,
        endTime: null
      },
      dialogVisible: false,
      tempForm: {
        id: '',
        status: '2000',
        failMsg: '',
        timestamp: new Date(),
        fromTitle: '审核',
        name: '',
        displayDiagram: '',
        brand: '',
        subBrand: '',
        weight: '',
        code: '',
        createTime: '',
        auditingTime: null,
        updateTime: null,
        detail: null,
        submitterId: null,
        disabled: true,
        isOperate: true
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状结果', trigger: 'blur' }
        ],
        failMsg: [
          { required: true, message: '请输入不通过理由', trigger: 'blur' }
        ],
        classifySet: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  filters: {
    aduitStatusFilter(status) {
      return auditTypeKeyValue[status]
    }
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      getUserBalanceList(params).then(res => {
        // console.log(res, 'getUserBalanceList')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          this.list = res.data.records
        }
      })
    },
    getDialogList() {
      const params = {}
      params.page = this.dialogListQuery.page
      params.pageSize = this.dialogListQuery.pageSize
      params.shopId = this.dialogListQuery.shopId
      // console.log(params, 'params')
      if (this.dialogType === 'deductions') {
        this.dialogTitle = '店铺扣点记录'
        getUserBalanceShopListDeductions(params).then(res => {
          // console.log(res, 'getUserBalanceShopListDeductions')
          if (res.code === 200) {
            this.dialogTotal = res.data.total
            this.dialogListQuery.page = res.data.current
            this.dialogListQuery.pageSize = res.data.size
            this.dialogList = res.data.records
            this.dialogVisible = true
          }
        })
      } else if (this.dialogType === 'recharge') {
        this.dialogTitle = '店铺充值记录'
        getUserBalanceShopListRecharge(params).then(res => {
          console.log(res, 'getUserBalanceShopListRecharge')
          if (res.code === 200) {
            this.dialogTotal = res.data.total
            this.dialogListQuery.page = res.data.current
            this.dialogListQuery.pageSize = res.data.size
            this.dialogVisible = true
          }
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDialogSizeChange(val) {
      this.DialogListQuery.pageSize = val
      this.getDialogList()
    },
    handleDialogCurrentChange(val) {
      this.DialogListQuery.page = val
      this.getDialogList()
    },
    seeAbout(index, row, type) {
      this.dialogListQuery = {
        page: 1,
        pageSize: 20,
        title: undefined,
        type: undefined,
        sort: '+id',
        shopId: row.shopId
      }
      this.dialogType = type
      this.getDialogList()
    },
    closeTempForm() {
      this.dialogVisible = false
      this.resetForm()
    }
  }
}
</script>

<style scoped>
.tableImg,
.formImg {
  height: 100px;
  display: block;
  margin: 0 auto;
}
.filePathImg,.productSetails >>> .detailImg{
  display: block;
  width: 100%;
  margin:0 auto 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
