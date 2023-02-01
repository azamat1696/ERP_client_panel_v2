<template>
  <div>

    <q-card class="q-pa-lg">
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-banner dense class="bg-grey-3">
              <template v-slot:avatar>
                <q-icon name="o_notifications" color="primary" />
              </template>
              <div class="text-subtitle1">Rezervasyon Raporlama Modülu</div>
              <div class="text-subtitle2">
                Bu kısımda bu güne kadar kayıt edilen rezervasyonları detaylı raporlamaları yapılabilmektedir.
              </div>

            </q-banner>

          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-4" id="repoChartDiv" style="margin-top: -10px !important;">
            <canvas id="myChart" width="150" height="150"></canvas>
          </div>
          <div class="col-8 q-pl-xl">
            <q-form
              @submit="onsubmitFilterReservations"

              class="q-gutter-md  q-mb-lg"
            >
              <div class="row q-card--bordered q-pa-sm bg-grey-2">
                <div class="text-subtitle2 text-bold q-ml-sm">Filtreleme Formu</div>
                <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
                <div class="col-4  q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
                  <!--                   :rules="['date']"-->
                  <q-input
                    outlined
                    v-model="filterReservationFields.startDateTime"
                    placeholder="Opsionel"
                    dense
                    clearable
                    class="bg-white"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale" >
                          <q-date v-model="filterReservationFields.startDateTime" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Kapat" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-4  q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Bitiş Tarihi</div>
                  <q-input
                    outlined
                    v-model="filterReservationFields.endDateTime"
                    placeholder="Opsionel"
                    dense
                    clearable
                    class="bg-white"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale"  >
                          <q-date v-model="filterReservationFields.endDateTime" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Kapat" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-4 q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Müşteri Gurubu</div>
                  <q-select
                    v-model="filterReservationFields.group_id"
                    :options="customerGroups"
                    option-label="Name"
                    option-value="id"
                    use-input
                    emit-value
                    map-options
                    outlined
                    dense
                    class="bg-white"
                    hide-bottom-space
                    @filter="onCustomerGroupFilter"
                    clearable

                  />
                </div>

                <div class="col-4 q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Araç Plakası</div>
                  <q-input
                    type="text"
                    outlined
                    dense
                    placeholder="Araç Plakası"
                    bg-color="white"
                    v-model="filterReservationFields.licence_plate"
                    clearable
                  />
                </div>
                <div class="col-4 q-pa-xs">

                </div>
                <div class="col-4 q-pa-xs q-mt-lg text-right">
                  <div class="row">
                    <div class="col-6 q-pr-xs">
                      </div>
                    <div class="col-6 q-pr-xs">
                      <q-btn  class="full-width" label="FILTRELE" icon="search" type="submit" color="blue-grey-8"/>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>

            <form @submit="onsubmitFilterReservationsWithDate($event)" class="q-mb-lg">
              <div class="row q-card--bordered q-pa-sm bg-grey-2">
                <div class="text-subtitle2 text-bold q-ml-sm">Rezervasyon Başlama Tarihi Filtreleme</div>
                <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
                <div class="col-12 row">
                  <div class="col-6  q-pa-xs">
                    <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
                    <!--                   :rules="['date']"-->
                    <q-input
                      outlined
                      v-model="filterWithDates.startDate"
                      placeholder="Opsionel"
                      dense
                      clearable
                      class="bg-white"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale" >
                            <q-date v-model="filterWithDates.startDate" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6  q-pa-xs">
                    <div class="text-subtitle2 text-grey-8">Bitiş Tarihi</div>
                    <q-input
                      outlined
                      v-model="filterWithDates.startEndDate"
                      placeholder="Opsionel"
                      dense
                      clearable
                      class="bg-white"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale"  >
                            <q-date v-model="filterWithDates.startEndDate" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="text-subtitle2 text-bold q-ml-sm q-pt-md">Rezervasyon Bitiş Tarihi Filtreleme</div>
                <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
                <div class="col-12 row">
                  <div class="col-6  q-pa-xs">
                    <div class="text-subtitle2 text-grey-8">Başlama Tarihi</div>
                    <!--                   :rules="['date']"-->
                    <q-input
                      outlined
                      v-model="filterWithDates.endStartDate"
                      placeholder="Opsionel"
                      dense
                      clearable
                      class="bg-white"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale" >
                            <q-date v-model="filterWithDates.endStartDate" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6  q-pa-xs">
                    <div class="text-subtitle2 text-grey-8">Bitiş Tarihi</div>
                    <q-input
                      outlined
                      v-model="filterWithDates.endDate"
                      placeholder="Opsionel"
                      dense
                      clearable
                      class="bg-white"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale"  >
                            <q-date v-model="filterWithDates.endDate" minimal :locale="this.$store.getters['MainModule/getDateTimeLocale']" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="col-12 q-pa-xs q-mt-lg text-right">
                  <div class="row">
                    <div class="col-10 q-pr-xs">
                    </div>
                    <div class="col-2 q-pr-xs">
                      <q-btn  class="full-width" label="FILTRELE" icon="search" type="submit" color="blue-grey-8"/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
              <div class="row q-card--bordered q-pa-sm bg-grey-2">
                <div class="text-subtitle2 text-bold q-ml-sm"> Tutar Alanları Sonucu</div>
                <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
                <div class="col-3 q-pa-xs">
                  <q-card class="my-card no-box-shadow">
                    <q-card-section   style="min-height: 50px">
                      <div class="text-subtitle1" style="font-size: 32px;float: left;">₺</div>
                      <div class="text-subtitle1  " style="font-size: 20px;margin-left: 4px">{{currencyRates.Lira}}</div>
                    </q-card-section>
                    <q-separator />
                  </q-card>
                </div>
                <div class="col-3 q-pa-xs">
                  <q-card class="my-card no-box-shadow">
                    <q-card-section   style="min-height: 50px">
                      <div class="text-subtitle1" style="font-size: 30px;float: left;">£</div>
                      <div class="text-subtitle1  " style="font-size: 20px;margin-left: 4px">{{currencyRates.Sterlin}}</div>
                    </q-card-section>
                    <q-separator />
                  </q-card>
                </div>
                <div class="col-3 q-pa-xs">
                  <q-card class="my-card no-box-shadow">
                    <q-card-section   style="min-height: 50px">
                      <div class="text-subtitle1" style="font-size: 30px;float: left;">€</div>
                      <div class="text-subtitle1  " style="font-size: 20px;margin-left: 4px">{{currencyRates.Euro}}</div>
                    </q-card-section>
                    <q-separator />
                  </q-card>
                </div>
                <div class="col-3 q-pa-xs">
                  <q-card class="my-card no-box-shadow">
                    <q-card-section  style="min-height: 50px" >
                      <div class="text-subtitle1" style="font-size: 28px;float: left;">$</div>
                      <div class="text-subtitle1  " style="font-size: 20px;margin-left: 4px">{{currencyRates.Dolar}}</div>
                    </q-card-section>
                    <q-separator />
                  </q-card>
                </div>
                <div class="col-12 q-pa-xs ">
                  <q-card class="my-card no-box-shadow bg-transparent">
                    <q-card-section  >
                      <div class="text-subtitle1" style="font-size: 20px; ">Toplam Tl Hesabı</div>
                      <div class="text-subtitle1 text-bold " style="font-size: 20px;margin-left: 4px">{{currencyRates.TotalPriceByCurrency}} TL</div>
                    </q-card-section>
                    <q-separator />
                  </q-card>
                </div>
              </div>

          </div>

        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md bg-transparent no-box-shadow q-mb-xl">
      <q-card-section class="q-pa-none">
        <div class="row ">
          <div class="col-12">
            <q-table
              title="Sonuçlar"
              :rows="reservationReportRows"
              :columns="reservationColumns"
              row-key="id"
              :filter="searchReports"
              rows-per-page-label="Sayfa başına kayıt:"
              :visible-columns="visibleColumns"
              :pagination="pagination"
              ref="reservationReportsRows"
              flat
              bordered
              :table-header-style="{ backgroundColor: 'rgba(200,223,225,0.24)' }"
            >

              <template v-slot:top="props" >
                <q-select
                  outlined
                  v-model="visibleColumns"
                  multiple
                  borderless
                  dense
                  options-dense
                  :display-value="$q.lang.table.columns"
                  emit-value
                  map-options
                  :options="reservationColumns"
                  option-value="name"
                  option-label="label"
                />

                <q-select
                  label="Kira Cinsi / Tipi"
                  outlined
                  v-model="onFilterFields.ReservationType"
                  :options="this.$store.getters['MainModule/getReservationTypes']"
                  borderless
                  dense
                  options-dense
                  emit-value
                  map-options
                  option-value="title"
                  option-label="title"
                  style="min-width:170px"
                  class="q-pl-xs"
                  @update:model-value="onFilterTable"
                  clearable
                  @clear="onFilterTable"
                />
                <q-select
                  label="Rezervasyon Statusu"
                  outlined
                  v-model="onFilterFields.ReservationStatus"
                  :options="this.$store.getters['MainModule/getReservationStatus']"
                  borderless
                  dense
                  options-dense
                  emit-value
                  map-options
                  option-value="title"
                  option-label="title"
                  style="min-width:170px"
                  class="q-pl-xs"
                  @update:model-value="onFilterTable"
                  @clear="onFilterTable"
                  clearable
                />

                <q-select
                  label="Müşteri Grubu"
                  outlined
                  v-model="onFilterFields.CustomerGroupName"
                  :options="customerGroupOptions"
                  borderless
                  dense
                  options-dense
                  use-input
                  emit-value
                  map-options
                  option-value="Name"
                  option-label="Name"
                  style="min-width:170px"
                  class="q-pl-xs"
                  @update:model-value="onFilterTable"
                  @clear="onFilterTable"
                  @filter="onCustomerGroupFilter"
                  clearable
                />

                <q-space />
                <q-input outlined dense debounce="300" clearable class="q-pl-md" color="primary" v-model="searchReports"  placeholder="Arayınız..."  >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  color="blue-grey-8"
                  icon="archive"
                  label="Excel Oluştur"
                  class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
                  @click="exportReports"

                />
                <q-btn
                  flat
                  color="primary"
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  class=" "
                  size="15.5px"
                />
              </template>

              <template v-slot:body-cell-customers_drivers="props">
                <q-td :props="props">
                  <q-btn flat round color="blue-grey-9" icon="people_alt" size="md" @click="showReservationDrivers(props.value)" />

                </q-td>
              </template>

            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>

  <q-dialog v-model="reservationDriversDialog" full-width >
    <reservation-drivers :drivers="reservationDrivers" @closeDialog="this.reservationDriversDialog = false" />
  </q-dialog>
