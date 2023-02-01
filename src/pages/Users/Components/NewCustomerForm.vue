<template>
   <div class="q-pa-md">
     <q-form
       @submit="onSubmitNewCustomer"
       @reset="onReset"
       class="q-gutter-md"
     >
       <div class="row">
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Müşteri Tipi </div>
           <q-select
             v-model="formFields.customerTypes"
             :options="customerTypesOption"
             :option-label="(items) => items.title"
             :option-value="(items) => items.value"
             outlined
             dense
             hide-bottom-space
             readonly
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Müşteri Grubu  </div>
           <q-select
             v-model="formFields.customer_groups_id"
             :options="customerGroupsOptions"
             :option-label="(items) => items.Name"
             option-value="id"
             emit-value
             map-options
             outlined
             dense
             hide-bottom-space

           />
         </div>
         <div class="col-3 q-pa-xs" v-show="formFields.customerTypes.value === 'Corporate'">
           <div class="text-subtitle2 text-grey-8">  Şirket Adı  </div>
           <q-input
             hide-bottom-space
             outlined
             dense
             v-model="formFields.CompanyName"

             placeholder=""
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8"> {{formFields.customerTypes.value === 'Individual' ? 'İsim' : 'Yetkili İsim'}}  </div>
           <q-input
             hide-bottom-space
             outlined
             dense
             v-model="formFields.name"
             :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
             placeholder="Jhon"
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8"> {{formFields.customerTypes.value === 'Individual' ? 'Soyismi' : 'Yetkili Soyismi'}} </div>
           <q-input
             hide-bottom-space
             outlined
             dense
             v-model="formFields.surname"
             :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
             placeholder="Snow"
           />
         </div>
         <div class="col-3 q-pa-xs" v-if="formFields.customerTypes.value === 'Individual'">
           <div class="text-subtitle2 text-grey-8">Doğum Tarihi</div>
           <q-input  dense outlined  v-model="formFields.dateOfBirth" mask="date"  hide-bottom-space>
             <template v-slot:append>
               <q-icon name="event" class="cursor-pointer">
                 <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                   <q-date v-model="formFields.dateOfBirth" subtitle="Doğum Günü" years-in-month-view :locale="DateFormatLocale" >
                     <div class="row items-center justify-end">
                       <q-btn v-close-popup label="Kapat" color="primary" flat />
                     </div>
                   </q-date>
                 </q-popup-proxy>
               </q-icon>
             </template>
           </q-input>
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  E-posta </div>
           <q-input
             outlined
             dense
             v-model="formFields.email"

             placeholder="example@mail.com"
             hide-bottom-space
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Telefon </div>
           <q-input
             outlined
             dense
             v-model="formFields.phone"
             prefix="+90"
             mask="### ### ## ##"
             placeholder="5** *** ** **"
             hide-bottom-space
             :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8"> Şehir </div>
           <q-select
             v-model="formFields.cities_id"
             :options="citiesOptions"
             :option-label="(items) => items.CityName"
             :option-value="(items) => items.id"
             :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
             outlined
             dense
             hide-bottom-space
             @filter="onFilterCities"
             @update:model-value="val => onSelectedCity(val)"
             use-input
           />
         </div>
         <div class="col-3 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Bölge</div>
           <q-select
             v-model="formFields.districts_id"
             :options="districtOptions"
             :option-label="(items) => items.DistrictName"
             :option-value="(items) => items.id"
             :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
             outlined
             dense
             hide-bottom-space
           />
         </div>
         <div class="col q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Açık Adresi </div>
           <q-input
             outlined
             dense
             v-model="formFields.address"
             type="textarea"
             placeholder="Açık adres yazınız..."
             hide-bottom-space
             autogrow
           />
         </div>
      </div>
       <div class="row bg-grey-2 q-pa-xs q-card--bordered" v-if="formFields.documents.length && formFields.customerTypes.value === 'Individual'">
         <div class="text-subtitle2 text-bold q-ml-sm">Yüklenen Belgeler</div>
         <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
         <div class="col-12 q-pa-xs row"  v-for="(e,i) in formFields.documents" :key="i">
           <div class="col-3 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">  Belge / Numarası </div>
             <q-input hide-bottom-space dense outlined disable :model-value="selectedDocumentTypes(e.document_type_id) +' / '+ e.document_number" />
           </div>
           <div class="col-3 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">  Belge Notu </div>
             <q-input hide-bottom-space dense outlined disable :model-value="e.document_notes" />
           </div>
           <div class="col-3 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">  Geçerlilik Tarihleri </div>
             <q-input hide-bottom-space dense outlined disable :model-value="e.document_date_of_issue + ' - ' + e.document_date_of_expire" />
           </div>
           <div class="col-3 q-pa-xs text-center">
             <div class="text-subtitle2 text-grey-8 q-pr-xl">  Seçili Belge </div>
              <q-img :src="e.imgPreview" fit="contain" class="text-center"    style="max-width: 40px" />
              <q-btn round icon="highlight_off" size="md" color="negative" class="float-right" flat @click="onRemoveDocument(i)" />
           </div>
         </div>
       </div>


       <div class="row bg-grey-2 q-pa-xs q-card--bordered" v-if="formFields.drivers.length && formFields.customerTypes.value === 'Corporate'">
         <div class="text-subtitle2 text-bold q-ml-sm">Eklenen Sürücü Listesi</div>
         <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
         <div class="col-12 q-pa-xs row"  v-for="(e,i) in formFields.drivers" :key="i" >
           <div class="col-3 q-pa-xs">
             <div class="text-subtitle2 text-grey-8"> Sürücü </div>
             <q-input hide-bottom-space dense outlined disable :model-value="e.DriverName + ' ' + e.DriverSurname" />
           </div>
           <div class="col-6 q-pa-xs">
             <div class="text-subtitle2 text-grey-8">  Telefon / E-posta</div>
             <q-input hide-bottom-space dense outlined disable :model-value="e.DriverPhone + ' / ' + e.DriverEmail" />
           </div>
           <div class="col-3 q-pa-xs text-center">
             <div class="text-subtitle2 text-grey-8 q-pr-xl"> {{selectedDocumentTypes(e.document_type_id)}} </div>
             <q-img :src="e.imgPreview" fit="contain" class="text-center"    style="max-width: 40px" />
             <q-btn round icon="highlight_off" size="md" color="negative" class="float-right" flat @click="onRemoveDriver(i)" />
           </div>
         </div>
       </div>
       <div class="row    q-mt-sm  " >
         <div class="col-12" v-if="formFields.customerTypes.value === 'Individual'">
            <q-btn   label="Belge Ekle" icon="add"    size="12px" color="blue-grey-8" @click="addNewDocumentDialog = true" />
         </div>
         <div class="col-12" v-else>
           <q-btn   label="Sürücü Ekle" icon="person_add_alt"    size="12px" color="blue-grey-8" @click="addNewDriversDialog = true" />
         </div>
       </div>
       <div class="text-right"  >
         <q-btn label="Temizle" type="reset" color="red-10"   icon="restart_alt" class="q-mr-sm" />
         <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
       </div>
     </q-form>

     <q-dialog v-model="addNewDocumentDialog" persistent>
       <q-card style="min-width: 600px">
         <q-bar class="bg-grey-3" style="min-height: 40px">
          <div class="text-subtitle1">Müşteri Evrak Yükleme</div>
           <q-space />
           <q-btn dense flat icon="close" v-close-popup>
             <q-tooltip>Kapat</q-tooltip>
           </q-btn>
         </q-bar>

         <q-card-section>
            <q-form class="" @submit="onSubmitNewDocument()">
               <div class="row">
                 <div class="col-4 q-pa-xs">
                   <div class="text-subtitle2 text-grey-8">Belge Türü Seçiniz</div>
                   <q-select
                     v-model="documentFields.document_type_id"
                     :options="documentTypes"
                     :lazy-rules="true"
                     :rules="[ val => val && val.name.length > 0 || 'Zorunlu alan']"
                     :option-label="(items) => items.name"
                     :option-value="(items) => items.id"
                     outlined
                     dense
                     hide-bottom-space
                   />
                 </div>
                 <div class="col-4 q-pa-xs">
                   <div class="text-subtitle2 text-grey-8">  Belge Numarası </div>
                   <q-input
                     outlined
                     dense
                     v-model="documentFields.document_number"
                     placeholder="328***"
                     :lazy-rules="true"
                     :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                     hide-bottom-space

                   />
                 </div>
                 <div class="col-4 q-pa-xs">
                   <div class="text-subtitle2 text-grey-8"> Not </div>
                   <q-input
                     outlined
                     dense
                     v-model="documentFields.document_notes"
                     hide-bottom-space

                   />
                 </div>
               </div>
              <div class="row">
                <div class="col-4 q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">  Veriliş Tarihi </div>
                  <q-input  dense outlined  v-model="documentFields.document_date_of_issue" mask="date" :rules="['date']" hide-bottom-space  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                          <q-date  v-model="documentFields.document_date_of_issue"   :locale="DateFormatLocale"   minimal>
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
                  <div class="text-subtitle2 text-grey-8">  Son Kullanım Tarihi </div>
                  <q-input  dense outlined  v-model="documentFields.document_date_of_expire" mask="date" :rules="['date']" hide-bottom-space  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                          <q-date  v-model="documentFields.document_date_of_expire"   :locale="DateFormatLocale"  minimal >
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
                  <div class="text-subtitle2 text-grey-8">Belge Yükleyin </div>
                  <q-file dense outlined bottom-slots v-model="documentFields.document_file"  @update:model-value="onSelectedNewFile" accept=".jpg, .png, .jpeg, .docx, .xlsx, .pdf">
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click.stop="documentFields.document_file = null" class="cursor-pointer" />
                    </template>

                  </q-file>
                </div>
              </div>
              <div class="text-right"  >
                <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
              </div>
            </q-form>
          </q-card-section>

       </q-card>
     </q-dialog>

     <q-dialog v-model="addNewDriversDialog" persistent>
       <q-card style="min-width: 600px">
         <q-bar class="bg-grey-3" style="min-height: 40px">
           <div class="text-subtitle1">Sürücü Oluştur</div>
           <q-space />
           <q-btn dense flat icon="close" v-close-popup>
             <q-tooltip>Kapat</q-tooltip>
           </q-btn>
         </q-bar>

         <q-card-section>
           <q-form class="" @submit="onSubmitNewDrivers()">
             <div class="row">

               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8">  Sürücü Adı </div>
                 <q-input
                   outlined
                   dense
                   v-model="driversFields.DriverName"
                   placeholder="Jhon"
                   :lazy-rules="true"
                   :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8"> Sürücü Soyadı </div>
                 <q-input
                   outlined
                   dense
                   v-model="driversFields.DriverSurname"
                   :lazy-rules="true"
                   :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                   placeholder="Snow"
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8"> Telefon </div>
                 <q-input
                   outlined
                   dense
                   v-model="driversFields.DriverPhone"
                   hide-bottom-space
                   prefix="+90"
                   mask="### ### ## ##"
                   placeholder="548 *** ** **"
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8"> E-posta </div>
                 <q-input
                   type="email"
                   outlined
                   dense
                   v-model="driversFields.DriverEmail"
                   hide-bottom-space
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8">Belğe Türü Seçiniz</div>
                 <q-select
                   v-model="driversFields.document_type_id"
                   :options="documentTypes"
                   :lazy-rules="true"
                   :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                    option-label="name"
                   option-value="id"
                   emit-value
                   map-options
                   outlined
                   dense
                   hide-bottom-space
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8"> Belge Numarası </div>
                 <q-input
                   outlined
                   dense
                   v-model="driversFields.DocumentNumber"
                   :lazy-rules="true"
                   :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                   placeholder="111111"
                 />
               </div>
               <div class="col-4 q-pa-xs">
                 <div class="text-subtitle2 text-grey-8">  Veriliş Tarihi </div>
                 <q-input  dense outlined  v-model="driversFields.DocumentDateOfIssue" mask="date" :rules="['date']" hide-bottom-space  >
                   <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                       <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                         <q-date  v-model="driversFields.DocumentDateOfIssue"   :locale="this.$store.getters['MainModule/getDateTimeLocale']"   minimal>
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
                 <div class="text-subtitle2 text-grey-8">  Son Kullanım Tarihi </div>
                 <q-input  dense outlined  v-model="driversFields.DocumentDateOfExpire" mask="date" :rules="['date']" hide-bottom-space  >
                   <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                       <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                         <q-date  v-model="driversFields.DocumentDateOfExpire"   :locale="this.$store.getters['MainModule/getDateTimeLocale']"  minimal >
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
                 <div class="text-subtitle2 text-grey-8">Belğe Yükleyin </div>
                 <q-file
                   dense
                   outlined
                   bottom-slots v-model="driversFields.document_file"
                   :lazy-rules="true"
                   :rules="[ val => val || 'Zorunlu alan']"
                   @update:model-value="onSelectedNewFile" accept=".jpg, .png, .jpeg, .docx, .xlsx, .pdf">
                   <template v-slot:prepend>
                     <q-icon name="cloud_upload" @click.stop />
                   </template>
                   <template v-slot:append>
                     <q-icon name="close" @click.stop="driversFields.document_file = null" class="cursor-pointer" />
                   </template>

                 </q-file>
               </div>

             </div>
             <div class="row">

             </div>
             <div class="text-right"  >
               <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
             </div>
           </q-form>
         </q-card-section>

       </q-card>
     </q-dialog>


   </div>
