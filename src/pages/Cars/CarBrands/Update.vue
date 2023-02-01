<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">  <q-btn round color="primary" flat icon="arrow_back"   @click="$router.go(-1)" />Marka Güncelleme</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="  row"
        >
         <div class="col-6 q-pa-sm">
           <q-input
             filled
             v-model="carBrandFields.BrandName"
             label="Yeni Marka İsmi"
             lazy-rules
             :rules="[ val => val.length >= 3 || 'Zorunlu Alan']"
           />
           <q-toggle v-model="carBrandFields.Status" label="Marka Statusu"  color="positive"  />
         </div>
         <div class="col-6 q-pa-sm">
           <q-card class="q-pa-sm q-img-card" >
             <div class="text-subtitle1 text-center">Marka Resmi</div>
             <q-img
               class="imgPreview"
               :src="imgPreview"
               spinner-color="white"
               style="max-height: 200px;"
               fit="contain"
             />
             <div class="row">
               <div class="col-9">
                 <q-file
                   class="q-mt-sm"
                   color="grey"
                   v-model="carBrandFields.BrandLogo"
                   label="Marka Resmi Seçiniz..."
                   outlined
                   @rejected="onRejected"
                   @update:model-value="fileOnChosen"
                   max-files="1"
                   accept=".jpg,.jpeg,.png"
                   max-file-size="1048576"
                   dense
                 >
                   <template v-slot:prepend>
                     <q-icon name="attach_file" />
                   </template>

                 </q-file>
               </div>
               <div class="col-3">
                 <q-btn  @click="removeSelectedImg"  outline label="Sil" class="q-mt-sm q-ml-sm text-right"   color="primary"  icon="clear" style="min-height: 39px"  />
               </div>
             </div>


           </q-card>
         </div>

          <div class="col-12 text-left q-pr-sm">
           <q-btn label="Güncelle" type="submit" color="blue-9" icon-right="update"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import Constants from "app/Constants";
  export default {
  name: "Create",
  data() {
   const $q = useQuasar()
    function onRejected () {
        $q.notify({
        type: 'negative',
        position : 'bottom-right',
        message: `Dosya boyutu yüksek, Lütfen , dosya boyutu max 1 MB olsun `
      })
    }
    return {
      onRejected,
      Constants,
      carBrandFields : {
        BrandName : '',
        BrandLogo : null,
        Status : true,
        id : ''
       },
      imgPreview : ''
    }
  },
  methods: {
    fileOnChosen(value) {
     if (value === null) {
       this.imgPreview = this.Constants.NO_IMG;
       this.carBrandFields.BrandLogo = '';
       return false;
     }
      this.carBrandFields.BrandLogo = value
      this.imgPreview =  URL.createObjectURL(value);
    },
    removeSelectedImg() {
      this.imgPreview = this.Constants.NO_IMG;
      this.carBrandFields.BrandLogo = '';
    },

    onSubmit() {
      let updateFormData = new FormData();
      updateFormData.append('BrandName',this.carBrandFields.BrandName)
      if (this.carBrandFields.BrandLogo ) {
        updateFormData.append('BrandLogo',this.carBrandFields.BrandLogo)
      }
      updateFormData.append('Status',this.carBrandFields.Status.toString())
      updateFormData.append('id',this.carBrandFields.id)
      updateFormData.append('_method','PUT')
      this.$store.dispatch('CarBrandsModule/update', updateFormData)

    },
  },
   created() {
      const carBrand = this.$store.getters['CarBrandsModule/getCarBrandFromState'](parseInt(this.$route.params.id));
      this.carBrandFields.BrandName = carBrand.BrandName;
      this.imgPreview = this.Constants.FILE_URL+'/brands/'+carBrand.BrandLogo;
      this.carBrandFields.id = carBrand.id
      this.carBrandFields.Status =   !!carBrand.Status;
   }
 }
</script>

<style scoped>
.q-img-card {
  box-shadow: 0 1px 5px rgba(159, 150, 150, 0.2), 0 2px 2px rgba(189, 189, 189, 0.14), 0 3px 1px -2px rgba(101, 99, 99, 0.12) !important;
}
</style>
