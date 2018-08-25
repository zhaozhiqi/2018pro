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
          <el-table-column :label="$t('table.corporateLogo')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.corporateLogo" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.corporateName')" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>公司地址: {{ scope.row.corporateAddress }}</p>
                <p>组织代码编号: {{ scope.row.corporateCode }}</p>
                <p>联系电话: {{ scope.row.mobile }}</p>
                <p>创建时间: {{ scope.row.createTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.corporateName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.corporateAddress')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.corporateAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.corporateCode')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.corporateCode }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.mobile')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.corporateType')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.filePath')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.filePath" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.auditStatus')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column :label="$t('table.createTime')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleAudit(scope.$index, scope.row)" v-if="scope.row.status === 1000">审核</el-button>
              <el-button size="mini" type="success" v-if="scope.row.status === 2000">已通过</el-button>
              <el-button size="mini" type="warning" v-if="scope.row.status === 1001">已拒绝</el-button>
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row)">查看详情</el-button>
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

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="auditFormVisible" width="70%">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <el-form-item :label="$t('table.corporateLogo')">
          <img :src="tempForm.corporateLogo" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.corporateName')">
          <span>{{tempForm.corporateName}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.corporateAddress')">
          <span>{{tempForm.corporateAddress}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.corporateCode')">
          <span>{{tempForm.corporateCode}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.mobile')">
          <span>{{tempForm.mobile}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.corporateType')">
          <span>{{tempForm.type | typeFilter}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.filePath')">
          <img :src="tempForm.filePath" class="filePathImg" />
        </el-form-item>
        <el-form-item :label="$t('table.audit')" v-if="tempForm.isOperate">
          <el-radio-group v-model="tempForm.status" prop="status">
            <el-radio label="2000">通过</el-radio>
            <el-radio label="1001">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('table.auditFailMsg')" v-if="tempForm.status==='1001' && tempForm.isOperate" prop="failMsg">
          <el-input type="textarea" v-model="tempForm.failMsg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">取 消</el-button>
        <el-button type="primary" @click="saveAudit('tempForm')" v-if="tempForm.isOperate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postBusinessEnterAudit, getBusinessEnterAudit, getBusinessEnterAuditList } from '@/api/a_api'

const enterTypeOptions = [
  { key: 'DISTRIBUTOR', display_name: '经销商' },
  { key: 'WHOLESALER', display_name: '批发商' },
  { key: 'RETAILER', display_name: '零售商' }
]
// arr to obj ,such as { CN : "China", US : "USA" }
const enterTypeKeyValue = enterTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'enterAudit',
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
      auditFormVisible: false,
      tempForm: {
        id: '',
        status: '2000',
        failMsg: '',
        timestamp: new Date(),
        fromTitle: '审核',
        corporateName: '',
        corporateAddress: '',
        corporateCode: '',
        corporateLogo: '',
        createTime: '',
        mobile: '',
        disabled: true
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状结果', trigger: 'blur' }
        ],
        failMsg: [
          { required: true, message: '请输入不通过理由', trigger: 'blur' }
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
    typeFilter(type) {
      return enterTypeKeyValue[type]
    }
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize
      getBusinessEnterAuditList(params).then(res => {
        console.log(res, 'res')
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
      console.log(val, 'val')
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetForm() {
      this.tempForm = {
        id: '',
        status: '2000',
        failMsg: '',
        timestamp: new Date(),
        fromTitle: '审核',
        corporateName: '',
        corporateAddress: '',
        corporateCode: '',
        corporateLogo: '',
        createTime: '',
        mobile: '',
        disabled: true,
        isOperate: true
      }
    },
    seeAbout(index, row) {
      this.handleAudit(index, row, true)
    },
    saveAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auditFormVisible = false
          const params = {
            status: this.tempForm.status,
            id: this.tempForm.id
          }
          postBusinessEnterAudit(params).then(res => {
            console.log(res, 'res')
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.init()
              this.resetForm()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          this.resetForm()
          return false
        }
      })
    },
    handleAudit(index, row, onlyLook) {
      if (onlyLook === true) {
        this.tempForm.isOperate = false
        this.tempForm.fromTitle = '查看详情'
      } else {
        this.tempForm.isOperate = true
        this.tempForm.fromTitle = '审核'
      }
      this.auditFormVisible = true
      for (const item in row) {
        if (item !== 'status') {
          this.tempForm[item] = row[item]
        }
      }
    },
    closeTempForm() {
      this.auditFormVisible = false
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
.filePathImg{
  display: block;
  width: 100%;
  margin: 0 auto;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
