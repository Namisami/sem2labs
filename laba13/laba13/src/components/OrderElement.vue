<template>
  <div class="order__info more">
    <p class="more__title">{{"Заказ #" + id}}</p>
    <button class="more__close" @click="closeInfo">
      <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="cross" stroke="black" stroke-linecap="round" stroke-width="4">
          <line class="cls-1" x1="7" x2="25" y1="7" y2="25"/>
          <line class="cls-1" x1="7" x2="25" y1="25" y2="7"/>
        </g>
      </svg>
    </button>
    <p class="more__case">Корзина</p>
    <ul class="more__list">
      <li v-for="prop in basketItems" :key="prop.name" class="more__item product">
        <p class="product__name">{{prop.name}}</p>
        <p class="product__count">{{prop.quantity + " шт."}}</p>
        <p class="product__price">{{prop.price + " руб."}}</p>
      </li>
    </ul>
    <p class="more__price">{{"Итого: " + order.total + " руб."}}</p>
    <div class="more__btns">
      <button @click="postNewShipment" class="more__accept more__btn">К отгрузке</button>
      <button class="more__cancel more__btn" @click="deleteOrder">Отменить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderElement',
  props: ['id', 'currentOrder', 'dark'],
  data(){
    return {
      order: {},
      basketItems: [],
    }
  },
  mounted() {
    window.addEventListener('keydown', this.closeInfoByEsc);

    if (this.dark == 'dark') {
      const more = document.querySelector(".more");
      more.classList.toggle("dark");
      const product = document.querySelectorAll(".product");
      for (let el of product) {
        el.classList.toggle("dark");
      }
      const p =document.getElementsByTagName("p");
      for (let el of p) {
        if (el.classList[el.classList.length-1] != "dark") {
          el.classList.toggle("dark");
        } 
      }
    }
  },
  watch: {
    id: function() {
      this.getOrderElements();
    },
  },
  methods: {
    getOrderElements: function() {
      this.order = {};
      this.basketItems.length = 0;
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + this.id + "/")
      .then((response) => {
        response = response.json();
        return response.then((data) => this.getOrderInfo(data));
      })
      .catch((error) => console.log(error));
    },
    getOrderInfo: function(data) {
      for (let prop in data) {
        this.order[prop] = data[prop];
        if (prop == "basket_items") {
          for (let item of this.order[prop]) {
            this.basketItems.push({});
            for (let key in item) {
              this.basketItems[this.basketItems.length - 1][key] = item[key]; 
            }
          }
        }
        
      }
    },
    postNewShipment: function() {
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + this.id + "/delivery", {
            method: "POST",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },
    deleteOrder: function() {
      fetch("https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + this.id, {
        method: "DELETE",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },
    closeInfoByEsc: function(e) {
      if (e.key == 'Escape') {
        this.closeInfo();
        this.returnOldColors();
      }
    },
    closeInfo: function() {
      this.$emit('updateParent', {
          currentOrder: null,
      })
      this.returnOldColors();
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
  },
  created: function() {
    this.getOrderElements();

    if (this.dark != "dark") {
      const body = document.querySelector("body");
      body.classList.add("blur");

      const button = document.getElementsByTagName("button");
      for (let el of button) {
        el.classList.add('blur');
      }
      const a = document.getElementsByTagName("a");
      for (let el of a) {
        el.classList.add('blur');
      }
      const options = document.querySelectorAll(".options__option");
      for (let el of options) {
        el.classList.add("blur");
      }
      const slider = document.querySelector(".header__slider");
      slider.classList.add("blur");
    }
  },
  updated() {
    if (this.dark=="dark") {
      const p =document.getElementsByTagName("p");
      for (let el of p) {
        if (el.classList[el.classList.length-1] != "dark") {
          el.classList.toggle("dark");
        } 
      }
    }
  }
}
</script>