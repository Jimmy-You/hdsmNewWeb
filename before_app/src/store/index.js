import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDetail: {

    }
  },
  getters: {
    getCurrentDetail(state) {
      return state.currentDetail;
    }
  },
  mutations: {
    CHANGE_DETAIL(state, data) {
      state.currentDetail = data;
    }
  },
  actions: {
    changeCurrentDetail({ commit }, data) {
      commit('CHANGE_DETAIL', data);
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
