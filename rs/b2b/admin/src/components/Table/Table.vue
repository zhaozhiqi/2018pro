<template>
  <div class="elTableOut">
    <label class="tableTitle" v-if="elTableData.title">{{elTableData.title}}</label>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column :label=item.label :width=item.width :align=item.align v-for="(item, index) in elTableData.theader" :key="index">
        <template slot-scope="scope">
          {{scope.row[item.con]}}<br/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-show="elTableData.hasPage">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableCom',
  data() {
    return {
      list: null,
      pageInfo: {
        total: null,
        page: 1,
        limit: 5
      },
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      query: {
        'dateType': 'YESTERDAY',
        'channel': 'ALL'
      },
      listLoading: true,
      getList: null
    }
  },
  props: {
    elTableData: {
      type: Object,
      default: function() {
        return {
          'hasPage': true,
          'title': '12',
          'data':
          [
            {
              'id': '450000200706197803',
              'domin': 'www.boosj.com',
              'pv': '12000',
              'uv': '13000',
              'ip': '192.168.18.100',
              'per_capita': '14000',
              'pv_percent': '80%'
            }
          ]
        }
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
    console.log(this.elTableData, 'table')
  },
  methods: {
    fetchData() {
      this.list = this.elTableData.data
      this.pageInfo.total = this.list.length
      this.listLoading = false
      // this.listLoading = true
      // this.listQuery.type = this.table.date
      // getList(this.query).then(response => {
      //   /* this.total = response.data.items.length
      //   this.list = response.data.items.filter((item, index) => index < this.listQuery.limit * this.listQuery.page && index >= this.listQuery.limit * (this.listQuery.page - 1)) */
      //   console.log(response.data, 'response')
      //   this.getList = 1
      //   this.listLoading = false
      // }).catch((error) => {
      //   console.log('error', error)
      // })
      // console.log(this.listQuery.type, '更新数据', this.table.label)
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
    }
  }
}
</script>