</template>

<script>

import {useStore} from 'vuex'
import  {ref,computed} from 'vue'

export default {
  name: "NewCustomerForm",
  setup() {


    const $store = useStore();

    //**************** CITIES *************** //
    const  cities = computed(() =>{
      return JSON.parse(JSON.stringify($store.getters['Cities/cities']))
    });
    const citiesOptions = ref(cities.value)
    //*********************************** //

    //**************** DISTRICTS *************** //
    const districts = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['DistrictModule/getRecords']))
    })
    const districtOptions = ref([])
    //*********************************** //

    //**************** CUSTOMERS *************** //
    const customerTypesOption = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getCustomerTypesOption']))
    })
    const customerGroups = computed(()=> {
      return JSON.parse(JSON.stringify($store.getters['CustomerGroupsModule/getRecordsByStatus'](1)))
    })
    const customerGroupsOptions = customerGroups.value
    //**************** CITIES *************** //

    return {
      addNewDocumentDialog: ref(false),
      addNewDriversDialog: ref(false),
      formFields : ref({
         customer_groups_id : ref(''),
         cities_id : ref(''),
         districts_id : ref(''),
         name : ref(''),
         surname : ref(''),
         phone: ref(''),
         CompanyName: ref(''),
         dateOfBirth : ref(''),
         documents : [],
         drivers : [],
         address : ref(''),
         status : ref(true),
         customerTypes : ref({
           title:'Bireysel',
           value:'Individual'
         })
      }),
      customerTypesOption,
      citiesOptions,
      districtOptions,
      customerGroupsOptions,
      cities,
      documentTypes : [
        {
          id:1,
          name:'Ehliyet Belgesi',
        },
        {
          id:2,
          name:'Pasaport Belgesi',
        },
        {
          id:3,
          name:'Kimlik Belgesi',
        }
      ],
      documentFields : ref({
        document_type_id : ref(''),
        document_number : ref(''),
        document_date_of_issue :  ref(''),
        document_date_of_expire : ref(''),
        document_notes :  ref(''),
        document_file :  ref([]),
        imgPreview : ref('')
      }),
      driversFields : ref({
        document_type_id : '',
        DriverName : '',
        DriverSurname :  '',
        DriverPhone : '',
        DriverEmail :  '',
        DocumentDateOfIssue :  ref(''),
        DocumentDateOfExpire : ref(''),
        DocumentNumber : ref(''),
        document_file :  ref([]),
        imgPreview : ref('')
      }),
      onFilterCities(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          citiesOptions.value  =  cities.value.filter(v => v.CityName.toLowerCase().indexOf(needle) > -1)
         })
      },
      onSelectedCity(val) {
         districtOptions.value.splice(0,districtOptions.value.length)
         this.formFields.districts_id = ''
         districtOptions.value =  districts.value.filter(v => {
          return  +v.city_id === +val.id
        })
      }
    }
  },
    methods : {

    onSubmitNewDocument() {
      this.formFields.documents.push({
        document_type_id : this.documentFields.document_type_id.id,
        document_number : this.documentFields.document_number,
        document_date_of_issue : this.documentFields.document_date_of_issue,
        document_date_of_expire : this.documentFields.document_date_of_expire,
        document_notes :  this.documentFields.document_notes,
        document_file :  this.documentFields.document_file,
        imgPreview :  this.documentFields.imgPreview
      })
      this.addNewDocumentDialog = false
      this.onResetNewDocumentFields()
    },
    onSubmitNewDrivers() {
      this.formFields.drivers.push({
        document_type_id : this.driversFields.document_type_id,
        DriverName : this.driversFields.DriverName,
        DriverSurname : this.driversFields.DriverSurname,
        DriverPhone : this.driversFields.DriverPhone,
        DriverEmail :  this.driversFields.DriverEmail,
        DocumentDateOfExpire :  this.driversFields.DocumentDateOfExpire,
        DocumentDateOfIssue :  this.driversFields.DocumentDateOfIssue,
        DocumentNumber :  this.driversFields.DocumentNumber,
        document_file :  this.driversFields.document_file,
        imgPreview :  this.documentFields.imgPreview
      })
      this.addNewDriversDialog = false
      this.onResetNewDriversFields()

    },
    onResetNewDocumentFields() {
      this.documentFields. document_type_id = ''
      this.documentFields. document_number = ''
      this.documentFields. document_date_of_issue = ''
      this.documentFields. document_date_of_expire = ''
      this.documentFields. document_notes = ''
      this.documentFields. document_file = ''
    },
    onResetNewDriversFields() {
         this.driversFields.document_type_id = ''
         this.driversFields.DriverName = ''
         this.driversFields.DriverSurname = ''
         this.driversFields.DriverPhone = ''
         this.driversFields.DriverEmail = ''
         this.driversFields.document_file = ''
         this.documentFields.imgPreview = ''
    },
    onSelectedNewFile(file) {
       switch (file.type) {
          case 'image/jpeg' || 'image/png':
            this.documentFields.imgPreview = URL.createObjectURL(file)
          break;
          default:
          this.documentFields.imgPreview = 'https://img.icons8.com/office/344/documents.png'

      }

     },

    selectedDocumentTypes(document_type_id) {
      const documentType = this.documentTypes.find(e => +e.id === +document_type_id)
      return documentType.name
    },
    onRemoveDocument(index) {
       this.formFields.documents.splice(index,1)
    },
    onRemoveDriver(index) {
       this.formFields.drivers.splice(index,1)
    },
    onSubmitNewCustomer() {

      let  formData = new FormData();
      formData.append('CustomerType',this.formFields.customerTypes.value)
      formData.append('cities_id',this.formFields.cities_id.id)

      formData.append('districts_id',this.formFields.districts_id.id)
      formData.append('Name',this.formFields.name)
      formData.append('CompanyName',this.formFields.CompanyName)
      formData.append('Surname',this.formFields.surname)

      if (typeof this.formFields.customer_groups_id === "number") {
        formData.append('customer_groups_id',this.formFields.customer_groups_id)
      }

      if (this.formFields.email !== undefined) {
        formData.append('Email',this.formFields.email)
      }
      if (this.formFields.phone !== undefined) {
        formData.append('Phone',this.formFields.phone)
      }
      if (this.formFields.dateOfBirth !== undefined) {
        formData.append('DateOfBirthDate',this.formFields.dateOfBirth)
      }
      if (this.formFields.address !== undefined) {
        formData.append('Address',this.formFields.address)
      }
      formData.append('Status',this.formFields.status)


      this.$store.dispatch('CustomersModule/create',formData).then(res  => {
        // after added successfully upload documents
        if (res !== false )
        {
          if (this.formFields.documents.length > 0) {
            this.formFields.documents.forEach(e => {
              let documentFormData = new FormData();
              documentFormData.append('DocumentTypeId',e.document_type_id)
              documentFormData.append('customer_id',res.id)
              documentFormData.append('File',e.document_file)
              documentFormData.append('DocumentDateOfExpire',e.document_date_of_expire)
              documentFormData.append('DocumentDateOfIssue',e.document_date_of_issue)
              documentFormData.append('DocumentNotes',e.document_notes)
              documentFormData.append('DocumentNumber',e.document_number)
              this.$store.dispatch('CustomersModule/customerDocumentCreate',documentFormData).then(res =>{
                // After Upload All Documents
                this.formFields.documents  = []
                this.$emit('closeCustomerDialog')
                this.onReset()
              })
            });
          } else if(this.formFields.drivers.length) {

            this.formFields.drivers.forEach(e => {
              let documentFormData = new FormData();
              documentFormData.append('DocumentTypeId',e.document_type_id)
              documentFormData.append('DriverName',e.DriverName)
              documentFormData.append('customer_id',res.id)
              documentFormData.append('DriverSurname',e.DriverSurname)
              documentFormData.append('DocumentDateOfExpire',e.DocumentDateOfExpire)
              documentFormData.append('DocumentDateOfIssue',e.DocumentDateOfIssue)
              documentFormData.append('DocumentNumber',e.DocumentNumber)
              documentFormData.append('DriverPhone',e.DriverPhone)
              documentFormData.append('DriverEmail',e.DriverEmail)
              documentFormData.append('File',e.document_file)
              documentFormData.append('Status',true)

              this.$store.dispatch('CustomersModule/customerDriversCreate',documentFormData).then(res =>{
                // After Upload All Documents
                this.formFields.drivers  = []
                this.$emit('closeCustomerDialog')
                this.onReset()
              })
            });
          } else {
            // withot loading
            this.$emit('closeCustomerDialog')
            this.onReset()
          }

        }
      })
    },

    onReset() {
        this.formFields.cities_id  = ''
        this.formFields.districts_id  = ''
        this.formFields.name  = ''
        this.formFields.surname  = ''
        this.formFields.phone = ''
        this.formFields.dateOfBirth  = ''
        this.formFields.address  = ''
        this.formFields.status  = ''
    }
  },
  computed : {
    DateFormatLocale() {
      return  this.$store.getters['MainModule/getDateTimeLocale']
    }
  }

}
</script>

<style scoped>

</style>
