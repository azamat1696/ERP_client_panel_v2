<template>
  <q-form @submit="onSubmit()" @reset="onReset">
    <div class="row">
      <div class="col-12 q-pa-xs">
        <div class="text-subtitle2 text-grey-8">  Grup Adı  </div>
        <q-input
          hide-bottom-space
          outlined
          dense
          v-model="formFields.Name"
          :lazy-rules="true"
          :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
          placeholder="Örn Yakındoğu Teknoloji"
        />
      </div>
      <div class="col-12 q-pa-xs">
        <div class="text-subtitle2 text-grey-8">  Grup Açıklaması</div>
        <q-input
          type="textarea"
          hide-bottom-space
          outlined
          dense
          v-model="formFields.Description"
          placeholder="Açıklaması"
        />
      </div>
      <div class="col-12 q-pa-xs">
        <div class="text-subtitle2 text-grey-8">  Grup Statusu</div>
        <q-toggle
          v-model="formFields.Status"
          color="green"
        />
      </div>
      <div class="col-12 q-pxs text-right" v-if="formFields.id">
        <q-btn label="Güncelle" type="submit" color="blue-grey-8"  icon-right="save"   />
      </div>
      <div class="col-12 q-pxs text-right" v-else>
        <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
      </div>

    </div>
  </q-form>
</template>

<script>
import {ref} from "vue";

export default {
  name: "GroupCreate",
  setup(){
    return {
      formFields : ref({
        Name : '',
        Description: '',
        Status : true
      })
    }
  },
  methods : {
    onSubmit() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.formFields))
      {
        formData.append(k,v)
      }
      this.$store.dispatch('CustomerGroupsModule/create',formData).then(res =>  {
        if (res === true)
        {
          this.$emit('closeFromDialogCreate')
          this.onReset()
        }
      })
    },
    onReset() {
      this.formFields.Name  = ''
      this.formFields.Description  = ''
      this.formFields.Status  = true
    },

  },

  mounted() {
  },

}
</script>

<style scoped>

</style>
