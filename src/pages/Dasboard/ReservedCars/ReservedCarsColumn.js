const columns = [
  { name: 'id', label: 'ID', align: 'center', sortable: true, field: 'id'},
  { name: 'Status', label: 'Statüs', align:'center', field: 'Status', sortable: true },
  { name: 'Pickup', label: 'Aracı Alma Konumu', align:'center',field: 'Pickup' , sortable: true},
  { name: 'Return', label: 'Aracı Bırakma Konumu', align:'center', field: 'Return' , sortable: true},
  { name: 'Car', label: 'Araç', field: 'Car',align:'center', },
  { name: 'Customer', label: 'Müşteri', field: 'Customer',align:'center', },
  { name: 'CustomerPhone', label: 'Müşteri Numarası', field: 'CustomerPhone',align:'center', },
  { name: 'Amount', label: 'Ödeme', field: 'Amount', align:'left',  },
]

export default columns;
