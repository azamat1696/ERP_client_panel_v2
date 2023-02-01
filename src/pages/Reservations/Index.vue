<template>
 <div class="q-pa-md">

   <q-table
     :rows="currentReservations"
     :columns="columns"
     row-key="id"
     :filter="filter"
     :filter-method="currentReservationFilter"
   >
     <template v-slot:top-left>

       <div class="row">
         <q-select
           label="Kira Cinsi / Tipi"
           outlined
           v-model="onFilterFields.ReservationType"
           :options="this.$store.getters['MainModule/getReservationTypes']"
           borderless
           dense
           options-dense
           emit-value
           map-options
           option-value="title"
           option-label="title"
           style="min-width:170px"
           class="q-pl-xs"
           @update:model-value="onFilterTable"
           clearable
           @clear="onFilterTable"
         />
         <q-select
           label="Rezervasyon Statusu"
           outlined
           v-model="onFilterFields.ReservationStatus"
           :options="this.$store.getters['MainModule/getReservationStatusFiltered']"
           borderless
           dense
           options-dense
           emit-value
           map-options
           option-value="code"
           option-label="title"
           style="min-width:170px"
           class="q-pl-xs"
           @update:model-value="onFilterTable"
           @clear="onFilterTable"
           clearable
         />
         <q-select
           label="Müşteri Grubu"
           outlined
           v-model="onFilterFields.CustomerGroupName"
           :options="customerGroupOptions"
           borderless
           dense
           options-dense
           use-input
           emit-value
           map-options
           option-value="Name"
           option-label="Name"
           style="max-width:220px"
           class="q-pl-xs"
           @update:model-value="onFilterTable"
           @clear="onFilterTable"
           @filter="onCustomerGroupFilter"
           clearable
         />

       </div>
     </template>
     <template v-slot:top-right>
       <q-input
         outlined
         dense
         debounce="500"
         color="primary"
         v-model="filter"
         placeholder="Araç,Müşteri,Office Arama yapınız..."
         style="width: 300px!important;"
       >
         <template v-slot:append>
           <q-icon name="search" />
         </template>
       </q-input>
       <q-btn
         color="primary"

         icon="add"
         class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
         :to="{ name: 'createReservations' }"
       >
         <q-tooltip class="bg-blue-grey-8 text-white">
           Yeni Rezervasyon oluştur
         </q-tooltip>
       </q-btn>

       <q-btn
         color="blue-grey-8"
         icon="archive"
         class="q-pa-sm"
         @click="this.$store.dispatch('Reservations/exportCurrentReservation')"
       >
         <q-tooltip class="bg-blue-grey-8 text-white">
           Excel Oluştur
         </q-tooltip>
       </q-btn>
       <q-btn
         color="blue-10"
         label=" Eski Rezervasyonlar"
         icon="history"
         class="q-mr-xs q-ml-xs q-pa-sm q-pr-md"
         :to="{ name: 'oldReservations' }"
       />
     </template>

     <template v-slot:body="props">



       <q-tr :props="props" :key="props.row.index" class="text-center">
         <q-td auto-width>
           <div class="text-subtitle1 text-blue-8" >{{props.row.id}}</div>
         </q-td>
         <q-td  >
           <div class="text-subtitle1 text-blue-grey-8" >#{{props.row.ReservationNo}}</div>
         </q-td>



         <q-td class="text-center" auto-width>
            <q-chip square :color="reservationStatusColor(props.row.ReservationStatus).color" text-color="white" :icon="reservationStatusColor(props.row.ReservationStatus).icon">
             {{reservationsStatus(props.row.ReservationStatus)}}
           </q-chip>
         </q-td>
         <q-td auto-width>
           <q-chip color="green" text-color="white" icon="done" v-if="props.row.PaymentState === 'Payed'">
             Alındı
           </q-chip>
           <q-chip color="orange" text-color="white" icon="star" v-else> Bekleniyor </q-chip>
         </q-td>
         <q-td class="text-center"   style="white-space: inherit">
           <show-location key="PickupLocation"  :date="props.row.StartDateTime" :office-name="props.row.PickupLocation" />
         </q-td>
         <q-td  style="white-space: inherit">
           <show-location key="DropUpLocation"   :date="props.row.EndDateTime" :office-name="props.row.DropLocation" />
         </q-td>
         <q-td  >
          <vehicle :brand="props.row.BrandName" :model="props.row.ModelName" :licence_plate="props.row.LicencePlate" :image="props.row.Image" />
         </q-td>
         <q-td auto-width  >
        <customer :customer="props.row.CustomerNameSurname" :type="props.row.CustomerType" :group_name="props.row.CustomerGroupName"/>

         </q-td>
         <q-td auto-width>
          <payment :total="props.row.TotalPrice" :payment_type="props.row.PaymentMethod" :currency_sembol="props.row.CurrencySymbol" />
         </q-td>
         <q-td auto-width>
           <q-btn flat round color="blue-grey-9 q-mt-xs" icon="card_membership"
                  @click="reservationUpdatePayMethodHandleBtn( props.row )">
             <q-tooltip class="bg-blue-grey-8 text-white">
               Rezervasyon Ödeme Durumunu Değiştir.
             </q-tooltip>
           </q-btn>
           <q-btn flat round color="blue-grey-9 q-mt-xs" icon="update"
                  @click="updateAllReservation( props.row )" >
             <q-tooltip class="bg-blue-grey-8 text-white">
               Rezervasyon Uzatma/Düzenleme
             </q-tooltip>
           </q-btn>
           <q-btn flat round color="blue-grey-9" icon="fas fa-edit" size="sm"
                  @click="reservationUpdateHandleBtn(
                          props.row.id,
                          props.row.ReservationStatus,
                          props.row.PaymentState
                          )">
             <q-tooltip class="bg-blue-grey-8 text-white">
               Rezervasyon durumunu yönet.
             </q-tooltip>
           </q-btn>

           <q-btn flat round color="blue-grey-9" icon="dashboard_customize" size="md"
                  @click="invoiceManage(props.row.id)" >
             <q-tooltip class="bg-blue-grey-8 text-white">
                Rezervasyon Evrak Yönetimi.<br>
                Sözleşme / Fatura / Makbuz
             </q-tooltip>
           </q-btn>
         </q-td>
       </q-tr>
     </template>
   </q-table>

   <q-dialog v-model="reservationManageDialog" persistent>
     <q-card style="width: 500px">
       <q-bar style="height: 50px">

         <div>Rezervasyon Durumunu Yönet</div>

         <q-space />

         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip>Kapat</q-tooltip>
         </q-btn>
       </q-bar>

       <q-card-section>
          <q-form @submit="onsubmitReservationStatus">
            <div class="row">
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Rezervasyon Statusu</div>
                <q-select
                  v-model="reservationFields.ReservationStatus"
                  :options="reservationStatus"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  emit-value
                  map-options
                  option-label="title"
                  option-value="code"
                  outlined
                  dense
                />
              </div>
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-8">Ödeme Durumu</div>
                <q-select
                  v-model="reservationFields.PaymentState"
                  :options="reservationPaymentStates"
                  :lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                  emit-value
                  map-options
                  option-label="title"
                  option-value="code"
                  outlined
                  dense
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 text-right">
                <q-btn type="submit" color="blue-grey-8" icon="save"   label="Kaydet" />
              </div>
            </div>

          </q-form>
       </q-card-section>


     </q-card>
   </q-dialog>


   <q-dialog v-model="invoiceManageDialog" persistent>
     <q-card style="width: 600px">
       <q-bar style="height: 50px">
         <div>Rezervasyon Evrak Yönetimi</div>
         <q-space />
         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip>Kapat</q-tooltip>
         </q-btn>
       </q-bar>

       <q-card-section>

         <div class="row bg-grey-2 q-pl-md q-pr-md" >
           <div class="col-12 q-pb-xs">
             <div class="text-subtitle2 text-bold">Fatura Bilgileri</div>
             <q-separator color="grey-5"  />
           </div>
           <div class="col-1  flex flex-center">
             <q-icon name="assignment" size="lg" color="blue-grey-6" />
           </div>
           <div class="col-4 q-pl-sm">
             <div class="text-subtitle1 text-left  "> Fatura</div>
             <div class="text-subtitle2 text-left text-bold flex" style="margin-top: -5px">
               ****  <span v-for="e in invoiceManageFields.InvoiceNo" :key="e"> - {{ e }} </span>
             </div>
           </div>

           <div class="col-7 text-right">
             <q-btn
               icon="published_with_changes"
               color="blue-grey-8"
               fab
               flat
              >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.InvoiceNo"
                     :key="n"
                     clickable
                     @click="editInvoiceNumber(invoiceManageFields.InvoiceID[i],n)"
                   >
                     <q-item-section>Fatura no güncelle  : <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}} </span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white" >
                 Fatura Numarasını Yenile
               </q-tooltip>
             </q-btn>

             <q-btn
               icon="mark_email_read"
               color="blue-grey-8"
               fab
               flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.InvoiceNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/sendReservationInvoiceToMail',invoiceManageFields.InvoiceID[i])"
                   >
                     <q-item-section>Fatura Gönder  : <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}} </span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Müşteriye  Mail Gönder
               </q-tooltip>
             </q-btn>
             <q-btn
               icon="cloud_download"
               color="blue-grey-8"
               fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.InvoiceNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/downloadInvoice',invoiceManageFields.InvoiceID[i])"
                   >
                     <q-item-section>Fatura İndir : <span class="text-subtitle2">  {{+n === +invoiceManageFields.reservationId ? 'Özel': n}}</span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Fatura İndir
               </q-tooltip>
             </q-btn>
             <q-btn
               icon="print"
               color="blue-grey-8"
               fab flat

             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.InvoiceNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/printInvoice',invoiceManageFields.InvoiceID[i])"
                   >
                     <q-item-section>Fatura Numarası : <span class="text-subtitle2">  {{+n === +invoiceManageFields.reservationId ? 'Özel': n}} </span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Fatura Yazdır
               </q-tooltip>
             </q-btn>
           </div>
         </div>

         <div class="row q-mt-sm bg-grey-2 q-pl-md q-pr-md" >
           <div class="col-12 q-pb-xs">
             <div class="text-subtitle2 text-bold ">Makbuz / Tahsilat Bilgileri</div>
             <q-separator color="grey-5"  />
           </div>
           <div class="col-1  flex flex-center">
             <q-icon name="description" size="lg" color="blue-grey-6" />
           </div>
           <div class="col-5 q-pl-sm">
             <div class="text-subtitle1 text-left  "> Makbuz / Tahsilat</div>
             <div class="text-subtitle2 text-left text-bold" style="margin-top: -5px">
               ****  <span v-for="e in invoiceManageFields.ReceiptCollectionNo" :key="e">{{ +e ===  +invoiceManageFields.reservationId ? 'Özel' : ' - '+ e }} </span>
             </div>
           </div>

           <div class="col-6 text-right">
             <q-btn
               icon="published_with_changes" color="blue-grey-8" fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReceiptCollectionNo"
                     :key="n"
                     clickable
                     @click="editReceiptNumber(invoiceManageFields.ReceiptID[i],n)"
                   >
                     <q-item-section>Fatura No Gönder  : <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}}</span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Makbuz Numarasını Yenile
               </q-tooltip>
             </q-btn>

             <q-btn
               icon="mark_email_read" color="blue-grey-8" fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReceiptCollectionNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/sendReservationReceiptToMail',invoiceManageFields.ReceiptID[i])"
                   >
                     <q-item-section>Fatura No Gönder: <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}}</span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Müşteriye  Mail Gönder
               </q-tooltip>
             </q-btn>
             <q-btn icon="cloud_download" color="blue-grey-8" fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReceiptCollectionNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/downloadReceipt',invoiceManageFields.ReceiptID[i])"
                   >
                     <q-item-section>Fatura No İndir: <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}} </span></q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Makbuz / Tahsilat PDF İndir
               </q-tooltip>
             </q-btn>

             <q-btn
               icon="print"
               color="blue-grey-8"
               fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReceiptCollectionNo"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/printReceipt',invoiceManageFields.ReceiptID[i])"
                   >
                     <q-item-section>Fatura Numarası  : <span class="text-subtitle2"> {{+n === +invoiceManageFields.reservationId ? 'Özel': n}} </span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Makbuz / Tahsilat Yazdır
               </q-tooltip>
             </q-btn>
           </div>

         </div>

         <div class="row q-mt-sm bg-grey-2 q-pl-md q-pr-md" >
           <div class="col-12 q-pb-xs">
             <div class="text-subtitle2 text-bold ">Sözleşme Bilgileri</div>
             <q-separator color="grey-5"  />
           </div>
           <div class="col-1  flex flex-center">
             <q-icon name="receipt_long" size="lg" color="blue-grey-6" />
           </div>
           <div class="col-5 q-pl-sm">
             <div class="text-subtitle1 text-left  "> Sözleşme</div>
             <div class="text-subtitle2 text-left text-bold" style="margin-top: -5px">
               **** -  {{ invoiceManageFields.ReservationNo }}
             </div>
           </div>

           <div class="col-6 text-right">
             <q-btn
               icon="published_with_changes" color="blue-grey-8" fab flat

             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReservationNoOfArray"
                     :key="n"
                     clickable
                     @click="editReservationNumber(invoiceManageFields.ReservationIdOfArray[i],invoiceManageFields.ReservationNoOfArray[i])"
                   >
                     <q-item-section>Rezervasyon Numarası: : <span class="text-subtitle2"> {{ n }} </span> </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Sözleşme Numarasını Yenile
               </q-tooltip>
             </q-btn>

             <q-btn
               icon="mark_email_read" color="blue-grey-8" fab flat
             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReservationNoOfArray"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/sendReservationAgreementToMail',invoiceManageFields.ReservationIdOfArray[i])"
                   >
                     <q-item-section>Rezervasyon Numarası:  {{ invoiceManageFields.ReservationNoOfArray[i] }} </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Müşteriye  Mail Gönder
               </q-tooltip>
             </q-btn>
             <q-btn icon="cloud_download" color="blue-grey-8" fab flat

             >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReservationNoOfArray"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/getReservationAgreement',invoiceManageFields.ReservationIdOfArray[i])"
                   >
                     <q-item-section>Rezervasyon Numarası:  {{ invoiceManageFields.ReservationNoOfArray[i] }} </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Sözleşme PDF İndir
               </q-tooltip>
             </q-btn>
             <q-btn
               icon="print"
               color="blue-grey-8"
               fab flat

               >
               <q-menu>
                 <q-list>
                   <q-item
                     v-for="(n,i) in invoiceManageFields.ReservationNoOfArray"
                     :key="n"
                     clickable
                     @click="this.$store.dispatch('Reservations/printAgreement',invoiceManageFields.ReservationIdOfArray[i])"
                   >
                     <q-item-section>Rezervasyon Numarası:  {{ invoiceManageFields.ReservationNoOfArray[i] }} </q-item-section>
                   </q-item>
                 </q-list>
               </q-menu>
               <q-tooltip class="bg-blue-grey-8 text-white">
                 Sözleşme Yazdır
               </q-tooltip>
             </q-btn>
           </div>

         </div>

       </q-card-section>


     </q-card>
   </q-dialog>

   <q-dialog v-model="updateInvoiceNumberDialog" persistent>
     <q-card style="width: 450px">
       <q-bar style="height: 50px">
         <div>Fatura Numara Yenileme</div>
         <q-space />
         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip>Kapat</q-tooltip>
         </q-btn>
       </q-bar>

       <q-card-section>
       <div class="row">
         <div class="col-12">
           <div class="text-subtitle2 text-bold text-grey-8">
             Fatura Numarası
           </div>
         </div>
       </div>
         <div class="row">
           <q-form @submit="onUpdateInvoice"  class="col-12">
             <div class="col-12">
               <q-input
                 :lazy-rules="true"
                 :rules="[val =>   isNumberBlankOrValid(val)  || 'Lütfen istenilen bilgileri giriniz']"
                 dense
                 outlined
                 v-model="invoiceNumberEditFields.InvoiceNo"
               />
             </div>
             <div class="col-12 text-right">
               <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
             </div>
           </q-form>
         </div>
       </q-card-section>


     </q-card>
   </q-dialog>

   <q-dialog v-model="updateReceiptNumberDialog" persistent>
     <q-card style="width: 450px">
       <q-bar style="height: 50px">
         <div>Makbuz Numarasını Yenileme</div>
         <q-space />
         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip>Kapat</q-tooltip>
         </q-btn>
       </q-bar>

       <q-card-section>
         <div class="row">
           <div class="col-12">
             <div class="text-subtitle2 text-bold text-grey-8">
               Makbuz Numarası
             </div>
           </div>
         </div>
         <div class="row">
           <q-form @submit="onUpdateReceipt"  class="col-12">
             <div class="col-12">
               <q-input
                 :lazy-rules="true"
                 :rules="[ val => val && isNumberBlankOrValid(val) || 'Zorunlu alan']"
                 dense
                 outlined
                 v-model="receiptNumberEditFields.ReceiptCollectionNo"
               />
             </div>
             <div class="col-12 text-right">
               <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
             </div>
           </q-form>
         </div>
       </q-card-section>


     </q-card>
   </q-dialog>

   <q-dialog v-model="updateReservationNumberDialog" persistent>
     <q-card style="width: 450px">
       <q-bar style="height: 50px">
         <div>Rezervasyon Numarasını Yenileme</div>
         <q-space />
         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip>Kapat</q-tooltip>
         </q-btn>
       </q-bar>

       <q-card-section>
         <div class="row">
           <div class="col-12">
             <div class="text-subtitle2 text-bold text-grey-8">
               Rezervasyon Numarası
             </div>
           </div>
         </div>
         <div class="row">
           <q-form @submit="onUpdateReservationNumber"  class="col-12">
             <div class="col-12">
               <q-input
                 :lazy-rules="true"
                 :rules="[ val => isNumberBlankOrValid(val) || 'Zorunlu alan']"
                 dense
                 outlined
                 v-model="reservationNumberEditFields.ReservationNo"
               />
             </div>
             <div class="col-12 text-right">
               <q-btn type="submit" color="blue-grey-8" icon="update"  label="Güncelle" />
             </div>
           </q-form>
         </div>
       </q-card-section>


     </q-card>
   </q-dialog>

 </div>

