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
              <div class="text-subtitle1">Rezervasyon Makbuz Raporlama Modülu</div>
              <div class="text-subtitle2">
                Bu kısımda bu güne kadar kayıt edilen rezervasyon makbuzları detaylı  raporlamaları yapılabilmektedir.
              </div>

            </q-banner>

          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-form
              @submit="onsubmitFilterReservations"

              class="q-gutter-md  "
            >
              <div class="row q-card--bordered q-pa-sm bg-grey-2">
                <div class="text-subtitle2 text-bold q-ml-sm">Filtreleme Formu</div>

                <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
                <div class="col-3  q-pa-xs">
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
                <div class="col-3  q-pa-xs">
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

                <div class="col-3 q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Rezervasyon Numarası</div>
                  <q-input
                    type="text"
                    outlined
                    dense
                    placeholder="Opsionel"
                    bg-color="white"
                    v-model="filterReservationFields.ReservationNo"
                    clearable
                  />
                </div>

                <div class="col-3 q-pa-xs">
                  <div class="text-subtitle2 text-grey-8">Fatura Numarası</div>
                  <q-input
                    type="text"
                    outlined
                    dense
                    placeholder="Opsionel"
                    bg-color="white"
                    v-model="filterReservationFields.InvoiceNo"
                    clearable
                  />
                </div>
                <div class="col-8 q-pa-xs">
                </div>
                <div class="col-4 q-pa-xs q-mt-lg text-right">
                  <div class="row">
                    <div class="col-6 q-pr-xs">
                    </div>
                    <div class="col-6 q-pr-xs">
                      <q-btn  class="full-width" label="FILTRELE" icon="search" type="submit" color="blue-grey-8"/>

                    </div>
                    <!--                    <div class="col-6 q-p">-->
                    <!--                      <q-btn  @click="this.$store.dispatch('Reports/collectiveReportsMailDownload')" class="full-width" label="İndir" icon="archive" type="button" color="primary" >-->
                    <!--                        <q-tooltip class="bg-blue-grey-8 text-white">-->
                    <!--                          Günlük Gönderilecek Raporları İndir.-->
                    <!--                        </q-tooltip>-->
                    <!--                      </q-btn>-->

                    <!--                    </div>-->
                  </div>
                </div>
              </div>

            </q-form>
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
              :rows="invoiceReportRows"
              :columns="invoiceColumns"
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
                  :options="invoiceColumns"
                  option-value="name"
                  option-label="label"
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
              <template v-slot:body-cell-ReservationStatus="props">
                <q-td :props="props">
                  <q-chip square :color="reservationStatusColor(props.value).color" text-color="white" :icon="reservationStatusColor(props.value).icon">
                    {{reservationsStatus(props.value)}}
                  </q-chip>
                </q-td>

              </template>
              <template v-slot:body-cell-reservation_id="props">
                <q-td :props="props">
                  <q-btn flat round color="blue-grey-9" icon="dashboard_customize" size="md"
                         @click="invoiceManage(props.value)" >
                    <q-tooltip class="bg-blue-grey-8 text-white">
                      Rezervasyon Evrak Yönetimi.<br>
                      Sözleşme / Fatura / Makbuz
                    </q-tooltip>
                  </q-btn>
                </q-td>

              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
  <q-dialog v-model="invoiceManageDialog" persistent>
    <q-card style="width: 600px">
      <q-bar style="height: 50px">
        <div>Rezervasyon Evrak Yönetimi</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>

        <div class="row bg-grey-2 q-pl-md q-pr-md" >
          <div class="col-12 q-pb-xs">
            <div class="text-subtitle2 text-bold">Fatura Bilgileri</div>
            <q-separator color="grey-5"  />
          </div>
          <div class="col-1  flex flex-center">
            <q-icon name="assignment" size="lg" color="blue-grey-6" />
          </div>
          <div class="col-4 q-pl-sm">
            <div class="text-subtitle1 text-left  "> Fatura</div>
            <div class="text-subtitle2 text-left text-bold flex" style="margin-top: -5px">
              **** - <span>{{ invoiceManageFields.InvoiceNo}}</span>
            </div>
          </div>

          <div class="col-7 text-right">
            <q-btn
              icon="published_with_changes"
              color="blue-grey-8"
              fab
              flat
              @click="editInvoiceNumber(invoiceManageFields.InvoiceID,invoiceManageFields.InvoiceNo)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white" >
                Fatura Numarasını Yenile
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="mark_email_read"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/sendReservationInvoiceToMail',invoiceManageFields.InvoiceID)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Müşteriye  Mail Gönder
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="cloud_download"
              color="blue-grey-8"
              fab flat
              @click="this.$store.dispatch('Reservations/downloadInvoice',invoiceManageFields.InvoiceID)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura İndir
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="print"
              color="blue-grey-8"
              fab flat
              @click="this.$store.dispatch('Reservations/printInvoice',invoiceManageFields.InvoiceID)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura Yazdır
              </q-tooltip>
            </q-btn>
          </div>
        </div>

        <div class="row q-mt-sm bg-grey-2 q-pl-md q-pr-md" >
          <div class="col-12 q-pb-xs">
            <div class="text-subtitle2 text-bold ">Makbuz / Tahsilat Bilgileri</div>
            <q-separator color="grey-5"  />
          </div>
          <div class="col-1  flex flex-center">
            <q-icon name="description" size="lg" color="blue-grey-6" />
          </div>
          <div class="col-5 q-pl-sm">
            <div class="text-subtitle1 text-left  "> Makbuz / Tahsilat</div>
            <div class="text-subtitle2 text-left text-bold" style="margin-top: -5px">
              ****  -<span>{{invoiceManageFields.ReceiptCollectionNo}} </span>
            </div>
          </div>

          <div class="col-6 text-right">
            <q-btn
              icon="published_with_changes"
              color="blue-grey-8"
              fab
              flat
              @click="editReceiptNumber(invoiceManageFields.ReceiptID,invoiceManageFields.ReceiptCollectionNo)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Makbuz Numarasını Yenile
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="mark_email_read"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/sendReservationReceiptToMail',invoiceManageFields.ReceiptID)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Müşteriye  Mail Gönder
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="cloud_download"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/downloadReceipt',invoiceManageFields.ReceiptID)"
            >

              <q-tooltip class="bg-blue-grey-8 text-white">
                Makbuz / Tahsilat PDF İndir
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="print"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/printReceipt',invoiceManageFields.ReceiptID)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Makbuz / Tahsilat Yazdır
              </q-tooltip>
            </q-btn>
          </div>

        </div>

        <div class="row q-mt-sm bg-grey-2 q-pl-md q-pr-md" >
          <div class="col-12 q-pb-xs">
            <div class="text-subtitle2 text-bold ">Sözleşme Bilgileri</div>
            <q-separator color="grey-5"  />
          </div>
          <div class="col-1  flex flex-center">
            <q-icon name="receipt_long" size="lg" color="blue-grey-6" />
          </div>
          <div class="col-5 q-pl-sm">
            <div class="text-subtitle1 text-left  "> Sözleşme</div>
            <div class="text-subtitle2 text-left text-bold" style="margin-top: -5px">
              **** -  {{ invoiceManageFields.ReservationNo }}
            </div>
          </div>

          <div class="col-6 text-right">
            <q-btn
              icon="published_with_changes"
              color="blue-grey-8"
              fab
              flat
              @click="editReservationNumber(invoiceManageFields.reservation_id,invoiceManageFields.ReservationNo)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Sözleşme Numarasını Yenile
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="mark_email_read"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/sendReservationAgreementToMail',invoiceManageFields.reservation_id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Müşteriye  Mail Gönder
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="cloud_download"
              color="blue-grey-8"
              fab
              flat
              @click="this.$store.dispatch('Reservations/getReservationAgreement',invoiceManageFields.reservation_id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Sözleşme PDF İndir
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="print"
              color="blue-grey-8"
              fab flat
              @click="this.$store.dispatch('Reservations/printAgreement',invoiceManageFields.reservation_id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Sözleşme Yazdır
              </q-tooltip>
            </q-btn>
          </div>

        </div>

      </q-card-section>

    </q-card>
  </q-dialog>

  <q-dialog v-model="updateInvoiceNumberDialog" persistent>
    <q-card style="width: 450px">
      <q-bar style="height: 50px">
        <div>Fatura Numara Yenileme</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <div class="text-subtitle2 text-bold text-grey-8">
              Fatura Numarası
            </div>
          </div>
        </div>
        <div class="row">
          <q-form @submit="onUpdateInvoice"  class="col-12">
            <div class="col-12">
              <q-input
                :lazy-rules="true"
                :rules="[val => val && val.length > 0  || 'Lütfen istenilen bilgileri giriniz']"
                dense
                outlined
                v-model="invoiceNumberEditFields.InvoiceNo"
              />
            </div>
            <div class="col-12 text-right">
              <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
            </div>
          </q-form>
        </div>
      </q-card-section>


    </q-card>
  </q-dialog>

  <q-dialog v-model="updateReceiptNumberDialog" persistent>
    <q-card style="width: 450px">
      <q-bar style="height: 50px">
        <div>Makbuz Numarasını Yenileme</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <div class="text-subtitle2 text-bold text-grey-8">
              Makbuz Numarası
            </div>
          </div>
        </div>
        <div class="row">
          <q-form @submit="onUpdateReceipt"  class="col-12">
            <div class="col-12">
              <q-input
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                dense
                outlined
                v-model="receiptNumberEditFields.ReceiptCollectionNo"
              />
            </div>
            <div class="col-12 text-right">
              <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
            </div>
          </q-form>
        </div>
      </q-card-section>


    </q-card>
  </q-dialog>

  <q-dialog v-model="updateReservationNumberDialog" persistent>
    <q-card style="width: 450px">
      <q-bar style="height: 50px">
        <div>Rezervasyon Numarasını Yenileme</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <div class="text-subtitle2 text-bold text-grey-8">
              Rezervasyon Numarası
            </div>
          </div>
        </div>
        <div class="row">
          <q-form @submit="onUpdateReservationNumber"  class="col-12">
            <div class="col-12">
              <q-input
                :lazy-rules="true"
                :rules="[ val => val.length > 0 || 'Zorunlu alan']"
                dense
                outlined
                v-model="reservationNumberEditFields.ReservationNo"
              />
            </div>
            <div class="col-12 text-right">
              <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
            </div>
          </q-form>
        </div>
      </q-card-section>


    </q-card>
  </q-dialog>
