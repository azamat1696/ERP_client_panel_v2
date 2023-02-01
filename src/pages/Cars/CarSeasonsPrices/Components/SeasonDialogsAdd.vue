<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>

     <q-card class="q-dialog-plugin"  style="width: 1000px !important;">
       <q-form @submit="onOKClick">
       <q-bar class="q-pa-md bg-blue-grey-8  " style="height: 50px">
         <div class="text-h4 text-white"  >Yeni Sezon</div>
         <q-space />
         <q-btn class="text-white" dense flat icon="close" v-close-popup>
           <q-tooltip >Kapat</q-tooltip>
         </q-btn>
       </q-bar>
       <q-card-section>
         <div class="row ">

           <div class="col-12">

               <q-banner dense class="bg-grey-1 q-pa-sm  ">
                 <template v-slot:avatar>
                   <q-icon name="priority_high" color="primary" />
                 </template>
                 <div class="text-subtitle2 text-bold">Bilgilendirme</div>
                 <div class="text-weight-regular">
                    Araç fiyatlar  dönemlik fiyat ekleme için en az 1 en fazlada 4 <br>
                     olmak üzere ekleyebilirsiniz eklmediğiniz dönemler normal fiyat <br>
                     üzerinden devam edecektir.
                 </div>
               </q-banner>

           </div>


         </div>
         <div><q-separator /> </div>
         <div class="row justify-end q-pt-md">
       <q-btn
         icon="add"
         label="Sezon ekle"
         outline
         text-color="red"
         @click="onSelected"
       >

       </q-btn>
         </div>
         <transition-group
         name="fade"
         >
           <div class="row" v-for="(item,index) in formFields.seasons" :key="index">
             <div class="col-12 row">
               <div class="col-3 q-pt-sm q-pl-sm q-pr-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Sezon {{index+1}}  </div>
                 <q-input
                   dense
                   outlined
                   v-model="item.SeasonName"
                   :key="index"
                   placeholder="Sezon ismi"
                   lazy-rules
                   :rules="[val => val && val.toString() !== 0 || 'Zorunlu alan' ]"
                 />
               </div>
               <div class="col-3 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Sezon Başlama tarihi  </div>
                 <q-input
                   dense
                   outlined
                   v-model="item.StartDate"
                   :lazy-rules="true"
                   :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                 >
                   <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                       <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                         <q-date
                           v-model="item.StartDate"
                           mask="YYYY-MM-DD HH:mm"
                           minimal
                           :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                         >
                           <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Kapat" color="primary" flat />
                           </div>
                         </q-date>
                       </q-popup-proxy>
                     </q-icon>
                   </template>

                 </q-input>

               </div>
               <div class="col-3 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8">Sezon Bitiş tarihi  </div>
                 <q-input
                   dense
                   outlined
                   v-model="item.EndDate"
                   :lazy-rules="true"
                   :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                   hide-bottom-space
                 >
                   <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                       <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                         <q-date
                           v-model="item.EndDate"
                           mask="YYYY-MM-DD HH:mm"
                           minimal
                           :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                         >
                           <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Kapat" color="primary" flat />
                           </div>
                         </q-date>
                       </q-popup-proxy>
                     </q-icon>
                   </template>

                 </q-input>
               </div>
               <div class="col-2 q-pa-sm">
                 <div class="text-weight-regular q-mb-xs text-grey-8"> İndirim Yüzdesi</div>
                 <q-input
                   ref="ageRef"
                   dense
                   outlined
                   type="number"
                   v-model="item.Percentage"
                   lazy-rules
                   :rules="percentRules"
                 >
                   <template v-slot:append>
                     <q-icon name="percent" />
                   </template>
                 </q-input>
               </div>
               <div class="col-1 q-pa-sm" style="margin: auto">

                 <q-btn
                   flat
                   outline
                   size="md"
                   color="primary"
                   icon="delete"
                   @click="deleteRow(index)"
                 />
               </div>
             </div>
             <q-separator />
           </div>
         </transition-group>


       </q-card-section>
       <q-card-actions align="right">
         <q-btn color="primary" label="İptal et" @click="onCancelClick" />
         <q-btn color="blue-grey-8" label="Kaydet" icon="save" type="submit"  />
       </q-card-actions>
   </q-form>
     </q-card>

  </q-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
     test: {
       required: true,
       type: String
     } ,
  },
  emits: [
    // REQUIRED
    'ok', 'hide','dismiss'
  ],
  name: "SeasonDialog",
  setup(){
    const ageRef = ref(null);
    const formFields =  ref({
      seasons : [],
      PerYearSeason:'',
      seasonCount: 0
    })

    return {
      formFields,
      ageRef,
      percentRules: [
        val => (val !== null && val !== '') || 'Lütfen yüzde değeri giriniz',
        val => (val >= -50 && val <= 50) || 'Yüzde değeri 50% ile -50% arası olmalıdır'
      ],
      seasonsInNumber: ref(null),
      seasonsInNumberOprions: [1,2,3,4]
    }
  },
  methods:{
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
     if (this.formFields.seasons.length > 0)  this.$emit('ok',{seasons: this.formFields.seasons})
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()
    },

    onSelected(){
        if(this.formFields.seasons.length > 3) return false
          this.formFields.seasons.push({
            SeasonName:'',
            Percentage: null,
            StartDate:'',
            EndDate: '',
          })
    },
    deleteRow(index){
      this.formFields.seasons = this.formFields.seasons.filter((el,i) => i !== index)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active {  transition: opacity 0.4s ease;}.fade-enter-from,.fade-leave-to {  opacity: 0;}
</style>
