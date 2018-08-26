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
          <el-table-column :label="$t('table.displayDiagram')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.product.displayDiagram" class="tableImg" />
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.goodTitle')" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建时间 : {{ scope.row.brand }}</p>
                <p>组织代码编号: {{ scope.row.corporateCode }}</p>
                <p>联系电话: {{ scope.row.mobile }}</p>
                <p>创建时间: {{ scope.row.createTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.goodTitle')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.code')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.goodMoney')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shelfState')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shelfState | shelfStatusFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row)">查看详情</el-button>
              <el-button size="mini" type="primary" @click="handleAudit(scope.$index, scope.row, false)">修改信息</el-button>
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
    <el-dialog :title="tempForm.fromTitle" :visible.sync="formVisible" width="70%" v-if="tempForm">
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t('table.displayDiagram')">
          <img :src="tempForm.product.displayDiagram" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.goodTitle')" prop="title">
          <el-input v-model="tempForm.title" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="tempForm.code" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodMoney')" prop="money">
          <el-input type="number" v-model.number="tempForm.money" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.retailPrice')" prop="retailPrice">
          <el-input type="number" v-model.number="tempForm.retailPrice" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodStock')" prop="stock">
          <el-input type="number" v-model.number="tempForm.stock" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.specifications')" prop="specifications">
          <el-input v-model="tempForm.specifications" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.unit')" prop="unit">
          <el-input v-model="tempForm.unit" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.classifyId')" v-if="!tempForm.disabled" prop="classifySet">
          <el-cascader
            :options="classifyList"
            @active-item-change="handleItemChange"
            :props="classifyProps"
            v-model="tempForm.classifySet"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('table.classifyList')" v-else>
          <el-input v-model="tempForm.classify.label" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('table.shelfState')" prop="shelfState">
          <el-select v-model="tempForm.shelfState" placeholder="请选择上架状态">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.images')" prop="image">
          <div class="editor-custom-btn-container" v-show="!tempForm.disabled">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBKArr"></editorImage>
          </div><br/>
          <el-input v-model="tempForm.image" class="defaultInput" :disabled="true" style="marginTop:10px" placeholder="请点击上传产品主图" v-show="!tempForm.disabled"></el-input><br/>
          <img :src="item" class="formArrImg" v-for="(item,index) in tempForm.images" :key="index" />
        </el-form-item> -->
        <div class="editor-container" v-if="!tempForm.disabled">
          <el-form-item :label="$t('table.proDetail')" prop="summary">
            <el-input v-model="tempForm.summary" class="defaultInput" :disabled="true" placeholder="请在下方图文编辑器中编辑产品详情"></el-input><br/>
          </el-form-item>
          <Tinymce :height=400 ref="editor" v-model="tempForm.summary" /><br/>
        </div>
        <el-form-item :label="$t('table.detail')" prop="detail" v-else>
          <div class="productSetails" v-html="tempForm.product.detail"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">关 闭</el-button>
        <el-button type="primary" @click="update('tempForm')" v-if="tempForm.isOperate">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreGoodsList, getShopClassifyAllList, postBatchUpdata } from '@/api/a_api'
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

