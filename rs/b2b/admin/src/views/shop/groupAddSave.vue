<template>
  <div class="app-container">
    <div class="form-container">
      <!-- Form -->
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="200px">
        <el-form-item :label="$t('table.shopGoodsId')" width="60">
          <el-input v-model="tempForm.shopGoodsId" :disabled="true" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.groupMoney')" prop="money">
          <el-input type="number" v-model.number="tempForm.money" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.groupCount')" prop="count">
          <el-input type="number" v-model.number="tempForm.count" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item label="是否限制用户购买重复参团" prop="restrictions">
          <el-select v-model="tempForm.restrictions" placeholder="请选择">
            <el-option label="未选择" value=""></el-option>
            <el-option label="限制" value="1"></el-option>
            <el-option label="不限制" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.restrictionsNumber')" prop="restrictionsNumber" v-show="tempForm.restrictions === '1'">
          <el-input type="number" v-model.number="tempForm.restrictionsNumber" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.groupCaseLot')" prop="caseLot">
          <el-input type="number" v-model.number="tempForm.caseLot" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.caseExpiryDate')" prop="caseExpiryDate">
          <el-input type="number" v-model.number="tempForm.caseExpiryDate" class="defaultInput"></el-input>
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
        <el-form-item label="上线状态" prop="onlineState">
          <el-select v-model="tempForm.onlineState" placeholder="请选择">
            <el-option label="未选择" value=""></el-option>
            <el-option label="上线" value="1"></el-option>
            <el-option label="未上线" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="paddingLeft:200px">
        <el-button @click="cancelAndBack()">取 消</el-button>
        <el-button type="primary" @click="saveGroup('tempForm')">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postShopGroupSave } from '@/api/a_api'
import { mapGetters } from 'vuex'

export default {
  name: 'groupAddSave',
  data() {
    return {
      tempForm: {
        shopGoodsId: null,
        money: null,
        count: null,
        restrictions: null,
        restrictionsNumber: 0,
        caseLot: null,
        caseExpiryDate: null,
        onlineState: null,
        startTime: null,
        endTime: null,
        timeRange: null,
        detail: undefined
      },
      rules: {
        money: [
          { required: true, message: '请输入拼团价格', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        count: [
          { required: true, message: '请输入拼团规模', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        restrictions: [
          { required: true, message: '请选择是否限制重复购买', trigger: 'blur' }
        ],
        restrictionsNumber: [
          { required: true, message: '请输入单人限购数量', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        caseLot: [
          { required: true, message: '请输入份数', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        caseExpiryDate: [
          { required: true, message: '请输入商品单位', trigger: 'blur' },
          { type: 'number', message: '该项必须为数字值' }
        ],
        timeRange: [
          { required: true, message: '请选择拼团时间', trigger: 'blur' }
        ],
        onlineState: [
          { required: true, message: '请输入商品建议零售价', trigger: 'blur' }
        ]
      },
      isDistributor: false
    }
  },
  components: {},
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
      const goodId = this.$route.params.goodId
      if (goodId !== null && goodId !== undefined && goodId !== '') {
        this.tempForm.shopGoodsId = this.$route.params.goodId
      } else {
        this.$confirm('请选择产品后新增商品', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: false,
          showCancelButton: false
        }).then(() => {
          this.$router.push({ path: '/shop/groupManage' })
        })
      }
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
    },
    resetForm() {
      this.tempForm = {
        shopGoodsId: null,
        money: null,
        count: null,
        restrictions: null,
        restrictionsNumber: null,
        caseLot: null,
        caseExpiryDate: null,
        onlineState: null,
        startTime: null,
        endTime: null,
        timeRange: null,
        detail: undefined
      }
    },
    saveGroup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            shopGoodsId: this.tempForm.shopGoodsId,
            money: this.tempForm.money,
            count: this.tempForm.count,
            restrictions: parseInt(this.tempForm.restrictions),
            restrictionsNumber: this.tempForm.restrictionsNumber,
            caseLot: this.tempForm.caseLot,
            caseExpiryDate: this.tempForm.caseExpiryDate,
            onlineState: parseInt(this.tempForm.onlineState),
            startTime: this.tempForm.startTime,
            endTime: this.tempForm.endTime
          }
          if (this.tempForm.restrictions === '0') {
            params.restrictionsNumber = null
          }

          console.log(params, 'params')
          postShopGroupSave(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.$router.push({ path: '/shop/groupManage' })
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
    setTime(value) {
      const timeRang = this.tempForm.timeRange
      if (timeRang.length === 2) {
        console.log(timeRang.length, timeRang[0], timeRang[1])
        this.tempForm.startTime = timeRang[0]
        this.tempForm.endTime = timeRang[1]
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
