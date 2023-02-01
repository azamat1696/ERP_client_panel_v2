<template>
  <div class="q-pa-md">
    <q-table
      title="Araç Fiyat Tanımları "
      :rows="getRecords"
      :columns="baseSetting.carPricesColumns"
      row-key="id"
      :filter="baseSetting.filterCarTypes"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterCarTypes"  placeholder="Ücrete Göre Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="onAddNewPrice"
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
          <q-td></q-td>
          <q-td class="text-center">
           {{ props.row.BrandName  }}
          </q-td>
          <q-td class="text-center">
            {{ props.row.ModelName }}
          </q-td>
          <q-td class="text-center">
            {{props.row.DailyPrice }} TL
          </q-td>
          <q-td class="text-center">
            {{props.row.WeeklyPrice }} TL
          </q-td>
          <q-td class="text-center">
            {{props.row.MonthlyPrice }} TL
          </q-td>
          <q-td class="text-center">
            {{props.row.YearlyPrice }} TL
          </q-td>
          <q-td class="text-center">
            {{props.row.created_at.split('T')[0]}}
          </q-td >
          <q-td>
            <q-btn flat   color="blue-grey-9"  @click="onEdit(props.row.id)" icon="fas fa-edit" size="sm" label="Düzenle"> </q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.showFormDialog" persistent >
      <q-card style="min-width: 1000px">
        <q-bar class="q-pa-md bg-grey-4  " style="height: 50px">
          <div class="text-h4"  >Model Bazlı Fiyat Tanımlama</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class=""
          >
            <div class="row">
              <div class="col-4 q-pa-xs q-mt-sm">
                <q-banner dense class="bg-grey-1 q-pa-sm  ">
                  <template v-slot:avatar>
                    <q-icon name="priority_high" color="primary" />
                  </template>
                   <div class="text-subtitle2 text-bold">Bilgilendirme</div>
                  <div class="text-weight-regular">
                   1. Aracın marka modeli seçilecektir.
                  </div>
                  <div class="text-weight-regular">
                    2. Ana fiyatı girildikten sonra haftalık, aylık, yıllık fiyat indirimi kullanılabilir
                  </div>
                  <div class="text-weight-regular">
                    3. Varsayılan fiyat indirim oranı 0.
                  </div>

                </q-banner>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-6 q-pa-sm">
                    <div class="text-weight-regular q-mb-xs text-grey-8">Araç Markası</div>
                    <q-select
                      v-model="baseFields.brand_id"
                      :options="optionBrands"
                      outlined
                      dense
                      :option-label="(items) => items.BrandName"
                      :option-value="(items) => items.id"
                      @filter="onFilterCarBrands"
                      @update:model-value="onChangeCarBrands"
                      use-input
                      :lazy-rules="true"
                      :rules="[ val => val && val.BrandName.length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                      :disable="baseFields.id !==''"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Kayıt Bulunamadı
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-6 q-pa-sm">
                    <div class="text-weight-regular q-mb-xs text-grey-8">Araç Modeli</div>
                    <q-select
                      v-model="baseFields.model_id"
                      :options="carModelOptions"
                      outlined
                      dense
                      :option-label="(items) => items.ModelName"
                      :option-value="(items) => items.id"
                      use-input
                      :lazy-rules="true"
                      :rules="[ val => val && val.ModelName.length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                      :disable="baseFields.id!==''"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Kayıt Bulunamadı
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="row ">
                  <div class="col-12 q-pa-xs q-pt-none">
                    <div class="text-weight-regular q-mb-xs text-grey-8">Günlük Araç Fiyatı  </div>
                    <q-input
                      outlined
                      dense
                      v-model="baseFields.DailyPrice"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      @update:model-value="onChangeMainPrice"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row " :class="[this.baseFields.DailyPrice >1 && this.baseFields.model_id  ? '' : 'disabled']">
              <div class="col-4 q-pa-xs ">
               <div class="row q-pa-sm bg-grey-1" style="border-radius: 5px">
                  <div class="text-subtitle2 q-mb-xs text-grey-10 text-bold ">Haftalık Fiyat İndirim Oranı</div>
                  <div class="col-7 q-pa-xs">
                    <q-range
                      v-model="baseFields.WeeklyPriceRange"
                      :min="0"
                      :max="15"
                      :left-label-value="baseFields.WeeklyPriceRange.min + '%'"
                      :right-label-value="baseFields.WeeklyPriceRange.max + '%'"
                      markers=""
                      switch-label-side
                      label
                      @update:model-value="onChangeWeeklyPriceRange"
                    />
                  </div>
                  <div class="col-5 q-pa-xs ">
                    <q-input
                      type="text"
                      dense
                      outlined
                      readonly
                      v-model="baseFields.WeeklyPrice"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4 q-pa-xs ">
                <div class="row q-pa-sm bg-grey-1" style="border-radius: 5px">
                  <div class="text-subtitle2 q-mb-xs text-grey-10 text-bold ">Aylık Fiyat İndirim Oranı</div>
                  <div class="col-7 q-pa-xs">
                    <q-range
                      v-model="baseFields.MonthlyPriceRange"
                      :min="0"
                      :max="15"
                      :left-label-value="baseFields.MonthlyPriceRange.min + '%'"
                      :right-label-value="baseFields.MonthlyPriceRange.max + '%'"
                      markers=""
                      switch-label-side
                      label
                      @update:model-value="onChangeMonthlyPriceRange"
                    />
                  </div>
                  <div class="col-5 q-pa-xs ">
                    <q-input
                      type="text"
                      dense
                      outlined
                      readonly
                      v-model="baseFields.MonthlyPrice"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4 q-pa-xs ">
                <div class="row q-pa-sm bg-grey-1" style="border-radius: 5px">
                  <div class="text-subtitle2 q-mb-xs text-grey-10 text-bold ">Yıllık Fiyat İndirim Oranı</div>
                  <div class="col-7 q-pa-xs">
                    <q-range
                      v-model="baseFields.YearlyPriceRange"
                      :min="0"
                      :max="15"
                      :left-label-value="baseFields.YearlyPriceRange.min + '%'"
                      :right-label-value="baseFields.YearlyPriceRange.max + '%'"
                      markers=""
                      switch-label-side
                      label
                      @update:model-value="onChangeYearlyPriceRange"
                    />
                  </div>
                  <div class="col-5 q-pa-xs ">
                    <q-input
                      type="text"
                      dense
                      outlined
                      readonly
                      v-model="baseFields.YearlyPrice"
                    />
                  </div>
                </div>
              </div>
            </div>
            <q-separator class="q-mt-sm" />
            <div class="text-right q-mt-sm" v-if="baseFields.id">
               <q-btn label="Güncelle" type="button" color="blue-8" flat  icon-right="save" @click="onUpdate" />
            </div>
            <div class="text-right q-mt-sm" v-else>
              <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="Kaydet" type="submit" color="positive" flat  icon-right="save"  />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import {computed, ref} from "vue";
