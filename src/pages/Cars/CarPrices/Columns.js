const columns = [
  { name: 'model_id', align:'center', label: '', field: 'model_id' },
  { name: 'BrandName', align: 'center', label: 'Marka Adı', field: 'BrandName', sortable: true },
  { name: 'ModelName', align: 'center', label: 'Model Adı', field: 'ModelName', sortable: false },
  { name: 'DailyPrice', align:'center', label: 'Günlük Ücreti', field: 'DailyPrice', sortable: true },
  { name: 'WeeklyPrice', align:'center', label: 'Haftalık Ücreti', field: 'WeeklyPrice', sortable: true },
  { name: 'MonthlyPrice', align:'center', label: 'Aylık Ücreti', field: 'MonthlyPrice', sortable: true },
  { name: 'YearlyPrice', align:'center', label: 'Yıllık Ücreti', field: 'YearlyPrice', sortable: true },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at' },
  { name: 'id', align:'center', label: '', field: 'id' },
];
export  default columns;
