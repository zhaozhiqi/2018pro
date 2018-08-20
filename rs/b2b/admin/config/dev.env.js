'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  //BASE_API: '"https://easy-mock.com/mock/5b45b27135c8a3489c68ff77/admin"',
  //BASE_API: '"http://local.boosj.com:8080/"',
  BASE_API: '"http://souji.boosj.com:8080/"',
  //BASE_API: '"http://dataview.boosj.com/"'
})
