<template>
<div class="bg-white row">

  <q-card class="col-12 q-mt-md bg-transparent no-box-shadow q-mb-xl">
    <q-table
      title="Dış Fatura Satışlar Listesi"
      :rows="invoiceSales"
      :columns="baseSetting.invoiceSalesColumns"
      row-key="id"
      :filter="filterRow"
      rows-per-page-label="Sayfa başına kayıt:"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filterRow"  placeholder="Fatura Arayınız..."  >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="Yeni Kayıt "
          icon="add"
          class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
          @click=" baseSetting.newFormDialog = true"
        />

      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.index" class="text-center">
          <q-td>{{props.row.InvoiceNo}}</q-td>
          <q-td>{{props.row.InvoiceTitle}}</q-td>
          <q-td>{{props.row.Piece}}</q-td>
          <q-td>{{props.row.VatRate}}</q-td>
          <q-td>{{props.row.UnitPrice}} TL</q-td>
          <q-td>{{props.row.Total}} TL</q-td>
          <q-td>
            {{ baseSetting.dateFormat(props.row.created_at) }}
          </q-td>
          <q-td class="text-right">
            <q-btn
              flat
              color="blue-grey-8"
              icon="fas fa-edit"
              size="sm"
              @click="onEdit(props.row.id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white" :offset="[10, 10]">
                Fatura Düzenleme
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="print"
              color="blue-grey-8"
              fab flat
             @click="this.$store.dispatch('InvoiceSales/printSalesInvoice',props.row.id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura Yazdır
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="print"
              color="blue-grey-8"
              fab flat
              @click="this.$store.dispatch('InvoiceSales/printSalesInvoiceCollection',props.row.id)"
            >
              <q-tooltip class="bg-blue-grey-8 text-white">
                Fatura Tahsilat Makbuzu Yazdır
              </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog   v-model="baseSetting.newFormDialog" persistent >
      <q-card style="min-width: 700px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Satış Faturası Oluştur </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-banner dense class="bg-grey-1 q-pa-sm  ">
            <template v-slot:avatar>
              <q-icon name="priority_high" color="primary" />
            </template>
            <div class="text-subtitle2 text-bold">Bilgilendirme</div>
            <div class="text-weight-regular">
              1.Satış faturası oluşturulurken fatura TL bazlı işleme alınacaktır.
            </div>


          </q-banner>
          <q-form @submit="onsubmitInvoice">
            <div class="row">
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">İşlem Detayı</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.InvoiceTitle"
                  placeholder="İşlem detayı giriniz"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Fatura Numarası</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.InvoiceNo"
                  placeholder="Fatura Numarası Giriniz"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Birim Fiyatı</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.UnitPrice"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  @keyup="calculate"
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">KDV Oranı</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.VatRate"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  @keyup="calculate"
                />
              </div>
            </div>
            <div class="row">

              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Miktar</div>
                <q-input
                  type="number"
                  outlined
                  dense
                  v-model="formFields.Piece"
                  :lazy-rules="true"
                  :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  @keyup="calculate"
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Ara Toplam</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.SubTotal"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">KDV Toplamı</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.VatTotal"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8"> Toplam</div>
                <q-input
                  outlined
                  dense
                  v-model="formFields.Total"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <div class="text-subtitle2 text-grey-8"> Fatura Açıklaması</div>
                <q-input
                  type="textarea"
                  outlined
                  v-model="formFields.Description"
                  :input-style="{maxHeight:'80px'}"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-right">
                <q-btn type="submit" color="blue-grey-8" icon="save" label="Kaydet" />
              </div>
            </div>
          </q-form>

        </q-card-section>
       </q-card>
    </q-dialog>

    <q-dialog   v-model="baseSetting.editFormDialog" persistent >
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Satış Faturası Düzenleme </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-banner dense class="bg-grey-1 q-pa-sm  ">
            <template v-slot:avatar>
              <q-icon name="priority_high" color="primary" />
            </template>
            <div class="text-subtitle2 text-bold">Bilgilendirme</div>
            <div class="text-weight-regular">
              1.Satış faturası oluşturulurken fatura TL bazlı işleme alınacaktır.
            </div>


          </q-banner>
          <q-form @submit="onUpdateInvoice">
            <div class="row">
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">İşlem Detayı</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.InvoiceTitle"
                  placeholder="İşlem detayı giriniz"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Fatura Numarası</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.InvoiceNo"
                  placeholder="Fatura Numarası Giriniz"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Birim Fiyatı</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.UnitPrice"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  @keyup="updateCalculate"
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">KDV Oranı</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.VatRate"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  @keyup="updateCalculate"
                />
              </div>
            </div>
            <div class="row">

              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Miktar</div>
                <q-input
                  type="number"
                  outlined
                  dense
                  v-model="editFormFields.Piece"
                  :lazy-rules="true"
                  :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  @keyup="updateCalculate"
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">Ara Toplam</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.SubTotal"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8">KDV Toplamı</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.VatTotal"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
              <div class="col-3 q-pa-sm">
                <div class="text-subtitle2 text-grey-8"> Toplam</div>
                <q-input
                  outlined
                  dense
                  v-model="editFormFields.Total"
                  placeholder="0.00"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  hide-bottom-space
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <div class="text-subtitle2 text-grey-8"> Fatura Açıklaması</div>
                <q-input
                  type="textarea"
                  outlined
                  v-model="editFormFields.Description"
                  :input-style="{maxHeight:'80px'}"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-right">
                <q-btn type="submit" color="blue-8" icon="save" label="Güncelle" />
              </div>
            </div>
          </q-form>

        </q-card-section>
       </q-card>
    </q-dialog>
  </q-card>