</template>

<script>
import {computed,ref} from "vue";
import {useStore} from "vuex";
import {Loading} from "quasar";

export default {
  name: "BaseReports",
  setup() {

    const store = useStore();

    const customerGroups = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CustomerGroupsModule/getRecords']))
    })
    const customerGroupOptions = ref(customerGroups.value)


    const reservationFilterRows = []
    const filterReservationFields =   ref({
      startDateTime : ref(''),
      endDateTime : ref(''),
      ReservationNo: ref(''),
      InvoiceNo: ref('')
    })
    const invoiceColumns =   [
      { name: 'InvoiceNo', align: 'center', label: 'Fatura Numarası', field: 'InvoiceNo', sortable: true, format: val => `#${val}` },
      { name: 'Pieces', align: 'center', label: 'Miktar', field: 'Pieces', sortable: true },
      { name: 'VatRate', align:'center', label: 'KDV Oranı', field: 'VatRate' },
      { name: 'VatTotal', align:'center', label: 'KDV Tutarı', field: 'VatTotal', format: val => `${val} TL` },
      { name: 'UnitPrice', align:'center', label: 'Birim Fiyatı', field: 'UnitPrice' ,format: val => `${val} TL` },
      { name: 'Total', align:'center', label: 'Toplam', field: 'Total' ,format: val => `${val} TL` },
      { name: 'ReservationNo', align: 'center', label: 'Rezervasyon Numarası', field: 'ReservationNo', sortable: true, format: val => `#${val}` },
      { name: 'ReceiptCollectionNo', align: 'center', label: 'Makbuz Numarası', field: 'ReceiptCollectionNo', sortable: true, format: val => `#${val}` },
      { name: 'customer', align:'center', label: 'Müşteri', field: 'customer'  },
      { name: 'ParentReservationNo', align:'center', label: 'Bağlı Olduğu Rezervasyon', field: 'ParentReservationNo' , format: val => (val!==null && val!=='') ? `#${val}`:'' },
      { name: 'ReservationStatus', align:'center', label: 'Durumu', field: 'ReservationStatus',sortable: true },
      { name: 'StartDateTime', align:'center', label: 'Oluşturma Tarih', field: 'StartDateTime',sortable: true },
      { name: 'reservation_id', align:'center', label: 'Aksiyonlar', field: 'reservation_id',sortable: true },
    ]
    const onFilterFields  =   ref({
      ReservationType : '',
      ReservationStatus : '',
      CarAttributes : '',
      CustomerGroupName : '',
      UnitName : ''
    });

    const pagination = {
      rowsPerPage:10
    }
    return   {

      pagination,
      onFilterFields,
      reservationDrivers : ref([]),
      reservationDriversDialog :ref(false),
      invoiceManageDialog : ref(false),
      updateInvoiceNumberDialog : ref(false),
      updateReceiptNumberDialog : ref(false),
      updateReservationNumberDialog : ref(false),
      visibleColumns: ref([
        'InvoiceNo',
        'Pieces',
        'VatRate',
        'VatTotal',
        'UnitPrice',
        'Total',
        'ReservationNo',
        'ReceiptCollectionNo',
        'customer',
        'ReservationStatus',
        'ParentReservationNo',
        'StartDateTime',
        'reservation_id'
      ]),
      filterReservationFields,
      currencyRates : ref({}),
      reservationFilterRows,
      searchReports : ref(''),
      invoiceColumns,
      canvasData: ref([]),
      customerGroupOptions,
      customerGroups,
      invoiceManageFields : ref({
        reservationId : ''
      }),
      invoiceNumberEditFields : ref({
        id : '',
        InvoiceNo : ''
      }),
      receiptNumberEditFields : ref({
        id : '',
        ReceiptCollectionNo : ''
      }),
      reservationNumberEditFields : ref({
        id : '',
        ReservationNo : ''
      }),
      onCustomerGroupFilter(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerGroupOptions.value = customerGroups.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },

    }
  },
  computed : {
    reservationStatus(){
      return this.$store.getters['MainModule/getReservationStatus']
    },
   invoiceReportRows() {
      return this.$store.getters['ReservationInvoices/invoiceGetter']
    }
  },

  methods : {

    onsubmitFilterReservations() {
      let formData = new FormData();

      for (const [k,v] of Object.entries(this.filterReservationFields))
      {
        if (v !== null && v !== ''){
          formData.append(k,v)
        }

      }
      this.$store.dispatch('ReservationInvoices/get',formData).then(res =>{
        if (res === true)
          this.reservationReportRows = this.$store.getters['ReservationInvoices/invoiceGetter']
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


      let newRows = rows.map( obj => ({
        ...obj,
        ReservationStatus: this.reservationStatus.find(b => b.code === obj.ReservationStatus).title
      }))

      let exportData =   newRows.map( function (e) {
        return Object.keys(e).filter((key) => visibleColumnFields.includes(key)).reduce( (cur, key) => {
          return Object.assign(cur, {[key] : e[key]})
        },{})
      });
      exportData.forEach(obj => {
       delete obj['reservation_id']
     });
      let newExcelColumnLabels = excelColumnLabels.filter(e => e !== 'Aksiyonlar')

      let formData = new FormData();
      formData.append('headings',JSON.stringify(newExcelColumnLabels))
      formData.append('rows',JSON.stringify(exportData))
      this.$store.dispatch('Reports/reservationReportExportAction',formData)
    },

    // for reservation status style and show
    reservationStatusColor(status) {
      switch (status)
      {
        case 'WaitingForApproval' :
          return {
            color : 'secondary',
            icon : 'query_builder'
          }
        case 'Continues' :
          return {
            color : 'blue-9',
            icon : 'av_timer'
          }
        case 'Cancelled' :
          return {
            color : 'negative',
            icon : 'highlight_off'
          }
        case 'Completed' :
          return {
            color : 'blue-grey-8',
            icon : 'verified_user'
          }
      }
    },
    reservationsStatus(status) {
      return this.reservationStatus.find(e => {
        return  e.code === status
      }).title
    },

    // Edit invoice reservation and recipe numbers
    invoiceManage(reservationId) {
      this.invoiceManageFields = {}
      this.invoiceManageDialog = true

      let invoice = this.invoiceReportRows.find(e => +e.reservation_id === +reservationId)
     // invoice edit fields
      this.invoiceManageFields.InvoiceID = invoice.id
      this.invoiceManageFields.InvoiceNo = invoice.InvoiceNo
     // Recipe edit fileds
      this.invoiceManageFields.ReceiptID = invoice.ReceiptID
      this.invoiceManageFields.ReceiptCollectionNo = invoice.ReceiptCollectionNo
     // reservation edit files
      this.invoiceManageFields.reservation_id = invoice.reservation_id
      this.invoiceManageFields.ReservationNo = invoice.ReservationNo

    },
    editInvoiceNumber(invoiceId,invoiceNo) {
      this.updateInvoiceNumberDialog = true
      this.invoiceNumberEditFields.id = invoiceId
      this.invoiceNumberEditFields.InvoiceNo = invoiceNo
    },
    editReceiptNumber(ReceiptID,ReceiptCollectionNo) {
      this.updateReceiptNumberDialog = true
      this.receiptNumberEditFields.id = ReceiptID
      this.receiptNumberEditFields.ReceiptCollectionNo = ReceiptCollectionNo
    },
    editReservationNumber(ReservationId,ReservationNo) {
      this.reservationNumberEditFields.ReservationNo = ''
      this.reservationNumberEditFields.id = ''
      this.updateReservationNumberDialog = true
      this.reservationNumberEditFields.id = ReservationId
      this.reservationNumberEditFields.ReservationNo = ReservationNo
    },
    onUpdateInvoice() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.invoiceNumberEditFields))
      {
        formData.append(k,v)
      }
      this.$store.dispatch('ReservationInvoices/invoiceNumberUpdateAtReport',formData).then(res => {
        if ( res === true)
        {
          this.updateInvoiceNumberDialog = false
          this.invoiceManageDialog = false
        }
      })
    },
    onUpdateReceipt() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.receiptNumberEditFields))
      {
        formData.append(k,v)
      }
      this.$store.dispatch('ReservationInvoices/receiptNumberUpdateAtReport',formData).then(res => {
        if ( res === true)
        {
          this.updateReceiptNumberDialog = false
          this.invoiceManageDialog = false
        }
      })
    },
    onUpdateReservationNumber() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.reservationNumberEditFields))
      {
        formData.append(k,v)
      }
      this.$store.dispatch('ReservationInvoices/reservationNumberUpdate',formData).then(res => {
        if ( res === true)
        {
          this.updateReservationNumberDialog = false
          this.invoiceManageDialog = false

        }
      })
    },



  },

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
