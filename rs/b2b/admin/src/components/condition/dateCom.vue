<template>
  <div>
    <el-button type="primary"
               :plain="dateType !== 'YESTERDAY'"
               @click="changeDate('YESTERDAY')">昨日</el-button>
    <el-button type="primary"
               :plain="dateType !== 'LAST_WEEK'"
               @click="changeDate('LAST_WEEK')">上周</el-button>
    <el-button type="primary"
               :plain="dateType !== 'LAST_MONTH'"
               @click="changeDate('LAST_MONTH')"
               style="marginRight: 10px">上月</el-button>
    <el-date-picker v-model="dateDay"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="changeDate('DAY')"
                    :picker-options="pickerOptions">
    </el-date-picker>
    <el-date-picker v-model="dateWeek"
                    type="week"
                    format="yyyy 第 WW 周"
                    placeholder="选择周"
                    @change="changeDate('WEEK')"
                    :picker-options="pickerOptions">
    </el-date-picker>
    <el-date-picker v-model="dateMonth"
                    type="month"
                    placeholder="选择月"
                    value-format="yyyy-MM-dd"
                    @change="changeDate('MONTH')"
                    :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>

<script>
import { elWeekSet } from '@/utils'

export default {
  data() {
    return {
      dateType: null,
      date: null,
      dateDay: null,
      dateWeek: null,
      dateMonth: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  props: {
    comData: {
      type: Object,
      default: function() {
        return {
          dateType: null,
          date: null
        }
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    changeDate(type) {
      this.dateType = type
      this.date = null
      switch (type) {
        case 'YESTERDAY':
        case 'LAST_WEEK':
        case 'LAST_MONTH':
          this.dateDay = null
          this.dateWeek = null
          this.dateMonth = null
          break
        case 'DAY': this.date = this.dateDay
          this.dateWeek = null
          this.dateMonth = null
          break
        case 'WEEK': this.date = elWeekSet(this.dateWeek)
          this.dateDay = null
          this.dateMonth = null
          break
        case 'MONTH': this.date = this.dateMonth
          this.dateDay = null
          this.dateWeek = null
          break
        default:
          break
      }
      /* console.log(this.date, this.dateType, 'this.query.date') */
      const dateObj = {
        date: this.date,
        dateType: this.dateType
      }
      this.$emit('changeDate', dateObj)
    },
    initData() {
      this.dateType = this.comData.dateType
      this.date = this.comData.date
      switch (this.dateType) {
        case 'DAY': this.dateDay = this.date
          break
        case 'WEEK': this.dateWeek = this.date
          break
        case 'MONTH': this.dateMonth = this.date
          break
      }
    }
  }
}
</script>
