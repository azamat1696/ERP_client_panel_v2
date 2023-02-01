<template>
  <div class="q-pa-md">
    <q-table
      title="Araç Muayeneleri"
      :rows="getRecords"
      :columns="baseSetting.carClassesColumns"
      row-key="id"
      :filter="baseSetting.filterCarTypes"
      :pagination="pagination"
      ref="carInspectionsRows"
    >
      <template  v-slot:top-left>
        <q-btn
          color="primary"
          label="Toplu Kayıt Ekle"
          icon="add"
          dense
          flat
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="baseSetting.showNewMultipleDialog=true"
        />
      </template>
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterCarTypes"  placeholder=" Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="onSearchOpenModal"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          @click="baseSetting.showExelExportFormDialog  = true"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ props.row.LicencePlate }}
          </q-td>
          <q-td>
            {{ props.row.Car }}
          </q-td>
          <q-td>
            {{ date.formatDate(props.row.StartDate,"DD.MM.YYYY") }}
          </q-td>
          <q-td>
            {{ date.formatDate(props.row.EndDate,"DD.MM.YYYY") }}
          </q-td>
          <q-td>
            {{ props.row.Cost +  " TL " }}
          </q-td>
          <q-td>
            {{ props.row.Not === null ||  props.row.Not === 'null' ? ''  :  props.row.Not }}
          </q-td>
          <q-td>
            <q-chip  square :color="+ compareDate(props.row.EndDate) ? 'positive' :'negative'" text-color="white" :icon="+compareDate(props.row.EndDate) ?'done' : 'clear'" size="13px">
              {{ (+compareDate(props.row.EndDate)) ? 'Açık' :'Kapalı' }}
            </q-chip>
          </q-td>

          <q-td class="text-right">
            <q-btn icon="cloud_download" color="blue-grey-8" fab flat  disable>
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura / Makbuz  İndir
              </q-tooltip>
            </q-btn>
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row)" >
              <i class="fas fa-edit">
              </i></q-btn>
