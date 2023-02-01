import {api} from "boot/axios";
import {Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixURL = '/car-brands';
const state = {
carBrands : []
}

const mutations  = {
  setCarBrands (state,newItem) {

   state.carBrands = newItem



  },
  setCarBrand(state,brand)
  {
    state.carBrands.push(brand)
  },
  reloadCarBrands(state,newRecord) {
    state.carBrands =  state.carBrands.map(el => {
      if ( el.id === newRecord.id)
      {
        return newRecord

      }
      return  el;
    });
  },
  removeCarBrand(state,recordID) {
    for (let i = 0; i < state.carBrands.length; i++)
    {
      if (state.carBrands[i].id === recordID)
      {
        state.carBrands.splice(i,1);
        break;
      }
    }

  }
}
/*
Actionlar dış API ile haberleşme
 */
const actions  = {
  create({commit},payload) {
   api.post('/car-brands',payload).then(res => {

     commit('setCarBrand',res.data);
      Notify.create({
       position :'top-right',
       type : 'positive',
       message :'Marka Başarıyla Kayıt Yapıldı'
     });
  this.$router.push({name : 'carBrands'})
   }).catch(er => {
     ErrorHandlePrint(er)
     // for (const [key, value] of Object.entries(er.response.data.payload)) {
     //   Notify.create({
     //     position :'top-right',
     //     type : 'warning',
     //     message :`${key}: ${value}`
     //   });
     // }
   })

 },
  getCarBrands({commit}) {
   return  api.get('/car-brands').then(res => {
      if (res.data.length === 0) {
        Notify.create({
          position :'top-right',
          type : 'warning',
          message :'Herhangi bir marka kaydı bulunmamaktadir.'
        })
      }
      commit('setCarBrands',res.data)

      return res.data
   }).catch(er => {
     ErrorHandlePrint(er)
   })
  },
  async update({commit}, payload) {
    const url = prefixURL + "/" + payload.get('id');
    await api.post(url, payload).then(res => {
      commit('reloadCarBrands',res.data)
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Marka Başarıyla Güncellendi'
      });
    }).catch(er => {
      ErrorHandlePrint(er)
      // if (er.response.status === 401)
      // {
      //   this.$store.commit('Auth/clearToken')
      //   this.$store.dispatch('Auth/logOut')
      // }
      // Notify.create({
      //   position :'top-right',
      //   type : 'negative',
      //   message :'Hata Oluştu'
      // });
    })
  },
  destroy({commit},id) {
    const url = prefixURL + "/"+id;
    api.delete(url).then(res => {
      commit('removeCarBrand',id)
      Notify.create({
        position :'top-right',
        type : 'positive',
        message :'Marka Başarıyla Silindi'
      });

    }).catch(er => {
      ErrorHandlePrint(er)
      // Notify.create({
      //   position :'top-right',
      //   type : 'negative',
      //   message :'Hata :'+er.response.data.message
      // })
    })
  }
}
/*
Getterlar her zaman state objelerine ulaşman için
 */
const getters =  {
  getCarBrandsState : function (state) {
    return state.carBrands
  },
  getRecordsByStatus :   (state) => (status) => {
    return state.carBrands.filter(e => +e.Status === status)
  },
  getCarBrandFromState :   (state) => (id) => {
     return state.carBrands.find(el => +el.id === +id)
  }
}

export  default   {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}
