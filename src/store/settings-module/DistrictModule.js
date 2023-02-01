import {api} from 'boot/axios';
import {Notify} from "quasar";

const prefixUrl = 'districts';
const state = {
   districts : []
}

const mutations = {
 SET_ITEM(state,item){
   state.districts.push(item)
 },
  SET_ITEMS(state,items) {
    state.districts = items
  },
  SET_REPLACE(state,item){
    state.districts.forEach(function (el,i) {
      if(el.id === item.id ){
        state.districts[i] = item;
      }
    })

  },
}

const actions = {
create({commit},payload){
  return api.post(prefixUrl,payload).then(res => {
    commit('SET_ITEM',res.data)

  })
},
  async get({commit}){
    await  api.get(prefixUrl).then(res => {

      commit('SET_ITEMS',res.data)
    }).catch(er =>{

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
}

const getters = {
  getRecords : (state) => {
    return state.districts
  },
  getRecordsById : (state) => (id) => {
     return state.districts.filter( e =>  +e.city_id ===  +id )
  },
  getRecordById : (state) => (id) => {
    return state.districts.find( e =>  +e.id ===  +id )
  },


}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
