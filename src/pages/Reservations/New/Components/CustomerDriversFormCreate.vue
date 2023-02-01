<template>
  <q-form class="" @submit="onSubmitNewDrivers()">
    <div class="row">
      <div class="col-4 q-pa-xs">
        <div class="text-subtitle2 text-grey-8">İsim </div>
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
        <div class="text-subtitle2 text-grey-8"> Soyisim </div>
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
          placeholder="5** *** ** **"
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
          placeholder="john@mail.com"
        />
      </div>
      <div class="col-4 q-pa-xs">
        <div class="text-subtitle2 text-grey-8">Belge Türü Seçiniz</div>
        <q-select
          v-model="driversFields.DocumentTypeId"
          :options="documentTypes"
          :lazy-rules="true"
          :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
          :option-label="(items) => items.name"
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
          placeholder=""
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
        <div class="text-subtitle2 text-grey-8">Belge Yükleyin </div>
        <q-file
          dense
          outlined
          bottom-slots v-model="driversFields.File"
          :lazy-rules="true"
          :rules="[ val => val || 'Zorunlu alan']"
          @update:model-value="onSelectedNewFile" accept=".jpg, .png, .jpeg, .docx, .xlsx, .pdf">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="driversFields.File = null" class="cursor-pointer" />
          </template>

        </q-file>
      </div>
    </div>
    <div class="text-right"  >
      <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
    </div>
  </q-form>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CustomerDriversFormCreate",
  props: ["customerId"],
  setup(){
      return {
        driversFields : ref({
          DocumentTypeId : '',
          DocumentDateOfIssue :  ref(''),
          DocumentDateOfExpire : ref(''),
          DocumentNumber : ref(''),
          DriverName : '',
          DriverSurname :  '',
          DriverPhone : '',
          DriverEmail :  '',
          File :  ref({}),
          Status : true,
        }),
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
      }
  },
  methods: {
    onSubmitNewDrivers() {
      let driversFormData = new FormData();
      for (const [k,v] of Object.entries(this.driversFields))
      {
        driversFormData.append(k,v);
      }
      driversFormData.append('customer_id',this.customerId)
       this.$store.dispatch('CustomersModule/customerDriversCreate',driversFormData).then(res => {
         if (res === true) {
           this.$emit('closeDriverDialog',res)
           this.$emit('addedNeDrivers',this.customerId)
         }

      })
    },
    downloadFile(fileName) {
      const payload = {
        'folder' : 'user-documents',
        'fileName' : fileName
      }
      this.$store.dispatch('CustomersModule/downloadFile',payload)
    },
    onSelectedNewFile(file) {
      // switch (file.type) {
      //   case 'image/jpeg' || 'image/png':
      //     this.documentFields.imgPreview = URL.createObjectURL(file)
      //     break;
      //   default:
      //     this.documentFields.imgPreview = 'https://img.icons8.com/office/344/documents.png'
      // }
    },
  }

}
</script>

<style scoped>

</style>
