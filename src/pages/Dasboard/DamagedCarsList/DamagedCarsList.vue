<template>
  <div class="q-pa-md ">

    <q-table

      :rows="DamageRecords"
      :columns="baseSetting.CarDamagesListColumn"
      row-key="id"
      :filter="filter"
      class="no-box-shadow bg-grey-2 q-card--bordered"

    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filter"  placeholder="Arayınız..." >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          :to="{ name: 'machinistCarDamageCreate' }"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          @click="this.$store.dispatch('MachinistDamageRecordsModule/exportMachinistReservation')"
        />

      </template>
     <template v-slot:top-left>
       <div class="text-subtitle1">Mevcut hasarlı araç listesi.</div>
     </template>
      <template v-slot:body="props">

        <q-tr :props="props" :key="props.row.index" class="text-center">

          <q-td class="text-uppercase">
            {{props.row.LicencePlate}}
          </q-td>
          <q-td>
             {{props.row.BranModel}}
          </q-td>
          <q-td>
            {{props.row.TypeName}}
          </q-td>
          <q-td>
           {{props.row.CompanyName}}
          </q-td>
          <q-td>
            {{props.row.CarDamageReservationStartAt}}
          </q-td>
          <q-td>
          {{props.row.CarDamageReservationCompledAt}}
          </q-td>

          <q-td>
            <q-chip  square color="blue-9" text-color="white" icon="hourglass_empty" size="13px" v-if="props.row.ReservationStatus === 'Processing'">
              Devam Ediyor
            </q-chip>
            <q-chip  square color="red-9" text-color="white" icon="clear" size="13px" v-else-if="props.row.ReservationStatus === 'Canceled'">
              İptal Edildi
            </q-chip>
            <q-chip  square color="blue-grey-8" text-color="white" icon="done" size="13px" v-else-if="props.row.ReservationStatus === 'Completed'">
              Tamamlandı
            </q-chip>
            <q-chip  square color="blue-10" text-color="white" icon="done" size="13px" v-else-if="props.row.ReservationStatus === 'Opened'">
             Tamir ediliyor
            </q-chip>
          </q-td>

        </q-tr>

      </template>

    </q-table>

  </div>
</template>

<script>
import {ref} from "vue";

const CarDamagesListColumn  = [

  { name: 'LicencePlate', align: 'center', label: 'Araç Plakası', field: 'LicencePlate', sortable: true },
  { name: 'BranModel', align: 'center', label: 'Araç', field: 'BranModel', sortable: true },
  { name: 'TypeName', align: 'center', label: 'Firma Türü', field: 'TypeName', sortable: true },
  { name: 'CompanyName', align: 'center', label: 'Firma', field: 'CompanyName', sortable: true },
  { name: 'ReservationStartDate', align: 'center', label: 'Aracı Teslim Alma Tarihi', field: 'ReservationStartDate', sortable: true },
  { name: 'ReservationEndDate', align: 'center', label: 'Aracı Teslim Etme Tarihi', field: 'ReservationEndDate', sortable: true },
  { name: 'ReservationStatus', align:'center', label: 'Statusu', field: 'ReservationStatus', sortable: true },
  // { name: 'id', align:'center', label: '', field: 'id' },
];

export default {
  name: "ReservedCarsList",
  setup() {
    const CustomersRows = []
    return {
      baseSetting : ref({
        CarDamagesListColumn,
        CustomersRows,
      }),
      filter:ref('')
    }
  },
  computed: {
    DamageRecords(){
     return this.$store.getters['MachinistDamageRecordsModule/activeDamageRecordsGetter']
     }

  },
}
</script>

<style scoped>

</style>
