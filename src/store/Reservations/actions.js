import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "reservations"
import {api} from "boot/axios";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {Loading} from "quasar";

export  function create({commit},payload) {
 return  api.post(prefixUrl,payload).then(res => {
    SuccessHandlePrint('positive','created',1500)
    return true
  }).catch(er => {

    ErrorHandlePrint(er)
  })
}

export async function getOldReservations({commit}) {
  return await api.get('old-reservations').then(res => {
    commit('setOldReservation',res.data)
    return true
  }).catch(er => {
    ErrorHandle(er)
  })
}

export async function getLastReservations({commit}) {
  return await api.get('current-reservations').then(res => {
    commit('setLastReservation',res.data)
    return true
  }).catch(er => {
      ErrorHandle(er)
  })
}

export async function updateReservationStatus({commit},payload) {
   return await api.post(prefixUrl+'/'+payload.get('id'),payload).then(res => {
     commit('replaceReservation',res.data)
     SuccessHandlePrint('positive','updated',1500)
     return true
   }).catch(er => {
     ErrorHandle(er)
   })
}
export async function updateReservation({commit},payload) {
  return await api.post('reservation-update'+'/'+payload.get('reservation_id'),payload).then(res => {
    commit('replaceReservation',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
  })
}

export async function getReservationAgreement({commit},reservationId) {
  Loading.show({message:'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return await api.get('reservation-agreement/'+reservationId
    ,{
    responseType:'blob'
  }

  ).then(res => {
    Loading.hide()

    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download ="Sözleşme.pdf"
    link.click()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function printAgreement({commit},reservationId) {

  Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
  return await api.get('reservation-agreement/'+reservationId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    var blob = new Blob([res.data], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);

    let newWindow = window.open(blobURL,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    newWindow.focus()
    // var blob = new Blob([res.data], {type: 'application/pdf'}); //this make the magic
    // var blobURL = URL.createObjectURL(blob);
    // let  iframe =  document.createElement('iframe'); //load content in an iframe to print later
    // document.body.appendChild(iframe);
    // iframe.style.display = 'none';
    // iframe.src = blobURL;
    // iframe.onload = function() {
    //   setTimeout(function() {
    //     iframe.focus();
    //     iframe.contentWindow.print();
    //   }, 1);
    // };
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function exportCurrentReservation() {
  Loading.show({message:'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return await api.get('export-current-reservation',{
    responseType:'blob'
  }).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download ="guncel-reservations.xlsx"
    link.click()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function exportAllReservation() {
  Loading.show({message:'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return await api.get('export-all-reservation',{
    responseType:'blob'
  }).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download ="Rezervasyonlar.xlsx"
    link.click()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export function sendReservationAgreementToMail({commit},id) {

  Loading.show({message : 'Lütfen bekleyniz, Mail müşteriye gönderiliyor.'})
   api.get('send-reservation-agreement-to-mail/'+id).then(res => {
    Loading.hide()
    SuccessHandlePrint('positive','sendMail',1000,'bottom-right')
  }).catch(er => {
    Loading.hide()
    ErrorHandlePrint(er)
  })
}

export async function invoiceNumberUpdate({commit},payload)  {
 return await  api.post('invoice/'+payload.get('id'),payload).then(res => {
   commit('changeInvoiceNo',res.data)
   SuccessHandlePrint('positive','updated',1500)
   return true
   }).catch(er => {
     ErrorHandle(er)
   return false
 })
}

export async function downloadInvoice({commit},invoiceId) {
  console.log('>>>>>>>>>>',invoiceId)
  Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
  // return await api.get('invoice-download/'+invoiceId).then(res => {
  //   console.log(res.data)
  // })
  return await api.get('invoice-download/'+invoiceId
    ,{
    responseType:'blob'
  }
  ).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download =Math.floor(Math.random() * 10000)+".pdf";
    link.click()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function printInvoice({commit},invoiceId) {
  Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
  return await api.get('invoice-download/'+invoiceId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()

    var blob = new Blob([res.data], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);

    let newWindow = window.open(blobURL,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    newWindow.focus()
    // let  iframe =  document.createElement('iframe');
    // document.body.appendChild(iframe);
    // iframe.style.display = 'none';
    // iframe.style.position  = 'fixed';
    // iframe.src = blobURL;
    // iframe.onload = function() {
    //   setTimeout(function() {
    //     iframe.focus();
    //     iframe.contentWindow.print();
    //   }, 1);
    // };

    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export function sendReservationInvoiceToMail({commit},id) {
  Loading.show({message : 'Lütfen bekleyniz, Fatura   müşteriye mailine gönderiliyor.'})
  api.get('invoice-send-mail/'+id).then(res => {
    Loading.hide()
    SuccessHandlePrint('positive','sendMail',1000,'bottom-right')
  }).catch(er => {
    Loading.hide()
    ErrorHandlePrint(er)
  })
}

export async function receiptNumberUpdate({commit},payload) {
  return await  api.post('receipt/'+payload.get('id'),payload).then(res => {
    commit('changeReceiptNo',res.data)
    SuccessHandlePrint('positive','updated',1500)
    return true
  }).catch(er => {
    ErrorHandle(er)
    return false
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

export async function downloadReceipt({commit},invoiceId) {

  Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
  return await api.get('receipt-download/'+invoiceId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()

    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download =Math.floor(Math.random() * 10000)+".pdf";
    link.click()
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export async function printReceipt({commit},invoiceId) {
  Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
  return await api.get('receipt-download/'+invoiceId
    ,{
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    var blob = new Blob([res.data], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);

    let newWindow = window.open(blobURL,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    newWindow.focus()
    // var blob = new Blob([res.data], {type: 'application/pdf'}); //this make the magic
    // var blobURL = URL.createObjectURL(blob);
    // let  iframe =  document.createElement('iframe'); //load content in an iframe to print later
    // document.body.appendChild(iframe);
    // iframe.style.display = 'none';
    // iframe.src = blobURL;
    // iframe.onload = function() {
    //   setTimeout(function() {
    //     iframe.focus();
    //     iframe.contentWindow.print();
    //   }, 1);
    // };
    return true
  }).catch(er => {
    Loading.hide()

    ErrorHandlePrint(er)
  })
}

export function sendReservationReceiptToMail({commit},id) {
  Loading.show({message : 'Lütfen bekleyniz, Fatura   müşteriye mailine gönderiliyor.'})
  api.get('receipt-send-mail/'+id).then(res => {
    Loading.hide()
    SuccessHandlePrint('positive','sendMail',1000,'bottom-right')
  }).catch(er => {
    Loading.hide()
    ErrorHandlePrint(er)
  })
}

export async function renewReservationPaymentMethod({commit},payload) {
  Loading.show({message : 'Lütfen bekleyniz, Fatura   müşteriye mailine gönderiliyor.'})
 return await api.post('renew-reservation-payment-method',payload).then(res => {
   commit('replaceReservation',res.data)
    SuccessHandlePrint('positive','sendMail',1000,'bottom-right');
    return true
  }).catch(er => {
    ErrorHandlePrint(er)
  }).finally(() => Loading.hide())
}

export function ErrorHandle(er) {

  if (er.response.status === 401) {
    localStorage.clear()
  }
  ErrorHandlePrint(er)
}

export function increnment({commit},y){
  y++
  commit('increment',y)
}
