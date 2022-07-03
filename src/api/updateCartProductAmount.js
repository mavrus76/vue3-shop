import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function updateCartProductAmount(context, { productId, amount }) {
  context.commit('updateCartProductAmount', { productId, amount });

  if (amount < 1) {
    return false;
  }

  return axios
    .put(`${API_BASE_URL}/api/baskets/products`, {
      productId,
      quantity: amount,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
    .then((response) => {
      context.commit('updateCartProductsData', response.data.items);
    });
}
