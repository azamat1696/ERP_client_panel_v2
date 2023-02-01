<template class="bg-grey-2">
  <q-page >
     <div class="row q-pl-md  q-pr-md justify-center">
      <main-page-card v-for="(card,index) in MainPageCardsJs" :key="index"  :detail="card" />

     </div>
     <div class="row q-pt-none q-pl-md  q-pr-md justify-center mainCard">
      <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
        <q-card class="text-white " style="background: #ffffff; ">
          <q-card-section  class="q-pb-none">
            <div class="text-h6 text-blue-grey-8 text-weight-600"  > Kiradaki Araçlar</div>
          </q-card-section>
          <q-card-section class="text-blue-grey-8 text-weight-600 flex justify-between q-pb-none">
            <div class="text-h3 text-blue-grey-8 text-weight-800" >{{currentReservationsCount}}</div>
            <q-img
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/400/external-cars-automotive-ecommerce-flaticons-lineal-color-flat-icons-10.png"
              class="text-blue-grey-8 text-weight-800"
              style="width: 70px; margin-top: -10px; margin-right: 10px"
            />
          </q-card-section>
          <q-card-actions class="text-blue-grey-8 text-weight-600 around">
            <q-btn
              class="full-width  "
              color="blue-grey-8"
              icon-right="east"
              @click="openReservedCarListDialog = true">Araçları   İncele
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
        <q-card class=" text-white  " style="background: #ffffff; ">
          <q-card-section  class="q-pb-none">
            <div class="text-h6 text-blue-grey-8 text-weight-600"> Bakımdaki Araçlar</div>
          </q-card-section>

          <q-card-section class="text-blue-grey-8 text-weight-600 flex justify-between q-pb-none">
            <div class="text-h3 text-blue-grey-8 text-weight-800" >{{activeDamageCount}}</div>
            <q-img
              src="https://img.icons8.com/color/344/car-service.png"
              class="text-blue-grey-8 text-weight-800"
              style="width: 70px; margin-top: -10px; margin-right: 10px"
            />
          </q-card-section>
          <q-card-actions class="text-blue-grey-8 text-weight-600 around">
            <q-btn  class="full-width  " color="blue-grey-8" icon-right="east" @click="openDamagedCarListDialog = true">Araçları   İncele</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
        <q-card class=" text-white  "  style="background: #ffffff; ">
          <q-card-section  class="q-pb-none">
            <div class="text-h6 text-blue-grey-8 text-weight-600"  > İade Edilen Araçlar</div>
          </q-card-section>

          <q-card-section class="text-blue-grey-8 text-weight-600 flex justify-between q-pb-none">
            <div class="text-h3 text-blue-grey-8 text-weight-800" >{{returnReservationCount}}</div>
            <q-img
              src="https://img.icons8.com/color/344/return-purchase.png"
              class="text-blue-grey-8 text-weight-800"
              style="width: 70px; margin-top: -10px; margin-right: 10px"
            />
          </q-card-section>
          <q-card-actions class="text-blue-grey-8 text-weight-600 around">

            <q-btn  class="full-width  " color="blue-grey-8" icon-right="east" @click="openReturnCarsListDialog = true">Araçları   İncele</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
        <q-card class=" my-card  text-white  " style="background: #ffffff; ">
          <q-card-section  class="q-pb-none">
            <div class="text-h6 text-blue-grey-8 text-weight-600"  > İçerdeki Araçlar</div>
          </q-card-section>

          <q-card-section class="text-blue-grey-8 text-weight-600 flex justify-between q-pb-none">
            <div class="text-h3 text-blue-grey-8 text-weight-800" >{{availableCarsCount}}</div>
            <q-img
              src="https://img.icons8.com/color/344/car-badge.png"
              class="text-blue-grey-8 text-weight-800"
              style="width: 70px; margin-top: -10px; margin-right: 10px"
            />
          </q-card-section>
          <q-card-actions class="text-blue-grey-8 text-weight-600 around">

            <q-btn  class="full-width  " color="blue-grey-8" icon-right="east" @click="openAvailableCarListDialog = true">Araçları   İncele</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
        <q-card class=" my-card  text-white  " style="background: #ffffff; ">
          <q-card-section  class="q-pb-none">
            <div class="text-h6 text-blue-grey-8 text-weight-600"  > Toplam Araçlar</div>
          </q-card-section>

          <q-card-section class="text-blue-grey-8 text-weight-600 flex justify-between q-pb-none">
            <div class="text-h3 text-blue-grey-8 text-weight-800" >{{allCarsCountGetter}}</div>
            <q-img
              src="https://img.icons8.com/clouds/344/car.png"
              class="text-blue-grey-8 text-weight-800"
              style="width: 70px; margin-top: -10px; margin-right: 10px"
            />
          </q-card-section>
          <q-card-actions class="text-blue-grey-8 text-weight-600 around">

            <q-btn  class="full-width  " color="blue-grey-8" icon-right="east" :to="{name:'carList'}">Araçları   İncele</q-btn>
          </q-card-actions>
        </q-card>

      </div>
       <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">

       </div>
       <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
       </div>
       <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
       </div>

       <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
       </div>
       <div class="col-md-2 col-sm-4 col-xs-12 q-ma-md  ">
         <q-card class=" my-card  text-white  " style="background: #eafff1; ">
           <q-card-section  class="q-pb-none">
             <div class="text-h6 text-blue-grey-8 text-weight-600"  > Fatura Satışları</div>
           </q-card-section>
           <q-card-actions class="text-blue-grey-8 text-weight-600 around">
             <q-btn  class="full-width  " color="blue-grey-8" icon-right="east" :to="{name:'invoiceSales'}">Fatura Satışları</q-btn>
           </q-card-actions>
         </q-card>

       </div>
    </div>

