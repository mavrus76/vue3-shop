import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function addProductToCart(context, { productId, amount }) {
  return (new Promise((resolve) => { setTimeout(resolve, 1000); }))
    .then(() => axios
      .post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
      .then((response) => {
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      }));
}
