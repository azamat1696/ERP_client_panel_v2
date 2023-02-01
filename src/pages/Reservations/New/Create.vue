<template>
  <div class="row">
    <div class="col-9 q-pa-md">
      <q-card  >

        <q-card-section class=" q-pa-sm bg-blue-grey-8 text-white">

          <q-toolbar-title class=" ">Yeni Rezervasyon Kaydı</q-toolbar-title>
        </q-card-section>
        <q-card-section class="q-pa-none">

          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            class="no-box-shadow  "

          >
            <q-step
              :name="1"
              title="Tarih & Müşteri Seçimi"
              icon="settings"
              :done="step > 1"
              style="min-height: 200px;padding: 0!important;"

            >
              <q-form @submit="onNextStep"  class="q-gutter-md" >

                <div class="row">
                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8"> Teslim Alma Yeri  </div>
                    <q-select
                      v-model="newFormFields.pickup_office_id"
                      :options="pickupLocationsOptions"
                      outlined
                      dense
                      :option-label="(items) => items.OfficeName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      :lazy-rules="true"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                      @filter="onFilterPickupLocations"
                      menu-anchor="bottom start"

                    >
                      <template v-slot:prepend  >
                        <q-icon name="o_location_on" @click.stop />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8"> Teslim Alınacak Tarih  </div>
                    <q-input
                      dense
                      square
                      outlined
                      v-model="newFormFields.StartDateTime"
                      :lazy-rules="true"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                    >
