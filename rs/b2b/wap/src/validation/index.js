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
              required:(field)=> "请完善"+field+"信息"
          },
          attributes:{
              email:'邮箱',
              password:'密码',
              phone: '手机号',
              account:'账号',
              name: '姓名',
              region: '地址',
              detailedAddress: '详细地址',
              imageCode: '图片验证码',
              mobileCode: '手机验证码',
              corporateName: '公司名称',
              corporateLogo: '公司logo1',
              corporateAddress: '公司地址',
              corporateCode: '组织代码编号',
              corFile:'营业执照图片文件1',
              corPayWxQRCode:'支付二维码1',
              corSalesAreaCode:'销售区域',
              corSalesAreaCodeText:'销售区域',
              corType: '入驻类型',
              corporateLogoServerId:'公司logo2',
              fileServerId:'营业执照图片文件2',
              wxQrCodeServerId:'支付二维码2'
      

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