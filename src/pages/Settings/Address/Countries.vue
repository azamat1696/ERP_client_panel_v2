<template>
<div class="q-pa-md">
  <q-table
    title="Ülkeler"
     :rows="countries"
    :columns="countryTypesColumns"
    row-key="id"
    :filter="filter"
  >
    <template v-slot:top-right>
      <q-input outlined dense debounce="300" color="primary" v-model="filter"  placeholder="Ülke Arayınız..."  >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        color="primary"
        label="Yeni Kayıt "
        icon="add"
        class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
        @click=" countrySetting.showFormDialog = true"
      />
      <q-btn
        color="blue-grey-8"
        icon="archive"
        label="Excel Oluştur"
        class="q-pa-sm"
        disable
      />
    </template>

    <template v-slot:body="props">
      <q-tr :props="props" :key="props.row.index" class="text-center">
        <q-td>
          {{ props.row.CountryName }}
        </q-td>
        <q-td>
          <q-chip  square :color="+props.row.Status ===1 ? 'positive' :'negative'" text-color="white" :icon="+props.row.Status ===1 ?'done' : 'clear'" size="13px">
            {{ (+props.row.Status === 1) ? 'Açık' :'Kapalı' }}
          </q-chip>
        </q-td>
        <q-td>
          {{ countrySetting.dateFormat(props.row.created_at) }}
        </q-td>
        <q-td class="text-right">
          <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row.id)" ><i class="fas fa-edit"></i></q-btn>

          <q-btn flat round color="primary"  @click="onRemove(props.row.id)" disable><i class="fas fa-trash-alt"></i></q-btn>
        </q-td>
      </q-tr>

    </template>

  </q-table>

  <q-dialog   v-model="countrySetting.showFormDialog" persistent >
    <q-card style="min-width: 500px">
      <q-bar class="q-pa-md" style="height: 50px">
        <div class="text-h4" v-if="!countryFields.id">Yeni Ülke Ekle</div>
        <div class="text-h4" v-else>Ülke Düzenle</div>

        <q-space />
        <q-btn dense flat icon="close" @click="onReset" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            outlined
            dense
            v-model="countryFields.CountryName"
            label="Ülke adı"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
          />


          <q-toggle v-model="countryFields.Status" label="Ülke Statusu" color="green"/>

          <div class="text-right" v-if="!countryFields.id">

            <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn label="Kaydet" type="submit" color="positive"  icon-right="save"  flat/>
          </div>
          <div class="text-right" v-else>
            <q-btn label="Güncelle" type="button" color="blue"  icon-right="save"  flat @click="onUpdate"/>
          </div>
        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>
</div>
</template>

<script>
import {ref} from "vue";
import countryTypesColumns from "pages/Settings/Address/CountryColumns";
import {dateFormat} from "pages/Js/Helpers";
import {Dialog} from "quasar";

export default {
  name: "Countries",
  data(){

    return {
      filter : ref(''),
      countryTypesColumns,
      countrySetting : {
        showFormDialog : ref(false),

        dateFormat,

      },
      countryFields : {
        CountryName : ref(''),
        Status : true,
        id : ref('')
      }
    }
  },
  methods : {
    onSubmit(){
       let formData = new FormData();
       formData.append('CountryName',this.countryFields.CountryName)
       formData.append('Status',this.countryFields.Status)
       this.$store.dispatch('CountryModule/create',formData).then( (res) => {
         this.onReset();
         this.countrySetting.showFormDialog = false
       })
    },

    onEdit(id){
      const country = this.countries.find(el => {
            return parseInt(el.id) === parseInt(id)
      })
      this.countryFields.CountryName = country.CountryName,
      this.countryFields.Status = +country.Status === 1,
      this.countryFields.id = country.id
      this.countrySetting.showFormDialog = true

    },
    onUpdate(){
      let formData = new FormData();
      formData.append('CountryName',this.countryFields.CountryName)
      formData.append('Status',this.countryFields.Status)
      formData.append('id',this.countryFields.id)
      formData.append('_method','PUT');
      this.$store.dispatch('CountryModule/update',formData).then(()=> {
        this.countrySetting.showFormDialog = false;
        this.onReset();
      })
    },
    onRemove(id){
          Dialog.create({
            title: 'Eminmisiniz ?',
            message: 'Silmeniz durumunda işlemi geriye alamzsınız.!',
            persistent: true,
            ok:{
              label: 'Sil',
              flat: true
            },
            cancel: {
              label:'İptal Et',
              flat: true
            }
          }).onOk(()=> {
             this.$store.dispatch('CountryModule/destroy',id);
          }).onCancel(()=>{
           })
    },
    onReset(){
      this.countryFields.CountryName = '',
        this.countryFields.Status = true,
        this.countryFields.id = ''
    },
  },
  mounted() {
    this.$store.dispatch('CountryModule/getCountries')
  },
  computed: {
     countries(){
       return this.$store.getters['CountryModule/countries']
     }
 }
}
</script>

<style scoped>

</style>
