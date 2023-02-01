<template>
<q-page class="flex  flex-center bgGray" style="background: #e0dede"  >
  <q-card class="my-card authLoginCard  ">
    <q-card-section>
      <div class="text-h5 text-center q-mt-sm text-weight-bolder">
        Lütfen Giriş Yapınız
      </div>
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="loginFormOnSubmit"
         class="q-gutter-md"
      >
         <q-input
          filled
          type="email"
          v-model="authLogin.email"
          label="E-posta"
          required
         />
         <q-input v-model="authLogin.password" filled :type="isPwd ? 'password' : 'text'"  label="Şifreniz" required>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="text-right">
          <q-btn icon="login" label="Giriş Yap" type="submit"  color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
 export default {
  name: "Login",
  data() {
    const $q = useQuasar()
    let timer
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    return {
      isPwd : true,
      authLogin : {
        email : '',
        password : '',
        remember: ref(['line'])
      },
      showLoading () {
        $q.loading.show({
          message: 'İşlem Gerçekleşiyor Lütfen Bekleyiniz...'
        })

      },
      closeLoading() {
        $q.loading.hide()
        timer = void 0
      }
    }
  },
  methods : {
   loginFormOnSubmit() {
     this.showLoading()
     this.$store.dispatch('Auth/login',this.authLogin).then(res => {
       this.closeLoading()
     })

   }
  }
}
</script>

<style scoped>
.authLoginCard {
  min-width: 500px;
  height: auto;
}
</style>
