<template>
  <div class="app-container">
    <el-row style="marginBottom:20px">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" label-width="80px">
          <el-form-item :label="$t('table.keyWord')">
            <el-input v-model="listQuery.keyword" placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.orderNo')">
            <el-input v-model="listQuery.orderNo" ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="listQuery.status">
              <el-option label="全部" value=null></el-option>
              <el-option label="待付款" value=1000></el-option>
              <el-option label="待发货" value=1002></el-option>
              <el-option label="待确认" value=1003></el-option>
              <el-option label="退款中" value=1004></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="排序类型">
            <el-select v-model="listQuery.sortField" placeholder="排序类型">
              <el-option label="未选择" value=""></el-option>
              <el-option label="按销量" value="hot"></el-option>
              <el-option label="按金额" value="money"></el-option>
              <el-option label="按实际" value="time"></el-option>
            </el-select>
          </el-form-item> -->
          <br>
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="id" width="60" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.groupPurchaseCaseId }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.displayDiagram')" width="180" align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.displayDiagram" class="tableImg" />
            </template>
          </el-table-column> -->
          <!-- <el-table-column :label="$t('table.name')" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建时间 : {{ scope.row.brand }}</p>
                <p>组织代码编号: {{ scope.row.corporateCode }}</p>
                <p>联系电话: {{ scope.row.mobile }}</p>
                <p>创建时间: {{ scope.row.createTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('table.orderNo')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.consigneeName')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.consigneeName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.consigneeAddress')" width="180" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.consigneeAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.consigneeMobile')" width="160" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.consigneeMobile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.orderStatus')" width="100" align='center'>
            <template slot-scope="scope">
              <span>{{ scope.row.status | orderStatusFilter }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('table.subBrand ')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.subBrand }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.weight ')" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.weight  }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeAbout(scope.$index, scope.row)">查看详情</el-button>
              <el-button size="mini" type="primary" @click="openAddGoodFrom(scope.$index, scope.row)" v-if="scope.row.status===1002">确认发货</el-button>
              <el-button size="mini" type="primary" @click="refundOrder(scope.$index, scope.row)" v-if="scope.row.status===1002||scope.row.status===1003||scope.row.status===2000">确认退款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination 
          background 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="listQuery.page" 
          :page-sizes="[10,20,30, 50]" 
          :page-size="listQuery.pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- Form -->
    <el-dialog :title="tempForm.fromTitle" :visible.sync="auditFormVisible" width="70%">
      <el-form :model="tempForm" ref="tempForm" :rules="rules">
        <!-- <el-form-item :label="$t('table.displayDiagram')">
          <img :src="tempForm.displayDiagram" class="formImg" />
        </el-form-item> -->
        <el-form-item :label="$t('table.groupPurchaseCaseId')">
          <span>{{tempForm.groupPurchaseCaseId}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.orderNo')">
          <span>{{tempForm.orderNo}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.consigneeName')">
          <span>{{tempForm.consigneeName}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.consigneeAddress')">
          <span>{{tempForm.consigneeAddress}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.consigneeMobile')">
          <span>{{tempForm.consigneeMobile}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{tempForm.createTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.deliveryTime')">
          <span>{{tempForm.deliveryTime}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.logisticsCompany')" v-if="tempForm.logisticsCompany.name">
          <br/>
          <span>物流公司：{{tempForm.logisticsCompany.name}}</span><br/>
          <span>物流单号：{{tempForm.logisticsNo}}</span><br/>
          <span>物流单号：{{tempForm.logisticsNo}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.orderStatus')">
          <span>{{ tempForm.status | orderStatusFilter }}</span>
        </el-form-item>
        <el-form-item label="订单详情">
          <br>
          <div v-for="(item,index) in tempForm.goodsInfoList" :key="index">
            <br/>
            <img :src="item.displayDiagram" class="formImg" />
            <span>商品名称：{{item.title}}</span><br/>
            <span>商品金额：{{item.money}}</span><br/>
            <span>商品数量：{{item.count}}</span><br/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTempForm()">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="确认发货" :visible.sync="orderDeliveryDialog" width="450px">
      <el-form :model="orderDeliveryFrom" ref="orderDeliveryFrom" :rules="rules" label-width="100px">
        <el-form-item :label="$t('table.orderNo')" width="100" align='center'>
          <el-input v-model="orderDeliveryFrom.orderNo" style="width:200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.logisticsType')" width="100" align='center'>
          <el-radio-group v-model="orderDeliveryFrom.logisticsType">
            <el-radio label="0">商家配送</el-radio>
            <el-radio label="1">物流配送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('table.logisticsId')" width="100" prop="logisticsId" align='center' v-if="orderDeliveryFrom.logisticsType==='1'">
          <el-select v-model="orderDeliveryFrom.logisticsId" filterable placeholder="请选择">
            <el-option
              v-for="item in logisticsCompanyList"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.logisticsNo')" width="100" prop="logisticsNo" align='center' v-if="orderDeliveryFrom.logisticsType==='1'">
          <el-input v-model="orderDeliveryFrom.logisticsNo" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <!-- handleOperate(scope.$index, scope.row, 'delivery') -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddGoodFrom">取 消</el-button>
        <el-button type="primary" @click="deliveryOrder('orderDeliveryFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getShopOrderList, postOrderDelivery, postOrderRedund, getLogisticsCompanyList } from '@/api/a_api'

const orderTypeOptions = [
  { key: 1000, display_name: '待付款' },
  { key: 1001, display_name: '待成团' },
  { key: 1002, display_name: '待发货' },
  { key: 1003, display_name: '待确认' },
  { key: 1004, display_name: '退款中' },
  { key: 2000, display_name: '已完成' },
  { key: 5000, display_name: '已取消' },
  { key: 5001, display_name: '已退款' }
]
const orderTypeKeyValue = orderTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'orderManage',
  data() {
    return {
      list: null,
      logisticsCompanyList: [],
      total: null,
      listLoading: true,
      listQuery: {
        status: null,
        orderNo: null,
        page: 1,
        pageSize: 20,
        sortField: null,
        sort: null,
        keyword: null,
        startTime: null,
        endTime: null
      },
      auditFormVisible: false,
      orderDeliveryDialog: false,
      tempForm: {
        id: '',
        consigneeAddress: null,
        consigneeMobile: null,
        consigneeName: null,
        createTime: null,
        deliveryTime: null,
        groupPurchaseCaseId: null,
        logisticsCompanyId: null,
        logisticsNo: null,
        logisticsType: null,
        money: null,
        orderNo: null,
        outTradeNo: null,
        payType: null,
        status: null,
        userId: null,
        shop: {},
        logisticsCompany: {
          name: null
        },
        goodsInfoList: [{
          displayDiagram: null,
          title: null,
          money: null,
          count: null
        }],
        disabled: true,
        isOperate: true
      },
      orderDeliveryFrom: {
        orderNo: null,
        logisticsId: null,
        logisticsNo: null,
        logisticsType: '1'
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状结果', trigger: 'blur' }
        ],
        failMsg: [
          { required: true, message: '请输入不通过理由', trigger: 'blur' }
        ],
        logisticsId: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        logisticsNo: [
          { required: true, message: '请选择物流单号', trigger: 'blur' }
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
  filters: {
    orderStatusFilter(status) {
      return orderTypeKeyValue[status]
    }
  },
  methods: {
    init() {
      this.getList()
      this.getLogisticsCompanyList()
    },
    getList() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      console.log(params, 'params')
      getShopOrderList(params).then(res => {
        // console.log(res, 'getShopOrderList')
        if (res.code === 200) {
          this.total = res.data.total
          this.listQuery.page = res.data.current
          this.listQuery.pageSize = res.data.size
          this.list = res.data.records
        }
      })
    },
    getLogisticsCompanyList() {
      getLogisticsCompanyList().then(res => {
        // console.log(res, 'getLogisticsCompanyList')
        if (res.code === 200 && res.data) {
          this.logisticsCompanyList = res.data
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      console.log(val, 'val')
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleItemChange(val) {
      console.log('active item:', val)
    },
    resetForm() {
      this.tempForm = {
        id: '',
        consigneeAddress: null,
        consigneeMobile: null,
        consigneeName: null,
        createTime: null,
        deliveryTime: null,
        groupPurchaseCaseId: null,
        logisticsCompanyId: null,
        logisticsNo: null,
        logisticsType: null,
        money: null,
        orderNo: null,
        outTradeNo: null,
        payType: null,
        status: null,
        userId: null,
        shop: {},
        logisticsCompany: {
          name: null
        },
        goodsInfoList: [{
          displayDiagram: null,
          title: null,
          money: null,
          count: null
        }],
        disabled: true,
        isOperate: true
      }
    },
    seeAbout(index, row) {
      this.handleAudit(index, row, true)
    },
    handleAudit(index, row, onlyLook) {
      if (onlyLook === true) {
        this.tempForm.isOperate = false
        this.tempForm.fromTitle = '查看详情'
      } else {
        this.tempForm.isOperate = true
        this.tempForm.fromTitle = '审核'
      }
      this.auditFormVisible = true
      for (const item in row) {
        if (item === 'image') {
          const images = row[item].split(',')
          this.tempForm.images = images
        } else if (item !== 'status') {
          this.tempForm[item] = row[item]
        }
      }
    },
    openAddGoodFrom(index, row) {
      this.orderDeliveryFrom.orderNo = row.orderNo
      this.orderDeliveryDialog = true
    },
    closeAddGoodFrom() {
      this.orderDeliveryDialog = false
    },
    refundOrder(index, row) {
      // console.log(index, row)
      this.$confirm('确认退款吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postOrderRedund(row.orderNo).then(res => {
          // console.log(res, 'postOrderRedund')
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    deliveryOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            orderNo: this.orderDeliveryFrom.orderNo,
            logisticsId: 0
          }
          if (this.orderDeliveryFrom.logisticsType === '1') {
            params.logisticsId = this.orderDeliveryFrom.logisticsId
            params.logisticsNo = this.orderDeliveryFrom.logisticsNo
          }
          console.log(params, 'params')
          postOrderDelivery(params).then(res => {
            // console.log(res, 'postOrderDelivery')
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.orderDeliveryFrom = {
                orderNo: null,
                logisticsId: null,
                logisticsNo: null,
                logisticsType: '1'
              }
              this.orderDeliveryDialog = false
              this.init()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeTempForm() {
      this.auditFormVisible = false
      this.resetForm()
    }
  }
}
</script>

<style scoped>
.defaultInput {
  width: 400px;
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
.filePathImg,.productSetails >>> .detailImg{
  display: block;
  width: 100%;
  margin:0 auto 10px;
}
.tempUrlImg {
  height: 200px;
  display: block;
  margin: 20px auto 0;
}
</style>
