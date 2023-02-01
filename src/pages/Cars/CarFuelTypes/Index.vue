<template>
  <div class="q-pa-md">
    <q-table
      title="Araç Yakıt Tipleri"
      :rows="carFuelTypes"
      :columns="carFuelTypesColumns"
      row-key="id"
      :filter="filterCarTypes"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filterCarTypes"  placeholder="Araç Yakıt Tipi Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="addNewFuelTypes"
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
            {{ props.row.FuelTypeName }}
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
          <div class="text-h4" v-if="!baseFields.id">Yeni Araç Yakıt Tipi Oluştur</div>
          <div class="text-h4" v-else> Araç Yakıt Tipi Güncelle</div>
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
              v-model="baseFields.FuelTypeName"
              label="Araç Yakıt Tipi Adı"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            />



            <q-toggle v-model="baseFields.Status" label="Araç Yakıt Tipi Statusu" color="green"/>

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
// import carFuelTypesColumns from "pages/Cars/CarTypes/Columns";
const carFuelTypesColumns = [
  { name: 'FuelTypeName', align: 'center', label: 'Araç Tipi Adı', field: 'FuelTypeName', sortable: true },
  { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
  { name: 'id', align:'center', label: '', field: 'id' },
];
import {dateFormat}  from "pages/Js/Helpers";
import {Dialog} from "quasar";
export default {
  name: "CarTypes",
  data() {
    return {
      filterCarTypes : ref(''),
      carFuelTypesColumns,
      baseSetting : ref( {
        showFormDialog : false,

        dateFormat,

      }),
      baseFields : {
        FuelTypeName : '',
        Status : true,
        id : ''
      }
    }
  },
  methods : {
    addNewFuelTypes() {
      this.onReset()
      this.baseSetting.showFormDialog = true
    },
    onSubmit() {
      let formData = new FormData();
      formData.append('FuelTypeName',this.baseFields.FuelTypeName)
      formData.append('Status',this.baseFields.Status)
      this.$store.dispatch('CarFuelTypesModule/create',formData).then(() => {
        this.onReset();
        this.baseSetting.showFormDialog = false;
      });

    },
    onReset() {
      this.baseFields.TypeName = '';
      this.baseFields.Status = true;
      this.baseFields.id = '';
    },
    onEdit(id) {
      const type = this.carFuelTypes.find(el => {
        return parseInt(el.id) === parseInt(id)
      });
      this.baseFields.FuelTypeName = type.FuelTypeName;
      this.baseFields.Status = +type.Status === 1
      this.baseFields.id = type.id
      this.baseSetting.showFormDialog = true;
    },
    onUpdate() {
      let formData = new FormData();
      formData.append('FuelTypeName',this.baseFields.FuelTypeName)
      formData.append('Status',this.baseFields.Status)
      formData.append('id',this.baseFields.id)
      formData.append('_method','PUT');
      this.$store.dispatch('CarFuelTypesModule/update',formData).then(() => {
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
         this.$store.dispatch('CarFuelTypesModule/destroy',id)
      }).onCancel(() => {
       })
    }
  },
  mounted() {
    this.$store.dispatch('CarFuelTypesModule/get')
  },
  computed : {
    carFuelTypes() {
      return this.$store.getters['CarFuelTypesModule/getRecords']
    }
  }
}
</script>

<style scoped>

</style>
