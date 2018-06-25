<template>
    <div id="login">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <form class="login-form" action="">
                <label >
                    <i class="rsiconfont rsicon-icon"></i>
                    <input type="text" name="account" placeholder="用户名/手机号" v-model="admin.account.value"/>
                </label>
                <label >
                    <i class="rsiconfont rsicon-mima"></i>
                    <input :type="admin.password.type" name="password" placeholder="请输入密码" v-model="admin.password.value"/>
                    <i class="rsiconfont" :class="admin.password.iconClass" @click="changePasswordState"></i>
                </label>
            </form>
            <button class="login" @click="login">登录</button>
            <div class="menu">
                <router-link to="/rePassword">找回密码</router-link>
                <router-link to="/register">手机快速登录</router-link>
                <!--<router-link to="/register?username=">手机快速登录</router-link>-->
            </div>
        </main>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'

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
                    value:''
                },
                password:{
                    state: 1,
                    type:'password',
                    iconClass:'rsicon-chakan1',
                    value:''
                }
            }
        }
    },
    components: {
        CommonHeader
    },
    methods:{
        login(){
            this.$toast('login')
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

.rsicon-icon,.rsicon-mima,.rsicon-chakan1,.rsicon-chakan{
    display: block;
    position: absolute;
    top: 24px;
    left: 28px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 38px;
    color: #1652b6;
}

.rsicon-chakan1,.rsicon-chakan{
    left: unset;
    right: 28px;
}

.login{
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

.menu{
    display: flex;
    justify-content: space-between;
}

.menu a{
    color: #1655bf;
    font-size: 26px;
    margin-top: 40px;
}
</style>
