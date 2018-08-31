<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-button type="primary" @click="openAddProductFrom()">新增产品入库</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.manufacturerName')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.manufacturerName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.filePath')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.filePath" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.productId')" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.productId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.userId')" width="120" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shopName')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shop.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.status')" width="180" align='center'>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-if="scope.row.status === 1000">待审核</el-button>
              <el-button size="mini" type="success" v-if="scope.row.status === 2000">已通过</el-button>
              <el-button size="mini" type="warning" v-if="scope.row.status === 1001">已拒绝</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 展示详情 dialog -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="auditFormVisible" width="70%">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <el-form-item :label="$t('table.filePath')">
          <img :src="tempForm.filePath" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.manufacturerName')">
          <span>{{tempForm.manufacturerName}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userId')">
          <span>{{tempForm.userId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.productId')">
          <span>{{tempForm.productId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.shopInfo')"><br/> 公司LOGO：
          <img :src="tempForm.logo" class="formImg" /><br/>
          <span>公司ID：{{tempForm.shop.id}}</span><br/>
          <span>公司名称：{{tempForm.shop.name}}</span><br/>
          <span>公司地址：{{tempForm.shop.corporateAddress}}</span><br/>
          <span>销售区域名称：{{tempForm.shop.areaName}}</span><br/>
          <span>销售区域编码：{{tempForm.shop.areaCode}}</span><br/>
          <span>纬度: {{tempForm.shop.lat}}</span><br/>
          <span>经度: {{tempForm.shop.lng}}</span>
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
        <el-form-item :label="$t('table.auditingUserId')" v-if="tempForm.auditingUserId">
          <span>{{tempForm.auditingUserId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeAreaCode ')" v-if="tempForm.authorizeAreaCode">
          <span>{{tempForm.authorizeAreaCode }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeStartTime ')" v-if="tempForm.authorizeStartTime">
          <span>{{tempForm.authorizeStartTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeEndTime  ')" v-if="tempForm.authorizeEndTime">
          <span>{{tempForm.authorizeEndTime }}</span>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.status')">
          <span>{{tempForm.status | aduitStatusFilter }}</span>
        </el-form-item> -->
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
        <el-button @click="closeTempForm()">关 闭</el-button>
        <el-button type="primary" @click="saveAudit('tempForm')" v-if="tempForm.isOperate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增商品类型选择弹窗 dialog -->
    <el-dialog title="新增产品入库" :visible.sync="addChangeDialog" width="500px">
      <el-form :model="addChangeFrom" ref="addChangeFrom" :rules="rules">
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="addChangeFrom.code" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddProductFrom()">关 闭</el-button>
        <el-button type="primary" @click="queryHasProduct('addChangeFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuthorizeInfoAllList, getProductByCode } from '@/api/a_api'

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
  name: 'productAuthorizeList',
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
        manufacturerName: '',
        shop: {
          areaCode: '',
          areaName: '',
          corporateAddress: '',
          createTime: '',
          id: '',
          lat: '',
          lng: '',
          logo: '',
          name: '',
          userId: '',
          valid: ''
        },
        createTime: '',
        auditingTime: null,
        auditingUserId: null,
        authorizeAreaCode: null,
        authorizeStartTime: null,
        authorizeEndTime: null,
        filePath: null,
        productId: null,
        userId: null,
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
        code: [
          { required: true, message: '请输入条码', trigger: 'blur' }
        ]
      },
      addChangeDialog: false,
      addChangeFrom: {
        code: null
      },
      productInfo: null
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
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize
      getAuthorizeInfoAllList(params).then(res => {
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
        manufacturerName: '',
        shop: {
          areaCode: '',
          areaName: '',
          corporateAddress: '',
          createTime: '',
          id: '',
          lat: '',
          lng: '',
          logo: '',
          name: '',
          userId: '',
          valid: ''
        },
        createTime: '',
        auditingTime: null,
        auditingUserId: null,
        authorizeAreaCode: null,
        authorizeStartTime: null,
        authorizeEndTime: null,
        filePath: null,
        productId: null,
        userId: null,
        disabled: true,
        isOperate: true
      }
    },
    seeAbout(index, row) {
      this.handleAudit(index, row, true)
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
    },
    openAddProductFrom() {
      this.addChangeDialog = true
    },
    closeAddProductFrom() {
      this.addChangeDialog = false
    },
    queryHasProduct(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getProductByCode(this.addChangeFrom.code).then(res => {
            console.log(res, 'getProductByCode')
            if (res.code === 200 && res.data) {
              this.productInfo = res.data
              this.$confirm('已查询到该产品，是否现去提交授权信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({ name: 'productAuthorizeAddSave', params: { productId: this.productInfo.id }})
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            } else if (res.code === 200 && !res.data) {
              this.$confirm('尚无该条形码商品，是否现在去新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({ path: '/shop/productAddSave' })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.filePathImg,
.productSetails >>> .detailImg {
  display: block;
  width: 100%;
  margin: 0 auto 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
