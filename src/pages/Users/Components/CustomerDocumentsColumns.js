const columns = [
  { name: 'DocumentTypeId', align: 'center', label: 'Belge Türü', field: 'DocumentTypeId', sortable: false },
  { name: 'DocumentNumber', align: 'center', label: 'Belge No', field: 'DocumentNumber', sortable: false },
  { name: 'DocumentNotes', align:'center', label: 'Belge Notu', field: 'DocumentNotes' },
  { name: 'DocumentDateOfExpire', align:'center', label: 'Belge Veriliş Tarihi', field: 'DocumentDateOfExpire'  },
  { name: 'DocumentDateOfIssue', align:'center', label: 'Son Kullanım Tarihi', field: 'DocumentDateOfIssue'  },
  { name: 'DocumentPath', align:'center', label: 'İndir', field: 'DocumentPath' },
];
export  default columns;
