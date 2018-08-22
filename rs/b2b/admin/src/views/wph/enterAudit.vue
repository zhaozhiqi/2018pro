<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-button type="primary" @click="editBanner('add')">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="enterList" style="width: 100%">
          <el-table-column label="id" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.corporateLogo')" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.corporateLogo" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.corporateName')" width="180">
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
          <el-table-column :label="$t('table.corporateType')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.filePath')" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.filePath" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.filePath')" width="180">
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
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="auditFormVisible">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <el-form-item :label="$t('table.audit')">
          <el-radio-group v-model="tempForm.status" prop="status">
            <el-radio label="2000" >通过</el-radio>
            <el-radio label="1001">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('table.auditFailMsg')" v-if="tempForm.status==='1001'" prop="failMsg">
          <el-input type="textarea" v-model="tempForm.failMsg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">取 消</el-button>
        <el-button type="primary" @click="saveBanner('tempForm')">确 定</el-button>
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
      auditFormVisible: false,
      enterList: [],
      tempForm: {
        id: '',
        status: '2000',
        failMsg: '',
        timestamp: new Date(),
        fromTitle: '审核'
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
      this.getEnterList()
    },
    getEnterList() {
      getBusinessEnterAuditList().then(res => {
        console.log(res, 'res')
        if (res.code === 200) {
          this.enterList = res.data.records
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    saveBanner(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auditFormVisible = false
          // this.$refs['bannerForm'].clearValidate()
          const params = {
            title: this.tempForm.title,
            link: this.tempForm.link,
            image: this.tempForm.imgUrl
          }
          if (this.tempForm.type === 'add') {
            postHomeBannerSave(params).then(res => {
              // console.log(res, 'res')
              if (res.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('bannerForm')
              }
            })
          } else if (this.tempForm.type === 'edit') {
            params.id = this.tempForm.id
            postHomeBannerUpdateInfo(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.init()
                this.resetForm('bannerForm')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAudit(index, row) {
      this.auditFormVisible = true
      this.tempForm.id = row.id
    },
    closeTempForm() {
      this.auditFormVisible = false
      this.resetForm('bannerForm')
    }
  }
}
</script>

<style scoped>
.tableImg {
  height: 100px;
  display: block;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
