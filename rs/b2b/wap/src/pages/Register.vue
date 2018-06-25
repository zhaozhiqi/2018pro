<template>
    <div id="login">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <form class="login-form" action="">
                <label >
                    <span class="phoneFirst">+86</span>
                    <input type="text" name="" id="" placeholder="请输入手机号" />
                </label>
                <label >                    
                    <input type="number" name="code" class="codeInt" placeholder="请输入验证码" />
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
                state:true,
                text:'获取验证码'
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
            console.log('register')
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
                    clearInterval(_time);
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

.login-form{
    padding: 0;
}

.login-form label{
    position: relative;
    display: block;
    margin: 30px 0 0;
    height: 88px;
    line-height: 88px;    
    border-radius: 10px;
    overflow: hidden;
}

.login-form label input{
    display: block;
    width: 100%;
    height: 100%;
    text-indent: 80px;
    border: none;
    background-color: #fff;
    /* background-color: rgb(250, 255, 189); */
}

.login-form label .codeInt{
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
