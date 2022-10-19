<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item">
        <b>{{ item.name }}</b>
        {{ item.text }}
      </li>
    </ul>
    <input v-model="form.name" type="text">
    <input v-model="form.text" type="text">
    <button @click="add">Добавить</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          name: "A",
          text: "VB",
        }
      ],
      form: {
        name: '',
        text: '',
      }
    } 
  },
  methods: {
    add: function() {
      this.items.push({
        name: this.form.name,
        text: this.form.text,
      })
    }
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
