import {api} from 'boot/axios';
const prefixUrl = 'customers';
const documentsPrefixUrl = 'customer-documents';
const fileDownloadPrefixUrl = 'file-download';
const driversPrefixUrl = 'customer-drivers'
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {Loading} from "quasar";

const state = {
  customers : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.customers.push(item)
  },
  SET_ITEMS(state,items) {
    state.customers = items
  },
  SET_REPLACE(state,item) {
    state.customers.forEach(function(el, i) {
      if (el.id === item.id){
        state.customers[i] = item;
      }

    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.customers.length; i++)
    {
      if (state.customers[i].id === id)
      {
        state.customers.splice(i,1);
        break;
      }
    }
  },

  SET_NEW_DOCUMENT(state,document) {
   state.customers.find(e => +e.id === +document.customer_id).customer_documents.push(document)
  },
  SET_NEW_DRIVERS(state,driver) {
    state.customers.find(e => +e.id === +driver.customer_id).customer_drivers.push(driver)
  }
}

const actions = {

  create({commit},payload) {
     return   api.post(prefixUrl,payload).then(res => {
       commit('SET_ITEM',res.data);
       SuccessHandlePrint('positive','created',1500);
      return res.data
    }).catch(er => {
      ErrorHandlePrint(er)
       return false
    })
  },
  async customerDocumentCreate({commit},payload) {
  return  await  api.post(documentsPrefixUrl,payload).then(res => {
        commit('SET_NEW_DOCUMENT',res.data);
        SuccessHandlePrint('positive','created',1500);
       return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  async customerDriversCreate({commit},payload) {
  return  await api.post(driversPrefixUrl,payload).then(res => {
      commit('SET_NEW_DRIVERS',res.data);
      SuccessHandlePrint('positive','created',1500);
    // return res.data
      // return {
      //   'res':res.data,
      //   'resTrue':true
      // }
    return true
    }).catch(er => {
       ErrorHandlePrint(er)
    })
  },
  async update({commit},payload){
    return await api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {

      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','updated',1500);
      return true
    }).catch(er => {

    })
  },
 async get({commit}){
 return  await  api.get(prefixUrl).then(res => {

      commit('SET_ITEMS',res.data)
    }).catch(er => {
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
  },
  downloadFile({commit},payload) {
   api.get(fileDownloadPrefixUrl+"/"+payload.folder+"/"+payload.fileName,{
     responseType:'blob'
   }).then(res => {
     let blob = res.data
     let link = document.createElement('a')
     link.href = window.URL.createObjectURL(blob)
     link.download =payload.fileName
     link.click()
    }).catch(er =>{

     ErrorHandlePrint(er)
    })
  },
  exportCustomersReport(){
    Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
    return api.get('export-costumers',{responseType:'blob'}).then(res => {
      Loading.hide()
      let blob = res.data
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "customers-report.xlsx"
      link.click()
      return true
    }).catch(er => {
      Loading.hide()

      ErrorHandlePrint(er)
    })
  }

}

const getters = {

  getRecords : (state) => {
    return state.customers
  },
  getRecord : (state) => (id) =>{
    return state.customers.find( e => +e.id === +id)
  },
  getRecordByCustomerType : (state) => {
    return state.customers.filter(el => el.CustomerType !== 'Corporate')
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
