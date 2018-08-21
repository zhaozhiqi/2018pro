<template>
  <div class="app-container">
    <!-- <el-upload
      class="upload-demo"
      action="http://demo.lbsrj.cn/c-api/image/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList2"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <!-- Table -->
      <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog>

      <!-- Form -->
      <el-button type="text" @click="editBannerVisible = true">打开嵌套表单的 Dialog</el-button>

      <el-dialog title="新增轮播图" :visible.sync="editBannerVisible">
        <el-form :model="tempForm" ref="bannerForm" :rules="rules" >
          <el-form-item label="链接" label-width="80px" prop="name">
            <el-input v-model="tempForm.link" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片路径" label-width="80px" prop="must">
            <el-input v-model="tempForm.imgUrl" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            action="http://demo.lbsrj.cn/c-api/image/upload"
            ref="upload"
            :show-file-list= false
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip" style="marginLeft:10px">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
          <img class="tempUrlImg" :src="tempForm.imgUrl">
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editBannerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBanner('bannerForm')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
// import { getCommonSyntheticData, getCommonPageDetail, getCommonPie, getDevicePie } from '@/api/boosjAll'

export default {
  name: 'indexBanner',
  data() {
    return {
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      editBannerVisible: false,
      tempForm: {
        id: '',
        type: '',
        link: '',
        imgUrl: '',
        timestamp: new Date()
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        must: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px' }
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 200) {
        this.tempForm.imgUrl = response.data
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    saveBanner(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editBannerVisible = false
          this.$refs['bannerForm'].clearValidate()
          alert('submit!')
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
.tempUrlImg{
  height: 200px;
  display: block;
  margin: 20px auto 0
}
</style>
