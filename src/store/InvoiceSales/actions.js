import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "foreign-sale"
import {api} from "boot/axios";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {Loading} from "quasar";
import {ErrorHandle} from "src/store/Reservations/actions";

export  function create({commit},payload) {
  return  api.post(prefixUrl,payload).then(res => {
    SuccessHandlePrint('positive','created',1500)
    commit('pushInvoiceSales',res.data)
    return true
  }).catch(er => {
    ErrorHandlePrint(er)
  })
}
export function get({commit}) {
 api.get(prefixUrl).then(res => {
      commit('setInvoiceSales',res.data)
  }).catch(er => {
    ErrorHandlePrint(er)
  })
}

export  function update({commit},payload) {
  return   api.post(prefixUrl+'/'+payload.get('id'),payload).then(res => {
    commit('changeInvoiceSales',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
  })
}


export async function printSalesInvoice({commit},invoiceId) {
  Loading.show({message:'Dosya Hazırlanıyor Lütfen Bekleyiniz...'})
  return await api.get('invoice-sales-download/'+invoiceId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    var blob = new Blob([res.data], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);
    let newWindow = window.open(blobURL,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    newWindow.focus()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function printSalesInvoiceCollection({commit},invoiceId) {
  Loading.show({message:'Dosya Hazırlanıyor Lütfen Bekleyiniz...'})
  return await api.get('invoice-sales--collection-download/'+invoiceId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    var blob = new Blob([res.data], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);
    let newWindow = window.open(blobURL,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    newWindow.focus()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}
