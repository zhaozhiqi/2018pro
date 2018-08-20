<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    pieChartsData: {
      type: Object,
      default: function() {
        return {
          title: {
            text: '地区占比'
          },
          tooltip: {
            show: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            top: '40px',
            x: 'left',
            data: ['北京市']
          },
          series: [
            {
              data: [
                {
                  name: '北京市',
                  value: 103236
                }
              ],
              name: '1',
              type: 'pie',
              radius: [75, 100],
              clockWise: false
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    pieChartsData: function() {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      if (this.pieChartsData === null || this.pieChartsData === undefined) {
        return false
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.pieChartsData)
      // console.log(this.pieChartsData, 'pieChartsData')
    }
  }
}
</script>
