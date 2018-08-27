<template>
  <div class="app-container">
    <div class="form-container">
      <!-- Form -->
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="200px">
        <!-- <el-form-item label="id" width="60">
          <el-input v-model="tempForm.id" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('table.goodTitle')" prop="title">
          <el-input v-model="tempForm.title" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="tempForm.code" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodSummary')" prop="summary">
          <el-input v-model="tempForm.summary" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodStock')" prop="stock">
          <el-input type="number" v-model.number="tempForm.stock" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodMoney')" prop="money">
          <el-input type="number" v-model.number="tempForm.money" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.retailPrice')" prop="retailPrice">
          <el-input type="number" v-model.number="tempForm.retailPrice" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.specifications')" prop="specifications">
          <el-input v-model="tempForm.specifications" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.unit')" prop="unit">
          <el-input v-model="tempForm.unit" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.batchNumbersAdd')" v-if="isDistributor" prop="batchNumber">
          <el-input v-model="tempForm.batchNumber" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodclassify')" prop="classifySet">
          <el-cascader
            :options="classifyList"
            @active-item-change="handleItemChange"
            :props="classifyProps"
            v-model="tempForm.classifySet"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('table.salesAreaCode')" prop="salesAreaCodeList">
          <el-select v-model="tempForm.salesAreaCodeList" multiple placeholder="店铺可销售区域">
            <el-option
              v-for="(item, index) in salesAreaList"
              :key="index"
              :label="item.label"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态" prop="shelfState">
          <el-select v-model="tempForm.shelfState" placeholder="上架状态">
            <el-option label="未选择" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>

        <!-- <div class="editor-container">
          <el-form-item :label="$t('table.proDetail')">
            <el-input v-model="tempForm.detail" class="defaultInput" :disabled="true" placeholder="请在下方图文编辑器中编辑产品详情"></el-input><br/>
          </el-form-item>
          <Tinymce :height=400 ref="editor" v-model="tempForm.detail" /><br/>
        </div> -->

      </el-form>
      <div slot="footer" class="dialog-footer" style="paddingLeft:200px">
        <el-button @click="cancelAndBack()">取 消</el-button>
        <el-button type="primary" @click="saveGood('tempForm')">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postBatchSave, getShopClassifyAllList, getShopSalesAreaList } from '@/api/a_api'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'

export default {
  name: 'goodAddSave',
  data() {
    return {
      classifyList: [],
      salesAreaList: [],
      tempForm: {
        productId: null,
        batchNumber: '',
        batchNumbers: [],
        salesAreaCodeList: [],
        title: '',
        summary: '',
        code: '',
        stock: '',
        money: 0,
        retailPrice: 0,
        shopClassifyId: '',
        specifications: '',
        unit: '',
        shelfState: '',
        detail: undefined
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
          { required: true, message: '请输入商品库存', trigger: 'blur' }
        ],
        specifications: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入商品单位', trigger: 'blur' }
        ],
        shelfState: [
          { required: true, message: '请选择上架状态', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入商品金额', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        retailPrice: [
          { required: true, message: '请输入商品建议零售价', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        salesAreaCodeList: [
          { required: true, message: '请选择销售区域', trigger: 'blur' }
        ],
        classifySet: [
          { required: true, message: '请选择店铺分类', trigger: 'blur' }
        ],
        batchNumber: [
          { required: true, message: '请选择填写商品批号', trigger: 'blur' }
        ]
      },
      classifyProps: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      isDistributor: false
    }
  },
  components: {
    Tinymce,
    editorImage
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
  methods: {
    init() {
      const productId = this.$route.params.productId
      if (productId !== null && productId !== undefined && productId !== '') {
        this.tempForm.productId = this.$route.params.productId
      } else {
        this.$confirm('请选择产品后新增商品', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: false,
          showCancelButton: false
        }).then(() => {
          this.$router.push({ path: '/shop/goodsManage' })
        })
      }
      this.getClassifyList()
      this.getSalesAreaList()
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
    },
    getClassifyList() {
      const params = {
        page: 1,
        pageSize: 10000
      }
      getShopClassifyAllList(params).then(res => {
        console.log(res, 'getShopClassifyAllList')
        if (res.code === 200) {
          this.classifyList = res.data.records
        }
      })
    },
    getSalesAreaList() {
      getShopSalesAreaList().then(res => {
        console.log(res, 'getShopSalesAreaList')
        if (res.code === 200) {
          this.salesAreaList = res.data
        }
      })
    },
    resetForm() {
      this.tempForm = {
        productId: null,
        batchNumber: '',
        batchNumbers: [],
        salesAreaCodeList: [],
        title: '',
        code: '',
        stock: '',
        money: '',
        retailPrice: '',
        shopClassifyId: '',
        specifications: '',
        unit: '',
        shelfState: '',
        detail: undefined
      }
    },
    saveGood(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          if (this.isDistributor === true) {
            if (this.tempForm.batchNumber === '') {
              this.$message({
                message: '调整库存请填写批号',
                type: 'error'
              })
              return
            }
            if (this.tempForm.batchNumber.indexOf(',') !== -1) {
              this.tempForm.batchNumbers = this.tempForm.batchNumber.split(',')
            } else {
              this.tempForm.batchNumbers = [this.tempForm.batchNumber]
            }
            params.append('batchNumbers', this.tempForm.batchNumbers)
          }
          params.append('productId', this.tempForm.productId)
          params.append('salesAreaCodeList', [this.tempForm.salesAreaCodeList])
          params.append('title', this.tempForm.title)
          params.append('summary', this.tempForm.summary)
          params.append('code', this.tempForm.code)
          params.append('stock', this.tempForm.stock)
          params.append('money', this.tempForm.money)
          params.append('retailPrice', this.tempForm.retailPrice)
          params.append('specifications', this.tempForm.specifications)
          params.append('unit', this.tempForm.unit)
          if (this.tempForm.classifySet.length < 2) {
            this.$message({
              message: '请选择正确的分类或请工作人员完善分类',
              type: 'error'
            })
            return false
          } else {
            params.append('shopClassifyId', this.tempForm.classifySet[1])
          }
          params.append('shelfState', this.tempForm.shelfState)
          postBatchSave(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.$router.push({ path: '/shop/goodsManage' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelAndBack() {
      this.$router.push({ path: '/shop/goodsManage' })
    },
    handleItemChange(val) {
      console.log('active item:', val)
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
.form-container {
  width: 80%;
}
.defaultInput {
  width: 200px;
}
.tableImg,
.formImg {
  height: 100px;
  display: block;
  margin: 0 ;
}
.filePathImg,
.productSetails >>> .detailImg {
  display: block;
  width: 100%;
  margin: 0 auto 10px;
}
.formArrImg{
  height: 200px;
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
