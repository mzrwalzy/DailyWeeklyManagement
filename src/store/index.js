import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null
  },
  mutations: {
    setUserId(state) {
      state.userId = JSON.parse(window.localStorage.getItem("access-user")).user_id
    }
  },
  actions: {

  },
  modules: {
    tab
  }
})
