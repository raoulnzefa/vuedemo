<template>
  <div class="Cart">
    <div class="noGoods" v-if="items.length == 0">
      <h3>Add some goods to cart :)</h3>
      <img :src="require(`@/assets/empty.png`)" />
    </div>
    <div class="withGoods" v-else>
      <b-card
        v-for="item in items"
        :key="item.name"
        :title="item.name"
        img-left
        :img-src="item.image"
      >
        <b-card-text>Count:{{ item.count }}</b-card-text>
        <b-card-text> <b>$</b> {{ item.net_price * item.count }}</b-card-text>
        <b-button v-on:click="removeCart({item})"
          ><b-icon-trash-fill></b-icon-trash-fill>Remove from Cart</b-button
        >
      </b-card>

      <b-button> Buy</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store/";
export default Vue.extend({
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = store.state.Cart;
  },
  methods: {
    removeCart(item) {
      this.$store.dispatch("deleteFromCart", {item});
    },
  },
});
</script>
<style>
b-card {
  margin: 10px;
}
</style>
