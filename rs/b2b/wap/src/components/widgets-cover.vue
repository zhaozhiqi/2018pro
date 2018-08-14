<template>
  <div class="widgets-cover">
    <div class="cover-bg" @click="closeSelf"></div>
    <div class="cover-content">
      <div class="sku-wrap">
        <div class="_header">
          <div class="img-wrap">
            <img :src=changeInfo.product.displayDiagram alt="">
          </div>
          <div class="_main">
            <div class="price-wrap">
              <span class="price">¥{{price}}</span>
            </div>
            <div class="stock">库存{{stock}}</div>
            <!-- <div class="sku-info">请选择:<span>{{changeInfo.hint}}</span></div> -->
          </div>
          <span class="sku-close rsiconfont rsicon-shanchu" @click="closeSelf"></span>
        </div>
        <div class="_body">
          <div class="body-item">
            <ul class="sku-list-wrap">
              <!-- <li v-for="(item, index) in changeInfo.proChangeList" :key="index">
                                <h2 :typeId=item.typeId>{{item.typeName}}</h2>
                                <div class="items" >
                                    <a v-for="(itemI, indexI) in item.con" :key="indexI"
                                    href="javascript:void(0)" 
                                    :dataValue=itemI.dataValue
                                    :dataImage=itemI.dataImage 
                                    :class="{'checked':itemI.dataChecked}" 
                                    :dataChecked=itemI.dataChecked
                                    @click="changeItem(item,itemI)">{{itemI.dataName}}</a>
                                </div>
                            </li> -->
              <li>
                <h2>厂商：{{ changeInfo.shop.name }}</h2>
              </li>
              <li>
                <h2>编号：{{ changeInfo.code }}</h2>
              </li>
              <li>
                <h2>规格：{{ changeInfo.specifications }}</h2>
              </li>
              <li>
                <h2>单位：{{ changeInfo.unit }}</h2>
              </li>
              <li>
                <h2>建议零售价：¥{{ changeInfo.retailPrice }}</h2>
              </li>
              <li v-if="hasGroup">
                <h2>注：每份为本商品*{{ groupOneNum }}</h2>
              </li>

              <!-- <li>
                                <h2 id="prop_title_1">尺码</h2>
                                <div class="items" role="radiogroup" aria-labelledby="prop_title_1">  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28314" class="" aria-checked="false">S</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28315" class="" aria-checked="false">M</a>  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28316" class="" aria-checked="false">L</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28317" class="" aria-checked="false">XL</a>  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28318" class="" aria-checked="false">XXL</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28319" class="" aria-checked="false">XXXL</a>  
                                </div>
                            </li> -->
            </ul>
            <div class="number-wrap">
              <div class="number-line">
                <label for="number">购买数量</label>
                <span class="J_limitTxt limit-txt"></span>
                <div class="number">
                  <button class="decrease" :class="{'disabled':decideVal.num <= 1*this.groupOneNum}" @click="editSaleNum('minu')">-</button>
                  <input id="number" type="number" v-model='decideVal.num'>
                  <button class="increase" :class="{'disabled':decideVal.num >= stock}" @click="editSaleNum('add')">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="_footer">
          <a class="ok " role="button" @click="decideChange">{{btnText}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'WidgetsCover',
  data() {
    return {
      selfShow: false,
      hasGroup: null,
      hasGroupList: '确认',
      price: null,
      stock: null,
      firstPrice: null,
      groupOneNum: 1,
      decideVal: {
        id: null,
        num: null,
        saleType: null,
        typeList: []
      }
    }
  },
  mounted() {
    this.init()
  },
  props: {
    saleType: {
      type: String,
      default: 'group'
    },
    changeInfo: {
      type: Object,
      required: true
    },
    saleNum: {
      type: Number,
      default: 1
    },
    groupIndex: {
      type: Number
    }
  },
  watch: {
    // 如果 `saleNum` 发生改变，这个函数就会运行
    saleNum() { this.init() },
    saleType() { this.init() },
    changeInfo() { this.init() },
    groupIndex() { this.init() }
  },
  methods: {
    init(){
      /* 是否有拼团商品 */
      this.hasGroup = this.changeInfo.shopGroupPurchase!==undefined
      /* 一份产品的商品数量 */
      this.setPrice()
      this.setStock()
    },
    setPrice(){      
      if (this.saleType === 'group') {
        this.btnText = '确认' 
        this.groupOneNum = parseInt(this.changeInfo.shopGroupPurchase.count/this.changeInfo.shopGroupPurchase.caseLot)
        this.decideVal.num = this.saleNum*this.groupOneNum
        this.price = this.changeInfo.shopGroupPurchase.money
      } else if (this.saleType === 'self') {
        this.btnText = '加入购物车'     
        this.hasGroup = false
        this.groupOneNum = 1
        this.decideVal.num = this.saleNum
        this.price = this.changeInfo.money
      }
      // console.log(this.price,this.changeInfo.shopGroupPurchase.money,this.changeInfo.shopGroupPurchase)
    },
    setStock(){      
      if (this.saleType === 'group') {
      const groupProductCount = this.groupIndex===null?this.changeInfo.shopGroupPurchase.caseLot:this.changeInfo.groupPurchaseCases.records[this.groupIndex].surplusCaseLot
        if(this.changeInfo.shopGroupPurchase.restrictions === 1){
          this.stock = this.changeInfo.shopGroupPurchase.restrictionsNumber<=groupProductCount?this.changeInfo.shopGroupPurchase.restrictionsNumber:groupProductCount
          this.stock = this.stock*this.groupOneNum
        }
      } else if (this.saleType === 'self') {
        this.stock = this.changeInfo.stock
      }
    },
    closeSelf() {
      this.$emit('widgetsCoverShow', this.selfShow)
    },
    changeItem(parent, children) {
      let oldChecked = children.dataChecked
      let dataImage = children.dataImage
      dataImage !== undefined ? this.changeInfo.proChangeImage = dataImage : this.changeInfo
      let dataPrice = children.dataPrice
      dataPrice !== undefined ? this.price = dataPrice : this.price = this.firstPrice
      let dataStock = children.dataStock
      dataStock !== undefined ? this.changeInfo.stock = dataStock : this.changeInfo
      this.changeInfo.proChangeList.forEach(item => {
        if (oldChecked === false) {
          if (item.typeId === parent.typeId) {
            item.con.forEach(itemI => {
              if (itemI.dataValue === children.dataValue) {
                itemI.dataChecked = true
              } else {
                itemI.dataChecked = false
              }
            })
          }
        } else {
          if (item.typeId === parent.typeId) {
            item.con.forEach(itemI => {
              itemI.dataChecked = false
            })
          }
        }
      });
    },
    editSaleNum(flag) {
      let num = 0;
      if (flag == 'add') {
        if (this.decideVal.num >= this.stock) {
          return
        }
        this.decideVal.num += 1*this.groupOneNum
        num = 1;
      } else if (flag == 'minu') {
        if (this.decideVal.num <= 1*this.groupOneNum) {
          return
        }
        this.decideVal.num += (-1)*this.groupOneNum
        num = -1;
      }
    },
    inspectAllType() {
      let allChecked = false
      let breakTodo = false
      let typeList = []
      this.changeInfo.proChangeList.forEach(item => {
        allChecked = false
        item.con.forEach(itemI => {
          if (itemI.dataChecked === true) {
            allChecked = true
            typeList.push(itemI.dataValue)
            return
          }
        })
        if (!allChecked && !breakTodo) {
          this.$toast({
            message: '请选择' + item.typeName,
            type: 'warning'
          });
          breakTodo = true
          return
        }
      })
      this.decideVal.typeList = typeList
      // console.log(allChecked,'allChecked',typeList)
      return allChecked
    },
    decideChange() {
      //if(this.inspectAllType()){ /* 暂去除选择参数判断 */
      if (true) {
        this.changeInfo.proId !== undefined ? this.decideVal.id = this.changeInfo.proId : this.decideVal
        this.decideVal.saleType = this.saleType
        this.$emit('saveDecideVal', this.decideVal)
        this.closeSelf()
      }
    }

  }
}
</script>

<style scoped>
</style>
