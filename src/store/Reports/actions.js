/*
export function someAction (context) {
}
*/

import {api} from "boot/axios";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {Loading} from "quasar";

export async function reservationReportFilterAction({commit}, payload) {
    Loading.show({
      title : 'Verilen işleniyor lütfen bekleyiniz...'
     })
     return await  api.post('reservation-reports',payload).then(res => {

       commit('setterReservationReports',res.data)
         return true
        }).catch(er => {
        console.log("ER",er)
        ErrorHandlePrint(er)
  }).finally(() => Loading.hide())

}

export async function reservationReportWithDateFilterAction({commit},payload){
  Loading.show({
    title : 'Verilen işleniyor lütfen bekleyiniz...'
  })
  return await  api.post('reservation-reports-date',payload).then(res => {

    commit('setterReservationReports',res.data)
    return true
  }).catch(er => {
    console.log("ER",er)
    ErrorHandlePrint(er)
  }).finally(() => Loading.hide())
}

export async function reservationReportExportAction({commit},payload) {
  Loading.show({
    title : 'Verilen işleniyor lütfen bekleyiniz...'
  })
  return await  api.post(
    'reservation-report-export'
    ,payload
    ,{
    responseType:'blob'
  }
  ).then(res => {

    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = Math.floor(Math.random() * 1000)+" - Reports.xlsx"
    link.click()
    return true
  }).catch(er => {
    console.log("ER",er)
    ErrorHandlePrint(er)
  }).finally(() => Loading.hide())
}

export async function carsExportAction({commit},payload) {
  Loading.show({
    title : 'Verilen işleniyor lütfen bekleyiniz...'
  })
  return await  api.post('car-reports',payload).then(res => {

    commit('setterCarReports',res.data)
    return res.data.canvas[0]
  }).catch(er => {
    console.log("ER",er)
    ErrorHandlePrint(er)
  }).finally(() => Loading.hide())

}

export async function damageExportAction({commit},payload) {
  Loading.show({
    title : 'Verilen işleniyor lütfen bekleyiniz...'
  })
  return await  api.post('damage-reports',payload).then(res => {
    commit('setterDamageReports',res.data)
    return res.data.canvas[0]
  }).catch(er => {
    console.log("ER",er)
    ErrorHandlePrint(er)
  }).finally(() => Loading.hide())

}

export async function carsExportExelAction({commit}, payload) {
  Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return api.post('export-cars-report',
    payload,
    {
    responseType:'blob'
  }
  ).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = "cars-report.xlsx"
    link.click()
    return true
  }).catch(er => {
    Loading.hide()
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  })

}
export async function damagesExportExelAction({commit}, payload) {
  Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return api.post('export-damages-report',
    payload,
    {
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = "damages-report.xlsx"
    link.click()
    return true
  }).catch(er => {
    Loading.hide()
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  })

}
export async function forAllExportExelAction({commit}, payload) {
  Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
  return api.post('export-all-report',
    payload,
    {
      responseType:'blob'
    }
  ).then(res => {
    Loading.hide()
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = payload.get('exelName')
    link.click()
    return true
  }).catch(er => {
    Loading.hide()
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  })

}

export function collectiveReportsMailDownload() {
  api.get('daily-reports-download',{
    responseType:'blob'
  }).then(res => {
    let blob = res.data
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'Günlük Toplu Raporlar.xlsx'
    link.click()
  })
}
