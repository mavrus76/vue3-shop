import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function order() {
  this.orderLoading = true;
  this.formError = {};
  this.formErrorMessage = '';

  axios
    .post(`${API_BASE_URL}/api/orders`, {
      ...this.formData,
    }, {
      params: {
        userAccessKey: this.$store.state.userAccessKey,
      },
    })
    .then((response) => {
      this.$store.commit('resetCart');
      this.$store.commit('updateOrderInfo', response.data);
      this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
    })
    .catch((error) => {
      this.formError = error.response.data.error.request || {};
      this.formErrorMessage = error.response.data.error.message;
    })
    .then(() => { this.orderLoading = false; });
}
