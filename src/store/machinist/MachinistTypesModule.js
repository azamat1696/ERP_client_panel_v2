import {api} from "boot/axios";
import {Notify} from "quasar";
const prefixUrl = "machinist-types"

const state = {
  machinistTypes : []
}
const mutations = {
  SET_ITEM(state,item) {
    state.machinistTypes .push(item);
  },
  SET_ITEMS(state,items){
    state.machinistTypes  = items
  },
  SET_REPLACE(state,item){
    state.machinistTypes .forEach(function (el,i) {
      if(el.id === item.id ){
        state.machinistTypes [i] = item;
      }
    })

  },
  SET_REMOVE(state,id){
    for (let i=0; i < state.machinistTypes .length; i++)
    {
    if (state.machinistTypes [i].id === id)
     {
      state.machinistTypes .splice(i,1)
      break;
     }
    }
  }
}
const actions = {
 create({commit},payload){
   return  api.post(prefixUrl,payload).then(res => {
     commit('SET_ITEM', res.data);
     Notify.create({
       position:"top-right",
       type: 'positive',
       message: 'Kayıt Başarılı'
     });
     return true
   }).catch( er => {

   })
 },
  update({commit},payload){

     return api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
       commit('SET_REPLACE',res.data);
       Notify.create({
         position: 'top-right',
         type: 'positive',
         message:'Kayıt Başarıyla Güncellendi'
       });
       return true
     }).catch(er => {

     })
  },
  get({commit}) {
     api.get(prefixUrl).then(res => {
       commit('SET_ITEMS',res.data)
     }).catch(er => {

     })
  },
  destroy({commit},id){

   api.delete(prefixUrl + "/" + id).then(res => {
     commit('SET_REMOVE',id);
     Notify.create({
       position: 'top-right',
       type:'positive',
       message: 'Kayıt Başarıyla Silindi'
     });
   }).catch(er => {

   });
  }
}
const getters = {
   machinistTypes: (state) => {
     return state.machinistTypes
   },
  elById: (state) => (id) => {
    return state.machinistTypes.find(el => +el.id === +id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