</template>

<script>
import ShowLocation from '../../components/Reservation/ShowLocation'
import Vehicle from 'components/Reservation/Vehicle'
import Customer from 'components/Reservation/Customer'
import Payment from 'components/Reservation/Payment'
import {computed, ref} from "vue";
import RenewPaymentMethod from "pages/Reservations/Components/RenewPaymentMethod";
import UpdateReservaiton from "pages/Reservations/Components/UpdateReservaiton";
import {useStore} from "vuex";
const columns = [
  { name: 'id', label: 'ID', align: 'center', sortable: true, field: 'id'},
  { name: 'ReservationNo', align: 'center', label: 'Rezervasyon No', field: 'ReservationNo'},
  { name: 'Status', label: 'Statüs', align:'center', field: 'Status', sortable: true },
  { name: 'PaymentMethod', label: 'Ödeme Durumu', align:'center', field: 'PaymentMethod', sortable: true },
  { name: 'Pickup', label: 'Aracı Alma Konumu', align:'center',field: 'Pickup' , sortable: true},
  { name: 'Return', label: 'Aracı Bırakma Konumu', align:'center', field: 'Return' , sortable: true},
  { name: 'Car', label: 'Araç', field: 'Car',align:'center', },
  { name: 'Customer', label: 'Müşteri', field: 'Customer',align:'center', },
  { name: 'Amount', label: 'Ödeme', field: 'Amount', align:'left',  },
  { name: 'id', label: '', field: 'id'  }
]
const rows = [
  {
    id: 1,
    Info: 'Detay',
    Pickup: 'Alma Detayı',
    Return: 'Bırakma Detayı',
    Car: 'Araç Bilgileri',
    Customer:'Müşteri Bilgileri',
    Amount: 'Ödeme Bilgileri'
  },
]
const onFilterFields  =   ref({
  ReservationType : '',
  ReservationStatus : '',
  CarAttributes : '',
  CustomerGroupName : '',
  CustomerUnitName : ''
});
export default {
  name: "ReservationsIndex",
  setup() {

    const store = useStore();

    const customerGroups = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CustomerGroupsModule/getRecordActive']))
    })
    console.log()
    const customerGroupOptions = ref(customerGroups.value)
    return {
      customerGroupOptions,
      customerGroups,
      onFilterFields,
      reservationManageDialog: ref(false),
      invoiceManageDialog : ref(false),
      updateInvoiceNumberDialog : ref(false),
      updateReceiptNumberDialog : ref(false),
      updateReservationNumberDialog : ref(false),
      columns,
      rows,
      filter: ref(''),
      reservationFields : ref({
        ReservationStatus : '',
        PaymentState : '',
        id : null
      }),
      invoiceManageFields : ref({
        reservationId : ''
      }),
      invoiceNumberEditFields : ref({
        id : '',
        InvoiceNo : ''
      }),
      receiptNumberEditFields : ref({
        id : '',
        ReceiptCollectionNo : ''
      }),
      reservationNumberEditFields : ref({
        id : '',
        ReservationNo : ''
      }),
      onCustomerGroupFilter(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerGroupOptions.value = customerGroups.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },

    }
  },
  components : {
    ShowLocation,
    Vehicle,
    Customer,
    Payment,

  },
  computed: {
    currentReservations() {
      return  this.$store.getters['Reservations/currentReservationsGetter']
    },
    reservationStatus(){
      return this.$store.getters['MainModule/getReservationStatus']
    },
    reservationPaymentStates(){
      return this.$store.getters['MainModule/getReservationTransactionStates']
    }
  },
  mounted() {
    this.$store.dispatch('Reservations/getLastReservations')
    this.$store.dispatch('CustomerGroupsModule/get')
    this.$store.dispatch('OfficeModule/get')
    this.$store.dispatch('CustomersModule/get')
    this.$store.dispatch('Cities/get')
    this.$store.dispatch('DistrictModule/get')
    this.$store.dispatch('CarPricesModule/get')
    this.$store.dispatch('CarExtrasModule/get')
    this.$store.dispatch('OfficeModule/getTest')
  },
