<template>
  <div class="q-pa-md">
    <q-table
      title="Kullanıcı Listesi"
      :rows="users"
      :columns="baseSetting.UsersColumns"
      row-key="id"
      :filter="filterRow"
      rows-per-page-label="Sayfa başına kayıt:"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filterRow"  placeholder="Kullanıcı Arayınız..."  >
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
          disable
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ props.row.name +" "+props.row.surname}}
          </q-td>
          <q-td>
            {{ props.row.email}}
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
              label="Düzenleme"
            >
              <q-tooltip class="bg-indigo" :offset="[10, 10]">
                Kullanıcı Düzenleme
              </q-tooltip>
            </q-btn>
<!--            <q-btn-->
<!--              flat-->
<!--              color="blue-grey-8"-->
<!--              icon="fas fa-lock"-->
<!--              size="sm"-->
<!--            >-->
<!--              <q-tooltip class="bg-indigo" :offset="[10, 10]">-->
<!--                Kullanıcı Şifre Belirleme-->
<!--              </q-tooltip>-->
<!--            </q-btn>-->
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.newFormDialog" persistent >
      <q-card style="min-width: 800px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Kullanıcı Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <new-user-form @closeUserDialog="this.baseSetting.newFormDialog = false" />
      </q-card>
    </q-dialog>

    <q-dialog   v-model="baseSetting.editFormDialog" persistent >
      <q-card style="min-width: 800px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Kullanıcı Düzenleme </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <edit-user-form @closeUserDialog="this.baseSetting.editFormDialog = false"  :user-id="baseSetting.onEditUserId" />
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import UsersColumns from "pages/Users/Components/UsersColumns";
import NewUserForm from "pages/Users/Components/NewUserForm";
import EditUserForm from "pages/Users/Components/EditUserForm";
import {dateFormat}  from "pages/Js/Helpers";
import {ref} from "vue";
export default {
  name: "Users",
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
        UsersColumns,
        CustomersRows,
        newFormDialog: ref(false),
        editFormDialog : ref(false),
        onEditUserId : ref(null)
      }),

    }
  },
  components : {
    NewUserForm,
    EditUserForm
  },
  mounted() {
    this.$store.dispatch('UsersModule/get')
  },

  computed : {
    users() {
      return this.$store.getters['UsersModule/getRecords']
    }
  },
  methods : {
    onEdit(userID) {
      this.baseSetting.onEditUserId = userID
      this.baseSetting.editFormDialog = true

    }
  }
}
</script>

<style scoped>

</style>
