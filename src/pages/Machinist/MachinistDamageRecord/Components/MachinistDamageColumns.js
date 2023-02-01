const columns = [
  { name: 'damageTitle', align: 'center', label: 'Hasar Başlıgı', field: 'damageTitle', sortable: false },
  { name: 'damageDescription', align: 'center', label: 'Hasar Açıklaması', field: 'damageDescription', sortable: false },
  { name: 'damageLevel', align:'center', label: 'Hasar Boyutu  ', field: 'damageLevel', sortable: true },
  { name: 'damageSvgCode', align:'center', label: 'Hasar Kodu', field: 'damageSvgCode', sortable: true },
  { name: 'id', align:'center', label: '', field: 'id', sortable: false },
];
export  default columns;
