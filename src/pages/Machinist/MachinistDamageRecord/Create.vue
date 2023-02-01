<template>
  <div class="q-pa-md">

<q-card>
  <q-card-section>
    <div class="row items-center no-wrap">
      <div class="col">
        <div class="text-h6">Makinist Hasar Oluşturma</div>
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
      title="Araç ve Makinist Bilgilerinizi Giriniz"
      icon="settings"
      :done="step > 1"
       >
      <q-form @submit="formValidationStepper"   class="q-gutter-md">

      <div class="row q-pb-none">
        <div class="col-3 q-pa-sm q-pb-none">
          <div class="text-weight-regular q-mb-xs text-grey-8">Makinist Türü</div>
          <q-select
            v-model="formFields.machinist_id"
            :options="machinistTypes"
            outlined
            dense
            :option-label="(items) => items.TypeName"
            option-value="id"
            emit-value
            map-options
            use-input
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            hide-bottom-space
            @update:model-value="onSelectedMachinistType"

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
          <div class="text-weight-regular q-mb-xs text-grey-8">Makinist Firma</div>

          <q-select
            v-model="formFields.machinist_comp_id"
            :options="machinistCompanies"
            :option-label="(items) => items.CompanyName"
            :option-value="(items) => items.id"
             outlined
             dense
            use-input
            hide-bottom-space
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"

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

        <div class="col-3 q-pa-sm">
          <div class="text-weight-regular q-mb-xs text-grey-8">Araç Marka</div>
          <q-select
            v-model="formFields.carBrand_id"
            :options="carBrands"
             outlined
            dense
            :option-label="(items) => items.BrandName"
            option-value="id"
            emit-value
            map-options
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
            v-model="formFields.carModel_id"
            :options="carModelOptions"
            outlined
            dense
            :option-label="(items) => items.ModelName"
            :option-value="(items) => items.ModelName"
            emit-value
            map-options
            use-input
            @update:model-value="val => onChangeCarModels(val)"
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"

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

        <div class="col-12">
          <q-table
            title="Araçlar Listesi"
            :rows="carOptions"
            :columns="carsColumns"
            row-key="id"
            :filter="filter"
            selection="single"
            v-model:selected="selected"
            class="no-shadow"
            style="background: #f9f9f9 !important;"
          >
            <template v-slot:top-right>
              <q-input
                outlined
                dense
                debounce="300"
                color="primary"
                v-model="filter"
                placeholder="Plaka Üzerinden Arayınız..."
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" :key="props.row.index" class="text-center">
                <q-td>
                  <q-checkbox  v-model="props.selected"   color="primary" />

                </q-td>
                <q-td>
                  {{ props.row.LicencePlate.toUpperCase() }}
                </q-td>
                <q-td>
                  {{ props.row.BrandName }}
                </q-td>
                <q-td>
                  {{ props.row.ModelName }}
                </q-td>

                <q-td>
                  {{ props.row.ClassName }}
                </q-td>
                <q-td>
                  {{ props.row.CarTransmissionName }}
                </q-td>
<!--                <q-td>-->
<!--                  <q-chip-->
<!--                    square-->
<!--                    :color="+props.row.Status === 1 ? 'positive' : 'negative'"-->
<!--                    text-color="white"-->
<!--                    :icon="+props.row.Status === 1 ? 'done' : 'clear'"-->
<!--                    size="13px"-->
<!--                  >-->
<!--                    {{ +props.row.Status === 1 ? "Açık" : "Kapalı" }}-->
<!--                  </q-chip>-->
<!--                </q-td>-->

<!--                <q-td class="text-center">-->
<!--                  <q-btn flat round color="blue-grey-9"-->
<!--                  ><i class="fas fa-edit"></i-->
<!--                  ></q-btn>-->

