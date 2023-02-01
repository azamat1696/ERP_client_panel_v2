<template>
  <q-layout view="lHh Lpr lFf">
     <layout-header/>
     <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "components/LayoutHeader";
export default {
  name: "MainLayout",
  components : {
    LayoutHeader
  },

}
</script>

<style scoped>

</style>
