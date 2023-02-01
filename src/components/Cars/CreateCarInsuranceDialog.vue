<template>
  <q-dialog
    ref="addInsuranceDialog"
    full-width
    persistent
  >
    <q-card style="width: 650px !important;" class="q-pb-sm">
      <q-bar style="height: 50px" class="blue-grey-8">
        <div>Zorunlu Sigorta Kaydı Oluştur</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup @click="onReset">
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pb-none">
        <div class="row  q-pa-xs">
          <div class="col-12 ">
            <q-input
              outlined
              dense
              debounce="500"
              color="primary"
              placeholder="Araç plakası giriniz"
              v-model="searchCars"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pb-xs q-pt-none" >
        <div class="col-12 q-pa-xs q-mt-sm bg-grey-3" >
          <q-banner dense class="bg-transparent q-pa-sm  " >
            <template v-slot:avatar>
              <q-icon name="o_check_circle" color="positive" />
            </template>
            <div class="text-subtitle2 text-bold">Bilgilendirme</div>
            <div class="text-weight-regular">
              Not: Senede bir defa zorunlu sigorta yenilemeniz lazım
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
        <q-card-section class="q-pt-none" >
          <span class="text-subtitle2 text-bold q-pa-xs">Zorunlu Sigorta Form Bilgileri :</span>
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
                v-model="formFields.InsurancePrice"
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
          <div class="row">
            <div class="col-6 q-pa-xs q-pb-none">
              <div class="text-subtitle2 text-grey-8">Sigorta Tipi  </div>
              <q-select
                outlined
                dense
                v-model="formFields.Type"
                hide-bottom-space
                :options="[{code:'Zorunlu',label:'Zorunlu TP'},{code:'Kasko',label: 'Kasko'}]"
                emit-value
                map-options
                option-value="code"
                option-label="label"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                :disable="disableType"

              />
            </div>
            <div class="col-6 q-pa-xs q-pb-none">
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
                  <q-icon name="close" @click="formFields.InvoiceFile == null" class="cursor-pointer"/>
                </template>
              </q-file>
            </div>
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


export default {
  name: "CreateCarInsuranceDialog",
  props: ['carDetail'],
  emits: [ 'ok', 'hide','dismiss' ],
  setup() {
    return {
      searchCars : ref(''),
      disableType :ref(false),
      formFields: ref({
        cars_id: '',
        StartDateTime:'',
        EndDateTime: '',
        InsurancePrice:'',
        Note: '',
        InvoiceFile:[],
        Type : ''
      }),
    }
  },
  methods: {
    show() {
      this.$refs.addInsuranceDialog.show()
      this.searchCars = this.carDetail.LicencePlate
      this.formFields.cars_id = this.carDetail.id

      if (this.carDetail.KaskoInsuranceDates !== null && this.carDetail.ZorunluInsuranceDates !== null ) {
        this.formFields.Type = ''
        this.disableType = false
      }
      if (this.carDetail.KaskoInsuranceDates !== null){
        this.formFields.Type = 'Zorunlu'
        this.disableType = true
      }
      if (this.carDetail.ZorunluInsuranceDates !== null) {
        this.formFields.Type = 'Kasko'
        this.disableType = true
      }
    },

    onSubmit() {

      let formData = new FormData();
      for(const [k,v] of Object.entries(this.formFields)){
        formData.append(k,v)
      }

      this.$store.dispatch('CarInsuranceModule/create',formData).then( res => {

        this.hide()
        this.onReset()
      })

    },
    onReset() {
      this.formFields = {};
      this.carDetails = {};
      this.exelExportFields={};
    },
    hide() {
      this.$refs.addInsuranceDialog.hide()
      this.$emit('dismiss')
    },
  }
}
</script>

<style scoped>

</style>
