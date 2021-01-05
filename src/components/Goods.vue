<template>
  <div class="Goods">
    <b-container fluid>
      <b-form-input type="text" v-model="search" placeholder="searchbox" />
      <b-row cols="4">
        <b-col class="cards" v-for="good in filteredGoods" :key="good.name">
          <b-card :title="good.name">
            <b-card-img
              :src="good.image"
              v-on:click="detailsClick(good)"
            ></b-card-img>

            <b-card-text>
              {{ good.description }}
            </b-card-text>
            <b-card-text>
              <h2><b>$</b> {{ good.net_price }}</h2>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="detailsModal" size="xl" centered header-border-variant="none">
      <template #modal-header>
        <h4>{{ selectedGood.name }}</h4>
      </template>

      <b-container fluid>
        <b-row cols="2">
          <b-col>
            <b-carousel controls indicators>
              <b-carousel-slide
                v-for="image in selectedGood.images"
                :key="image.title"
                :caption="image.title"
                :text="image.description"
                :img-src="image.url"
              >
              </b-carousel-slide>
            </b-carousel>
          </b-col>
          <b-col>
            <b-row>
              {{ selectedGood.description }}
            </b-row>
            <b-row>
              <h2><b>$</b> {{ selectedGood.net_price }}</h2>
            </b-row>

            <b-row>
              <b-badge v-for="tag in selectedGood.tags" :key="tag">
                {{ tag }}
              </b-badge>
            </b-row>
            <b-row>
              How many items do you want?
              <b-form-input
                id="range-2"
                v-model="goodCount"
                type="range"
                min="1"
                max="5"
                step="1"
              ></b-form-input>
            </b-row>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <b-button size="sm" class="float-right" v-on:click="hideModal()">
          Close
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          v-on:click="addToCart()"
        >
          Add to Cart
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Goods",
  data: function() {
    return {
      goods: [],
      search: "",
      selectedGood: 0,
      goodCount: '',
    };
  },
  methods: {
    detailsClick(good) {
      this.selectedGood = good;
      this.showModal();
    },
    addToCart() {
      //Cart mechanics go here
      const good= {...this.selectedGood,count:Number(this.goodCount)}
      this.$store.dispatch("addToCart", {
        product: good
      });

      this.hideModal();
      this.$bvToast.toast("Successfully added to cart", {
        title: "Success",
        variant: "success",
        autoHideDelay: 1000,
      });
    },

    showModal() {
      this.$bvModal.show("detailsModal");
    },
    hideModal() {
      this.$bvModal.hide("detailsModal");
      this.selectedGood=0;
    },
  },
  beforeCreate() {
    axios
      .get("https://fakerapi.it/api/v1/products")
      .then((res) => (this.goods = res.data.data));
  },

  computed: {
    filteredGoods: function() {
      return this.goods.filter((goods) => {
        return goods.name.match(this.search);
      });
    },
  },
};
</script>

<style>
.cards {
  margin-top: 5px;
  margin-bottom: 5px;
}

.modalImage {
  margin-right: 10px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.modal-header {
  border-bottom: 0 none !important;
}

.modal-footer {
  border-top: 0 none !important;
}

.badge {
  margin-right: 3px;
}
</style>
