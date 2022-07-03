import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadCategories() {
  axios.get(`${API_BASE_URL}/api/productCategories`)
    .then((response) => { this.categoriesData = response.data; });
}
