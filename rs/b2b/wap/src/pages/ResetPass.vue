<template>
    <div id="resetPass">
        <CommonHeader :commonHeaderObj="commonHeaderObj" v-on:otherClick="comHeaderOtherClick"></CommonHeader>
        <main class="main">
            <form class="register-form" action="">
                <label :class="{'error':errors.has('phone')}">
                    <span class="phoneFirst">+86</span>
                    <input 
                    type="text" 
                    v-validate ="'required|phone'" 
                    name="phone" 
                    placeholder="请输入手机号" 
                    v-model="admin.phone"/>
                </label>
                <label :class="{'error':errors.has('code')}">                    
                    <input type="number" 
                    v-validate ="'required|numeric|digits:6'" 
                    name="code" 
                    class="noIndent" 
                    placeholder="请输入验证码" 
                    v-model="admin.code" />
                    <div class="getCode" @click="getCode">{{getCodeObj.text}}</div>
                </label>
                <label :class="{'error':errors.has('newpassword')}">
                    <input 
                    type="text" 
                    v-validate ="'required|max:16|min:6'" 
                    name="newpassword" 
                    class="noIndent" 
                    placeholder="请输入新密码" 
                    v-model="admin.password"/>
                </label>
                <label :class="{'error':errors.has('passwordAgain')}">
                    <input 
                    type="text" 
                    v-validate ="{'confirmed':admin.password}" 
                    name="passwordAgain" 
                    class="noIndent" 
                    placeholder="请再次输入新密码" 
                    v-model="admin.passwordAgain"/>
                </label>

            </form>
            <button class="resetPassBtn" @click="resetPass">确定修改</button>
            <div class="menu">
                <router-link to="/register">注册账号</router-link>
                <router-link to="/login">账号密码登录</router-link>
              <router-link to="/messageLogin">短信验证登录</router-link>
            </div>
        </main>
        <section class="popup-center" v-show="popupCenterState">
            <div class="explain">
                <h3>找回密码说明</h3>
                <div class="con">
                    <h4><i class="rsiconfont rsicon-shouji"></i>手机找回密码</h4>
                    <p>通过官网绑定手机号码，获取验证码后，直接重置新密码；</p>
                    <h4><i class="rsiconfont rsicon-dianhuahover"></i>客服电话找回</h4>
                    <p>如果忘记手机号码，请拨打<b>400-999-1919</b>通过人工坐席进行重置</p>
                </div>
                <div class="closeBtn" @click="closePopupCenter">知道了</div>
            </div>
        </section>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'

export default {
    name:'register',
    data(){
        return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "重置密码",
                isOtherShow: true,
                otherLink: {},
                otherIconClass: "rsicon-wenhao"
            },
            getCodeObj:{
                long: 6,
                state:true,
                text:'获取验证码'
            },
            admin:{
                phone:null,
                code:null,
                password:null,
                passwordAgain:null
            },
            popupCenterState:true
        }
    },
    components: {
        CommonHeader
    },
    beforeDestroy(){
        clearInterval(this._time)
    },
    methods:{
        comHeaderOtherClick(param){
            this.popupCenterState = true
        },
        resetPass(){
             this.$validator.validateAll().then((msg)=>{
                if(msg){
                    this.$toast({
                        message: '提交成功'+'-电话-'+this.admin.phone+'-验证码-'+this.admin.code+'-密码-'+this.admin.password,
                        type: 'warning'
                    });
                }else{
                    let list = this.errors.all();
                    let msg = '请正确填写信息';
                    if(list[0] !== "validation.messages._default"){
                        msg = list[0];
                    }
                    this.$toast({
                        message: msg,
                        type: 'warning'
                    });
                   
                }
            })
        },
        getCode(){
            if(this.getCodeObj.state){
                this.codeRequest()
            }else{
                return false
            }
        },
        codeRequest(){
            this.getCodeObj.state = false;
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
        },
        closePopupCenter(){
            this.popupCenterState = false;
        }
    }
}
</script>
