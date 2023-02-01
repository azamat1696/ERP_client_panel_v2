import {ref} from "vue";
import {Loading,QSpinnerGears} from "quasar";
import {api} from "boot/axios";

const state = {
  carTypes : [
    {
      id:1,
      title : 'Small'
    },
    {
      id:2,
      title : 'Medium'
    },
    {
      id:3,
      title : 'Large'
    },
    {
      id:4,
      title : 'Track'
    },

    {
      id:5,
      title : '4x4'
    },
    {
      id:6,
      title : 'People Carier'
    }

  ],
  documentTypes : [
    {
      id:1,
      name:'Ehliyet Belgesi',
    },
    {
      id:2,
      name:'Pasaport Belgesi',
    },
    {
      id:3,
      name:'Kimlik Belgesi',
    }
  ],
  carYears : [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],
  OfficeWorkingPeriods : [
    {
      label : 'Pzt',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(true)
    },
    {
      label : 'Sal',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(true)
    },
    {
      label : 'Çar',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(true)
    },
    {
      label : 'Per',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(true)
    },
    {
      label : 'Cum',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(true)
    },
    {
      label : 'Cmt',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(false)
    },
    {
      label : 'Paz',
      ranges : {
        min: 9,
        max: 19,
      },
      status : ref(false)
    }
  ],
  dateTimeLocale : {
    days : ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
    daysShort : ['Paz','Pzt','Sal','Çar','Per','Cum','Cts'],
    months : ['Ocak', 'Şubat', 'Mart', 'Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
    monthsShort: ['Oca', 'Şub', 'Mar', 'Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'],
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false
  },
  customerTypesOption : [
    {
      title:'Bireysel',
      value:'Individual'
    },{
      title:'Kurumsal',
      value:'Corporate'
    },

  ],
  paymentMethods : [
    {
      title : 'Nakit Satış',
      code:   'CashOnOffice',
    },
    {
      title : 'Kredi Kartı Sanal',
      code:   'CreditCartOnOffice',
    },
    {
      title : 'Kredi Kartı Terminal',
      code:   'CreditCartOnTerminal',
    },
    {
      title : 'Cari Satışı',
      code:   'CurrentSales',
    },
    {
      title : 'Havale',
      code:   'EftTransfer',
    }
  ],
  transactionStates : [
    {
      title : 'Alındı',
      code:   'Payed',
    },
    {
      title : 'Bekleniyor',
      code:   'PayWaiting',
    },

  ],
  reservationTypes : [
    {
      title : 'Yıllık İç Müşteri'
    },
    {
      title : 'Yıllık Dış Müşteri'
    },
    {
      title : 'Günlük İç Müşteri'
    },
    {

      title : 'Günlük Dış Müşteri'
    },
  ],
  reservationCurrency : [
    {
      title : 'Lira',
      symbol : '₺',
      icon : 'currency_lira'
    },
    {
      title : 'Dolar',
      symbol : '$',
      icon : 'attach_money'
    },
    {
      title : 'Euro',
      symbol : '€',
      icon : 'euro_symbol'
    },
    {
      title : 'Sterlin',
      symbol : '£',
      icon : 'currency_pound'
    },
  ],
  creditCartLabel : {
    "cardName": "İsim Soyisim",
    "cardHolder": "Kart Sahibi",
    "cardMonth": "MM",
    "cardYear": "YY",
    "cardExpires": "Son Tarih",
    "cardCvv": "CVV"
  },
  carAttributes: [
    {
    title: 'Z',
    },
    {
      title: 'B',
    },
    {
      title: 'TU',
    },
    {
      title: 'TA',
    },
    {
      title: 'A',
    },
    {
      title: 'Özel Plaka',
    },
    {
      title: 'Tahsis',
    },

],
  reservationStatus : [
    {
      title : 'Onay Bekleniyor',
      code:   'WaitingForApproval'
    },
    {
      title : 'Devam Ediyor',
      code:  'Continues'
    },
    {
      title : 'İptal Edildi',
      code:   'Cancelled'
    },
    {
      title : 'Tamamlandı',
      code:  'Completed'
    },
  ],
  serverUrl : 'http://sevener.neareasttechnology.net'
}

const mutations = {


}
const actions = {
  async getCurrencyAmount({commit},payload) {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: 'grey-1',
      message: 'Lütfen bekleyiniz güncel kur alınıyor...'
    });

    try {
      const  response =    await  fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${payload}/try.json`)
      const data =    await  response.json()
      Loading.hide()
      return data.try
    } catch (e) {
    Loading.hide()

    }

  },

  async getTransaction({commit},payload) {
  return  await api.post('transaction',payload).then(res => {
    return res.data
    }).catch(er => {

    })
  },
  async checkTransaction({commit},payload) {
    return  await api.get('check-transaction/'+payload).then(res => {
      return res.data
    }).catch(er => {

    })
  }
}

const getters = {

  getDocumentTypes : (state) => {
    return state.documentTypes
  },
  getDocumentType : (state) => (id) =>{
    return state.documentTypes.find(e => e.id === id)
  },
  getCarTypes : (state) => {
    return state.carTypes
  },
  getCarTypeById : (state) => (id) => {
    return state.carTypes.find(el => el.id  = id)
  },
  getCarYears : (state) => {
    return state.carYears
  },

  getOfficeWorkingPeriods : (state) => {
    return state.OfficeWorkingPeriods
  },
  getDateTimeLocale : (state) => {
    return state.dateTimeLocale
  },
  getCustomerTypesOption : (state) => {
    return state.customerTypesOption
  },
  getReservationTypes : (state) => {
    return state.reservationTypes
  },
  getReservationCurrencyTypes : (state) => {
    return state.reservationCurrency
  },
  getReservationPaymentMethods : (state) => {
    return state.paymentMethods
  },
  getReservationTransactionStates : (state) => {
    return state.transactionStates
  },
  getCreditCartLabels : (state) => {
    return state.creditCartLabel
  },
  getReservationStatus : (state) => {
    return state.reservationStatus
  },
  getReservationStatusFiltered : (state) => {
      return state.reservationStatus.filter(el => el.code !== 'Completed' && el.code !== 'Cancelled')
  },
  findReservationPaymentMethod : (state) => (paymentCode) =>{
    return state.paymentMethods.find(e => e.code === paymentCode)
  },
  getServerUrl : (state) => {
    return state.serverUrl
  },
  getCarAttributes : (state) => {
    return state.carAttributes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
