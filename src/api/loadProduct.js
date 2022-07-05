import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadProduct() {
  this.productLoading = true;
  this.productLoadingFailed = false;
  axios
    .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
    .then((response) => {
      this.productData = response.data;
    })
    .catch(() => {
      this.productLoadingFailed = true;
    })
    .then(() => {
      this.productLoading = false;
    });
}
