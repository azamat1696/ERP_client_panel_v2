<template>
  <div class="  q-pa-md">
    <q-table
      title="Araç Seyrüsefer"
      :rows="getCarSeyrusefer"
      :columns="seyruseferColumns"
      row-key="id"
      :filter="filter"
      ref="carSeyruSeferRows"
    >

      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filter"  placeholder="Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click=" addSeyruseferDialog = true"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          @click="showExelExportFormDialog = true"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
       <b>{{ props.row.LicencePlate }}</b>
          </q-td>
          <q-td>
            {{ date.formatDate(props.row.StartDateTime,'DD.MM.YYYY') }}
          </q-td>
          <q-td>
            {{ date.formatDate(props.row.EndDateTime ,'DD.MM.YYYY')}}
          </q-td>
          <q-td>
            <b>{{ props.row.SeyruseferPrice }} TL</b>
          </q-td>
          <q-td>
            {{ props.row.Note }}
          </q-td>
          <q-td class="text-center">
            <q-btn icon="cloud_download"  color="blue-grey-8" fab flat  @click="this.$store.dispatch('SeyruSeferModule/getCarSeyruseferDownload',props.row.id)" >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura / Makbuz  İndir
              </q-tooltip>
            </q-btn>
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row)" >
              <i class="fas fa-edit">
              </i></q-btn>

            <q-btn flat round color="primary"  @click="onRemove(props.row.id)"><i class="fas fa-trash-alt" disabled></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog
      v-model="addSeyruseferDialog"
      full-width
      persistent
    >
      <q-card style="width: 650px !important;" class="q-pb-sm">
        <q-bar style="height: 50px" class="blue-grey-8">
          <div>Seyrüsefer Kaydı Oluştur</div>
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
                @keypress.enter="searchCarsFn"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pb-none" v-show="addSelectedCarShow">
          <div class="col-12 q-pa-xs q-mt-sm bg-grey-3" >
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

        <q-card-section  class="q-pt-none" v-show="addSelectedCarShow">
          <div class="text-subtitle2 text-bold q-pa-xs bg-grey-3">Seçilen Araç Bilgileri:</div>
          <div class="row bg-grey-3 q-pl-md q-pr-md">
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2  ">Plaka(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.LicencePlate }}</div>
              </div>
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2">Marka(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.BrandName }}</div>
            </div>
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2">Model(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ModelName }}</div>
            </div>
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2">Sınıf(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ClassName }}</div>
            </div>
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2">Vites Tipi(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.CarTransmissionName}}</div>
            </div>
            <div class="col-4 q-pa-sm ">
              <div class="text-subtitle2">Yapım Yılı(*)</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.Year }}</div>
            </div>
          </div>
          <q-separator />

        </q-card-section>


        <form @submit="onSubmit">
          <q-card-section class="q-pt-none" v-show="addSelectedCarShow">
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
              <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet" :disable="!addSelectedCarShow"/>
            </div>
          </q-card-section>
        </form>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="editSeyruseferDialog"
      full-width
      persistent
    >
      <q-card style="width: 650px !important;" class="q-pb-sm">
        <q-bar style="height: 50px" class="blue-grey-8">
          <div>Seyrüsefer Kaydı Düzenle</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup @click="onReset">
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pb-none" v-show="editSelectedCarShow">
          <div class="col-12 q-pa-xs q-mt-sm bg-grey-3" >
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

        <q-card-section  class="q-pt-none" v-show="editSelectedCarShow">
          <div class="text-subtitle2 text-bold q-pa-xs bg-grey-3">Seçilen Araç Bilgileri:</div>
          <div class="row bg-grey-3 q-pl-md q-pr-md">
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2  ">Plaka</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.LicencePlate }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Marka</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.BrandName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Model</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ModelName }}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Sınıf</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.ClassName }}</div>
            </div>
            <div class="col-2  q-pa-sm ">
              <div class="text-subtitle2">Vites Tipi</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.CarTransmissionName}}</div>
            </div>
            <div class="col-2 q-pa-sm ">
              <div class="text-subtitle2">Yapım Yılı</div>
              <div class="text-subtitle2 text-grey-8">{{ carDetails.Year }}</div>
            </div>
          </div>
          <q-separator />

        </q-card-section>


        <form @submit="onSubmitUpdate">
          <q-card-section class="q-pt-none" v-show="editSelectedCarShow">
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
            <div class="row q-pa-xs q-pb-none">

              <div class="text-subtitle2 text-grey-8">Fatura / Makbuz Yükleyin  </div>
              <div class="col-10 q-pa-none">
                <q-file
                  outlined
                  dense
                  v-model="formFields.InvoiceFile"
                  hide-bottom-space
                  max-file-size="5048576"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop/>
                  </template>
                  <template v-slot:append>
                    <q-icon name="close"  class="cursor-pointer"  @click="formFields.InvoiceFile = null"  />
                  </template>
                </q-file>

              </div>
              <div class="col-2 text-right q-pa-none q-ma-none flex-center">
                <q-btn icon="print" color="blue-grey-8 secondary text-right" dense  label="Yazdır" flat  @click="this.$store.dispatch('SeyruSeferModule/getCarSeyruseferDownload',formFields.id)"
                       style="font-size: 13px !important; " >
                  <q-tooltip class="bg-blue-grey-8 text-white">
                    Fatura (dosyayı) yazdır
                  </q-tooltip>
                </q-btn>
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
              <q-btn class="text-right"  type="submit" icon="save" color="blue-grey-8" label="Kaydet" :disable="!editSelectedCarShow"/>
            </div>
          </q-card-section>
        </form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showExelExportFormDialog" persistent>
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
  </div>
