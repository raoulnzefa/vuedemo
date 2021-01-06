<template>
  <div class="Cart">
    <b-container>
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
            <b-card-text>
              <b>$</b> {{ item.net_price * item.count.toFixed(2) }}</b-card-text
            >
            <b-button v-on:click="removeCart(item)"
              ><b-icon-trash-fill></b-icon-trash-fill>Remove from Cart</b-button
            >
          </b-card>
        <b-row>
          <h3><b>Grand Total</b> ${{ totalPrice }}</h3>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
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
      this.$store.dispatch("deleteFromCart", { product: item });
    },
  },
  computed: {
    ...mapGetters({ itemCount: "getItemsCount" }),
    ...mapGetters({ totalPrice: "getTotalPrice" }),
  },
});
</script>
<style>
b-card {
  margin: 10px;
  max-width: 500px!important;
}
</style>
