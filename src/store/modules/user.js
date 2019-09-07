import { login, logout, getInfo, getMenu } from '@/api/user'
// import { logout, getMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { saveHead } from '@/utils/requestUtils'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  profilePicture: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PROFILEPICTURE: (state, profilePicture) => {
    state.profilePicture = profilePicture
  }
}

const actions = {
  login({ commit }) {
    console.log('aaaa')
    commit(
      'SET_TOKEN',
      'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxIiwicm9sZUlkIjoiMSIsImlzcyI6InN5c191c2VyIiwibmFtZSI6IuWViuWViiIsImlkIjoiMSIsImV4cCI6MTU3MjMzODEzNSwiaWF0IjoxNTY3MTU0MTM1LCJvcmdJZCI6IjExMSJ9.Tq4VOblXKkHhSd_oXTvOZlFaEPjr-kJAcW8eRnpDX5U'
    )
    setToken(
      'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIxIiwicm9sZUlkIjoiMSIsImlzcyI6InN5c191c2VyIiwibmFtZSI6IuWViuWViiIsImlkIjoiMSIsImV4cCI6MTU3MjMzODEzNSwiaWF0IjoxNTY3MTU0MTM1LCJvcmdJZCI6IjExMSJ9.Tq4VOblXKkHhSd_oXTvOZlFaEPjr-kJAcW8eRnpDX5U'
    )
    saveHead('version', 'businessType', 'deviceId', 0, true)
  },
  getInfo({ commit }) {
    commit('SET_NAME', '张三')
    commit('SET_PROFILEPICTURE', '@/assets/my.jpg')
  }
  // 用户登录
  // login({ commit }, userInfo) {
  //   const { code, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ code: code.trim(), password: password }).then(res => {
  //       const data = res
  //       console.log(data)
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       saveHead('version', 'businessType', 'deviceId', 0, true)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // // 获取用户基础信息
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(res => {
  //       console.log(res)
  //       const data = res
  //       console.log(data)
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //       const { name, profilePicture } = data
  //       commit('SET_NAME', name)
  //       commit('SET_PROFILEPICTURE', profilePicture)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // 获取用户菜单
  // getMenu({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getMenu(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { name, profilePicture } = data

  //       commit('SET_NAME', name)
  //       commit('SET_PROFILEPICTURE', profilePicture)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // 用户退出
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // 删除 token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     removeToken()
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