methods : {
    // validation
  isNumberBlankOrValid(val){
    if (val.toString().length > 0 ){
      if (parseInt(val) === 0 && val.toString().length > 1){
          return false
      }
      if ( !(/^\d+$/.test(val)) && val.toString().length > 1)
      {
        return false
      }
      return true
    }
    return false
  },
// filter table
  onFilterTable() {
    //
    // Loading.show({message :'İşleniyor...'})
    let result = []
    let filter = {...this.onFilterFields}
    console.log('filter',filter)
    let reservationRows = this.$store.getters['Reservations/currentReservationCopiesGetter']

    result = reservationRows.filter( e => {
      for (let k in filter) {
        if (filter[k] && e[k] !== filter[k])
          return false
      }
      return  true
    })

    // Seçilen Müşteri Gurubuna göre müşteri gurubu filtireleme
    // let selectedCustomerGroup = this.customerGroupOptions.find( e => e.Name === filter.CustomerGroupName);

    this.$store.commit('Reservations/setReservationsByFilter',result)

    // setTimeout(() => {
    //   Loading.hide()
    //   this.$store.commit('Reservations/setReservationsByFilter',result)
    // },1000)



  },

  reservationUpdateHandleBtn(id,status,paymentState) {
    this.reservationFields.id = id
    this.reservationManageDialog = true
    this.reservationFields.ReservationStatus = this.reservationStatus.find(e => e.code === status).code
    this.reservationFields.PaymentState = this.reservationPaymentStates.find(e => e.code === paymentState).code

  },
  reservationUpdatePayMethodHandleBtn(reservation) {
    this.$q.dialog({
        component: RenewPaymentMethod,
        componentProps : {
          reservation : reservation,
        },
        parent: this,
      })
  },
 async updateAllReservation(reservation){
  if(+reservation.id > 363  ) {
    await this.$q.dialog({
      component: UpdateReservaiton,
      componentProps: {
        reservation: reservation,
      },
      parent: this,
    })
  }
  //    await this.$q.dialog({
  //      component: UpdateReservaiton,
  //      componentProps: {
  //        reservation: reservation,
  //      },
  //      parent: this,
  //    })

  },
  onsubmitReservationStatus() {

    let formData = new FormData()
    formData.append('ReservationStatus',this.reservationFields.ReservationStatus)
    formData.append('PaymentState',this.reservationFields.PaymentState)
    formData.append('id',this.reservationFields.id)
    formData.append('_method','PUT')
     this.$store.dispatch('Reservations/updateReservationStatus',formData).then(res => {
       if (res === true)
       {
         this.reservationManageDialog = false
         this.$router.push({name :'root'})
       }
     })
  },
  reservationsStatus(status) {
    return this.reservationStatus.find(e => {
     return  e.code === status
    }).title
  },
  reservationStatusColor(status) {
    switch (status)
    {
      case 'WaitingForApproval' :
        return {
          color : 'secondary',
          icon : 'query_builder'
        }
      case 'Continues' :
        return {
          color : 'blue-9',
          icon : 'av_timer'
        }
      case 'Cancelled' :
        return {
          color : 'negative',
          icon : 'highlight_off'
        }
      case 'Completed' :
        return {
          color : 'blue-grey-8',
          icon : 'verified_user'
        }
    }
  },

  invoiceManage(reservationId) {
    this.invoiceManageFields = {}
    this.invoiceManageDialog = true
    // this.invoiceManageFields.reservationId = reservationId
    let invoice = this.currentReservations.find(e => +e.id === +reservationId)

    let customInvoice = []

    let customReceiptCollectionNo =  []

   if(invoice.InvoiceID !== null ){
     customInvoice =   invoice.InvoiceNo.replace('*',0)
   }
   if (invoice.ReceiptCollectionNo !== null ){
     customReceiptCollectionNo =  invoice.ReceiptCollectionNo.replace('*',0)
   }

    this.invoiceManageFields.reservationId = reservationId
    this.invoiceManageFields.InvoiceID = JSON.parse(invoice.InvoiceID)
    this.invoiceManageFields.ReceiptCollectionNo = JSON.parse(customReceiptCollectionNo)
    this.invoiceManageFields.ReceiptID = JSON.parse(invoice.ReceiptID)
    this.invoiceManageFields.InvoiceNo = JSON.parse(customInvoice)

    this.invoiceManageFields.ReservationNo = invoice.ReservationNo
    this.invoiceManageFields.id = invoice.id
    this.invoiceManageFields.ReservationIdOfArray = JSON.parse(invoice.ReservationIdOfArray)
    this.invoiceManageFields.ReservationNoOfArray = JSON.parse(invoice.ReservationNoOfArray)
    this.invoiceManageFields.ChildReservationIds = JSON.parse(invoice.ChildReservationIds)
    if(invoice.ChildReservationIds !== null){
      this.invoiceManageFields.ChildReservationIds.push(+invoice.id)
    }

  },
  editInvoiceNumber(invoiceId,invoiceNo) {
    this.updateInvoiceNumberDialog = true
    this.invoiceNumberEditFields.id = invoiceId
    this.invoiceNumberEditFields.InvoiceNo = invoiceNo
  },
  editReceiptNumber(ReceiptID,ReceiptCollectionNo) {
    this.updateReceiptNumberDialog = true
    this.receiptNumberEditFields.id = ReceiptID
    this.receiptNumberEditFields.ReceiptCollectionNo = ReceiptCollectionNo
  },
  editReservationNumber(ReservationId,ReservationNo) {
    this.reservationNumberEditFields.ReservationNo = ''
    this.reservationNumberEditFields.id = ''
    this.updateReservationNumberDialog = true
    this.reservationNumberEditFields.id = ReservationId
    this.reservationNumberEditFields.ReservationNo = ReservationNo
  },

  onUpdateInvoice() {
    let formData = new FormData();
    for (const [k,v] of Object.entries(this.invoiceNumberEditFields))
    {
      formData.append(k,v)
    }
    formData.append('_method','PUT');
    this.$store.dispatch('Reservations/invoiceNumberUpdate',formData).then(res => {
      if ( res === true)
      {
         this.updateInvoiceNumberDialog = false
         this.invoiceManageDialog = false
      }
    })
  },
  onUpdateReceipt() {
    let formData = new FormData();
    for (const [k,v] of Object.entries(this.receiptNumberEditFields))
    {
      formData.append(k,v)
    }
    formData.append('_method','PUT');
    this.$store.dispatch('Reservations/receiptNumberUpdate',formData).then(res => {
      if ( res === true)
      {
        this.updateReceiptNumberDialog = false
        this.invoiceManageDialog = false
      }
    })
  },
  onUpdateReservationNumber() {
    let formData = new FormData();
    for (const [k,v] of Object.entries(this.reservationNumberEditFields))
    {
      formData.append(k,v)
    }

    this.$store.dispatch('Reservations/reservationNumberUpdate',formData).then(res => {
      if ( res === true)
      {
        this.updateReservationNumberDialog = false
        this.invoiceManageDialog = false

      }
    })
  },

  currentReservationFilter(rows) {
    // console.log("Search",this.filter)
    const needle = JSON.parse(JSON.stringify(this.filter)).toLowerCase()
    return rows.filter(v => {
      return v.CustomerNameSurname.toLowerCase().indexOf(needle) > -1
        || v.DropLocation.toLowerCase().indexOf(needle) > -1
        || v.ReservationNo.toLowerCase().indexOf(needle) > -1
        || v.PickupLocation.toLowerCase().indexOf(needle) > -1
        || v.ModelName.toLowerCase().indexOf(needle) > -1
        || v.BrandName.toLowerCase().indexOf(needle) > -1
        || v.LicencePlate.toLowerCase().indexOf(needle) > -1
    })
  }
},
}
</script>

<style scoped lang="sass">

</style>
