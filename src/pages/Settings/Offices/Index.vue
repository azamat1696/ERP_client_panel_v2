<template>
  <div class="q-pa-md">
    <q-table
      title="Ofisler Listesi"
      :rows="offices"
      :columns="baseSetting.OfficeColumns"
      row-key="id"
      :filter="baseSetting.filterOfficesTypes"

    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterOfficesTypes"  placeholder="Ofis Adı Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click="baseSetting.newFormDialog = true"
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
          <q-td class="text-capitalize">
            {{ props.row.OfficeName }}
          </q-td>
          <q-td>
            {{ (props.row.OfficePhone.length >=4) ? props.row.OfficePhone : 'Yok' }}
          </q-td>
          <q-td>
            {{ props.row.OfficeEmail }}
          </q-td>
          <q-td>
            {{ {...this.$store.getters['Cities/elById'](props.row.cities_id)}.CityName }}
          </q-td>
          <q-td>
            {{ {...this.$store.getters['DistrictModule/getRecordById'](props.row.districts_id)}.DistrictName  }}
          </q-td>
          <q-td>
            <q-chip  square :color=" +props.row.Status === 1 ? 'positive' :'negative'" text-color="white" :icon="+props.row.Status === 1 ?'done' : 'clear'" size="13px">
              {{ (+props.row.Status === 1) ? 'Açık' :'Kapalı' }}
            </q-chip>
          </q-td>
          <q-td>
            {{  baseSetting.dateFormat(props.row.created_at)}}
          </q-td>
          <q-td class="text-right">
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row.id)" ><i class="fas fa-edit"></i></q-btn>

            <q-btn disable flat round color="primary" ><i class="fas fa-trash-alt"></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.newFormDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Ofis Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <New-Office-Form @closeOfficeDialog="this.baseSetting.newFormDialog = false"/>
      </q-card>
    </q-dialog>

    <q-dialog   v-model="baseSetting.editFormDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Ofis Kaydı Düzenleme</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <edit-office-form @closeOfficeDialog="this.baseSetting.editFormDialog = false"  :office-id="baseSetting.onEditOfficeId" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import OfficeColumns from "pages/Settings/Offices/OfficeColumns";
import NewOfficeForm from "pages/Settings/Offices/NewOfficeForm";
import EditOfficeForm from "pages/Settings/Offices/EditOfficeForm";
import {ref} from "vue";
import {dateFormat} from "pages/Js/Helpers";
export default {
  name: "Index",
  setup() {
    const CustomersRows = []
    return {
      baseSetting : ref({
        dateFormat,
        OfficeColumns,
        CustomersRows,
        newFormDialog: ref(false),
        editFormDialog: ref(false),
        onEditOfficeId: ref(null),
        filterOfficesTypes:ref('')
      })
    }
  },
  components : {
    NewOfficeForm,
    EditOfficeForm
  },
  mounted() {
    this.$store.dispatch('OfficeModule/get')
    this.$store.dispatch('Cities/get')
    this.$store.dispatch('DistrictModule/get')
  },
  computed: {
    offices(){
      return this.$store.getters['OfficeModule/getRecords']
    }
  },
  methods:{

    onEdit(officeId) {
      this.baseSetting.onEditOfficeId = officeId;
      this.baseSetting.editFormDialog = true;
    },
  }
}
</script>

<style scoped>

</style>
