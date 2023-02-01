import {api} from 'boot/axios';
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";

const prefixUrl = 'car-classes';

const state = {
  carClasses : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.carClasses.push(item)
  },
  SET_ITEMS(state,items) {
    state.carClasses = items
  },
  SET_REPLACE(state,item) {
    state.carClasses.forEach(function(el, i) {
      if (el.id === item.id)
        state.carClasses[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.carClasses.length; i++)
    {
      if (state.carClasses[i].id === id)
      {
        state.carClasses.splice(i,1);
        break;
      }
    }
  }

}

const actions = {

  create({commit},payload) {
    return   api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM',res.data);
      SuccessHandlePrint('positive','created')
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','updated')
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
  destroy({commit}, id) {
    api.delete(prefixUrl +"/"+id).then(res => {
      commit('SET_REMOVE',id);
      SuccessHandlePrint('positive','deleted')
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  }

}

const getters = {

  carClassesGetter : (state) => {
    return state.carClasses
  },
  getRecord : (state) => (id) => {
    return state.carClasses.find(e => +e.id === +id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
