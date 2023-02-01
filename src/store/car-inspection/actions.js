import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "car-inspections"
import {api} from "boot/axios";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {Loading, Notify} from "quasar";

export function getCarInspections({commit}) {
  api.get(prefixUrl).then(res => {
    commit('setInspections',res.data)
  }).catch(er => {
    console.log("Gelen Er",er)
  })
}

export async function getCarByLicencePlate({commit},payload) {
  Loading.show({ message : 'Lütfen Bekleyiniz...' } )
  return await  api.post('find-car-by-licence-plate',payload).then(res =>{
    commit('setFindCar',res.data)
    SuccessHandlePrint('positive','searched',1000,'top-right')
   return true
  }).catch(er => {
    Notify.create({
      type:'negative',
      message:' Araç Bulunamadı',
      timeout:1500,
      position:'bottom-right',
      progress:true
    })
    ErrorHandlePrint(er)
  }).finally(() => {
    Loading.hide()
  })
}

export function create({commit},payload) {
  return api.post(prefixUrl,payload).then(res => {
     commit('setNewInspection',res.data[0])
    SuccessHandlePrint('positive','created',1500)
    return true
  }).catch(er => {
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  });
}
export function createMultiple({commit},payload) {
  return api.post('car-inspections-multiple',payload).then(res => {
    commit('setInspections',res.data)
    return true
  }).catch(er => {
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  });
}
export function update({commit},payload) {
  const url = prefixUrl +'/' + payload.get('id');
  return api.post(url,payload).then(res => {
    console.log('setUpdatedInspection',res.data)
    commit('setUpdatedInspection',res.data[0])
    SuccessHandlePrint('positive','created',1500)
    return true
  }).catch(er => {
    console.log("On Server Error",er)
    ErrorHandlePrint(er)
  });
}
