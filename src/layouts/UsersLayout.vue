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



const menuList = [
  {
    id:1,
    icon: 'update',
    label: 'Müşteriler',
    separator: true,
    name:'customers'
  },
  {
    id:2,
    icon: 'update',
    label: 'Müşteri Grupları',
    separator: true,
    name:'groups'
  },
  {
    id:2,
    icon: 'update',
    label: 'Kullanıcılar',
    separator: true,
    name:'users'
  },
]
export default {
  name: "ContentLayout",
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
  mounted() {
    this.$store.dispatch('CustomersModule/get')
    this.$store.dispatch('Cities/get')
    this.$store.dispatch('DistrictModule/get')
    this.$store.dispatch('CustomerGroupsModule/get')
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
