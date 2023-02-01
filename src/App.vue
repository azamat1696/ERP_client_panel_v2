<template>

  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import {api} from "boot/axios";

export default defineComponent({
  name: 'App',
  beforeCreate() {
    const  token = localStorage.getItem('panelAuthToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = 'Bearer '+token;
    }
  },
created() {
  this.$store.dispatch('Auth/initAuth')
}

});
</script>
