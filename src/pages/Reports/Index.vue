<template>
  <div class="row ">
    <div class="col-12">
      <q-card class="no-border-radius no-shadow" style="padding: 23px 24px 0px 21px !important;">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="reservations" label="Rezervasyonlar" ></q-tab>
          <q-tab name="InvoiceSales" label="Dış Fatura Satışları" ></q-tab>
          <q-tab name="ReservationInvoices" label="Rezervasyon Faturaları" ></q-tab>
<!--          <q-tab name="damages" label="Hasar & Makinist"  ></q-tab>-->
<!--          <q-tab name="customers" label="Müşteriler" disable ></q-tab>-->

<!--          <q-tab name="others" label="Digerleri" disable ></q-tab>-->
        </q-tabs>
        <q-separator />
      </q-card>

      <q-tab-panels v-model="tab" animated class="transparent">
        <q-tab-panel name="reservations" class="q-pa-none">
          <base-reports />
        </q-tab-panel>
        <q-tab-panel name="InvoiceSales" class="q-pa-none">
          <InvoiceSales />
        </q-tab-panel>
        <q-tab-panel name="ReservationInvoices" class="q-pa-none">
          <ReservationInvoices />
        </q-tab-panel>
<!--        <q-tab-panel name="cars" class="q-pa-none">-->
<!--          <car-reports />-->
<!--        </q-tab-panel>-->
<!--        <q-tab-panel name="damages" class="q-pa-none">-->
<!--          <DamagesReport />-->
<!--        </q-tab-panel>-->
      </q-tab-panels>




    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import BaseReports from "pages/Reports/BaseReports.vue";
import InvoiceSales from "pages/Reports/InvoiceSales/Index";
import ReservationInvoices from "src/pages/Reports/ReservationInvoices/Invoices";
export default {
  name: "Index",
  setup(){
    return {
      tab: ref('reservations'),
    }
  },
  components: {
    BaseReports,
    InvoiceSales,
    ReservationInvoices,

  },
  mounted() {
    this.$store.dispatch('CustomerGroupsModule/get')
    this.$store.dispatch('CustomersModule/get')
    this.$store.dispatch('CarBrandsModule/getCarBrands')
    this.$store.dispatch('CarModelsModule/getCarModels')
    this.$store.dispatch('CarTypesModule/get')
    this.$store.dispatch('CarFuelTypesModule/get')
    this.$store.dispatch('OfficeModule/get')
  }
}
</script>

<style scoped>

</style>
