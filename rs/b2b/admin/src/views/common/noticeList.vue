<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.noticeStatus')" width="180" align='center'>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" v-if="scope.row.isView === 0">{{ scope.row.isView | noticeStatusFilter }}</el-button>
              <el-button size="mini" type="success" v-else>{{ scope.row.isView | noticeStatusFilter }}</el-button>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.noticeCon')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.notice }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.createTime')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.product')" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>产品品牌: {{ scope.row.product.brand }}</p>
                <p>产品子品牌: {{ scope.row.product.subBrand }}</p>
                <p>产品单重: {{ scope.row.product.weight }}</p>
                <p>提交人: {{ scope.row.product.submitterId }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">基本信息</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.auditStatus')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.product.status | noticeStatusFilter }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleAudit(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- Form -->
    <el-dialog title="查看详情" :visible.sync="formVisible" width="50%">
      <el-form :model="tempForm" ref="tempForm">
        <el-form-item label="id">
          <span>{{tempForm.id}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{tempForm.createTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.noticeCon')">
          <span>{{tempForm.notice}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getNoticeList, getNotice } from '@/api/a_api'
import { mapGetters } from 'vuex'

const noticeTypeOptions = [
  { key: 0, display_name: '未读' },
  { key: 1, display_name: '已读' }
]

const noticeTypeKeyValue = noticeTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'noticeList',
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
      },
      formVisible: false,
      tempForm: {
        id: null,
        notice: null,
        createTime: null,
        isOperate: false
      },
      shopInfo: null,
      isDistributor: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.init()
  },
  mounted() {
  },
  filters: {
    noticeStatusFilter(status) {
      return noticeTypeKeyValue[status]
    }
  },
  methods: {
    init() {
      this.getList()
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
      this.$store.dispatch('GetUserNoticeInfo').then(() => {
        console.log('更新未读消息数量')
      }).catch(() => {
        console.log('GetUserNoticeInfo-err')
      })
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize
      params.keyword = this.listQuery.keyword
      getNoticeList(params).then(res => {
        console.log(res, 'getNoticeList')
        if (res.code === 200 && res.data) {
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
    },
    resetForm() {
      this.tempForm = {
        id: null,
        notice: null,
        createTime: null,
        isOperate: false
      }
      this.init()
    },
    handleAudit(index, row) {
      getNotice(row.id).then(res => {
        console.log(res, 'getNotice')
        if (res.code === 200) {
          this.formVisible = true
          this.tempForm = JSON.parse(JSON.stringify(row))
          this.init()
        }
      })
    },
    closeTempForm() {
      this.formVisible = false
      this.resetForm()
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
