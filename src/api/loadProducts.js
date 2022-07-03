import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default function loadProducts() {
  this.productsLoading = true;
  this.productsLoadingFailed = false;
  clearTimeout(this.loadProductsTimer);
  this.loadProductsTimer = setTimeout(() => {
    axios
      .get(`${API_BASE_URL}/api/products`, {
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          colorId: this.filterColorId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
        },
      })
      .then((response) => { this.productsData = response.data; })
      .catch(() => { this.productsLoadingFailed = true; })
      .then(() => { this.productsLoading = false; });
  }, 0);
}
