<template>
  <div class="q-pa-md">

<q-card>
  <q-card-section>
    <div class="row items-center no-wrap">
      <div class="col">
        <div class="text-h6">Yeni Araç Kaydı</div>
      </div>
      <div class="col-auto">
        <q-chip outline color="indigo" text-color="white" icon="play_arrow"  >
          NEAR Techde Bir Araç Kaydı Oluşturulur İzle <small class="q-ml-sm text-dark  ">(06:45)</small>
        </q-chip>
      </div>
    </div>

  </q-card-section>

  <q-separator />

   <q-stepper
    v-model="step"
    color="primary"
    animated
    done-color="positive"
    active-color="negative"
    header-class="stepperHeader"
    class=" q-pa-none "
     >
    <q-step
      :name="1"
      title="Araç Özellikleri"
      icon="settings"
      :done="step > 1"
       >
      <q-form @submit="formValidationStepper"   class="q-gutter-md">

      <div class="row q-pb-none">
        <div class="col-3 q-pa-sm">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Tipi</div>

          <q-select
            v-model="formFields.CarTypeId"
            :options="carTypeOptions"
            :option-label="items => items.title"
             :option-value="(items) => items.id"
             emit-value
             map-options
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            outlined
            dense
           hide-bottom-space
          />

        </div>

        <div class="col-3 q-pa-sm">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Sınıfı</div>

          <q-select
            v-model="formFields.car_classes_id"
            :options="carClassesOption"
            option-label="ClassName"
            option-value="id"
            emit-value
            map-options
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            outlined
            dense
            hide-bottom-space
          />

        </div>

        <div class="col-3 q-pa-sm">
          <div class="text-weight-regular q-mb-xs text-grey-8">Marka Seçiniz</div>
          <q-select
            v-model="formFields.car_brands_id"
            :options="carBrandsOption"
             outlined
            dense
            :option-label="(items) => items.BrandName"
            :option-value="(items) => items.id"
            emit-value
            map-options
            @filter="onFilterCarBrands"
            @update:model-value="val => onChangeCarBrands(val)"
            use-input
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            hide-bottom-space
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

        <div class="col-3 q-pa-sm q-pb-none">
          <div class="text-weight-regular q-mb-xs text-grey-8">Model Seçiniz</div>
          <q-select
            v-model="formFields.car_models_id"
            :options="carModelOptions"
            :option-label="(items) => items.ModelName"
            :option-value="(items) => items.id"
            outlined
            dense
            emit-value
            map-options
            use-input
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            hide-bottom-space
            @update:model-value="onSelectedCarModel($event)"
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

      <div class="row q-pb-none "  style="margin-top: 0!important;">
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Vites Tipi</div>
          <q-select
          v-model="formFields.car_transmission_types_id"
          :options="carTransmissions"
          :option-label="(items) => items.CarTransmissionName"
          :option-value="(items) => items.id"
          emit-value
          map-options
          hide-bottom-space
          outlined
          dense
          :lazy-rules="true"
          :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
        />
        </div>
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Motor Hacmi</div>
          <q-input

            outlined
            dense
            v-model="formFields.EngineCapacity"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          />
        </div>

        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Yakıt Tipi</div>
          <q-select
            v-model="formFields.car_fuel_types_id"
            :options="carTypeOfFuels"
            :option-label="(items) => items.FuelTypeName"
            :option-value="(items) => items.id"
            emit-value
            map-options
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            outlined
            dense
            hide-bottom-space
          />
        </div>
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Kasa Tipi</div>
          <q-select
            v-model="formFields.car_body_types_id"
            :options="carBodyTypes"
            :option-label="(items) => items.TypeName"
            :option-value="(items) => items.id"
            emit-value
            map-options
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            outlined
            dense
            hide-bottom-space
          />
        </div>
      </div>

      <div class="row  q-pb-none" style="margin-top: 0!important;">
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Plakası</div>
          <q-input
            outlined
            dense
            v-model="formFields.LicencePlate"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
            class="text-uppercase"
          />
        </div>
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Rengi</div>
          <q-input
            outlined
            dense
            v-model="formFields.CarColor"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="formFields.CarColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Yılı</div>
          <q-select
            v-model="formFields.Year"
            :options="carYearsOption"
            :option-label="(items) => items"
            :option-value="(items => items)"
            label="Araç Yılı"
            outlined
            dense
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          />
        </div>
      </div>
      <div class="row  " style="margin-top: 0!important;">
        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Koltuk Sayısı</div>
          <q-input
            class="col-3 q-pa-xs"
            type="number"
            outlined
            dense
            v-model="formFields.NumberOfSeats"
            :lazy-rules="true"
            hide-bottom-space
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
          />
        </div>

        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Kapı Sayısı</div>
          <q-input
            type="number"
            class="col-3 q-pa-xs"
            outlined
            dense
            v-model="formFields.NumberOfDoors"
             :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          />
        </div>

        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Büyük Bavul Sayısı</div>
          <q-input
            type="number"
            class="col-3 q-pa-xs"
            outlined
            dense
            v-model="formFields.NumberOfLargeBags"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          />
        </div>

        <div class="col-3 q-pa-sm  ">
          <div class="text-weight-regular q-mb-xs text-grey-8">Küçük Bavul Sayısı</div>
          <q-input
            type="number"
            class="col-3 q-pa-xs"
            outlined
            dense
            v-model="formFields.NumberOfSmallBags"
            hide-bottom-space
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
          />
        </div>


      </div>
      <div class="row q-mt-md ">
        <div class="text-subtitle1">
          Aracın Ekstra Özelikleri
        </div>
      </div>
      <div class="row bg-grey-2">
       <q-checkbox
         v-model="extraAddonsFormFields.klima"
         color="primary"
         label="Havalandırma"
         class="q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.acilir_tavan"
         color="primary"
         label="Açılan Tavan"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.cep_telefon_teknolojisi"
         color="primary"
         label="Cep telefonu teknolojisi"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.ses_ipod"
         color="primary"
         label="Ses İpod"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.adroid_oto"
         color="primary"
         label="Android Destegi"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.geri_donus_kamerası"
         color="primary"
         label="Geri Dönüş Kamerası"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.arka_park_sensoru"
         color="primary"
         label="Arka Park Kamerası"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.bluetooth"
         color="primary"
         label="Bleutooth Desteği"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.seyir_kontrolu"
         color="primary"
         label="Seyir Kontrolu"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.otamatik_uzun_farlar"
         color="primary"
         label="Otomatik Uzun Farlar"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.park_sensoru"
         color="primary"
         label="Park Sensoru"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.usb_girisi"
         color="primary"
         label="Usb Girisi"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.uydu_navigasyonu"
         color="primary"
         label="Navigasyon Paneli"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.otomatik_acil_frenleme"
         color="primary"
         label="Otomatik Acil Frenleme"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
       <q-checkbox
         v-model="extraAddonsFormFields.ucyuzaltmis_derece_kamera"
         color="primary"
         label="360 Derece Kamera"
         class=" q-pl-sm q-pr-sm q-pb-sm  col-3"
       />
     </div>

     <q-stepper-navigation class="text-right">
          <q-btn flat @click="step -=1" color="primary" label="Geriye Gel" class="q-ml-sm"  disable/>
          <q-btn class="text-right"  type="submit" color="blue-grey-8" label="Devam Et" />
      </q-stepper-navigation>
      </q-form>

    </q-step>

     <q-step
       :name="2"
       title="Araç Fiyatı Alanı"
       icon="assignment"
       :done="step > 2"
     >

       <q-form @submit="formValidationStepper"   class="q-gutter-md">
         <div class="row">
           <div class="col-6 q-pa-sm row">
             <div class="col-md-12 ">
               <div class="text-weight-regular q-mb-xs text-grey-8">Aracın alındığı yer</div>
               <q-input
                 dense
                 outlined
                 type="textarea"
                 v-model="formFields.CarTakenPlace"
                 disable
               />
             </div>

           </div>
           <div class="col-6 row  ">
             <div class="col-md-12 row">
               <div class="col-6 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Aracın niteliği</div>
                 <q-select
                   v-model="formFields.CarAttributes"
                   :options="carAttributesOptions"
                   option-label="title"
                   option-value="title"
                   emit-value
                   map-options
                   :lazy-rules="true"
                   :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                   outlined
                   dense
                   hide-bottom-space
                 />
               </div>
               <div class="col-6 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8"> Aracın Devir Tarihi</div>
                 <q-input
                   dense
                   square
                   outlined
                   v-model="formFields.CarTransferDate"
                   :lazy-rules="true"
                   :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                   hide-bottom-
                   disable
                 >
                   <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                       <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                         <q-date
                           v-model="formFields.CarTransferDate"
                           mask="YYYY-MM-DD"
                           minimal
                           :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                         >
                           <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Kapat" color="primary" flat />
                           </div>
                         </q-date>
                       </q-popup-proxy>
                     </q-icon>
                   </template>
                 </q-input>
               </div>
             </div>
             <div class="col-md-12 row">
               <div class="col-6 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Aracın Alış değeri</div>
                 <q-input
                   type="number"
                   outlined
                   dense
                   v-model="formFields.CarReceiptAmount"
                   :lazy-rules="true"
                   hide-bottom-space
                   :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                   disable
                 />
               </div>
               <div class="col-6 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Para Birimi</div>

                 <q-select
                   v-model="formFields.CarReceiptAmountCurrency"
                   :options="CurrencyTypesOptions"
                   outlined
                   dense
                   option-label="title"
                   option-value="title"
                   emit-value
                   map-options
                   use-input
                   :lazy-rules="true"
                   :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                   disable
                 >
                   <template v-slot:option="scope">
                     <q-item v-bind="scope.itemProps">

                       <q-item-section>
                         <q-item-label>  <q-icon size="xs" color="grey-8" :name="scope.opt.icon" />  {{ scope.opt.title }}</q-item-label>
                       </q-item-section>
                     </q-item>
                   </template>
                   <template v-slot:selected-item="scope">
                     <q-icon size="xs" color="grey-8" :name="scope.opt.icon" @click.stop class="q-mr-sm" />
                     {{ scope.opt.title }}
                   </template>
                 </q-select>
               </div>
             </div>

           </div>

         </div>
       <div class="row">
         <div class="col-md-4 q-pa-sm">
           <div class="text-weight-regular q-mb-xs text-grey-8">Aracın Mevcut Konumu</div>
           <q-select
             v-model="formFields.offices_id"
             :options="officeOptions"
             :option-label="(items) => items.OfficeName"
             :option-value="(items => items.id)"
             emit-value
             map-options
             outlined
             dense
             use-input
             hide-bottom-space
             :lazy-rules="true"
             :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
           >
             <template v-slot:selected-item="scope"  >
               <q-icon color="primary" text-color="white"  name="location_on" size="sm" />
               {{ scope.opt.OfficeName }}
             </template>
             <template v-slot:no-option>
               <q-item>
                 <q-item-section class="text-grey">
                   Kayıt Bulunamadı
                 </q-item-section>
               </q-item>
             </template>
           </q-select>
         </div>
         <div class="col-md-2 q-pa-sm">
           <div class="text-weight-regular q-mb-xs text-grey-8">Günlük Ücreti</div>
           <q-input dense outlined disable prefix="TL" :model-value="carPrices.DailyPrice"  />
         </div>
         <div class="col-md-2 q-pa-sm">
           <div class="text-weight-regular q-mb-xs text-grey-8">Haftalık Ücreti</div>
           <q-input dense outlined disable prefix="TL"  :model-value="carPrices.WeeklyPrice"  />
         </div>
         <div class="col-md-2 q-pa-sm">
           <div class="text-weight-regular q-mb-xs text-grey-8">Aylık Ücreti</div>
           <q-input dense outlined disable prefix="TL"  :model-value="carPrices.MonthlyPrice"  />
         </div>
         <div class="col-md-2 q-pa-sm">
           <div class="text-weight-regular q-mb-xs text-grey-8">Yıllık Ücreti</div>
           <q-input dense outlined disable prefix="TL"  :model-value="carPrices.YearlyPrice"  />
         </div>
       </div>
       <div class="row">
         <div class="col-6 q-pa-sm">
           <q-card class="q-pa-sm q-img-card  no-box-shadow q-card--bordered" >
             <div class="text-subtitle1 text-left text-grey-7">Araç Resmi</div>
             <q-img
               class="imgPreview"
               :src="imgPreview"
               spinner-color="white"
               style="max-height: 100px;"
               fit="contain"
             />
             <div class="row">
               <div class="col-9">
                 <q-file
                   class="q-mt-sm"
                   color="grey"
                   v-model="formFields.Image"
                   label=" Resmi Seçiniz..."
                   outlined
                   @rejected="onRejected"
                   @update:model-value="fileOnChosen"
                   max-files="1"
                   accept=".jpg,.jpeg,.png"
                   max-file-size="1048576"
                   dense
                 >
                   <template v-slot:prepend>
                     <q-icon name="attach_file" />
                   </template>

                 </q-file>
               </div>
               <div class="col-3">
                 <q-btn  @click="removeSelectedImg"  outline label="Sil" class="q-mt-sm q-ml-sm text-right"   color="primary"  icon="clear" style="min-height: 39px"  />
               </div>
             </div>


           </q-card>
         </div>
         <div class="col-6 q-pa-sm row">
           <div class="col-md-12 q-pa-sm">
             <div class="text-weight-regular q-mb-xs text-grey-8">Araç Sözleşme Metni</div>
             <q-input
               dense
               outlined
               type="textarea"
               v-model="formFields.CarRemarks"
             />
           </div>
           <div class="col-6">
             <div class="text-weight-regular q-mb-xs text-grey-8"> Araç Durumu </div>
             <q-toggle
               v-model="formFields.Status"
               color="green"
             />
           </div>

         </div>
       </div>
       <q-stepper-navigation class="text-right">
         <q-btn flat @click="step -=1" color="primary" label="Geriye Gel" class="q-ml-sm" />
         <q-btn class="text-right"  type="submit" color="blue-grey-8" icon="save"   label="Kaydet" />
       </q-stepper-navigation>
       </q-form>
     </q-step>

     <template v-slot:message>
       <q-banner v-if="step === 1" class="bg-grey-3 text-dark bordered q-px-lg">
         <div class="text-subtitle1">  <b>1. Adım </b>  Araç Genel Bilgileri</div>
         <template v-slot:avatar>
           <img src="https://img.icons8.com/clouds/50/000000/traffic-jam.png"/>
         </template>
       </q-banner>
       <q-banner v-else class="bg-grey-3 text-dark bordered q-px-lg">
         <div class="text-subtitle1">  <b>2. Adım </b>  Araç Konum & Fiyat Kayıtları.</div>
         <template v-slot:avatar>
           <img src="https://img.icons8.com/clouds/50/000000/marker.png"/>
         </template>
       </q-banner>
     </template>
    </q-stepper>
  </q-card>

  </div>
