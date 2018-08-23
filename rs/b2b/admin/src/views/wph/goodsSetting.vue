<template>
  <div class="app-container">
    <el-form :model="groupDiscounts" ref="groupDiscountsForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="拼团优惠比例设置（%）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="groupDiscounts.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('groupDiscountsForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="visibleDistance" ref="visibleDistanceForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="B2C用户商品可见范围（公里）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="visibleDistance.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('visibleDistanceForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, postSetGroupPurchasePreferentialRatio, postSetB2CGoodsRange } from '@/api/a_api'

export default {
  name: 'goodsSetting',
  data() {
    return {
      groupDiscounts: {
        value: null
      },
      visibleDistance: {
        value: 1
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
          this.groupDiscounts.value = res.data.groupPurchasePreferentialRatio
          this.visibleDistance.value = res.data.goodsB2CRange
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'groupDiscountsForm':console.log('groupDiscountsForm')
              postSetGroupPurchasePreferentialRatio(this.groupDiscounts.value).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.init()
                }
              })
              break
            case 'visibleDistanceForm':console.log('visibleDistanceForm')
              postSetB2CGoodsRange(this.visibleDistance.value).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.init()
                }
              })
              break
            default:
              break
          }
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
