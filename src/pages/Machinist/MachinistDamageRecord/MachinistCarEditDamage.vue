<template>
  <div class="q-pa-none">
<q-card class="my-card">
<q-card-section class="text-left">
  <div class="text-h6">İşlem Detayları</div>
  <q-separator />
</q-card-section>



      <q-card-section class="col-12 q-mr-lg">
        <div class="text-subtitle1">Makinist Bilgileri</div>
        <q-separator />
        <div class="row q-pa-md">


            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Firma İsmi</div>
              <q-input
                hide-bottom-space
                outlined
                dense
                v-model="formFields.CompanyName"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                disable
              />
            </div>

            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8"> Yetkili Bilgileri</div>
              <q-input
                hide-bottom-space
                outlined
                dense
                v-model="formFields.AuthorizedPerson"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                disable
              />
            </div>

            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">  E-posta </div>
              <q-input
                outlined
                dense
                lazy-rules
                v-model="formFields.CompanyEmail"
                placeholder="example@gmail.com"
                hide-bottom-space
                :rules="[val => (val && val.length > 0) || 'Lütfen e-posta giriniz']"
                disable
              />
            </div>


            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8"> Açık Adresi</div>
              <q-input
                outlined
                dense
                v-model="formFields.CompanyAddress"
                type="textarea"
                placeholder="Açık adress "
                hide-bottom-space
                autogrow
                disable
              />
            </div>
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">  Telefon </div>
              <q-input
                outlined
                dense
                v-model="formFields.CompanyPhone"
                prefix="+90"
                mask="### ### ## ##"
                placeholder="548 *** ** **"
                hide-bottom-space
                lazy-rules
                :rules="[val => (val !== null && val !== '') || 'Zorunlu alan']"
                disable
              />
            </div>




            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">   Vergi Dairesi </div>
              <q-input
                hide-bottom-space
                outlined
                dense
                v-model="formFields.CompanyTaxAddress"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                disable
              />
            </div>
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Vergi Numarası</div>
              <q-input
                outlined
                dense
                lazy-rules
                v-model="formFields.CompanyTaxNumber"
                hide-bottom-space
                :rules="[val => (val && val.length > 0) || 'Zorunlu alan']"
                disable
              />
            </div>
            <div class="col-4 q-pa-xs q-mt-md">

            </div>



        </div>

      </q-card-section>







    <q-card-section class="col-12 q-pr-lg">
      <div class="text-subtitle1">Hasar Kayıt Bilgileri </div>
      <q-separator />

      <div class="row q-pa-md">
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8"> Teslim Edilecek Tarih  </div>
          <q-input
            dense
            square
            outlined
            v-model="reservationFormFields.ReservationStartDate"
            :lazy-rules="true"
            :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
            hide-bottom-space
            disable
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="reservationFormFields.ReservationStartDateTime"
                    mask="YYYY-MM-DD HH:mm"
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
            <template v-slot:after>
              <q-btn icon="access_time" class="full-height" outline color="grey-6">
                <q-popup-proxy  cover transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="reservationFormFields.ReservationStartDateTime"
                    mask="YYYY-MM-DD HH:mm"
                    format24h

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
            v-model="reservationFormFields.ReservationEndDate"
            hide-bottom-space
            disable
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="reservationFormFields.ReservationEndDateTime"
                    mask="YYYY-MM-DD HH:mm"
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
            <template v-slot:after>
              <q-btn icon="access_time" class="full-height" outline color="grey-6">
                <q-popup-proxy   cover transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="reservationFormFields.ReservationEndDateTime" mask="YYYY-MM-DD HH:mm" format24h >
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
            v-model="reservationFormFields.EstimatedRepairCost"
            hide-bottom-space
            disable
          />
        </div>
      </div>
      <div class="row q-pa-md">
        <div class="col-12 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">Açıklama Alanı </div>
          <q-input
            outlined
            dense
            type="textarea"
            placeholder="Açıklama"
            v-model="reservationFormFields.Description"
            hide-bottom-space
            disable
          />
        </div>
      </div>



    </q-card-section>

  <q-card-section class="col-12">
    <q-table
      :rows="reservationFormFields.car_damages"
      :columns="DamageRowColumns"
      hide-bottom
      selection="multiple"
      v-model:selected="selectedDamages"
      class="no-box-shadow"
      row-key="id"
      table-header-style="cursor: not-allowed !important;"
      style="background: #f9f9f9 !important;"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
            Hasar tammlandı
            <q-tooltip class="text-subtitle2 bg-amber" style="color: #1D1D1D">
              Lütfen yapılan hasar kayıtları seçiniz!
            </q-tooltip>
          </q-th>
          <q-th>Araç pilakası</q-th>

          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class=" "
          >
            {{ col.label }}

          </q-th>
          <q-th></q-th>
        </q-tr>


      </template>


      <template v-slot:body="props">

        <q-tr :props="props" class="text-center"  >


          <q-td auto-width>
            <q-checkbox v-model="checkbox"   @click="onSelectedDamage(props.row.damage.id)" :disable="isCompletedOrCanceled" v-if="props.row.damage.DamageMaintenanceStatus === 'Completed'" />
            <q-checkbox  v-model="props.row.Status"  @click="onSelectedDamage(props.row.damage.id)" :disable="isCompletedOrCanceled"  v-else />

          </q-td>
          <q-td>
            {{ this.$store.getters['CarsModule/getRecordByCarId'](props.row.damage.cars_id).LicencePlate}}
          </q-td>
          <q-td>
            {{props.row.damage.DamageTitle}}
          </q-td>
          <q-td>
            {{props.row.damage.customer_id !== null ? {...this.$store.getters['CustomersModule/getRecord'](props.row.damage.customer_id)}.Name +' ' : ''
     }}
          </q-td>
          <q-td>
            {{props.row.damage.DamagePrice}}
          </q-td>
          <q-td>
            {{props.row.damage.DamageDescription.substring(1,20)+"..."}}
          </q-td>
          <q-td class="text-center">
            <q-badge  :color="   carDamageLevelPointer(props.row.damage.DamageLevel).color" rounded   >

            </q-badge>
            {{ carDamageLevelPointer(props.row.damage.DamageLevel).level }}

          </q-td>
          <q-td>
            {{props.row.damage.DamageCode}}
          </q-td>

          <q-td>

            <q-chip color="blue-grey-8" square  text-color="white"    v-if="props.row.damage.DamageMaintenanceStatus === 'Completed'"  >
              Hasar Kapatıldı.
            </q-chip>
            <q-chip color="blue-6" square text-color="white"  v-if="props.row.damage.DamageMaintenanceStatus === 'Processing'">
              Tamir Ediliyor.
            </q-chip>
            <q-chip color="warning" square text-color="dark"  v-if="props.row.damage.DamageMaintenanceStatus === 'Waiting'">
              Hasar Beklemede.
            </q-chip>
          </q-td>

        </q-tr>
      </template>


    </q-table>

  </q-card-section>
  <q-card-section >
    <q-form
      @submit="onSubmit"
      class="row"
    >
      <div class="col-4"></div>

      <div class="col-4"></div>

      <div class="col-4 q-mb-lg">
        <div class="text-subtitle2 text-grey-8">İşlem Durumu </div>

        <q-select
          v-model="reservationFormFields.ReservationStatus"
          :options="ReservationStatusOptions"
          :option-label="(items) => items.title"
          option-value="id"
          outlined
          dense
          hide-bottom-space
          color="blue-grey-8"
          :disable="isCompletedOrCanceled"

        />
      </div>

      <div class="col-12 text-right">
        <q-btn class="text-right  "  type="submit" color="blue-grey-8" icon="save"   label="Kaydet"  :disable="isCompletedOrCanceled"/>
      </div>
    </q-form>
  </q-card-section>

