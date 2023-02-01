<template>
  <div class="  q-pa-md">
    <q-table
      title="Araç Modelleri"
      :rows="carModels"
      :columns="carsModelColumns"
      row-key="id"
      :filter="filterCarModels"
    >

      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filterCarModels"  placeholder="Model Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
          <q-btn
            color="primary"
            label="Yeni Kayıt "
            icon="add"
            class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
            @click=" showNewCarModelDialog = true"
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
<!--            {{getCarBrandName(props.row.brand_id)}}-->
            {{ {...this.$store.getters['CarBrandsModule/getCarBrandFromState'](props.row.brand_id)}.BrandName}}
          </q-td>
          <q-td>
            {{ props.row.ModelName }}
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
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row.id)" ><i class="fas fa-edit"></i></q-btn>

            <q-btn flat round color="primary"  @click="onRemove(props.row.id)"><i class="fas fa-trash-alt"></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="showNewCarModelDialog" persistent >
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4" v-if="!carModelFields.id">Yeni Bir Model Oluştur</div>
          <div class="text-h4" v-else>Modeli Güncelle</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup @click="onReset">
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
              v-model="carModelFields.ModelName"
              label="Model Adı"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />

            <q-select
              v-model="carModelFields.CarBrand"
              use-input
              label="Araç Markası"
              :options="carBrandsOptions"
              :option-label="(items) => items.BrandName"
              :option-value="(items) => items.id"
              @filter="filterFn"
              dense
              outlined
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                   Kayıt Bulunamadı
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-toggle v-model="carModelFields.Status" label="Statüsü" color="green"/>

            <div class="text-right" v-if="!carModelFields.id">

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
  import { ref } from 'vue';
  import {dateFormat}  from "pages/Js/Helpers";
  import Constants from "app/Constants";
  import {Dialog} from "quasar";
  import carsModelColumns from "pages/Cars/CarModels/Columns";

export default {
  name: "Index",
  data() {
    const filterCarModels = ref('');
    const showNewCarModelDialog = ref(false);

    return {
      carsModelColumns,
      filterCarModels,
      selected: ref([]),
      dateFormat,
      Constants,
      showNewCarModelDialog,
      carModelFields : {
        ModelName : ref(''),
        Status : ref(true),
        CarBrand : ref(null),
        id : ref('')
      },
      carBrandsOptions :ref([])
    }
  },

  mounted() {
    this.$store.dispatch('CarModelsModule/getCarModels')
    this.$store.dispatch('CarBrandsModule/getCarBrands')

    this.initCarBrands()
  },
  computed : {

    carBrands() {
      return this.$store.getters['CarBrandsModule/getRecordsByStatus'](1)
    },
    carModels() {
      return this.$store.getters['CarModelsModule/carModels']
    }
  },
  methods : {
    initCarBrands() {
      this.carBrandsOptions = this.carBrands
    },
    onRemove(recordID) {
      Dialog.create({
        title: 'Eminmisiniz?',
        message: 'Silmeniz durumunda işlemi geriye alamassınız.!',
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
         this.$store.dispatch('CarModelsModule/destroy',recordID)
      }).onCancel(() => {
       })
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.carBrandsOptions = this.carBrands.filter(v => v.BrandName.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit() {
      let formData = new FormData();
      formData.append('ModelName',this.carModelFields.ModelName);
      formData.append('Status',this.carModelFields.Status);
      formData.append('brand_id', this.carModelFields.CarBrand.id);
      this.$store.dispatch('CarModelsModule/create',formData).then(res => {
        this.showNewCarModelDialog = false
        this.onReset()
      })
    },
    onReset() {
      this.carModelFields.id = ''
      this.carModelFields.CarBrand = ''
      this.carModelFields.ModelName = '';
      this.carModelFields.brand_id = '';
      this.carModelFields.Status = true;
    },
    getCarBrandName(brand_id) {
        const  brand = this.carBrands.find(el => {
         return +el.id === +brand_id
       })

      return (brand) ? brand.BrandName : ''
    },
    onEdit(model_id) {
      const model = this.carModels.find(el => {
        return +el.id === +model_id
      });
      const  brand = this.carBrands.find(el =>{
        return +el.id === +model.brand_id
      });
    this.carModelFields.ModelName = model.ModelName;
    this.carModelFields.id = +model.id;
    this.carModelFields.CarBrand =  brand
    this.carModelFields.Status = +model.Status === 1
    this.showNewCarModelDialog = true

    },
    onUpdate() {
      let formData = new FormData();
      formData.append('ModelName',this.carModelFields.ModelName);
      formData.append('Status',this.carModelFields.Status);
      formData.append('brand_id',this.carModelFields.CarBrand.id);
      formData.append('id',this.carModelFields.id)
      formData.append('_method','PUT')
      this.$store.dispatch('CarModelsModule/update',formData).then(res => {
        this.onReset();
        this.showNewCarModelDialog = false;
      })
    }
  },


}
</script>

<style scoped>

</style>
