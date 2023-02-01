<template>
  <div class="q-pa-md">

    <q-table
      title="Araba Hasar Listesi"
      :rows="DamageRecords"
      :columns="baseSetting.MachinistDamageRecordColumns"
      row-key="id"
      :filter="baseSetting.filter"

    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="baseSetting.filter"  placeholder="Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          :to="{ name: 'machinistCarDamageCreate' }"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm "
          @click="this.$store.dispatch('MachinistDamageRecordsModule/exportMachinistReservation')"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td class="text-uppercase">
          {{  {...this.$store.getters['CarsModule/getRecordByCarId'](props.row.cars_id)}.LicencePlate    }}
          </q-td>
          <q-td>
            {{ {...this.$store.getters['MachinistCompaniesModule/elById'](props.row.machinist_id)}.CompanyName }}
          </q-td>
          <q-td>
            {{ props.row.Description }}
          </q-td>
          <q-td>
            {{ props.row.EstimatedRepairCost }}
          </q-td>
          <q-td>
            {{ props.row.ReservationStartDate  }}
          </q-td>
          <q-td>
            {{ props.row.ReservationEndDate  }}
          </q-td>
          <q-td>
            <q-chip  square color="blue-9" text-color="white" icon="hourglass_empty" size="13px" v-if="props.row.ReservationStatus === 'Opened'">
              Devam Ediyor
            </q-chip>
            <q-chip  square color="red-9" text-color="white" icon="clear" size="13px" v-else-if="props.row.ReservationStatus === 'Canceled'">
              İptal Edildi
            </q-chip>
            <q-chip  square color="blue-grey-8" text-color="white" icon="done" size="13px" v-else-if="props.row.ReservationStatus === 'Completed'">
              Tamamlandı
            </q-chip>
          </q-td>
          <q-td>
            {{  baseSetting.dateFormat(props.row.created_at)}}
          </q-td>
          <q-td class="text-right">
            <q-btn flat round color="blue-grey-9"  :to="{name: 'MachinistCarEditDamage', params: { machinistDamageId: props.row.id }}" ><i class="fas fa-edit"></i></q-btn>
            <q-btn disable flat round color="primary" ><i class="fas fa-trash-alt"></i></q-btn>
          </q-td>
        </q-tr>

      </template>

    </q-table>

  </div>
</template>

<script>
import MachinistDamageRecordColumns from "pages/Machinist/MachinistDamageRecord/MachinistDamageRecordColumns.js";

import {ref} from "vue";
import {dateFormat} from "pages/Js/Helpers";
export default {
  name: "Index",
  setup() {
    const CustomersRows = []
    return {
      baseSetting : ref({
        dateFormat,
        MachinistDamageRecordColumns,
        CustomersRows,
        newFormDialog: ref(false),
        editFormDialog: ref(false),
        onEditId: ref(null),
        filter:ref('')
      })
    }
  },
  components : {
  },
  mounted() {
    this.$store.dispatch('MachinistDamageRecordsModule/get')
    this.$store.dispatch('MachinistCompaniesModule/get')
    this.$store.dispatch('CarsModule/get')

  },
  computed: {
    DamageRecords(){
      return this.$store.getters['MachinistDamageRecordsModule/machinistDamageRecord']
    }
  },
  methods:{

    onEdit(id) {
      this.baseSetting.onEditId = id;
      this.baseSetting.editFormDialog = true;
    },
  }
}
</script>

<style scoped>

</style>
