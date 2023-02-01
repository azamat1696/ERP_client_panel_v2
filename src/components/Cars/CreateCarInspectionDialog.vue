<template>
  <q-dialog ref="createCarInspectionDialog" persistent >
    <q-card style="min-width: 700px">
      <q-bar class="q-pa-md" style="height: 50px">
        <div class="text-h4"  >Araç Muayene Kaydı Oluştur</div>

        <q-space />
        <q-btn dense flat icon="close" v-close-popup @click="onReset()">
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-input v-model="searchCars" dense outlined placeholder="Plaka Araması Yapınız"   >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none "  >
        <q-banner dense class="bg-grey-1 q-pa-sm  ">
          <template v-slot:avatar>
            <q-icon name="check_circle_outline" color="positive" />
          </template>
          <div class="text-subtitle2 text-bold">Bilgilendirme</div>
          <div class="text-weight-regular">
            Araç başarıyla bulundu, seçilen araç bilgileri
          </div>
        </q-banner>
        <q-separator />
        <div class="row bg-grey-1 q-pl-md q-pr-md">
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2  ">Plaka </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.LicencePlate }}</div>
          </div>
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2">Marka </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.BrandName }}</div>
          </div>
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2">Model </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.ModelName }}</div>
          </div>
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2">Sınıf </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.ClassName }}</div>
          </div>
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2">Vites Tipi </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.CarTransmissionName}}</div>
          </div>
          <div class="col-2 q-pa-sm ">
            <div class="text-subtitle2">Yapım Yılı </div>
            <div class="text-subtitle2 text-grey-8">{{ carDetail.Year }}</div>
          </div>
        </div>

      </q-card-section>

      <q-card-section class="q-pt-none"  >
        <q-form @submit="onSubmit">
          <div class="row">
            <div class="col-4 q-pa-xs">
              <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
              <q-input
                dense
                outlined
                v-model="formFields.StartDate"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                hide-bottom-space
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formFields.StartDate"
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
                v-model="formFields.EndDate"
                hide-bottom-space
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formFields.EndDate"
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
              <div class="text-subtitle2 text-grey-8">Ücreti </div>
              <q-input
                outlined
                dense
                v-model="formFields.Cost"
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
          <!--            <div class="col-12 q-pt-sm q-pa-xs q-pb-none">-->
          <!--              <div class="text-subtitle2 text-grey-8">Fatura / Makbuz Yükleyiniz. </div>-->
          <!--              <q-file-->
          <!--                outlined-->
          <!--                dense-->
          <!--                v-model="formFields.Files"-->
          <!--                hide-bottom-space-->
          <!--                multiple-->
          <!--              >-->
          <!--                <template v-slot:prepend>-->
          <!--                  <q-icon name="cloud_upload" @click.stop/>-->
          <!--                </template>-->
          <!--                <template v-slot:append>-->
          <!--                  <q-icon name="close" @click="formFields.InvoiceFile = null" class="cursor-pointer"/>-->
          <!--                </template>-->
          <!--              </q-file>-->
          <!--            </div>-->
          <div class="col-12  q-pt-sm  q-pa-xs">
            <div class="text-subtitle2 text-grey-8">Açıklama Alanı </div>
            <q-input
              outlined
              dense
              type="textarea"
              placeholder="Açıklama"
              v-model="formFields.Not"
              hide-bottom-space
              :input-style="{maxHeight:'60px'}"
            />
          </div>
          <div class="row flex justify-end">
            <q-btn color="primary" type="button" class="q-mr-sm" label="Vazgeç"  v-close-popup  @click="onReset"/>
            <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet"  />
          </div>

        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CreateCarInspectionDialog",
  props: ['carDetail'],
  emits: [ 'ok', 'hide','dismiss' ],
  setup() {
    return {
      searchCars : ref(''),
      formFields: ref({
        id: '',
        cars_id: '',
        StartDate: '',
        EndDate: '',
        Status: '',
        Cost: '',
        Not: '',
        // Files : []
      }),
    }
  },
  methods: {
    show() {
      this.$refs.createCarInspectionDialog.show()
      this.searchCars = this.carDetail.LicencePlate

    },
    onSubmit() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.formFields)) {
        formData.append(k,v)
      }
      this.$store.dispatch('CarInspection/create',formData).then(() => {
        this.onReset();
        this.hide()
      });
    },
    onReset() {
      this.formFields = {};
      this.carDetails = {};
      this.exelExportFields={};
    },
    hide() {
      this.$refs.createCarInspectionDialog.hide()
      this.$emit('dismiss')
    },
  }
}
</script>

<style scoped>

</style>
