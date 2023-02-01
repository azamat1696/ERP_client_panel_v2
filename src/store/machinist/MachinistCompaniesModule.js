import {api} from "boot/axios";
import {Loading, Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "machinist-companies"

const state = {
  machinistCompanies : []
}
const mutations = {
  SET_ITEM(state,item) {
    state.machinistCompanies .push(item);
  },
  SET_ITEMS(state,items){
    state.machinistCompanies  = items
  },
  SET_REPLACE(state,item){
    state.machinistCompanies .forEach(function (el,i) {
      if(el.id === item.id ){
        state.machinistCompanies [i] = item;
      }
    })

  },
  SET_REMOVE(state,id){
    for (let i=0; i < state.machinistCompanies .length; i++)
    {
    if (state.machinistCompanies [i].id === id)
     {
      state.machinistCompanies .splice(i,1)
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
  },
  exportMachinist(){
    Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
    return api.get('export-machinist',{responseType:'blob'}).then(res => {
      Loading.hide()
      let blob = res.data
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "makinist.xlsx"
      link.click()
      return true
    }).catch(er => {
      Loading.hide()

      ErrorHandlePrint(er)
    })
  }

}
const getters = {
   machinistCompanies : (state) => {
     return state.machinistCompanies
   },
  elById: (state) => (id) => {
    return state.machinistCompanies.find(el => +el.id === +id)
  },

  elFilterById: (state) => (id) => {
    return state.machinistCompanies.filter(el => +el.machinist_type_id === +id)
  },
  elFiltersById: (state) => (id) => {
    return state.machinistCompanies.filter(el => +el.id === +id)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

