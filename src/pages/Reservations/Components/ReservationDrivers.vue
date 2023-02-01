<template>
  <q-card style="width: 650px !important;" class="q-pb-sm">
    <q-bar style="height: 50px" class="blue-grey-8">
      <div>Rezervasyon Sürücüleri</div>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup >
        <q-tooltip>Kapat</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section class="   q-pa-none q-pl-sm q-pr-sm q-pt-sm">
      <q-table
        class="drivers-table-virtscroll-table no-box-shadow bg-grey-1"
        :rows="drivers"
        :columns="reservationDriversColumns"
        row-key="name"
        :filter="reservationDriversFilter"
        dense
        virtual-scroll
        :virtual-scroll-sticky-size-start="5"
        v-model:pagination="driversPagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-left>
          <div class="row">
            <div class="col-12">
              <div class="text-subtitle2">Rezervasyona ayit kayıt edilen sürücüler listesi.</div>
            </div>
          </div>

        </template>
        <template v-slot:top-right>

          <q-input
            outlined
            dense
            debounce="500"
            color="primary"
            v-model="reservationDriversFilter"
            placeholder="Sürücü Arayınız..."
            style="width: 250px!important;"
            class="bg-white"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>


        </template>

      </q-table>
    </q-card-section>

  </q-card>
</template>

<script>
import {ref} from "vue";

const reservationDriversColumns =   [
  { name: 'Name', align: 'center', label: ' İsim', field: 'Name'},
  { name: 'Surname', align: 'center', label: ' Soyisim', field: 'Surname'},
  { name: 'Phone', align: 'center', label: ' Telefon', field: 'Phone'},
  { name: 'Email', align: 'center', label: ' E-posta', field: 'Email'},
];
export default {
  name: "ReservationDrivers",
  props : ['drivers'],
  setup() {
    return {
      reservationDriversColumns,
      reservationDriversFilter : ref(''),
      driversPagination : ref({  rowsPerPage: 0}) ,
    }
  }
}
</script>

<style scoped>

</style>
