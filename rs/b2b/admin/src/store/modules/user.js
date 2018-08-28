import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getNoticeList } from '@/api/a_api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    // token: getToken(),
    // name: 'admin',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    // roles: []
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    noReadNotice: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NOREADNOTICE: (state, noReadNotice) => {
      console.log()
      if (state.noReadNotice === noReadNotice) {
        return
      } else {
        state.noReadNotice = noReadNotice
      }
    }
  },

  actions: {
    // 登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if (response.code === 200) {
            commit('SET_TOKEN', 'login')// 在vux中保存token
            setToken('login')// 保存token的cookie
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array!')
        //   }
        getUserInfo(state.token).then(response => {
          const data = response.data
          // ['ADMIN','MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER']
          if (response.code === 200 && data.type) {
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.headThumb)
            switch (data.type) {
              case 'A':commit('SET_ROLES', ['ADMIN'])
                break
              case 'M':commit('SET_ROLES', ['MANUFACTURER'])
                break
              case 'D':commit('SET_ROLES', ['DISTRIBUTOR'])
                break
              case 'W':commit('SET_ROLES', ['WHOLESALER'])
                break
              case 'R':commit('SET_ROLES', ['RETAILER'])
                break
              default:
                break
            }
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    GetUserNoticeInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getNoticeList().then(response => {
          if (response.code === 200 && response.data) {
            let num = 0
            response.data.records.forEach(item => {
              if (item.isView === 0) {
                num += 1
              }
            })
            commit('SET_NOREADNOTICE', num)
          } else {
            commit('SET_NOREADNOTICE', 0)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