<!--                      :options="checkMinDate"-->
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date
                              calendar="gregorian"
                              v-model="newFormFields.StartDateTime"
                              :model-value="newFormFields.StartDateTime"
                              mask="YYYY-MM-DD HH:mm"
                              minimal
                              :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                              @update:model-value="onChangeStartDate"
                            >
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:after>
                        <q-btn icon="access_time" class="full-height" outline color="grey-6">
                          <q-popup-proxy  cover transition-show="scale" transition-hide="scale">
                            <q-time
                              v-model="newFormFields.StartDateTime"
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                              :options="chekMinStartDateTime"

                            >
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-btn>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8"> Teslim Edilecek Yer  </div>
                    <q-select
                      v-model="newFormFields.drop_office_id"
                      :options="pickupLocationsOptions"
                      outlined
                      dense
                      :option-label="(items) => items.OfficeName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      :lazy-rules="true"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                      @filter="onFilterPickupLocations"
                      menu-anchor="bottom start"
                    >
                      <template v-slot:prepend>
                        <q-icon name="o_location_on" @click.stop />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8">  Teslim Edilecek Tarih   </div>
                    <q-input
                      dense
                      square
                      outlined
                      v-model="newFormFields.EndDateTime"
                      :lazy-rules="true"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date
                              v-model="newFormFields.EndDateTime"
                              mask="YYYY-MM-DD HH:mm"
                              :options="checkMinEndDate"
                              minimal
                              :locale="this.$store.getters['MainModule/getDateTimeLocale']"
                              @update:model-value="onChangeEndDateTime"
                            >
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:after>
                        <q-btn icon="access_time" class="full-height" outline color="grey-6">
                          <q-popup-proxy   cover transition-show="scale" transition-hide="scale">
                            <q-time
                              @update:model-value="onChangeEndTime"
                              v-model="newFormFields.EndDateTime" mask="YYYY-MM-DD HH:mm" format24h >
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Kapat" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-btn>
                      </template>

                    </q-input>

                  </div>


                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8"> Müşteri Grubu </div>
                    <q-select
                      v-model="selectOptionFields.customer_groups_id"
                      :options="customerGroupOptions"
                      outlined
                      dense
                      option-label="Name"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      hide-bottom-space
                      @filter="onFilterCustomerGroups"
                      @update:model-value="onSelectedCustomerGroup"
                      clearable
                      menu-anchor="bottom start"
                      table-colspan="5"
                      behavior="menu"
                    >
                      <template v-slot:after>
                        <q-btn icon="add" class="full-height" outline color="grey-6" @click="groupDialogCreate = true"   >

                          <q-tooltip class="bg-blue-grey-8 text-white">
                            Yeni Müşteri Grup Kaydı Oluştur.
                          </q-tooltip>
                        </q-btn>
                      </template>
                    </q-select>
                  </div>

                  <div class="col-4  q-pa-md"  >
                    <div class="text-subtitle2 text-grey-8"> Rezervasyon Yetkili Kişi  </div>
                    <q-select
                      v-model="newFormFields.customers_id"
                      :options="customerOptions"
                      outlined
                      dense
                      :option-label="(items) => items.length !== 0 ? items.Name + ' '+items.Surname : items.Name "
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      :lazy-rules="true"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      @filter="onFilterCustomers"
                      hide-bottom-space
                      @update:model-value="onSelectedCustomer"
                      menu-anchor="bottom start"
                      clearable
                    >
                      <template v-slot:after>
                        <q-btn icon="add" class="full-height" outline color="grey-6" @click="newFormDialog = true"  >
                          <q-tooltip class="bg-blue-grey-8 text-white">
                            Yeni Müşteri Kaydı Oluştur.
                          </q-tooltip>
                        </q-btn>
                      </template>
                    </q-select>
                  </div>

                  <div class="col  q-pa-md"   v-show="!showCustomerDrivers">
                    <div class="text-subtitle2 text-grey-8"> Kullanacak Kişiler </div>
                    <q-select
                      v-model="newFormFields.reservation_drivers"
                      :options="customerDriversOptionsByType"
                      outlined
                      dense
                      :option-label="(items) => items.length !== 0 ? items.Name + ' '+items.Surname  : items.Name"
                      option-value="id"
                      emit-value
                      map-options
                      input-debounce="0"
                      use-input
                      hide-bottom-space
                      @filter="onFilterCustomerOfficialDrivers"
                      clearable
                      multiple
                      use-chips
                      menu-anchor="bottom start"
                    >

                      <template v-slot:after>
                        <q-btn icon="add" class="full-height" outline color="grey-6" @click="newFormDialog = true"  >
                          <q-tooltip class="bg-blue-grey-8 text-white">
                            Yeni Müşteri Kaydı Oluştur.
                          </q-tooltip>
                        </q-btn>
                      </template>
                    </q-select>
                  </div>

                </div>


                <q-stepper-navigation class="text-right">
                  <q-btn class="text-right"  type="submit"   color="blue-grey-8"     label="Devam Et" />
                </q-stepper-navigation>


              </q-form>

            </q-step>
            <q-step
              :name="2"
              title=" Araç Seçimi"
              icon="create_new_folder"
              :done="step > 2"
              style="min-height: 200px;"
            >
              <q-form   @submit="onNextStep" >
                <div class="row">

                  <div class="col-3  q-pa-sm"  >
                    <div class="text-subtitle2 text-grey-8"> Araç Markası  </div>
                    <q-select
                      v-model="selectOptionFields.brand_id"
                      :options="carBrandsOption"
                      outlined
                      dense
                      :option-label="(items) => items.BrandName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      hide-bottom-space
                      @filter="onFilerCarBrands"
                      @update:model-value="onSelectedCarBrand"
                    />
                  </div>
                  <div class="col-3  q-pa-sm"  >
                    <div class="text-subtitle2 text-grey-8"> Araç Modeli  </div>
                    <q-select
                      v-model="selectOptionFields.model_id"
                      :options="carModelsOption"
                      outlined
                      dense
                      :option-label="(items) => items.ModelName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input

                      hide-bottom-space

                    />
                  </div>
                  <div class="col-3  q-pa-sm"  >
                    <div class="text-subtitle2 text-grey-8"> Araç Sınıfı  </div>
                    <q-select
                      v-model="selectOptionFields.class_id"
                      :options="carClassesOption"
                      outlined
                      dense
                      :option-label="(items) => items.ClassName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-3  q-pa-sm"  >
                    <div class="text-subtitle2 text-grey-8"> Araç Vites Tipi  </div>
                    <q-select
                      v-model="selectOptionFields.transmission_types_id"
                      :options="carTransmissionOption"
                      outlined
                      dense
                      :option-label="(items) => items.CarTransmissionName"
                      option-value="id"
                      emit-value
                      map-options
                      use-input
                      hide-bottom-space
                    >
                      <template v-slot:after>
                        <q-btn color="blue-grey-8  "  size="16px"  type="submit" icon="search"   @click="onFilterCars" />
                      </template>
                    </q-select>
                  </div>

                </div>
                <searched-car ref="searchedCar"  @selected-reservation-car="renderSelectedCar" />

                <q-stepper-navigation class="text-right">
                  <q-btn  flat color="primary" @click="$refs.stepper.previous()" label="Geri Gel" class="q-ml-sm" />
                  <q-btn class="text-right"  type="submit"   color="blue-grey-8"     label="Devam Et" />
                </q-stepper-navigation>

              </q-form>
            </q-step>
            <q-step
              :name="3"
              title="Fiyat & Ödeme Yöntemleri"
              icon="credit_card"
              style="min-height: 200px;"
              :done="step > 3"
            >
              <q-form @submit="onNextStep"  class="q-gutter-sm q-pa-sm" >
                <div class="row q-mt-md">
                 <div class="col-3 q-pa-sm">
                   <div class="text-subtitle2 text-grey-8"> Rezervasyon Tipi  </div>
                   <q-select
                     v-model="newFormFields.ReservationType"
                     :options="reservationTypesOption"
                     outlined
                     dense
                     :option-label="(items) => items.title"
                     option-value="title"
                     emit-value
                     map-options
                     use-input
                     :lazy-rules="true"
                     :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                     hide-bottom-space
                   >
                     <template v-slot:prepend>
                       <q-icon name="assignment" @click.stop />
                     </template>
                   </q-select>
                 </div>
                 <div class="col-3 q-pa-sm">
                   <div class="text-subtitle2 text-grey-8"> Rezervasyon Para Birimi  </div>
                   <q-select
                     v-model="newFormFields.CurrencyType"
                     :options="reservationCurrencyTypesOption"
                     outlined
                     dense
                     :option-label="(items) => items.title"
                     option-value="title"
                     emit-value
                     map-options
                     use-input
                     :lazy-rules="true"
                     :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                     hide-bottom-space
                     @update:model-value="onSelectedReservationCurrency"
                   >
                     <template v-slot:option="scope">
                       <q-item v-bind="scope.itemProps">

                         <q-item-section>
                          <q-item-label>  <q-icon size="xs" color="grey-8" :name="scope.opt.icon" />  {{ scope.opt.title }}</q-item-label>
                         </q-item-section>
                       </q-item>
                     </template>
                     <template v-slot:selected-item="scope">
                       <q-icon size="xs" color="grey-8" :name="scope.opt.icon" @click.stop class="q-mr-sm" />
                       {{ scope.opt.title }}
                     </template>
                   </q-select>
                 </div>
                  <div class="col-3 q-pa-sm">
                    <div class="text-subtitle2 text-grey-8"> Ödeme Yöntemi  </div>
                    <q-select
                      v-model="newFormFields.PaymentMethod"
                      :options="reservationPaymentMethodsOption"
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
                  <div class="col-3 q-pa-sm">
                    <div class="text-subtitle2 text-grey-8"> Ödeme Durumu  </div>
                    <q-select
                      v-model="newFormFields.PaymentState"
                      :options="reservationTransactionStates"
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
                </div>
                <div class="row" v-show="showPayReceiptNo">
                  <div class="col-6">

                  </div>
                  <div class="col-6 q-pa-sm">
                    <div class="text-subtitle2 text-grey-8"> Belge Numarası </div>
                    <q-input
                      v-model="newFormFields.PayReceiptNo"
                      dense
                      outlined
                      :lazy-rules="false"
                      :rules="[ val => val && val.toString().length > 0 || 'Zorunlu alan']"
                      hide-bottom-space
                      :disable="!showPayReceiptNo"

                    />
                  </div>
                </div>
                <div class="row " >
                  <div class="col-6  q-mt-md  bg-grey-2 ">
                    <div class=" q-ml-md q-mt-md text-subtitle2 text-bold q-ml-sm ">Araç Fiyat Seçiniz</div>
                    <div class="row  q-mt-md ">
                      <div class="col-3">
                        <q-radio
                          checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye"
                          v-model="newFormFields.SelectedPriceTitle"
                          val="DailyPrice"
                          label="Günlük Ücret"
                          @update:model-value="onSelectedPrice"
                          :price="selectedCars.DailyPrice"
                          :disable="!newFormFields.CurrencySymbol"

                        />
                      </div>
                      <div class="col-3">
                        <q-radio
                          checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye"
                          v-model="newFormFields.SelectedPriceTitle"
                          val="WeeklyPrice"
                          label="Haftalık Ücret"
                          @update:model-value="onSelectedPrice"
                          :price="selectedCars.WeeklyPrice"
                          :disable="!newFormFields.CurrencySymbol"

                        />
                      </div>
                      <div class="col-3">
                        <q-radio
                          checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye"
                          v-model="newFormFields.SelectedPriceTitle"
                          val="MonthlyPrice"
                          label="Aylık Ücret"
                          @update:model-value="onSelectedPrice"
                          :price="selectedCars.MonthlyPrice"
                          :disable="!newFormFields.CurrencySymbol"

                         />
                      </div>
                      <div class="col-3">
                        <q-radio
                          checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye"
                          v-model="newFormFields.SelectedPriceTitle"
                          val="YearlyPrice"
                          label="Yıllık Ücret"
                          @update:model-value="onSelectedPrice"
                          :price="selectedCars.YearlyPrice"
                          :disable="!newFormFields.CurrencySymbol"

                        />
                      </div>
                    </div>
                    <div class=" row q-pa-md " v-show="this.newFormFields.DailyRentPrice> 0">

                      <div class="col-5 ">
                        <div class="text-subtitle2 q-mb-xs text-grey-10 text-bold ">Günlük Araç Ücreti: {{ parseFloat(this.newFormFields.DailyRentPrice).toFixed(2)}} {{newFormFields.CurrencySymbol}}
                          <q-popup-edit
                            v-model="this.newFormFields.DailyRentPrice"   v-slot="scope" auto-save persistent @update:model-value="onSavePricesWithPopUp">
                            <q-input
                              v-model="scope.value"
                              dense
                              autofocus
                              @keyup.enter="scope.set"
                              @update:model-value="editModelValueOfPopup"
                            >
                              <template v-slot:append>
                                <q-icon name="edit" />
                              </template>
                            </q-input>
                          </q-popup-edit>
                        </div>

                        <q-slider
                          v-model="ReservationPriceRange"
                          :min="-25"
                          :max="25"
                          :label-value="ReservationPriceRange + '%'"
                          switch-marker-labels-side
                          markers=""
                          label-always
                          :color="ReservationPriceRange > 0 ? 'positive' : 'negative'"
                          thumb-size="20px"
                          track-size="5px"
                          @change="onChangePriceRange"
                          switch-label-side
                        />
                      </div>
                      <div class="col-2"></div>
                      <div class="col-5  ">
                        <div class="text-subtitle2 q-mb-xs text-grey-10 text-bold "> Toplam Fiyat:   {{newFormFields.RentDays}} Gün x {{parseFloat(this.newFormFields.DailyRentPrice).toFixed(2)}} {{newFormFields.CurrencySymbol}} </div>
                        <q-input
                          type="text"
                          dense
                          outlined
                          readonly
                          v-model="this.newFormFields.TotalRentPrice"
                          :model-value="this.newFormFields.TotalRentPrice + ' '+ newFormFields.CurrencySymbol "
                          class="bg-grey-1"

                        />
                      </div>
                      <div class="col-12 q-mt-lg q-pa-md bg-green-2 " style="  border-radius: 3%">
                        <div class="text-subtitle2  "> <q-icon  name="o_info"  size="sm"/> Aracın TL  bazındeki günlük ücreti: {{parseFloat(this.newFormFields.RealDailyRentPrice).toFixed(2)}} (TL) </div>
                      </div>

                      <div class="col-12 q-mt-sm q-pa-md bg-blue-2 " style="  border-radius: 3%" v-show="newFormFields.CurrencySymbol !== '₺'" >
                        <div class="text-subtitle2  "> <q-icon  name="account_balance"  size="sm"/> Günlük <b>{{newFormFields.CurrencySymbol}}</b> döviz kuru : 1 <b>{{newFormFields.CurrencySymbol}}</b> = {{parseFloat(this.newFormFields.CurrencyRate).toFixed(2)}} (TL) </div>
                      </div>

                    </div>
                  </div>
                  <div class="col-6 q-pa-md" >
                    <q-table
                      :rows="extraServicesRow"
                      :columns="CarExtrasReservationColumns"
                      row-key="id"
                      selection="multiple"
                      class="no-box-shadow bg-grey-2"
                      @update:selected="onSelectedExtraServices"
                      v-model:selected="extraServicesSelected"
                      hide-bottom

                    >
                      <template v-slot:top-left>
                        <div class="text-subtitle2 text-bold q-ml-sm ">Ekstra Hizmetler</div>
                      </template>
                      <template v-slot:body="props">
                           <q-tr :props="props" :key="props.row.index" class="text-center">
                            <q-td>  <q-checkbox :disable="!newFormFields.OrgDailyRentPrice" v-model="props.selected" color="teal" /> </q-td>
                            <q-td> {{props.row.Name}}</q-td>
                            <q-td> {{ (props.row.Price) ? props.row.Price+" TL" : ''}}  </q-td>
                            <q-td > {{props.row.Description !== 'null' ? props.row.Description : '' }}</q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                </div>

                <q-stepper-navigation class="text-right">
                  <q-btn  flat color="primary" @click="$refs.stepper.previous()"    label="Geri Gel" class="q-ml-sm" />
                  <q-btn class="text-right"  type="submit"   color="blue-grey-8"     label="Devam Et" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
            <q-step
              :name="4"
              title="Evraklar & Ödemeler"
              icon="payment"
              style="min-height: 200px;"
            >
             <q-form @submit="onNextStep" class="q-gutter-md">
               <div class="row " >
                 <div class="col-6  q-mt-md q-pa-sm  ">
                   <div class="row bg-grey-2 q-pa-md" >
                    <div class="col-6 q-pa-xs">
                     <div class="text-subtitle2 text-bold ">Rezervasyon Hatırlatma Metni</div>
                      <q-input type="textarea" outlined v-model="newFormFields.ReservationRemarks" :input-style="{minHeight :'200px'}" />
                   </div>
                     <div class="col-6 q-pa-xs">
                       <div class=" q-ml-xs text-subtitle2 text-bold ">Müşteri İmzası</div>
                       <q-img  :src="customer_signature_preview"     :img-style="{maxHeight:'200px'}" fit="contain"/>
                     </div>
                   </div>

                   <div class="row q-pa-sm">
                     <div class="col-12 text-right">
                       <q-btn color="blue-8" label="Müşteri İmzası Al" @click="getCustomerSignature" icon="draw" class="q-mr-sm"  />
                       <q-btn color="blue-grey-8" label="Rezervasyonu Kaydet" @click="onSubmitNewReservation" icon="save"  />
                     </div>

                   </div>
                 </div>
                 <div class="col -6 row" v-show="newFormFields.PaymentMethod === 'CreditCartOnOffice'">
                   <div class="col-12 q-pa-md text-center"   v-show="!transactionState" >

                     <vue-paycard
                       :value-fields="creditCartsFields"
                       :has-random-backgrounds="false"
                       :is-card-number-masked="true"
                       :labels="this.$store.getters['MainModule/getCreditCartLabels']"
                       :background-image="require('assets/kredi2 (1).png')"
                     />
                     <q-form class=" row   q-mt-xs q-pa-md q-pa-xs" @submit="getTransaction" >
                       <q-input
                         v-model="creditCartsFields.cardName"
                         label="Kart Üzerindeki İsim Soyisim"
                         outlined
                         dense
                         class="col-12  q-pa-xs"
                         :lazy-rules="true"
                         :rules="[ val => val !== null && val !== '' || 'Zorunlu Alan',
                       val => val.toString().length >= 4   || 'Geçersiz...']"
                         hide-bottom-space
                       />
                       <q-input
                         v-model="creditCartsFields.cardNumber"
                         label="Kredi Kart Numarası"
                         outlined
                         dense
                         mask="#### #### #### ####"
                         class="col-12 q-mt-xs q-pa-xs"
                         :lazy-rules="true"
                         :rules="[ val => val !== null && val !== '' || 'Zorunlu Alan',
                       val => val.toString().length >= 19 && val.toString().length <= 19  || 'Geçersiz...']"
                         hide-bottom-space
                       />
                       <q-input
                         v-model="creditCartsFields.cardYear"
                         label="Son Kullanım Yılı"
                         outlined
                         dense
                         mask="####"
                         class="col-4   q-pa-xs "

                         :lazy-rules="true"
                         :rules="[ val => val !== null && val !== '' || 'Zorunlu Alan',
                       val => val.toString().length >= 4 && val.toString().length <= 4 || 'Geçersiz...']"
                         hide-bottom-space
                       />
                       <q-input
                         v-model="creditCartsFields.cardMonth"
                         label="Son Kullanım Ay"
                         outlined
                         dense
                         mask="##"
                         class="col-4   q-pa-xs "
                        :lazy-rules="true"
                         :rules="[ val => val !== null && val !== '' || 'Zorunlu Alan',
                       val => val.toString().length >= 2 && val.toString().length <= 2 && val <= 12 || 'Geçersiz...']"
                         hide-bottom-space
                       />


                       <q-input
                         v-model="creditCartsFields.cardCvv"
                         label="CVV"
                         outlined
                         dense
                         class="col-4   q-pa-xs "
                         type="number"
                         :lazy-rules="true"
                         :rules="[ val => val !== null && val !== '' || 'Zorunlu Alan',
                       val => val.toString().length >= 3 && val.toString().length <= 3  || 'Geçersiz...']"
                         hide-bottom-space
                       />

                       <div class="col-12 q-mt-xs text-right">
                         <q-btn type="submit" label="Ödeme Al" color="primary" icon="credit_card"  />
                       </div>

                     </q-form>
                     <q-inner-loading
                       :showing="transactionLoadingVisible"
                       label="İşlem sürüyor lütfen bekleyiniz..."
                       label-class="text-blue-grey-10"
                       label-style="font-size: 1.3em"
                     />
                   </div>
                   <div class="col-12 q-pa-md text-center" v-show="transactionState">
                     <success-notify />
                     <div class="text-subtitle1 ">
                       <b>Kredi kartı</b> ödeme denenmesi başarıyla gerçekleştirilmiştir.<br>
                          Lütfen rezervasyon işlem kayıdınız tamamlayınız.
                       <br>
                       <span class="bg-grey-2 text-bold">CARD PLUS REF NO : {{newFormFields.TransactionNo}}</span>
                     </div>
                   </div>
                 </div>

               </div>
             </q-form>
              <q-stepper-navigation class="text-right">
                <q-btn  flat color="primary" @click="$refs.stepper.previous()" label="Geri Gel" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>
            <template v-slot:message>
              <q-banner v-if="step === 1" class="bg-grey-3 text-dark bordered q-px-lg">
                <div class="text-subtitle1">  <b>1. Adım </b>  Tarih & Müşteri Seçimi</div>
                <template v-slot:avatar>
                  <!-- İcon Gelebilir -->
                </template>
              </q-banner>
              <q-banner v-if="step === 2" class="bg-grey-3 text-dark bordered q-px-lg">
                <div class="text-subtitle1">  <b>2. Adım </b> Araç Seçimi</div>
                <template v-slot:avatar>
                  <!-- İcon Gelebilir -->
                </template>
              </q-banner>
              <q-banner v-if="step === 3" class="bg-grey-3 text-dark bordered q-px-lg">
                <div class="text-subtitle1">  <b>3. Adım </b> Fiyat & Ödeme Yöntemleri</div>
                <template v-slot:avatar>
                  <!-- İcon Gelebilir -->
                </template>
              </q-banner>

              <q-banner v-if="step === 4" class="bg-grey-3 text-dark bordered q-px-lg">
                <div class="text-subtitle1">  <b>4. Adım </b>Sözleşmeler & Ödeme Durumu</div>
                <template v-slot:avatar>
                  <!-- İcon Gelebilir -->
                </template>
              </q-banner>
            </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-3 q-pa-md">
      <div class="bg-white" style=" ">
        <q-toolbar class="bg-blue-grey-8 text-white  ">
          <q-toolbar-title class=" ">Rezervasyon Detayları </q-toolbar-title>
        </q-toolbar>

        <q-list bordered separator  >

          <q-item  class="q-pa-sm"   v-ripple v-show="this.newFormFields.RentDays">
            <q-item-section>
              <q-item-label class="text-bold" > <q-icon   name="o_event_repeat" size="sm" color="blue-grey-8" /> Kiralama Gün Sayısı </q-item-label>
            </q-item-section>
            <q-item-section style="max-width: 100px">
              <q-item-label class=" text-grey-7 text-right text-bold"    >   {{this.newFormFields.RentDays}} GÜN</q-item-label>
            </q-item-section>

          </q-item>
          <q-item  class="q-pa-sm  "   v-ripple v-show="renderSelectedLocationHtml (newFormFields.pickup_office_id)">
            <q-item-section>
              <q-item-label class="text-bold" > <q-icon   name="o_location_on" size="sm" color="blue-grey-8" /> Teslim Alma Yeri</q-item-label>
              <q-item-label class="q-ml-md text-grey-7" lines="2"  >    {{ renderSelectedLocationHtml (newFormFields.pickup_office_id)}}</q-item-label>
            </q-item-section>
          </q-item>


          <q-item  class="q-pa-sm  "   v-ripple  >
            <q-item-section>
              <q-item-label class="text-bold"> <q-icon name="schedule" size="sm" color="blue-grey-8"></q-icon> Teslim Alma Tarih ve Saatı</q-item-label>
              <q-item-label class="q-ml-md text-grey-7" lines="2"  >    {{ renderSelectedDateTimeHtml(newFormFields.StartDateTime) }}</q-item-label>
            </q-item-section>
          </q-item>


          <q-item class="q-pa-sm  "   v-ripple v-show="renderSelectedLocationHtml (newFormFields.drop_office_id)">
            <q-item-section>
              <q-item-label class="text-bold"> <q-icon name="o_where_to_vote" size="sm" color="blue-grey-8"></q-icon> Teslim Etme Yeri</q-item-label>
              <q-item-label class="q-ml-md text-grey-7" lines="2"  >    {{ renderSelectedLocationHtml (newFormFields.drop_office_id)}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="q-pa-sm  "   v-ripple  v-show="newFormFields.EndDateTime">
            <q-item-section>
              <q-item-label class="text-bold"> <q-icon name="schedule" size="sm" color="blue-grey-8"></q-icon> Teslim Etme Tarih ve Saatı</q-item-label>
              <q-item-label class="q-ml-md text-grey-7" lines="2"  >    {{ renderSelectedDateTimeHtml(newFormFields.EndDateTime) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-sm  "   v-ripple  v-if="Object.keys(selectedCars).length > 0" >
            <q-item-section>
              <q-item-label class="text-bold"> <q-icon name="o_directions_car_filled" size="sm" color="blue-grey-8"></q-icon> Seçili Araç </q-item-label>
              <q-item-label class="q-ml-md text-grey-7" lines="2"  ><b>Plaka: {{selectedCars.LicencePlate}} </b>- {{ selectedCars.car }} </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-sm"   v-ripple v-show="newFormFields.CurrencySymbol" >
            <q-item-section>
               <div class="row ">
                 <div class="col-8 text-subtitle2 text-grey-9">Günlük Ücreti</div>
                 <div class=" col-4 text-subtitle2 text-bold text-grey-9 text-right">{{parseFloat(newFormFields.DailyRentPrice).toFixed(2)}}<span class="q-ml-xs q-mr-xs">{{newFormFields.CurrencySymbol}}</span></div>
                 <div class="col-8 text-subtitle2 text-grey-9">Toplam Araç Kiralama Ücreti</div>
                 <div class=" col-4 text-subtitle2 text-bold text-grey-9 text-right">
                   {{newFormFields.TotalRentPrice}} <span class="q-ml-xs q-mr-xs">{{newFormFields.CurrencySymbol}}</span>
                 </div>
               </div>
              <div class=" row q-pa-none"  v-for="( e,i ) in newFormFields.ExtraServices" :key="i">

                <div class="col-12 text-subtitle2 text-grey-9">
                  {{e.Name}} {{e.CalculateType === "DependsOnHalfPrice" ? "("+ newFormFields.RentDays + ' Gün)' : '' }}

<!--                  {{newFormFields.RentDays}}-->
                  <span class="float-right"> {{e.Price }} <span class="q-ml-xs q-mr-xs"> {{newFormFields.CurrencySymbol}}</span></span>
                </div>
              </div>
              <div class="row q-mt-md" style=" ">
                <div class="col-12 text-center">
                  <div class="text-h6 text-bold text-blue-grey-8">Toplam Tutar
                    <span class="q-ml-md">{{parseFloat(newFormFields.TotalPrice).toFixed(2)}} {{newFormFields.CurrencySymbol}}</span>
                  </div>
                  <div class="text-subtitle1  text-bold text-green-8" v-show="newFormFields.CurrencySymbol !=='₺' ">Alınacak TL Tutarı
                    <span class="q-ml-md">{{parseFloat(newFormFields.TotalPriceByCurrency).toFixed(2)}} TL</span>
                  </div>

                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="customerSignatureDialog" persistent>
      <q-card  >

        <q-card-section class="row items-center q-pa-sm">
          <q-avatar icon="draw" color="primary" text-color="white" size="md" />
          <span class="q-ml-sm">Müşteri Elektronik İmzası: {{customer_signature.length}}</span>
          <q-space />
          <q-btn icon="close"  flat round dense color="primary" v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none"  v-show="customer_signature_preview.length === 0" >
          <vue-drawing-canvas
            ref="VueCanvasDrawing"
            width="300"
            height="200"
            color="blue"
            lineWidth="3"
            saveAs="png"
            canvasId="customer_signature"
            v-model:image="customer_signature"

          />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none" v-show="customer_signature_preview.length > 0" style="width: 330px; height: 230px" >
          <div class="text-subtitle1   col-12 text-bold text-grey-8 text-center">Mevcut Islak İmzası</div>
          <q-img  :src="customer_signature_preview" width="300" height="300" style="border-top: 1px solid #eceaea; " />
        </q-card-section>

<!--        v-close-popup-->
        <q-card-actions align="right">
          <q-btn   label="Sil" icon="delete_outline" color="primary" @click="clearSignature" />
          <q-btn   label="Onayla" color="blue-grey-8" icon="save"   @click="saveSignature()"   />

        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog   v-model="groupDialogCreate" persistent >
      <q-card style="min-width: 500px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Müşteri Grubu Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close"  v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <group-create @closeFromDialogCreate="this.groupDialogCreate = false" ></group-create>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog   v-model="newFormDialog" persistent >
      <q-card style="min-width: 1000px" >
        <q-bar  style="height: 50px" class="q-pa-md bg-blue-grey-8 text-white">
          <div class="text-h4" >Yeni Müşteri Kaydı </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>
        <new-customer-form @closeCustomerDialog="addedNewCustomer" />
      </q-card>
    </q-dialog>
    <q-dialog v-model="addNewDriversDialog" persistent>
      <q-card style="min-width: 600px">
        <q-bar class=" bg-blue-grey-8" style="min-height: 40px">
          <div class="text-subtitle1 text-white">Yeni Sürücü Oluştur</div>
          <q-space />
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

     <q-card-section>
      <customer-drivers-form-create  @addedNeDrivers="onSelectedCustomer" @closeDriverDialog="addNewDriversDialog = false"  :customer-id="newFormFields.customers_id"/>
    </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { date } from 'quasar'
  import SearchedCar from './SearchedCar'
  import {computed, ref} from "vue";
  import {useStore} from "vuex";
  import {Notify} from "quasar";
  import CarExtrasReservationColumns from "pages/Cars/CarExtras/CarExtrasReservationColumns";
  import { VuePaycard } from "vue-paycard";
  import VueDrawingCanvas from 'vue-drawing-canvas';
  import GroupCreate from "pages/Users/CostumerGroupComponents/GroupCreate";
  import NewCustomerForm from "pages/Users/Components/NewCustomerForm";
  import CustomerDriversFormCreate from "pages/Reservations/New/Components/CustomerDriversFormCreate";
  const getTodayDateTime = () => {
                        // let todayDate = new Date();
                        let minDate =  date.subtractFromDate(new Date(),{days:1}) ;
                        let today = date.addToDate(minDate,{days:1});

                        let   currentMonth =  ((minDate.getMonth()+1).toString().length === 1) ? "0"+(minDate.getMonth()+1) : (minDate.getMonth()+1)

                        let   currentDay = (minDate.getDate().toString().length === 1) ? "0"+minDate.getDate() : minDate.getDate()
                        let   currentHours = minDate.getHours()
                        let   currentMin = minDate.getMinutes()
                        let   currentYear = minDate.getFullYear()


                         let todayMonth = ((today.getMonth()+1).toString().length === 1) ? "0"+(today.getMonth()+1) : (today.getMonth()+1)
                         let todayDay = today.getDate().toString().length === 1  ? "0"+today.getDate() : today.getDate()
                        return {
                               startDateTime : today.getFullYear() + '-' + todayMonth + '-' + todayDay  + ' ' + today.getHours() + ':' + today.getMinutes(),
                               currentTime : currentYear + "-"+ currentMonth +"-"+currentDay  +" "+ currentHours +":"+currentMin,
                               currentMonth: currentMonth,
                               currentDay: currentDay,
                               currentHours: currentHours,
                               currentMin: currentMin,
                               currentYear: currentYear,
                        };

}
  import SuccessNotify from '../../../components/SuccessNotify'
 export default {
  name: "Create",
  setup () {
    const store = useStore();
    const customerGroups = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CustomerGroupsModule/getRecords']))
    })
    const customerGroupOptions = ref(customerGroups.value)
    const customers = computed(() => {
      return  JSON.parse(JSON.stringify(store.getters['CustomersModule/getRecords']))
    })
    const customerOptions = ref(customers.value)
    const customersByTypes = computed(() => {
      return  JSON.parse(JSON.stringify(store.getters['CustomersModule/getRecordByCustomerType']))
    })
    const customerDriversOptionsByType = ref(customersByTypes.value)
    const pickupLocations = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['OfficeModule/getRecords']))
    })
    const pickupLocationsOptions = ref(pickupLocations.value)
    const reservationTypesOption = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['MainModule/getReservationTypes']))
    })
    const  reservationTransactionStates = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['MainModule/getReservationTransactionStates']))
    })
    const reservationCurrencyTypesOption = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['MainModule/getReservationCurrencyTypes']))
    })
    const reservationPaymentMethodsOption = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['MainModule/getReservationPaymentMethods']))
    })
    const carBrands = (computed(()  => {
      return JSON.parse(JSON.stringify(store.getters['CarBrandsModule/getCarBrandsState']))
    }))
    const carBrandsOption = ref(carBrands.value)
    const carModels = computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CarModelsModule/carModels']))
    });
    let carModelsOption = ref([])
    const selectOptionFields = ref({
      brand_id : '',
      model_id : '',
      class_id : '',
      transmission_types_id: '',
      customer_groups_id: ''
    });
    const  carTransmissionOption = (computed(() => {
      return JSON.parse(JSON.stringify(store.getters['CarTransmissionsModule/getRecords']))
    }))

    const selected_car_brand_id = ref('')
    const showCustomerDrivers = ref(false)
    const customerDrivers = ref([])
    const customerDriverOptions = ref([])
    const newFormFields = ref({
      TransactionNo: '',
      StartDateTime : getTodayDateTime().startDateTime,
      EndDateTime : '',
      customers_id : '',
      pickup_office_id : '',
      drop_office_id : '',
      reservation_drivers : [],
      cars_id : '',
      RentDays: 0,
      SelectedPriceTitle : '',
      DailyRentPrice :0,
      OrgDailyRentPrice : 0,
      TotalRentPrice :0,
      RealDailyRentPrice : 0,
      ExtraServices : [],
      TotalExtraServicesPrice : 0,
      TotalPrice : 1,
      TotalPriceByCurrency:1,
      ReservationType : '',
      CurrencyType : '',
      CurrencySymbol : '',
      PaymentMethod : '',
      PaymentState : '',
      CurrencyRate : 0,
      ReservationRemarks : '',
      PayReceiptNo: ''
    })
    const selectedCars = ref({})
    const ReservationPriceRange  = ref(0)
    const extraServicesSelected = ref([])
    const transactionWindow = ref(null)
    const testLocales = computed(() => {
      return store.getters['MainModule/getDateTimeLocale']
    })
    return {
      testLocales,
      customers,
      transactionLoadingVisible : ref(false),
      transactionState : ref(false),
      transactionWindow,
      reservationTransactionStates,
      customer_signature : ref(''),
      customer_signature_preview : ref(''),
      step: ref(1),
      customerSignatureDialog : ref(false),
      creditCartsFields:  ref({
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
      }),
      groupDialogCreate: ref(false),
      newFormDialog: ref(false),
      addNewDriversDialog: ref(false),
      showPayReceiptNo:ref(false),
      selectedCars,
      reservationTypesOption,
      reservationCurrencyTypesOption,
      reservationPaymentMethodsOption,
      customerOptions,
      customerDriversOptionsByType,
      pickupLocationsOptions,
      carBrandsOption,
      carModelsOption,
      carTransmissionOption,
      newFormFields,
      selected_car_brand_id,
      selectOptionFields,
      showCustomerDrivers,
      customerDrivers,
      customerDriverOptions,
      customerGroupOptions,
      CarExtrasReservationColumns,
      onFilterPickupLocations(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          pickupLocationsOptions.value = pickupLocations.value.filter(v => v.OfficeName.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerOptions.value = customers.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomerDrivers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerDriverOptions.value = customerDrivers.value.filter(v => v.DriverName.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomerOfficialDrivers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerDriversOptionsByType.value = customersByTypes.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilterCustomerGroups(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerGroupOptions.value = customerGroups.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
      onFilerCarBrands(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()

          carBrandsOption.value = carBrands.value.filter(v => v.BrandName.toLowerCase().indexOf(needle) > -1)
        })
      },
      onSelectedCarBrand(id) {

        carModelsOption.value.splice(0,carModelsOption.value.length)
        selectOptionFields.value.model_id = ''
         carModelsOption.value =  carModels.value.filter(v => {
          return  +v.brand_id === +id
        })
        selected_car_brand_id.value = id
      },
      onSelectedCustomerGroup(id) {

        if (id) {
          newFormFields.value.customers_id = ''
          newFormFields.value.reservation_drivers = []
          showCustomerDrivers.value = false
          customerOptions.value = customers.value.filter( e => +e.customer_groups_id === +id && +e.Status === 1)
          return false
        }
        customerOptions.value = customers.value
      },

      onSelectedReservationCurrency(val) {

        newFormFields.value.SelectedPriceTitle = ''
        newFormFields.value.DailyRentPrice = 0
        newFormFields.value.OrgDailyRentPrice = 0
        newFormFields.value.TotalRentPrice = 0
        newFormFields.value.RealDailyRentPrice = 0
        newFormFields.value.ExtraServices = []
        newFormFields.value.TotalExtraServicesPrice = 0
        newFormFields.value.TotalPrice = 0

        let currency = reservationCurrencyTypesOption.value.find( e => e.title === val)
        newFormFields.value.CurrencySymbol = currency.symbol
        // burdan seçili tüm para birimlerini sıfırlayacagız


      },
      ReservationPriceRange,
      extraServicesSelected,
      onFilterCarModels(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          carModelsOption.value = carModels.value.filter(v => (v.ModelName.toLowerCase() && v.brand_id === selected_car_brand_id.value).indexOf(needle) > -1)
        })
      }
    }
  },
  methods : {
    onSelectedPaymentMethod(value){
      this.newFormFields.PayReceiptNo = '';
      this.showPayReceiptNo = value === 'EftTransfer' || value === 'CurrentSales' || value === 'CreditCartOnTerminal';
    },
    addedNewCustomer() {
      // store.getters['CustomersModule/getRecords'])
      this.customerOptions = JSON.parse(JSON.stringify(this.$store.getters['CustomersModule/getRecords'])).filter( e => {
        return  +e.customer_groups_id === +this.selectOptionFields.customer_groups_id
      })
      this.newFormDialog = false
      // this.selectOptionFields.customer_groups_id = ''
      // this.newFormFields.customers_id = ''

    },
    //*********** On Selected Date ********** //
    checkMinDate (date) {
       return date >= getTodayDateTime().currentYear+"/"+getTodayDateTime().currentMonth+"/"+getTodayDateTime().currentDay
    },
    chekMinStartDateTime (hr, min) {
      // if selected Day bigger than today's day
      if (this.newFormFields.StartDateTime > getTodayDateTime().currentTime) {
        return  true
      }
      //if selected Hour bigger than or equal to current Hour
      if (hr >= getTodayDateTime().currentHours )
      {
        // if selected hour equal to current hour
        if (min != null && hr === getTodayDateTime().currentHours) {
          return !(  min < getTodayDateTime().currentMin);
        } else {
          return  true
        }

      }
    },
    onChangeEndDateTime () {
      this.setDiffDay ()
    },
    onChangeEndTime(value, details) {
      this.setDiffDay ()

    },

    onSelectedCustomer(id){
      //  let customer = this.$store.getters['CustomersModule/getRecord'](id)
      //
      // if ( id !== null && customer.CustomerType === "Corporate")
      // {
      //   this.showCustomerDrivers = true
      //   this.customerDrivers = customer.customer_drivers
      //   this.customerDriverOptions = customer.customer_drivers
      // } else {
      //   this.showCustomerDrivers = false
      // }
    },
    setDiffDay () {

      let  startDate = new Date(this.newFormFields.StartDateTime.replaceAll('-','/') )
      let  endDate = new Date(this.newFormFields.EndDateTime.replaceAll('-','/') )

      startDate = new Date(startDate.setHours(startDate.getHours()+3 ) );  // 26 : 13:00

      const diffTime = Math.abs(endDate - startDate);

      const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // 1 gün

      let newEndDate = new Date(startDate.setDate(startDate.getDate() + diff)) // 27 => 13:00

      if (endDate.getTime() > newEndDate.getTime())
      {
        this.newFormFields.RentDays =  diff +1;

      } else {
        this.newFormFields.RentDays = diff
      }


    },
    checkMinEndDate(date) {
       const startDate = this.newFormFields.StartDateTime.split(' ')[0].replaceAll('-','/')

      return date > startDate
    },
    onChangeStartDate(value, reason, details) {
       this.newFormFields.EndDateTime = ''
    },
    onNextStep() {

      if(this.step === 1 ){
        this.selectedCars = '';
      }
      if (this.step === 2){
        // load aktif cars


        if (Object.keys(this.selectedCars).length <= 0)
        {
          Notify.create({
            position : 'bottom-right',
            message : 'Lütfen Araç Seçiniz',
            timeout : 1500,
            type : 'negative'
          })
          return false
        }


      }

        this.step += 1

    },
    renderSelectedLocationHtml(office_id) {
      const office = {...this.$store.getters['OfficeModule/officeById'](office_id)}
      const city = {...this.$store.getters['Cities/elById'](office.cities_id)}
      const district = {...this.$store.getters['DistrictModule/getRecordById'](office.districts_id)}
      return  Object.keys(office).length > 0 ? office.OfficeName + '    ' + city.CityName + ' / ' + district.DistrictName : ''

    },
    renderSelectedDateTimeHtml(date) {
      if (date !== null)
      {
        let dates = date.split(' ');
        let Date = dates[0].split('-')
        return Date[2]+"."+Date[1]+"."+Date[0]+ " "+ dates[1]
      }

    },
    onFilterCars() {
       // this.selectOptionFields.offices_id = this.newFormFields.pickup_office_id
       this.selectOptionFields.StartDateTime = this.newFormFields.StartDateTime
       this.selectOptionFields.EndDateTime = this.newFormFields.EndDateTime
       this.$refs.searchedCar.getFilterCars(this.selectOptionFields)

    },
    renderSelectedCar(carObj) {
      this.selectedCars = carObj
      this.newFormFields.cars_id = carObj.id
      this.newFormFields.ReservationRemarks = carObj.CarRemarks
    },
    onSelectedPrice(value, evt) {

      let price = parseInt(evt.currentTarget.getAttribute('price'))
      this.newFormFields.RealDailyRentPrice = price

      this.setOrderCurrency(price).then(res =>{
        price = parseFloat(res)
        this.newFormFields.DailyRentPrice = price
        this.newFormFields.OrgDailyRentPrice = price

        if (this.ReservationPriceRange !== 0)
        {
          this.onChangePriceRange(this.ReservationPriceRange)

        } else {
          this.newFormFields.TotalRentPrice = parseFloat(+this.newFormFields.OrgDailyRentPrice * this.newFormFields.RentDays).toFixed(2)
        }
        this.setTotalPriceOrder()
      })

      this.ReservationPriceRange = 0
    },
    onChangePriceRange(val) {
      const daily_price = this.newFormFields.OrgDailyRentPrice;


      this.newFormFields.DailyRentPrice = parseFloat( daily_price + (daily_price * val) / 100 ).toFixed(2)
      let RentDays = parseInt(this.newFormFields.RentDays)
      this.newFormFields.TotalRentPrice = parseFloat(+this.newFormFields.DailyRentPrice * RentDays).toFixed(2)

      this.newFormFields.ExtraServices = []
      this.newFormFields.TotalExtraServicesPrice = 0
      this.extraServicesSelected = []
      this.setTotalPriceOrder()
    },
    onSelectedExtraServices(val) {
      let ExtraServices = [];
      let extraServicesTotalPricePrice = 0;
      JSON.parse(JSON.stringify(val)).forEach(e => {
           if (e.CalculateType === "DependsOnHalfPrice")
           {
              const price = parseFloat(+this.newFormFields.DailyRentPrice / 2)
             e.RealPrice = parseFloat(+this.newFormFields.RealDailyRentPrice / 2)
             e.Price = parseFloat(this.newFormFields.RentDays * price).toFixed(2)
             e.Daily = price
             extraServicesTotalPricePrice += parseFloat(e.Price)
             ExtraServices.push(e)
           } else {
             e.RealPrice = e.Price
             const price = +e.Price
             e.Price =  parseFloat(price / this.newFormFields.CurrencyRate).toFixed(2)
             extraServicesTotalPricePrice += parseFloat(e.Price)
             ExtraServices.push(e)
           }
         });
      this.newFormFields.ExtraServices = ExtraServices
      this.newFormFields.TotalExtraServicesPrice = extraServicesTotalPricePrice

      this.setTotalPriceOrder()

    },
    setTotalPriceOrder() {
      this.newFormFields.TotalPrice = +this.newFormFields.TotalRentPrice + (+this.newFormFields.TotalExtraServicesPrice)

      this.newFormFields.TotalPriceByCurrency = parseInt((+this.newFormFields.TotalRentPrice * +this.newFormFields.CurrencyRate) + (+this.newFormFields.TotalExtraServicesPrice * +this.newFormFields.CurrencyRate))
    },
    onSavePricesWithPopUp() {
      // const daily_price = this.newFormFields.OrgDailyRentPrice;
      // this.newFormFields.DailyRentPrice = parseFloat( daily_price + (daily_price * val) / 100 ).toFixed(2)
      let RentDays = parseInt(this.newFormFields.RentDays)
      this.newFormFields.TotalRentPrice = parseFloat(+this.newFormFields.DailyRentPrice * RentDays).toFixed(2)

      this.setTotalPriceOrder()
    },
    setOrderCurrency(price) {
      switch (this.newFormFields.CurrencySymbol) {
        case '₺':
          return  this.$store.dispatch('MainModule/getCurrencyAmount','try').then(res =>{
            this.newFormFields.CurrencyRate = res
            return   parseFloat(price / res)
          })
        case '$':
       return   this.$store.dispatch('MainModule/getCurrencyAmount','usdt').then(res =>{
         this.newFormFields.CurrencyRate = res
           return   parseFloat(price / res)
         })
        case '€':
          return    this.$store.dispatch('MainModule/getCurrencyAmount','eur').then(res =>{
            this.newFormFields.CurrencyRate = res
            return   parseFloat(price / res)
          })
        case '£':
          return    this.$store.dispatch('MainModule/getCurrencyAmount','gbp').then(res =>{
            this.newFormFields.CurrencyRate = res
            return   parseFloat(price / res)
          })

      }

    },
    getCustomerSignature() {
      this.customerSignatureDialog = true
    },
    saveSignature(){
      this.customer_signature_preview = (this.customer_signature.length > 2106 ) ? this.customer_signature : this.customer_signature_preview
      this.customerSignatureDialog = false
    },
    clearSignature() {
     this.customer_signature = ''
     this.customer_signature_preview = ''
     // this.$refs.VueCanvasDrawing.reset()
     //  console.log(this.$refs.VueCanvasDrawing.isEmpty())
    },
    getTransaction() {
      let formData = new FormData();
      for (const [k,v] of Object.entries(this.creditCartsFields))
      {
        formData.append(k,v)
      }
      //formData.append('TotalPrice',this.newFormFields.TotalPrice)
      formData.append('TotalPrice',this.newFormFields.TotalPriceByCurrency)
      formData.append('CurrencyType',this.newFormFields.TotalPrice)
      formData.append('type','cardpluss')
      formData.append('CurrencyType',this.newFormFields.CurrencyType)
      formData.append('CurrencySymbol',this.newFormFields.CurrencySymbol)
      formData.append('CustomerId',this.newFormFields.customers_id)
      this.$store.dispatch('MainModule/getTransaction',formData).then(res => {

        const transactionId = res
        this.open(res)
        this.transactionLoadingVisible = true
        let time = 5000;
        let t =   setInterval(() => {
         // check status
          this.$store.dispatch('MainModule/checkTransaction',transactionId).then(res => {
            if(res.process === "continue")  {
              time += 1000
            } else if (res.process === "deleted") {
              this.transactionLoadingVisible = false
              clearInterval(t)
              Notify.create({
                type :'negative',
                message: 'İşlem Başarızız Lütfen Tekrar Deneyiniz...',
                timeout : 5000,
                position : 'bottom-right'
              })
              this.transactionWindow.close()
            } else if (res.process === "completed") {
              this.newFormFields.TransactionNo = res.TransactionNo
              this.newFormFields.PaymentState = 'Payed'
              this.transactionLoadingVisible = false
              this.transactionState = true
              this.transactionWindow.close()
              clearInterval(t)
              Notify.create({
                type :'positive',
                message: 'Ödeme Başarıyla Gerçekleşti',
                timeout : 600,
                position : 'top-right'
              })

            }
          })
        },time)
      })
    },
    open(id) {
      if(this.transactionWindow == null || this.transactionWindow.closed)
      {
        this.transactionWindow  =  window.open(this.$store.getters['MainModule/getServerUrl']+'/pay-transaction/'+id,"_blank","toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");

      }
      else
      {
        this.transactionWindow.focus();

      }

    },
    onSubmitNewReservation() {

      // check
      if ( this.newFormFields.PaymentMethod === 'CreditCartOnOffice' &&  this.newFormFields.PaymentState === 'PayWaiting' && this.newFormFields.TransactionNo === '')
      {
        Notify.create({
          type : 'warning',
          message : 'Ödeme henüz alınamadı.!',
          position : 'bottom-right',
          timeout : 1500
        })
        return false
      }
      let  formData = new FormData();
      for (const [k,v] of Object.entries(this.newFormFields))
      {
        if (k === 'ExtraServices' || k === 'reservation_drivers')
        {
          formData.append(k,JSON.stringify(v))
        }  else if(k === "TotalPrice")
        {
          formData.append(k,v.toFixed(2))
        }
        else {
          formData.append(k,v)
        }
      }
      if (this.customer_signature)
      {
        formData.append('CustomerSignature',this.customer_signature)
      }
      if (this.newFormFields.PaymentState === 'Payed')
      {
        formData.append('ReservationStatus','Continues')
      }
      // if(this.showPayReceiptNo){
      //   formData.append('PayReceiptNo',this.newFormFields.PayReceiptNo)
      // }
      formData.append('customer_groups_id',this.selectOptionFields.customer_groups_id)
      this.$store.dispatch('Reservations/create',formData).then(res => {
          if (res === true) {
            this.$router.push({name : 'listReservations'})
            return false
          }
      })
    },
    editModelValueOfPopup(val){
      this.newFormFields.DailyRentPrice = parseFloat(val).toFixed(2)
      this.onSavePricesWithPopUp()
    }

  },

   async mounted() {
    await  this.$store.dispatch('CustomersModule/get')
    await  this.$store.dispatch('OfficeModule/get')
    await  this.$store.dispatch('Cities/get')
    await  this.$store.dispatch('DistrictModule/get')
    await  this.$store.dispatch('CarBrandsModule/getCarBrands')
    await  this.$store.dispatch('CarModelsModule/getCarModels')
    await  this.$store.dispatch('CarClassesModule/get')
    await  this.$store.dispatch('CarTransmissionsModule/get')
    await  this.$store.dispatch('CustomerGroupsModule/get')
    await this.$store.dispatch('CarExtrasModule/get')
    this.$store.commit('CarsModule/CLEAR_RESERVATION_FILTERED_CARS')
  },


   computed : {
     carClassesOption() {
       return this.$store.getters['CarClassesModule/carClassesGetter']
     },
    extraServicesRow() {
       return this.$store.getters['CarExtrasModule/activeExtras']
    },

   },
  components : {
    SearchedCar,
    VuePaycard,
    VueDrawingCanvas,
    SuccessNotify,
    GroupCreate,
    NewCustomerForm,
    CustomerDriversFormCreate
  }
}
</script>

<style  >
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 5px!important;
}
.card-item__cover {
  background-color: transparent!important;
  background-image: linear-gradient(147deg,#bfc0c3 0,#dfe1e5 74%);
}

#sketch {
  border: 10px solid gray;
  height: 100%;
}
.card-item__side {
  box-shadow: none!important;
}
.card-item__chip {
  display: none;
}
</style>
