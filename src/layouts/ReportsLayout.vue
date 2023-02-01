<template>
  <div>
    <q-layout view="hHh Lpr lff" style="background-color: rgb(240, 237, 237)">
      <q-page-container>
        <layout-header/>
        <div className="row q-mt-lg  q-mr-xl q-ml-xl">
          <div className="col-12">
            <router-view/>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import LayoutHeader from "components/LayoutHeader";

export default {
  name: "ReservationsLayout",
  components: {
    LayoutHeader
  },

}
</script>

<style scoped>

</style>

