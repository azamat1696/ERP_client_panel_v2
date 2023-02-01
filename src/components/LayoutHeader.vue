<template>
      <q-header elevated class="bg-primary">
       <q-toolbar  >
          <router-link to="/">
            <q-img src="../assets/sevener-logo.png" style="filter: brightness(0) invert(1); width: 60px"   />
          </router-link>
          <q-toolbar-title  style="font-size: 17px" class="text-uppercase">Sevener Rent A Car </q-toolbar-title>

         <q-btn-dropdown  split flat   dense :label="userDetail.name+ ' ' + userDetail.surname">
           <q-list>
             <q-item clickable v-close-popup @click="this.$store.dispatch('Auth/logOut')">
               <q-item-section>
                 <q-item-label>Çıkış Yap</q-item-label>
               </q-item-section>
             </q-item>
           </q-list>
         </q-btn-dropdown>
         <q-btn
           flat
           dense
           icon="o_notifications"
           @click="notificationsDialog = true"
         >
           <q-badge floating  class="bg-warning text-dark" v-show="notificationCount">{{notificationCount}}</q-badge>
         </q-btn>
          <q-btn
            flat
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          />
        </q-toolbar>
        <q-dialog v-model="notificationsDialog"  position="right">

          <q-card   style="min-width: 560px">
            <q-toolbar class="bg-blue-grey-8 text-white shadow-1" >
              <q-toolbar-title style="font-size: 15px">Bildirimler Listesi</q-toolbar-title>
            </q-toolbar>
            <q-list separator class="q-pa-xs">
              <q-item   clickable v-for="(e,i) in userNotifications" :key="i">
                <q-item-section>
                  <q-item-label>   {{e.data.title}}</q-item-label>
                  <q-item-label caption lines="2">
                    {{e.data.message}}
                  </q-item-label>
                  <q-item-label caption lines="3" > <b>{{  date.formatDate(e.created_at,"DD.MM.YYYY HH:mm")}}</b> </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat icon="close" color="blue-grey-8" @click="onCloseNotification(e.id)" />
                </q-item-section>
              </q-item>

            </q-list>
            <!--            <q-scroll-area style="max-height:  500px; width: 560px" >-->


            <!--            </q-scroll-area>-->

            <!--              <div class="text-subtitle1" v-else>-->
            <!--                Herhangi bir bildirim yoktur.-->
            <!--              </div>-->
          </q-card>
        </q-dialog>
      </q-header>
</template>

<script>
import {ref} from "vue";
import {date} from "quasar"
export default {
  name: "LayoutHeader",
  setup(){
    return {
      notificationsDialog : ref(false),
      date
    }
  },
  computed : {
    userDetail() {
      return this.$store.getters['Auth/userDetailGetter']
    },
    userNotifications () {
      return this.$store.getters['Auth/getterUserNotifications']
    },
    notificationCount() {
      return this.$store.getters['Auth/getterUserNotificationCount']
    }
  },
  mounted() {
    this.$store.dispatch('Auth/notifications')
  },
  methods : {
    onCloseNotification(id) {
      let formData = new FormData();
      formData.append('id',id)
      this.$store.dispatch('Auth/markNotification',formData)

    }
  }
}
</script>

<style scoped>

</style>
