const columns = [

  { name: 'LicencePlate', align: 'center', label: 'Araç Plakası', field: 'LicencePlate', sortable: true },
  { name: 'machinist_id', align: 'center', label: 'Makinist', field: 'machinist_id', sortable: true },
  { name: 'Description', align: 'center', label: 'Açıklama', field: 'Description', sortable: true },
  { name: 'EstimatedRepairCost', align: 'center', label: 'Tahmini Fiyatı', field: 'EstimatedRepairCost', sortable: true },
  { name: 'ReservationStartDate', align: 'center', label: 'Teslim Alma Tarihi', field: 'ReservationStartDate', sortable: true },
  { name: 'ReservationEndDate', align: 'center', label: 'Teslim Etme Tarihi', field: 'ReservationEndDate', sortable: true },
  { name: 'ReservationStatus', align:'center', label: 'Statusu', field: 'ReservationStatus', sortable: true },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
