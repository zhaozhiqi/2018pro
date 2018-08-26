<template>
  <div class="app-container">
    <div class="form-container">
      <!-- Form -->
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="80px">

        <!-- <el-form-item label="id" width="60">
          <el-input v-model="tempForm.id" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('table.code')" prop="code">
          <el-input v-model="tempForm.code" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="tempForm.name" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.brand')" prop="brand">
          <el-input v-model="tempForm.brand" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.subBrand')" prop="subBrand">
          <el-input v-model="tempForm.subBrand" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.weight')" prop="weight">
          <el-input v-model="tempForm.weight" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.displayDiagram')" prop="displayDiagram">
          <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" :multiple="false" :limit="1" @successCBK="imageSuccessCBKOnly"></editorImage>
          </div><br/>
          <el-input v-model="tempForm.displayDiagram" class="defaultInput" :disabled="true" style="marginTop:10px" placeholder="请点击上传产品展示图"></el-input>
          <img :src="tempForm.displayDiagram" class="formImg" />
        </el-form-item>
        <el-form-item :label="$t('table.images')" prop="image">
          <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBKArr"></editorImage>
          </div><br/>
          <el-input v-model="tempForm.image" class="defaultInput" :disabled="true" style="marginTop:10px" placeholder="请点击上传产品主图"></el-input><br/>
          <img :src="item" class="formArrImg" v-for="(item,index) in tempForm.images" :key="index" />
        </el-form-item>

        <div class="editor-container">
          <el-form-item :label="$t('table.proDetail')" prop="detail">
            <el-input v-model="tempForm.detail" class="defaultInput" :disabled="true" placeholder="请在下方图文编辑器中编辑产品详情"></el-input><br/>
          </el-form-item>
          <Tinymce :height=400 ref="editor" v-model="tempForm.detail" /><br/>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAndBack()">取 消</el-button>
        <el-button type="primary" @click="saveAudit('tempForm')">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postProductSave } from '@/api/a_api'
import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'

export default {
  name: 'productAddSave',
  data() {
    return {
      tempForm: {
        code: '',
        name: '',
        image: '',
        images: [],
        displayDiagram: '',
        brand: '',
        subBrand: '',
        weight: '',
        detail: undefined
      },
      rules: {
        code: [
          { required: true, message: '请输入产品条形码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        displayDiagram: [
          { required: true, message: '请上传产品展示图', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传产品主图片', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        subBrand: [
          { required: true, message: '请输入子品牌', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入产品单重', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        detail: [
          { required: true, message: '请编辑产品详情', trigger: 'blur' }
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
    },
    handleItemChange(val) {
      // console.log('active item:', val)
    },
    resetForm() {
      this.tempForm = {
        code: '',
        name: '',
        image: '',
        images: [],
        displayDiagram: '',
        brand: '',
        subBrand: '',
        weight: '',
        detail: undefined
      }
    },
    saveAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.tempForm))
          params.images = null
          postProductSave(params).then(res => {
            // console.log(res, 'postProductSave')
            if (res.code === 200) {
              this.$confirm('产品提交成功，请耐心等候工作人员审核', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
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
