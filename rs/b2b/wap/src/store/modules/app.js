import Cookies from 'js-cookie'

const app = {
  state: {
    language: Cookies.get('language') || 'cn'
  },
  mutations: {
    BACK_LASTPAGE: (state) => {
      window.history.go(-1)
    }
  },
  actions: {
    backLastPage({ commit }) {
      commit('BACK_LASTPAGE')
    }
  }
}

export default app
