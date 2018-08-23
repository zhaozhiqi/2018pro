<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.displayDiagram')" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.displayDiagram" class="tableImg" />
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.name')" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建时间 : {{ scope.row.brand }}</p>
                <p>组织代码编号: {{ scope.row.corporateCode }}</p>
                <p>联系电话: {{ scope.row.mobile }}</p>
                <p>创建时间: {{ scope.row.createTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.name')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.code')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <!--
          <el-table-column :label="$t('table.corporateCode')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.corporateCode }}</span>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.brand ')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.subBrand ')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.subBrand }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.weight ')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.weight  }}</span>
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
          :page-size="listQuery.limit" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="auditFormVisible" width="70%">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <el-form-item :label="$t('table.displayDiagram')">
          <img :src="tempForm.displayDiagram" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.name')">
          <span>{{tempForm.name}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.code')">
          <span>{{tempForm.code}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.brand')">
          <span>{{tempForm.brand}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.subBrand')">
          <span>{{tempForm.subBrand}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.weight')">
          <span>{{tempForm.weight}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.classifyId ')" v-if="tempForm.classifyId">
          <span>{{tempForm.classifyId }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.submitterId')">
          <span>{{tempForm.submitterId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.auditingUserId')" v-if="tempForm.auditingUserId">
          <span>{{tempForm.auditingUserId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{tempForm.createTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.updateTime')" v-if="tempForm.updateTime">
          <span>{{tempForm.updateTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.auditingTime')" v-if="tempForm.auditingTime">
          <span>{{tempForm.auditingTime}}</span>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.status')">
          <span>{{tempForm.status | aduitStatusFilter }}</span>
        </el-form-item> -->
        <el-form-item :label="$t('table.images')">
          <img :src="item" class="filePathImg" v-for="(item,index) in tempForm.images" :key="index"/>
        </el-form-item>
        <el-form-item :label="$t('table.detail')">
          <div class="productSetails" v-html="tempForm.detail"></div>
        </el-form-item>
        <el-form-item :label="$t('table.audit')" v-if="tempForm.isOperate">
          <el-radio-group v-model="tempForm.status" prop="status">
            <el-radio label="2000">通过</el-radio>
            <el-radio label="1001">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('table.classifyId')" v-if="tempForm.status==='2000' && tempForm.isOperate" prop="classifySet">
          <el-cascader
            :options="classifyList"
            @active-item-change="handleItemChange"
            :props="classifyProps"
            v-model="tempForm.classifySet"
          ></el-cascader>
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
import { postAuthorizeInfoAudit, getAuthorizeInfoAllList, getClassifyAllList } from '@/api/a_api'

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
  name: 'productAuthorizeAudit',
  data() {
    return {
      list: null,
      classifyList: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      auditFormVisible: false,
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
      },
      classifyProps: {
        label: 'label',
        value: 'id',
        children: 'children'
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
      this.getClassifyList()
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.limit
      getAuthorizeInfoAllList(params).then(res => {
        // console.log(res, 'res')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.limit = res.data.size
          this.list = res.data.records
        }
      })
    },
    getClassifyList() {
      const params = {
        page: 1,
        pageSize: 10000
      }
      getClassifyAllList(params).then(res => {
        if (res.code === 200) {
          this.classifyList = res.data.records
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      console.log(val, 'val')
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleItemChange(val) {
      console.log('active item:', val)
    },
    resetForm() {
      this.tempForm = {
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
      }
    },
    seeAbout(index, row) {
      this.handleAudit(index, row, true)
    },
    saveAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            status: this.tempForm.status,
            id: this.tempForm.id
          }
          if (this.tempForm.status === '2000') {
            if (this.tempForm.classifySet.length < 2) {
              this.$message({
                message: '请选择正确的分类或请工作人员完善分类',
                type: 'error'
              })
              return false
            } else {
              params.classifyId = this.tempForm.classifySet[1]
            }
          } else if (this.tempForm.status === '1001') {
            params.failMsg = this.tempForm.failMsg
          }
          postAuthorizeInfoAudit(params).then(res => {
            console.log(res, 'res')
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.init()
              this.closeTempForm()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAudit(index, row, onlyLook) {
      if (onlyLook === true) {
        this.tempForm.isOperate = false
      } else {
        this.tempForm.isOperate = true
      }
      this.auditFormVisible = true
      for (const item in row) {
        if (item === 'image') {
          const images = row[item].split(',')
          this.tempForm.images = images
        } else if (item !== 'status') {
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
}
.filePathImg,.productSetails >>> .detailImg{
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
