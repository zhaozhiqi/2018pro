<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="openAddGroupFrom()">新增</el-button>
          </el-form-item>
          <!-- <el-form-item :label="$t('table.keyWord')" >
            <el-input v-model="listQuery.keyword" placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="listQuery.shelfState" placeholder="上架状态">
              <el-option label="未选择" value=""></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.shopId')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shopId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shopGoodsId')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shopGoodsId }}</span>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.displayDiagram')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.goodsDetail.product.displayDiagram" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column label="基本信息" width="180" align='center'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>店铺ID : {{ scope.row.shopId }}</p>
                <p>店铺商品ID: {{ scope.row.shopGoodsId }}</p>
                <p>商品标题: {{ scope.row.goodsDetail.title }}</p>
                <p>拼团价格（分）: {{ scope.row.money | priceFormat}}</p>
                <p>拼团规模: {{ scope.row.count }}</p>
                <p>份额: {{ scope.row.caseLot }}</p>
                <p>有效时间（小时）: {{ scope.row.caseExpiryDate }}</p>
                <p>开始时间: {{ scope.row.createTime }}</p>
                <p>结束时间: {{ scope.row.endTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">基本信息</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.groupMoney')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.groupCount')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.caseLot')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.caseLot }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="是否限制单人重复购买" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.restrictions | restrictionsStatusFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上线状态" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.onlineState | onlineStatusFilter }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.groupCreateTime')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.groupEndTime')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.endTime }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row)">查看详情</el-button>
              <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row, false)">修改信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 新增拼团前选择商品选择弹窗 dialog -->
    <el-dialog title="新增拼团" :visible.sync="addChangeDialog" width="500px">
      <el-form :model="addChangeFrom" ref="addChangeFrom" :rules="rules">
        <el-form-item label="选择商品" prop="goodId">
          <el-select v-model="addChangeFrom.goodId" placeholder="选择商品">
            <el-option v-for="(item, index) in goodsList" :key="index" :label="item.labelAll" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddGoodFrom()">关 闭</el-button>
        <el-button type="primary" @click="queryGoodId('addChangeFrom')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="formVisible" width="70%" v-if="tempForm">
      <el-form :model="tempForm" ref="tempForm" :rules="rules" label-width="200px">
        <el-form-item :label="$t('table.displayDiagram')">
          <img :src="tempForm.goodsDetail.product.displayDiagram" class="formImg" />
        </el-form-item>
        <el-form-item label="id" width="60">
          <span>{{tempForm.id}}</span>
          <!-- <el-input v-model="tempForm.id" :disabled="tempForm.disabled"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('table.shopId')">
          <el-input type="number" v-model.number="tempForm.shopId" :disabled="true" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.shopGoodsId')">
          <el-input type="number" v-model.number="tempForm.shopGoodsId" :disabled="true" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.goodTitle')">
          <el-input v-model="tempForm.goodsDetail.title" :disabled="true" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.groupMoney')" prop="money">
          <el-input type="number" v-model.number="tempForm.money" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.groupCount')" prop="count">
          <el-input type="number" v-model.number="tempForm.count" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item label="是否限制用户购买重复参团" prop="restrictions">
          <el-select v-model="tempForm.restrictions" placeholder="请选择" :disabled="tempForm.disabled">
            <el-option label="未选择" value=""></el-option>
            <el-option label="限制" value="1"></el-option>
            <el-option label="不限制" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.restrictionsNumber')" prop="restrictionsNumber" v-show="tempForm.restrictions === '1'">
          <el-input type="number" v-model.number="tempForm.restrictionsNumber" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.caseExpiryDate')" prop="caseExpiryDate">
          <el-input type="number" v-model.number="tempForm.caseExpiryDate" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.caseLot')" prop="caseLot">
          <el-input type="number" v-model.number="tempForm.caseLot" :disabled="tempForm.disabled" class="defaultInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.authorizeTimeRange')" prop="timeRange">
          <el-date-picker :disabled="tempForm.disabled" v-model="tempForm.timeRange" type="datetimerange" align="right" @change="(value) => setTime(value,tempForm.timeRang)" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线状态" prop="onlineState">
          <el-select v-model="tempForm.onlineState" placeholder="请选择" :disabled="tempForm.disabled">
            <el-option label="未选择" value=""></el-option>
            <el-option label="上线" value="1"></el-option>
            <el-option label="未上线" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openGroupCase" v-if="!tempForm.isOperate">查看拼团实例信息</el-button>
        <el-button @click="closeTempForm()">关 闭</el-button>
        <el-button type="primary" @click="update('tempForm')" v-if="tempForm.isOperate">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 拼团实例详情弹窗 -->
    <el-dialog title="拼团实例信息" :visible.sync="groupCaseDialog" >
      <div v-if="groupCaseList.length>0">
        <el-table :data="groupCaseList" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.groupHeadThumb')">
            <template slot-scope="scope">
              <img :src="scope.row.headThumb" class="formImg" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.shopId')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.shopId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="详细信息" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>开始时间: {{ scope.row.createTime }}</p>
                <p>结束时间: {{ scope.row.endTime }}</p>
                <p>拼团金额: {{ scope.row.endTime }}</p>
                <p>份额: {{ scope.row.caseLot }}</p>
                <p>拼团规模: {{ scope.row.count }}</p>
                <p>参与人数: {{ scope.row.numberOfParticipants }}</p>
                <p>店铺商品ID: {{ scope.row.shopGoodsId }}</p>
                <p>店铺拼团ID: {{ scope.row.shopGroupPurchaseId }}</p>
                <p>店铺ID: {{ scope.row.shopId }}</p>
                <p>剩余份额: {{ scope.row.surplusCaseLot }}</p>
                <p>用户ID: {{ scope.row.userId }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.nick }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>暂无信息</div>
      <br>
      <el-button @click="closeGroupCase()">关 闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getShopGroupList, getShopGroupCaseList, getStoreGoodsList, postShopGroupUpdate } from '@/api/a_api'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'
