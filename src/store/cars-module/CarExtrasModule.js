import {api} from 'boot/axios';
const prefixUrl = 'extra-services';
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
const state = {
  extras : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.extras.push(item)
  },
  SET_ITEMS(state,items) {
    state.extras = items
  },
  SET_REPLACE(state,item) {
    state.extras.forEach(function(el, i) {
      if (el.id === item.id)
        state.extras[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.extras.length; i++)
    {
      if (state.extras[i].id === id)
      {
        state.extras.splice(i,1);
        break;
      }
    }
  }

}

const actions = {

  create({commit},payload) {
    return   api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM',res.data);
      SuccessHandlePrint('positive','created',1000)
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('info','updated',1000)
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  get({commit}){
    api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er =>{
      ErrorHandlePrint(er)
    })
  },


}

const getters = {

  extras : (state) => {
    return state.extras
  },
  activeExtras : (state) => {
    return state.extras.filter( e => +e.Status === 1)
  },
  extraById : (state) => (id) => {
    return   state.extras.find(e => +e.id === +id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
