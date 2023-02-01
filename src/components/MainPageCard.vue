<template>
  <q-card class="col col-md-3 col-sm-3 col-xs-12  mainCard q-ma-sm bgWhite q-pa-sm-md" :class="[detail.isDisabled ? 'disabled' : '']"  >
    <q-img :src="detail.iconPath"  />
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis text-blue-grey-8 text-weight-600 text-uppercase">
         <div class="text-subtitle1 text-bold">
           {{detail.title}}
         </div>
          <router-link :to="{name: detail.route} "  v-show="!detail.isDisabled">
            <q-btn
              fab
              color="primary"
              icon="add"
              class="absolute"
              size="sm"
              style="top: 0; right: 7px;"
            />
          </router-link>

        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
export default {
  name: "MainPageCard",
  props : ['detail']
}
</script>

<style scoped>
@media screen and (min-width: 768px){
  .mainCard {
    width: 15% !important;
  }
}

</style>
