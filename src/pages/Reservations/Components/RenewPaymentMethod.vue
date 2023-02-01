<template>
  <q-dialog ref="dialog"  :persistent="true" @hide="hide">
    <q-card class="q-dialog-plugin" style="width: 500px">
      <q-bar style="height: 50px">
        <div>Rezervasyon Ödeme Durumunu Yenile</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pa-xs">
        <div class="col-12 q-pa-sm">
          <div class="text-subtitle2 text-grey-8"> Ödeme Yöntemi  </div>
          <q-select
            v-model="formFields.PaymentMethod"
            :options="this.$store.getters['MainModule/getReservationPaymentMethods'].filter(e => e.code !== 'CreditCartOnOffice')"
            outlined
            dense
            :option-label="(items) => items.title"
            option-value="code"
            emit-value
            map-options
            use-input
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
            @update:model-value="onSelectedPaymentMethod"
          >
            <template v-slot:prepend>
              <q-icon name="account_balance_wallet" @click.stop />
            </template>
          </q-select>
        </div>
        <div class=" col-12 row" v-show="showPayReceiptNo">

          <div class="col-12 q-pa-sm">
            <div class="text-subtitle2 text-grey-8"> Belge Numarası </div>
            <q-input
              v-model="formFields.PayReceiptNo"
              dense
              outlined
              :lazy-rules="false"
              :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
              hide-bottom-space
              :disable="!showPayReceiptNo"

            />
          </div>
        </div>
        <div class="col-12 q-pa-sm">
          <div class="text-subtitle2 text-grey-8"> Ödeme Durumu  </div>
          <q-select
            v-model="formFields.PaymentState"
            :options="this.$store.getters['MainModule/getReservationTransactionStates']"
            outlined
            dense
            :option-label="(items) => items.title"
            option-value="code"
            emit-value
            map-options
            use-input
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="account_balance" @click.stop />
            </template>
          </q-select>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="blue-grey-8" icon="save" label="Güncelle" @click="onOKClick" />
        <q-btn color="primary" label="İptal Et" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  props: ['reservation'],

  setup() {
    return {
      formFields :ref( {
        PaymentMethod : '',
        PayReceiptNo : '',
        PaymentState: ''
      }),
      showPayReceiptNo : ref(false)
    }
  },
  emits: [
    // REQUIRED
    'ok', 'hide','dismiss'
  ],

  methods: {
    show () {
      this.$refs.dialog.show()
      this.formFields.PaymentState = this.reservation.PaymentState
      this.formFields.PaymentMethod = this.reservation.PaymentMethod
      this.formFields.PayReceiptNo = this.reservation.PayReceiptNo
      if (this.formFields.PaymentMethod ==='EftTransfer' || this.formFields.PaymentMethod === 'CurrentSales' || this.formFields.PaymentMethod === 'CreditCartOnTerminal') this.showPayReceiptNo=true
    },
    onOKClick () {
      let formField = new FormData();
      for (const [k,v] of Object.entries(this.formFields)) {
        formField.append(k,v)
      }
      formField.append('id',this.reservation.id)
      this.$store.dispatch('Reservations/renewReservationPaymentMethod',formField).then(res => {
        if (res === true) {
          this.$emit('cancel')
          this.hide()
        } else {
          return false
        }
      })
    },
    hide () {
      this.$refs.dialog.hide()
      this.$emit('dismiss')
    },
    onCancelClick () {
      this.hide()
    },
    onSelectedPaymentMethod(value){
      this.formFields.PayReceiptNo = '';
      this.showPayReceiptNo = value === 'EftTransfer' || value === 'CurrentSales' || value === 'CreditCartOnTerminal';
    },
  }
}
</script>
