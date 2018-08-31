<template>
  <div id="editAddress">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <div class="address-info">
        <p :class="{'error':errors.has('name')}">
          <b>收货人</b>
          <input type="text" placeholder="请填写收货人姓名" v-model="addressInfo.userName" v-validate="'required|min:2|max:10'" name="name" /></p>
        <p>
          <label><input type="radio" value="man" name="sex" v-model="addressInfo.userSex">先生</label>
          <label><input type="radio" value="woman" name="sex" v-model="addressInfo.userSex">女士</label>
        </p>
        <p :class="{'error':errors.has('phone')}">
          <b>电话</b>
          <input type="text" placeholder="请填写收货电话号码" v-model="addressInfo.userPhone" v-validate="'required|phone'" name="phone" /></p>
        <h3>收货地址</h3>
        <p :class="{'error':errors.has('region')}">
          <b>地址</b>
          <i class="ico-dingwei2"></i>
          <input type="text" v-validate="'required'" name="region" placeholder="请选择地址" v-model="salesAreaCode.value" @click="showAddressPicker" />
          <i class="font-angle-right"></i>
        </p>
        <p :class="{'error':errors.has('detailedAddress')}" style="padding: 10px; height: auto;">
          <textarea placeholder="详细地址" v-model="addressInfo.detailedAddress" v-validate="'required|max:30'" name="detailedAddress"></textarea>
        </p>
        <a class="defaultAddr" v-if="addressInfo.default" @click="setDefaultAddr()">
          <i class="rsiconfont rsicon-address"></i>默认地址</a>
        <a @click="setDefaultAddr()" class="setDefaultAddr" v-else>
          <i class="rsiconfont rsicon-address"></i>设置为默认地址</a>
      </div>

      <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
        <mt-button @click="closeAddressPicker" class="toolbarBtn sure">确认</mt-button>
        <mt-button @click="closeAddressPicker" class="toolbarBtn cancel"></mt-button>
        <mt-picker :slots="myAddressSlots" :Slot="regionToolbar" valueKey="label" :show-toolbar="false" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
      </mt-popup>
    </main>
    <footer class="addressFooter">
      <div class="saveBtn" @click="saveBtn">确定</div>
    </footer>
  </div>
</template>

<script>
import { getImageCode, getMobileCode, getAreaList } from '@/api/c_api'
import { addAddress, updateAddress, getAddressList } from '@/api/m_api'

import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata'