<!--                  <q-btn flat round color="primary"-->
<!--                  ><i class="fas fa-trash-alt"></i-->
<!--                  ></q-btn>-->
<!--                </q-td>-->
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>



     <q-stepper-navigation class="text-right">
          <q-btn flat @click="step -=1" color="primary" label="Geriye Gel" class="q-ml-sm"  disable/>
          <q-btn class="text-right"  type="submit" color="blue-grey-8" label="Devam Et" />
      </q-stepper-navigation>
      </q-form>

    </q-step>

     <q-step
       :name="2"
       title="Araç Hasar Kayıtları"
       caption="Opsiyonel"
       icon="assignment"
       :done="step > 2"
     >

       <car-damages :car-id="selected[0].id" @selected-damages="selectedDamages($event)" />

       <q-stepper-navigation class="text-right">
         <q-btn flat @click="step -=1" color="primary" label="Geriye Gel" class="q-ml-sm" />
         <q-btn class="text-right"  type="submit" color="blue-grey-8" @click="step +=1"   label="Devam Et" />
       </q-stepper-navigation>
     </q-step>

     <q-step
       :name="3"
       title="Aracın Tamir Tarihleri"
       icon="assignment"
     >
       <q-form @submit="formValidationStepper"   class="q-gutter-md ">
            <div class="row">
           <div class="col-4 q-pa-xs">
             <div class="text-subtitle2 text-grey-8"> Teslim Edilecek Tarih  </div>
             <q-input
               dense
               square
               outlined
               v-model="formFields.ReservationStartDateTime"
               :lazy-rules="true"
               :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
               hide-bottom-space
             >
               <template v-slot:append>
                 <q-icon name="event" class="cursor-pointer">
                   <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date
                       v-model="formFields.ReservationStartDateTime"
                       :options="checkMinDate"
                       mask="YYYY-MM-DD HH:mm"
                       minimal
                       :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                       @update:model-value="onChangeStartDate"
                     >
                       <div class="row items-center justify-end">
                         <q-btn v-close-popup label="Kapat" color="primary" flat />
                       </div>
                     </q-date>
                   </q-popup-proxy>
                 </q-icon>
               </template>
               <template v-slot:after>
                 <q-btn icon="access_time" class="full-height" outline color="grey-6">
                   <q-popup-proxy  cover transition-show="scale" transition-hide="scale">
                     <q-time
                       v-model="formFields.ReservationStartDateTime"
                       mask="YYYY-MM-DD HH:mm"
                       format24h
                       :options="chekMinStartDateTime"

                     >
                       <div class="row items-center justify-end">
                         <q-btn v-close-popup label="Kapat" color="primary" flat />
                       </div>
                     </q-time>
                   </q-popup-proxy>
                 </q-btn>
               </template>
             </q-input>
           </div>
           <div class="col-4 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">  Teslim Alınacak Tarih   </div>
             <q-input
               dense
               square
               outlined
               v-model="formFields.ReservationEndDateTime"
               hide-bottom-space
             >
               <template v-slot:append>
                 <q-icon name="event" class="cursor-pointer">
                   <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date
                       v-model="formFields.ReservationEndDateTime"
                       mask="YYYY-MM-DD HH:mm"
                       :options="checkMinEndDate"
                       minimal
                       :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                       @update:model-value="onChangeEndDateTime"
                     >
                       <div class="row items-center justify-end">
                         <q-btn v-close-popup label="Kapat" color="primary" flat />
                       </div>
                     </q-date>
                   </q-popup-proxy>
                 </q-icon>
               </template>
               <template v-slot:after>
                 <q-btn icon="access_time" class="full-height" outline color="grey-6">
                   <q-popup-proxy   cover transition-show="scale" transition-hide="scale">
                     <q-time
                       @update:model-value="onChangeEndTime"
                       v-model="formFields.ReservationEndDateTime" mask="YYYY-MM-DD HH:mm" format24h >
                       <div class="row items-center justify-end">
                         <q-btn v-close-popup label="Kapat" color="primary" flat />
                       </div>
                     </q-time>
                   </q-popup-proxy>
                 </q-btn>
               </template>

             </q-input>
           </div>
           <div class="col-4 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">Toplam Fiyat  </div>
             <q-input
               outlined
               dense
               v-model="formFields.EstimatedRepairCost"
               hide-bottom-space
             />
           </div>
         </div>
            <div class="row">
           <div class="col-12 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">Açıklama Alanı </div>
             <q-input
               outlined
               dense
               type="textarea"
               placeholder="Açıklama"
               v-model="formFields.Description"
               hide-bottom-space
             />
           </div>
         </div>
       <div class="row  " >
         <div class="text-subtitle2 text-dark text-bold">Seçili Hasarlar Tablosu  </div>
         <div class="col-12 q-pa-md bg-grey-2">
           <q-table
             :rows="selectedCarDamages"
             :columns="DamageRowColumns"
             hide-bottom
             selection="multiple"
             class="no-box-shadow bg-transparent"
             row-key="id"
             table-header-style="cursor: not-allowed !important;"

           >

             <template v-slot:header="props">
               <q-tr :props="props">
                 <q-th
                   v-for="col in props.cols"
                   :key="col.name"
                   :props="props"
                   class=" "
                 >
                   {{ col.label }}

                 </q-th>
               </q-tr>


             </template>

             <template v-slot:body="props">

               <q-tr :props="props" class="text-center" >
                 <q-td>
                   {{props.row.DamageTitle}}
                 </q-td>
                 <q-td>
                   {{props.row.DamagePrice}} TL
                 </q-td>
                 <q-td>
                   {{props.row.DamageDescription.substring(1,20)+"..."}}
                 </q-td>
                 <q-td class="text-left">
                   <q-badge  :color="   carDamageLevelPointer(props.row.DamageLevel).color" rounded   >

                   </q-badge>
                   {{ carDamageLevelPointer(props.row.DamageLevel).level }}

                 </q-td>
                 <q-td>
                   {{props.row.DamageCode}}
                 </q-td>

                 <q-td>
                   <q-chip color="positive" square  text-color="white"    v-if="props.row.DamageMaintenanceStatus === 'Completed'"  >
                     Hasar Kapatıldı.
                   </q-chip>
                   <q-chip color="blue-6" square text-color="white"  v-if="props.row.DamageMaintenanceStatus === 'Processing'">
                     Tamir Ediliyor.
                   </q-chip>
                   <q-chip color="warning" square text-color="dark"  v-if="props.row.DamageMaintenanceStatus === 'Waiting'">
                     Hasar Beklemede.
                   </q-chip>
                 </q-td>

               </q-tr>
             </template>
           </q-table>
         </div>
       </div>
       <q-stepper-navigation class="text-right">
         <q-btn flat @click="step -=1" color="primary" label="Geriye Gel" class="q-pr-md " />
         <q-btn class="text-right"  type="submit" color="blue-grey-8" icon="save"   label="Kaydet" />
       </q-stepper-navigation>
       </q-form>
     </q-step>
     <template v-slot:message>
       <q-banner v-if="step === 1" class="bg-grey-3 text-dark bordered q-px-lg">
         <div class="text-subtitle1">  <b>1. Adım </b>  Makinisit ve Araç Bilgilerinizi Giriniz</div>
         <template v-slot:avatar>
           <img src="https://img.icons8.com/clouds/50/000000/traffic-jam.png"/>
         </template>
       </q-banner>
       <q-banner v-else-if="step === 2" class="bg-grey-3 text-dark bordered q-px-lg">
         <div class="text-subtitle1">  <b>2. Adım </b>  Araç Hasar Kayıtları.</div>
         <template v-slot:avatar>
           <img src="https://img.icons8.com/clouds/50/000000/automatic-gearbox-warning.png"/>
         </template>
       </q-banner>
       <q-banner v-else class="bg-grey-3 text-dark bordered q-px-lg">
         <div class="text-subtitle1">  <b>3. Adım </b>  Aracın Tamir Tarihleri</div>
         <template v-slot:avatar>
           <img src="https://img.icons8.com/clouds/1000/test-passed.png" width="50"/>
         </template>
       </q-banner>
     </template>
    </q-stepper>
  </q-card>

  </div>

