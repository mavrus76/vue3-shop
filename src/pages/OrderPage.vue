<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalProducts }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              title="ФИО"
              type="text"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
            />

            <BaseFormText
              v-model="formData.address"
              title="Адрес доставки"
              type="text"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
            />

            <BaseFormText
              v-model="formData.email"
              title="Email"
              type="email"
              :error="formError.email"
              placeholder="Введите ваш Email"
            />

            <BaseFormTextarea
              v-model="formData.comment"
              title="Комментарий к заказу"
              :error="formError.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого:
              <b>{{ totalProducts }}</b>
              товара на сумму
              <b>{{ totalPricePretty }} ₽</b>
            </p>
          </div>
          <button class="cart__button button button--primary" type="submit">Оформить заказ</button>
        </div>
        <div class="lds-spinner" v-if="orderLoading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import order from '@/api/order';
import { defineComponent } from 'vue';
import numberFormat from '@/helpers/numberFormat';

export default defineComponent({
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalProducts: 'cartTotalProducts',
    }),
    // pricePretty() {
    //   return numberFormat(this.item.product.price);
    // },
    totalPricePretty() {
      return numberFormat(this.totalPrice);
    },
  },
  methods: {
    gotoPage,
    order,
  },
});
</script>
