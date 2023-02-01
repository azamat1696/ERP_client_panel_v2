const columns = [
  { name: 'machinist_type_id', align: 'center', label: 'Makinist türü', field: 'machinist_type_id', sortable: true },
  { name: 'CompanyName', align: 'center', label: 'Firma Adı', field: 'CompanyName', sortable: true },
  { name: 'CompanyPhone', align: 'center', label: 'Telefon', field: 'CompanyPhone', sortable: true },
  { name: 'CompanyEmail', align: 'center', label: 'E-posta', field: 'CompanyEmail', sortable: true },
  // { name: 'AuthorizedPerson', align: 'center', label: 'Yetkili', field: 'AuthorizedPerson', sortable: true },
  { name: 'CompanyAddress', align: 'center', label: 'Firma Adresi', field: 'CompanyAddress', sortable: true },
  { name: 'Status', align:'center', label: 'Statusu', field: 'Status', sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