const shelfTypeOptions = [
  { key: 0, display_name: '下架' },
  { key: 1, display_name: '上架' }
]
const shelfTypeKeyValue = shelfTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'goodsManage',
  data() {
    return {
      list: null,
      classifyList: null,
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
      formVisible: false,
      tempForm: {
        id: '',
        title: '',
        summary: '',
        code: '',
        createTime: '',
        stock: null,
        money: null,
        retailPrice: null,
        unit: null,
        shelfState: '',
        disabled: true,
        product: {
          displayDiagram: ''
        },
        classify: {
          label: ''
        },
        isOperate: true
      },
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入商品简介', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入商品条形码', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        money: [
          { required: true, message: '请输入商品金额', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        retailPrice: [
          { required: true, message: '请输入商品建议零售价', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        specifications: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入商品单位', trigger: 'blur' }
        ],
        images: [
          { required: true, message: '请上传商品主图片', trigger: 'blur' }
        ],
        shelfState: [
          { required: true, message: '请选择上架状态', trigger: 'blur' }
        ],
        classifySet: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ]
      },
      shopInfo: null,
      classifyProps: {
        label: 'label',
        value: 'id',
        children: 'children'
      }
    }
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
    shelfStatusFilter(status) {
      return shelfTypeKeyValue[status]
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
      params.pageSize = this.listQuery.pageSize
      getStoreGoodsList(params).then(res => {
        console.log(res, 'getStoreGoodsList')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          this.list = res.data.records
        }
      })
    },
    getClassifyList() {
      const params = {
        page: 1,
        pageSize: 10000
      }
      getShopClassifyAllList(params).then(res => {
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
        title: '',
        summary: '',
        code: '',
        createTime: '',
        stock: null,
        money: null,
        retailPrice: null,
        unit: null,
        shelfState: '',
        disabled: true,
        isOperate: true
      }
    },
    seeAbout(index, row) {
      this.handleAudit(index, row, true)
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.ids = [this.tempForm.id]
          params.title = this.tempForm.title
          params.code = this.tempForm.code
          params.stock = this.tempForm.stock
          params.money = this.tempForm.money
          params.retailPrice = this.tempForm.retailPrice
          params.specifications = this.tempForm.specifications
          params.unit = this.tempForm.unit
          params.summary = this.tempForm.summary
          params.shelfState = this.tempForm.shelfState
          console.log(params, 'params', typeof (params))

          // const params = {
          //   ids: [this.tempForm.id],
          //   title: this.tempForm.title,
          //   code: this.tempForm.code,
          //   stock: this.tempForm.stock,
          //   money: this.tempForm.money,
          //   retailPrice: this.tempForm.retailPrice,
          //   specifications: this.tempForm.specifications,
          //   unit: this.tempForm.unit,
          //   summary: this.tempForm.product.detail,
          //   shelfState: this.tempForm.specifications
          // }
          // if (this.tempForm.classifySet.length < 2) {
          //   this.$message({
          //     message: '请选择正确的分类或请工作人员完善分类',
          //     type: 'error'
          //   })
          //   return false
          // } else {
          //   params.classifyId = this.tempForm.classifySet[1]
          // }

          postBatchUpdata(params).then(res => {
            console.log(res, 'res')
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              // this.init()
              // this.closeTempForm()
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
        this.tempForm.disabled = true
        this.tempForm.fromTitle = '查看详情'
      } else {
        this.tempForm.isOperate = true
        this.tempForm.disabled = false
        this.tempForm.fromTitle = '修改信息'
      }
      this.formVisible = true
      for (const item in row) {
        if (item === 'image') {
          const images = row[item].split(',')
          this.tempForm.images = images
        } else if (item !== 'status') {
          this.tempForm[item] = row[item]
        }
      }
      this.tempForm.classifySet = [this.tempForm.classify.parentId, this.tempForm.classifyId]
      this.tempForm.summary = this.tempForm.product.detail
      this.tempForm.shelfState = this.tempForm.shelfState + ''
    },
    closeTempForm() {
      this.formVisible = false
      // this.resetForm()
    },
    imageSuccessCBKOnly(arr) {
      // console.log(arr, 'arr')
      this.tempForm.displayDiagram = arr[0].url
    },
    imageSuccessCBKArr(arr) {
      arr.forEach(item => {
        this.tempForm.images.push(item.url)
      })
      const Arr = this.tempForm.images
      this.tempForm.image = Arr.join(',')
    }
  }
}
</script>

<style scoped>
.defaultInput {
  width: 400px;
}
.formArrImg{
  height: 200px;
  margin: 10px;
}
.tableImg,
.formImg {
  height: 100px;
  display: block;
  margin: 0;
}
.filePathImg,.productSetails >>> .detailImg{
  width: 200px;
  margin:10px;
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
