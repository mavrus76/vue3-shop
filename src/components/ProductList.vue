<template>
  <ul class="catalog__list">
    <ProductItems
      :products="products"
    ></ProductItems>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import ProductItems from './ProductItems.vue';

export default defineComponent({
  components: { ProductItems },
  props: ['products'],
});
</script>
