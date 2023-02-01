import {api} from "boot/axios";
import {Loading, Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";

const prefixURL = 'insurance-cars';
const state = {
  CarInsurance : []
}

const mutations  = {
  setCarInsurance (state,newItem) {
    state.CarInsurance = newItem
  },
  addCarInsurance(state,brand)
  {
    let dataFind = state.CarInsurance.find( el => el.LicencePlate === brand.LicencePlate)

    if(dataFind)
    {
      for(let i=0; i < state.CarInsurance.length; i++ )
      {
        if(state.CarInsurance[i].LicencePlate === brand.LicencePlate)
        {
          state.CarInsurance.splice(i,1)
          break;
        }
      }
    }
    state.CarInsurance.push(brand)
  },
  reloadCarInsurance(state,newRecord) {
    state.CarInsurance =  state.CarInsurance.map(el =>{
      if ( el.id === newRecord.id)
      {
        return newRecord

      }
      return  el;
    });
  },
  removeCarInsurance(state,recordID) {
    for (let i = 0; i < state.CarInsurance.length; i++)
    {
      if (state.CarInsurance[i].id === recordID)
      {
        state.CarInsurance.splice(i,1);
        break;
      }
    }

  }
}
/*
Actionlar dış API ile haberleşme
 */
const actions  = {
  async create({commit},payload) {
    api.post(prefixURL,payload).then(res => {
      commit('addCarInsurance',res.data[0]);
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Seyrüsefer Başarıyla Kayıt Yapıldı'
      });
      return true
    }).catch(er => {
      for (const [key, value] of Object.entries(er.response.data.payload)) {
        Notify.create({
          position :'top-right',
          type : 'warning',
          message :`${key}: ${value}`
        });
      }
      return false
    })
  },
  getCarInsurance({commit}) {
    return  api.get(prefixURL).then(res => {
      commit('setCarInsurance',res.data)
      return res.data
    }).catch(er => {
      Notify.create({
        position :'top-right',
        type : 'warning',
        message : er
      })
    })
  },
  async update({commit}, payload) {
    const url = prefixURL + "/" + payload.get('id');
    await api.post(url, payload).then(res => {
      commit('reloadCarInsurance',res.data[0])
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Seyrüsefer Başarıyla Güncellendi'
      });
    }).catch(er => {
      if (er.response.status === 401)
      {
        this.$store.commit('Auth/clearToken')
        this.$store.dispatch('Auth/logOut')
      }
      Notify.create({
        position :'top-right',
        type : 'negative',
        message :'Hata Oluştu'
      });
    })
  },
  destroy({commit},id) {
    const url = prefixURL + "/"+id;
    api.delete(url).then(res => {
      commit('removeCarInsurance',id)
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Seyrüsefer Başarıyla Silindi'
      });

    }).catch(er => {
      Notify.create({
        position :'top-right',
        type : 'negative',
        message :'Hata :'+er.response.data.message
      })
    })
  },
  async getCarInsuranceDownload({commit},invoiceId) {
    Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
    return await api.get('insurance-download/'+invoiceId
      ,{
        responseType:'blob'
      }
    ).then(res => {
      Loading.hide()
      let blob = res.data
      let extension = blob.type.split('/')
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download =Math.floor(Math.random() * 10000)+"."+extension[1];
      link.click()
      return true
    }).catch(er => {
      Loading.hide()
      console.log("On Server Error",er)
      ErrorHandlePrint(er)
    })
  }
}
/*
Getterlar her zaman state objelerine ulaşman için
 */
const getters =  {
  getCarInsuranceState : function (state) {
    return state.CarInsurance
  },
  getRecordsByStatus :   (state) => (status) => {
    return state.CarInsurance.filter(e => +e.Status === status)
  },
  getCarBrandFromState :   (state) => (id) => {
    return state.CarInsurance.find(el => +el.id === +id)
  }
}

export  default   {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}
