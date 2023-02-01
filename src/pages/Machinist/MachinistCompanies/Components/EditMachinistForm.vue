<template>
  <div class="q-pa-none">
    <q-form
      @submit.prevent.stop="onSubmitUpdated"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row q-pa-lg">
        <div class="row col-12">
          <div class="col-4 q-pa-xs">
            <div class="text-subtitle2 text-grey-8"> Makinist Türü</div>
            <q-select
              v-model="formFields.machinist_type_id"
              :options="machinistTypeOptions"
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
  name: "EditOfficeForm",
  props: ['machinistId'],
  setup() {
    const $store = useStore();
    const machinistTypes = computed(() =>{
      return  $store.getters['MachinistTypesModule/machinistTypes']
    })
    const machinistTypeOptions = ref(machinistTypes.value);

    return {
      machinistTypeOptions,
      formFields: ref({
        id: ref(),
        CompanyName: ref(''),
        CompanyPhone: ref(),
        machinist_type_id: ref(),
        CompanyEmail: ref(''),
        AuthorizedPerson: ref(),
        CompanyTaxAddress : ref(''),
        CompanyTaxNumber: ref(''),
        CompanyAddress: ref(''),
        Status: ref(''),

      }),

    }
  },
  mounted() {
    this.$store.dispatch('MachinistCompaniesModule/get')
    this.buildFormField(this.machinistId)
  },
  computed:{
   cities(){
   return this.$store.getters['Cities/cities']
}
  },
  methods: {
    buildFormField(machinistId){

      let data = {...this.$store.getters['MachinistCompaniesModule/elById'](machinistId)}
      this.formFields.id = data.id;
      this.formFields.CompanyName = data.CompanyName;
      this.formFields.CompanyEmail = data.CompanyEmail;
      this.formFields.CompanyPhone = data.CompanyPhone.substring(4,data.CompanyPhone.length);
      this.formFields.AuthorizedPerson = data.AuthorizedPerson;
      this.formFields.CompanyTaxAddress = data.CompanyTaxAddress;
      this.formFields.CompanyTaxNumber = data.CompanyTaxNumber;
      this.formFields.CompanyAddress = data.CompanyAddress;
      this.formFields.Status =  +data.Status === 1;
      this.formFields.machinist_type_id =  {...this.$store.getters['MachinistTypesModule/elById'](data.machinist_type_id)};
    },

    onSubmitUpdated() {
        let formData = new FormData();
        formData.append('id',this.formFields.id)
        formData.append('CompanyName',this.formFields.CompanyName)
        formData.append('CompanyEmail',this.formFields.CompanyEmail)
        formData.append('CompanyPhone','+90 '+this.formFields.CompanyPhone)
        formData.append('AuthorizedPerson',this.formFields.AuthorizedPerson)
        formData.append('CompanyTaxAddress',this.formFields.CompanyTaxAddress)
        formData.append('machinist_type_id',this.formFields.machinist_type_id.id)
        formData.append('CompanyTaxNumber',this.formFields.CompanyTaxNumber)
        formData.append('CompanyAddress', this.formFields.CompanyAddress)
        formData.append('Status',+this.formFields.Status)
        formData.append('_method','PUT');

        this.$store.dispatch('MachinistCompaniesModule/update',formData).then(() => {
          this.onReset()
          this.$emit('closeDialog')
        })

    },
      onReset() {
        this.formFields.CompanyName = '';
        this.formFields.machinist_type_id = '';
        this.formFields.CompanyPhone= '';
        this.formFields.CompanyEmail= '';
        this.formFields.AuthorizedPerson = '';
        this.formFields.CompanyTaxAddress = '';
        this.formFields.CompanyTaxNumber = '';
        this.formFields.CompanyAddress = '';
      },


  }
}
</script>

<style scoped>



</style>
