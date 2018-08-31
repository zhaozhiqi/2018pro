<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
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
          <el-table-column :label="$t('table.balanceMoney')" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.money | priceFormat}}</span>
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
</div>
</template>

<script>
import { getShop, getUserBalanceShopListDeductions } from '@/api/a_api'

export default {
  name: 'shopDeductionsRecord',
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
      shopInfo: null
    }
  },
  components: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getShop().then(res => {
        // console.log(res, 'getShop')
        if (res.code === 200) {
          this.shopInfo = res.data
          this.listQuery.shopId = res.data.id
        }
      }).then(() => {
        const params = JSON.parse(JSON.stringify(this.listQuery))
        getUserBalanceShopListDeductions(params).then(res => {
          // console.log(res, 'getUserBalanceList')
          if (res.code === 200) {
            this.total = res.data.total
            this.listQuery.page = res.data.current
            this.listQuery.pageSize = res.data.size
            this.list = res.data.records
          }
        })
      })
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
