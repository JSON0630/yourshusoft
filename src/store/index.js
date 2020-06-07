import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    token: state => state.token
  },
  state: {
    token: ''
  },
  mutations: {
    /**
     * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
     * 使用方法 例:
     * this.$store.update({token: '123456'})
     * 
     *  config需要传入对象
     * @param {*} state 
     * @param {*Object} config 
     */
    update(state, config) {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    }
  }
})

export default store
