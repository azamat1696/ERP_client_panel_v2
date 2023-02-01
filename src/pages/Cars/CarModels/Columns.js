const columns = [
  { name: 'BrandLogo', align: 'center', label: 'Marka Adı', field: 'BrandLogo', sortable: false },
  { name: 'BrandName', align: 'center', label: 'Model Adı', field: 'BrandName', sortable: true },

  { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
