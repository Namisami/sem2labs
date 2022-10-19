<template>
  <div class="shipments" @dragover.prevent="dragOverEvent" @drop.prevent="onDropEvent">
    <h2 class="shipments__title">Отгрузки</h2>
    <button @click="getShipmentList" class="shipments__refresh">
      <svg class="shipments__refresh-img" width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
        <g>
          <path style="fill:#030104;" d="M8,2.019V0L4,3l4,3V4.027c2.25,0.249,4,2.156,4,4.473c0,2.485-2.015,4.5-4.5,4.5S3,10.985,3,8.5
            C3,8.331,3.01,8.164,3.027,8H1.019C1.007,8.165,1,8.332,1,8.5C1,12.09,3.91,15,7.5,15S14,12.09,14,8.5
            C14,5.078,11.356,2.274,8,2.019z"/>
        </g>
      </svg>
    </button>
    <ul class="shipments__list">
      <li class="shipments__shipment shipment" v-for="shipment in shipments" :key="shipment.id">
        <p class="shipment__name">
          {{ "Отгрузка #" + shipment.id }}
        </p>
        <p class="shipment__item">
          {{ "Заказ #" + shipment.order_id }}
        </p>
        <p class="shipment__date">
          {{ shipment.delivery_date }}
        </p>
        <options :isShipment="true" :dark="dark"
                @deleteShipmentElement="currentShipment=shipment; deleteShipment(); currentOrder=null"></options>
      </li>
    </ul>
  </div>
</template>

<script>
import OptionsList from "./OptionsList.vue"

export default {
  name: 'ShipmentsList',
  components: {
    "options": OptionsList
  },
  props: ["dark"],
  data(){
    return {
      currentShipment: null,
      shipments: [
      ]
    }
  },
  methods: {
    getShipmentList: async function() {
      this.shipments.length = 0;
      this.shipments.shift();
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/deliveries")
      .then((response) => {
        response = response.json();
        return response.then((data) => this.getShipmentInfo(data));
      })
      .catch((error) => console.log(error));
    },
    getShipmentInfo: function(data) {
      for (let shipment of data) {
        this.shipments.push({});
        for (let key in shipment) {
          this.shipments[this.shipments.length - 1][key] = shipment[key]; 
        }
      }
    },
    deleteShipment: function() {
      console.log(1);
      fetch("https://demo-api.vsdev.space/api/orders_admin/2021-0606/deliveries/" + this.currentShipment.id, {
        method: "DELETE",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },
    onDropEvent: function(e) {
      let id = e.dataTransfer.getData("element");
      this.postNewShipment(id)
    },
    dragEvent: function() {
      const dropZone = document.querySelector(".shipments");
      dropZone.addEventListener("ondrop", this.onDropEvent);
    },
    dragOverEvent: function(e) {
      e.dataTransfer.dropEffect="move";
    },
    postNewShipment: function(id) {
      fetch("https://justcors.com/tl_124fa38/https://demo-api.vsdev.space/api/orders_admin/2021-0606/orders/" + id + "/delivery", {
            method: "POST",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },
  },
  updated() {
    if (this.dark == 'dark') {
      let p = document.getElementsByTagName("p");
      for (let el of p) {
        el.classList.add("dark");
      }
    }
  }
}
</script>