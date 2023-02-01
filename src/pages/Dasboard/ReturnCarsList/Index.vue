<template>
<div class="q-pa-md">
  <q-table
    :rows="returnCarsList"
    :columns="ReservedCarsColumn"
    row-key="id"
    :filter="filter"
    :filter-method="returnReservationFilter"
    class="no-box-shadow bg-grey-2 q-card--bordered"
  >
    <template v-slot:top-left>
      <div class="text-subtitle1">Bu gün dönecek araç listesi.</div>
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

    </template>

    <template v-slot:body="props">

      <q-tr :props="props" :key="props.row.index" class="text-center">
       <q-td class="text-uppercase">
         {{props.row.LicencePlate}}
       </q-td>
        <q-td class="text-center" auto-width>

          <q-chip square  >
             Bu gün dönüyor...
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
  { name: 'Amount', label: 'Ödeme', field: 'Amount', align:'left',  },
]
import {ref} from "vue";
export default {
  name: "ReturnCarsList",
  setup(){
    return {
      ReservedCarsColumn,
      filter: ref('')
    }
  },

  computed: {
    returnCarsList() {
      return  this.$store.getters['Reservations/currentReturnReservationGetter']
    },
  },
  methods: {
    returnReservationFilter(rows) {
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
          || v.CustomerPhone.toLowerCase().indexOf(needle) > -1
      })
    }
  }
}
</script>

<style scoped>

</style>
