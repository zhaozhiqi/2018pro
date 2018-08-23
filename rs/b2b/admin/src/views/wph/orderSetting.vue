<template>
  <div class="app-container">
    <el-form :model="autoCloseOrder" ref="autoCloseForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="未支付订单自动关闭时长（分钟）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="autoCloseOrder.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('autoCloseForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="autoAffirmOrder" ref="autoAffirmForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="发货后未确认收货订单自动确认时长（天）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="autoAffirmOrder.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('autoAffirmForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="autoTransferOrder" ref="autoTransferForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="用户确认收货后转账至商户时长（天）" prop="value" :rules="comRules">
        <el-input type="number" v-model.number="autoTransferOrder.value" auto-complete="off" style="width:100px"></el-input>
        <el-button type="primary" @click="submitForm('autoTransferForm')">保存</el-button>
        <span>（影响用户退款转账后用户将无法在平台进行退款续联系商户自行处理）</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, postSetAutoCancelOrderTime, postSetAutoConfirmedOrderTime, postSetAutoTransferAccountsTime } from '@/api/a_api'

export default {
  name: 'orderSetting',
  data() {
    return {
      autoCloseOrder: {
        value: 15
      },
      autoAffirmOrder: {
        value: 3
      },
      autoTransferOrder: {
        value: 3
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
          this.autoCloseOrder.value = res.data.autoCancelOrderTime
          this.autoAffirmOrder.value = res.data.autoConfirmedOrderTime
          this.autoTransferOrder.value = res.data.autoTransferAccountsTime
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'autoCloseForm':console.log('autoCloseForm')
              postSetAutoCancelOrderTime(this.autoCloseOrder.value).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.init()
                }
              })
              break
            case 'autoAffirmForm':console.log('autoAffirmForm')
              postSetAutoConfirmedOrderTime(this.autoAffirmOrder.value).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.init()
                }
              })
              break
            case 'autoTransferForm':console.log('autoTransferForm')
              postSetAutoTransferAccountsTime(this.autoTransferOrder.value).then(res => {
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
