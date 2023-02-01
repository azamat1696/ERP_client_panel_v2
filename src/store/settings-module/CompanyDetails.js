import {api} from 'boot/axios';
import {Notify} from "quasar";
const prefixUrl = 'company-detail';

const state = {
  companyDetails : []
}

const mutations = {
  SET_ITEMS(state,items) {
    state.companyDetails = items
  }
}

const actions = {
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_ITEMS',res.data);
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Kayıt Başarıyla Güncellendi'
      });
      return true
    }).catch(er => {
        if (er.response.status === 404)
       {
         Notify.create({
           position :'top-right',
           type : 'warning',
           message :'Kayıt Bulunamadı'
         });
       }
    })
  },
 async get({commit}){
  await  api.get(prefixUrl).then(res => {
        commit('SET_ITEMS',res.data)
       }).catch(er =>{
      if (er.response.status === 404)  {
       Notify.create({
       position :'top-right',
       type : 'warning',
       message :'Kayıt Bulunamadı'
     });
     }
    })
  }


}

const getters = {

  companyDetails : (state) => {
    return state.companyDetails
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
