<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true" full-width>
    <q-card class="q-dialog-plugin"  style="width: 1200px !important;">
      <q-bar style="height: 50px" class="bg-blue-grey-8 text-white">
        <div>Rezervasyon Güncelle | {{pickup_office_id}}</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup >
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="   q-pa-none q-pl-sm q-pr-sm q-pt-sm">
        <q-form @submit="onSubmitUpdatedReservation">
          <div class="row">

            <div class="col-3  q-pa-sm"  >
              <div class="text-subtitle2 text-bold text-grey-8"> Teslim Alma Yeri  </div>
              <q-select
                v-model="pickup_location"
                :options="this.$store.getters['OfficeModule/getRecords']"
                outlined
                dense
                :option-label="(items) => items.OfficeName"
                option-value="id"
                emit-value
                map-options
                use-input
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                menu-anchor="bottom start"

              >
                <template v-slot:prepend  >
                  <q-icon name="o_location_on" @click.stop />
                </template>
              </q-select>
            </div>
            <div class="col-3  q-pa-sm"  >
              <div class="text-subtitle2 text-bold text-grey-8"> Teslim Edilecek Yer  </div>
              <q-select
                v-model="drop_location"
                :options="this.$store.getters['OfficeModule/getRecords']"
                outlined
                dense
                :option-label="(items) => items.OfficeName"
                option-value="id"
                emit-value
                map-options
                use-input
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                menu-anchor="bottom start"
              >
                <template v-slot:prepend>
                  <q-icon name="o_location_on" @click.stop />
                </template>
              </q-select>
            </div>
            <div class="col-3 q-pa-sm">
              <div class="text-subtitle2 text-bold text-grey-8">Teslim Alınacak Tarih </div>
              <q-input
                dense
                square
                outlined
                v-model="formFields.StartDateTime"
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                disable
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        calendar="gregorian"
                        v-model="formFields.StartDateTime"
                        :model-value="formFields.StartDateTime"
                        :options="checkMinDate"
                        mask="YYYY-MM-DD HH:mm"
                        minimal
                        :locale="this.$store.getters['MainModule/getDateTimeLocale']"

                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Kapat" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:after>
                  <q-btn icon="access_time" class="full-height" outline color="grey-6">
                    <q-popup-proxy  cover transition-show="scale" transition-hide="scale">
                      <q-time
                        v-model="formFields.StartDateTime"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                        disable
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Kapat" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="col-3 q-pa-sm">
              <div class="text-subtitle2 text-bold text-grey-8">Teslim Edilecek Tarih </div>
              <q-input
                dense
                square
                outlined
                v-model="formFields.EndDateTime"
                :lazy-rules="true"
                :option="checkMinEndDate"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formFields.EndDateTime"
                        mask="YYYY-MM-DD HH:mm"
                        :options="checkMinEndDate"
                        minimal
                        :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                        @update:model-value="onChangeEndDateTime"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Kapat" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:after>
                  <q-btn icon="access_time" class="full-height" outline color="grey-6">
                    <q-popup-proxy   cover transition-show="scale" transition-hide="scale">
                      <q-time
                        @update:model-value="onChangeEndTime"
                        v-model="formFields.EndDateTime" mask="YYYY-MM-DD HH:mm" format24h >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Kapat" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-btn>
                </template>

              </q-input>
            </div>

            <div class="col-6  q-pa-sm"  >
              <div class="text-subtitle2 text-grey-8"> Rezervasyon Yetkili Kişi  </div>
              <q-select
                v-model="formFields.customers_id"
                :options="customerOptions"
                outlined
                dense
                :option-label="(items) => items.length !== 0 ? items.Name + ' '+items.Surname : items.Name "
                option-value="id"
                emit-value
                map-options
                use-input
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                @filter="onFilterCustomers"
                hide-bottom-space
                menu-anchor="bottom start"
                clearable
              >
                <template v-slot:after>
                  <q-btn icon="add" class="full-height" outline color="grey-6" @click="newFormDialog = true"  >
                    <q-tooltip class="bg-blue-grey-8 text-white">
                      Yeni Müşteri Kaydı Oluştur.
                    </q-tooltip>
                  </q-btn>
                </template>
              </q-select>
            </div>
            <div class="col-6  q-pa-sm"   v-show="!showCustomerDrivers">
              <div class="text-subtitle2 text-grey-8"> Kullanacak Kişiler </div>
              <q-select
                v-model="formFields.reservation_drivers"
                :options="customerDriversOptionsByType"
                outlined
                dense
                :option-label="(items) => items.length !== 0 ? items.Name + ' '+items.Surname  : items.Name"
                option-value="id"
                emit-value
                map-options
                input-debounce="0"
                use-input
                hide-bottom-space
                @filter="onFilterCustomerOfficialDrivers"
                clearable
                multiple
                use-chips
                menu-anchor="bottom start"
              >

                <template v-slot:after>
                <q-btn icon="add" class="full-height" outline color="grey-6"  @click="newFormDialog = true"  >
                    <q-tooltip class="bg-blue-grey-8 text-white">
                       Yeni Kullanıcı Kaydı Oluştur.
                   </q-tooltip>
               </q-btn>
               </template>
              </q-select>
            </div>

            <div class="col-4 q-pa-sm">
              <div class="text-subtitle2 text-grey-8"> Ödeme Yöntemi  </div>
              <q-select
                v-model="formFields.PaymentMethod"
                :options="this.$store.getters['MainModule/getReservationPaymentMethods'].filter(arr => arr.code !== 'CreditCartOnOffice')"
                outlined
                dense
                :option-label="(items) => items.title"
                option-value="code"
                emit-value
                map-options
                use-input
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                @update:model-value="onSelectedPaymentMethod"
              >
                <template v-slot:prepend>
                  <q-icon name="account_balance_wallet" @click.stop />
                </template>
              </q-select>
            </div>
            <div class="col-2 q-pa-sm" v-show="formFields.EndDateTime.toString().length>0">
              <div class="text-subtitle2 text-bold text-grey-8"> Günlük Ücret</div>
              <q-input
                dense
                outlined
                v-model="formFields.DailyRentPrice"
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                readonly
              >
                <template v-slot:append>
                  {{oldReservation.CurrencySymbol}}
                </template>
              </q-input>
            </div>
            <div class="col-2 q-pa-sm" v-show="formFields.EndDateTime.toString().length>0">
              <div class="text-subtitle2 text-bold text-grey-8">Toplam Ücreti</div>
              <q-input
                dense
                outlined
                v-model="formFields.TotalRentPrice"
                :lazy-rules="true"
                :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                hide-bottom-space
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                readonly
              >
                <template v-slot:append>
                  {{oldReservation.CurrencySymbol}}
                </template>
              </q-input>
            </div>

            <div class="col-4  q-pa-sm" v-show="showPayReceiptNo">
                <div class="text-subtitle2 text-grey-8"> Belge Numarası </div>
                <q-input
                  v-model="formFields.PayReceiptNo"
                  dense
                  outlined
                  :lazy-rules="false"
                  :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  :disable="!showPayReceiptNo"

                />
            </div>

          </div>
          <div class="row">
            <div class="col-6 q-pa-sm" >
              <q-expansion-item
                group="somegroups"
                label="Ekstra Hizmetler"
                default-opened
                class="overflow-hidden "
                style="border-radius: 5px"
                header-class="text-primary bg-grey-2 text-subtitle2 "

              >
                <q-card>
                  <q-card-section class="q-pa-none">
                    <q-table
                      dense
                      :rows="extraServicesRow"
                      :columns="CarExtrasReservationColumns"
                      row-key="id"
                      selection="multiple"
                      class="no-box-shadow q-pa-none "
                      @update:selected="onSelectedExtraServices"
                      v-model:selected="extraServicesSelected"
                      hide-bottom
                      hide-header
                    >
                      <template v-slot:body="props" >
                        <q-tr :props="props" :key="props.row.index" class="text-center">
                          <q-td>  <q-checkbox :disable="checkSelectedExtraServices(props.row.id)" v-model="props.selected" color="teal" /> </q-td>
                          <q-td> {{props.row.Name}}</q-td>
                          <q-td> {{ (props.row.Price) ? props.row.Price+" TL" : ''}}  </q-td>
                          <q-td > {{props.row.Description !== 'null' ? props.row.Description : '' }}</q-td>
                        </q-tr>
                      </template>

                    </q-table>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
            <div class="col-6 q-pa-sm">

              <div class="col-12   q-pa-md bg-blue-2  q-pa-sm" style="  border-radius: 3%"  >
                <div class="text-subtitle2  "> <q-icon  name="account_balance"  size="sm"/> {{formFields.RentDays}} Günlük <b>{{formFields.CurrencySymbol}}</b> döviz kuru : 1 <b>{{formFields.CurrencySymbol}}</b> = {{parseFloat(formFields.CurrencyRate).toFixed(2)}} (TL) </div>
              </div>
              <div class="col-12  q-pa-md bg-green-2  q-pa-sm q-mt-sm" style="  border-radius: 3%">
                <div class="text-subtitle2  ">
                  <q-icon  name="o_info"  size="sm"/> Aracın TL  bazındeki günlük ücreti: {{parseFloat(formFields.RealDailyRentPrice).toFixed(2)}} (TL) </div>
              </div>
              <div class="row  q-mt-sm">

                <div class="col-12 q-pa-sm">

                  <div class="text-subtitle2  text-bold text-grey-9" >Kira Gün Toplamı:
                    <span class="float-right">  {{this.formFields.newRentDays > 0 ? this.formFields.newRentDays : this.formFields.RentDays }} Gün</span>
                  </div>
                  <div class="text-subtitle2  text-bold text-grey-9" >Günlük Ücreti:
                    <span class="float-right"> {{parseFloat(formFields.DailyRentPrice).toFixed(2)}}  {{formFields.CurrencySymbol}}</span>
                  </div>
                  <div class="text-subtitle2  text-bold text-grey-9" >Toplam Araç Kiralama Ücreti:
                    <span class="float-right" >  {{formFields.TotalRentPrice}}  {{formFields.CurrencySymbol}}</span>
                  </div>
                  <div class=" q-pa-none"  v-for="( e,i ) in formFields.ExtraServices" :key="i">

                    <div class=" text-subtitle2 text-grey-9">
                      {{e.Name}}: {{e.CalculateType === "DependsOnHalfPrice" ? "("+ formFields.RentDays + ' Gün)' : '' }}

                      <!--                  {{newFormFields.RentDays}}-->
                      <span class="float-right"> {{e.Price }} <span class="q-ml-xs q-mr-xs"> {{formFields.CurrencySymbol}}</span></span>
                    </div>
                  </div>

                </div>
                <div class="col-12 q-pa-sm">
                  <div class="text-h6 text-bold text-blue-grey-8">Önceki Toplam Tutar:
                  <div class="float-right">
                    <span :class="[ formFields.ExtendedDate ? 'q-ml-md text-strike text-grey-5 ' : 'q-ml-md ']">{{parseFloat(reservation.TotalPrice).toFixed(2)}} {{reservation.CurrencySymbol}}</span>
                    <span class="q-ml-sm " v-show="formFields.ExtendedDate"> {{parseFloat(formFields.TotalPrice).toFixed(2)}} {{formFields.CurrencySymbol}}</span>
                  </div>
                  </div>
                  <div class="text-h6 text-bold text-blue-grey-8">Toplam Ödenecek Tutar:
                    <span class="float-right" > {{ formFields.newTotalPrice  }} {{formFields.CurrencySymbol}}</span>
                  </div>
                  <div class="text-subtitle1  text-bold text-green-8" v-show="formFields.CurrencySymbol !=='₺' ">Alınacak TL Tutarı:
                    <span class="q-ml-md ">{{parseFloat(formFields.TotalPriceByCurrency).toFixed(2)}} TL</span>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="blue-grey-9" label="Kaydet" @click="onOKClick" />
        <q-btn color="primary" label="İptal Et" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog   v-model="newFormDialog" persistent >
    <q-card style="min-width: 1000px" >
      <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
        <div class="text-h4" >Yeni Müşteri Kaydı </div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <new-customer-form @closeCustomerDialog="addedNewCustomer" />
    </q-card>
  </q-dialog>

