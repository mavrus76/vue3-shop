<template>
  <li v-bind="$attrs" class="catalog__item" v-for="product in productsNormalized" :key="product.id">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title" @click.prevent="openQuickView(product.id)">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.id" />
          <span class="colors__value" :style="{ 'background-color': color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>

  <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentProductId" />
  </BaseModal>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import { defineAsyncComponent, defineComponent, h } from 'vue';
import BaseModal from '@/components/BaseModal.vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка...'),
    }),
  },
  props: ['products'],
  data() {
    return {
      currentProductId: null,
    };
  },
  methods: {
    gotoPage,
    openQuickView(productId) {
      this.currentProductId = productId;
    },
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    productsNormalized() {
      return this.products.map((product) => ({
        ...product,
        pricePretty: numberFormat(product.price),
      }));
    },
  },
});
</script>