<!--            <q-btn flat round color="grey-8"  ><i class="fas fa-images"></i></q-btn>-->
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.showEditFormDialog" persistent >
      <q-card style="min-width: 700px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4"  >Araç Muayene Kaydı Düzenle</div>

          <q-space />
          <q-btn dense flat icon="close" v-close-popup @click="onReset()">
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none ">
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
              <div class="text-subtitle2 text-grey-8">{{ carDetails.LicencePlate }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Marka </div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.BrandName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Model </div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ModelName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Sınıf </div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ClassName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Vites Tipi </div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.CarTransmissionName}}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Yapım Yılı </div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.Year }}</div>
            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onUpdateSubmit">
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
              <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet" />
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog   v-model="baseSetting.showNewFormDialog" persistent >
      <q-card style="min-width: 700px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4"  >Araç Muayene Kaydı Oluştur</div>

          <q-space />
          <q-btn dense flat icon="close" v-close-popup @click="onReset()">
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-input v-model="onSearchCarLicencePlate" dense outlined placeholder="Plaka Araması Yapınız"  @keyup.enter="onSearchCar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none " v-if="findCar">
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
              <div class="text-subtitle2 text-grey-8">{{ findCar.LicencePlate }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Marka </div>
              <div class="text-subtitle2 text-grey-8">{{ findCar.BrandName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Model </div>
              <div class="text-subtitle2 text-grey-8">{{ findCar.ModelName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Sınıf </div>
              <div class="text-subtitle2 text-grey-8">{{ findCar.ClassName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Vites Tipi </div>
              <div class="text-subtitle2 text-grey-8">{{ findCar.CarTransmissionName}}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Yapım Yılı </div>
              <div class="text-subtitle2 text-grey-8">{{ findCar.Year }}</div>
            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none" v-if="findCar">
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
              <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet" :disable="!findCar"/>
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog v-model="baseSetting.showExelExportFormDialog" persistent>
      <q-card  >
        <q-bar class="q-pa-md bg-grey-4  " style="height: 50px">
          <div class="text-h4"  >Model Bazlı Fiyat Tanımlama</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form
            @submit="exportCarInspections"
            @reset="onReset"
            class=""
          >
            <div class="row">
              <div class="q-pa-xs q-mt-sm">
                <q-banner dense class="bg-grey-1 q-pa-sm  ">
                  <template v-slot:avatar>
                    <q-icon name="priority_high" color="primary" />
                  </template>
                  <div class="text-subtitle2 text-bold">Bilgilendirme</div>
                  <div class="text-weight-regular">
                   Aracın Muayene raporunu tarih aralığına göre alabilirsiniz tarih aralığı seçmezseniz hepsini getirecektir.
                  </div>

                </q-banner>
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <div class="text-weight-regular q-mb-xs text-grey-8">Başlama Tarihi</div>
                <q-input
                  dense
                  outlined
                  v-model="exelExportFields.StartDate"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="exelExportFields.StartDate"
                          minimal
                          mask="YYYY-MM-DD"
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
              <div class="col-6 q-pa-sm">
                <div class="text-weight-regular q-mb-xs text-grey-8">Bitiş Tarihi</div>
                <q-input
                  dense
                  outlined
                  v-model="exelExportFields.EndDate"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="exelExportFields.EndDate"
                          minimal
                          mask="YYYY-MM-DD"
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
            <div class="text-right q-mt-sm" >
              <q-btn label="Ara" type="submit" class="bg-blue-grey-9" color="white" flat  icon="search"  />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog   v-model="baseSetting.showNewMultipleDialog" persistent >
      <q-card style="min-width: 700px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4"  >Toplu Olarak Kayıt</div>

          <q-space />
          <q-btn dense flat icon="close" v-close-popup  >
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>



        <q-card-section class="q-pt-none"  >
          <q-form @submit="onSubmitTopluKayit">
            <div class="row q-mt-md">
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
                <q-input
                  dense
                  outlined
                  v-model="topluMuayeneKayit.StartDate"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="topluMuayeneKayit.StartDate"
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
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Bitiş Tarihi</div>
                <q-input
                  dense
                  outlined
                  v-model="topluMuayeneKayit.EndDate"
                  hide-bottom-space
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="topluMuayeneKayit.EndDate"
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
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Araç Niteliği </div>
                  <q-select
                    outlined
                  dense
                  :options="this.$store.getters['MainModule/getCarAttributes']"
                  v-model="topluMuayeneKayit.CarAttributes"
                    emit-value
                    map-options
                    use-input
                    :lazy-rules="true"
                    :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                    option-label="title"
                    option-value="title"
                  />
              </div>
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Ücreti </div>
                <q-input
                  outlined
                  dense
                  v-model="topluMuayeneKayit.Cost"
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

            <div class="row flex justify-end">
              <q-btn color="primary" type="button" class="q-mr-sm" label="Vazgeç"  v-close-popup  />
              <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet"  />
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {ref} from "vue";
import carClassesColumns from "pages/Cars/CarInspections/Columns";
import {dateFormat}  from "pages/Js/Helpers";
import { Dialog, Notify,date} from "quasar";
export default {
  name: "CarTypes",
  setup: function () {

    return {

      date,
      pagination: {
        rowsPerPage: 9 // current rows per page being displayed
      },
      baseSetting: ref({
        showNewMultipleDialog : ref(false),
        showNewFormDialog: ref(false),
        showEditFormDialog: ref(false),
        showExelExportFormDialog: ref(false),
        carClassesColumns,
        dateFormat,
        filterCarTypes: ref('')
      }),
      onSearchCarLicencePlate: ref(''),
      carDetails: ref({}),
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
      topluMuayeneKayit: ref({

        StartDate: '',
        EndDate: '',
        CarAttributes:'',
        Cost: '',

        // Files : []
      }),
      exelExportFields: ref({
        StartDate: '',
        EndDate: ''
      })
    }
  },
  methods : {
    onSearchOpenModal() {
      this.onSearchCarLicencePlate = ''
         this.$store.commit('CarInspection/unsetFindCar')
         this.baseSetting.showNewFormDialog = true
    },
    onSubmit() {
      Dialog.create({
        title: 'Onaylıyormusunuz',
        message: this.onSearchCarLicencePlate +" Plakalı aracın mevcut muayine statusu kapatılarak yerine yeni muayine tarihleri kayıt edilecektir.",
        persistent: true,
        ok : {
          label : 'Evet Kaydet',
          flat:true
        },
        cancel : {
          flat : true,
          label : 'Hayır İptal Et'
        }
      }).onOk(() => {
        let formData = new FormData();
        for (const [k,v] of Object.entries(this.formFields)) {
          formData.append(k,v)
        }
        this.$store.dispatch('CarInspection/create',formData).then(() => {
          this.onReset();
          this.baseSetting.showNewFormDialog = false;
        });
      }).onCancel(() => {
        console.log('>>>> Canceled')
      })


    },

    onSubmitTopluKayit() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.topluMuayeneKayit)) {
        formData.append(k,v)
      }
      this.$store.dispatch('CarInspection/createMultiple',formData).then((res) => {
       if (res === true) {
         this.onReset();
         this.baseSetting.showNewMultipleDialog = false;
       }
      });
    },
    onUpdateSubmit(){
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.formFields)) {
        formData.append(k,v)
      }
      formData.append('_method','PUT')
      this.$store.dispatch('CarInspection/update',formData).then(() => {
        this.onReset();
        this.baseSetting.showEditFormDialog = false;
      });
    },
    onReset() {
      this.formFields = {};
      this.carDetails = {};
      this.exelExportFields={};
    },
    onSearchCar() {
      if (this.onSearchCarLicencePlate === '') {
        Notify.create({
          position : 'top-right',
          message : 'Lütfen geçerli bir araç plakası giriniz...',
          timeout : 2500,
          type : 'warning'
        })
        return false
      }
      let formData = new FormData();
      formData.append('LicencePlate',this.onSearchCarLicencePlate)
       this.$store.dispatch('CarInspection/getCarByLicencePlate',formData).then(res => {
         if (res === true)
         {
           this.formFields.cars_id = this.findCar.id
         }
       })
    },
    onEdit(data){
      this.baseSetting.showEditFormDialog = true
      this.formFields.EndDate = date.formatDate(data.EndDate,'DD.MM.YYYY')
      this.formFields.StartDate = date.formatDate(data.StartDate,'DD.MM.YYYY')
      this.formFields.cars_id = data.cars_id
      this.formFields.Not = data.Not
      this.formFields.Cost = data.Cost
      this.formFields.id = data.id
      this.carDetails = data

    },
    compareDate(StartDate) {
      let ToDayDate = new Date();
      let StartDayDate =  new Date(StartDate);
      return StartDayDate.getTime() > ToDayDate.getTime()
    },
    exportCarInspections(){
    let formData = new FormData();
      formData.append('type','carInspection')
      formData.append('StartDate',this.exelExportFields.StartDate)
      formData.append('EndDate',this.exelExportFields.EndDate)
      formData.append('exelName','Muayene-raporu')
      this.$store.dispatch('Reports/forAllExportExelAction',formData).then(res => {
        if(res){
          this.baseSetting.showExelExportFormDialog = false;
          this.onReset();
        }
      })
    }
  },
  computed : {
    getRecords() {
      return  this.$store.getters['CarInspection/inspectionGetter']
    },
    findCar() {
      return this.$store.getters['CarInspection/findCarGetter']
    }
  }
}
</script>

<style scoped>

</style>
