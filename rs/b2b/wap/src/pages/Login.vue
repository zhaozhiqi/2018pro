<template>
    <div id="login">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <form class="login-form" action="">
                <label :class="{'error':errors.has('account')}">
                    <i class="rsiconfont rsicon-icon"></i>
                    <input 
                    type="text" 
                    v-validate ="'required|alpha_num|min:5'" 
                    name="account" 
                    placeholder="用户名/手机号" 
                    v-model="admin.account.value"
                    />
                </label>
                <label :class="{'error':errors.has('password')}">
                    <i class="rsiconfont rsicon-mima"></i>
                    <input 
                    :type="admin.password.type" 
                    v-validate ="'required|min:6'" 
                    name="password" 
                    placeholder="请输入密码" 
                    v-model="admin.password.value"/>
                    <i class="rsiconfont" :class="admin.password.iconClass" @click="changePasswordState"></i>
                </label>
                <label :class="{'error':errors.has('imageCode')}">
                    <i class="rsiconfont rsicon-mima"></i>
                    <input 
                    type="text" 
                    v-validate ="'required|min:4'" 
                    name="imageCode" 
                    placeholder="请输入验证码" 
                    v-model="admin.imageCode.value"
                    class="imageCodeInt"/>
                    <img class="imageCodeImg" 
                    :src="admin.imageCode.url" 
                    alt="" 
                    @click="changeImage()">
                </label>
                <label :class="{'error':errors.has('phone')}">
                    <span class="phoneFirst">+86</span>
                    <input 
                    type="text" 
                    v-validate ="'required|phone'" 
                    name="phone" 
                    placeholder="请输入手机号" 
                    v-model="admin.mobile.value"/>
                </label>
                <label :class="{'error':errors.has('mobileCode')}">                    
                    <input type="number" 
                    v-validate ="'required|numeric|digits:6'" 
                    name="mobileCode" 
                    class="noIndent" 
                    placeholder="请输入手机验证码" 
                    v-model="admin.mobileCode.value" />
                    <div class="getCode" 
                    @click="getCode">{{getCodeObj.text}}</div>
                </label>
            </form>
            <button class="login" @click="login">登录</button>
            <div class="menu">
                <router-link to="/resetPass">找回密码</router-link>
                <router-link to="/register">手机快速登录</router-link>
                <!--<router-link to="/register?username=">手机快速登录</router-link>-->
            </div>
        </main>
    </div>
</template>

<script>
import { getImageCode, getMobileCode } from '@/api/c_api'
import { Validator } from 'vee-validate';
const validator = new Validator();
import CommonHeader from '@/components/common-header'
import zh_CN from "vee-validate/dist/locale/zh_CN"
import Cookies from 'js-cookie'
export default {
    name:'login',
    data(){
        return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "账号登录",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            },
            admin:{
                account:{
                    value:'admin1'
                },
                password:{
                    state: 1,
                    type:'password',
                    iconClass:'rsicon-chakan1',
                    value:'123456'
                },
                mobile:{
                  value:''
                },
                imageCode:{
                  url:'',
                  value:''
                },
                mobileCode:{
                  value:''
                }
            },
            Rurl:null,
            getCodeObj:{
                long: 6,
                state:true,
                text:'获取验证码'
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
    mounted(){
      this.Rurl = this.$route.query.Rurl || '/'      
    },
    beforeDestroy(){
        clearInterval(this._time)
    },
    methods:{
        login(){
            //console.log(this.errors.all(),this.errors.has('account'),this.errors.first('account'),this.errors,this.$validator.validateAll());
            // let account = this.$validator.fields.find({ name: 'account' });
            // this.$validator.validate('account').then((msg)=>{})

            this.$validator.validateAll().then((msg)=>{
                if(msg){
                    this.$store.commit('login', {account:this.admin.account.value, password:this.admin.password.value,that:this});
                    let Login = Cookies.get('Login'); 
                    
                    // if(this.$store.state.login === true  ){
                    if(Login === 'true'){
                        this.$router.push({path:this.Rurl})
                        //登陆成功跳回原路径
                    }
                    // }
                }else{
                    let list = this.errors.all()
                    console.log(list,'list',list[0])
                    let msg = '请正确填写信息'
                    if(list[0] !== "validation.messages._default"){
                        msg = list[0]
                    }
                    this.$toast({
                        message: msg,
                        type: 'warning'
                    })
                   
                }
            })
            
            // this.$messagebox('121')
            // this.$MassageBox('提示信息');
            // Toast('提示信息');
        },
        changePasswordState(){
            if(this.admin.password.state === 1){
                this.admin.password.type = 'text';
                this.admin.password.state = 2;
                this.admin.password.iconClass = 'rsicon-chakan'
            }else{
                this.admin.password.type = 'password';
                this.admin.password.state = 1;
                this.admin.password.iconClass = 'rsicon-chakan1'
            }
        },
        changeImage(){
          this.admin.imageCode.url = 'http://demo.lbsrj.cn/c-api/image/code/get?' + (new Date()).getTime()
        },
        getCode(){
            if(this.getCodeObj.state){
                this.codeRequest()
            }else{
                return false
            }
        },
        codeRequest(){
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
            if(result === false){
              this.$toast({
              message: '请输入正确的图片验证码',
                  type: 'warning'
              })
              return 
            }else{
              this.$validator.validate('phone').then(result => {
                if(result === false){
                  this.$toast({
                  message: '请输入正确的手机号码',
                      type: 'warning'
                  })
                  return 
                }else{
                  getMobileCode().then(result => {
                    console.log(result,'result')
                    if(result.code === 200){
                      this.getCodeObj.state = false
                      let second = 61;
                      let that = this;
                      this._time = setInterval(function(){
                          if(second > 0){
                              second--;
                              console.log(that.getCodeObj.text)
                              that.getCodeObj.text = '('+ second +'s)后重新获取验证码';
                          }else{
                              that.getCodeObj.text = '获取验证码';
                              that.getCodeObj.state = true;
                              clearInterval(that._time);
                          }
                      },1000)
                    }
                  })
                }
              })
            }
          })
        },
        passwInvalid(){
          console.log('214212')
        }
    }
}
</script>

