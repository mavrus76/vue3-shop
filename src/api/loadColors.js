import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadColors() {
  axios.get(`${API_BASE_URL}/api/colors`)
    .then((response) => { this.colorsData = response.data; });
}
