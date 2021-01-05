import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Cart: [],
  },
  mutations: {
    addToCart(state, {
      product
    }) {
      state.Cart.push(
        product);
    },
    deleteFromCart(state, {
      index
    }) {
      if (index >= 0)
        state.Cart.splice(index, 1);
    }
  },
  actions: {
    addToCart: ({
      commit
    }, {
      product
    }) => {
      commit('addToCart', {
        product
      });
    },
    deleteFromCart: ({
      commit
    }, {
      index
    }) => {
      commit('deleteFromCart', {
        index
      });
    }
  },
  modules: {}
})