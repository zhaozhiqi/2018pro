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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
      "title": {
        "text": "地区占比"
      },
      "tooltip": {
        "show": true,
        "formatter": "{a} <br/>{b} : {c} ({d}%)"
      },
      "legend": {
        "data": [
          [
            "山东省",
            "广东省广州市",
            "陕西省西安市",
            "安徽省合肥市",
            "重庆市",
            "中国",
            "河南省郑州市",
            "北京市",
            "浙江省杭州市",
            "山东省青岛市"
          ]
        ]
      },
      "series": [
        {
          "data": [
            {
              "山东省": 20922,
              "广东省广州市": 17640,
              "陕西省西安市": 18859,
              "安徽省合肥市": 16156,
              "重庆市": 16026,
              "中国": 18207,
              "河南省郑州市": 15625,
              "北京市": 121028,
              "浙江省杭州市": 15421,
              "山东省青岛市": 16465
            }
          ],
          "name": "1",
          "type": "pie",
          "radius": [
            125,
            150
          ],
          "clockWise": false
        }
      ]
    })
    }
  }
}
</script>
