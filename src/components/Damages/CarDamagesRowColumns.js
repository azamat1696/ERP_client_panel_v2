const columns = [
   { name: 'DamageTitle', align: 'center', label: 'Hasar Başlıgı', field: 'DamageTitle', sortable: false },
   { name: 'DamagePrice', align: 'center', label: 'Tahmini Tamir Ücreti', field: 'DamagePrice', sortable: false },
 // { name: 'DamageDescription', align: 'center', label: 'Hasar Açıklaması', field: 'DamageDescription', sortable: false },
  { name: 'Status', align:'center', label: 'Hasar Durumu', field: 'Status', sortable: false },
  { name: 'DamageCode', align:'center', label: 'Hasar Kodu', field: 'DamageCode', sortable: true },
  { name: 'Status', align:'center', label: 'Hasar İşlem durumu', field: 'Status', sortable: true },


];

export  default columns;

