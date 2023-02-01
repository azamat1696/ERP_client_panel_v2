import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'


import Auth from "src/store/auth/Auth";
import CarBrandsModule from "src/store/cars-module/CarBrandsModule";
import CarModelsModule from "src/store/cars-module/CarModelsModule";
import CarTypesModule from "src/store/cars-module/CarTypesModule";
import CarFuelTypesModule from "src/store/cars-module/CarFuelTypesModule";
import CarTransmissionsModule from "src/store/cars-module/CarTransmissionsModule";
import CarClassesModule from "src/store/cars-module/CarClassesModule";
import CompanyDetails from "src/store/settings-module/CompanyDetails";
import CarPricesModule from "src/store/cars-module/CarPricesModule";
import CountryModule from "src/store/settings-module/CountryModule";
import Cities from "src/store/settings-module/CitiesModule";
import DistrictModule from "src/store/settings-module/DistrictModule";
import CustomersModule from "src/store/users/CustomersModule";
import CustomerGroupsModule from "src/store/users/CustomerGroupsModule";
import MainModule from "src/store/main/MainModule";
import OfficeModule from "src/store/settings-module/OfficeModule";
import CarsModule from "src/store/cars-module/CarsModule";
import MachinistTypesModule from "src/store/machinist/MachinistTypesModule";
import MachinistCompaniesModule from "src/store/machinist/MachinistCompaniesModule";
import MachinistDamageRecordsModule from "src/store/machinist/MachinistDamageRecordsModule";
import CarDamagesModule from "src/store/cars-module/CarDamagesModule";
import CarExtrasModule from "src/store/cars-module/CarExtrasModule";
import Reservations from './Reservations'
import UsersModule from "src/store/users/UsersModule";
import InvoiceSales from './InvoiceSales'
import Reports from "src/store/Reports";
import ReservationInvoices from "src/store/ReservationInvoices";
import CarInspection from "src/store/car-inspection";
import CarInsuranceModule from "src/store/car-insurance/CarInsuranceModule";
import SeyruSeferModule from "src/store/seyrusefer-module/SeyruSeferModule";
import SeasonCarPricesModule from "src/store/cars-module/SeasonCarPricesModule";
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Auth,
      CarBrandsModule,
      CarModelsModule,
      CarTypesModule,
      CarFuelTypesModule,
      CarTransmissionsModule,
      CarClassesModule,
      CompanyDetails,
      CarPricesModule,
      CountryModule,
      Cities,
      DistrictModule,
      CustomersModule,
      MainModule,
      OfficeModule,
      CarsModule,
      MachinistTypesModule,
      MachinistCompaniesModule,
      MachinistDamageRecordsModule,
      CarDamagesModule,
      CustomerGroupsModule,
      CarExtrasModule,
      Reservations,
      UsersModule,
      InvoiceSales,
      Reports,
      ReservationInvoices,
      CarInspection,
      CarInsuranceModule,
      SeyruSeferModule,
      SeasonCarPricesModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
