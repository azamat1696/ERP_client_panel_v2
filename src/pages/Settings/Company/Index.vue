<template>
 <div class="q-pa-md">
   <q-card >
     <q-card-section>
       <div class="text-h6">Şirket Bilgileri</div>
     </q-card-section>
     <q-card-section>


     <q-form  @submit="onUpdate">
       <div class="row">
         <div class="col-6 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyID"
             label=" Şirket ID "
             type="text"
             error-message="Zorunlu Alan"
             filled
             readonly
           />
         </div>
         <div class="col-6 q-pa-sm">
           <q-input
             outlined
             v-model="companyFormFields.CompanyAccessToken"
             label=" Erişim Tokeni "
             type="text"

             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
             filled
             readonly
           />
         </div>
       </div>
       <div class="row">
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyName"
             label=" Şirket Adı "
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyEmail"
             label=" Şirket E-posta "
             type="email"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyVatNumber"
             label=" Vergi Numarası"
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyWebSite"
             label=" Web Site Adresi"
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.CompanyPhone"
             label=" Şirket Telefonu"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.AuthorizedName"
             label=" Yetkili İsim"
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.AuthorizedSurname"
             label=" Yetkili Soyisim"
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.AuthorizedEmail"
             label=" Yetkili E-posta"
             type="email"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>
         <div class="col-4 q-pa-sm">
           <q-input
             outlined
             v-model="detail.AuthorizedPhone"
             label=" Yetkili Telefon"
             type="text"
             dense
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
           />
         </div>


       </div>
       <div class="row">
         <div class="col-6 q-pa-sm">
           <q-card class="q-pa-sm q-img-card  no-box-shadow q-card--bordered" >
             <div class="text-subtitle1 text-left text-grey-7">Şirket Logosu</div>
             <q-img
               class="imgPreview"
               :src="this.$store.getters['MainModule/getServerUrl']+'/uploads/base/'+detail.CompanyLogo"
               spinner-color="white"
               style="max-height: 100px;"
               fit="contain"
             />
             <div class="row">
               <div class="col-9">
                 <q-file
                   class="q-mt-sm"
                   color="grey"
                   v-model="companyFormFields.CompanyLogo"
                   label=" Resmi Seçiniz..."
                   outlined
                   @rejected="onRejected"
                   @update:model-value="fileOnChosen"
                   max-files="1"
                   accept=".jpg,.jpeg,.png"
                   max-file-size="1048576"
                   dense
                   disable
                 >
                   <template v-slot:prepend>
                     <q-icon name="attach_file"  disabled=""/>
                   </template>

                 </q-file>
               </div>
               <div class="col-3">
                 <q-btn  @click="removeSelectedImg" disable  outline label="Sil" class="q-mt-sm q-ml-sm text-right"   color="primary"  icon="clear" style="min-height: 39px"  />
               </div>
             </div>


           </q-card>
         </div>
         <div class="col-6 q-pa-sm">
           <q-input
             label="Şirket Açık Adresi"
             v-model="detail.CompanyAddress"
             outlined
             type="textarea"
             error-message="Zorunlu Alan"
             lazy-rules
             :rules="[ val => val && val.length > 0 ]"
             :input-style="{minHeight :'170px'}"
           />
         </div>
       </div>

       <div class="row q-mt-md">
         <div class="col-12 text-right">
           <q-btn color="blue-8" type="submit" icon-right="save" label="Kaydet" size="md" disable />
         </div>
       </div>

     </q-form>
     </q-card-section>
    </q-card>
 </div>
</template>

<script>

import { defineComponent, ref  } from 'vue'
import { useQuasar } from 'quasar'
import Constants from "app/Constants";
export default  defineComponent ({
  name: "CompanyDetailSettings",
  setup() {
  const $q = useQuasar()
    function onRejected () {
      $q.notify({
        type: 'negative',
        position : 'bottom-right',
        message: `Dosya boyutu yüksek, Lütfen , dosya boyutu max 1 MB olsun `
      })
    }

    return {
      Constants,
      onRejected,
      companyFormFields :ref({
        CompanyID : ref('92351212'),
        AuthorizedName : ref(''),
        AuthorizedSurname : ref(''),
        AuthorizedEmail : ref(''),
        AuthorizedPhone : ref(''),
        CompanyName : ref(''),
        CompanyEmail : ref(''),
        CompanyPhone : ref(''),
        CompanyAddress : ref(''),
        CompanyLogo : ref(''),
        CompanyVatNumber : ref(''),
        CompanyWebSite : ref(''),
        CompanyBusinessArea : ref('test'),
        CompanyAccessToken : ref('RG0kAuUqud7O7jD1Bc3Gr75b0341nRdDZkRSyPfV8rWfGk3uGySC3JIV23tKWSfE'),
        CompanyStatus : ref(''),
      }),
      baseFields : ref({
        imgPreview : ref('')
      }),

    }
  },
  methods : {
    fileOnChosen(value) {
      if (value === null) {
        this.baseFields.imgPreview = this.Constants.NO_IMG;
        this.companyFormFields.CompanyLogo = '';
        return false;
      }
      this.companyFormFields.CompanyLogo = value
      this.baseFields.imgPreview =  URL.createObjectURL(value);
    },
    removeSelectedImg() {
      this.baseFields.imgPreview = this.Constants.NO_IMG;
      this.companyFormFields.CompanyLogo = '';
    },
    onUpdate() {

     let formData = new FormData();
      for (const key in {...this.companyFormFields}) {
         formData.append(`${key}`,`${{...this.companyFormFields}[key]}`)
      }
      if (typeof this.companyFormFields.CompanyLogo === "object") {
        formData.delete('CompanyLogo')
        formData.append('CompanyLogo',this.companyFormFields.CompanyLogo)
      }
      formData.append('_method','PUT');
      this.$store.dispatch('CompanyDetails/update',formData)
    }
  },

  computed : {
    detail() {
      return this.$store.getters['CompanyDetails/companyDetails']
    }
  },
  mounted() {
    this.$store.dispatch('CompanyDetails/get')
  },
  created() {
    this.companyFormFields =  (this.detail.length !== 0) ? this.detail :this.companyFormFields ;
    this.baseFields.imgPreview = (this.detail.length !== 0 && this.companyFormFields.CompanyLogo !== 'no-image.jpg') ? this.Constants.FILE_URL+"/base/"+ this.companyFormFields.CompanyLogo : this.Constants.FILE_URL+"/no-image.jpg";
  },
})
</script>

<style scoped>

</style>
