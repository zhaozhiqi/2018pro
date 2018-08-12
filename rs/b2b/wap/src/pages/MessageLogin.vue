<template>
  <div id="MessageLogin">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
    <main class="main">
      <form class="register-form" action="">
        <label :class="{'error':errors.has('phone')}">
          <!-- <span class="phoneFirst">+86</span> -->
          <i class="rsiconfont rsicon-icon"></i>
          <input type="text" v-validate="'required|phone'" name="phone" placeholder="请输入手机号" v-model="admin.mobile.value" />
        </label>
        <label :class="{'error':errors.has('imageCode')}">
          <i class="rsiconfont rsicon-yduidunpaishixin"></i>
          <input type="text" v-validate="'required|min:4'" name="imageCode" placeholder="请输入验证码" v-model="admin.imageCode.value" class="imageCodeInt" />
          <img class="imageCodeImg" :src="admin.imageCode.url" alt="" @click="changeImage()">
        </label>
        <label :class="{'error':errors.has('mobileCode')}">
          <input type="number" v-validate="'required|numeric|digits:6'" name="mobileCode" class="noIndent" placeholder="请输入手机验证码" v-model="admin.mobileCode.value" />
          <div class="getCode" @click="getCode">{{getCodeObj.text}}</div>
        </label>
      </form>
      <button class="registerBtn" @click="messageLogin()">登录</button>
      <div class="menu">
        <router-link to="/login">账号密码登录</router-link>
        <router-link to="/register">注册账号</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { getImageCode, getMobileCode } from '@/api/c_api'
import { login } from '@/api/m_api'

import CommonHeader from '@/components/common-header'

export default {
  name: 'messagelogin',
  data() {
    return {
      commonHeaderObj: {
        bgStyle: {
          color: "#333",
          backgroundColor: "#fff"
        },
        title: "短息验证登录",
        isOtherShow: false,
        otherIconClass: "rsicon-gengduo"
      },
      treatyState: true,
      getCodeObj: {
        long: 6,
        state: true,
        text: '获取验证码'
      },
      admin: {
        mobile: {
          value: ''
        },
        imageCode: {
          url: '',
          value: ''
        },
        mobileCode: {
          value: ''
        }
      }
    }
  },
  components: {
    CommonHeader
  },
  created() {
    this.$validator.localize("zh_CN")
    this.changeImage()
  },
  beforeDestroy() {
    clearInterval(this._time)
  },
  methods: {
    messageLogin() {
      let that = this
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          const parasm = {
            account: this.admin.mobile.value,
            code: this.admin.mobileCode.value
          }
          login(parasm).then(result => {
            console.log(result, 'result')
            let _msg = ''
            if (result.code === 200) {
              _msg = '登录成功'
              this.$toast({
                message: _msg,
                type: 'warning'
              });
              that.$router.push({ path: '/Home' })
            }
          }).catch(err => {
            console.log('接口错误')
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
    changePasswordState() {
      if (this.admin.password.state === 1) {
        this.admin.password.type = 'text';
        this.admin.password.state = 2;
        this.admin.password.iconClass = 'rsicon-chakan'
      } else {
        this.admin.password.type = 'password';
        this.admin.password.state = 1;
        this.admin.password.iconClass = 'rsicon-chakan1'
      }
    },
    changeImage() {
      this.admin.imageCode.url = 'http://demo.lbsrj.cn/c-api/image/code/get?' + (new Date()).getTime()
    },
    getCode() {
      if (this.getCodeObj.state) {
        this.codeRequest()
      } else {
        return false
      }
    },
    codeRequest() {
      // this.$validator.validateAll().then((msg)=>{
      //   if(msg){
      //     console.log('teur')
      //   }else{
      //     let list = this.errors.items
      //     for(let element of list)
      //       if(element.field === 'imageCode' || element.field === 'phone'){
      //         this.$toast({
      //             message: element.msg,
      //             type: 'warning'
      //         })
      //         return                 
      //     }              
      //   }
      // })
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
                mobile: this.admin.mobile.value,
                code: this.admin.imageCode.value,
              }
              getMobileCode(parasm).then(result => {
                console.log(result, 'result')
                if (result.code === 200) {
                  this.getCodeObj.state = false
                  let second = 61;
                  let that = this;
                  this._time = setInterval(function () {
                    if (second > 0) {
                      second--;
                      console.log(that.getCodeObj.text)
                      that.getCodeObj.text = '(' + second + 's)后重新获取验证码';
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
  }}
</script>

