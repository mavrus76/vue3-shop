import { useStore } from 'vuex';
import { ref } from 'vue';

export default function () {
  const $store = useStore();

  const productAmount = ref(1);
  const productAdded = ref(false);
  const productAddSending = ref(false);
  const isShowAddedMessage = ref(false);
  const doAddToCart = (product) => {
    productAdded.value = false;
    productAddSending.value = true;
    $store
      .dispatch('addProductToCart', { productId: product.id, amount: productAmount.value })
      .then(() => {
        isShowAddedMessage.value = true;
        productAdded.value = true;
        productAddSending.value = false;
      });
  };

  return {
    doAddToCart,
    productAmount,
    productAdded,
    productAddSending,
    isShowAddedMessage,
  };
}
