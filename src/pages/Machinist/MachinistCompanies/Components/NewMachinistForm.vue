<template>
  <div class="q-pa-none">
    <q-form
      @submit.prevent.stop="onSubmitNewForm"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row q-pa-lg">
        <div class="row col-12">
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8"> Makinist Türü</div>
            <q-select
              v-model="formFields.machinist_type_id"
              :options="machinistTypes"
              :option-label="(items) => items.TypeName"
              :option-value="(items) => items.id"
              outlined
              dense
              hide-bottom-space
            />
          </div>
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8">Firma İsmi</div>
            <q-input
              hide-bottom-space
              outlined
              dense
              v-model="formFields.CompanyName"
              :lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />
          </div>

          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8"> Yetkili Bilgileri</div>
            <q-input
              hide-bottom-space
              outlined
              dense
              v-model="formFields.AuthorizedPerson"
              :lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />
          </div>
        </div>
        <div class="row col-12 q-mt-sm">
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8"> Açık Adresi</div>
            <q-input
              outlined
              dense
              v-model="formFields.CompanyAddress"
              type="textarea"
              placeholder="Açık adress "
              hide-bottom-space
              autogrow
            />
          </div>
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8">  Telefon </div>
            <q-input
              outlined
              dense
              v-model="formFields.CompanyPhone"
              prefix="+90"
              mask="### ### ## ##"
              placeholder="5** *** ** **"
              hide-bottom-space
              lazy-rules
              :rules="[val => (val !== null && val !== '') || 'Zorunlu alan']"
            />
          </div>
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8">  E-posta </div>
            <q-input
              outlined
              dense
              lazy-rules
              v-model="formFields.CompanyEmail"
              placeholder="example@gmail.com"
              hide-bottom-space
              :rules="[val => (val && val.length > 0) || 'Lütfen e-posta giriniz']"
            />
          </div>

        </div>
        <div class="row col-12 q-mt-sm">

          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8">   Vergi Dairesi </div>
            <q-input
              hide-bottom-space
              outlined
              dense
              v-model="formFields.CompanyTaxAddress"
              :lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />
          </div>
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8">Vergi Numarası</div>
            <q-input
              outlined
              dense
              lazy-rules
              v-model="formFields.CompanyTaxNumber"
              hide-bottom-space
              :rules="[val => (val && val.length > 0) || 'Zorunlu alan']"
            />
          </div>
          <div class="col-4 q-pa-xs q-mt-md">

            <q-toggle v-model="formFields.Status" label="Status" color="green"/>

          </div>

        </div>

      </div>

 <div class="text-right q-pa-md">
   <q-btn   type="submit" icon="save"   color="blue-grey-8"  label="Kaydet"/>
 </div>

    </q-form>

  </div>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from "vuex";

export default {
  name: "NewOfficeForm",
  setup() {
  const $store = useStore();
  const OfficeWorkingPeriods = (computed(() => {
    return JSON.parse(JSON.stringify($store.getters['MainModule/getOfficeWorkingPeriods']))
  }))
    return {
        formFields: ref({
          machinist_type_id: ref(),
          CompanyName: ref(''),
          CompanyAddress: ref(''),
          CompanyPhone: ref(''),
          CompanyEmail: ref(''),
          AuthorizedPerson: ref(''),
          CompanyTaxAddress: ref(''),
          CompanyTaxNumber: ref(''),
          Status: ref(true),
        }),

    }
  },
  mounted() {
      this.$store.dispatch('MachinistTypesModule/get')
  },
  computed:{
    machinistTypes(){
       return  this.$store.getters['MachinistTypesModule/machinistTypes']
     },
  },
  methods: {

    onSubmitNewForm() {

        let formData = new FormData();
        formData.append('machinist_type_id',this.formFields.machinist_type_id.id)
        formData.append('CompanyName',this.formFields.CompanyName)
        formData.append('CompanyPhone','+90 '+this.formFields.CompanyPhone)
        formData.append('CompanyEmail',this.formFields.CompanyEmail)
        formData.append('AuthorizedPerson',this.formFields.AuthorizedPerson)
        formData.append('CompanyTaxAddress',this.formFields.CompanyTaxAddress)
        formData.append('CompanyTaxNumber',this.formFields.CompanyTaxNumber)
        formData.append('CompanyAddress',this.formFields.CompanyAddress)
        formData.append('Status', this.formFields.Status)

        this.$store.dispatch('MachinistCompaniesModule/create',formData).then(res => {
            this.onReset()
          this.$emit('closeDialog');
        })

    },
    onReset() {
       this.formFields.machinist_type_id = '';
       this.formFields.CompanyName= '';
       this.formFields.CompanyPhone= '';
       this.formFields.CompanyEmail = '';
       this.formFields.AuthorizedPerson = '';
       this.formFields.CompanyTaxAddress = '';
       this.formFields.CompanyTaxNumber = '';
       this.formFields.CompanyAddress='';
    },

  }
}
</script>

<style scoped>


</style>
