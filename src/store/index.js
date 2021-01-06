import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Cart: [],
  },
  getters: {
    getCart: state => state.Cart,
    getCartLength: (state, getters) => {
      return getters.getCart.length
    }
  },
  mutations: {
    addToCart(state, {
      product
    }) {
      state.Cart.push(
        product);
    },
    deleteFromCart(state, {
      product
    }) {
      let index = state.Cart.indexOf(product);
      if (index > -1)
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
      product
    }) => {
      commit('deleteFromCart', product);
    }
  },
  modules: {}
})