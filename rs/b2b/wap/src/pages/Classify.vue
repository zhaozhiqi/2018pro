<template>
  <div id="classify">
    <header class="header">
      <SeachHeader :style="bannerStyle" :bannerHeight="0" />
      <div class="product-typeList">
        <nav>
          <div class="product-typeList-item" v-for="(item, index) in typeIList" :key="index" :id="item.id" :class="{ active:item.id == parentId }" @click="getProIbnfo(item.id)">{{item.label}}</div>
        </nav>
      </div>
      <div class="product-catalog">
        <ul>
          <li :class="{'active':sortObj.sortActive == 'hot'}" @click="changeSortActive('hot')">销量</li>
          <li :class="{'active':sortObj.sortActive == 'time'}" @click="changeSortActive('time')">
            <span>最新</span><input type="hidden" value=""></li>
          <li :class="{'active':sortObj.sortActive == 'money'}" @click="changeSortActive('money')">
            <span>金额</span>
            <i class="rsiconfont" :class="sortObj.sortPriceIcon"></i>
          </li>
        </ul>
      </div>
    </header>
    <div class="main">
      <aside class="product-brands">
        <ul>
          <!-- <li class="product-brands-item " :class="{'active': -1 == childrenId}" @click="changeProductBrands(-1)">全部<li> -->
          <li class="product-brands-item" v-for="(item, index) in typeIIList" :key="index" :id="item.id" :class="{'active':item.id == childrenId}" @click="changeProductBrands(item.id)">{{item.label}}</li>
        </ul>
      </aside>
      <TypeGoodsList :proList="typeGoodsList" class="proList" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { getClassifyList, getGoodsList } from '@/api/m_api'
import Cookies from 'js-cookie'

import SeachHeader from '@/components/seach-header'// 引入首页头部组件
import TypeGoodsList from '@/components/TypeGoodsList';
import Footer from '@/components/Footer';


export default {
  name: 'Classify',
  data() {
    return {
      bannerStyle: {
        backgroundColor: '#1655bf'
      },
      sortObj: {
        sortActive: "hot",
        sortPriceIcon:"rsicon-jiangxu",
        sortSequence: "desc"
      },
      parentId: null,
      childrenId: -1,
      typeIList: [],
      typeIIList: [],
      typeGoodsList: []
    }
  },
  components: {
    SeachHeader,
    TypeGoodsList,
    Footer
  },
  created() {
    // this.typeIIList = this.typeIList[0].proList;
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.lng = Cookies.get('AREA_LNG')
      this.lat = Cookies.get('AREA_LAT')
      this.getClassifyList(0)
    },
    getClassifyList(parentId) {
      console.log(this.parentId,parentId,'this.parentId')
      const parasmGetClassify = {
        parentId: parentId
      }
      getClassifyList(parasmGetClassify).then(result => {
        const data = result.data.records
        console.log(data, 'result')
        switch (parentId) {
          case 0: this.typeIList = data
            this.parentId = this.typeIList[0].id            
            this.getClassifyList(this.parentId)
            break
          default: this.typeIIList = data
            this.parentId = parentId
            this.childrenId = this.typeIIList[0].id
            this.getGoodsList()
            break
        }
      })
    },
    getGoodsList() {
      const parasmGetGoods = {
        classifyId: this.childrenId,
        sortField: this.sortObj.sortActive,
        sort: this.sortObj.sortSequence,
        lng: this.lng,
        lat: this.lat
      }
      getGoodsList(parasmGetGoods).then(result => {
        const data = result.data.records
        this.typeGoodsList = data
        console.log(data, 'result')
      })
    },
    checkTypeI(id) {
      if (this.parentId === id) {
        return
      }
      this.getClassifyList(id)
    },
    changeProductBrands(id) {
      if (this.childrenId === id) {
        return
      }
      this.childrenId = id
      this.getGoodsList()
    },
    changeSortActive(index) {
      if (index === 'money') {
        if (this.sortObj.sortActive !== 'money') {
          this.sortObj.sortActive = 'money';
        } else {
          if (this.sortObj.sortSequence === "desc") {
            this.sortObj.sortSequence = "asc"//升序
            this.sortObj.sortPriceIcon = "rsicon-shengxu"
          } else {
            this.sortObj.sortSequence = "desc"//降序
            this.sortObj.sortPriceIcon = "rsicon-jiangxu"
          }
        }
      } else {
        this.sortObj.sortActive = index;        
        this.sortObj.sortSequence = "desc"//降序
        this.sortObj.sortPriceIcon = "rsicon-jiangxu"
      }
      this.getGoodsList()
    },
    getProIbnfo(index) {
      this.checkTypeI(index);
      this.typeIList.forEach(item => {
        if (item.isActive === true) {
          this.typeIIList = item.proList;
        }
      })
    }

  }
};
</script>

