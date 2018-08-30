<template>
  <div class="app-container">
    <!-- <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" label-width="80px">
          <el-form-item :label="$t('table.keyWord')">
            <el-input v-model="listQuery.keyword" placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.headThumb')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.headThumb" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.name')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.mobile')" width="120" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.inviteCode')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.inviteCode }}</span>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.type')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.type | userTypeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.createTime')">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserInvitingList } from '@/api/a_api'
import { mapGetters } from 'vuex'

const userTypeStateFilter = [
  { key: 'C', display_name: '消费者' },
  { key: 'D', display_name: '经销商' },
  { key: 'W', display_name: '批发商' },
  { key: 'R', display_name: '零售商' }
]
const userTypeKeyValue = userTypeStateFilter.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'incitingUserList',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        keyword: null,
        sort: null,
        startTime: null,
        endTime: null,
        sortField: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  filters: {
    userTypeFilter(status) {
      return userTypeKeyValue[status]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize
      params.keyword = this.listQuery.keyword
      getUserInvitingList(params).then(res => {
        console.log(res, 'getUserInvitingList')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          this.list = res.data.records
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      console.log(val, 'handleSizeChange')
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
.defaultInput {
  width: 400px;
}
.formArrImg {
  height: 200px;
  margin: 10px;
}
.tableImg {
  height: 100px;
  display: block;
  margin: 0 auto;
}

.formImg {
  height: 100px;
  display: block;
  margin: 0;
}
.filePathImg,
.productSetails >>> .detailImg {
  width: 200px;
  margin: 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
.editor-custom-btn-container {
  position: absolute;
  left: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
