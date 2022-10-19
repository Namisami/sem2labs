<template>
  <body @click="closeModal" class="body">
    <header class="header">
      <h1 class="header__title">Лабораторная работа 13</h1>
      <p class="header__theme">Темная тема</p>
      <div class="header__toggle" @click="switchTheme">
        <div class="header__slider"></div>
      </div>
    </header>
    <main class="main" id="main">
      <orders class="main__orders" :dark="dark" @currentOrderSet="currentOrder=$event"></orders>
      <shipment class="main__shipments" :dark="dark"></shipment>
      <order :dark='dark' v-if="currentOrder" v-bind:id="currentOrder.id" @updateParent="currentOrder=null"></order>
    </main>
    <footer class="footer">
      <p class="footer__fio">Хасанов Марат Сергеевич</p>
      <p class="footer__group">211-322</p>
      <a aria-label="Переместиться в начало страницы" href="#main" class="footer__scroll">
        <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 59.827 59.827" style="enable-background:new 0 0 59.827 59.827;" xml:space="preserve">
          <g>
            <path d="M28.771,59.827c1.104,0,2-0.896,2-2V6.138l16.357,16.11c0.391,0.391,1.027,0.586,1.539,0.586s1.086-0.195,1.477-0.586
              c0.781-0.78,0.812-2.047,0.031-2.828L31.337,0.562c-0.75-0.75-2.07-0.75-2.821,0L9.666,19.42
              c-0.781,0.781-0.779,2.048,0.002,2.828c0.781,0.781,1.798,0.781,2.58,0L26.771,7.475v50.353
              C26.771,58.932,27.667,59.827,28.771,59.827z"/>
          </g>
        </svg>
      </a>
    </footer>
  </body>
  
</template>

<script>
import './style/style.css'
import OrderElement from "./components/OrderElement.vue";
import OrdersList from './components/OrdersList.vue';
import ShipmentList from './components/ShipmentList.vue';

export default {
  props: [],
  name: 'App',
  components: {
    'order': OrderElement,
    'orders': OrdersList,
    'shipment': ShipmentList,
  },
  data() {
    return {
      dark: '',
      currentOrder: null,
    }
  },
  methods: {
    closeModal: function(event) {
      try {
        if (event.target.classList[0].slice(0,4) != "more" &&
          event.target.classList[0].slice(0,7) != "product" &&
          event.target.classList[1] != "more") {
            this.returnOldColors();
            this.currentOrder = null;
          }
      } catch(error) {
        console.log(error);
      }
    },
    switchTheme: function() {
      this.dark == '' ? this.dark = 'dark' : this.dark = '';
      const theme = document.querySelector(".header__theme");
      if (theme.textContent == "Темная тема") {
        theme.textContent="Светлая тема";
      } else {
        theme.textContent="Темная тема";
      }
      const toggle = document.querySelector(".header__toggle");
      const slider = document.querySelector(".header__slider");
      const body = document.body;
      const p = document.getElementsByTagName("p");
      const h1 = document.getElementsByTagName("h1");
      const h2 = document.getElementsByTagName("h2");
      const label = document.getElementsByTagName("label");
      const options = document.querySelectorAll(".options__option");
      const ul = document.getElementsByTagName("ul");
      toggle.classList.toggle("dark");
      slider.classList.toggle("dark");
      body.classList.toggle("dark");
      for (let el of p) {
        el.classList.toggle("dark");
      }
      for (let el of h1) {
        el.classList.toggle("dark");
      }
      for (let el of h2) {
        el.classList.toggle("dark");
      }
      for (let el of label) {
        el.classList.toggle("dark");
      }
      for (let el of options) {
        el.classList.toggle("dark");
      }
      for (let el of ul) {
        el.classList.toggle("dark");
      }
    },
    returnOldColors: function() {
      if (this.dark != "dark") {
        const body = document.querySelector("body");
        body.classList.remove("blur");
        const button = document.getElementsByTagName("button");
        for (let el of button) {
          el.classList.remove("blur");
        }
        const a = document.getElementsByTagName("a");
        for (let el of a) {
          el.classList.remove("blur");
        }
        const options = document.querySelectorAll(".options__option");
        for (let el of options) {
          el.classList.remove("blur");
        }
        const slider = document.querySelector(".header__slider");
        slider.classList.remove("blur");
      }
    }
  }
}
</script>