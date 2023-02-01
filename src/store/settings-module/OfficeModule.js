import {api} from "boot/axios";
import {Notify} from "quasar";
const prefixUrl = "offices"
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";

const state = {
  offices : [],
  testOffices : []
}
const mutations = {
  SET_ITEM(state,item) {
    state.offices.push(item);
  },
  SET_ITEMS(state,items) {
    state.offices = items

  },
  SET_REPLACE(state,item){
    state.offices.forEach(function (el,i) {
      if(el.id === item.id ) {
        state.offices[i] = item;
      }
    })

  },
  SET_REMOVE(state,id){
    for (let i=0; i < state.offices.length; i++)
    {
    if (state.offices[i].id === id)
     {
      state.offices.splice(i,1)
      break;
     }
    }
  },
  SET_TEST(state,payload) {
    state.testOffices = payload
  }
}
const actions = {
 create({commit},payload){
   return  api.post(prefixUrl,payload).then(res => {
     commit('SET_ITEM', res.data);
     SuccessHandlePrint('positive','created',1500);
     return true
   }).catch( er => {
     ErrorHandlePrint(er)
     return false
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
       ErrorHandlePrint(er)
       return false

     })
  },
  get({commit}) {

       api.get(prefixUrl).then(res => {

       commit('SET_ITEMS',res.data)
     }).catch(er => {
         ErrorHandlePrint(er)
     })
  },

  getTest({commit}) {

   commit('SET_TEST',[{
     title :'Azamat',
     id:1
   },
     {
       title :'Vepa',
       id:2
     }]);
  }
}
const getters = {

  getRecords: (state) => {
     return state.offices
   },
  officeById: (state) => (id) => {
     return state.offices.find(el => +el.id === +id)
  },
   officeByName : (state)  => (name) => {
    return  state.offices.length ?  state.offices.find( e => e.OfficeName === name) : false;
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