</q-card>
  </div>
</template>

<script>
import MachinistCompaniesColumns from "pages/Machinist/MachinistCompanies/MachinistCompaniesColumns";
import carsColumns from "pages/Machinist/MachinistDamageRecord/Components/CarsColumns";
import {ref} from "vue";
import DamageRowColumns from "components/Damages/DamageRowColumns";
export default {
  name: "MachinistCarEditDamage",
  setup() {
    const selectedDamages = ref([])

    return {
      selectedDamages,
      MachinistCompaniesColumns,
      carsColumns,
      DamageRowColumns,
      checkbox:ref(true),
      isCompletedOrCanceled : ref(false),
      formFields: ref({
        id: ref(),
        CompanyName: ref(''),
        CompanyPhone: ref(),
        machinist_type_id: ref(),
        CompanyEmail: ref(''),
        AuthorizedPerson: ref(''),
        CompanyTaxAddress : ref(''),
        CompanyTaxNumber: ref(''),
        CompanyAddress: ref(''),

      }),

      reservationFormFields : ref({
        id: ref(),
        machinist_id: ref(),
        cars_id: ref(),
        customer_id: ref(),
        ReservationStartDateTime : ref(''),
        ReservationEndDateTime : '',
        EstimatedRepairCost: ref(''),
        Description: ref(''),
        ReservationStatus:ref(''),

      }),
      car_damages:ref([]),
      ReservationStatusOptions: [
        {
          title: 'Devam Ediyor',
          code:  'Opened'
        },
        {
          title: 'İptal Edildi',
          code: 'Canceled'
        },
        {
          title: 'Tamamlandı',
          code: 'Completed',
        },
      ],
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
    this.$store.dispatch('MachinistDamageRecordsModule/get')
    this.$store.dispatch('CarsModule/get')
    this.$store.dispatch('MachinistCompaniesModule/get')
    this.$store.dispatch('CarDamagesModule/get')
    this.$store.dispatch('CustomersModule/get')


  },

  computed: {

  },
  methods: {
    onSubmit(){

      let formData = new FormData()
      formData.append('ReservationStatus',this.reservationFormFields.ReservationStatus.code)
      formData.append('id',this.reservationFormFields.id)
      formData.append('car_damage_ids', this.selectedDamages )
      formData.append('cars_id', this.reservationFormFields.cars_id )
      formData.append('_method','PUT')
      this.$store.dispatch('MachinistDamageRecordsModule/update',formData).then(res => {
        if (res === true)
        {
          this.$router.back()
        }
      })
    },
    onSelectedDamage(id) {

     if(!this.selectedDamages.includes(id))
     {
       this.selectedDamages.push(id)
     } else {
       this.selectedDamages.splice(this.selectedDamages.splice(id),1)
     }

    },
    statusOptions(status){
       switch (status){
         case 'Completed':
    return {
      title: 'Tamamlandı',
      code: 'Completed',
       }
         case 'Opened':
       return {
         title: 'Devam Ediyor',
         code:  'Opened'
       }
         default:
       return {
         title: 'İptal Edildi',
         code: 'Canceled'
       }
       }
    }


  },
  created() {

     let data = JSON.parse(JSON.stringify(this.$store.getters['MachinistDamageRecordsModule/elById'](this.$route.params.machinistDamageId)))

     this.reservationFormFields = data;

     this.reservationFormFields.ReservationStatus = this.statusOptions(data.ReservationStatus)

     this.formFields = this.$store.getters['MachinistCompaniesModule/elById'](data.machinist_id)

    if (this.reservationFormFields.ReservationStatus.code === "Completed" || this.reservationFormFields.ReservationStatus.code === 'Canceled') {
      this.isCompletedOrCanceled = true
    }

  }
}
</script>

<style scoped>

</style>
