<template>
  <div class="full-width">
    <div class="text-subtitle2 text-bold q-ml-sm">Yüklenen Belgeler</div>
    <div class="col-12 q-mt-sm q-mb-sm"><q-separator color="grey-5"  /></div>
    <q-table
      :rows="customer_documents"
      :columns="CustomerDocumentsColumns"
      row-key="id"
      rows-per-page-label="Sayfa başına kayıt:"
      dense
      flat
      class="no-box-shadow bg-transparent  "
      :filter="filterRow"
    >
      <template v-slot:top-left>
        <div class="text-subtitle">
          Müşteriye ait kayıtlı belgeler listesi buradan yönetilir.
        </div>
      </template>
      <template v-slot:top-right>
        <q-input   filled dense debounce="300" color="primary" v-model="filterRow"  placeholder="Belge Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="blue-grey-8"
          label="Yeni Belge Ekle "
          icon="add"
          dense
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click=" addNewDocumentDialog = true "
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>
            {{ this.$store.getters['MainModule/getDocumentType'](+props.row.DocumentTypeId).name }}
          </q-td>
          <q-td>
            {{ props.row.DocumentNumber  }}
          </q-td>
          <q-td>
            {{ props.row.DocumentNotes  }}
          </q-td>
          <q-td>
            {{ dateFormat(props.row.DocumentDateOfExpire)  }}
          </q-td>
          <q-td>
            {{ dateFormat(props.row.DocumentDateOfIssue)  }}
          </q-td>
          <q-td class="text-center">
            <q-btn   icon="download" size="sm" flat   color="blue-grey-8"   @click="downloadFile(props.row.DocumentPath)" />
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog v-model="addNewDocumentDialog" persistent>
      <q-card style="min-width: 600px">
        <q-bar class="bg-grey-3" style="min-height: 40px">
          <div class="text-subtitle1">Müşteriye Yeni Belge Yükleme</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form class="" @submit="onSubmitNewDocument()">
            <div class="row">
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Belge Türü Seçiniz</div>
                <q-select
                  v-model="documentFields.document_type_id"
                  :options="documentTypes"
                  :lazy-rules="true"
                  :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                  :option-label="(items) => items.name"
                  option-value="id"
                  emit-value
                  map-options
                  outlined
                  dense
                  hide-bottom-space
                />
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">  Belge Numarası </div>
                <q-input
                  outlined
                  dense
                  v-model="documentFields.document_number"
                  placeholder="328***"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space

                />
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8"> Belge Notu </div>
                <q-input
                  outlined
                  dense
                  v-model="documentFields.document_notes"
                  hide-bottom-space

                />
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">  Geçerlilik Tarihi </div>
                <q-input  dense outlined  v-model="documentFields.document_date_of_issue" mask="date" :rules="['date']" hide-bottom-space  >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date  v-model="documentFields.document_date_of_issue"   :locale="locale"   minimal>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Kapat" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">  Son Kullanım Tarihi </div>
                <q-input  dense outlined  v-model="documentFields.document_date_of_expire" mask="date" :rules="['date']" hide-bottom-space  >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date  v-model="documentFields.document_date_of_expire"   :locale="locale"  minimal >
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Kapat" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-4 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Belge Yükleyin </div>
                <q-file dense outlined bottom-slots v-model="documentFields.document_file"  @update:model-value="onSelectedNewFile" accept=".jpg, .png, .jpeg, .docx, .xlsx, .pdf">
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="documentFields.document_file = null" class="cursor-pointer" />
                  </template>

                </q-file>
              </div>
            </div>
            <div class="text-right"  >
              <q-btn label="Kaydet" type="submit" color="blue-grey-8"  icon-right="save"   />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CustomerDocumentsColumns from "./CustomerDocumentsColumns";
import {ref} from "vue";
import {dateFormat} from "pages/Js/Helpers";
export default {
  props : ['customer_documents','customerId'],
  name: "CustomerDocuments",
  setup() {
    const filterRow = ref('')
    return {
      filterRow,
      CustomerDocumentsColumns,
      addNewDocumentDialog : ref(false),
      documentFields : ref({
        document_type_id : ref(''),
        document_number : ref('123456'),
        document_date_of_issue :  ref('2022/02/18'),
        document_date_of_expire : ref('2022/02/28'),
        document_notes :  ref('Test Not'),
        document_file :  ref([]),
        imgPreview : ref('')
      }),
      dateFormat
    }
  },
  computed : {
    documentTypes() {
      return this.$store.getters['MainModule/getDocumentTypes']
    }
  },
  methods : {
    onSelectedNewFile(file) {
      switch (file.type) {
        case 'image/jpeg' || 'image/png':
          this.documentFields.imgPreview = URL.createObjectURL(file)
          break;
        default:
          this.documentFields.imgPreview = 'https://img.icons8.com/office/344/documents.png'
      }
    },
    downloadFile(fileName) {
      const payload = {
        'folder' : 'user-documents',
        'fileName' : fileName
      }
      this.$store.dispatch('CustomersModule/downloadFile',payload)
    },
    onResetNewDocumentFields() {
      this.documentFields. document_type_id = ''
      this.documentFields. document_number = ''
      this.documentFields. document_date_of_issue = ''
      this.documentFields. document_date_of_expire = ''
      this.documentFields. document_notes = ''
      this.documentFields. document_file = ''
    },
    onSubmitNewDocument() {
      let documentForm = new FormData();
      documentForm.append('customer_id',this.customerId)
      documentForm.append('DocumentTypeId',this.documentFields.document_type_id)
      documentForm.append('DocumentNumber',this.documentFields.document_number)
      documentForm.append('DocumentDateOfIssue',this.documentFields.document_date_of_issue)
      documentForm.append('DocumentDateOfExpire',this.documentFields.document_date_of_expire)
      documentForm.append('DocumentNotes',this.documentFields.document_notes)
      documentForm.append('File',this.documentFields.document_file)
      documentForm.append('Status',"1")

      this.$store.dispatch('CustomersModule/customerDocumentCreate',documentForm).then((res) => {
        if (res === true)
        {
          this.addNewDocumentDialog = false
          this.onResetNewDocumentFields()
        }
      })

    },
  }
}
</script>

<style scoped>

</style>
