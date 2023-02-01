<template>
  <div class="q-pa-md">
    <q-form
      class="q-gutter-md"
      @submit="onUpdate"
      @reset="onReset"
    >
      <div class="row ">
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  İsim </div>
          <q-input
            hide-bottom-space
            outlined
            dense
            v-model="formFields.name"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            placeholder="Jhon"
            readonly
          />
        </div>
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8"> Soyism</div>
          <q-input
            hide-bottom-space
            outlined
            dense
            v-model="formFields.surname"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            placeholder="Snow"
            readonly
          />
        </div>
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  E-posta </div>
          <q-input
            outlined
            dense
            v-model="formFields.email"
            placeholder="example@gmail.com"
            hide-bottom-space
            readonly
          />
        </div>

        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">  Eski Şifre  </div>
          <q-input
            outlined
            dense
            v-model="formFields.oldPassword"
            hide-bottom-space
          />
        </div>
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8"> Yeni Şifre  </div>
          <q-input
            outlined
            dense
            v-model="formFields.password"
            hide-bottom-space
          />
        </div>
        <div class="col-4 q-pa-xs">
          <div class="text-subtitle2 text-grey-8">Tekrar girin  </div>
          <q-input
            outlined
            dense
            v-model="formFields.password_confirmation"
            hide-bottom-space
          />
        </div>

      </div>
      <div class="col  text-right">
        <q-btn class="q-mt-lg" label=" Güncelle" type="submit" color="secondary"  icon-right="refresh"  @click="onUpdate" />
      </div>
    </q-form>
  </div>
</template>

<script>

import {ref} from "vue";


export default {
  name: "EditUserForm",
  props : ['userId'],
  setup() {

    return {

      formFields : ref({}),

    }
  },
  mounted() {
    this.buildFormFields(this.userId)
  },

  methods: {
    buildFormFields(user_id) {
      this.formFields = JSON.parse(JSON.stringify(this.$store.getters['UsersModule/getRecord'](user_id)))
    },
    onUpdate() {
      let formData = new FormData()
       for(const [k,v] of Object.entries(this.formFields))
       {
         formData.append(k,v)
       }
      formData.append('_method','PUT');

      this.$store.dispatch('UsersModule/update',formData).then(res =>{
        if(res === true){
          this.$emit('closeUserDialog')
        }

      })

    },

    onReset(){
      this.formFields = '';
    }
  },


}
</script>

<style scoped>

</style>
