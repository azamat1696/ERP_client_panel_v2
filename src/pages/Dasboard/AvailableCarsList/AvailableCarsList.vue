<template>
<div class="q-pa-md">
  <q-table
    :rows="getRecords"
    :columns="carsColumns"
    row-key="id"
    :filter="filter"
    class="no-box-shadow bg-grey-2 q-card--bordered"
  >
    <template v-slot:top-right>
      <q-input
        outlined
        dense
        debounce="300"
        color="primary"
        v-model="filter"
        placeholder="Plaka Üzerinden Arayınız..."
        class="bg-white"
        no-results-label="Herhangi bir kayıt yoktur"
        rows-per-page-label="Satır başı kayıt"
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
        :to="{ name: 'createCar' }"
      />
      <q-btn
        color="blue-grey-8"
        icon="archive"
        label="Excel Oluştur"
        class="q-pa-sm"
        @click="this.$store.dispatch('CarsModule/exportCarsReport')"
      />
    </template>
    <template v-slot:top-left>
      <div class="text-subtitle1">Mevcut araçlar listesi</div>
    </template>


    <template v-slot:body="props">
      <q-tr :props="props" :key="props.row.index" class="text-center">
        <q-td>
          {{props.row.BrandName}}

         </q-td>
        <q-td>
          {{props.row.ModelName}}
         </q-td>

        <q-td>
          {{props.row.Year}}
         </q-td>
        <q-td>
          {{props.row.LicencePlate}}

        </q-td>
        <q-td>
          {{props.row.ClassName}}
        </q-td>
        <q-td>
          {{props.row.CarTransmissionName}}

        </q-td>
        <q-td>
          {{props.row.FuelTypeName}}

        </q-td>
        <q-td>
          {{props.row.OfficeName}}

        </q-td>
      </q-tr>
    </template>
  </q-table>
</div>
</template>

<script>
import {ref} from "vue";
const carsColumns = [
  { name: 'BrandName', align:'center', label: 'Marka', field: 'BrandName', sortable: true },
  { name: 'ModelName', align:'center', label: 'Model', field: 'ModelName', sortable: true },
  { name: 'Year', align:'center', label: 'Üretim senesi', field: 'Year', sortable: true },
  { name: 'LicencePlate', align: 'center', label: 'Plakası', field: 'LicencePlate', sortable: true },
  { name: 'TypeName', align:'center', label: 'Sınıf', field: 'TypeName', sortable: true },
  { name: 'CarTransmissionName', align:'center', label: 'Vites Tipi', field: 'CarTransmissionName', sortable: true },
  { name: 'FuelTypeName', align:'center', label: 'Yakıt Tipi', field: 'FuelTypeName', sortable: true },
  { name: 'OfficeName', align:'center', label: 'Ofis', field: 'OfficeName', sortable: true },

];
export default {
  name: "AvailableCarsList",
  setup(){
    return {
      filter: ref(''),
      carsColumns,
    }
  },

  computed:{
    getRecords() {
      return this.$store.getters['CarsModule/CarsDetails'];
    },
}
}
</script>

<style scoped>

</style>
