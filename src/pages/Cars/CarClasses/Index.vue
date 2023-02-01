<template>
  <div class="q-pa-md">
    <q-table
      title="Araç Sınıfları"
      :rows="getRecords"
      :columns="baseSetting.carClassesColumns"
      row-key="id"
      :filter="baseSetting.filterCarTypes"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterCarTypes"  placeholder="Sınıf Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click=" baseSetting.showFormDialog = true"
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
            {{ props.row.ClassName }}
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

            <q-btn flat round color="primary"  @click="onRemove(props.row.id)"><i class="fas fa-trash-alt"></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.showFormDialog" persistent >
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4" v-if="!baseFields.id">Yeni Bir Araç Sınıfı Oluştur</div>
          <div class="text-h4" v-else>Araç Sınıf Güncelle</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              outlined
              dense
              v-model="baseFields.ClassName"
              label="Araç Sınıfı Adı"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />



            <q-toggle v-model="baseFields.Status" label="Sınıf Statusu" color="green"/>

            <div class="text-right" v-if="!baseFields.id">

              <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="Kaydet" type="submit" color="positive"  icon-right="save"  flat/>
            </div>
            <div class="text-right" v-else>
              <q-btn label="Güncelle" type="button" color="blue"  icon-right="save"  flat @click="onUpdate"/>
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {ref} from "vue";
import carClassesColumns from "pages/Cars/CarClasses/Columns";
import {dateFormat}  from "pages/Js/Helpers";
import {Dialog} from "quasar";
export default {
  name: "CarTypes",
  data() {
    return {
      baseSetting : {
        showFormDialog : ref(false),
        carClassesColumns,
        dateFormat,
        filterCarTypes : ref('')
      },
      baseFields : {
        ClassName : ref(''),
        Status : ref(true),
        id : ref('')
      }
    }
  },
  methods : {
    onSubmit() {
      let formData = new FormData();
      formData.append('ClassName',this.baseFields.ClassName)
      formData.append('Status',this.baseFields.Status)
      this.$store.dispatch('CarClassesModule/create',formData).then(() => {
        this.onReset();
        this.baseSetting.showFormDialog = false;
      });

    },
    onReset() {
      this.baseFields.ClassName = '';
      this.baseFields.Status = true;
      this.baseFields.id = '';
    },
    onEdit(id) {
      const type = this.getRecords.find(el => {
        return parseInt(el.id) === parseInt(id)
      });
      this.baseFields.ClassName = type.ClassName;
      this.baseFields.Status = +type.Status === 1
      this.baseFields.id = type.id
      this.baseSetting.showFormDialog = true;
    },
    onUpdate() {
      let formData = new FormData();
      formData.append('ClassName',this.baseFields.ClassName)
      formData.append('Status',this.baseFields.Status)
      formData.append('id',this.baseFields.id)
      formData.append('_method','PUT');
      this.$store.dispatch('CarClassesModule/update',formData).then(() => {
        this.baseSetting.showFormDialog = false;
        this.onReset();
      })
    },
    onRemove(id) {
      Dialog.create({
        title: 'Eminmisiniz?',
        message: 'Silmeniz durumunda işlemi geriye alamassınız.!',
        persistent: true,
        ok : {
          label : 'Sil',
          flat:true
        },
        cancel : {
          flat : true,
          label : 'İptal Et'
        }
      }).onOk(() => {
         this.$store.dispatch('CarClassesModule/destroy',id)
      }).onCancel(() => {
       })
    }
  },
  mounted() {
    this.$store.dispatch('CarClassesModule/get')
  },
  computed : {
    getRecords() {
      return this.$store.getters['CarClassesModule/carClassesGetter']
    }
  }
}
</script>

<style scoped>

</style>
