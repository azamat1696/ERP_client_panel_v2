<template>
<div class="row   ">

  <div class="col-12 flex flex-sm text-left q-pl-sm">
   <div class="row">
     <div class="text-subtitle2  col-12   text-grey-6">Toplam</div>
     <div class="text-subtitle1  col-12 text-bold text-grey-8" style="<margin-top: -5px">{{total}} {{currency_sembol}}</div>
     <div class="text-subtitle1  col-12  text-grey-6" style="margin-top: -7px">
       <q-icon name="account_balance" /> {{this.$store.getters['MainModule/findReservationPaymentMethod'](payment_type).title}}
     </div>
   </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Customer",
  props : ['total','payment_type','currency_sembol'],
  methods : {
    paymentTypes(type) {

    }
  }
}
</script>

<style scoped>

</style>
