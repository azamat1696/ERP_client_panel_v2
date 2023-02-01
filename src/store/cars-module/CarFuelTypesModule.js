import {api} from 'boot/axios';
import {Notify} from "quasar";
const prefixUrl = 'car-fuel-types';
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const state = {
  carFuelTypes : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.carFuelTypes.push(item)
  },
  SET_ITEMS(state,items) {
    state.carFuelTypes = items
  },
  SET_REPLACE(state,item) {
    state.carFuelTypes.forEach(function(el, i) {
      if (el.id === item.id)
        state.carFuelTypes[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.carFuelTypes.length; i++)
    {
      if (state.carFuelTypes[i].id === id)
      {
        state.carFuelTypes.splice(i,1);
        break;
      }
    }
  }

}

const actions = {

  create({commit},payload) {
    return   api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM',res.data);
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Kayıt Başarılı'
      });
      return true
    }).catch(er => {

      ErrorHandlePrint(er)
    })
  },
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Kayıt Başarıyla Güncellendi'
      });
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
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Kayıt Başarıyla Silindi'
      });
    }).catch(er => {

      ErrorHandlePrint(er)
    })
  }

}

const getters = {

  getRecords : (state) => {
    return state.carFuelTypes
  },
  getRecordById : (state)=> (id) => {
    return state.carFuelTypes.find(el => el.id = id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
