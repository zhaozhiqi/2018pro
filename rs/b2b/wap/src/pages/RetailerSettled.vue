<template>
  <div id="StoreSettled">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <form class="register-form" action="">
        <label :class="{'error':errors.has('corporateName')}">
          <i class="rsiconfont rsicon-gongsixinxi"></i>
          <input type="text" v-validate="'required'" name="corporateName" placeholder="请输入公司名称(同营业执照信息)" v-model="store.corporateName" />
        </label>
        <label :class="{'error':errors.has('corporateAddress')}">
          <i class="rsiconfont rsicon-address"></i>
          <input type="text" v-validate="'required'" name="corporateAddress" placeholder="请输入公司地址(同营业执照信息)" v-model="store.corporateAddress" />
        </label>
        <label :class="{'error':errors.has('corporateCode')}">
          <i class="rsiconfont rsicon-jieshao"></i>
          <input type="text" v-validate="'required'" name="corporateCode" placeholder="请输入组织代码编号(同营业执照信息)" v-model="store.corporateCode" />
        </label>
        <label :class="{'error':errors.has('password')}">
          <i class="rsiconfont rsicon-mima"></i>
          <input :type="passwordControl.type" v-validate="'required|min:6'" name="password" placeholder="请输入密码" v-model="store.password" />
          <i class="rsiconfont" :class="passwordControl.type.iconClass" @click="changePasswordState"></i>
        </label>
        <label :class="{'error':errors.has('phone')}">
          <i class="rsiconfont rsicon-dianhuahover"></i>
          <input type="text" v-validate="'required|phone'" name="phone" placeholder="请输入联系电话" v-model="store.mobile" />
        </label>
        <label :class="{'error':errors.has('imageCode')}">
          <i class="rsiconfont rsicon-yduidunpaishixin"></i>
          <input type="text" v-validate="'required|min:4'" name="imageCode" placeholder="请输入验证码" v-model="store.imageCode" class="imageCodeInt" />
          <img class="imageCodeImg" :src="imageCodeUrl" alt="" @click="changeImage()">
        </label>
        <label :class="{'error':errors.has('mobileCode')}">
          <input type="number" v-validate="'required|numeric|digits:6'" name="mobileCode" class="noIndent" placeholder="请输入手机验证码" v-model="store.mobileCode" />
          <div class="getCode" @click="getCode">{{getCodeObj.text}}</div>
        </label>
        <label :class="{'error':errors.has('corSalesAreaCodeText')}">
          <i class="rsiconfont rsicon-31daishouhuo"></i>
          <input type="text" v-validate="'required'" name="corSalesAreaCodeText" placeholder="请选择销售区域" v-model="store.salesAreaCode.value" @click="showAddressPicker" />
        </label>
        <label :class="{'error':errors.has('salesAreaCode')}" v-show="false">
          <i class="rsiconfont rsicon-31daishouhuo"></i>
          <input type="text" v-validate="'required'" name="salesAreaCode" placeholder="请选择销售区域" v-model="store.salesAreaCode.code" />
        </label>
        <label :class="{'error':errors.has('corporateLogo')}" class="upLoadLogoOut">
          <i class="rsiconfont rsicon-icon"></i>
          <span>选择公司Logo</span>
          <input type="file" id="upLoadLogo" accept="image/gif,image/jpeg,image/jpg,image/png" v-validate="'required'" name="corporateLogo" placeholder="请选择公司LOGO" @change="uploadFileChange($event,'logo')" />
        </label>
        <img class="logoPreviewImg" :src="logoPreviewUrl" />
        <label :class="{'error':errors.has('corporateLogo')}" class="upLoadFileOut">
          <i class="rsiconfont rsicon-wenjian"></i>
          <span>选择营业执照图片文件</span>
          <input type="file" id="upLoadFile" accept="image/gif,image/jpeg,image/jpg,image/png" v-validate="'required'" name="corporateLogo" placeholder="请选择营业执照图片文件" @change="uploadFileChange($event,'file')" />
        </label>
        <img class="filePreviewImg" :src="filePreviewUrl" />
      </form>
      <div class="treaty">
        <input type="checkbox" v-model="treatyState" /> 同意
        <router-link to="/treaty">用户注册协议</router-link>
      </div>
      <button class="registerBtn" @click="settledRequest()">入驻</button>
      <div class="menu">
        <router-link to="/login">账号密码登录</router-link>
        <router-link to="/messageLogin">短信验证登录</router-link>
      </div>

      <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
        <mt-button @click="closeAddressPicker" class="toolbarBtn sure">确认</mt-button>
        <mt-button @click="closeAddressPicker" class="toolbarBtn cancel"></mt-button>
        <mt-picker :slots="myAddressSlots" :Slot="regionToolbar" valueKey="label" :show-toolbar="false" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
      </mt-popup>
    </main>
  </div>
</template>

<script>
import { getImageCode, getMobileCode, getAreaList } from '@/api/c_api'
import { storeRegister } from '@/api/m_api'
import { geocoderV2BaiDu } from '@/position'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Validator } from 'vee-validate';
import CommonHeader from '@/components/common-header'

