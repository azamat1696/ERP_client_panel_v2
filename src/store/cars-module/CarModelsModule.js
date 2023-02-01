import {api} from 'boot/axios';
import {Notify} from "quasar";
const prefixUrl = 'car-models';
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const state = {
  carModels : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.carModels.push(item)
  },
  SET_ITEMS(state,items) {
    state.carModels = items
  },
  SET_REPLACE(state,item) {
    state.carModels.forEach(function(el, i) {
      if (el.id === item.id)
        state.carModels[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.carModels.length; i++)
    {
      if (state.carModels[i].id === id)
      {
        state.carModels.splice(i,1);
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
   return   api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
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
  async  getCarModels({commit}){
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

  carModels : (state) => {
       return state.carModels
  },
  carModel : (state) => (id) => {
    return state.carModels.find(e => parseInt(e.id) === parseInt(id))
  },
  carModelByBrandId: state => (brand_id) => {
    return state.carModels.filter(e => +e.brand_id === +brand_id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
