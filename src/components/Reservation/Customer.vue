<template>
<div class="row   ">
  <div class="col-12 flex flex-center text-left q-pl-sm">
    <div class="text-subtitle1 text-bold text-grey-8" >{{customer}}</div>
  </div>
  <div class="col-12 flex flex-center text-subtitle1 text-left q-pl-sm">
    <q-chip square color="blue-grey-6" text-color="white" size="sm"   >
      {{type}}
    </q-chip>
  </div>
  <div class="col-12 flex flex-center text-left q-pl-sm">
    <div class="text-subtitle1 text-bold text-blue-8">
      <div square  text-color="blue-grey-8" size="md"   >
        {{group_name === null ? '' : group_name}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Customer",
  props : ['customer','type','group_name']
}
</script>

<style scoped>

</style>
