<template>
  <div class="q-pa-md">
    <q-table
      title="Müşteriler Listesi"
      :rows="customers"
      :columns="baseSetting.CustomersColumns"
      row-key="id"
      :filter="filterRow"
      rows-per-page-label="Sayfa başına kayıt:"
      :pagination="pagination"
     >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filterRow"  placeholder="Müşteri Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click=" baseSetting.newFormDialog = true"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          @click="this.$store.dispatch('CustomersModule/exportCustomersReport')"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ ( props.row.CustomerType === 'Individual') ? 'Bireysel' : 'Kurumsal'  }}
          </q-td>
          <q-td>
            {{ {...this.$store.getters['CustomerGroupsModule/getRecord'](props.row.customer_groups_id)}.Name }}
          </q-td>
          <q-td>
            {{ props.row.Name +" "+props.row.Surname}}
          </q-td>
          <q-td>
            {{ props.row.Email}}
          </q-td>
          <q-td>
            {{ props.row.Phone}}
          </q-td>
          <q-td>
            {{ props.row.Address}}
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
            <q-btn
              flat
              color="blue-grey-8"
              icon="fas fa-user-edit"
              size="sm"
              @click="onEdit(props.row.id)"
             >
              <q-tooltip class="bg-indigo" :offset="[10, 10]">
               Müşteri Düzenleme
              </q-tooltip>
            </q-btn>
<!--             <q-btn-->
<!--              flat-->
<!--              color="blue-grey-8"-->
<!--              icon="fas fa-lock"-->
<!--              size="sm"-->
<!--              >-->

<!--              <q-tooltip class="bg-indigo" :offset="[10, 10]">-->
<!--                Müşteri Şifre Belirleme-->
<!--              </q-tooltip>-->
<!--            </q-btn>-->
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.newFormDialog" persistent >
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Müşteri Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
      <new-customer-form @closeCustomerDialog="this.baseSetting.newFormDialog = false" />
      </q-card>
    </q-dialog>

    <q-dialog   v-model="baseSetting.editFormDialog" persistent >
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Müşteri Düzenleme </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
          <edit-customer-form @closeCustomerDialog="this.baseSetting.editFormDialog = false" :customer-id="baseSetting.onEditCustomerId" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CustomersColumns from "pages/Users/Components/CustomersColumns";
import NewCustomerForm from "pages/Users/Components/NewCustomerForm";
import EditCustomerForm from "pages/Users/Components/EditCustomerForm";
import {dateFormat}  from "pages/Js/Helpers";
import {ref} from "vue";
export default {
  name: "Index",
  setup() {
    const CustomersRows = []
    const filterRow = ref('')
    const pagination = {
      sortBy:'id',
      rowsPerPage:10
    }
    return {
      pagination,
      filterRow,
      baseSetting : ref({
      dateFormat,
      CustomersColumns,
      CustomersRows,
       newFormDialog: ref(false),
       editFormDialog : ref(false),
       onEditCustomerId : ref(null)
      }),

    }
  },
  components : {
    NewCustomerForm,
    EditCustomerForm
  },

  computed : {
    customers() {
      return this.$store.getters['CustomersModule/getRecords']
    }
  },
  methods : {
    onEdit(customerID) {
       this.baseSetting.onEditCustomerId = customerID
       this.baseSetting.editFormDialog = true

    }
  }
}
</script>

<style scoped>

</style>
