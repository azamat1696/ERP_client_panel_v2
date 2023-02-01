<template>
  <div>
    <q-layout view="hHh Lpr lff"  style="background-color: rgb(240, 237, 237)" >
      <layout-header />
      <q-page-container>
        <div class="row q-pa-sm q-ma-md">
          <div class="col-md-3 ">
            <q-list bordered class=" q-card rounded-borders text-dark bg-white q-ml-xl q-ma-md" style="max-width: 300px">
              <q-item
                clickable
                v-ripple
                v-for="(menu,index) in menuList"
                :key="index"
                class="  text-left q-ma-xs "
                style="border-bottom: 1px solid #ddd"
                active-class="activeMenu"
                :to="{ name : menu.name}"
              >
                <q-item-section class="text-uppercase">{{menu.label}}</q-item-section>
                <q-item-section avatar>
                  <q-icon  name="arrow_forward" />
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
    </q-layout>
  </div>
</template>

<script>
 import LayoutHeader from "components/LayoutHeader";
 import  getMenu from './ContentLayoutMenus'


const menuList = [
  {
    id:1,
    label: 'Makinist Grupları',
    separator: true,
    name:'machinistTypes'
  },
  {
    id:2,
    label: 'Makinist Firması Tanımları',
    separator: true,
    name:'machinistCompanies'
  },
  {
    id:3,
    label: 'Hasar Kayıtları',
    separator: true,
    name:'machinistCarDamage'
  },
]
export default {
  name: "MachinistLayout",
  setup () {
    return {
      menuList,

      }
  },
  created() {

  },
  components : {
    LayoutHeader
  },
  methods : {


  }

}
</script>

<style scoped lang="scss">
.activeMenu {
  background-color: rgba(148, 178, 193, 0.39);
  border-right: 3px solid #455a64 ;
  /*color: white;*/
}


</style>
