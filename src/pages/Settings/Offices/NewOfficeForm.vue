<template>
  <div class="q-pa-none">
    <q-form
      @submit.prevent.stop="onSubmitNewForm"
      @reset="onReset"
      class="q-gutter-md"
    >

      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        class="q-pa-none  no-box-shadow"
      >
        <q-step
          :name="1"
          title="Ofis Bilgilerini Giriniz"
          icon="settings"
          :done="step > 1"
          style="min-height: 200px;  "
          class="  text-dark"
        >
          <div class="row">
            <div class="row col-12">
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Ofis İsmi</div>
                <q-input
                  hide-bottom-space
                  outlined
                  dense
                  v-model="formFields.OfficeName"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                />
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8"> Şehir</div>
                <q-select
                   v-model="formFields.cities_id"
                   :options="cities"
                   :option-label="(items) => items.CityName"
                   :option-value="(items) => items.id"
                   @update:model-value="val => districtsFind(val)"
                   outlined
                   dense
                   hide-bottom-space
                />
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8"> Bölge</div>
                <q-select
                  v-model="formFields.districts_id"
                  :options="districts"
                  :option-label="(items) => items.DistrictName"
                  :option-value="(items) => items.id"
                  @update:model-value="val => onDistrictSelected(val)"
                  outlined
                  dense
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row col-12 q-mt-sm">
              <div class="col-3 q-pa-xs">
                <div class="text-subtitle2 text-grey-8"> Açık Adresi</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.Address"
                  type="textarea"
                  placeholder="Açık adress "
                  hide-bottom-space
                  autogrow
                />
              </div>
              <div class="col-3 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">  Telefon </div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.OfficePhone"
                  prefix="+90"
                  mask="### ### ## ##"
                  placeholder="5** *** ** **"
                  hide-bottom-space
                  lazy-rules
                  :rules="[val => (val !== null && val !== '') || 'Zorunlu alan']"
                />
              </div>
              <div class="col-3 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">  E-posta </div>
                <q-input
                  outlined
                  dense
                  lazy-rules
                  v-model="formFields.OfficeEmail"
                  placeholder="example@gmail.com"
                  hide-bottom-space
                  :rules="[val => (val && val.length > 0) || 'Lütfen e-posta giriniz']"
                />
              </div>
              <div class="col-3 q-pa-xs text-center" >
                <div class="text-subtitle2 text-grey-8"> Ofis Statüsü </div>

                <q-toggle v-model="formFields.Status"  color="green"/>

              </div>

            </div>

          </div>
          <div class="row">
            <div class="text-subtitle2 q-pa-xs text-grey-8 col-12">Ofis Çalışma Saatleri</div>

            <div class="col-4 q-pa-xs " v-for="(e,i) in formFields.OfficeWorkingPeriods" :key="i">
              <div class="row q-mt-xs" >
                <div class="col-3 q-mt-sm" >
                  <q-checkbox v-model="e.status"/>
                  <span>{{e.label}}</span>
                </div>
                <div class="col-9" v-if="e.status">
                  <div class="flex justify-between">
                    <span> {{ e.ranges.min}}:00</span>
                    <span> {{ e.ranges.max }}:00 </span>
                  </div>
                  <q-range
                    v-model="e.ranges"
                    :min="0"
                    :max="24"
                    label
                    drag-range
                  />
                </div>
              </div>

            </div>
          </div>
        </q-step>
        <q-step
          :name="2"
          title="Ofis konumunuzu belirleyiniz"
          icon="create_new_folder"
          :done="step > 2"
          style="min-height: 200px;"
        >
          <div class="row q-mt-xs q-pa-xs">
            <div class="col-6 q-pa-xs">
              <div class="text-subtitle2 text-grey-8"> Harita Konumu</div>
              <q-input
                outlined
                dense
                :model-value="center.lat.toFixed(4) + ' - ' + center.lng.toFixed(4)"
                hide-bottom-space
                readonly
                for="latLng"

              />
            </div>
            <div class="col-6 q-pa-xs">
              <div class="text-subtitle2 text-grey-8"> Konum Arayınız</div>
              <GMapAutocomplete
                placeholder="Konum Arayınız"
                @place_changed="setPlace"
                class="autoCompleteInput"
              >
              </GMapAutocomplete>
            </div>

          </div>
          <div class="row">

            <div class="col-12">
              <GMapMap
                :center="center"
                :zoom="9"
                map-type-id="terrain"
                style="width: 500px;height: 300px!important;"
                :disableDefaultUI="true"

              >
                <GMapCluster>
                  <GMapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="false"
                    :draggable="true"
                    @click="center=m.position"
                    @dragend="getMarkerPosition($event)"
                  />
                </GMapCluster>
              </GMapMap>

            </div>
          </div>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation class="text-right">
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="GERİ"  class="q-ml-sm q-mr-sm"/>
            <q-btn v-if="step === 2"  type="submit" icon="save"   color="blue-grey-8"  label="Kaydet"/>
            <q-btn v-else type="submit"  color="blue-grey-8" label="Devam et"/>
          </q-stepper-navigation>
        </template>

      </q-stepper>


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
        center: ref({lat: 35.1937, lng: 33.357}),
        markers: ref([{
              position: {
                lat: 35.1937, lng: 33.357
                 },
            }]),
        map: ref(null),
        districts: ref([]),
        formFields: ref({
        OfficeName: ref(''),
        cities_id: ref(),
        Status:ref(true),
        districts_id: ref(),
        OfficeWorkingPeriods :ref(OfficeWorkingPeriods.value),
        Positions: ref(),
        Contacts : ref([]),
        Address: ref(''),
        OfficePhone: ref(''),
        OfficeEmail: ref(''),
        temporarySelectedDistrict : ref({})
      }),
      step: ref(1),
      emailValid: ref(true),

    }
  },
  mounted() {
    this.$store.dispatch('Cities/get');
    this.$store.dispatch('DistrictModule/get')
  },
  computed:{
    cities(){
       return  this.$store.getters['Cities/cities']
     },
  },
  methods: {
    getMarkerPosition (event) {
      this.setMarker(event.latLng.lat(),event.latLng.lng())
    },
    districtsFind(city_id) {

      this.districts.splice(0,this.districts.length)

      this.formFields.districts_id = '';

      this.districts = this.$store.getters['DistrictModule/getRecordsById'](city_id.id);

    },
    setPlace(e) {
      this.setMarker(e.geometry.location.lat(), e.geometry.location.lng())
    },
    setMarker(lat,lng) {
      this.center = {lat:lat, lng: lng}
      this.markers = [
        {
          position: {
            lat: lat, lng: lng
          },
        }
      ]
    },
    onDistrictSelected(val) {
      const position = JSON.parse(val.Positions)
      this.setMarker(position.lat,position.lng)
      this.temporarySelectedDistrict = val
    },
    onSubmitNewForm() {

      if (this.step === 2)
      {
        let formData = new FormData();
        formData.append('OfficeAddress',this.formFields.Address)
        formData.append('OfficeContacts',JSON.stringify(this.formFields.Contacts))
        formData.append('OfficePhone','+90 '+this.formFields.OfficePhone)
        formData.append('OfficeEmail',this.formFields.OfficeEmail)
        formData.append('OfficeName',this.formFields.OfficeName)
        formData.append('cities_id',this.formFields.cities_id.id)
        formData.append('districts_id',this.formFields.districts_id.id)
        formData.append('Positions',JSON.stringify(this.center))
        formData.append('Status',this.formFields.Status)
        formData.append('OfficeWorkingPeriods',JSON.stringify(this.formFields.OfficeWorkingPeriods))
        this.$store.dispatch('OfficeModule/create',formData).then(res => {
          if (res === true)
          {
            this.onReset()
            this.$emit('closeOfficeDialog')
          }

        })
      } else {
        this.step += 1
         setTimeout(() => {
          // document.getElementsByClassName('pac-target-input')[0].value = this.temporarySelectedDistrict.DistrictName
        },1000)
      }




    },
    onReset() {
       this.formFields.OfficeWorkingPeriods = [];
       this.formFields.districts_id = '';
       this.formFields.cities_id= '';
       this.formFields.OfficePhone= '';
       this.formFields.OfficeName = '';
       this.formFields.OfficeEmail = '';
       this.formFields.Address = '';
       this.formFields.Contacts = '';
       this.formFields.Positions='';
    },

  }
}
</script>

<style scoped>
.vue-map-container {
  height: 350px !important;
}

.pac-container.pac-logo {
  display: block !important;
  z-index: 100000 !important;
}

.autoCompleteInput {
  padding: 8px;
  border: 1px solid #b1b1b1;
  border-radius: 4px;
  width: 100%;
}



.mT-4 {
  margin-top: -4px;
}


</style>