</template>

<script>
import { ref } from 'vue';
import {Notify, date, Dialog} from "quasar";
import Constants from "app/Constants";
let timeStamp = Date.now();

const seyruseferColumns = [
  { name: 'LicencePlate', label: 'Plaka', field: 'LicencePlate',align:'center', },
  { name: 'StartDateTime', label: 'Başlama Tarihi', field: 'StartDateTime',align:'center', },
  { name: 'EndDateTime', label: 'Bitiş Tarihi', field: 'EndDateTime',align:'center', },
  { name: 'SeyruseferPrice', label: 'Ücreti', field: 'SeyruseferPrice',align:'center', },
  { name: 'Note', label: 'Not', field: 'Note',align:'center', },
  { name: 'Aksiyon', label: 'Aksiyon', field: 'Aksiyon',align:'center', },
]

export default {

  setup(){
  return {
    filter: ref(''),
    seyruseferColumns,
    timeStamp,
    date,
    Constants,
    editSeyruseferDialog:ref(false),
    editSelectedCarShow: ref(false),
    addSelectedCarShow: ref(false),
    addSeyruseferDialog: ref(false),
    showExelExportFormDialog: ref(false),
    carDetails:ref({}),
    searchCars: ref(''),
    formFields: ref({
        id: '',
        cars_id: '',
        StartDateTime:'',
        EndDateTime: '',
        SeyruseferPrice:'',
        Note: '',
        InvoiceFile:''
    }),
    exelExportFields: ref({
      StartDate: '',
      EndDate: ''
    })
  }
},
  computed:{
    getCarSeyrusefer(){
      return this.$store.getters['SeyruSeferModule/getCarSeyruseferState']
    }
  },
  methods: {
    onSubmit() {
      Dialog.create({
        title: 'Onaylıyormusunuz ?',
        message:  this.carDetails.LicencePlate+' Plakalı aracın mevcut seyrüsefer statüsü kapatılarak yerine yeni seyrüsefer tarihleri eklenecektir. ',
        persistent: true,
        ok : {
          label : 'Evet Tamamla',
          flat:true
        },
        cancel : {
          flat : true,
          label : 'Hayır İptal Et'
        }
      }).onOk(() => {

        let formData = new FormData();
        for(const [k,v] of Object.entries(this.formFields)){
          formData.append(k,v)
        }
        formData.append('cars_id',this.carDetails.id )
        this.$store.dispatch('SeyruSeferModule/create',formData).then( res => {
          this.addSeyruseferDialog = false;
          this.addSelectedCarShow = false
          this.onReset()
        })

      }).onCancel(() => {
        console.log('>>>> Canceled')
      })


    },
    onEdit(data) {
       this.editSeyruseferDialog = true
       this.editSelectedCarShow = true
       this.formFields.cars_id = data.cars_id
       this.formFields.id = data.id
       this.formFields.StartDateTime = date.formatDate(data.StartDateTime,'DD.MM.YYYY')
       this.formFields.EndDateTime =  date.formatDate(data.EndDateTime,'DD.MM.YYYY')
       this.formFields.SeyruseferPrice = data.SeyruseferPrice
       this.formFields.Note = data.Note
       this.formFields.InvoiceFile = data.InvoiceFile

       this.carDetails.LicencePlate = data.LicencePlate
       this.carDetails.BrandName = data.BrandName
       this.carDetails.ModelName = data.ModelName
       this.carDetails.ClassName = data.ClassName
       this.carDetails.CarTransmissionName = data.CarTransmissionName
       this.carDetails.Year = data.Year

    },
    onSubmitUpdate(){
      let formData = new FormData();
      for(const [k,v] of Object.entries(this.formFields)){
        formData.append(k,v)
      }
      formData.append('_method','PUT')
      this.$store.dispatch('SeyruSeferModule/update',formData).then( res => {
        this.editSeyruseferDialog = false;
        this.editSelectedCarShow = false
        this.onReset()
      })

    },
    onReset() {
      this.formFields = {};
      this.carDetails = {};
      this.exelExportFields = {}
    },
    onRemove(id){
    },
    searchCarsFn(e) {

      if (e.target.value.length > 0) {
        let formData = new FormData();
        formData.append('LicencePlate',e.target.value)
        this.$store.dispatch('CarsModule/getFilterCars',formData ).then(res => {
          if (res) {
            this.carDetails = res
            this.formFields.cars_id = res.id
            this.addSelectedCarShow = true
          }
        })
        return false
      }
      Notify.create({
        type: 'negative',
        message: 'Lütfen araç plakası giriniz.',
        timeout: 1000,
        position: "center"
      });
      return false
    },
    exportCarInspections(){
      let formData = new FormData();
      formData.append('type','carSeyrusefer')
      formData.append('StartDate',this.exelExportFields.StartDate)
      formData.append('EndDate',this.exelExportFields.EndDate)
      formData.append('exelName','Seyrüsefer-raporu')
      this.$store.dispatch('Reports/forAllExportExelAction',formData).then(res => {
        if(res){
          this.showExelExportFormDialog = false;
          this.onReset();
        }
      })
    }

  },

}
</script>

