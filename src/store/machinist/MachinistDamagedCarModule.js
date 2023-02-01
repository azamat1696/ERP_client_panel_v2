import {api} from "boot/axios";
import {Notify} from "quasar";
const prefixUrl = "machinist-car-damage"
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";

const state = {
  machinistDamageRecord : []
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
  }
}
const actions = {
 create({commit},payload){
   return  api.post(prefixUrl,payload).then(res => {
     commit('SET_ITEM', res.data);
     SuccessHandlePrint('positive','created')
     return true
   }).catch( er => {

     ErrorHandlePrint(er)
   })
 },
  update({commit},payload){

     return api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
       commit('SET_REPLACE',res.data);
       SuccessHandlePrint('positive','updated')
       return true
     }).catch(er => {
       ErrorHandlePrint(er)
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
  }
}
const getters = {
   machinistDamageRecord : (state) => {
     return state.machinistDamageRecord
   },
  elById: (state) => (id) => {
    return state.machinistDamageRecord .find(el => +el.id === +id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