export default {
  name: 'retailerSettled',
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "商家入驻",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      passwordControl: {
        state: 1,
        type: 'password',
        iconClass: 'rsicon-chakan1'
      },
      imageCodeUrl: '',
      logoPreviewUrl: '',
      filePreviewUrl: '',
      imageCodeUrl: '',
      treatyState: true,
      getCodeObj: {
        long: 6,
        state: true,
        text: '获取验证码'
      },
      store: {
        corporateName: '赵家小铺',
        corporateAddress: '左转回头',
        corporateCode: '123123',
        password: '123456',
        mobile: '15584461401',
        imageCode: '',
        mobileCode: '',
        type: 'RETAILER',
        corporateLogo: null,
        file: null,
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
        }
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
      ]

    }
  },
  components: {
    CommonHeader
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    clearInterval(this._time)
  },
  methods: {
    init() {
      this.$validator.localize("zh_CN")
      this.changeImage()
      this.getAreaList(0, 'province')
    },
    settledRequest() {      
      let that = this
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          this.$indicator.open()
          const address = this.store.salesAreaCode.value+this.store.corporateAddress
          geocoderV2BaiDu(address)
          let formData = new FormData()
          formData.append('corporateName', this.store.corporateName)
          formData.append('corporateAddress', address)
          formData.append('corporateCode', this.store.corporateCode)
          formData.append('password', this.store.password)
          formData.append('mobile', this.store.mobile)
          formData.append('code', this.store.mobileCode)
          formData.append('type', this.store.type)
          formData.append('salesAreaCode', this.store.salesAreaCode.code)
          formData.append('corporateLogo', this.store.corporateLogo)
          formData.append('file', this.store.file)
          this.times = setInterval(()=>{
            const lng = Cookies.get('RETAILERSETTLED_LNG')
            const lat = Cookies.get('RETAILERSETTLED_LAT')
            if(lng&&lat){
              lng?formData.append('lng', lng):console.log(lng,'lng')
              lat?formData.append('lat', lat):console.log(lat,'lat')
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                }
              }
              axios.post('http://demo.lbsrj.cn/m-api/business/enter', formData, config).then((res) => {
                const result = res.data
                console.log(result, 'result')
                let _msg = ''
                if (result.code === 200) {
                  _msg = '入驻成功'
                  this.$toast({
                    message: _msg,
                    type: 'warning'
                  })
                  that.$router.push({ path: '/Home' })
                }
                this.$indicator.close()
              }).catch((error) => {
                this.$indicator.close()
                console.log('接口错误' + error)
              })
              clearInterval(this.times)
            }else{
                console.log('为请求到地理转码数据')
            }
          },1000)

        } else {
          let list = this.errors.all();
          let msg = '请正确填写信息';
          if (list[0] !== "validation.messages._default") {
            msg = list[0];
          }
          this.$toast({
            message: msg,
            type: 'warning'
          });

        }
      })
    },
    changePasswordState() {
      if (this.store.password.state === 1) {
        this.passwordControl.type = 'text';
        this.store.password.state = 2;
        this.passwordControl.type.iconClass = 'rsicon-chakan'
      } else {
        this.passwordControl.type = 'password';
        this.store.password.state = 1;
        this.passwordControl.type.iconClass = 'rsicon-chakan1'
      }
    },
    changeImage() {
      this.imageCodeUrl = 'http://demo.lbsrj.cn/c-api/image/code/get?' + (new Date()).getTime()
    },
    getCode() {
      if (this.getCodeObj.state) {
        this.codeRequest()
      } else {
        return false
      }
    },
    codeRequest() {
      this.$validator.validate('imageCode').then(result => {
        if (result === false) {
          this.$toast({
            message: '请输入正确的图片验证码',
            type: 'warning'
          })
          return
        } else {
          this.$validator.validate('phone').then(result => {
            if (result === false) {
              this.$toast({
                message: '请输入正确的手机号码',
                type: 'warning'
              })
              return
            } else {
              const parasm = {
                mobile: this.store.mobile,
                code: this.store.imageCode,
              }
              getMobileCode(parasm).then(result => {
                console.log(result, 'result')
                if (result.code === 200) {
                  //alert(result.data)
                  this.getCodeObj.state = false
                  let second = 61;
                  let that = this;
                  this._time = setInterval(function () {
                    if (second > 0) {
                      second--;
                      console.log(that.getCodeObj.text)
                      // that.getCodeObj.text = '(' + second + 's)后重新获取验证码';
                    } else {
                      that.getCodeObj.text = '获取验证码';
                      that.getCodeObj.state = true;
                      clearInterval(that._time);
                    }
                  }, 1000)
                }
              })
            }
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
      this.store.salesAreaCode.value = this.store.salesAreaCode._value
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
      this.store.salesAreaCode._value = values[0]["label"] + values[1]["label"] + values[2]["label"] + values[3]["label"]
      if (this.regionAble === true) {
        //取值并赋值
        this.store.salesAreaCode.value = values[0]["label"] + values[1]["label"] + values[2]["label"] + values[3]["label"]
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
      this.store.salesAreaCode.code = values[3]["code"]
    },
    uploadFileChange(el, demo) {
      const that = this
      let reads = new FileReader()
      if (demo === 'logo') {
        let f = document.getElementById('upLoadLogo').files[0]
        this.store.corporateLogo = f
        //console.log(f,'f')
        reads.readAsDataURL(f)
        reads.onload = function (e) {
          that.logoPreviewUrl = this.result
        }
      } else if (demo === 'file') {
        let f = document.getElementById('upLoadFile').files[0]
        this.store.file = f
        reads.readAsDataURL(f)
        reads.onload = function (e) {
          that.filePreviewUrl = this.result
        }
      }
      console.log(el.target.value, 'el')
    }
  }
}
</script>

