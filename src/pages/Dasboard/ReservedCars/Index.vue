<template>
<div class="q-pa-md">
  <q-table
    :rows="currentReservations"
    :columns="ReservedCarsColumn"
    row-key="id"
    :filter="filter"
    :filter-method="currentReservationFilter"
    class="no-box-shadow bg-grey-2 q-card--bordered"
  >
    <template v-slot:top-left>
      <div class="text-subtitle1">Mevcut rezervasyon araç listesi.</div>
    </template>
    <template v-slot:top-right>
      <q-input
        outlined
        dense
        debounce="500"
        color="primary"
        v-model="filter"
        placeholder=" Arama yapınız..."
        style="background-color: #fff"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        color="primary"
        label="Yeni Kayıt "
        icon="add"
        class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
        :to="{ name: 'createReservations' }"
      />
      <q-btn
        color="blue-grey-8"
        icon="archive"
        label="Excel Oluştur"
        class="q-pa-sm"
        @click="this.$store.dispatch('Reservations/exportCurrentReservation')"
      />

    </template>

    <template v-slot:body="props">
<!--          {{props.row}}-->
      <q-tr :props="props" :key="props.row.index" class="text-center">
       <q-td class="text-uppercase">
         {{props.row.LicencePlate}}
       </q-td>
        <q-td class="text-center" auto-width>

          <q-chip square :color="reservationStatusColor(props.row.ReservationStatus).color" text-color="white" :icon="reservationStatusColor(props.row.ReservationStatus).icon">
            {{reservationsStatus(props.row.ReservationStatus)}}
          </q-chip>
        </q-td>
        <q-td class="text-center">
        {{props.row.PickupLocation}}
        </q-td>
        <q-td>
          {{props.row.DropLocation}}
        </q-td>
        <q-td  >
          {{props.row.BrandName + ' ' +props.row.ModelName}}
         </q-td>
        <q-td auto-width>
          {{props.row.CustomerNameSurname}}
        </q-td>
       <q-td auto-width>
         {{props.row.CustomerPhone}}
       </q-td>
        <q-td>
          {{props.row.PaymentState === 'Payed' ? 'Ödendi' : 'Ödeme Beklemede'}}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</div>
</template>

<script>
const ReservedCarsColumn =  [
   { name: 'LicencePlate', label: 'Araç PLaka', align: 'center', sortable: true, field: 'LicencePlate'},
  { name: 'Status', label: 'Rezervasyon Statüsü', align:'center', field: 'Status', sortable: true },
  { name: 'Pickup', label: 'Aracı Alma Konumu', align:'center',field: 'Pickup' , sortable: true},
  { name: 'Return', label: 'Aracı Bırakma Konumu', align:'center', field: 'Return' , sortable: true},
  { name: 'Car', label: 'Araç', field: 'Car',align:'center', },
  { name: 'Customer', label: 'Müşteri', field: 'Customer',align:'center', },
  { name: 'CustomerPhone', label: 'Müşteri Numarası', field: 'CustomerPhone',align:'center', },
  { name: 'Amount', label: 'Ödeme', field: 'Amount', align:'center',  },
]
import {ref} from "vue";
export default {
  name: "Index",
  setup(){
    return {
      ReservedCarsColumn,
      filter: ref('')
    }
  },

  computed: {
    currentReservations() {
      return  this.$store.getters['Reservations/currentReservationsGetter']
    },
  },
  methods: {
    reservationStatusColor(status) {
      switch (status)
      {
        case 'WaitingForApproval' :
          return {
            color : 'secondary',
            icon : 'query_builder'
          }
        case 'Continues' :
          return {
            color : 'blue-9',
            icon : 'av_timer'
          }
        case 'Cancelled' :
          return {
            color : 'negative',
            icon : 'highlight_off'
          }
        case 'Completed' :
          return {
            color : 'blue-grey-8',
            icon : 'verified_user'
          }
      }
    },
    reservationsStatus(status) {
      return this.$store.getters['MainModule/getReservationStatus'].find(e => {
        return  e.code === status
      }).title
    },
    currentReservationFilter(rows) {
      console.log(rows)
      // console.log("Search",this.filter)
      const needle = JSON.parse(JSON.stringify(this.filter)).toLowerCase()
      return rows.filter(v => {
        return v.CustomerNameSurname.toLowerCase().indexOf(needle) > -1
          || v.DropLocation.toLowerCase().indexOf(needle) > -1
          || v.ReservationNo.toLowerCase().indexOf(needle) > -1
          || v.PickupLocation.toLowerCase().indexOf(needle) > -1
          || v.ModelName.toLowerCase().indexOf(needle) > -1
          || v.BrandName.toLowerCase().indexOf(needle) > -1
          || v.LicencePlate.toLowerCase().indexOf(needle) > -1
      })
    }
  }
}
</script>

<style scoped>

</style>
