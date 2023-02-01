<template>
  <div>
    <q-layout view="hHh Lpr lff"  style="background-color: rgb(240, 237, 237)" >
      <layout-header />
      <q-page-container>
        <div class="row q-pa-sm q-ma-md">
          <div class="col-md-3   ">
            <q-list bordered class=" q-card  text-dark bg-white q-ml-xl q-ma-md" separator>
              <q-item
                clickable
                v-ripple
                v-for="(menu,index) in menuList"
                :key="index"
                 class="  text-left "
                 active-class="activeMenu"
                :to="{ name : menu.name}"
              >
                <q-item-section class="text-uppercase">{{menu.label}}</q-item-section>
                <q-item-section avatar>
                  <q-icon  name="arrow_forward" size="xs" />
                </q-item-section>
              </q-item>

            </q-list>
          </div>
          <div class="col-md-9">
            <q-page >

              <router-view   />

            </q-page>
          </div>
        </div>
      </q-page-container>
      <q-footer class="bg-grey-2 main-footer"  >

      </q-footer>
    </q-layout>
  </div>
</template>

<script>
 import LayoutHeader from "components/LayoutHeader";
 import  getMenu from './ContentLayoutMenus'


const menuList = [
  {
    id:1,
    icon: 'update',
    label: 'Araç Markaları',
    separator: true,
    name:'carBrands'
  },
  {
    id:2,
    icon: 'update',
    label: 'Araç Modelleri',
    separator: true,
    name:'carModel'
  },
  {
    id:3,
    icon: 'update',
    label: 'Araç Sınıfları',
    separator: true,
    name:'carClasses'
  },
  {
    id:4,
    icon: 'update',
    label: 'Araç Tipleri',
    separator: true,
    name:'carType'
  },
  {
    id:5,
    icon: 'update',
    label: 'Araç Yakıt Tipleri',
    separator: true,
    name:'carFuelType'
  },
  {
    id:6,
    icon: 'update',
    label: 'Araç Vites Tipleri',
    separator: true,
    name:'carGearType'
  },
  {
    id:8,
    icon: 'update',
    label: 'Araç Fiyatı',
    separator: true,
    name:'carPrices'
  },
  {
    id:8,
    icon: 'update',
    label: 'Extra Hizmetler',
    separator: true,
    name:'carExtras'
  },
  {
    id:7,
    icon: 'update',
    label: 'Araç Tanımları',
    separator: true,
    name:'carList'
  },
  {
    id:9,
    icon: 'update',
    label: 'Araç Muayeneleri',
    separator: true,
    name:'carInspections'
  },
  {
    id:10,
    icon: 'update',
    label: 'Seyrüsefer',
    separator: true,
    name:'CarSeyrusefer'
  },
  {
    id:11,
    icon: 'update',
    label: 'Araç Sigortaları',
    separator: true,
    name:'CarInsurance'
  },
  {
    id:12,
    icon: 'update',
    label: 'Araç Sezon Fiyatları',
    separator: true,
    name:'carSeasonPrices'
  },

]
export default {
  name: "ContentLayout",
  setup () {
    return {
      menuList,

      }
  },
  mounted() {

    this.$store.dispatch('CarModelsModule/getCarModels')
    this.$store.dispatch("CarTransmissionsModule/get");
    this.$store.dispatch('CarClassesModule/get')
    this.$store.dispatch('CarsModule/get')
    this.$store.dispatch('CarInspection/getCarInspections')
    this.$store.dispatch('SeyruSeferModule/getCarSeyrusefer');
    this.$store.dispatch('CarInsuranceModule/getCarInsurance')
    this.$store.dispatch('CarsModule/getCarsDetails')
  },
  components : {
    LayoutHeader
  },
  methods : {


  }

}
</script>
<style>
.activeMenu {
  background-color: rgba(148, 178, 193, 0.39);
  border-right: 3px solid #455a64 ;
  /*color: white;*/
}
</style>
