<template>
  <div class="q-pa-md">
    <q-table
      title="Makinist Listesi"
      :rows="machinistCompanies"
      :columns="baseSetting.MachinistCompaniesColumns"
      row-key="id"
      :filter="baseSetting.filterTable"

    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filterTable"  placeholder="Makinist Arayınız..."  >
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
          @click="this.$store.dispatch('MachinistCompaniesModule/exportMachinist')"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ {...this.$store.getters['MachinistTypesModule/elById'](props.row.machinist_type_id)}.TypeName }}
          </q-td>
          <q-td class="text-capitalize text-left">
            {{ props.row.CompanyName }}
          </q-td>

          <q-td>
            {{ (props.row.CompanyPhone.length >=4) ? props.row.CompanyPhone : 'Yok' }}
          </q-td>
          <q-td>
            {{ props.row.CompanyEmail }}
          </q-td>

<!--          <q-td>-->
<!--            {{ props.row.AuthorizedPerson }}-->
<!--          </q-td>-->
          <q-td>
            {{ props.row.CompanyAddress }}
          </q-td>
          <q-td>

            <q-chip  square :color=" +parseInt(props.row.Status) === 1 ? 'positive' :'negative'" text-color="white" :icon="+parseInt(props.row.Status) === 1 ?'done' : 'clear'" size="13px">
              {{ +parseInt(props.row.Status) === 1 ? 'Açık' :'Kapalı' }}
            </q-chip>
          </q-td>
          <q-td>
            {{  baseSetting.dateFormat(props.row.created_at)}}
          </q-td>
          <q-td class="text-right">
            <q-btn flat round color="blue-grey-9"  @click="onEdit(props.row.id)" ><i class="fas fa-edit"></i></q-btn>

          </q-td>
        </q-tr>

      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.newFormDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Makinist Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <New-Machinist-Form @closeDialog="this.baseSetting.newFormDialog = false"/>
      </q-card>
    </q-dialog>

    <q-dialog   v-model="baseSetting.editFormDialog" persistent style="z-index: 999!important;">
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Makinist Kaydı Düzenleme</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <Edit-Machinist-Form @closeDialog="this.baseSetting.editFormDialog = false"  :machinist-id="baseSetting.onEditId" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import {ref} from "vue";
import {dateFormat} from "pages/Js/Helpers";
import MachinistCompaniesColumns from "pages/Machinist/MachinistCompanies/MachinistCompaniesColumns";
import NewMachinistForm from "pages/Machinist/MachinistCompanies/Components/NewMachinistForm";
import EditMachinistForm from "pages/Machinist/MachinistCompanies/Components/EditMachinistForm";
export default {
  name: "Index",
  setup() {
    const CustomersRows = []
    return {
      baseSetting : ref({
        dateFormat,
        MachinistCompaniesColumns,
        CustomersRows,
        newFormDialog: ref(false),
        editFormDialog: ref(false),
        onEditId: ref(null),
        filterTable:ref('')
      })
    }
  },
  components : {
    NewMachinistForm,
    EditMachinistForm
  },
  mounted() {
    this.$store.dispatch('MachinistCompaniesModule/get')
    this.$store.dispatch('MachinistTypesModule/get')
  },
  computed: {
    machinistCompanies(){
      return this.$store.getters['MachinistCompaniesModule/machinistCompanies']
    }
  },
  methods:{

    onEdit(machinistId) {
      this.baseSetting.onEditId = machinistId;
      this.baseSetting.editFormDialog = true;
    },
  }
}
</script>

<style scoped>

</style>
