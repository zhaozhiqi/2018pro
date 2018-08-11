<template>
    <div id="notice">
        <!-- <span>公告</span> -->
        <!-- <span>a的看法上课了飞机撒娇的副书记的福利卡世纪东方拉克丝的房间爱上了快递费</span> -->
        <div class="scroll-wrap">
            <ul class="scroll-content" :style="{ top }" ref="ul">              
              <li v-for="(item, index) in prizeList" :key="index"><a :href="item.link">{{item.title}}</a></li>            
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: 0,
            itemHeight: 0,
            time: 4000
        }
    },
    props:{
      prizeList:{
        type: Array,
        default: () => [{ prizeList: "暂无通知" }]
      }
    },
    computed: {
        top() {
            return - this.activeIndex * (this.itemHeight) + 'px';      
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            this.itemHeight =  this.$refs.ul.offsetHeight/this.prizeList.length;
            setInterval(() => {
                //  console.log(this.itemHeight,this.$refs.ul.offsetHeight,this.prizeList.length)
                if(this.activeIndex < this.prizeList.length ) {
                    this.activeIndex += 1;
                } else {
                    this.activeIndex = 0;
                }
            }, this.time);
        }
    }
}
</script>

<style scoped>
#notice{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100px;
    line-height: 100px;
    background:  url('../../static/images/public/headlines-img.png') no-repeat 20px center;
    background-size: auto 36px;
    background-color:#fff;
    padding:0 20px 0 170px;
}

.scroll-content{
  position: relative;
  transition: top 0.5s;
}

.scroll-content  li{
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
