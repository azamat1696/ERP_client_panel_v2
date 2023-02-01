<template>
<div class="  q-pa-md ">
  <q-table
    title="Araç Markaları"
    :rows="carBrands"
    :columns="carBrandsColumns"
    row-key="id"
    :filter="filter"
  >
    <template v-slot:top-right>
      <q-input outlined dense debounce="300" color="primary" v-model="filter"  placeholder="Marka Arayınız..."  >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          :to="{name:'createCarBrands'}"
        />

      <q-btn
        color="blue-grey-8"
        icon="archive"
        label="Excel Oluştur"
        class="q-pa-sm "
        disable

      />

    </template>
    <template v-slot:body="props">
      <q-tr :props="props" :key="props.row.index" class="text-center">
        <q-td>
         {{ props.row.BrandName }}
        </q-td>
        <q-td>
          <q-img
            :src="Constants.FILE_URL+'/brands/'+props.row.BrandLogo"
            spinner-color="white"
            style=" max-width: 50px"
          />
        </q-td>
        <q-td>
          <q-chip  square :color="+props.row.Status ===1 ? 'positive' :'negative'" text-color="white" :icon="+props.row.Status ===1 ?'done' : 'clear'" size="13px">
            {{ (+props.row.Status === 1) ? 'Açık' :'Kapalı' }}
          </q-chip>
        </q-td>
        <q-td>
          {{ dateFormat(props.row.created_at) }}
        </q-td>
        <q-td class="text-right">
          <q-btn flat round color="blue-grey-9" :to="{name: 'updateCarBrands',params : {id :props.row.id}}" ><i class="fas fa-edit"></i></q-btn>

          <q-btn flat round color="primary"  @click="onRemove(props.row.id)"><i class="fas fa-trash-alt"></i></q-btn>
        </q-td>
      </q-tr>

    </template>
  </q-table>
</div>
</template>

<script>
  import { ref } from 'vue';
  import {dateFormat}  from "pages/Js/Helpers";
  import Constants from "app/Constants";
  import { mapGetters } from 'vuex'
  import {Dialog} from "quasar";
    const carBrandsColumns = [
     { name: 'BrandName', align: 'center', label: 'Marka Adı', field: 'BrandName', sortable: true },
     { name: 'BrandLogo', align: 'center', label: 'Marka Logosu', field: 'BrandLogo', sortable: false },
     { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
     { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
     { name: 'id', align:'center', label: '', field: 'id' },
   ];

export default {
  name: "Index",
  setup() {
    const filter = ref('');
    const carBrands = ref([]);
    return {
      carBrandsColumns,
      carBrands,
      filter,
      selected: ref([]),
      dateFormat,
      Constants
    }
  },
  beforeCreate() {
    if (this.$store.getters['CarBrandsModule/getCarBrandsState'].length === 0)  {
      this.$store.dispatch('CarBrandsModule/getCarBrands').then(res => {
        this.carBrands =  res;
      });
    } else {
      this.carBrands = this.$store.getters['CarBrandsModule/getCarBrandsState'];
    }

  },
  methods : {
    onRemove(recordID) {
      Dialog.create({
        title: 'Emin misiniz?',
        message: 'Silme işlemi gerçekleştiğinde işlemi geri alamazsınız!',

        persistent: true,
        ok : {
          label : 'Sil',
          flat:true
        },
        cancel : {
          flat : true,
          label : 'İptal Et'
        }
      }).onOk(() => {

        this.$store.dispatch('CarBrandsModule/destroy',recordID)
      }).onCancel(() => {

      })
    }
  },


}
</script>

<style scoped>

</style>