import { priceFormat } from '@/filters'
const restrictionsTypeOptions = [
  { key: 1, display_name: '是' },
  { key: 0, display_name: '否' }
]
const restrictionsTypeKeyValue = restrictionsTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const onlineStateFilter = [
  { key: 0, display_name: '未上线' },
  { key: 1, display_name: '上线' }
]
const onlineTypeKeyValue = onlineStateFilter.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'groupManage',
  data() {
    return {
      list: null,
      goodsList: null,
      groupCaseList: [],
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
        endTime: null,
        shelfState: null
      },
      formVisible: false,
      groupCaseDialog: false,
      addChangeDialog: false,
      addChangeFrom: {
        goodId: null
      },
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
        goodsDetail: {
          title: '',
          product: {
            displayDiagram: ''
          }
        },
        isOperate: true
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
      shopInfo: null,
      classifyProps: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      isDistributor: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
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
    restrictionsStatusFilter(status) {
      return restrictionsTypeKeyValue[status]
    },
    onlineStatusFilter(status) {
      return onlineTypeKeyValue[status]
    }
  },
  methods: {
    init() {
      this.getList()
      this.getGoodsList()
      this.roles[0] === 'DISTRIBUTOR' ? this.isDistributor = true : this.isDistributor = false
    },
    getList() {
      const params = {}
      params.page = this.listQuery.page
      params.pageSize = this.listQuery.pageSize
      getShopGroupList(params).then(res => {
        console.log(res, 'getShopGroupList')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          this.list = res.data.records
        }
      })
    },
    getGoodsList() {
      const params = {
        page: 1,
        pageSize: 1000,
        shelfState: 1
      }
      getStoreGoodsList(params).then(res => {
        console.log(res, 'getStoreGoodsList')
        if (res.code === 200) {
          this.goodsList = res.data.records
          this.goodsList.forEach(item => {
            item.labelAll = item.title + '-' + item.salesArea.label
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      console.log(val, 'handleSizeChange')
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleItemChange(val) {
      console.log('active item:handleItemChange', val)
    },
    resetForm() {
      this.tempForm = {
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
        goodsDetail: {
          title: '',
          product: {
            displayDiagram: ''
          }
        },
        isOperate: true
      }
    },
    seeAbout(index, row) {
      this.handleUpdate(index, row, true)
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            id: this.tempForm.id,
            shopGoodsId: this.tempForm.shopGoodsId,
            money: parseInt(this.tempForm.money * 100),
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
          postShopGroupUpdate(params).then(res => {
            console.log(res, 'postShopGroupUpdate')
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.init()
              this.closeTempForm()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUpdate(index, row, onlyLook) {
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
        } else if (item === 'retailPrice' || item === 'money') {
          this.tempForm[item] = parseFloat(priceFormat(row[item]))
        } else if (item !== 'status') {
          this.tempForm[item] = row[item]
        }
      }
      this.tempForm.restrictions = this.tempForm.restrictions + ''
      this.tempForm.onlineState = this.tempForm.onlineState + ''
      this.tempForm.timeRange = [this.tempForm.createTime, this.tempForm.endTime]
    },
    closeTempForm() {
      this.formVisible = false
      this.resetForm()
    },
    openAddGroupFrom() {
      this.addChangeDialog = true
    },
    closeAddGoodFrom() {
      this.addChangeDialog = false
    },
    openGroupCase() {
      const params = {
        id: this.tempForm.id,
        page: 1,
        pageSize: 1000
      }
      getShopGroupCaseList(params).then(res => {
        console.log(res, 'getShopGroupCaseList')
        if (res.code === 200 && res.data) {
          this.groupCaseList = res.data.records
        }
      }).then(() => {
        this.groupCaseDialog = true
      })
    },
    closeGroupCase() {
      this.groupCaseDialog = false
    },
    queryGoodId(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否现去新增拼团?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({ name: 'groupAddSave', params: { goodId: this.addChangeFrom.goodId }})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
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
.defaultInput {
  width: 400px;
}
.formArrImg {
  height: 200px;
  margin: 10px;
}
.tableImg {
  height: 100px;
  display: block;
  margin: 0 auto;
}

.formImg {
  height: 100px;
  display: block;
  margin: 0;
}
.filePathImg,
.productSetails >>> .detailImg {
  width: 200px;
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
