<template>
  <div class="q-pa-md">
    <q-form
      class="q-gutter-md"
    >
      <div class="row">

        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Müşteri Tipi  </div>
          <q-select
            v-model="formFields.CustomerType"
            :options="customerTypesOption"
            :option-label="(items) => items.title"
            option-value="value"
            emit-value
            map-options
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
        <div class="col-3 q-pa-xs" v-show="formFields.CustomerType === 'Corporate'">
          <div class="text-subtitle2 text-grey-8">  Şirket Adı  </div>
          <q-input
            hide-bottom-space
            outlined
            dense
            :model-value="formFields.CompanyName"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            placeholder=""
            readonly
          />
        </div>
        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  {{formFields.CustomerType === 'Individual' ? 'İsim' : 'Yetkili İsim'}}</div>
          <q-input
            hide-bottom-space
            outlined
            dense
            v-model="formFields.Name"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            placeholder="Jhon"
          />
        </div>


        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  {{formFields.CustomerType === 'Individual' ? 'Soyism' : 'Yetkili Soyismi'}}</div>
          <q-input
            hide-bottom-space
            outlined
            dense
            v-model="formFields.Surname"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            placeholder="Snow"
          />
        </div>
        <div class="col-3 q-pa-xs" v-if="formFields.CustomerType === 'Individual'">
          <div class="text-subtitle2 text-grey-8">Doğum Tarihi</div>
          <q-input  dense outlined  v-model="formFields.DateOfBirthDate" mask="date"  hide-bottom-space>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formFields.DateOfBirthDate"   subtitle="Doğum Günü" years-in-month-view :locale="locale" >
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
            v-model="formFields.Email"
            placeholder="example@gmail.com"
            hide-bottom-space
          />
        </div>
        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Telefon </div>
          <q-input
            outlined
            dense
            v-model="formFields.Phone"
            prefix="+90"
            mask="### ### ## ##"
            placeholder="548 *** ** **"
            hide-bottom-space
          />
        </div>
        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8"> Şehir </div>
          <q-select
            v-model="formFields.cities_id"
            :options="citiesOptions"
            :option-label="(items) => items.CityName"
            option-value="id"
            emit-value
            map-options
            outlined
            dense
            hide-bottom-space
            @update:model-value="val => onSelectedCity(val)"
          />
        </div>

        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Bölge</div>
          <q-select
            v-model="formFields.districts_id"
            :options="districtOptions"
            :option-label="(items) => items.DistrictName"
            option-value="id"
            emit-value
            map-options
            outlined
            dense
            hide-bottom-space
          />
        </div>
        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Açık Adresi </div>
          <q-input
            outlined
            dense
            v-model="formFields.Address"
            type="textarea"
            placeholder="Açık adres yazınız..."
            hide-bottom-space
            autogrow
          />
        </div>
        <div class="col-3 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Kullanıcı Durumu </div>
          <q-toggle
            v-model="formFields.Status"
            color="green"
          />
        </div>
        <div class="col  text-right">
          <q-btn class="q-mt-lg" label=" Güncelle" type="button" color="secondary"  icon-right="refresh"  @click="onUpdateCustomer" />
        </div>
      </div>
      <div class="row bg-grey-2 q-pa-xs q-card--bordered"  v-if="formFields.CustomerType === 'Individual'">
       <customer-documents :customer_documents="formFields.customer_documents" :customer-id="customerId"/>
      </div>
      <div class="row bg-grey-2 q-pa-xs q-card--bordered" v-if="formFields.CustomerType === 'Corporate'">
       <customer-drivers :driver-rows="formFields.customer_drivers" :customer-id="customerId" />
      </div>
    </q-form>
  </div>
</template>

<script>

import {useStore,mapGetters } from "vuex";
import {computed, ref} from "vue";

import CustomerDrivers from './CustomerDrivers'
import CustomerDocuments from "./CustomerDocuments";
export default {
  name: "EditCustomerForm",
  props : ['customerId'],
  setup() {

    const $store = useStore();

    const cities = computed(() =>{
      return JSON.parse(JSON.stringify($store.getters['Cities/cities']))
    });
    const citiesOptions = ref(cities.value)
    const districts = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['DistrictModule/getRecords']))
    })
    const districtOptions = ref(districts.value)

    const customerTypesOption = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['MainModule/getCustomerTypesOption']))
    })

    const customerGroups = computed(()=> {
      return JSON.parse(JSON.stringify($store.getters['CustomerGroupsModule/getRecords']))
    })
    const customerGroupsOptions =ref(customerGroups)

    return {
      citiesOptions,
      districtOptions,
      customerGroupsOptions,
      customerTypesOption,
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
      }),
      onSelectedCity(cityId) {
        this.formFields.districts_id = ''
        districtOptions.value  =  districts.value.filter( v => {
          return  +v.city_id === +cityId
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('Cities/get')
    this.$store.dispatch('DistrictModule/get')
    this.buildFormFields(this.customerId)

  },

  methods: {
    buildFormFields(customerID) {
       let data  = {...this.$store.getters['CustomersModule/getRecord'](customerID)}
       data.Status = +data.Status === 1;
       data.districts_id = +data.districts_id
       data.cities_id = +data.cities_id
       data.customer_groups_id = +data.customer_groups_id
       data.Phone = data.Phone.substring(4,data.Phone.length)
       this.formFields = data


    },

    onUpdateCustomer() {
      let  formData = new FormData();
      for (const [k,v] of Object.entries(this.formFields))
      {
        if ( (k !== 'customer_documents' || k !== 'customer_drivers') && v !== null )
        {
          formData.append(k,v);
        }
      }
      formData.append('_method','PUT');
      this.$store.dispatch('CustomersModule/update',formData).then(res =>{
        if (res === true)
        {
          this.$emit('closeCustomerDialog')
        }
      })
    },
  },

  components : {
    CustomerDrivers,
    CustomerDocuments
  }
}
</script>

<style scoped>

</style>