</template>
<script>

import CarDamages from "components/Damages/CarDamages";
import DamageRowColumns from "components/Damages/CarDamagesRowColumns";
import carsColumns from "pages/Cars/Cars/CarsColumns";
import {ref} from 'vue'
import Constants from "app/Constants";
import {Notify} from "quasar";


const getTodayDateTime = () => {
  let todayDate = new Date();
  let   currentMonth =  ((todayDate.getMonth()+1).toString().length === 1) ? "0"+(todayDate.getMonth()+1) : (todayDate.getMonth()+1)
  let   currentDay = (todayDate.getDate().toString().length === 1) ? "0"+todayDate.getDate() : todayDate.getDate()
  let   currentHours = todayDate.getHours()
  let   currentMin = todayDate.getMinutes()
  let   currentYear = todayDate.getFullYear()
  return {
    currentTime : currentYear + "-"+ currentMonth +"-"+currentDay  +" "+ currentHours +":"+currentMin,
    currentMonth: currentMonth,
    currentDay: currentDay,
    currentHours: currentHours,
    currentMin: currentMin,
    currentYear: currentYear,
  };
}

export default {
  setup() {

    return {
      Constants,
      selected: ref([]),
       step: ref(1),
      filter: ref(''),
      machinistCompanies: ref([]),
      carModelOptions: ref([]),
      carOptions: ref([]),
      damageTab: ref('exterior'),
      damagesRow: ref([]),
      selectedCarDamages: ref([]),
      carsColumns,
      formFields : ref({
        DamageCode: ref(),
        DamageLevel: ref(),
        DamageTitle: ref(),
        DamageDescription: ref(),
        DamageFiles: ref(),
        machinist_id: ref(),
        machinist_comp_id: ref(),
        carBrand_id: ref(),
        carModel_id: ref(),
        cars_id: ref(),
        customer_id: ref(),
        ReservationStartDateTime : getTodayDateTime().currentTime,
        ReservationEndDateTime : '',
        EstimatedRepairCost: ref(''),
        Description: ref('')

      }),
      DamageRowColumns,
      carDamageLevelPointer(level) {
        switch (level) {
          case 'low' :
            return {
              color: 'orange',
              level: 'Az'
            }
          case 'medium' :
            return {
              color: 'deep-orange',
              level: 'Orta'
            }
          case 'high' :
            return {
              color: 'red',
              level: 'Yüksek'
            }
          case 'veryHigh' :
            return  {
              color: 'negative',
              level: 'Çok Yüksek'
            }
          default :
            return  {
              color: 'negative',
              level: 'Çok Yüksek'
            }
        }
      },

    }
  },
  mounted() {
    this.$store.dispatch('CarsModule/getCarsDetails')
    this.$store.dispatch('CarsModule/get')
    this.$store.dispatch('MachinistTypesModule/get');
    this.$store.dispatch('MachinistCompaniesModule/get')
    this.$store.dispatch('CarBrandsModule/getCarBrands')
    this.$store.dispatch('CarModelsModule/getCarModels')

  },
  computed : {
    machinistTypes (){
      return  this.$store.getters['MachinistTypesModule/machinistTypes']
    },
    carBrands(){
      return this.$store.getters['CarBrandsModule/getCarBrandsState']
    },
    damageRow(){
      return this.damagesRow === this.$store.getters['CarDamagesModule/elFilterById'](JSON.parse(JSON.stringify(this.selected[0].id)))
    }
  },
  components : {
    CarDamages
  },
  methods : {
    //*********** On Selected Date ********** //
    checkMinDate (date) {
      return date >= getTodayDateTime().currentYear+"/"+getTodayDateTime().currentMonth+"/"+getTodayDateTime().currentDay
    },
    chekMinStartDateTime (hr, min) {
      // if selected Day bigger than today's day
      if (this.formFields.ReservationStartDateTime > getTodayDateTime().currentTime) {
        return  true
      }
      //if selected Hour bigger than or equal to current Hour
      if (hr >= getTodayDateTime().currentHours )
      {
        // if selected hour equal to current hour
        if (min != null && hr === getTodayDateTime().currentHours) {
          return !(  min < getTodayDateTime().currentMin);
        } else {
          return  true
        }

      }
    },
    onChangeEndDateTime () {
      this.setDiffDay ()
    },
    onChangeEndTime(value, details) {
      this.setDiffDay ()

    },
    setDiffDay () {

      let  startDate = new Date(this.formFields.ReservationStartDateTime.replaceAll('-','/') )
      let  endDate = new Date(this.formFields.ReservationEndDateTime.replaceAll('-','/') )

      startDate = new Date(startDate.setHours(startDate.getHours()+3 ) );  // 26 : 13:00

      const diffTime = Math.abs(endDate - startDate);

      const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // 1 gün


      let newEndDate = new Date(startDate.setDate(startDate.getDate() + diff)) // 27 => 13:00
      if (endDate.getTime() > newEndDate.getTime())
      {
        this.formFields.reserved_days =  diff +1;

      } else {
        this.formFields.reserved_days = diff
      }

    },
    checkMinEndDate(date) {
      const startDate = this.formFields.ReservationStartDateTime.split(' ')[0].replaceAll('-','/')
      return date > startDate
    },
    onChangeStartDate(value, reason, details) {
      this.formFields.ReservationEndDateTime = ''
    },

    onChangeCarModels(model_name){

      this.carOptions.splice(0,this.carOptions.length)
      this.carOptions = '';
       this.carOptions = this.$store.getters['CarsModule/getRecordsByName'](model_name);
    },
    onChangeCarBrands(brand_id){
      this.carModelOptions.splice(0,this.carModelOptions.length)
      this.formFields.carModel_id = '';
      this.carModelOptions = this.$store.getters['CarModelsModule/carModelByBrandId'](brand_id)
    },

    formValidationStepper() {
      if(this.step === 1){

      if(this.selected.length <= 0){

        Notify.create({
          position: 'bottom-right',
          message: 'Lütfen araç seçiniz',
          timeout: 1500,
          type: 'negative'
        })

        return false
      }

      }


       if (this.step === 3)  {
         let data = []
         let formData = new FormData();
         for(let i=0; i<this.selectedCarDamages.length; i++){
           data.push(JSON.parse(JSON.stringify(this.selectedCarDamages[i])).id)
         }

         formData.append('car_damage_ids',JSON.stringify(data))
         formData.append('machinist_id',this.formFields.machinist_comp_id.id)
         formData.append('ReservationStartDate',this.formFields.ReservationStartDateTime)
         formData.append('ReservationEndDate',this.formFields.ReservationEndDateTime)
         formData.append('Description',this.formFields.Description)
         formData.append('EstimatedRepairCost',this.formFields.EstimatedRepairCost)
         formData.append('cars_id',this.selected[0].id)
         this.$store.dispatch('MachinistDamageRecordsModule/create',formData).then(res => {
           if (res === true)
           {
              this.$router.back()
           }
         })
      } else {
        this.step += 1;
      }

    },

    onSelectedMachinistType(typeId) {
      this.machinistCompanies.splice(0,this.machinistCompanies.length)
      this.formFields.machinist_comp_id = '';
      this.machinistCompanies = this.$store.getters['MachinistCompaniesModule/elFilterById'](typeId)
    },
    addNewDamage() {
      this.$refs.exteriorDamages.onSubmitNewDamage(JSON.parse(JSON.stringify(this.selected[0].id)))
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
    editDamage(damageId) {

        let damage = this.damagesRow.find(e => +e.id === +damageId)

        this.$refs.exteriorDamages.onEditDamage(damage)

    },
    updateDamage(damageObj) {
      this.damagesRow = this.damagesRow.map(function (item) {
            return item.id === damageObj.id ? damageObj : item
      })
    },
    removeDamage(damageId) {
      this.damagesRow = this.damagesRow.filter(e => {
        return +e.id !== +damageId
      })
    },

    selectedDamages(damages) {
      this.selectedCarDamages = damages
    }
  },

};
</script>
<style scoped>
.stepperHeader {
  background-color: #ddd;
}

</style>