</template>

<script>
import {ref,computed} from "vue";
import { useStore } from "vuex";
import { date } from "quasar"

import NewCustomerForm from "pages/Users/Components/NewCustomerForm";

const CarExtrasReservationColumns = [
  { name: 'Name', align: 'center', label: 'Hizmet Adı', field: 'Name', sortable: true },
  { name: 'Price', align: 'center', label: 'Ücreti', field: 'Price', sortable: false },
  { name: 'Description', align: 'center', label: 'Hizmet Açıklaması', field: 'Description', sortable: false },
  // { name: 'id', align:'center', label: '', field: 'id' },
];
const getTodayDateTime = () => {
  // let todayDate = new Date();
  let minDate =  date.subtractFromDate(new Date(),{days:1}) ;
  let today = date.addToDate(minDate,{days:1});

  let   currentMonth =  ((minDate.getMonth()+1).toString().length === 1) ? "0"+(minDate.getMonth()+1) : (minDate.getMonth()+1)

  let   currentDay = (minDate.getDate().toString().length === 1) ? "0"+minDate.getDate() : minDate.getDate()
  let   currentHours = minDate.getHours()
  let   currentMin = minDate.getMinutes()
  let   currentYear = minDate.getFullYear()


  let todayMonth = ((today.getMonth()+1).toString().length === 1) ? "0"+(today.getMonth()+1) : (today.getMonth()+1)
  let todayDay = today.getDate().toString().length === 1  ? "0"+today.getDate() : today.getDate()
  return {
    startDateTime : today.getFullYear() + '-' + todayMonth + '-' + todayDay  + ' ' + today.getHours() + ':' + today.getMinutes(),
    currentTime : currentYear + "-"+ currentMonth +"-"+currentDay  +" "+ currentHours +":"+currentMin,
    currentMonth: currentMonth,
    currentDay: currentDay,
    currentHours: currentHours,
    currentMin: currentMin,
    currentYear: currentYear,
  };

}
export default {
  props: {
    reservation : {
      require:true,
      type : Object
    }
  },
  components: {
    NewCustomerForm,
  },

  setup(){
    const store = useStore();
    const customers = computed(() => {
      return  JSON.parse(JSON.stringify(store.getters['CustomersModule/getRecords']))
    })
    const customerOptions = ref(customers.value)
    const customerGroups = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CustomerGroupsModule/getRecords']))
    })
    const customerGroupOptions = ref(customerGroups.value)

    const customersByTypes = computed(() => {
      return  JSON.parse(JSON.stringify(store.getters['CustomersModule/getRecordByCustomerType']))
    })
    const customerDriversOptionsByType = ref(customersByTypes.value)

    const customerDrivers = ref([])
    const customerDriverOptions = ref([])
    const extraServicesSelected = ref([])
    return {
      customerDrivers,
      customerDriverOptions,
      customers,
      customerOptions,
      customerGroupOptions,
      customerGroups,
      date,
      CarExtrasReservationColumns,
      extraServicesSelected,
      customersByTypes,
      customerDriversOptionsByType,
      groupDialogCreate: ref(false),
      newFormDialog: ref(false),
      showCustomerDrivers: ref(false),
      addNewDriversDialog: ref(false),
      showPayReceiptNo: ref(false),
      oldReservation : ref({}),
      invoiceChecked: ref(false),
      formFields: ref({
        reservation_id: '',// zorunlu
        ReservationNo: '',
        StartDateTime : '', // zorunlu
        EndDateTime : '', // zorunlu
        RentDays : 0, // zorunlu
        DailyRentPrice : '', // zorunlu
        reservation_drivers : [], // zorunlu
        CurrencyRate : '', // zorunlu
        RealDailyRentPrice : 0, // zorunlu
        CurrencySymbol : '', //
        TotalRentPrice : '', // zorunlu
        TotalPrice : 0,
        TotalPriceByCurrency : 0,
        customer_groups_id : '',
        ReservationRentType : 'Corporate',
        PayReceiptNo: '',
        PaymentMethod: '',
        pickup_office_id: '',
        drop_office_id : '',
        TransactionNo: '',
        customers_id : '',
        cars_id : '',
        SelectedPriceTitle : '',
        OrgDailyRentPrice : 0,
        ExtraServices : [],
        TotalExtraServicesPrice : 0,
        ReservationType : '',
        CurrencyType : '',
        PaymentState : '',
        ReservationRemarks : '',
        ExtendedDate: false,
        newTotalPrice: 0,
        newRentDays: 0,
        newTotalExtraServicesPrice: 0,
        newTotalPriceByCurrency: 0,
        newTotalRentPrice: 0
      }),
      renewReservationDateFields : ref({
        minMonthYear : '',
        maxMonthYear : ''
      }),
      renewReservationDateRanges: ref({ from: '2020/07/08', to: '2020/07/17' }),
      onFilterCustomers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()

          customerOptions.value = customers.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomerDrivers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerDriverOptions.value = customerDrivers.value.filter(v => v.DriverName.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomerOfficialDrivers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerDriversOptionsByType.value = customersByTypes.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
    }
  },

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],

  methods: {
    checkMinDate (date) {
      return date >= getTodayDateTime().currentYear+"/"+getTodayDateTime().currentMonth+"/"+getTodayDateTime().currentDay
    },
    checkMinEndDate(date) {

     const startDate = this.reservation.EndDateTime.split(' ')[0].replaceAll('-','/')
     return date >= startDate

    },
    onChangeEndDateTime () {

        this.setDiffDay ()
    },
    setDiffDay () {

      let  startDate = new Date(this.reservation.StartDateTime.replaceAll('-','/') )
      let  endDate = new Date(this.formFields.EndDateTime.replaceAll('-','/') )


      console.log("Start Date",startDate)
      console.log("End Date",endDate)

      startDate = new Date(startDate.setHours(startDate.getHours()+3 ) );  // 26 : 13:00

      console.log("Start Date +3 H",startDate)

      const diffTime = Math.abs(endDate - startDate);

      // const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // 1 gün
      const diff = date.getDateDiff(endDate,startDate)

     // let newEndDate = new Date(startDate.setDate(startDate.getDate() + diff)) // 27 => 13:00

      // console.log("Diff",diff)


        this.formFields.RentDays = diff



      if(this.formFields.RentDays > this.reservation.RentDays){
        this.formFields.ExtendedDate = true
        this.formFields.StartDateTime = this.reservation.EndDateTime
        this.formFields.TotalRentPrice = 0
        this.formFields.TotalRentPrice = (+this.formFields.RentDays * +this.formFields.DailyRentPrice).toFixed(2)
       // this.onSelectedExtraServices(this.formFields.ExtraServices)
        this.setTotalPriceOrder()
      } else {
        this.formFields.TotalRentPrice = 0
        this.formFields.TotalRentPrice = (+this.formFields.RentDays * +this.formFields.DailyRentPrice).toFixed(2)

        //this.onSelectedExtraServices(this.formFields.ExtraServices)
        this.setTotalPriceOrder()
      }

    },
    onChangeEndTime(value, details) {
      this.setDiffDay ()
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    checkSelectedExtraServices(extraId){
     let data = JSON.parse(this.reservation.ExtraServices).find(el => +el.id === +extraId)
     return  !!data
    },
    show () {

      // form field alanları
      this.onSelectedCustomer(+this.reservation.customer_id)
      this.onSelectedPaymentMethod(this.reservation.PaymentMethod)
      this.formFields.reservation_id = this.reservation.id
      this.formFields.pickup_office_id = this.$store.getters['OfficeModule/officeByName'](this.reservation.PickupLocation).id
      this.formFields.drop_office_id = this.$store.getters['OfficeModule/officeByName'](this.reservation.DropLocation).id

      this.formFields.StartDateTime = this.reservation.StartDateTime
      this.formFields.EndDateTime = this.reservation.EndDateTime
      this.formFields.customers_id = +this.reservation.customer_id
      this.formFields.PayReceiptNo = this.reservation.PayReceiptNo === 'null' ? '' : this.reservation.PayReceiptNo
      this.formFields.reservation_drivers =  JSON.parse(this.reservation.customer_drivers)
      this.formFields.PaymentMethod = this.reservation.PaymentMethod
      this.formFields.PaymentState = this.reservation.PaymentState
      this.formFields.TotalPriceByCurrency = this.reservation.TotalPriceByCurrency
      this.extraServicesSelected =  JSON.parse(this.reservation.ExtraServices)
      this.formFields.ExtraServices =  JSON.parse(this.reservation.ExtraServices)
      this.formFields.DailyRentPrice = this.reservation.DailyRentPrice
      this.formFields.TotalRentPrice = this.reservation.TotalRentPrice
      this.formFields.TotalPrice = this.reservation.TotalPrice
      this.formFields.RealDailyRentPrice = this.reservation.RealDailyRentPrice
      this.formFields.CurrencySymbol = this.reservation.CurrencySymbol
      this.formFields.CurrencyRate = this.reservation.CurrencyRate
      this.formFields.OrgDailyRentPrice = this.reservation.DailyRentPrice
      this.formFields.RentDays = this.reservation.RentDays
      this.formFields.cars_id = this.reservation.cars_id
      this.formFields.CurrencyType = this.reservation.CurrencyType
      this.formFields.SelectedPriceTitle = this.reservation.SelectedPriceTitle
      this.formFields.TotalExtraServicesPrice = this.reservation.TotalExtraServicesPrice
      this.formFields.ReservationNo = this.reservation.ReservationNo
      this.formFields.ReservationType = this.reservation.ReservationType
      this.formFields.customer_groups_id = this.reservation.customer_groups_id
      this.$refs.dialog.show()


    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog

      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

     this.onSubmitUpdatedReservation()
      // then hiding dialog

    },

    onCancelClick () {
      console.log('chancel')
      // we just need to hide the dialog
      this.hide()
    },
    onSubmitUpdatedReservation(){

      let formData = new FormData();
      formData.append('reservation_id',this.formFields.reservation_id) //yes
      formData.append('pickup_office_id',this.formFields.pickup_office_id)//yes
      formData.append('drop_office_id',this.formFields.drop_office_id)//yes
      formData.append('StartDateTime',this.formFields.StartDateTime) //yes
      formData.append('EndDateTime',this.formFields.EndDateTime) //yes
      formData.append('customers_id',this.formFields.customers_id) //yes
      formData.append('PayReceiptNo',this.formFields.PayReceiptNo) //yes
      if (this.formFields.reservation_drivers !== null)
      {
        formData.append('reservation_drivers',JSON.stringify(this.formFields.reservation_drivers)) //yes
      }
      formData.append('PaymentMethod',this.formFields.PaymentMethod) //yes
      formData.append('customer_groups_id',this.formFields.customer_groups_id) //yes
      formData.append('ExtraServices',JSON.stringify(this.formFields.ExtraServices)) //yes
      formData.append('RealDailyRentPrice',this.formFields.RealDailyRentPrice)//yes
      formData.append('CurrencySymbol',this.formFields.CurrencySymbol) //yes
      formData.append('CurrencyRate',this.formFields.CurrencyRate) //yes
      formData.append('PaymentState',this.reservation.PaymentState) //yes
      formData.append('CurrencyType',this.formFields.CurrencyType)//yes
      formData.append('cars_id',this.formFields.cars_id) //yes
      formData.append('SelectedPriceTitle',this.formFields.SelectedPriceTitle) //yes
      formData.append('DailyRentPrice',this.formFields.DailyRentPrice) //yes
      formData.append('ReservationType',this.formFields.ReservationType) //yes => current_reservation_v add ReservationType
      if (this.formFields.PaymentState === 'Payed')
      {
        formData.append('ReservationStatus','Continues')
      }
      formData.append('TotalPrice',this.formFields.newTotalPrice) //yes
      formData.append('RentDays',this.formFields.newRentDays) //yes
      formData.append('TotalRentPrice', this.formFields.newTotalRentPrice) //yes
      formData.append('TotalExtraServicesPrice', this.formFields.newTotalExtraServicesPrice) //yes
      formData.append('TotalPriceByCurrency', this.formFields.newTotalPriceByCurrency) //yes
      formData.append('newTotalPrice', this.formFields.TotalPrice) //yes
      formData.append('_method','PUT')
      this.$store.dispatch('Reservations/updateReservation',formData).then(res => {
        if (res === true)
        {
          console.log("res",res)
          this.hide()
        }
      })
    },
    async onSelectedCustomer(id){
     // let customer = await this.$store.getters['CustomersModule/getRecord'](id)

      // if ( id !== null && customer.CustomerType === "Corporate" )
      // {
      //   this.formFields.reservation_drivers = []
      //   this.showCustomerDrivers = true
      //   this.customerDrivers = customer.customer_drivers
      //   this.customerDriverOptions = customer.customer_drivers
      // } else {
      //   this.showCustomerDrivers = false
      // }
    },
    onSelectedPaymentMethod(value){
      this.formFields.PayReceiptNo = '';
      this.showPayReceiptNo = value === 'EftTransfer' || value === 'CurrentSales' || value === 'CreditCartOnTerminal';
    },
    addedNewCustomer() {
      // store.getters['CustomersModule/getRecords'])
      this.customerOptions = JSON.parse(JSON.stringify(this.$store.getters['CustomersModule/getRecords'])).filter( e => {
        return  +e.customer_groups_id === +this.formFields.customer_groups_id
      })
      this.newFormDialog = false
      // this.selectOptionFields.customer_groups_id = ''
      // this.newFormFields.customers_id = ''

    },

    onSelectedExtraServices(val) {
      this.formFields.ExtendedDate = true
      let ExtraServices = [];
      let extraServicesTotalPricePrice = 0;
      JSON.parse(JSON.stringify(val)).forEach(e => {
        if (e.CalculateType === "DependsOnHalfPrice")
        {
          const price = parseFloat(+this.formFields.DailyRentPrice / 2)
          e.RealPrice = parseFloat(+this.formFields.RealDailyRentPrice / 2)
          e.Price = parseFloat(this.formFields.RentDays * price).toFixed(2)
          e.Daily = price
          extraServicesTotalPricePrice += parseFloat(e.Price)
          ExtraServices.push(e)
        } else {
          e.RealPrice = e.Price
          const price = +e.Price
          e.Price =  parseFloat(price / this.formFields.CurrencyRate).toFixed(2)
          extraServicesTotalPricePrice += parseFloat(e.Price)
          ExtraServices.push(e)
        }
      });
      this.formFields.ExtraServices = ExtraServices
      this.formFields.TotalExtraServicesPrice = extraServicesTotalPricePrice



      this.setTotalPriceOrder()

    },

    setTotalPriceOrder() {
      console.log("this.formFields.RentDays",this.formFields.RentDays)
      console.log("this.reservation.RentDays",this.reservation.RentDays)
      this.formFields.TotalPrice = +this.formFields.TotalRentPrice + (+this.formFields.TotalExtraServicesPrice)
      this.formFields.TotalPriceByCurrency = parseInt((+this.formFields.TotalRentPrice * +this.formFields.CurrencyRate) + (+this.formFields.TotalExtraServicesPrice * +this.formFields.CurrencyRate))
      this.formFields.newTotalPrice = parseFloat(this.formFields.TotalPrice - this.reservation.TotalPrice).toFixed(2)
      this.formFields.newRentDays = (+this.formFields.RentDays - +this.reservation.RentDays)
      this.formFields.newTotalRentPrice = parseFloat(+this.formFields.newRentDays * +this.reservation.DailyRentPrice).toFixed(2)
      this.formFields.newTotalExtraServicesPrice =  parseFloat(+this.formFields.TotalExtraServicesPrice - +this.reservation.TotalExtraServicesPrice).toFixed(2)
      this.formFields.newTotalPriceByCurrency =  parseInt((+this.formFields.newTotalRentPrice * +this.formFields.CurrencyRate) + (+this.formFields.newTotalExtraServicesPrice * +this.formFields.CurrencyRate)).toFixed(2)

      console.log("this.formFields.newRentDays",this.formFields.newRentDays)
    },
  },

  computed: {
    extraServicesRow() {
      return this.$store.getters['CarExtrasModule/activeExtras']
    },
    drop_location : {
      get(){
        return this.$store.getters['OfficeModule/officeByName'](this.reservation.DropLocation).id
      },
      set(newValue){
        if(newValue === undefined){
          this.formFields.drop_office_id = newValue
        } else {
          this.formFields.drop_office_id =  this.$store.getters['OfficeModule/officeByName'](this.reservation.DropLocation).id
        }


      }
    },
    pickup_location: {
      get(){
        return this.$store.getters['OfficeModule/officeByName'](this.reservation.PickupLocation).id
      },
      set(newValue){
        if(newValue === undefined){
              this.formFields.pickup_office_id = newValue
        } else {
          this.formFields.pickup_office_id =  this.$store.getters['OfficeModule/officeByName'](this.reservation.PickupLocation).id
        }

      }
    },


  }
}
</script>
