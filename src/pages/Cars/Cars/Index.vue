<template>
  <div class="q-pa-md">
    <q-table
      title="Araçlar Listesi"
      :rows="getRecords"
      :columns="baseSetting.carsColumns"
       row-key="id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          placeholder="Plaka Üzerinden Arayınız..."
         >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          :to="{ name: 'createCar' }"
        />
        <q-btn
          color="blue-grey-8"
          icon="archive"
          label="Excel Oluştur"
          class="q-pa-sm"
          @click="this.$store.dispatch('CarsModule/exportCarsReport')"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ props.row.BrandName }}
          </q-td>
          <q-td>
            {{props.row.ModelName }}
          </q-td>
          <q-td>
            {{ props.row.LicencePlate.toUpperCase() }}
          </q-td>
          <q-td>
            {{ props.row.ClassName }}
          </q-td>
          <q-td>
            {{ props.row.CarTransmissionName }}
          </q-td>
          <q-td>
            <q-chip
              square
              :color="+props.row.carStatus === 1 ? 'positive' : 'negative'"
              text-color="white"
              :icon="+props.row.carStatus === 1 ? 'done' : 'clear'"
              size="13px"
            >
              {{ +props.row.carStatus === 1 ? "Açık" : "Kapalı" }}
            </q-chip>
          </q-td>

          <q-td class="text-right">
            <q-btn flat round color="blue-grey-9"  :to="{name: 'editCar', params: { id: props.row.id }}"
              ><i class="fas fa-edit"></i
            ></q-btn>

            <q-btn flat round color="primary" @click="onRemove(props.row.id)"
              ><i class="fas fa-trash-alt"></i
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="baseSetting.showFormDialog" persistent>
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4" v-if="!baseFields.id">
            Yeni Bir Araç Tipi Oluştur
          </div>
          <div class="text-h4" v-else>Modeli Güncelle</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              outlined
              dense
              v-model="baseFields.CarTransmissionName"
              label="Araç Tipi Adı"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Zorunlu alan']"
            />

            <q-toggle
              v-model="baseFields.Status"
              label="Model Statusu"
              color="green"
            />

            <div class="text-right" v-if="!baseFields.id">
              <q-btn
                label="Sıfırla"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
              <q-btn
                label="Kaydet"
                type="submit"
                color="positive"
                icon-right="save"
                flat
              />
            </div>
            <div class="text-right" v-else>
              <q-btn
                label="Güncelle"
                type="button"
                color="blue"
                icon-right="save"
                flat
                @click="onUpdate"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { dateFormat } from "pages/Js/Helpers";

const carsColumns = [
  { name: 'BrandName', align:'center', label: 'Marka', field: 'BrandName', sortable: true },
  { name: 'ModelName', align:'center', label: 'Model', field: 'ModelName', sortable: true },
  { name: 'LicencePlate', align: 'center', label: 'Plakası', field: 'LicencePlate', sortable: true },
  { name: 'ClassName', align:'center', label: 'Sınıf', field: 'ClassName', sortable: true },
  { name: 'CarTransmissionName', align:'center', label: 'Vites Tipi', field: 'CarTransmissionName', sortable: true },
  { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
  { name: 'id', align:'center', label: 'Aksion', field: 'id' },
];
 export default {
  name: "Cars",
  setup() {
    const filter = ref('')
    return {
      filter,
      baseSetting: ref({
        showFormDialog: ref(false),
        carsColumns,
        dateFormat,

      }),

    };
  },
  methods: {

    onReset() {

    },

    onUpdate() {

    },
    onRemove(id) {

    },
  },

  computed: {
    getRecords() {
       return this.$store.getters["CarsModule/allCarsDetails"];
    },
  },
};
</script>

<style scoped></style>
