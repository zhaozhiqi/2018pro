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
        <label>
          <i class="rsiconfont rsicon-yaoqingma"></i>
          <input type="text" name="inviteCode" placeholder="请输入邀请码" v-model="store.inviteCode" />
        </label>
        <label :class="{'error':errors.has('corporateLogoServerId')}" class="upLoadLogoOut" v-if="this.isWechat">
          <i class="rsiconfont rsicon-icon"></i>
          <span>选择公司Logo</span>
          <input type="button" v-validate="'required'" name="corporateLogoServerId" @click="weCharChangeImg('logo')" v-model="store.corporateLogoServerId"/>
        </label>
        <label :class="{'error':errors.has('corporateLogo')}" class="upLoadLogoOut" v-else>
          <i class="rsiconfont rsicon-icon"></i>
          <span>选择公司Logo</span>
          <input type="file" id="upLoadLogo" accept="image/gif,image/jpeg,image/jpg,image/png" v-validate="'required'" name="corporateLogo" placeholder="请选择公司LOGO" @change="uploadFileChange($event,'logo')" />
        </label>
        <img class="logoPreviewImg" :src="logoPreviewUrl" v-show="logoPreviewUrl"/>
        <label :class="{'error':errors.has('fileServerId')}" class="upLoadFileOut" v-if="this.isWechat">
          <i class="rsiconfont rsicon-wenjian"></i>
          <span>选择营业执照图片文件</span>
          <input type="button" v-validate="'required'" name="fileServerId" @click="weCharChangeImg('file')" v-model="store.fileServerId"/>
        </label>
        <label :class="{'error':errors.has('corFile')}" class="upLoadFileOut" v-else>
          <i class="rsiconfont rsicon-wenjian"></i>
          <span>选择营业执照图片文件</span>
          <input type="file" id="upLoadFile" accept="image/gif,image/jpeg,image/jpg,image/png" v-validate="'required'" name="corFile" placeholder="请选择营业执照图片文件" @change="uploadFileChange($event,'file')" />
        </label>
        <img class="filePreviewImg" :src="filePreviewUrl" v-show="filePreviewUrl"/>
        <label :class="{'error':errors.has('wxQrCodeServerId')}" class="upLoadFileOut" v-if="this.isWechat">
          <i class="rsiconfont rsicon-erweima"></i>
          <span>选择支付二维码</span>
          <input type="button" v-validate="'required'" name="wxQrCodeServerId" @click="weCharChangeImg('QRCode')" v-model="store.wxQrCodeServerId" />
        </label>
        <label :class="{'error':errors.has('corPayWxQRCode')}" class="upLoadFileOut" v-else>
          <i class="rsiconfont rsicon-erweima"></i>
          <span>选择支付二维码</span>
          <input type="file" id="upLoadQRCode" accept="image/gif,image/jpeg,image/jpg,image/png" v-validate="'required'" name="corPayWxQRCode" placeholder="请选择支付二维码" @change="uploadFileChange($event,'QRCode')" />
        </label>
        <img class="filePreviewImg" :src="QRCodePreviewUrl" v-show="QRCodePreviewUrl"/>
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
import { getImageCode, getMobileCode, getAreaList, getWechatConfig } from '@/api/c_api'
import { storeRegister } from '@/api/m_api'
import axios from 'axios'
import { Validator } from 'vee-validate';
import CommonHeader from '@/components/common-header'
import { isWeiXin } from '@/utils'

