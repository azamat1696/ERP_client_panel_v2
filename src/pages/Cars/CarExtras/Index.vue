<template>
  <div class="q-pa-md">
    <q-table
      title="Extra Hizmetler"
      :rows="extraServices"
      :columns="baseSetting.extraServicesColumns"
      row-key="id"
      :filter="baseSetting.filterCarTypes"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterCarTypes"  placeholder="Extra Hizmet Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="showDialogModal"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          disable
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ props.row.Name }}
          </q-td>
          <q-td>
            {{ props.row.Description !== 'null' ? props.row.Description : '' }}
          </q-td>
          <q-td>
            <q-chip  square :color="+props.row.Status ===1 ? 'positive' :'negative'" text-color="white" :icon="+props.row.Status ===1 ?'done' : 'clear'" size="13px">
              {{ (+props.row.Status === 1) ? 'Açık' :'Kapalı' }}

            </q-chip>
          </q-td>
          <q-td>
            {{ baseSetting.dateFormat(props.row.created_at) }}
          </q-td>
          <q-td class="text-right">
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row.id)" ><i class="fas fa-edit"></i></q-btn>

            <q-btn flat round color="primary"  disable><i class="fas fa-trash-alt"></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.showFormDialog" persistent >
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md bg-blue-grey-8 text-white" style="height: 50px">
          <div class="text-h4" v-if="!extraFormFields.id">Yeni Bir Hizmet Oluştur</div>
          <div class="text-h4" v-else>Extra Servis Güncelleme</div>
          <q-space />
          <q-btn dense flat icon="close"  @click="onCloseDialog" >
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
         <div class="row">

           <div class="col-12 q-pa-xs">
             <div class="text-subtitle2 q-mb-xs text-grey-8  ">Hizmet Adı / Başlık  </div>
             <q-input
               outlined
               dense
               v-model="extraFormFields.Name"
               :lazy-rules="true"
               :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
               placeholder="Hizmet adı yazınız..."
               hide-bottom-space
             />
           </div>

           <div class="col-12 q-mt-sm q-pa-xs">
             <div class="text-subtitle2 q-mb-xs text-grey-8  ">Hizmet Açıklaması  </div>
             <q-input
               outlined
               dense
               v-model="extraFormFields.Description"
               placeholder="Açıklama yazınız..."
               hide-bottom-space
             />
           </div>
           <div class="col-12 q-mt-sm">
             <div class="text-subtitle2 q-mb-xs text-grey-8  "> Ücret Hesaplama Tipi   </div>
             <q-radio  :lazy-rules="true"
                       :rules="[ val => val && val.length > 0 || 'Zorunlu alan']" v-model="extraFormFields.CalculateType" val="Multiple" label="Çoklu Hesaplama" disable/>
             <q-radio  :lazy-rules="true"
                       :rules="[ val => val && val.length > 0 || 'Zorunlu alan']" v-model="extraFormFields.CalculateType" val="OneOff" label="Tekil Hesaplama" />
             <q-radio  :lazy-rules="true"
                       :rules="[ val => val && val.length > 0 || 'Zorunlu alan']" v-model="extraFormFields.CalculateType" val="DependsOnHalfPrice" label="Aracın Yarı Fiyatına Tabi Tut" />
           </div>
           <div class="col-12 q-mt-sm" v-show="extraFormFields.CalculateType && extraFormFields.CalculateType!== 'DependsOnHalfPrice'">
             <div class="text-subtitle2 q-mb-xs text-grey-8  "> Fiyat Giriniz   </div>
             <q-input
               type="number"
               outlined
               dense
               v-model="extraFormFields.Price"

               placeholder="100.00"
               hide-bottom-space
             />
           </div>
           <div class="col-12 q-mt-sm">
             <q-toggle v-model="extraFormFields.Status" label="Statusu" color="green"/>

           </div>
         </div>

            <div class="row">

              <div class="text-right col-12" v-if="!extraFormFields.id">

                <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
                <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
              </div>
              <div class="text-right col-12" v-else>
                <q-btn label="Güncelle" type="button" color="blue-grey-8"  icon-right="save"    @click="onUpdate"/>
              </div>
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {ref} from "vue";
import extraServicesColumns from "pages/Cars/CarExtras/Columns";
import {dateFormat}  from "pages/Js/Helpers";
import {Dialog} from "quasar";
export default {
  name: "CarExtras",
  data() {
    return {
      baseSetting : {
        showFormDialog : ref(false),
        extraServicesColumns,
        dateFormat,
        filterCarTypes : ref('')
      },
      extraFormFields : ref({
        Name : '',
        Description: '',
        Status : true,
        CalculateType : '',
        Price : null,
        id : '',

      }),

    }
  },
  methods : {
    onCloseDialog() {
      this.baseSetting.showFormDialog = false
      this.onReset()
    },
    showDialogModal() {
      this.baseSetting.showFormDialog = true
      this.onReset()
    },
    onSubmit() {
      let formData = new FormData();
      for (const [key,value] of Object.entries(this.extraFormFields)) {
        if (key !== 'id')
        {
         formData.append(key,value)
        }
      }
      this.$store.dispatch('CarExtrasModule/create',formData).then(() => {
        this.onReset();
        this.baseSetting.showFormDialog = false;
      });

    },
    onReset() {
        this.extraFormFields.id = ''
        this.extraFormFields.Name = ''
        this.extraFormFields.Description = ''
        this.extraFormFields.Status = true
        this.extraFormFields.CalculateType = ''
        this.extraFormFields.Price = ''
    },
    onEdit(id) {

      let obj = {...this.$store.getters['CarExtrasModule/extraById'](id)}
       obj.Status = +obj.Status === 1 ? true : false
      this.extraFormFields = obj
      this.baseSetting.showFormDialog = true;

    },
    onUpdate() {
      let formData = new FormData();
      for (const [key,value] of Object.entries(this.extraFormFields)) {
        if (key !== 'created_at' && key !== 'updated_at')
        {
          formData.append(key,value)
        }
      }

      formData.append('_method','PUT');
       this.$store.dispatch('CarExtrasModule/update',formData).then(() => {
        this.baseSetting.showFormDialog = false;
        this.onReset();
      })
    },

  },
  mounted() {
    this.$store.dispatch('CarExtrasModule/get')
  },
  computed : {
  extraServices() {
      return this.$store.getters['CarExtrasModule/extras']
    }
  }
}
</script>

<style scoped>

</style>
