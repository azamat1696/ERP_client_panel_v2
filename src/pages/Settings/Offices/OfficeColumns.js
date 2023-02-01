const columns = [

  { name: 'OfficeName', align: 'center', label: 'Ofis  Adı', field: 'OfficeName', sortable: true },
  { name: 'OfficePhone', align: 'center', label: 'Telefon', field: 'OfficePhone', sortable: true },
  { name: 'OfficeEmail', align: 'center', label: 'E-posta', field: 'OfficeEmail', sortable: true },
  { name: 'cities_id', align: 'center', label: 'Şehir', field: 'cities_id', sortable: true },
  { name: 'districts_id', align: 'center', label: 'Bölge', field: 'districts_id', sortable: true },
  { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
