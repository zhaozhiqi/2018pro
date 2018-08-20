<template>
  <div class="elTableOut">
    <label class="tableTitle" v-if="elTableData.title">{{elTableData.title}}</label>
    <el-table :data="list" 
    v-loading.body="listLoading" 
    element-loading-text="Loading" border fit highlight-current-row>
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
      listLoading: false,
      getList: null
    }
  },
  props: {
    elTableData: {
      type: Object,
      default: function() {
        return {
          'hasPage': true,
          'title': '',
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
    /* console.log(this.elTableData, 'table') */
  },
  watch: {
    elTableData: function() {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      /* this.listLoading = true */
      this.pageInfo.total = this.elTableData.data.length
      this.list = this.elTableData.data.filter((item, index) => index < this.listQuery.limit * this.listQuery.page && index >= this.listQuery.limit * (this.listQuery.page - 1))
      /* this.listLoading = false
      console.log(this.elTableData.data, 'this.elTableData.data') */
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
