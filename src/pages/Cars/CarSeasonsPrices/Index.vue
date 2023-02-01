<template>
  <div class="q-pa-md">
    <q-table
      title="Araç Sezon Fiyat Tanımları "
      :rows="tableDataRows"
      :columns="carSeasonPriceTableColumns"
      row-key="id"
      :filter="baseSetting.filterCarTypes"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterCarTypes"  placeholder="Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
        @click="addNewSeason"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          disable
        />
      </template>

      <template v-slot:body-cell-Edit="props">
                  <q-td class="text-center">
                    <q-btn flat   color="blue-grey-9"  @click="onEditSeason(props.row)" icon="fas fa-edit" size="sm" label="Düzenle"> </q-btn>
                  </q-td>
      </template>
      <template v-slot:body-cell-Status="props">
        <q-td class="text-center">
                      <q-chip  square :color="+props.value === 1 ? 'positive' :'negative'" text-color="white" :icon="+props.value ===1 ?'done' : 'clear'" size="13px">
                        {{ (+props.value === 1) ? 'Açık' :'Kapalı' }}
                      </q-chip>
        </q-td>
      </template>


    </q-table>



  </div>
</template>

<script>
import SeasonDialogAdd from "pages/Cars/CarSeasonsPrices/Components/SeasonDialogsAdd";
import {date} from "quasar";
import {ref} from "vue";
import SeasonDialogEdit from "pages/Cars/CarSeasonsPrices/Components/SeasonDialogEdit";


export default {
  name: "CarSeasonPrices",
  setup() {

    const carSeasonPriceTableColumns = [
      { name: 'id', align:'center', label: 'ID', field: 'id' },
      { name: 'SeasonName', align: 'center', label: 'Sezon Adı', field: row => `${row.SeasonName}`,sortable: true },
      { name: 'StartDate', align:'center', label: 'Başlangıç Tarihi', field: 'StartDate',  format: val => date.formatDate(val,'DD-MM-YYYY') },
      { name: 'EndDate', align:'center', label: 'Bitiş Tarihi', field: 'EndDate', sortable: true,format: val => date.formatDate(val,'DD-MM-YYYY') },
      { name: 'Percentage', align:'center', label: 'Yüzde', field: 'Percentage', sortable: true, format: val => `${val} %`  },
      { name: 'Status', align:'center', label: 'Status', field: 'Status', sortable: true },
      { name: 'Edit', align:'center', label: 'Aksiyon', field: 'Edit', },
    ];
      return {
        carSeasonPriceTableColumns,
        baseSetting: {

        }
      }
  },
  methods:{
    addNewSeason(){
     this.$q.dialog({
       component: SeasonDialogAdd,
       componentProps: {
         test: 'test'
       },
       parent: this,
     }).onOk((data)=> {
        let formData = new FormData();
       for(let i=0; i<data.seasons.length; i++){
           for(const [key,val] of Object.entries(data.seasons[i]))
          {
             formData.append(key,val)
          }
         this.$store.dispatch('SeasonCarPricesModule/create',formData)
       }
     }).onCancel(()=> {
       console.log('cancel')
      })
    },
    onEditSeason(val){
       this.$q.dialog({
         component: SeasonDialogEdit,
         componentProps: {
           propData: val
         }
       }).onOk( data => {

         let formData = new FormData();
         for(const [key,val] of Object.entries(data.data)){
           formData.append(key,val)
         }
         formData.append('_method','put')
         this.$store.dispatch('SeasonCarPricesModule/update',formData)
       })
    }
  },
  mounted() {
    this.$store.dispatch('SeasonCarPricesModule/get')
  },
  computed: {
    tableDataRows(){
      return this.$store.getters['SeasonCarPricesModule/getRecords']
    }
  }

}
</script>

<style scoped>

</style>
