<template>
   <div class="q-pa-md">
     <q-form
       @submit="onSubmit"
       @reset="onReset"
       class="q-gutter-md"
     >
       <div class="row">

         <div class="col-6 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  İsim  </div>
           <q-input
             hide-bottom-space
             outlined
             dense
             v-model="formFields.userName"
             :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
             placeholder="Jhon"
           />
         </div>
         <div class="col-6 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  Soyismi  </div>
           <q-input
             hide-bottom-space
             outlined
             dense
             v-model="formFields.userSurname"
             :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
             placeholder="Snow"
           />
         </div>

         <div class="col-6 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">  E-posta </div>
           <q-input
             outlined
             dense
             v-model="formFields.userEmail"
             placeholder="example@gmail.com"
             hide-bottom-space
           />
         </div>

         <div class="col-6 q-pa-xs">
           <div class="text-subtitle2 text-grey-8">   Şifre  </div>
           <q-input
             outlined
             dense
             v-model="formFields.userPassword"
             hide-bottom-space
           />
         </div>

      </div>


       <div class="text-right"  >
         <q-btn label="Temizle" type="reset" color="red-10"   icon="restart_alt" class="q-mr-sm" />
         <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
       </div>
     </q-form>

   </div>
</template>

<script>


import  {ref} from 'vue'

export default {
  name: "NewUserForm",
  setup() {

    return {

      formFields : ref({
        userName: ref(''),
        userSurname: ref(''),
        userEmail: ref(''),
        userPassword: ref('')
      }),


    }
  },
  mounted() {
    this.onReset()
  },
  methods : {
    onSubmit() {
      let formData = new FormData()
      formData.append('name',this.formFields.userName)
      formData.append('surname',this.formFields.userSurname)
      formData.append('email',this.formFields.userEmail)
      formData.append('password',this.formFields.userPassword)
      this.$store.dispatch('UsersModule/create',formData).then( res => {

        if (res === true)
        {
          this.$emit('closeUserDialog')
          this.onReset();
        }
      })
    },

    onReset() {
         this.formFields.userName = '';
         this.formFields.userSurname = '';
         this.formFields.userPassword = '';
         this.formFields.userEmail = ''
    }
  }

}
</script>

<style scoped>

</style>
