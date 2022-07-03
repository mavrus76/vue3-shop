import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadCart(context) {
  return axios
    .get(`${API_BASE_URL}/api/baskets`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
    .then((response) => {
      if (!context.state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
        context.commit('updateUserAccessKey', response.data.user.accessKey);
      }

      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    });
}
