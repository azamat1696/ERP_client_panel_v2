const columns = [
  { name: 'LicencePlate', align: 'center', label: 'Plaka', field: 'LicencePlate'},
  { name: 'Car', align: 'center', label: 'Araç', field: 'Car',  },
  { name: 'StartDate', align:'center', label: 'Başlama Tarihi', field: 'StartDate', sortable: true  },
  { name: 'EndDate', align:'center', label: 'Bitiş Tarihi', field: 'EndDate', sortable: true  },
  { name: 'Cost', align:'center', label: 'Ücreti', field: 'Cost', sortable: true  },
  { name: 'Not', align:'center', label: 'Açıklma', field: 'Not', sortable: true  },
  { name: 'Status', align:'center', label: 'Durumu', field: 'Status', sortable: true },
  { name: 'Files', align:'center', label: '', field: 'Files', sortable: false },

];
export  default columns;
