<template>
  <div class="orders">
    <h2 class="orders__title">Заказы</h2>
    <button v-on:click="getOrderList" class="orders__refresh">
      <svg class="orders__refresh-img" width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
        <g>
          <path style="fill:#030104;" d="M8,2.019V0L4,3l4,3V4.027c2.25,0.249,4,2.156,4,4.473c0,2.485-2.015,4.5-4.5,4.5S3,10.985,3,8.5
            C3,8.331,3.01,8.164,3.027,8H1.019C1.007,8.165,1,8.332,1,8.5C1,12.09,3.91,15,7.5,15S14,12.09,14,8.5
            C14,5.078,11.356,2.274,8,2.019z"/>
        </g>
      </svg>
    </button>
    <ul class="orders__list">
      <li class="orders__order order" v-for="order in orders" :key="order.id" draggable="true" @dragstart="currentOrder=order; dragStartHandler($event)">
        <p class="order__name">
          {{ "Заказ #" + order.id }}
        </p>
        <p class="order__price">
          {{ order.total + " руб." }}
        </p>
        <options :dark="dark" @openElementInfo="currentOrder = order; closeModalByClick();" 
                @postOrderInfo="currentOrder=order; postNewShipment(); currentOrder=null"
                @deleteOrderElement="currentOrder=order; deleteOrder(); currentOrder=null"
                @showOptionsList="showOptions=!showOptions"></options>
      </li>
    </ul>
  </div>
</template>

<script>
import OptionsList from "./OptionsList.vue";

export default {
  props: ["dark"],
  name: 'OrdersList',
  components: {
    'options': OptionsList,
  },
  data() {
    return {
      currentOrder: null,
      showOptions: false,
      active: false,
      orders: [
      ]
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    getOrderList: function() {
      this.orders.length = 0;
      this.orders.shift();
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/")
      .then((response) => {
        response = response.json();
        return response.then((data) => this.getOrderInfo(data));
      })
      .catch((error) => console.log(error));
    },
    getOrderInfo: function(data) {
      for (let order of data) {
        this.orders.push({});
        for (let key in order) {
          this.orders[this.orders.length - 1][key] = order[key]; 
        }
      }
    },
    postNewShipment: function() {
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + this.currentOrder.id + "/delivery", {
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
      fetch("https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + this.currentOrder.id, {
        method: "DELETE",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },
    closeModalByClick: function() {
      this.$emit('currentOrderSet', this.currentOrder)
    },
    dragStartHandler: function(event) {
      console.log(this.currentOrder.id);
      event.dataTransfer.setData("element", this.currentOrder.id);
    },
  },
  updated() {
    if (this.dark == 'dark') {
      let p = document.getElementsByTagName("p");
      for (let el of p) {
        el.classList.add("dark");
      }
      let ul = document.getElementsByTagName("ul");
      for (let el of ul) {
        el.classList.add("dark");
      }
    }
  }
}
</script>
