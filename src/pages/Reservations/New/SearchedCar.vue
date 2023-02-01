<template>
  <div class="q-pa-sm ">
    <q-table
      title="Filtirelenen Araçlar"
      :rows="searchedCarRows"
      :columns="SearchedCarsColumns"
      row-key="id"
      selection="single"
      v-model:selected="selected"
      :selected-rows-label="getSelectedCar"
      class="no-box-shadow   bg-grey-1"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300"   color="primary" v-model="filter"  placeholder="Araç Plakasına Göre Arayınız..."  style="min-width: 400px" >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    <template v-slot:body="props">
     <q-tr :props="props">
         <q-td >
           <q-checkbox
             v-model="props.selected"
             color="teal"
           />
         </q-td>
       <q-td class="text-center">
         {{props.row.LicencePlate.toUpperCase()}}
       </q-td>
       <q-td auto-width  class="text-left text-bold"  >
         {{props.row.car}}
       </q-td>

       <q-td auto-width  class="text-left text-bold"  >
         {{props.row.Year}}
       </q-td>
       <q-td   class="text-center">
         <q-badge :color="props.row.CarColor" align="center" />
       </q-td>
       <q-td  class="text-center">

         <q-img :src="require('../../../assets/icons/no-damage.png')" width="50px"  fit="contain" :img-style="{width:'50px', height:'50px'}" v-show="props.row.CriticalDamageCount === '0' "/>
         <div class="div" v-show="+props.row.CriticalDamageCount > 0">
                    <q-img
                      :src="require('../../../assets/icons/has-damage.svg')"
                      width="50px"
                      fit="contain"
                      :img-style="{width:'50px', height:'50px'}"/>
                    <q-chip
                      square
                      color="transparent"
                      class="q-pa-none q-mt-md"
                      size="15px"
                      :label="props.row.CriticalDamageCount"/>
         </div>

       </q-td>
       <q-td   class="text-center">
         {{props.row.DailyPrice}} TL
       </q-td>
     </q-tr>
   </template>

    </q-table>
  </div>
</template>

<script>
 import SearchedCarsColumns from "pages/Reservations/New/SearchedCarsColumns";
 import { ref} from "vue";
 import Constants from 'app/Constants';
export default {
  name: "SearchedCar",
  setup() {
    const selected = ref([])
    const searchedCarRows = ref([])
    return {
      Constants,
      SearchedCarsColumns,
      // searchedCarRows,
      filter: ref(''),
      selected
    }
  },
  methods : {

    getFilterCars(filterObj) {
      let formData = new FormData();
       for ( const [k,v] of Object.entries(filterObj))  {
         if (v !== null)
         formData.append(k,v);
       }
     this.$store.dispatch('CarsModule/filterCars',formData)
    },

    getSelectedCar() {
       let cars = {...this.selected[0]}

       this.$emit('selectedReservationCar',cars)
    },

  },
  computed : {
    searchedCarRows() {

      return this.$store.getters['CarsModule/getFilteredReservationCars']
    }
  }
}
</script>

<style scoped>

</style>
