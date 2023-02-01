<template>
<div class="row   ">
  <div class="col-4">
    <q-img width="300" :src=" this.$store.getters['MainModule/getServerUrl']+'/uploads/cars/'+image" />
  </div>
  <div class="col-8  text-left q-pl-sm">
<div class="row ">
  <div class="col-12 flex flex-center">
    <div class="text-subtitle1 text-bold text-blue-8" style="white-space: break-spaces!important;">  {{brand}} {{model}}</div>
  </div>
  <div class="col-12 flex flex-center q-mt-sm">
    <div class="text-subtitle1 text-bold text-blue-8" style="margin-top: -10px">
      <q-chip square color="blue-grey-8" text-color="white" class="q-mt-xs" size="12px"  outline>
        <span class="text-uppercase"> PLAKA : {{licence_plate}}</span>
      </q-chip>
    </div>
  </div>
</div>

  </div>
</div>
</template>

<script>
export default {
  name: "Vihicle",
  props : ['brand','model','licence_plate','image' ]
}
</script>

<style scoped>

</style>
