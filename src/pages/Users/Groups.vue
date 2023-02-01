<template>
  <q-table
    title="Müşteri Grupları"
    :rows="GroupsRow"
    :columns="GroupsColumns"
    row-key="id"
    rows-per-page-label="Sayfa başına kayıt:"
    :filter="filter"
  >
    <template v-slot:top-right>
      <q-input outlined dense debounce="300" color="primary" v-model="filter"  placeholder="Müşteri Grup Arayınız..."  >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        color="primary"
        label="Yeni Kayıt "
        icon="add"
        class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
        @click="groupDialogCreate = true "
      />
      <q-btn
        color="blue-grey-8"
        icon="archive"
        label="Excel Oluştur"
        class="q-pa-sm "
        disable
      />
    </template>

    <template v-slot:body="props" >
      <q-tr :props="props" :key="props.row.index" class="text-center" >

        <q-td>
          {{ props.row.Name}}
        </q-td>

        <q-td>
          {{ props.row.Description}}
        </q-td>

        <q-td>
          <q-chip  square :color="+props.row.Status ===1 ? 'positive' :'negative'" text-color="white" :icon="+props.row.Status ===1 ?'done' : 'clear'" size="13px">
            {{ (+props.row.Status === 1) ? 'Açık' :'Kapalı' }}
          </q-chip>
        </q-td>
        <q-td>
          {{ dateFormat(props.row.created_at) }}
        </q-td>
        <q-td class="text-right">
          <q-btn
            flat
            color="blue-grey-9"
            icon="fas fa-edit"
            size="sm"
            @click="onEdit(props.row)"
          >
            <q-tooltip class="bg-indigo" :offset="[10, 10]">
              Grup Düzenleme
            </q-tooltip>
          </q-btn>

        </q-td>
      </q-tr>
    </template>

  </q-table>


  <q-dialog   v-model="groupDialogCreate" persistent >
    <q-card style="min-width: 500px" >
      <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
        <div class="text-h4" >Yeni Müşteri Grubu Kaydı </div>
        <q-space />
        <q-btn dense flat icon="close" @click="onReset" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
  <q-card-section>
   <group-create @closeFromDialogCreate="this.groupDialogCreate = false" ></group-create>
  </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog   v-model="groupDialogEdit" persistent >
    <q-card style="min-width: 500px" >
      <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
        <div class="text-h4" > Müşteri Grubu Düzenle </div>
        <q-space />
        <q-btn dense flat icon="close" @click="onReset" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <group-edit @closeFromDialogEdit="this.groupDialogEdit = false" :group-id="this.formFields.editId" ></group-edit>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import {ref} from "vue";
import GroupsColumns from "pages/Users/Components/GroupsColumns";
import GroupCreate from "pages/Users/CostumerGroupComponents/GroupCreate";
import GroupEdit from "pages/Users/CostumerGroupComponents/GroupEdit";
import {dateFormat} from "pages/Js/Helpers";

export default {
  name: "Groups",
  setup () {
     return  {
       filter: ref(''),
       selected : ref([]),
       GroupsColumns,
       dateFormat,
       groupDialogCreate: ref(false),
       groupDialogEdit: ref(false),
       formFields : ref({
         editId:ref(null),
         Name : '',
         Description: '',
         Status : true
       })
    }
  },
  components: {
    GroupCreate,
    GroupEdit
  },
  methods : {


    onEdit(detail) {
      this.formFields.editId = detail
      this.groupDialogEdit = true
    },
    onReset() {
      this.formFields.Name  = ''
      this.formFields.Description  = ''
      this.formFields.Status  = true
    },

  },
  computed : {
    GroupsRow() {
      return this.$store.getters['CustomerGroupsModule/getRecords']
    }
  },
  mounted() {
    this.$store.dispatch('CustomerGroupsModule/get')
  },

}
</script>

<style scoped>

</style>
