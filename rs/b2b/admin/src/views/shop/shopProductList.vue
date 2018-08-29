<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" label-width="80px">
          <el-form-item :label="$t('table.keyWord')">
            <el-input v-model="listQuery.keyword" placeholder="关键词"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('table.id')">
            <el-input v-model="listQuery.id" placeholder="ID"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('table.code')">
            <el-input v-model="listQuery.code" placeholder="条形码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="上架状态">
            <el-select v-model="listQuery.shelfState" placeholder="上架状态">
              <el-option label="未选择" value=""></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="listQuery.status" placeholder="审核状态">
              <el-option label="未选择" value=""></el-option>
              <el-option label="待审核" value=1000></el-option>
              <el-option label="审核通过" value=2000></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="排序类型">
            <el-select v-model="listQuery.sortField" placeholder="排序类型">
              <el-option label="未选择" value=""></el-option>
              <el-option label="按销量" value="hot"></el-option>
              <el-option label="按金额" value="money"></el-option>
              <el-option label="按实际" value="time"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.product.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.displayDiagram')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.product.displayDiagram" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.productName')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.product.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.code')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.product.code }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.createTime')" width="140" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.product.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.product')" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <!-- <p>产品条形码: {{ scope.row.product.code }}</p>
                <p>创建时间: {{ scope.row.product.createTime  }}</p> -->
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
              <span>{{ scope.row.product.status | aduitStatusFilter }}</span>
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

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="formVisible" width="70%" v-if="tempForm">
      <el-form :model="tempForm" ref="tempForm" label-width="200px">
        <el-form-item :label="$t('table.displayDiagram')">
          <img :src="tempForm.product.displayDiagram" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.product.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.productName')">
          <span>{{tempForm.product.name}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.code')">
          <span>{{tempForm.product.code}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.brand')">
          <span>{{tempForm.product.brand}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.subBrand')">
          <span>{{tempForm.product.subBrand}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.weight')">
          <span>{{tempForm.product.weight}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.submitterId')">
          <span>{{tempForm.product.submitterId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <span>{{tempForm.product.status | aduitStatusFilter}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{tempForm.product.createTime}}</span>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.updateTime ')" v-if="tempForm.productAuthorizeInfo.updateTime">
          <span>{{tempForm.productAuthorizeInfo.updateTime}}</span>
        </el-form-item> -->
        <el-form-item :label="$t('table.manufacturerName ')">
          <span>{{tempForm.productAuthorizeInfo.manufacturerName }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.auditingTime')" v-if="tempForm.productAuthorizeInfo.auditingTime">
          <span>{{tempForm.productAuthorizeInfo.auditingTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.auditingUserId')" v-if="tempForm.productAuthorizeInfo.auditingUserId">
          <span>{{tempForm.productAuthorizeInfo.auditingUserId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeAreaCode ')">
          <span>{{tempForm.productAuthorizeInfo.authorizeAreaCode }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.auditFailMsg')" v-if="tempForm.productAuthorizeInfo.failMsg">
          <span>{{tempForm.productAuthorizeInfo.failMsg}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeStartTime')">
          <span>{{tempForm.productAuthorizeInfo.authorizeStartTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeEndTime')">
          <span>{{tempForm.productAuthorizeInfo.authorizeEndTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.productFilePath')">
          <img :src="tempForm.productAuthorizeInfo.filePath " class="formImg" />
        </el-form-item>
        <el-form-item :label="$t('table.images')">
          <div><img :src="item" class="formArrImg" v-for="(item,index) in tempForm.product.images" :key="index" /></div>
        </el-form-item>
        <el-form-item :label="$t('table.productDetail')" v-if="tempForm.product.detail ">
          <div class="productSetails" v-html="tempForm.product.detail"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getShopProductList } from '@/api/a_api'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'

const auditTypeOptions = [
  { key: '1000', display_name: '待审核' },
  { key: '1001', display_name: '审核不通过' },
  { key: '2000', display_name: '审核通过' }
]
const auditTypeKeyValue = auditTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const restrictionsTypeOptions = [
  { key: 1, display_name: '是' },
  { key: 0, display_name: '否' }
]
const restrictionsTypeKeyValue = restrictionsTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const onlineStateFilter = [
  { key: 0, display_name: '未上线' },
  { key: 1, display_name: '上线' }
]
const onlineTypeKeyValue = onlineStateFilter.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'shopProductList',
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
        product: {
          auditingTime: null,
          auditingUserId: null,
          brand: null,
          code: null,
          createTime: 0,
          detail: null,
          displayDiagram: null,
          id: null,
          image: null,
          images: [],
          name: null,
          status: null,
          subBrand: null,
          submitterId: null,
          weight: null
        },
        productAuthorizeInfo: {
          auditingTime: null,
          auditingUserId: null,
          authorizeAreaCode: null,
          authorizeEndTime: null,
          authorizeStartTime: null,
          createTime: null,
          filePath: null,
          id: null,
          manufacturerName: null,
          productId: null,
          status: null,
          userId: null
        },
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
  components: {
    Tinymce,
    editorImage
  },
  created() {
    this.init()
  },
  mounted() {
  },
  filters: {
    aduitStatusFilter(status) {
      return auditTypeKeyValue[status]
    },
    restrictionsStatusFilter(status) {
      return restrictionsTypeKeyValue[status]
    },
    onlineStatusFilter(status) {
      return onlineTypeKeyValue[status]
    }
  },
  methods: {
    init() {
      this.getList()
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.sortField = this.listQuery.sortField
      params.keyword = this.listQuery.keyword
      params.id = this.listQuery.id
      params.status = this.listQuery.status
      params.code = this.listQuery.code
      getShopProductList(params).then(res => {
        // console.log(res, 'getShopProductList')
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
    },
    resetForm() {
      this.tempForm = {
        product: {
          auditingTime: null,
          auditingUserId: null,
          brand: null,
          code: null,
          createTime: 0,
          detail: null,
          displayDiagram: null,
          id: null,
          image: null,
          images: [],
          name: null,
          status: null,
          subBrand: null,
          submitterId: null,
          weight: null
        },
        productAuthorizeInfo: {
          auditingTime: null,
          auditingUserId: null,
          authorizeAreaCode: null,
          authorizeEndTime: null,
          authorizeStartTime: null,
          createTime: null,
          filePath: null,
          id: null,
          manufacturerName: null,
          productId: null,
          status: null,
          userId: null
        },
        isOperate: false
      }
    },
    seeAbout(index, row) {
      this.handleUpdate(index, row, true)
    },
    handleUpdate(index, row, onlyLook) {
      if (onlyLook === true) {
        this.tempForm.isOperate = false
        this.tempForm.disabled = true
        this.tempForm.fromTitle = '查看详情'
      } else {
        this.tempForm.isOperate = true
        this.tempForm.disabled = false
        this.tempForm.fromTitle = '修改信息'
      }
      this.formVisible = true
      this.tempForm = JSON.parse(JSON.stringify(row))
      const images = row.product.image.split(',')
      this.tempForm.product.images = images
      // console.log(this.tempForm, 'this.tempForm')
    },
    closeTempForm() {
      this.formVisible = false
      this.resetForm()
    },
    closeGroupCase() {
      this.groupCaseDialog = false
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