</template>
<script>


import DamageRowColumns from "components/Damages/DamageRowColumns";
import {ref,computed} from 'vue'
import { useStore } from 'vuex'
import {Notify} from "quasar";
import Constants from "app/Constants";


export default {
  setup() {
    const $store = useStore();

    const carTypes = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getCarTypes']))
    })
    const carTypeOptions = ref(carTypes.value);

    const carBrands = computed(() => {
       return JSON.parse(JSON.stringify($store.getters['CarBrandsModule/getCarBrandsState']));
    });

    const carClasses = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarClassesModule/carClassesGetter']))
    })
    const carClassesOption = ref(carClasses)
    const carBrandsOption = ref(carBrands.value)

    const carModels = computed(() => {

      return JSON.parse(JSON.stringify($store.getters['CarModelsModule/carModels']))
    });
    let  carModelOptions = ref(carModels.value);

    const carTransmissions = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarTransmissionsModule/getRecords']))
    });
    const carTypeOfFuels = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarFuelTypesModule/getRecords']))
    })
    const carBodyTypes = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CarTypesModule/carTypes']))
    })
    const carYears = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getCarYears']))
    })
    const carYearsOption = ref(carYears);
    const CurrencyTypes = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getReservationCurrencyTypes']))
    })
    const CurrencyTypesOptions = ref(CurrencyTypes.value)


    const offices = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['OfficeModule/getRecords']))
    })
    const officeOptions = ref(offices)
    const carAttributes = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getCarAttributes']))
    })
    const carAttributesOptions = ref(carAttributes.value)
    function onRejected () {
     Notify.create({
       type: 'negative',
       position : 'bottom-right',
       message: `Dosya boyutu yüksek, Lütfen , dosya boyutu max 1 MB olsun `
     })
    }
    return {
      carClassesOption,
      Constants,
      step: ref(1),
      officeOptions,
      carTypeOptions,
      carBrandsOption,
      carModelOptions,
      carTransmissions,
      carTypeOfFuels,
      carBodyTypes,
      carYearsOption,
      CurrencyTypesOptions,
      carAttributesOptions,
      damageTab: ref('exterior'),
      formFields : ref({
         CarTypeId : '',
         car_classes_id : '',
         car_brands_id : ref(''),
         car_models_id : ref(''),
         car_transmission_types_id : ref(''),
         EngineCapacity : '',
         car_fuel_types_id : ref(''),
         car_body_types_id : ref(),
         LicencePlate : ref(''),
         offices_id: ref(''),
         Image : ref([]),
         Status: ref(true),
         CarColor: ref('#ab0707'),
         Year : ref(''),
         NumberOfSeats : ref(''),
         NumberOfDoors : ref(''),
         NumberOfLargeBags : ref(''),
         NumberOfSmallBags : ref(''),
         CarRemarks : ref(''),
        CarTakenPlace: ref(''),
        CarTransferDate: ref(''),
        CarReceiptAmount: ref(''),
        CarAttributes: ref(''),
        CarReceiptAmountCurrency: ref('')
      }),

      extraAddonsFormFields : ref({
       klima : ref(false),
       acilir_tavan:ref(false),
       cep_telefon_teknolojisi:ref(false),
       ses_ipod:ref(false),
       adroid_oto:ref(false),
       geri_donus_kamerası:ref(false),
       arka_park_sensoru:ref(false),
       bluetooth:ref(false),
       seyir_kontrolu:ref(false),
       otamatik_uzun_farlar:ref(false),
       park_sensoru:ref(false),
       usb_girisi:ref(false),
       uydu_navigasyonu:ref(false),
       otomatik_acil_frenleme:ref(false),
       ucyuzaltmis_derece_kamera:ref(false),
      }),
      carPrices : ref({}),

      DamageRowColumns,
      onFilterCarBrands (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          carBrandsOption.value = carBrands.value.filter(v => v.BrandName.toLowerCase().indexOf(needle) > -1)
         })
      },
      onChangeCarBrands(carBrandId) {

        carModelOptions.value.splice(0,carModelOptions.value.length)
        this.formFields.car_models_id = ''
        carModelOptions.value =  carModels.value.filter(v => {
          return  v.brand_id === carBrandId
        })
      },
      carDamageLevelPointer(level) {
        switch (level) {
          case 'low' :
           return 'orange'
          case 'medium' :
            return 'deep-orange'
          case 'high' :
            return 'red'
          case 'veryHigh' :
            return 'negative'
        }
      },

      imgPreview : ref(''),
      onRejected,

    }
  },

  methods : {
    formValidationStepper() {
       if (this.step === 2)  {
         let formData = new FormData();
         formData.append('id',this.formFields.id)
         formData.append('NumberOfSmallBags',this.formFields.NumberOfSmallBags)
         formData.append('NumberOfLargeBags',this.formFields.NumberOfLargeBags)
         formData.append('NumberOfDoors',this.formFields.NumberOfDoors)
         formData.append('NumberOfSeats',this.formFields.NumberOfSeats)
         formData.append('Year',this.formFields.Year)
         formData.append('CarColor',this.formFields.CarColor)
         formData.append('Status',this.formFields.Status)


         formData.append('Image',this.formFields.Image)

         formData.append('offices_id',this.formFields.offices_id)
         formData.append('LicencePlate',this.formFields.LicencePlate)
         formData.append('car_body_types_id',this.formFields.car_body_types_id)
         formData.append('car_fuel_types_id',this.formFields.car_fuel_types_id)
         formData.append('EngineCapacity',this.formFields.EngineCapacity)
         formData.append('car_transmission_types_id',this.formFields.car_transmission_types_id)
         formData.append('car_models_id',this.formFields.car_models_id)
         formData.append('car_classes_id',this.formFields.car_classes_id)
         formData.append('CarRemarks',this.formFields.CarRemarks)
         formData.append('CarTypeId',this.formFields.CarTypeId)
         formData.append('car_brands_id',this.formFields.car_brands_id)
         formData.append('CarTakenPlace',this.formFields.CarTakenPlace)
         formData.append('CarTransferDate',this.formFields.CarTransferDate)
         formData.append('CarReceiptAmount',this.formFields.CarReceiptAmount)
         formData.append('CarAttributes',this.formFields.CarAttributes)
         formData.append('CarReceiptAmountCurrency',this.formFields.CarReceiptAmountCurrency)

         formData.append('ExtraFields', JSON.stringify(this.extraAddonsFormFields))
         formData.append('_method','PUT')

         this.$store.dispatch('CarsModule/update',formData).then( (res) => {
            if (res === true)
            {
              this.$router.push({name : 'carList'})
            }
        })
      } else {
        this.step += 1;
      }

    },
    onSelectedCarModel(modelId) {
      this.carPrices = {...this.$store.getters['CarPricesModule/getCarPriceByModelID'](modelId)}
    },


    fileOnChosen(value) {
      if (value === null) {
        this.imgPreview = this.Constants.NO_IMG;
        this.formFields.Image = '';
        return false;
      }
      this.formFields.Image = value
      this.imgPreview =  URL.createObjectURL(value);

    },

    removeSelectedImg() {
      this.imgPreview = this.Constants.NO_IMG;
      this.formFields.Image = '';
    },

  },


  mounted() {
    this.$store.dispatch('OfficeModule/get')
    this.$store.dispatch('CarBrandsModule/getCarBrands');
    this.$store.dispatch('CarModelsModule/getCarModels');
    this.$store.dispatch('CarTransmissionsModule/get');
    this.$store.dispatch('CarFuelTypesModule/get');
    this.$store.dispatch('CarTypesModule/get');
    this.$store.dispatch('CarPricesModule/get')
    this.$store.dispatch('CustomersModule/get')
    this.$store.dispatch('CarsModule/get')
    this.$store.dispatch('CarClassesModule/get')
    this.$store.dispatch('MainModule/getTransaction')

  },
  created(){

        let url = 'https://mekosoftware.com/public/uploads/cars/';
        let data = JSON.parse(JSON.stringify(this.$store.getters['CarsModule/getRecordByCarId'](this.$route.params.id)))
        data.Status = 1 ? data.Status = true : data.Status = false;
        data.car_classes_id = +data.car_classes_id
        data.car_brands_id = +data.car_brands_id
        data.car_body_types_id = +data.car_body_types_id
        data.car_fuel_types_id = +data.car_fuel_types_id
        data.car_models_id = +data.car_models_id
        data.offices_id = +data.offices_id
        data.car_transmission_types_id = +data.car_transmission_types_id
        data.CarTypeId = +data.CarTypeId
        this.formFields = data
        this.imgPreview =  this.$store.getters['MainModule/getServerUrl']+'/public/uploads/cars/'+data.Image
        this.carPrices = {...this.$store.getters['CarPricesModule/getCarPriceByModelID'](data.car_models_id)}
        this.extraAddonsFormFields = JSON.parse(data.ExtraFields)


  },
};
</script>
<style scoped>
.stepperHeader {
  background-color: #ddd;
}
</style>
