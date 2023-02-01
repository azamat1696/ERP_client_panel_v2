import {api} from 'boot/axios';
import {Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
const prefixUrl = 'car-damages';

const state = {
  carDamages : [],
  carDamage : []
}

const mutations = {

  SET_ITEM_BY_CAR (state,items) {
     state.carDamage = items
  },
  SET_ITEM(state,item) {
    state.carDamages.push(item)
  },
  SET_ITEMS(state,items) {
    state.carDamages = items
  },
  SET_REPLACE(state,item) {
    state.carDamages.forEach(function(el, i) {
      if (el.id === item.id)
        state.carDamages[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.carDamages.length; i++)
    {
      if (state.carDamages[i].id === id)
      {
        state.carDamages.splice(i,1);
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

    })
  },
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','created')
      return true
    }).catch(er => {

    })
  },
  get({commit}){

    api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er =>{

    })
  },
async  getWithCarId({commit},payload){
  await  api.get(prefixUrl+"/"+payload).then(res => {
      commit('SET_ITEMS',res.data)
      SuccessHandlePrint('positive','searched',1000)
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

    })
  }

}

const getters = {

  carDamages : (state) => {
    return state.carDamages
  },
  elById : (state) => (id) => {
    return state.carDamages.find(el => +el.id === +id)
  },
  elFilterById: (state) => (id) => {
    return state.carDamages.filter(el => +el.cars_id === +id)
  },
  elFilterByCarDamageId: (state) => (id) => {
    return state.carDamages.filter(el => +el.id === +id)
  },
  carDamage : (state) => {
    return state.carDamages
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
