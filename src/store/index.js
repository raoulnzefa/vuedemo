import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Cart: [],
  },
  getters: {
    getCart: state => {
      console.log(state.Cart);
      return state.Cart
    },
    getCartLength: (state, getters) => {
      return getters.getCart.length
    },
    getTotalPrice: (state) => {
      let total = 0;
      for (let index = 0; index < state.Cart.length; index++) {
        const element = state.Cart[index];
        total += element.net_price * element.count;
      }
      return total.toFixed(2);
    }
  },
  mutations: {
    addToCart(state, {
      product
    }) {
      state.Cart.push(
        product);
    },
    deleteFromCart(state, product) {
      const index = state.Cart.indexOf(product);
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
      console.log(commit, product);
      commit('deleteFromCart', product);
    }
  },
  modules: {}
})