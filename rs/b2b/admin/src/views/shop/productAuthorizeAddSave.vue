<template>
  <div class="app-container">
    <div class="form-container">
      <!-- Form -->
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="80px">

        <!-- <el-form-item label="id" width="60">
          <el-input v-model="tempForm.id" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('table.manufacturerName')" prop="manufacturerName">
          <el-input v-model="tempForm.manufacturerName" class="defaultInput"></el-input>
        </el-form-item>
        <!-- <el-form-item  :label="$t('table.authorizeAreaCode')" prop="authorizeAreaCode">
          <el-select v-model="tempForm.authorizeAreaCode" placeholder="请选择授权区域">
            <el-option :label="item.label" :value="item.code" v-if="areaList" v-for="(item, index) in areaList" :key="index"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('table.authorizeFilePath')" prop="filePath">
          <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" :multiple="false" :limit="1" @successCBK="imageSuccessCBKOnly"></editorImage>
          </div><br/>
          <el-input v-model="tempForm.filePath" class="defaultInput" :disabled="true" style="marginTop:10px" placeholder="请点击上传产品展示图"></el-input>
          <img :src="tempForm.filePath" class="formImg" />
        </el-form-item>
        <el-form-item :label="$t('table.authorizeTimeRange')" prop="timeRange">
          <el-date-picker
            v-model="tempForm.timeRange"
            type="datetimerange"
            align="right"
            @change="(value) => setTime(value,tempForm.timeRang)"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAndBack()">取 消</el-button>
        <el-button type="primary" @click="saveAudit('tempForm')">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postAuthorizeInfoSubmit, getShopSalesAreaList } from '@/api/a_api'
import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'

export default {
  name: 'productAuthorizeAddSave',
  data() {
    return {
      fileList: [],
      areaList: null,
      tempForm: {
        productId: '',
        manufacturerName: '',
        filePath: '',
        authorizeAreaCode: null,
        authorizeStartTime: null,
        authorizeEndTime: null,
        timeRange: null
      },
      rules: {
        manufacturerName: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        timeRange: [
          { required: true, message: '请选择授权时间', trigger: 'blur' }
        ],
        authorizeStartTime: [
          { required: true, message: '请选择授权开始时间', trigger: 'blur' }
        ],
        authorizeEndTime: [
          { required: true, message: '请选择授权结束时间', trigger: 'blur' }
        ],
        filePath: [
          { required: true, message: '请上传授权文件', trigger: 'blur' }
        ],
        authorizeAreaCode: [
          { required: true, message: '请选择授权区域品牌', trigger: 'blur' }
        ]
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
  methods: {
    init() {
      this.getAreaList()
      const productId = this.$route.params.productId
      if (productId !== null && productId !== undefined && productId !== '') {
        this.tempForm.productId = this.$route.params.productId
      } else {
        this.$confirm('请选择您要授权的商品', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: false,
          showCancelButton: false
        }).then(() => {
          this.$router.push({ path: '/shop/productAuthorizeList' })
        })
      }
    },
    getAreaList() {
      getShopSalesAreaList().then(res => {
        console.log(res, 'getShopSalesAreaList')
        if (res.code === 200 && res.data) {
          this.areaList = res.data
        }
      })
    },
    handleItemChange(val) {
      // console.log('active item:', val)
    },
    saveAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.tempForm))
          params.timeRange = null
          postAuthorizeInfoSubmit(params).then(res => {
            // console.log(res, 'postProductSave')
            if (res.code === 200) {
              this.$confirm('产品授权信息提交成功，请耐心等候工作人员审核', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                showClose: false,
                showCancelButton: false
              }).then(() => {
                this.$router.push({ path: '/shop/productAuthorizeList' })
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelAndBack() {
      this.$router.push({ path: '/shop/productAuthorizeList' })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 200) {
        this.tempForm.imgUrl = response.data
      }
    },
    imageSuccessCBKOnly(arr) {
      // console.log(arr, 'arr')
      this.tempForm.filePath = arr[0].url
    },
    setTime(value) {
      const timeRang = this.tempForm.timeRange
      if (timeRang.length === 2) {
        console.log(timeRang.length, timeRang[0], timeRang[1])
        this.tempForm.authorizeStartTime = timeRang[0]
        this.tempForm.authorizeEndTime = timeRang[1]
      }
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
  margin: 0;
}
.filePathImg,
.productSetails >>> .detailImg {
  display: block;
  width: 100%;
  margin: 0 auto 10px;
}
.formArrImg {
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
