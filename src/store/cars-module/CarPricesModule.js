import {api} from 'boot/axios';
import {Notify} from "quasar";
const prefixUrl = 'car-prices';

const state = {
  CarPrices : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.CarPrices.push(item)
  },
  SET_ITEMS(state,items) {
    state.CarPrices = items
  },
  SET_REPLACE(state,item) {
    state.CarPrices.forEach(function(el, i) {
      if (el.id === item.id)
        state.CarPrices[i] = item;
    });
  },

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

      notifyError(er.response.data.payload)
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
      notifyError(er.response.data.payload)
    })
  },
  get({commit}){
    api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er =>{
      notifyError(er.response.data.payload)

    })
  },

}

const getters = {

  getRecords : (state) => {
    return state.CarPrices
  },
  getCarPriceByModelID : (state) => (model_id) => {
    return state.CarPrices.find(e => parseInt(e.model_id) === parseInt(model_id))
  }

}

function notifyError(errors) {
for (const [k,v] of Object.entries(errors))
  {
    errors[k].forEach(e => {
      Notify.create({
        type:'negative',
        message: e,
        timeout:2000,
        position:'bottom-right',
        progress:true
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
