import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "invoice"
import {api} from "boot/axios";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {Loading} from "quasar";
import {ErrorHandle} from "src/store/Reservations/actions";


export function get({commit},payload) {
 api.post('invoice-report',payload).then(res => {
      commit('setInvoice',res.data)
   console.log('res',res.data )
  }).catch(er => {
    ErrorHandlePrint(er)
  })
}

export async function reservationNumberUpdate({commit},payload) {
  return await  api.post('update-reservation-number',payload).then(res => {
    commit('changeReservationNo',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
  })
}

export async function invoiceNumberUpdateAtReport({commit},payload)  {
  return await  api.post('update-invoice-number',payload).then(res => {
    commit('changeInvoiceNoAtReport',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
  })
}

export async function receiptNumberUpdateAtReport({commit},payload) {
  return await  api.post('update-receipt-number',payload).then(res => {
    commit('changeReceiptNoAtReport',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
  })
}