export default {
  name: "EditAddress",
  data() {
    return {
      nodataObj: {
        iconName: "rsicon-jingshi",
        nodataMsg: "暂无收货地址"
      },
      addressInfo: {
        default: false,
        detailedAddress: "某小区1门",
        otherAddress: "",
        userName: "孙先生",
        userPhone: "15584461401",
        userSex: "man",
        id: null,
        region: {
          value: null,
          province: null,
          city: null,
          county: null,
          provinceCode: null,
          cityCode: null,
          countyCode: null
        }
      },
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "新增地址",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      editAddressType: null,
      editAddressId: null,
      salesAreaCode: {
        value: null,
        _value: null,
        code: null,
        province: '浙江省',
        city: '杭州市',
        district: null,
        street: null,
        provinceCode: null,
        cityCode: null,
        districtCode: null,
        streetCode: null
      },
      regionHold: [{ code: 330000 }, { code: 330100 }, { code: 0 }, { code: 0 }],
      regionToolbar: {
        name: '确认'
      },
      regionVisible: false,
      regionAble: false,
      regionInit: true,
      myAddressSlots: [
        //省
        {
          flex: 1,
          values: [{ code: 330000, name: '浙江省' }], //省份数组
          className: 'slot1',
          defaultIndex: 0,
          textAlign: 'center'
        },
        //市
        {
          flex: 1,
          values: [{ code: 0, label: '未选择' }],
          className: 'slot3',
          textAlign: 'center'
        },
        //区
        {
          flex: 1,
          values: [{ code: 0, label: '未选择' }],
          className: 'slot5',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [{ code: 0, label: '未选择' }],
          className: 'slot7',
          textAlign: 'center'
        }
      ]    }
  },
  components: {
    Nodata,
    CommonHeader
  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    init() {
      this.getAreaList(0, 'province')
      if (this.$route.query.id === 'add' || this.$route.query.id === undefined || this.$route.query.id === '') {
        this.editAddressType = 'add'
      } else {
        this.commonHeaderObj.title = '编辑地址'
        this.editAddressType = 'edit'
        this.editAddressId = parseInt(this.$route.query.id)
        getAddressList().then(result => {
          if(result.code === 200){
            const addressList = result.data
            addressList.forEach((item, index) => {
              if (item.id === this.editAddressId) {
                this.addressInfo.id = addressList[index].id
                this.addressInfo.userName = addressList[index].name
                this.addressInfo.userPhone = addressList[index].mobile
                this.addressInfo.detailedAddress = addressList[index].address
                this.addressInfo.default  = addressList[index].isDefault===1?true:false
                return
              }
            })
          }
        })
      }      
    },
    saveBtn() {
      const that = this
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          const parasm = {
            id: this.addressInfo.id,
            name: this.addressInfo.userName,
            mobile: this.addressInfo.userPhone,
            address: this.salesAreaCode.value + ' ' + this.addressInfo.detailedAddress,
            isDefault: this.addressInfo.default === true ? 1 : null
          }
          if (this.editAddressType === 'add') {
            addAddress(parasm).then(result => {
              // console.log(result, 'addAddress')
              if (result.code === 200) {
                this.$toast({
                  message: '新增成功',
                  type: 'warning'
                })
                that.$store.dispatch('backLastPage')
              }
            })
            // let _item = parseInt(this.$store.state.addressList.length)
            // this.$store.commit('editAddress', { id: _item, operate: 'add', obj: this.addressInfo });
            // this.$toast({
            //   message: '新增成功',
            //   type: 'warning'
            // });
            // this.$router.push({ path: '/address' })
          } else if (this.editAddressType === 'edit') {
            // console.log('edit-click-' + this.editAddressId)
            updateAddress(parasm).then(result => {
              // console.log(result, 'updateAddress')
              if (result.code === 200) {
                this.$toast({
                  message: '更新成功',
                  type: 'warning'
                })
                that.$store.dispatch('backLastPage')
              }
            })
          }
        } else {
          let list = this.errors.all();
          let msg = '请正确填写信息';
          if (list[0] !== "validation.messages._default") {
            msg = list[0];
          }
          this.$toast({
            message: msg,
            type: 'warning'
          })
        }
      })

    },
    getAreaList(parentCode, rank, picker) {
      getAreaList(parentCode).then(result => {
        switch (rank) {
          case 'province': this.myAddressSlots[0].values = result.data
            break
          case 'city'://this.myAddressSlots[2].values =  result.data
            picker.setSlotValues(1, result.data)
            break
          case 'district'://this.myAddressSlots[4].values =  result.data
            picker.setSlotValues(2, result.data)
            break
          case 'street'://this.myAddressSlots[6].values =  result.data
            picker.setSlotValues(3, result.data)
            break
          default:
            break
        }
      })
    },
    showAddressPicker() {
      this.regionVisible = true
      this.regionAble = true
    },
    closeAddressPicker() {
      this.regionVisible = false
      this.regionAble = false
      this.salesAreaCode.value = this.salesAreaCode._value
    },
    getPickerIndex(Arr) {
      const newArr = Arr
      let isFrist = true
      let changeIndex = -1
      // console.log(this.regionHold,'regionHold')
      // console.log(newArr,'newArr')
      for (let i = 0; i < newArr.length; i++) {
        // console.log(newArr[i].code,'i',i,this.regionHold[i].code)
        if (newArr[i].code !== this.regionHold[i].code) {
          // console.log(newArr[i].code,'_index',this.regionHold[i].code)
          if (isFrist === true) {
            this.regionHold[i].code = newArr[i].code
            isFrist = false
            changeIndex = i
          }
        }
      }
      return changeIndex
    },
    addressChange(picker, values) {
      // console.log(picker,'----')
      // console.table(values)
      //console.log(values,'.....')
      this.salesAreaCode._value = values[0]["label"] + ' ' + values[1]["label"] + ' ' + values[2]["label"] + ' ' + values[3]["label"]
      if (this.regionAble === true) {
        //取值并赋值
        this.salesAreaCode.value = values[0]["label"] + ' ' + values[1]["label"] + ' ' + values[2]["label"] + ' ' + values[3]["label"]
      }
      this.myAddressSlots.provinceCode = values[0]["code"]
      this.myAddressSlots.cityCode = values[1]["code"]
      this.myAddressSlots.districtCode = values[2]["code"]
      this.myAddressSlots.streetCode = values[3]["code"]
      const _index = this.getPickerIndex(values)
      // console.log(_index,'_index')
      // console.log(picker.getSlotValue(0),'获取给定 slot 目前被选中的值')
      // console.table(picker.getSlotValues(0),'获取给定 slot 的备选值数组')
      // console.table(picker.getValues(),'获取所有 slot 目前被选中的值（分隔符 slot 除外）')
      // console.log(picker.getSlotValues(0),'获取给定 slot 的备选值数组')
      // console.log(picker.getValues(),'获取所有 slot 目前被选中的值（分隔符 slot 除外）')      
      // picker.setSlotValues(2, this.getCountyArr(values[0]["label"], values[1]["label"]))
      //给市、区、街道赋值

      switch (_index) {
        case 0: this.getAreaList(values[0].code, 'city', picker)
          if (this.regionInit === true) {
            this.myAddressSlots[0].defaultIndex = 10
            this.regionInit = false
          }
          break
        case 1: this.getAreaList(values[1].code, 'district', picker)
          break
        case 2: this.getAreaList(values[2].code, 'street', picker)
          break
        default:
          break
      }
      this.salesAreaCode.code = this.myAddressSlots.streetCode
    },
    setDefaultAddr() {
      // if (this.editAddressType = 'add') {
      if (this.addressInfo.default === true) {
        this.addressInfo.default = false
      } else {
        this.addressInfo.default = true
      }
      // }
    }
  }
}
</script>

