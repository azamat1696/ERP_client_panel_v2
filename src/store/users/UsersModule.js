import {api} from 'boot/axios';
const prefixUrl = 'register';
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";

const state = {
  users : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.users.push(item)
  },
  SET_ITEMS(state,items) {
    state.users = items
  },
  SET_REPLACE(state,item) {
    state.users.forEach(function(el, i) {
      if (el.id === item.id)
        state.users[i] = item;
    });
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
    return   api.post("users"+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','updated',1500);
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
   async get({commit}){
    await api.get('users').then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er => {
    ErrorHandlePrint(er)
    })
  },


}

const getters = {

  getRecords : (state) => {
    return state.users
  },
  getRecord : (state) => (id) =>{
    return state.users.find( e => +e.id === +id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
