import Vue from 'vue'
import VeeValidate, {Validator}  from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
// Validator.addLocale(zh_CN);
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})

const Veeconfig = {
    i18n,
    i18nRootKey: 'validation',
    locale: 'zh_CN',
    dictionary: {
       zh_CN: {
          messages: {
              required:(field)=> "请输入正确的"+field
          },
          attributes:{
              email:'邮箱',
              password:'密码',
              phone: '手机号',
              account:'账号'
          }
      }
    }    
};


Validator.extend('phone', {
    messages: {
        zh_CN:field => '手机号格式不正确',
    },
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
 });
  


export {VeeValidate, Veeconfig}