export default {
  name: 'retailerSettled',
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "经销商入驻",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      passwordControl: {
        state: 1,
        type: 'password',
        iconClass: 'rsicon-chakan1'
      },
      imageCodeUrl: '',
      logoPreviewUrl: null,
      filePreviewUrl: null,
      QRCodePreviewUrl: null,
      treatyState: true,
      getCodeObj: {
        long: 6,
        state: true,
        text: '获取验证码'
      },
      store: {
        corporateName: null,
        corporateAddress: null,
        corporateCode: null,
        password: null,
        mobile: null,
        imageCode: '',
        mobileCode: '',
        type: 'DISTRIBUTOR',
        inviteCode: null,
        corporateLogo: null,
        file: null,
        wxQrCode: null,
        corporateLogoServerId:null,
        fileServerId:null,
        wxQrCodeServerId:null,
        salesAreaCode: {
          value: null,
          _value: null,
          code: null,
          province: '浙江省',
          city: '杭州市',
          provinceCode: null,
          cityCode: null,
        }
      },
      regionHold: [{ code: 330000 }, { code: 330100 }],
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
        }
      ],
      isWechat:false
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
      this.isWechat = isWeiXin()
      this.getWeChatConfingData()
    },
    settledRequest() {
      let that = this
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          let formData = new FormData()
          const address = this.store.salesAreaCode.value+this.store.corporateAddress
          formData.append('corporateName', this.store.corporateName)
          formData.append('corporateAddress', address)
          formData.append('corporateCode', this.store.corporateCode)
          formData.append('password', this.store.password)
          formData.append('mobile', this.store.mobile)
          formData.append('code', this.store.mobileCode)
          formData.append('type', this.store.type)
          formData.append('salesAreaCode', this.store.salesAreaCode.code)
          if(this.store.inviteCode){
            formData.append('inviteCode', this.store.inviteCode)
          }

          if(this.isWechat){
            formData.append('corporateLogoServerId', this.store.corporateLogoServerId)
            formData.append('fileServerId', this.store.fileServerId)
            formData.append('wxQrCodeServerId', this.store.wxQrCodeServerId)
          }else{
            formData.append('corporateLogo', this.store.corporateLogo)
            formData.append('file', this.store.file)
            formData.append('wxQrCode', this.store.wxQrCode)
          }
          
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
            }
          }
          axios.post('http://demo.lbsrj.cn/m-api/business/enter', formData, config).then((res) => {
            const result = res.data
            console.log(result, '入驻-business/enter')
            let _msg = ''
            if (result.code === 200) {
              _msg = '入驻成功'
              this.$toast({
                message: _msg,
                type: 'warning'
              });
              that.$router.push({ path: '/Home' })
            }else{
              this.$toast({
                message: result.msg,
                type: 'warning'
              });
            }
          }).catch((error) => {
            console.log('接口错误' + error)
          })
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
    getWeChatConfingData() {
      getWechatConfig().then(res => {
        console.log(res, 'getWechatConfig')
        if (res.code === 200) {
          wx.config({
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'chooseImage', //拍照或从手机相册中选图接口
              'previewImage', //预览图片接口
              'uploadImage', //上传图片接口
              'downloadImage', //下载图片接口
              'chooseWXPay',//微信支付接口
              'openLocation',//使用微信内置地图查看位置接口
              'getLocation' //获取地理位置接口
            ]
          })
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
      const that = this
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
                // console.log(result, 'getMobileCode')
                if (result.code === 200) {
                  //alert(result.data)
                  this.getCodeObj.state = false
                  let second = 61;
                  let that = this;
                  this._time = setInterval(function () {
                    if (second > 0) {
                      second--;
                      // console.log(that.getCodeObj.text)
                      that.getCodeObj.text = '(' + second + 's)后重新获取验证码';
                    } else {
                      that.getCodeObj.text = '获取验证码';
                      that.getCodeObj.state = true;
                      clearInterval(that._time);
                    }
                  }, 1000)
                }
              }).catch(err=>{           
                that.changeImage()
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
      this.store.salesAreaCode._value = values[0]["label"] + values[1]["label"]
      if (this.regionAble === true) {
        //取值并赋值
        this.store.salesAreaCode.value = values[0]["label"] + values[1]["label"]
      }
      this.myAddressSlots.provinceCode = values[0]["code"]
      this.myAddressSlots.cityCode = values[1]["code"]
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
        default:
          break
      }
      this.store.salesAreaCode.code = values[1]["code"]
    },
    uploadFileChange(el, demo) {
      const that = this
      if(this.isWechat === true){
        console.log('weixin')
      }else{
        const maxSize = 1024 * 1024
        let reads = new FileReader()
        if (demo === 'logo') {
          let f = document.getElementById('upLoadLogo').files[0]
          // console.log(f,f.size,el,'f',maxSize,f.size>maxSize)
          // alert(f.size)
          if(f.size > maxSize){
            this.$toast({
              message: '图片太大，请上传1M以下的图片',
                type: 'warning'
            })
          }else{
            this.store.corporateLogo = f
            reads.readAsDataURL(f)
            reads.onload = function (e) {
              that.logoPreviewUrl = this.result
            }
          }
        } else if (demo === 'file') {
          let f = document.getElementById('upLoadFile').files[0]
          if(f.size > maxSize){
            this.$toast({
              message: '图片太大，请上传1M以下的图片',
                type: 'warning'
            })
          }else{
            this.store.file = f
            reads.readAsDataURL(f)
            reads.onload = function (e) {
              that.filePreviewUrl = this.result
            }
          }
        } else if (demo === 'QRCode') {
          let f = document.getElementById('upLoadQRCode').files[0]
          if(f.size > maxSize){
            this.$toast({
              message: '图片太大，请上传1M以下的图片',
                type: 'warning'
            })
          }else{
            this.store.wxQrCode = f
            reads.readAsDataURL(f)
            reads.onload = function (e) {
              that.QRCodePreviewUrl = this.result
            }
          }
        }
        console.log(el.target.value, 'el')
      }
    },
    weCharChangeImg(demo){
      const that = this
      wx.chooseImage({
        count: 1, //张数， 默认9
        sizeType: ['compressed'], //建议压缩图    原图'original', 压缩图'compressed'
        sourceType: ['album', 'camera'], // 来源是相册、相机
        success: function(res) {
          const localIds = res.localIds
          const localId = localIds.toString();
          switch (demo) {
            case 'logo':that.logoPreviewUrl = localIds//选择的图片 显示
              that.weChatGetServerId(localId,demo)
              break
            case 'file':that.filePreviewUrl = localIds//选择的图片 显示
              that.weChatGetServerId(localId,demo)
              break
            case 'QRCode':that.QRCodePreviewUrl = localIds//选择的图片 显示
              that.weChatGetServerId(localId,demo)
              break
            default:
              break
          }
          // console.log(localIds);
        }
      })
    },
    weChatGetServerId(localId,demo){
      const that = this
      wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示                         
					success: function(res) {
            const serverId = res.serverId
            switch (demo) { 
              case 'logo':that.store.corporateLogoServerId = serverId  // 返回图片的服务器端ID
                break
              case 'file':that.store.fileServerId = serverId  // 返回图片的服务器端ID
                break
              case 'QRCode':that.store.wxQrCodeServerId = serverId // 返回图片的服务器端ID
                break
              default:
                break
            }
            that.$toast({
              message:'上传成功',
              type:'success'
            })
          }
      })
    }
  }
}
</script>

