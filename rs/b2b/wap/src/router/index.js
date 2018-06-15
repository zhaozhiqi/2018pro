import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Classify from '@/pages/Classify'
import text from '@/pages/text'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      name: 'text',
      component: text
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    }
  ]
})
