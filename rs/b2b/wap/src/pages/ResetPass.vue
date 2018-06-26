<template>
    <div id="login">
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
    name:'register',
    data(){
        return {
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "快速登录/注册",
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
                code:null,
                password:null,
                passwordAgain:null
            },
            _time:null
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
        }
    }
}
</script>

<style scoped>
#login{
    height: 100%;
    overflow: hidden;
}

.main{
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    padding: 0 20px;
}

.register-form{
    padding: 0;
}

.register-form label{
    position: relative;
    display: block;
    margin: 30px 0 0;
    height: 88px;
    line-height: 88px;    
    border-radius: 10px;
    overflow: hidden;
}

.register-form label.error{
    border: 1px solid #fa4d3e;
}


.register-form label input{
    display: block;
    width: 100%;
    height: 100%;
    text-indent: 80px;
    border: none;
    background-color: #fff;
    /* background-color: rgb(250, 255, 189); */
}

.register-form label .noIndent{
    text-indent: 20px;
}

.phoneFirst{
    position: absolute;
    top: 24px;
    left: 16px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #1652b6;
}

.getCode{
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    text-align: center;
    background-color: #1652b6;
    color: #fff;
    padding: 0 20px;

}


.registerBtn{
    text-align: center;
    line-height: 90px;
    height: 90px;
    width: 100%;
    margin: 80px auto 0;
    display: block;
    border: 0;
    border-radius: 10px;
    overflow: hidden;
    color: #fff;
    background-color: #1655bf;
    font-size: 30px;
}

.treaty{
    margin-top: 40px;
    font-size: 26px;
}

.treaty input{
    float: left;
    margin: 0 20px 0 0;
}

.treaty a{
    color: #1655bf;    
}

.menu{

}

.menu a{
    float: right;
    color: #1655bf;
    font-size: 26px;
    margin-top: 40px;
}

</style>
