import {api} from 'boot/axios';
import {SuccessHandlePrint} from "src/Utils/SuccessHandlePrint";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
import {Loading} from "quasar";
const prefixUrl = 'cars';

const state = {
  cars : [],
  reservationFilterCars : [],
  carsDetailsCount: 0,
  allCarsCount: 0,
  carsDetails : [],
  allCarsDetails : [],
}

const mutations = {

  SET_ITEM(state,item) {
    state.cars.push(item)
  },
  SET_ITEMS(state,items) {
    state.cars = items
  },
  SET_REPLACE(state,item) {
    state.cars.forEach(function(el, i) {
      if (el.id === item.id)
        state.cars[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.cars.length; i++)
    {
      if (state.cars[i].id === id)
      {
        state.cars.splice(i,1);
        break;
      }
    }
  },
  SET_RESERVATION_FILTERED_CARS(state,result) {
    state.reservationFilterCars = result
  },
  CLEAR_RESERVATION_FILTERED_CARS(state) {
    state.reservationFilterCars = []
  },

  SET_CARS_DETAILS(state,items){

    state.allCarsCount =items.allCars
    state.allCarsDetails =items.allCarsDetails
    state.carsDetailsCount = items.count
    state.carsDetails = items.records
  }

}

const actions = {

  create({commit},payload) {
    return   api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM',res.data);
      SuccessHandlePrint('positive','created',1000)
      return true
    }).catch(er => {
       ErrorHandlePrint(er)
    })
  },
  update({commit},payload){
    return  api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      SuccessHandlePrint('positive','updated')
      return true
    }).catch(er => {

    })
  },
  get({commit}){
    api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er =>{

    })
  },
  destroy({commit}, id) {
    api.delete(prefixUrl +"/"+id).then(res => {
      commit('SET_REMOVE',id);
      SuccessHandlePrint('positive','created')

    }).catch(er => {

    })
  },
 async getCarsDetails({commit}){

    return await api.post('cars-details').then(res => {
       commit('SET_CARS_DETAILS',res.data)
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  async filterCars({commit},payload) {
  return await  api.post( 'filter-cars',payload).then(res => {
    // SuccessHandlePrint('positive','searched',1000)
    commit('SET_RESERVATION_FILTERED_CARS',res.data)
       return true
    }).catch(er => {

      ErrorHandlePrint(er)
    })
  },
  async getFilterCars({commit},payload){
    return await  api.post('find-car-by-licence-plate',payload).then(res =>{
      return  res.data
    }).catch(er =>{
      ErrorHandlePrint(er)
      return false
    }).finally(() => {
      Loading.hide()
    })
  },
  exportCarsReport(){
    Loading.show({message: 'Dosya Yükleniyor Lütfen Bekleyiniz...'})
    return api.get('export-cars',{responseType:'blob'}).then(res => {
      Loading.hide()
      let blob = res.data
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "cars-report.xlsx"
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
    return state.cars
  },
  CarsDetails : (state) => {
    return state.carsDetails
  },
  carsDetailsCountGetter : (state) => {
    return state.carsDetailsCount
  },
  allCarsCountGetter : (state) => {
    return state.allCarsCount
  },
  allCarsDetails:(state)=> {
    return state.allCarsDetails
  },
  getRecordsById : (state) => (id) => {
     return  state.cars.filter(e => +e.car_models_id === +id)
  },
  getRecordsByCarId : (state) => (id) => {
    return  state.cars.filter(e => +e.id === +id)
  },
  getFilteredReservationCars : (state) => {
    return state.reservationFilterCars
  },
  getRecordByCarId : (state) => (id) =>{
    return state.cars.find( e => +e.id === +id)
  },
  getRecordsByName : (state) => (name) => {
    return  state.carsDetails.filter(e => e.ModelName === name)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
