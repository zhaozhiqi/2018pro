<template>
  <div class="app-container">
    <el-form :model="bankInfo" ref="bankInfoForm" label-width="300px" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('table.encBankNo')" prop="encBankNo">
        <el-input v-model="bankInfo.encBankNo" auto-complete="off" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="再次输入银行卡号" prop="verifyEncBankNo">
        <el-input v-model="bankInfo.verifyEncBankNo" auto-complete="off" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.encTrueName ')" prop="encTrueName">
        <el-input v-model="bankInfo.encTrueName" auto-complete="off" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.bankCode')" prop="bankCode">
        <el-select v-model="bankInfo.bankCode" placeholder="请选择收款方开户行">
          <el-option :label="item.name" :value="item.id" v-if="bankList" v-for="(item, index) in bankList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.createTime')" v-if="bankInfo.createTime">
        <span>{{ bankInfo.createTime }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.updateTime ')" v-if="bankInfo.updateTime">
        <span>{{ bankInfo.updateTime }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('bankInfoForm')">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getShopBankInfo, postShopBankInfoSave, getWxBankList } from '@/api/a_api'

export default {
  name: 'shopBankInfoSetting',
  data() {
    const validateEncBankNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入卡号'))
      } else if (value !== this.bankInfo.encBankNo) {
        callback(new Error('两次输入卡号不一致!'))
      } else {
        callback()
      }
    }
    return {
      bankInfo: {
        verifyEncBankNo: '6227000010001100236',
        encBankNo: '6227000010001100236',
        bankCode: 1002,
        encTrueName: '用户甲',
        createTime: null,
        updateTime: null,
        shopId: null
      },
      bankList: [],
      rules: {
        encTrueName: [
          { required: true, message: '请输入收款方用户名', trigger: 'blur' }
        ],
        verifyEncBankNo: [
          { validator: validateEncBankNo, trigger: 'blur' }
        ],
        encBankNo: [
          { required: true, message: '请输入收款方银行卡号', trigger: 'blur' }
        ],
        bankCode: [
          { required: true, message: '请选择收款方开户行', trigger: 'blur' }
        ]
      }
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
      this.getBankList()
    },
    getData() {
      getShopBankInfo().then(res => {
        console.log(res, 'getShopBankInfo')
        if (res.code === 200 && res.data) {
          this.bankInfo = res.data
        }
      })
    },
    getBankList() {
      getWxBankList().then(res => {
        console.log(res, 'getWxBankList')
        if (res.code === 200) {
          this.bankList = res.data
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            encBankNo: this.bankInfo.encBankNo,
            encTrueName: this.bankInfo.encTrueName,
            bankCode: this.bankInfo.bankCode + ''
          }
          console.log(params, 'params')
          postShopBankInfoSave(params).then(res => {
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
