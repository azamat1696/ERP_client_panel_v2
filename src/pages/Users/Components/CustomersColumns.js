const columns = [
  { name: 'CustomerType', align: 'center', label: 'Müşteri Tipi', field: 'CustomerType', sortable: true },
  { name: 'customer_groups_id', align: 'center', label: 'Müşteri Grubu', field: 'customer_groups_id', sortable: true },
  { name: 'Name', align: 'center', label: 'Müşteri', field: 'Name', sortable: true },
  { name: 'Email', align:'center', label: 'E-posta', field: 'Email' },
  { name: 'Phone', align:'center', label: 'Telefon', field: 'Phone'  },
  { name: 'Address', align:'center', label: 'Açık Adres', field: 'Address'  },
  { name: 'Status', align:'center', label: 'Status', field: 'Status',sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at',sortable: true },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
