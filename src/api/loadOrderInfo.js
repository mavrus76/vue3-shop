import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadOrderInfo(context, orderId) {
  return axios
    .get(`${API_BASE_URL}/api/orders/${orderId}`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
    .then((response) => {
      context.commit('updateOrderInfo', response.data);
    });
}
