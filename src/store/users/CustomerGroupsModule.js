import {api} from 'boot/axios';
const prefixUrl = 'customer-groups';
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";

const state = {
  customerGroups : [],
  customerUnits : [],
}

const mutations = {

  SET_ITEM(state,item) {
    state.customerGroups.push(item)
  },
  SET_ITEMS(state,items) {
    state.customerGroups = items
  },
  SET_REPLACE(state,item) {
    state.customerGroups.forEach(function(el, i) {
      if (el.id === item.id)
        state.customerGroups[i] = item;
    });
  },
  SET_UNIT_ITEMS(state,items) {
    state.customerUnits = items
  },



}

const actions = {

  create({commit},payload) {
     return   api.post(prefixUrl,payload).then(res => {
       commit('SET_ITEM',res.data);
       SuccessHandlePrint('positive','created',1500);
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
       return false
    })
  },

  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','updated',1500);
      return true
    }).catch(er => {

    })
  },
   async get({commit}){
    await api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er => {
    ErrorHandlePrint(er)
    })
  },
  async getCustomerUnits({commit}){
    await api.get('customer-units').then(res => {
      commit('SET_UNIT_ITEMS',res.data)
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },


}

const getters = {

  getRecords : (state) => {
    return state.customerGroups
  },
  getRecordActive : (state) => {
    return state.customerGroups.filter(e => +e.Status === 1)
  },
  getRecordsByStatus : (state) => (status) => {
    return state.customerGroups.filter(e => +e.Status === status)
  },
  getRecord : (state) => (id) =>{
    return state.customerGroups.find( e => +e.id === +id)
  },
  getCustomerUnits : (state) => {
    return state.customerUnits
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
