import {api} from "boot/axios";
import {Loading, Notify} from "quasar";
const prefixUrl = "machinist-car-damage"
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";

const state = {
  machinistDamageRecord : [],
  activeDamageRecordCounts : 0,
  activeDamageRecords : []
}
const mutations = {
  SET_ITEM(state,item) {
    state.machinistDamageRecord .push(item);
  },
  SET_ITEMS(state,items){
    state.machinistDamageRecord  = items
  },
  SET_REPLACE(state,item){
    state.machinistDamageRecord .forEach(function (el,i) {
      if(el.id === item.id ){
        state.machinistDamageRecord [i] = item;
      }
    })

  },
  SET_REMOVE(state,id){
    for (let i=0; i < state.machinistDamageRecord .length; i++)
    {
    if (state.machinistDamageRecord [i].id === id)
     {
      state.machinistDamageRecord .splice(i,1)
      break;
     }
    }
  },
  SET_ACTIVE_RECORDS(state,payload){
    state.activeDamageRecordCounts = payload.count
    state.activeDamageRecords  = payload.records
  },
}
const actions = {
 create({commit},payload){
   return  api.post(prefixUrl,payload).then(res => {
     commit('SET_ITEM', res.data);
     SuccessHandlePrint('positive','created')
     return true
   }).catch( er => {

     Notify.create({
       position: 'bottom-right',
       type:'negative',
       message: er.response.data.payload
     });
   })
 },
  update({commit},payload){

     return api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
       commit('SET_REPLACE',res.data);
       SuccessHandlePrint('positive','updated')
       return true
     }).catch(er => {
       Notify.create({
         position: 'bottom-right',
         type:'negative',
         message: er.response.data.payload
       });
     })
  },
  get({commit}) {
     api.get(prefixUrl).then(res => {

       commit('SET_ITEMS',res.data)
     }).catch(er => {
       ErrorHandlePrint(er)
     })
  },
  destroy({commit},id){

   api.delete(prefixUrl + "/" + id).then(res => {
     commit('SET_REMOVE',id);
     SuccessHandlePrint('positive','deleted')
   }).catch(er => {
     ErrorHandlePrint(er)
   });
  },
  exportMachinistReservation(){
    Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
    return api.get('export-machinist-reservation',{responseType:'blob'}).then(res => {
      Loading.hide()
      let blob = res.data
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "makinist-damage-reservation.xlsx"
      link.click()
      return true
    }).catch(er => {
      Loading.hide()

      ErrorHandlePrint(er)
    })
  },
  getActiveMachinistRecord({commit}) {
    api.get('active-machinist-registrations').then(res => {
      commit('SET_ACTIVE_RECORDS',res.data)
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
}
const getters = {
   machinistDamageRecord : (state) => {
     return state.machinistDamageRecord
   },
  elById: (state) => (id) => {
    return state.machinistDamageRecord .find(el => +el.id === +id)
  },
  activeDamageRecordCountGetter : (state) => {
     return state.activeDamageRecordCounts
  },
  activeDamageRecordsGetter : (state) => {
    return state.activeDamageRecords
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
