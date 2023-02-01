<template>
  <q-dialog

    full-width
    persistent
    ref="addSeyruseferDialog"
  >
    <q-card style="width: 650px !important;" class="q-pb-sm">
      <q-bar style="height: 50px" class="blue-grey-8">
        <div>Seyrüsefer Kaydı Oluştur</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup  >
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pb-none ">
        <div class="row  q-pa-xs">
          <div class="col-12 ">
            <q-input
              outlined
              dense
              debounce="500"
              color="primary"
              placeholder="Araç plakası giriniz"
              v-model="searchCars"
              readonly
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pb-xs q-pt-xs"  >
        <div class="col-12 q-pa-xs q-mt-xs bg-grey-3" >
          <q-banner dense class="bg-transparent q-pa-sm  " >
            <template v-slot:avatar>
              <q-icon name="o_check_circle" color="positive" />
            </template>
            <div class="text-subtitle2 text-bold">Bilgilendirme</div>
            <div class="text-weight-regular">
              Not: Senede bir defa seyrüsefer yenilemeniz lazım
            </div>

          </q-banner>
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section  class="q-pt-none"  >
        <div class="text-subtitle2 text-bold q-pa-xs bg-grey-3">Seçilen Araç Bilgileri:</div>
        <div class="row bg-grey-3 q-pl-md q-pr-md">
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2  ">Plaka(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.LicencePlate }}</div>
          </div>
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2">Marka(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.BrandName }}</div>
          </div>
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2">Model(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.ModelName }}</div>
          </div>
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2">Sınıf(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.ClassName }}</div>
          </div>
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2">Vites Tipi(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.CarTransmissionName}}</div>
          </div>
          <div class="col-4 q-pa-sm ">
            <div class="text-subtitle2">Yapım Yılı(*)</div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.Year }}</div>
          </div>
        </div>
        <q-separator />

      </q-card-section>


      <form @submit="onSubmit">
        <q-card-section class="q-pt-none"  >
          <span class="text-subtitle2 text-bold q-pa-xs">Seyrüsefer Form Bilgileri :</span>
          <q-separator class="q-mb-xs"/>
          <div class="row">
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
              <q-input
                dense
                outlined
                v-model="formFields.StartDateTime"
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                :disable="this.carDetail.CarSeyruSeferDates !== null"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formFields.StartDateTime"
                        mask="DD.MM.YYYY"
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
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Bitiş Tarihi</div>
              <q-input
                dense
                outlined
                v-model="formFields.EndDateTime"
                hide-bottom-space
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                :disable="this.carDetail.CarSeyruSeferDates !== null"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formFields.EndDateTime"
                        mask="DD.MM.YYYY"
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
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Toplam Fiyat </div>
              <q-input
                outlined
                dense
                v-model="formFields.SeyruseferPrice"
                hide-bottom-space
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
              >
                <template v-slot:append>
                  <div class="text-subtitle2 text-grey-5">TL</div>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12 q-pa-xs q-pb-none">
            <div class="text-subtitle2 text-grey-8">Fatura / Makbuz Yükleyin  </div>
            <q-file
              outlined
              dense
              v-model="formFields.InvoiceFile"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop/>
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="formFields.InvoiceFile = null" class="cursor-pointer"/>
              </template>
            </q-file>
          </div>
          <div class="col-12 q-pt-none q-pa-xs">
            <div class="text-subtitle2 text-grey-8">Açıklama Alanı </div>
            <q-input
              outlined
              dense
              type="textarea"
              placeholder="Açıklama"
              v-model="formFields.Note"
              hide-bottom-space
              :input-style="{maxHeight:'60px'}"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none q-pl-sm q-pr-sm q-mt-xs">
          <div class="row flex justify-end">
            <q-btn color="primary" class="q-mr-sm" label="Vazgeç"  v-close-popup  @click="onReset"/>
            <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet"  />
          </div>
        </q-card-section>
      </form>
    </q-card>
  </q-dialog>
</template>

<script>

import {ref} from "vue";
import {date} from "quasar";

export default {
  name: "CreateSeyyurSeferDialog",
  props: ['carDetail'],
  emits: [ 'ok', 'hide','dismiss' ],
  setup() {
    return {
      searchCars : ref(''),
      formFields: ref({
        cars_id: '',
        StartDateTime:'',
        EndDateTime: '',
        SeyruseferPrice:'',
        Note: '',
        InvoiceFile:''
      }),
    }
  },

  methods : {

    show() {
      this.$refs.addSeyruseferDialog.show()
      this.searchCars = this.carDetail.LicencePlate
      this.formFields.cars_id = this.carDetail.id


      if (this.carDetail.CarSeyruSeferDates) {
        let startDate = new Date(this.carDetail.CarSeyruSeferDates.split('/')[0])
        let newStartDate = date.addToDate(startDate,{ days: 0, months: 0, years:1 })
        this.formFields.StartDateTime = date.formatDate(newStartDate,'DD.MM.YYYY')


        let endDate = new Date(this.carDetail.CarSeyruSeferDates.split('/')[1])
        let newEndDate  = date.addToDate(endDate,{days: 0, months: 0, years:1})
        this.formFields.EndDateTime = date.formatDate(newEndDate,'DD.MM.YYYY')

      }
    },
    onSubmit() {
      let formData = new FormData();
      for(const [k,v] of Object.entries(this.formFields)){
        formData.append(k,v)
      }
      this.$store.dispatch('SeyruSeferModule/create',formData).then( res => {
        if (res === true) this.hide()
      })
    },
    onReset() {
      this.formFields = {};
      this.carDetails = {};
      this.exelExportFields = {}
    },

    hide () {
      this.$refs.addSeyruseferDialog.hide()
      this.$emit('dismiss')
    },

  }
}
</script>

<style scoped>

</style>
