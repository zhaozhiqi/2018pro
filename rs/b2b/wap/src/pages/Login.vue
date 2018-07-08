<template>
    <div id="login">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
            <form class="login-form" action="">
                <label :class="{'error':errors.has('account')}">
                    <i class="rsiconfont rsicon-icon"></i>
                    <input 
                    type="text" 
                    v-validate ="'required|alpha_num|min:6'" 
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
                    value:'15584461401'
                },
                password:{
                    state: 1,
                    type:'password',
                    iconClass:'rsicon-chakan1',
                    value:'123456'
                }
            },
            Rurl:null
        }
    },
    components: {
        CommonHeader
    },
    created() {     
        this.$validator.localize("zh_CN");
    },
    mounted(){
        this.Rurl = this.$route.query.Rurl || '/'
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
                    let list = this.errors.all();
                    console.log(list,'list',list[0])
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

</style>
