const SearchedCarsColumns = [
  { name: 'LicencePlate', align: 'center', label: 'Araç Plakası', field: 'LicencePlate' },
  // { name: 'id', align: 'center', label: '', field: 'id' },
  { name: 'car', align : 'left', label: 'Araç', field: 'car'  },
  { name: 'Year', align : 'center', label: 'Araç Yılı', field: 'Year'  },
  { name: 'CarColor', align: 'center', label: 'Renk', field: 'CarColor' },
  { name: 'damages',  align: 'center', label: 'Araç Hasarı', field: 'damages' },
  { name: 'DailyPrice',  align: 'center', label: 'Ücret/Günlük', field: 'DailyPrice', sortable: true,   },
];
export  default SearchedCarsColumns;
