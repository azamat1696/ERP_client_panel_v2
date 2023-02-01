<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">  <q-btn round color="primary" flat icon="arrow_back"   @click="$router.go(-1)" /> Yeni Araç Marka Kaydı </div>
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
          <q-uploader
              style=" width: 100%;"
             class=" "
             accept=".jpg,.jpeg,.png"
             max-file-size="1048576"
             hide-upload-btn
             label="Marka Resmi Seçiniz"
             square
             flat
             bordered
             @rejected="onRejected"
             @added="fileOnChosen"
             max-files="1"
           />
         </div>
          <div class="col-12 text-right q-pr-sm">
           <q-btn label="Kaydet" type="submit" color="positive" icon-right="save"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'

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
      carBrandFields : {
        BrandName : '',
        BrandLogo : '',
        Status : true,
        user_id : '1'
      }
    }
  },
  methods: {
    fileOnChosen(files) {
      this.carBrandFields.BrandLogo = files[0];
    },
    onSubmit() {
      let postFormData = new FormData();
      postFormData.append('BrandName',this.carBrandFields.BrandName)
      if (this.carBrandFields.BrandLogo) {
        postFormData.append('BrandLogo',this.carBrandFields.BrandLogo)
      }
      postFormData.append('Status',this.carBrandFields.Status)
      postFormData.append('user_id',this.carBrandFields.user_id)
      this.$store.dispatch('CarBrandsModule/create',postFormData)

    },
  },
   created() {

   }
 }
</script>

<style scoped>

</style>
