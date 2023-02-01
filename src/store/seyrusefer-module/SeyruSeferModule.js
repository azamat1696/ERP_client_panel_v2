import {api} from "boot/axios";
import {Loading, Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";

const prefixURL = 'seyrusefer-cars';
const state = {
  CarSeyrusefer : []
}

const mutations  = {
  setCarSeyrusefer (state,newItem) {
    state.CarSeyrusefer = newItem
  },
  addCarSeyrusefer(state,brand)
  {
   let dataFind = state.CarSeyrusefer.find( el => el.LicencePlate === brand.LicencePlate)

    if(dataFind)
    {
         for(let i=0; i < state.CarSeyrusefer.length; i++ )
         {
           if(state.CarSeyrusefer[i].LicencePlate === brand.LicencePlate)
           {
             state.CarSeyrusefer.splice(i,1)
             break;
           }
         }
    }
    state.CarSeyrusefer.push(brand)
  },
  reloadCarSeyrusefer(state,newRecord) {
    state.CarSeyrusefer =  state.CarSeyrusefer.map(el =>{
      if ( el.id === newRecord.id)
      {
        return newRecord

      }
      return  el;
    });
  },
  removeCarSeyrusefer(state,recordID) {
    for (let i = 0; i < state.CarSeyrusefer.length; i++)
    {
      if (state.CarSeyrusefer[i].id === recordID)
      {
        state.CarSeyrusefer.splice(i,1);
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
 return await   api.post(prefixURL,payload).then(res => {
      commit('addCarSeyrusefer',res.data[0]);
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
  getCarSeyrusefer({commit}) {
    return  api.get(prefixURL).then(res => {
      // console.log('get seyrusefer ',res.data)
      // if (res.data.length === 0) {
      //   Notify.create({
      //     position :'top-right',
      //     type : 'warning',
      //     message :'Herhangi bir marka kaydı bulunmamaktadir.'
      //   })
      // }
      commit('setCarSeyrusefer',res.data)
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
      commit('reloadCarSeyrusefer',res.data[0])
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
      commit('removeCarSeyrusefer',id)
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
  async getCarSeyruseferDownload({commit},invoiceId) {
    Loading.show({message:'Dosya İndiriliyor Lütfen Bekleyiniz...'})
    return await api.get('seyrusefer-download/'+invoiceId
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
  getCarSeyruseferState : function (state) {
    return state.CarSeyrusefer
  },
  getRecordsByStatus :   (state) => (status) => {
    return state.CarSeyrusefer.filter(e => +e.Status === status)
  },
  getCarBrandFromState :   (state) => (id) => {
    return state.CarSeyrusefer.find(el => +el.id === +id)
  }
}

export  default   {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}
