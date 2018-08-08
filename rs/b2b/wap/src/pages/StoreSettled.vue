<template>
    <div id="Register">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
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
            </form>
            <div class="treaty">
                <input type="checkbox" v-model="treatyState" />
                同意
                <router-link to="/treaty">用户注册协议</router-link>
            </div>
            <button class="registerBtn" @click="register">登录</button>
            <div class="menu">
                <router-link to="/login">账号密码登录</router-link>
            </div>
        </main>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'

export default {
    name:'storeSettlrd',
    data(){
        return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "商家入驻",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            },
            treatyState:true,
            getCodeObj:{
                long: 6,
                state:true,
                text:'获取验证码'
            },
            admin:{
                phone:null,
                code:null
            }
        }
    },
    components: {
        CommonHeader
    },
    beforeDestroy(){
        clearInterval(this._time)
    },
    methods:{
        register(){
             this.$validator.validateAll().then((msg)=>{
                if(msg){
                    this.$toast({
                        message: '提交成功'+this.admin.phone+'---'+this.admin.code,
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
        }
    }
}
</script>

