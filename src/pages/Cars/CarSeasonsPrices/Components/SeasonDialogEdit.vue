<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>
    <q-card class="q-dialog-plugin"  style="width: 1000px !important;">
      <q-form @submit="onOKClick">
        <q-bar class="q-pa-md bg-blue-grey-8  " style="height: 50px">
          <div class="text-h4 text-white"  >Yeni Sezon</div>
          <q-space />
          <q-btn class="text-white" dense flat icon="close" v-close-popup>
            <q-tooltip >Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="row ">

            <div class="col-12">

              <q-banner dense class="bg-grey-1 q-pa-sm  ">
                <template v-slot:avatar>
                  <q-icon name="priority_high" color="primary" />
                </template>
                <div class="text-subtitle2 text-bold">Bilgilendirme</div>
                <div class="text-weight-regular">
                    Dönemlik araç fiyatların durumunu kapatabilir veya açabilirsiniz
                </div>
              </q-banner>

            </div>


          </div>
          <div><q-separator /> </div>

            <div class="row" >
              <div class="col-12 row">
                <div class="col-2 q-pt-sm q-pl-sm q-pr-sm">
                  <div class="text-weight-regular q-mb-xs text-grey-8">Sezon  </div>
                  <q-input
                    dense
                    outlined
                    v-model="formFields.SeasonName"
                    placeholder="Sezon ismi"
                    lazy-rules
                    :rules="[val => val && val.toString() !== 0 || 'Zorunlu alan' ]"
                  />
                </div>
                <div class="col-3 q-pa-sm">
                  <div class="text-weight-regular q-mb-xs text-grey-8">Sezon Başlama tarihi  </div>
                  <q-input
                    dense
                    outlined
                    v-model="formFields.StartDate"
                    :lazy-rules="true"
                    :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date
                            v-model="formFields.StartDate"
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
                <div class="col-3 q-pa-sm">
                  <div class="text-weight-regular q-mb-xs text-grey-8">Sezon Bitiş tarihi  </div>
                  <q-input
                    dense
                    outlined
                    v-model="formFields.EndDate"
                    :lazy-rules="true"
                    :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date
                            v-model="formFields.EndDate"
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
                <div class="col-2 q-pa-sm">
                  <div class="text-weight-regular q-mb-xs text-grey-8"> İndirim Yüzdesi</div>
                  <q-input
                    ref="ageRef"
                    dense
                    outlined
                    type="number"
                    v-model="formFields.Percentage"
                    lazy-rules
                    :rules="percentRules"
                  >
                    <template v-slot:append>
                      <q-icon name="percent" />
                    </template>
                  </q-input>
                </div>
                <div class="col-1 q-pa-sm" style="margin: auto">
                  <q-toggle color="green" v-model="formFields.Status" />
                </div>

              </div>
              <q-separator />
            </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="İptal et" @click="onCancelClick" />
          <q-btn color="blue-grey-8" label="Kaydet" icon="save" type="submit"  />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
     propData: {
       required: true
     } ,
  },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  name: "SeasonDialog",
  setup(){
    return {
      Status:ref(true),
      formFields: ref({}),
      percentRules: [
        val => (val !== null && val !== '') || 'Lütfen yüzde değeri giriniz',
        val => (val >= -50 && val <= 50) || 'Yüzde değeri 50% ile -50% arası olmalıdır'
      ]
    }
  },
  methods:{
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      let data = JSON.parse(JSON.stringify(this.propData))
      this.formFields = data
      this.formFields.Status = +data.Status === 1
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok',{data: this.formFields})
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()

    }
  }
}
</script>

<style scoped>

</style>
