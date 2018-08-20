<template>
  <div class="app-container">
    <div class="formOut">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="企业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="WPH号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="推荐人WPH号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="企业资质文件">
        <el-input v-model="form.name"></el-input>
      </el-form-item> -->
        <el-form-item label="联系方式">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="绑定收款微信号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="微信昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="企业logo 尺寸：100*100">
        <el-input v-model="form.name"></el-input>
      </el-form-item> -->
        <!-- <el-form-item label="店铺首页轮播图 尺寸：375*180">
        <el-input v-model="form.name"></el-input>
      </el-form-item> -->
        <el-form-item label="最低发货金额">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="主营产品">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客服电话">
          <el-input v-model="form.name"></el-input>
          <el-input v-model="form.name"></el-input>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { getCommonSyntheticData, getCommonPageDetail, getCommonPie, getDevicePie } from '@/api/boosjAll'
// import { initQuery } from '@/utils'
// import dateCom from '@/components/condition/dateCom'
// import deviceCom from '@/components/condition/deviceCom'
// import channelCom from '@/components/condition/channelCom'
// import attrCom from '@/components/condition/attrCom'
// import elTableCom from '@/components/table/elTable'
// import LineChart from '@/components/Charts/LineChart'
// import PieChart from '@/components/Charts/PieChart'
// import { tba } from '@/utils/tableArg'

export default {
  name: 'wphShopSet',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.formOut{
  width: 80%;
}
</style>
