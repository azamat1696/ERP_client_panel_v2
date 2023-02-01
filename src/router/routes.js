
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '',  name : 'root', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/auth/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name : 'login', component: () => import('pages/Auth/Login.vue') }
    ]
  },
  {
    path: '/cars',
    component: () => import('layouts/ContentLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/cars/car-brands', name:'carBrands', component: () => import('pages/Cars/CarBrands/Index') },
      { path: '/cars/update-car-brands/:id', name:'updateCarBrands', props: true, component: () => import('pages/Cars/CarBrands/Update.vue') },
      { path: '/create-car-brands', name:'createCarBrands', component: () => import('pages/Cars/CarBrands/Create.vue') },
      { path: '/car-models',name:'carModel', component: () => import('pages/Cars/CarModels/Index.vue') },
      { path: '/car-fuel-types',name:'carFuelType', component: () => import('pages/Cars/CarFuelTypes/Index.vue') },
      { path: '/car-transmissions',name:'carGearType', component: () => import('pages/Cars/CarTransmissions/Index.vue') },
      { path: '/car-classes',name:'carClasses', component: () => import('pages/Cars/CarClasses/Index.vue') },
      { path: '/car-list', name:'carList', component: () => import('pages/Cars/Cars/Index.vue') },
      { path: '/cars-create', name:'createCar', component: () => import('pages/Cars/Cars/Create.vue') },
      { path: '/cars-edit/:id', name:'editCar', component: () => import('pages/Cars/Cars/Edit.vue') },
      { path: '/car-types',name:'carType', component: () => import('pages/Cars/CarTypes/Index.vue') },
      { path: '/car-prices',name:'carPrices', component: () => import('pages/Cars/CarPrices/Index.vue') },
      { path: '/car-extras',name:'carExtras', component: () => import('pages/Cars/CarExtras/Index') },
      { path: '/car-inspections',name:'carInspections', component: () => import('pages/Cars/CarInspections/Index') },
      { path: '/seyrusefer', name:'CarSeyrusefer', component: () => import('pages/Cars/CarSeyruSefer/Index.vue') },
      { path: '/insurance', name:'CarInsurance', component: () => import('pages/Cars/CarInsurance/Index.vue') },
      { path: '/car-season-prices',name:'carSeasonPrices', component: () => import('pages/Cars/CarSeasonsPrices/Index.vue') },

    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/settings/base', name:'baseSettings', component: () => import('pages/Settings/Base/Index') },
      { path: '/settings/company', name:'companySettings', component: () => import('pages/Settings/Company/Index') },
      { path: '/settings/locations', name:'offices', component: () => import('pages/Settings/Offices/Index') },
      { path: '/settings/counties', name:'countries', component: () => import('pages/Settings/Address/Countries.vue') },
      { path: '/settings/districts', name:'districts', component: () => import('pages/Settings/Address/District.vue') },
      { path: '/settings/cities', name:'cities', component: () => import('pages/Settings/Address/Cities.vue') },
    ]
  },
  {
    path: '/users',
    component: () => import('layouts/UsersLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/users/customers', name:'customers', component: () => import('pages/Users/Customers') },
      { path: '/users/users', name:'users', component: () => import('pages/Users/Users') },
      { path: '/users/companies', name:'companies', component: () => import('pages/Users/CompanyCustomers') },
      { path: '/users/groups', name:'groups', component: () => import('pages/Users/Groups') },

    ]
  },
  {
    path: '/reservations',
    component: () => import('layouts/ReservationsLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/new', name:'createReservations', component: () => import('pages/Reservations/New/Create') },
      { path: '/list', name:'listReservations', component: () => import('pages/Reservations/Index') },
      { path: '/last', name:'lastReservations', component: () => import('pages/Reservations/Last/LastReservations') },
      { path: '/old-reservations', name:'oldReservations', component: () => import('pages/Reservations/OldReservations') },

    ]
  },
  {
    path: '/machinists',
    component: () => import('layouts/MachinistLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/machinist-types', name:'machinistTypes', component: () => import('pages/Machinist/MachinistTypes/Index.vue') },
      { path: '/machinist-companies', name:'machinistCompanies', component: () => import('pages/Machinist/MachinistCompanies/Index.vue') },
      { path: '/machinist-car-damage', name:'machinistCarDamage', component: () => import('pages/Machinist/MachinistDamageRecord/Index.vue') },
      { path: '/machinist-car-damage-create', name:'machinistCarDamageCreate', component: () => import('pages/Machinist/MachinistDamageRecord/Create.vue') },
      { path: '/machinist-car-damage-edit/:machinistDamageId', name:'MachinistCarEditDamage', component: () => import('pages/Machinist/MachinistDamageRecord/MachinistCarEditDamage.vue') },

    ]
  },
  {
    path: '/reports',
    component: () => import('layouts/ReportsLayout.vue'),
    meta : {requiresAuth : true},
    children: [
      { path: '/base-reports', name:'baseReports', component: () => import('pages/Reports/Index.vue') },
      { path: '/reports/invoice-sales', name:'invoiceSales', component: () => import('pages/Reports/InvoiceSales/Index')}

    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
