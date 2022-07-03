import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function deleteProductFromCart(context, productId) {
  axios
    .delete(`${API_BASE_URL}/api/baskets/products`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        productId,
      },
    })
    .then((response) => {
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    });
}