<!--    </q-scroll-area>-->
    <q-dialog   v-model="openDamagedCarListDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1200px" class="" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Araba Hasar Listesi</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <damaged-cars-list />
      </q-card>
    </q-dialog>
    <q-dialog   v-model="openReservedCarListDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1200px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Son Eklenen Rezervasyonlar</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
         <reserved-cars-list />
      </q-card>
    </q-dialog>
    <q-dialog   v-model="openAvailableCarListDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Araçlar Listesi</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <available-cars-list />
      </q-card>
    </q-dialog>
    <q-dialog   v-model="openReturnCarsListDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1200px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Araçlar Listesi</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <return-cars-list />
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import MainPageCard from "components/MainPageCard";
import DamagedCarsList from "pages/Dasboard/DamagedCarsList/DamagedCarsList.vue";
import ReservedCarsList from "pages/Dasboard/ReservedCars/Index.vue";
import AvailableCarsList from "pages/Dasboard/AvailableCarsList/AvailableCarsList";
import ReturnCarsList from "./Dasboard/ReturnCarsList"
const MainPageCardsJs = [
  //createReservations
  {
    id :1,
    title : "Rezervasyon",
    route : 'listReservations',
    iconPath : require('assets/icons/reservations.png')
  },
  {
    id : 2,
    title : "Kullanıcılar",
    route : 'customers',
    iconPath : require('assets/icons/users.png')
  },
  {
    id : 3,
    title : "Genel Ayarlar",
    route : 'companySettings',
    iconPath : require('assets/icons/settings.svg')
  },

  {
    id : 5,
    title : "Araç İşlemleri",
    route : 'carBrands',
    iconPath : require('assets/icons/cars.png')
  },

  {
    id : 6,
    title : "Makinist İşlemleri",
    route : 'machinistTypes',
    iconPath: require('assets/icons/automatic-gearbox-warning.png') ,
  },
  {
    id : 4,
    title : "Raporlar",
    route : 'baseReports',
    iconPath : require('assets/icons/reports.png'),
    isDisabled: false
  },
  // {
  //   id : 6,
  //   title : "Bildirimler",
  //   route : 'carBrands',
  //   iconPath : require('assets/icons/notifications.png'),
  //   isDisabled: true
  // },

];
export default defineComponent({
  name: 'PageIndex',
  setup() {
    return {
      MainPageCardsJs,
      openDamagedCarListDialog: ref(false),
      openReservedCarListDialog: ref(false),
      openAvailableCarListDialog: ref(false),
      openReturnCarsListDialog: ref(false),
    }
  },
  components: {
    MainPageCard,
    ReservedCarsList,
    DamagedCarsList,
    AvailableCarsList,
    ReturnCarsList
  },
  mounted() {
    this.$store.dispatch('MachinistDamageRecordsModule/getActiveMachinistRecord')
    this.$store.dispatch('Reservations/getLastReservations')
    this.$store.dispatch('CarsModule/getCarsDetails')
  },
  computed: {

    activeDamageCount() {
      return this.$store.getters['MachinistDamageRecordsModule/activeDamageRecordCountGetter']
    },

    currentReservationsCount() {
      return this.$store.getters['Reservations/currentReservationCountGetter']
    },

    availableCarsCount() {
      return this.$store.getters['CarsModule/carsDetailsCountGetter']
    },

    allCarsCountGetter() {
      return this.$store.getters['CarsModule/allCarsCountGetter']
    },

    returnReservationCount() {
      return this.$store.getters['Reservations/currentReturnReservationCountGetter']
    },

  }
})
</script>

<style scoped>

</style>
