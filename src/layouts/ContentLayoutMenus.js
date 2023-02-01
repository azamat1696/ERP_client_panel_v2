let getMenu = function (name) {
  switch (name) {
    case 'cars':
      return CarsMenus;
    case 'settings' :
      return  SettingsMenus;
  }
}
const CarsMenus = [
  {
    id:1,
    icon: 'update',
    label: 'Araç Markaları',
    separator: true,
    name:'carBrands'
  },
  {
    id:2,
    icon: 'update',
    label: 'Araç Modelleri',
    separator: true,
    name:'carModel'
  },
  {
    id:3,
    icon: 'update',
    label: 'Araç Sınıfları',
    separator: true,
    name:'carClasses'
  },
  {
    id:4,
    icon: 'update',
    label: 'Araç Tipleri',
    separator: true,
    name:'carType'
  },
  {
    id:5,
    icon: 'update',
    label: 'Araç Yakıt Tipleri',
    separator: true,
    name:'carFuelType'
  },
  {
    id:6,
    icon: 'update',
    label: 'Araç Vites Tipleri',
    separator: true,
    name:'carGearType'
  },
  {
    id:7,
    icon: 'update',
    label: 'Araçlar',
    separator: true,
    name:'carList'
  }
];
const SettingsMenus = [
  {
    id:1,
    icon: 'update',
    label: 'Genel Ayarlar',
    separator: true,
    name:'baseSettings'
  },
]
export  default getMenu();