import carPricesColumns from "pages/Cars/CarPrices/Columns";
import {dateFormat}  from "pages/Js/Helpers";
import {Notify} from "quasar";

import {useStore} from "vuex";

export default {
  name: "CarTypes",
  setup() {
    const $store = useStore();
    const brands = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarBrandsModule/getCarBrandsState']));
    });
    const optionBrands = ref(brands.value);

    const carModels = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarModelsModule/carModels']))
    });

    let carModelOptions = ref(carModels.value);
    return {
      baseSetting : ref({
        showFormDialog : ref(false),
        carPricesColumns,
        dateFormat,
        filterCarTypes : ref('')
      }),
      baseFields : ref({
        brand_id :ref(null),
        model_id : ref(null),
        id : '',
        WeeklyPriceRange : ref({
          min:0,
          max:0,
        }),
        MonthlyPriceRange : ref({
          min:0,
          max:0,
        }),
        YearlyPriceRange : ref({
          min:0,
          max:0,
        }),
        DailyPrice : ref(0),
        WeeklyPrice:ref(0),
        MonthlyPrice:ref(0),
        YearlyPrice:ref(0),
      }),
      optionBrands,
      carModelOptions,
      carModels,
      brands,
      onFilterCarBrands (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          optionBrands.value = brands.value.filter(v => v.BrandName.toLowerCase().indexOf(needle) > -1)
        })
      },



    }
  },
  methods : {
    onChangeCarBrands(val) {
       this.carModelOptions.splice(0,this.carModelOptions.length)
      this.baseFields.model_id = ''
      this.carModelOptions =  this.carModels.filter(v => {
        return  +v.brand_id === +val.id
      })
    },
    onAddNewPrice() {
      this.onReset();
      this.baseSetting.showFormDialog = true;
    },

    onSubmit() {

      let formData = new FormData();
      formData.append('model_id',this.baseFields.model_id.id)
      formData.append('DailyPrice',this.baseFields.DailyPrice)
      formData.append('WeeklyPrice',this.baseFields.WeeklyPrice)
      formData.append('MonthlyPrice',this.baseFields.MonthlyPrice)
      formData.append('YearlyPrice',this.baseFields.YearlyPrice)
      formData.append('WeeklyPriceRange',JSON.stringify(this.baseFields.WeeklyPriceRange))
      formData.append('MonthlyPriceRange',JSON.stringify(this.baseFields.MonthlyPriceRange))
      formData.append('YearlyPriceRange',JSON.stringify(this.baseFields.YearlyPriceRange))

      this.$store.dispatch('CarPricesModule/create',formData).then(() => {
        this.onReset();
        this.baseSetting.showFormDialog = false;
      });

    },
    onReset() {
     // this.baseFields.model_id.id = ''
      this.baseFields.DailyPrice = 0
      this.baseFields.WeeklyPrice = 0
      this.baseFields.MonthlyPrice = 0
      this.baseFields.YearlyPrice = 0
      this.baseFields.WeeklyPriceRange.max=0
      this.baseFields.MonthlyPriceRange.max=0
      this.baseFields.YearlyPriceRange.max=0
      this.baseFields.brand_id = ''
      this.baseFields.model_id = ''
      this.baseFields.id=''
    },
    onEdit(id) {
      const record = this.getRecords.find(el => {
        return parseInt(el.id) === parseInt(id)
      });

      this.baseFields.id = record.id
      this.baseFields.DailyPrice = record.DailyPrice
      this.baseFields.WeeklyPrice = record.WeeklyPrice
      this.baseFields.MonthlyPrice = record.MonthlyPrice
      this.baseFields.YearlyPrice = record.YearlyPrice

      this.baseFields.WeeklyPriceRange = JSON.parse(record.WeeklyPriceRange)
      this.baseFields.MonthlyPriceRange = JSON.parse(record.MonthlyPriceRange)
      this.baseFields.YearlyPriceRange = JSON.parse(record.YearlyPriceRange)

      this.baseFields.model_id = this.selectedCarModel(record.model_id)
      this.baseFields.brand_id = this.selectedCarBrand(this.baseFields.model_id.brand_id)
      // set carModelOptions where brand_id => on selected car brand
      this.carModelOptions = this.$store.getters['CarModelsModule/carModelByBrandId'](this.baseFields.model_id.brand_id)
      this.baseSetting.showFormDialog = true;

    },
    onUpdate() {
      let formData = new FormData();
      formData.append('model_id',this.baseFields.model_id.id)
      formData.append('DailyPrice',this.baseFields.DailyPrice)
      formData.append('WeeklyPrice',this.baseFields.WeeklyPrice)
      formData.append('MonthlyPrice',this.baseFields.MonthlyPrice)
      formData.append('YearlyPrice',this.baseFields.YearlyPrice)
      formData.append('WeeklyPriceRange',JSON.stringify(this.baseFields.WeeklyPriceRange))
      formData.append('MonthlyPriceRange',JSON.stringify(this.baseFields.MonthlyPriceRange))
      formData.append('YearlyPriceRange',JSON.stringify(this.baseFields.YearlyPriceRange))
      formData.append('id',this.baseFields.id)
      formData.append('_method','PUT');
      this.$store.dispatch('CarPricesModule/update',formData).then(() => {
        this.baseSetting.showFormDialog = false;
        this.onReset();
      })
    },

    onChangeWeeklyPriceRange(val) {
      if (this.baseFields.DailyPrice === 0) {
        this.negativeNotify()
         return false
      }
     this.baseFields.WeeklyPriceRange.min=ref(0)
     this.baseFields.WeeklyPrice = Math.round(this.baseFields.DailyPrice- ((this.baseFields.DailyPrice * val.max ) / 100)).toFixed(2);
    },
    onChangeMonthlyPriceRange(val) {
      if (this.baseFields.DailyPrice === 0) {
        this.negativeNotify()
        return false
      }
      this.baseFields.MonthlyPriceRange.min=ref(0)
      this.baseFields.MonthlyPrice = Math.round(this.baseFields.DailyPrice- ((this.baseFields.DailyPrice * val.max ) / 100)).toFixed(2);
    },
    onChangeYearlyPriceRange(val) {
      if (this.baseFields.DailyPrice === 0) {
        this.negativeNotify()
        return false
      }
      this.baseFields.YearlyPriceRange.min=ref(0)
      this.baseFields.YearlyPrice = Math.round(this.baseFields.DailyPrice- ((this.baseFields.DailyPrice * val.max ) / 100)).toFixed(2);
    },
    onChangeMainPrice(val) {

      if (this.baseFields.id)
      {
        this.baseFields.WeeklyPriceRange.max=ref(0)
        this.baseFields.MonthlyPriceRange.max=ref(0)
        this.baseFields.YearlyPriceRange.max=ref(0)

        this.baseFields.WeeklyPrice=val
        this.baseFields.MonthlyPrice=val
        this.baseFields.YearlyPrice=val
      }
      else {
        // Setting From Zero
        this.baseFields.WeeklyPrice=val
        this.baseFields.MonthlyPrice=val
        this.baseFields.YearlyPrice=val
      }

    },

    negativeNotify() {
      Notify.create({
        position :'center',
        type : 'negative',
        timeout : 600,
        message :'Araç Ücreti Giriniz..!'
      });
    },
    selectedCarBrand(brand_id) {
     return {...this.$store.getters['CarBrandsModule/getCarBrandFromState'](brand_id)}
    },
    selectedCarModel(model_id) {
      return {...this.$store.getters['CarModelsModule/carModel'](model_id)}
    }

  },
  mounted() {
    this.$store.dispatch('CarPricesModule/get')
    this.$store.dispatch('CarBrandsModule/getCarBrands')
    this.$store.dispatch('CarModelsModule/getCarModels')

  },
  computed : {
    getRecords() {
      return this.$store.getters['CarPricesModule/getRecords']
    }
  }
}
</script>

<style scoped>

</style>
