<template>
<div style="max-width: 150px!important;">
   <div class="row ">
     <div class="col-4 bg-grey-3" style="border-radius: 5%" v-html="locationDateFormat(date)"></div>
     <div class="col-8  text-center">
       <div class="row">
         <div class="col-12">
           <div class="text-subtitle2  text-grey-9">
             <q-icon name="o_location_on" size="25px" color="grey-9" />
             {{officeName}}</div>
         </div>
       </div>
     </div>
   </div>
</div>
</template>

<script>
export default {
  name: "ShowLocation",
  props : ['date','officeName'],

  methods: {
    locationDateFormat(date) {
      const monthName = ['Ocak', 'Şubat', 'Mart', 'Nisan','May','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
      let newDate = new Date(date)
      return '' +
        '<div class="text-subtitle2 text-bold text-grey-9" style="font-size: 12px">\n' +
          monthName[newDate.getMonth()]+ '\n' +
        '</div>\n' +
        '<div class="text-subtitle2 text-bold text-grey-9" style="line-height: 1.175rem">\n' +
        +newDate.getDate()+'\n' +
        '</div>\n' +
        '<div class="text-subtitle2 text-bold text-grey-9 bg-grey-4" style="font-size: 12px">\n' +
        +newDate.getFullYear()+'\n' +
        '</div>'
    }
  }
}
</script>

<style scoped>

</style>
