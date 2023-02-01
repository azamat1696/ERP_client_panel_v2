import {date} from "quasar";

const columns = [
  { name: 'id', align:'center', label: '', field: 'id' },
  { name: 'SeasonName', align: 'center', label: 'Sezon Adı', field: row => `${row.SeasonName}`,sortable: true },
  { name: 'StartDate', align:'center', label: 'Başlangıç Tarihi', field: 'StartDate',  format: val => date.formatDate(val,'DD.MM.YYYY')},
  { name: 'EndDate', align:'center', label: 'Bitiş Tarihi', field: 'EndDate', sortable: true, format: val => date.formatDate(val,'DD.MM.YYYY')},
  { name: 'Percentage', align:'center', label: 'Yüzde', field: 'Percentage', format: val => `${val} %` },
  { name: 'Status', align:'center', label: 'Status', field: 'Status', sortable: true },
  { name: 'Edit', align:'center', label: 'Aksiyon', field: 'Edit' },
];
export  default columns;
