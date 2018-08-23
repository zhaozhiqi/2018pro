<template>
  <div class="app-container">
    <el-form :model="aSpotCat" ref="aSpotCatForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="扣点比例设置（%）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="aSpotCat.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('aSpotCatForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, postSetOrderDeductionsRatio } from '@/api/a_api'

export default {
  name: 'aSpotCatSetting',
  data() {
    return {
      aSpotCat: {
        value: null
      },
      comRules: [{ required: true, message: '该项不能为空' }, { type: 'number', message: '该项必须为数字值' }]
    }
  },
  components: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      getSetting().then(res => {
        // console.log(res, 'res')
        if (res.code === 200) {
          this.aSpotCat.value = res.data.orderDeductionsRatio
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postSetOrderDeductionsRatio(this.aSpotCat.value).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.init()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