</div>
</template>

<script>

const invoiceSalesColumns =   [
  { name: 'InvoiceNo', align: 'center', label: 'Fatura Numarası', field: 'InvoiceNo', sortable: true },
  { name: 'InvoiceTitle', align: 'center', label: 'İşlem', field: 'InvoiceTitle', sortable: true },
  { name: 'Piece', align: 'center', label: 'Miktar', field: 'Piece', sortable: true },
   { name: 'VatRate', align:'center', label: 'KDV Oranı', field: 'VatRate' },
  { name: 'UnitPrice', align:'center', label: 'Birim Fiyatı', field: 'UnitPrice'  },
  { name: 'Total', align:'center', label: 'Toplam', field: 'Total'  },
  { name: 'created_at', align:'center', label: 'Tarih', field: 'created_at',sortable: true },
  { name: 'id', align:'center', label: '', field: 'id' },
]

import {dateFormat}  from "pages/Js/Helpers";
import {ref} from "vue";
export default {
  name: "Index",
  setup() {
    const CustomersRows = []
    const filterRow = ref('')
    const pagination = {
      sortBy:'id',
      rowsPerPage:10
    }
    return {
      pagination,
      filterRow,
      baseSetting : ref({
        dateFormat,
        invoiceSalesColumns,
        CustomersRows,
        newFormDialog: ref(false),
        editFormDialog : ref(false),
        onEditCustomerId : ref(null)
      }),
      formFields : ref({
       InvoiceNo : '',
       InvoiceTitle : '',
       UnitPrice : '',
       Piece : 1,
       VatRate : '5.00',
       UnitTotal : '',
       SubTotal : '',
       VatTotal : '',
       Total : '',
       Description : '',
     }),
      editFormFields: ref({})
    }
  },
 methods : {
   onsubmitInvoice() {

    let formData = new FormData();
    for (const [k,v] of Object.entries(this.formFields))
    {
      formData.append(k,v)
    }
     this.$store.dispatch('InvoiceSales/create',formData).then(res => {
     if (res === true) {
       this.baseSetting.newFormDialog = false
       this.onReset()
     }
  })
  },
   calculate() {
     const piece = Number.parseInt(this.formFields.Piece)
     const unitPrice = Number.parseFloat(this.formFields.UnitPrice) * piece
     const vatRate = Number.parseFloat(this.formFields.VatRate)
     const vatRateTotal = (unitPrice * vatRate) / 100
     const subTotal = unitPrice - vatRateTotal;

     // set variables
     this.formFields.UnitTotal = unitPrice.toFixed(2)
     this.formFields.SubTotal = subTotal.toFixed(2)
     this.formFields.VatTotal = vatRateTotal.toFixed(2)
     this.formFields.Total = subTotal.toFixed(2)
     this.formFields.Piece = piece
   },
   updateCalculate() {
     const piece = Number.parseInt(this.editFormFields.Piece)
     const unitPrice = Number.parseFloat(this.editFormFields.UnitPrice) * piece
     const vatRate = Number.parseFloat(this.editFormFields.VatRate)
     const vatRateTotal = (unitPrice * vatRate) / 100
     const subTotal = unitPrice - vatRateTotal;

     // set variables
     this.editFormFields.UnitTotal = unitPrice.toFixed(2)
     this.editFormFields.SubTotal = subTotal.toFixed(2)
     this.editFormFields.VatTotal = vatRateTotal.toFixed(2)
     this.editFormFields.Total = subTotal.toFixed(2)
     this.editFormFields.Piece = piece
   },
   onReset() {

       this.formFields.InvoiceNo = ''
       this.formFields.InvoiceTitle = ''
       this.formFields.UnitPrice = ''
       this.formFields.Piece = 1
       this.formFields.VatRate = '5.00'
       this.formFields.UnitTotal = ''
       this.formFields.SubTotal = ''
       this.formFields.VatTotal = ''
       this.formFields.Total = ''
       this.formFields.Description = ''

   },
   onEdit(invoiceId) {
     this.editFormFields = JSON.parse(JSON.stringify(this.invoiceSales.find( e => +e.id === +invoiceId)))
     this.baseSetting.editFormDialog = true
   },
   onUpdateInvoice() {
     let formData = new FormData();
     for (const [k,v] of Object.entries(this.editFormFields))
     {
       formData.append(k,v)
     }
     formData.append('_method','PUT');
     this.$store.dispatch('InvoiceSales/update',formData).then(res => {
       if (res === true) {
         this.baseSetting.editFormDialog = false
         this.onReset()
       }
     })
   }
},
  mounted() {
    this.$store.dispatch('InvoiceSales/get')
  },
  computed : {
    invoiceSales() {
      return this.$store.getters['InvoiceSales/invoiceSalesGetter']
    }
  }
}
</script>

<style scoped>

</style>