</template>

<script>
import Chart from 'chart.js/auto';
import {computed,ref} from "vue";
import {useStore} from "vuex";
import ReservationDrivers from "pages/Reservations/Components/ReservationDrivers";
import {Loading} from "quasar";

export default {
  name: "BaseReports",
  setup() {

    const store = useStore();

    const customerGroups = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CustomerGroupsModule/getRecords']))
    })
    const customerGroupOptions = ref(customerGroups.value)



    const reportTabs = [
      {
        id : 1,
        name : 'reservations',
        title : 'Rezervasyonlar',
        disabled : false

      },
      {
        id : 2,
        name : 'reservations',
        title : 'Rezervasyonlar',
        disabled : false

      },

    ]
    const reservationFilterRows = []
    const filterReservationFields =   ref({
      startDateTime : '',
      endDateTime : '',
      group_id : '',
      customer_units_id : '',
      driver_id : '',
      licence_plate : ''
    })
    const reservationColumns = [
      { name: 'LicencePlate', align: 'center', label: 'Plaka', field: 'LicencePlate', sortable: true },
      { name: 'ReservationNo', align: 'center', label: 'Rezervasyon No', field: 'ReservationNo', sortable: true, format: (val) => `#${val}`},
      { name: 'car', align: 'center', label: 'Araç', field: 'car', sortable: true },
      { name: 'CarAttributes', align: 'center', label: 'Nitelik', field: 'CarAttributes', sortable: true },
      { name: 'ReservationStatus', align: 'center', label: 'Statusu', field: 'ReservationStatus', sortable: true },
      { name: 'ReservationType', align: 'center', label: 'Kira Cinsi', field: 'ReservationType', sortable: true },
      { name: 'CustomerGroupName', align: 'center', label: 'Müşteri Grubu', field: 'CustomerGroupName', sortable: true },
      { name: 'UnitName', align: 'center', label: 'Kullanan Birim', field: 'UnitName', sortable: true },
      { name: 'Zimmet', align: 'center', label: 'Yetkili İsim', field: 'Zimmet', sortable: true },
      { name: 'customers_drivers', align: 'center', label: 'Sürücüler', field: 'customers_drivers', sortable: true },
      { name: 'LocationName', align: 'center', label: 'Lokasyon, Bölge', field: 'LocationName', sortable: true },
      { name: 'StartDateTime', align: 'center', label: 'Başlama Tarihi', field: 'StartDateTime', sortable: true },
      { name: 'EndDateTime', align: 'center', label: 'Bitiş Tarihi', field: 'EndDateTime', sortable: true },
      { name: 'RentDays', align: 'center', label: 'Kiralama Gün Sayısı', field: 'RentDays', sortable: true },
      { name: 'TotalPrice', align: 'center', label: 'Kiralama Toplam Ücreti', field: 'TotalPrice', sortable: true },
      { name: 'CurrencySymbol', align: 'center', label: 'Para Birimi', field: 'CurrencySymbol', sortable: true },
    ]

    const onFilterFields  =   ref({
      ReservationType : '',
      ReservationStatus : '',
      CarAttributes : '',
      CustomerGroupName : '',
      UnitName : ''
    });
    const filterWithDates = ref({
      startDate : '',
      startEndDate: '',
      endDate: '',
      endStartDate: ''

    });
    const pagination = {
      rowsPerPage:10
    }
    return   {

      pagination,
      onFilterFields,
      reservationDrivers : ref([]),
      reservationDriversDialog :ref(false),
      visibleColumns: ref([
        'LicencePlate',
        'ReservationNo',
        'car',
        'ReservationStatus',
        'ReservationType',
        'CustomerGroupName',
        'Zimmet',
        'customers_drivers' ,
        'LocationName',
        'StartDateTime',
        'EndDateTime',
        'RentDays',
        'TotalPrice',
        'CurrencySymbol'
      ]),
      reportTabs,
      reportTab : ref(reportTabs[0].name),
      filterReservationFields,
      currencyRates : ref({}),
      reservationFilterRows,
      searchReports : ref(''),
      reservationColumns,
      canvasData: ref([]),
      customerGroupOptions,
      customerGroups,
      filterWithDates,
      onCustomerGroupFilter(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerGroupOptions.value = customerGroups.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },

    }
  },
  created() {
    this.$store.commit('Reports/setterEmptyReservationReports')
    this.$store.dispatch('CustomersModule/get')
  },
  computed : {

    reservationReportRows() {
      return this.$store.getters['Reports/reservationReports']
    }
  },

  methods : {
    showReservationDrivers(value= null) {

      this.reservationDrivers= []
      this.reservationDriversDialog = true

      let driversArr = JSON.parse(value)
      if (driversArr !== null)
      {
        let drivers = []
        driversArr.forEach( e => {
          let customer = this.$store.getters['CustomersModule/getRecord'](e)
          if (customer) drivers.push(customer)

        })
        this.reservationDrivers = drivers
        this.reservationDriversDialog = true

      }

    },
    initCharts(value) {
      let colors = []

      for (var i in  value.dataRanges)  {
        colors.push(this.chartJsRandomColor())
      }

      let myChartArea = document.getElementById('myChart').getContext("2d");

      new Chart(myChartArea, {
        type: 'bar',
        data: {
          labels:value.dataRangesTitle,
          datasets: [{
            data: value.dataRanges,
            backgroundColor: colors,
            hoverOffset: 4,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.yLabel;
                }
              }
            }
          },
          responsive: true,

        }
      });

    },
    chartJsRandomColor() {
      let r = 66 // Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ",0.5)";
    },
    onsubmitFilterReservations() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.filterReservationFields))
      {
        if (v !== null)
          formData.append(k,v)
      }

      this.$store.dispatch('Reports/reservationReportFilterAction',formData).then(res =>{
        if (res === true)
          this.reservationReportRows = this.$store.getters['Reports/reservationReports']
        this.currencyRates = this.$store.getters['Reports/currencyRates']
        this.canvasData = this.$store.getters['Reports/canvas']
        document.querySelector("#repoChartDiv").innerHTML = '<canvas id="myChart" width="150" height="150"></canvas>';
        this.initCharts(this.$store.getters['Reports/canvas'])
      })
    },
    exportReports() {

      let visibleColumnsArray = JSON.parse(JSON.stringify(this.$refs.reservationReportsRows.visibleColumns)) // normal column array
      let visibleColumns = JSON.parse(JSON.stringify(this.$refs.reservationReportsRows.columns))
      let excelColumnLabels = visibleColumns.filter( e => {
        if (visibleColumnsArray.includes(e.field))
          return e
      }).map(e => e.label)

      let  visibleColumnFields = JSON.parse(JSON.stringify(this.visibleColumns))

      let rows = JSON.parse(JSON.stringify(this.$refs.reservationReportsRows.rows))

      let exportData =   rows.map( function (e) {
        return Object.keys(e).filter((key) => visibleColumnFields.includes(key)).reduce( (cur, key) => {
          return Object.assign(cur, {[key] : e[key]})
        },{})
      });


      // get drivers on excel
      let customers = this.$store.getters['CustomersModule/getRecords']
      let rowNewData =   exportData.map((e,i) => {
        if (e.customers_drivers !== null) {
          let drivers_names = ''
          let drivers = JSON.parse(e.customers_drivers)
          drivers.forEach(d => {
            const  driver = customers.find(c => +c.id === d)
             if (driver) drivers_names += driver.Name.toUpperCase()+' '+driver.Surname.toUpperCase()+' , '
          });
           e.customers_drivers = drivers_names.slice(0,-2)
        }
        return e
      })



      let formData = new FormData();
      formData.append('headings',JSON.stringify(excelColumnLabels))
      formData.append('rows',JSON.stringify(rowNewData))

      this.$store.dispatch('Reports/reservationReportExportAction',formData)

    },

    onFilterTable() {

      Loading.show({message :'İşleniyor...'})
      let result = []
      let filter = {...this.onFilterFields}
      let reservationRows = this.$store.getters['Reports/reservationReportsCopy']

      result = reservationRows.filter( e => {
        for (let k in filter) {
          if (filter[k] && e[k] !== filter[k])
            return false
        }
        return  true
      })
      setTimeout(() => {
        Loading.hide()
      },1000)
      this.$store.commit('Reports/setterReservationReportByFilter',result)

    },
    onsubmitFilterReservationsWithDate(e){
      e.preventDefault()
      let formData = new FormData()
      for (const [k,v] of Object.entries(this.filterWithDates))
      {
        if ( v !== '' && v !== null)
        {
          formData.append(k,v)
        }
      }
      this.$store.dispatch('Reports/reservationReportWithDateFilterAction',formData).then(res =>{
        if (res === true)
          this.reservationReportRows = this.$store.getters['Reports/reservationReports']
        this.currencyRates = this.$store.getters['Reports/currencyRates']
        this.canvasData = this.$store.getters['Reports/canvas']
        document.querySelector("#repoChartDiv").innerHTML = '<canvas id="myChart" width="150" height="150"></canvas>';
        this.initCharts(this.$store.getters['Reports/canvas'])
      })
    }

  },
  components : {
    ReservationDrivers
  }
}
</script>

<style scoped lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 610px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #98fbff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
