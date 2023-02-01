<template>
  <div class="row">
    <div class="col-4  q-mt-xs">

      <q-card class="no-box-shadow q-mt-sm">
        <q-tabs
          v-model="damageTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="exterior" label="Dış Alanı" />
          <q-tab name="interior" label="İç Alanı" />

        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="damageTab" animated>
          <q-tab-panel name="exterior">

            <div class=" q-pa-md " style="padding-top: 0!important;">
              <div class="row " >
                <div class="col-12 text-center bg-grey-2  ">
                  <div class="text-subtitle1  ">
                    Aracın Dış Alanı
                  </div>
                </div>
                <div class="col-12 q-mt-sm"  >
                  <div class="damage__view damage__view--exterior ">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="320.4px"
                      height="623px"
                      viewBox="0 0 498.4 623"
                      enable-background="new 0 0 498.4 623"
                      xml:space="preserve"
                      id="damageCars"
                    >
       <path
         fill="none"
         class="inactive"
         stroke="#000000"
         stroke-width="2"
         stroke-miterlimit="10"
         @click="onClickNewDamage($event)"
         @mouseover="onOverSvg($event)"
         @mouseout="OnOutSvg"
         d="M26.7,210.3c0,0,7.4,1.4,11.3,1.4
													  c25.4,0,46-20.6,46-46s-20.6-46-46-46c-4,0-7.8,0.5-11.5,1.4l4-50.6c0,0,11.5-10.1,21.6-10.1s35.4,0,35.4,0s32.2,23.9,40.9,123.2

													  c0,0,44.6,74.9,51.5,134.2s6,125-2.3,164.5c0,0-24.4,59.3-63.9,64.3c0,0-23,0.5-29,15.6H59.4c0,0-24.4-5.5-24.4-20.2v-21l2.3-1

													  c25.4,0,46-20.6,46-46s-20.6-46-46-46c-4,0-7.8,0.5-11.5,1.4L26.7,210.3z"
       ></path>
                      <path
                        class="js_car-part"
                        data-id="A30"
                        fill="red"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M175.1,291.5l-5.8,2.6c0,0,6.7,24.4,7.7,64.8c0.9,40.4,0.8,62,0.8,62s-0.2,12.9-3.5,24.4l-0.8,32.2l3.5,7c0,0,6.6-23,7.2-61.6

													  c0.6-38.6-0.9-72.9-2.1-88.2C180.6,317.5,175.1,291.5,175.1,291.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A12L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M137.6,465.8l3.4,31.4c0,0-7.1,5.6-8.4,6.7c0,0-23.1,9.3-32.6,20.1l-23.2-26.8c0,0,7.8-9.7,6.3-24.8c-1.5-15.2-5.2-20.1-5.2-20.1

													  s-7.7-13.1-18.2-18.4c-10.5-5.3-19.2-6.2-19.2-6.2V414l37.1,24.9l37.8,26.4L137.6,465.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A3L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M116.3,219.5c0,0-0.2-68.9-5.7-91c0,0-1.3,11.5-5.6,14.5c0,0-5.1-7.4-7.7-13.6l-17.8,15.3c0,0,6.4,11.8,4.2,26.7

													  c-2.2,14.8-9.7,24.4-15.2,29c-4.8,4-14.4,11.1-27.6,11.1v10.1C40.9,221.5,94.8,216.7,116.3,219.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A13L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M75.6,474.2c0-20.8-16.9-37.7-37.7-37.7S0.3,453.4,0.3,474.2s16.9,37.7,37.7,37.7C58.7,511.9,75.6,495,75.6,474.2z M8.6,474.2

													  c0-16.2,13.1-29.3,29.3-29.3c16.2,0,29.3,13.1,29.3,29.3s-13.1,29.3-29.3,29.3S8.6,490.4,8.6,474.2z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A4L"
                        data-description="Ön Sol Lastik"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"

                        d="

													  M75.6,165.7c0-20.8-16.9-37.7-37.7-37.7S0.3,144.9,0.3,165.7s16.9,37.7,37.7,37.7C58.7,203.4,75.6,186.5,75.6,165.7z M8.6,165.7

													  c0-16.2,13.1-29.3,29.3-29.3c16.2,0,29.3,13.1,29.3,29.3S54.1,195,37.9,195S8.6,181.9,8.6,165.7z"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A5L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M40.1,427.8l-0.3-216.5c0,0-9.9-0.6-13.1-1.7l-0.8,219.9C25.8,429.5,34,427.5,40.1,427.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A2L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M97.1,129.4c0,0-11-19.8-8.1-57.4l1.5,1.6l3.8-6l-6.8-7.1H49.1c0,0-15.9,4.8-18.6,10.1l-4.4,49.9c0,0,20.5-2.8,32.9,3.9

													  S79.2,145,79.2,145L97.1,129.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A15L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M99.7,524.1l-23-26.1c0,0-10.4,15.2-21.9,18.7S38,519.5,38,519.5l-3.2,2.1l0.2,18.6c0,0-2,15.4,24.5,21.6l25-0.6

													  C84.5,561.3,83.1,539.9,99.7,524.1z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A10"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M128.3,183.6c0,0-6.3,5.1-12.2,14.5c0,0-1.6-61.1-9-84.3c-7.4-23.2-16.5-41.4-16.5-41.4l3.4-5.3C94.1,67.1,119.6,94,128.3,183.6z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A16L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M176.4,484.9l-0.1-0.2l-3.3-6.2l-15.6,12c0,0-14.5,4.5-23.7,12.8c0,0-50.2,17-48.5,56.9l2.8-2.9c0,0,9-10.3,27.6-11.3

													  C134.1,545.1,157.3,525.3,176.4,484.9z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A14L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M157.3,490.4c0,0-40.7,13.2-43.8,46.6C113.5,537,140.4,530,157.3,490.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A1L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M89,71.9c0.1-1,15.9,24.8,20.5,53.6c0,0,1.5,10.9-4.9,17.5C104.6,143,83.5,113.3,89,71.9z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A0L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M43.7,71.6c-1.1-0.2-2.4-0.2-3.7,0.3c-3.1,1.2-3.4,7.4-1.8,16.2c1.5,8.9,4,13.8,10.4,11c5.9-2.5,10.5-9.8,0.7-23.1

													  C48.4,75,45.2,71.9,43.7,71.6z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A11L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M169.9,449.1l-29.1,18.7c0,0,3.3,19.1,17.8,13.5C164,479.1,169.9,449.1,169.9,449.1z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A20"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M131.1,188.4c0,0-5.7,5.3-8.3,9.9c0,0,29,39.1,46.2,95.4l5.3-2.3C174.3,291.4,166.3,250.3,131.1,188.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A40"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M135.9,538.2v-15.4c0,0,12.8-11.1,20.5-31.1l16.5-13.2l3.3,6.2C176.3,484.7,159,523.8,135.9,538.2z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A9L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M169.9,445.1c0,0,4.9-14.1,4.9-30c0-9.2-0.9-51.5-0.9-51.5c-7-3.9-20.8-6.8-33.4-8.2c-13.9-1.6-26.3-1.6-26.3-1.6H40l0.3,60.4

													  c37.4,22.7,75.4,51.5,75.4,51.5h22.7L169.9,445.1z M132.2,360.5c19.5,0.5,38.1,6.9,38.1,6.9s0.7,41.4,0.7,51.9s-4.6,22.7-4.6,22.7

													  l-28.8,17.3L132.2,360.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A8L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M173.5,358.7c-0.9-17.5-3.7-41.1-3.7-41.1c-7-46.3-53.6-117.6-53.6-117.6v19.3c-36.5-2.5-76,2.5-76,2.5v128.4c0,0,57-0.6,82.7,0

													  C148.7,350.7,173.5,358.7,173.5,358.7z M129.9,344.5l-11.3-115.3l7.6-4.4c20.1,35.6,31.7,63,37,83.2c2.3,8.8,3.9,22.3,3.9,22.3

													  l1.8,20.7C147.6,345.4,129.9,344.5,129.9,344.5z"
                      ></path>
                      <path
                        fill="none"
                        class="inactive"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M471.7,210.3c0,0-7.4,1.4-11.3,1.4

													  c-25.4,0-46-20.6-46-46s20.6-46,46-46c4,0,7.8,0.5,11.5,1.4l-4-50.6c0,0-11.5-10.1-21.6-10.1s-35.4,0-35.4,0S378.8,84.3,370,183.6

													  c0,0-44.6,74.9-51.5,134.2s-6,125,2.3,164.5c0,0,24.4,59.3,63.9,64.3c0,0,23,0.5,29,15.6H439c0,0,24.4-5.5,24.4-20.2v-21l-2.3-1

													  c-25.4,0-46-20.6-46-46s20.6-46,46-46c4,0,7.8,0.5,11.5,1.4L471.7,210.3z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A30"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M323.3,291.5l5.8,2.6c0,0-6.7,24.4-7.7,64.8c-0.9,40.4-0.8,62-0.8,62s0.2,12.9,3.5,24.4l0.8,32.2l-3.5,7c0,0-6.6-23-7.2-61.6

													  c-0.6-38.6,0.9-72.9,2.1-88.2C317.8,317.5,323.3,291.5,323.3,291.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A12R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M360.7,465.8l-3.4,31.4c0,0,7.1,5.6,8.4,6.7c0,0,23.1,9.3,32.6,20.1l23.2-26.8c0,0-7.8-9.7-6.3-24.8s5.2-20.1,5.2-20.1

													  s7.7-13.1,18.2-18.4c10.5-5.3,19.2-6.2,19.2-6.2V414l-37.1,24.9l-37.8,26.4L360.7,465.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A3R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M382.1,219.5c0,0,0.2-68.9,5.7-91c0,0,1.3,11.5,5.6,14.5c0,0,5.1-7.4,7.7-13.6l17.8,15.3c0,0-6.4,11.8-4.3,26.7

													  c2.2,14.8,9.7,24.4,15.2,29c4.8,4,14.4,11.1,27.6,11.1v10.1C457.5,221.5,403.6,216.7,382.1,219.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A13R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M422.8,474.2c0-20.8,16.9-37.7,37.7-37.7c20.8,0,37.7,16.9,37.7,37.7s-16.9,37.7-37.7,37.7C439.6,511.9,422.8,495,422.8,474.2z

													   M489.8,474.2c0-16.2-13.1-29.3-29.3-29.3c-16.2,0-29.3,13.1-29.3,29.3s13.1,29.3,29.3,29.3C476.7,503.5,489.8,490.4,489.8,474.2z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A4R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M422.8,165.7c0-20.8,16.9-37.7,37.7-37.7c20.8,0,37.7,16.9,37.7,37.7s-16.9,37.7-37.7,37.7C439.6,203.4,422.8,186.5,422.8,165.7z

													   M489.8,165.7c0-16.2-13.1-29.3-29.3-29.3c-16.2,0-29.3,13.1-29.3,29.3s13.1,29.3,29.3,29.3C476.7,195,489.8,181.9,489.8,165.7z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A5R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M458.3,427.8l0.3-216.5c0,0,9.9-0.6,13.1-1.7l0.8,219.9C472.6,429.5,464.4,427.5,458.3,427.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A2R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M401.3,129.4c0,0,11-19.8,8.1-57.4l-1.5,1.6l-3.8-6l6.8-7.1h38.4c0,0,15.9,4.8,18.6,10.1l4.4,49.9c0,0-20.5-2.8-32.9,3.9

													  C427,131,419.2,145,419.2,145L401.3,129.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A15R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M398.7,524.1l23-26.1c0,0,10.4,15.2,21.9,18.7c11.5,3.5,16.8,2.9,16.8,2.9l3.2,2.1l-0.2,18.6c0,0,2,15.4-24.5,21.6l-25-0.6

													  C413.9,561.3,415.3,539.9,398.7,524.1z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A10"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M370,183.6c0,0,6.3,5.1,12.2,14.5c0,0,1.6-61.1,9-84.3c7.4-23.2,16.5-41.4,16.5-41.4l-3.4-5.3C404.3,67.1,378.8,94,370,183.6z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A16R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M322,484.9l0.1-0.2l3.3-6.2l15.6,12c0,0,14.5,4.5,23.7,12.8c0,0,50.2,17,48.5,56.9l-2.8-2.9c0,0-9-10.3-27.6-11.3

													  S341.1,525.3,322,484.9z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A14R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M341.1,490.4c0,0,40.7,13.2,43.8,46.6C384.9,537,357.9,530,341.1,490.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A1R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M409.4,71.9c-0.1-1-15.9,24.8-20.5,53.6c0,0-1.5,10.9,4.9,17.5C393.8,143,414.9,113.3,409.4,71.9z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A0R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M454.7,71.6c1.1-0.2,2.4-0.2,3.7,0.3c3.1,1.2,3.4,7.4,1.8,16.2c-1.5,8.9-4,13.8-10.4,11c-5.9-2.5-10.5-9.8-0.7-23.1

													  C450,75,453.2,71.9,454.7,71.6z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A11R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M328.5,449.1l29.1,18.7c0,0-3.3,19.1-17.8,13.5C334.4,479.1,328.5,449.1,328.5,449.1z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A20"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M367.3,188.4c0,0,5.7,5.3,8.3,9.9c0,0-29,39.1-46.2,95.4l-5.3-2.3C324.1,291.4,332.1,250.3,367.3,188.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A40"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M362.5,538.2v-15.4c0,0-12.8-11.1-20.5-31.1l-16.5-13.2l-3.3,6.2C322.1,484.7,339.4,523.8,362.5,538.2z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A9R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M328.5,445.1c0,0-4.9-14.1-4.9-30c0-9.2,0.9-51.5,0.9-51.5c7-3.9,20.8-6.8,33.4-8.2c13.9-1.6,26.3-1.6,26.3-1.6h74.1l-0.3,60.4

													  c-37.4,22.7-75.4,51.5-75.4,51.5h-22.7L328.5,445.1z M366.1,360.5c-19.5,0.5-38.1,6.9-38.1,6.9s-0.7,41.4-0.7,51.9

													  s4.6,22.7,4.6,22.7l28.8,17.3L366.1,360.5z M366.1,360.5c-19.5,0.5-38.1,6.9-38.1,6.9s-0.7,41.4-0.7,51.9s4.6,22.7,4.6,22.7

													  l28.8,17.3L366.1,360.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A8R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M324.9,358.7c0.9-17.5,3.7-41.1,3.7-41.1c7-46.3,53.6-117.6,53.6-117.6v19.3c36.5-2.4,76,2.5,76,2.5v128.4c0,0-57-0.6-82.7,0

													  C349.7,350.7,324.9,358.7,324.9,358.7z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A30"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M317.5,282.4c0,0-11.9,117.6-8.3,199.1h-118c0,0-3.4-158.1-10.4-198.5c0,0,38.9-3.2,75.7-3.4C287.5,279.5,317.3,282.2,317.5,282.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A20"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        data-description="Üst Kaporta"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M317.5,282.4l13.2-91c0,0-8.3-31.9-77.8-31.9s-83,25.4-83,25.4l11,98C180.9,283,276.2,276.3,317.5,282.4z"
                      >


      </path>
                      <path
                        class="js_car-part"
                        data-id="A40"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M309.3,481.6c0,0,11,1.5,12.9,10.7c1.8,9.2-4.9,40.1-39.5,45.6s-66.8,0.6-66.8,0.6s-38-2.8-40.7-42.9c0,0,1.2-14.1,16.2-14.1

													  S309.7,482,309.3,481.6z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A50"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M321.2,504.8c0,0,10.7,9.5,10.7,42.9c0,0,21.8,13.5,21.8,30.9H143.8c0,0,8-21.4,23-28.2c0,0-5.2-25.1,9.5-46c0,0,4.9,25.4,30.6,32

													  c11.8,3,26.5,4,39.1,4.1c14.9,0.1,38.6-0.7,51-6.9C306.7,529,316.6,520.4,321.2,504.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A60"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M353.7,578.7H144.9c0,0-3.7,30.7,13.1,44h182.4C340.4,622.7,353.7,616.2,353.7,578.7z"
                      ></path>
                      <ellipse
                        class="js_car-part"
                        data-id="A17R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        cx="331.5"
                        cy="597.2"
                        rx="10.6"
                        ry="6.2"
                      ></ellipse>
                      <ellipse
                        class="js_car-part"
                        data-id="A17L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        cx="164.2"
                        cy="597.2"
                        rx="10.6"
                        ry="6.2"
                      ></ellipse>
                      <path
                        class="js_car-part"
                        data-id="A10"
                        data-description="Üst Kapot"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage('Üst Tapu')"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M330.7,191.4c0,0-1.8-59.3-28.4-114c0,0-18.2-8.5-52.2-8.5S198,76.1,198,76.1s-26.3,52.2-28.1,108.9c0,0,14.1-25.8,86.7-25.5 C320.4,159.7,330.7,191.4,330.7,191.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A14R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M321.6,506c0,0-9.9,17-8,37.5c0,0,11.9,1.4,17.5-10.3C331,533.1,330.3,514.3,321.6,506z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A14L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M176.1,506c0,0,9.9,17,8,37.5c0,0-11.9,1.4-17.5-10.3C166.7,533.1,167.4,514.3,176.1,506z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A1R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M340.9,81.8c0,0-6.7-19.5-23.9-24.4h-17.9c0,0-1.4,0.7,3.2,7.1C306.9,71,319.3,81.1,340.9,81.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A1L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="

													  M156.4,81.8c0,0,6.7-19.5,23.9-24.4h17.9c0,0,1.4,0.7-3.2,7.1S178,81.1,156.4,81.8z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A00"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M180.3,57.5c8.9-1.2,17.9,0,17.9,0s-0.3,5.5-3.7,8.7H303c0,0-5.3-8.7-3.9-8.7c1.4,0,17.9,0,17.9,0s12.2,4.1,17.7,13.6

													  c0,0,10.3,0.2,20.9-13.1c0,0,0.9-43-12.9-57.7H155c0,0-12.9,20.5-10.6,55.4c0,0,4.8,10.1,17.7,14.7

													  C162.1,70.3,171.4,58.6,180.3,57.5z M208.1,18.4c-2.4,0-4.4-2-4.4-4.4s2-4.4,4.4-4.4h83c2.4,0,4.4,2,4.4,4.4s-2,4.4-4.4,4.4

													  C291,18.4,208.1,18.4,208.1,18.4z M191.8,43.4c0,0,11.9-8,58.1-8c46.2,0,57.7,6.9,57.7,6.9L288,57.7h-78.8L191.8,43.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A7R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M367.6,344.5l11.3-115.3l-7.6-4.4c-20.1,35.6-31.7,63-37,83.2c-2.3,8.8-3.9,22.3-3.9,22.3l-1.8,20.7

													  C349.9,345.4,367.6,344.5,367.6,344.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A7L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M129.9,344.5l-11.3-115.3l7.6-4.4c20.1,35.6,31.7,63,37,83.2c2.3,8.8,3.9,22.3,3.9,22.3l1.8,20.7 C147.6,345.4,129.9,344.5,129.9,344.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A10L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M132.2,360.5c19.5,0.5,38.1,6.9,38.1,6.9s0.7,41.4,0.7,51.9s-4.6,22.7-4.6,22.7l-28.8,17.3L132.2,360.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A10R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M366.1,360.5c-19.5,0.5-38.1,6.9-38.1,6.9s-0.7,41.4-0.7,51.9s4.6,22.7,4.6,22.7l28.8,17.3L366.1,360.5z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A6L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M126.3,224.7l10.1,17.9c0,0-2.8,20.5-14.9,7.8l-2.8-21.4L126.3,224.7z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A6R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M372.1,224.7L362,242.7c0,0,2.8,20.5,14.9,7.8l2.8-21.4L372.1,224.7z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A0R"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M323,26.4c-9.5,0-14.2-3.3-14.2-8.2s4-8.8,13.6-8.8c9.5,0,17.2-0.7,17.2,8.8C339.5,28.3,332.5,26.4,323,26.4z"
                      ></path>
                      <path
                        class="js_car-part"
                        data-id="A0L"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        @click="onClickNewDamage($event)"
                        @mouseover="onOverSvg($event)"
                        @mouseout="OnOutSvg"
                        d="M173.8,26.4c9.5,0,14.2-3.3,14.2-8.2s-4-8.8-13.6-8.8c-9.5,0-17.2-0.7-17.2,8.8C157.3,28.3,164.3,26.4,173.8,26.4z"
                      ></path>

    </svg>
                  </div>
                </div>
              </div>
              <div class="row" style="height: 30px">
                <div class="col-12 text-center bg-blue-2 q-mt-xs " v-if="damageDetails.show"   >
                  <div class="text-subtitle1  ">
                    {{damageDetails.DamageTitle}}
                  </div>
                </div>
              </div>
            </div>

<!--            <exterior @add-new-damage="addNewDamage"  :car-id="selected[0].id"  ref="exteriorDamages"  @update-damage="updateDamage" />-->

          </q-tab-panel>

          <q-tab-panel name="interior">
            <div class=" q-pa-md " style="padding-top: 0!important;">
              <div class="row " >
                <div class="col-12 text-center bg-grey-2  ">
                  <div class="text-subtitle1  ">
                    Aracın İç Alanı
                  </div>
                </div>
                <div class="col-12 q-mt-sm"  >
                  <div class="damage__view damage__view--interior">
                    <div class="svg-place" id="interior-svg">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="231.8px"
                        height="474.8px"
                        viewBox="0 0 231.8 474.8"
                        enable-background="new 0 0 231.8 474.8"
                        xml:space="preserve"
                      >
                <path
                  data-id="AI60"
                  class="color2 js_car-part"
                  @click="onClickNewDamage($event)"
                  @mouseover="onOverSvg($event)"
                  @mouseout="OnOutSvg"
                  d="M128.2,305.6l-27,0.2l-10.5,31.9v8.3c0,0,2.1,6.5,8.8,6.9c6.7,0.4,29.2,0.2,29.2,0.2s8.3-1.5,8.4-7.7

c0.2-6.2,0.2-7.8,0.2-7.8L128.2,305.6z"
                ></path>
                        <path
                          data-id="AI5L"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M46.9,352.9l32.7,0.3l0.3,5.3l18.7-0.2l1.1-0.9l-0.1-4.6c0,0-7.5,0-8.7-7.9l-0.1-5.8l-0.2-0.5

c0.2,0,0.3,0,0.3,0l8.8-27.3c0,0-3.4,0.1-5.9-0.6c-2.5-0.7-6.3-3.5-9.2-3.9c-1.6-0.2-3.7-0.1-5.3,0l-0.7-1.8L45.4,305l-1,1.3

l-7.9-1.1c0,0-4.3-0.1-5.6-2.1c0,0-5.1,2.8-12.3,0.8l-2,0.8c0,0-6.8,4.1-6.5,11.3s2.9,32.9,2.9,32.9s1.8,7.8,10.5,8s23.2,0,23.2,0

L46.9,352.9z"
                        ></path>
                        <path
                          data-id="AI5R"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M181.1,352.9l-32.7,0.3l-0.3,5.3l-18.7-0.2l-1.1-0.9l0.1-4.6c0,0,7.5,0,8.7-7.9l0.1-5.8l-8.5-29.3

c0,0,3.3,0.3,5.8-0.4c2.5-0.7,9.2-4.6,10.8-4.4l4-0.1l33.1,0.1l1,1.3l7.9-1.1c0,0,4.3-0.1,5.6-2.1c0,0,5.8,2.3,12.3,0.8l2,0.8

c0,0,6.8,4.1,6.5,11.3s-2.9,32.9-2.9,32.9s-1.8,7.8-10.5,8s-23.2,0-23.2,0L181.1,352.9z"
                        ></path>
                        <path
                          data-id="AI4L"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M99,311.4l2.2-5.7L97,252.4l-12.5-1l-1.1,0.4l-1.1-1.6l-41.5-0.3c0,0-5.5,2-7.3,4.7c0,0-6.2-2.5-12.3,5.8

c-6.2,8.3-9.8,12-9.5,22.7c0.3,10.7,2.3,16.5,2.3,16.5l3.8,4.3c0,0,7.2,2,12.5-0.5c0,0,2.7,1.8,4.8,2c2.2,0.2,8.8,0.7,8.8,0.7

l0.8-0.8l33.7-0.3l0.5,1.8c0,0,0.7-0.3,4.2-0.5c3.5-0.2,5,2.5,8.2,3.7C94.5,311.1,99,311.4,99,311.4z"
                        ></path>
                        <path
                          data-id="AI4R"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M129,309.7l-1.2-4.2l3.4-53.4l13.2-0.3l1.7-1.6l40.8-0.3c0,0,5.5,2,7.3,4.7c0,0,6.2-2.5,12.3,5.8

c6.2,8.3,9.8,12,9.5,22.7c-0.3,10.7-2.3,16.5-2.3,16.5l-3.8,4.3c0,0-7.8,1.6-13.1-0.9c0,0-2,2.3-4.2,2.4c-2.2,0.2-8.8,0.7-8.8,0.7

l-0.8-0.8l-33.7-0.3c0,0-1,0.4-4.5,0.3c-3.5-0.2-5.4,2.5-8.6,3.7C133.1,310,129,309.7,129,309.7z"
                        ></path>
                        <polygon
                          data-id="AI50"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          points="131.3,252.1 129.5,250.9 98.5,250.8 97,252.4 101.2,305.8 128.2,305.6 "
                        ></polygon>
                        <path
                          data-id="AI80"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M200.4,373.4H28.7l-4.6,69.9c0,0,6.8,30.4,46.3,31.1s89.7,0,89.7,0s43.9-4.4,43.9-34.9

C203.9,413.6,200.4,373.4,200.4,373.4z"
                        ></path>
                        <path
                          data-id="AI1R"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M144.2,183c6.3,5.5,11.9,3.8,11.9,3.8c1.3,1.5,5.3,1.6,5.3,1.6s32.9-0.4,38.1,0c5.2,0.3,3.7-1.6,8.6-0.9

c4.9,0.7,7.7-2.4,8.6-3.4c0.2-0.2,0.6-0.4,1-0.6c0,0,0,0,0,0c0,0,5.7-12.9,2.1-35.7c-3.6-22.9-11.2-22.1-16.1-22.4

c-4.9-0.3-47.8,0.3-47.8,0.3s-10-0.4-13.5,21.8c-3.4,22.3,2.2,35.4,2.2,35.4S144.4,183,144.2,183z"
                        ></path>
                        <path
                          data-id="AI2R"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M199.9,233c0,0,18.2,1.3,20.3-9.7c2.5-12.9,3-29.7,3-29.7s0.4-6.1-5.5-9.9l-2.1,1.3c0,0-4.4,3.1-6.2,2.9

c-1.8-0.2-4.2-0.6-4.2-0.6s-3.8,1.2-12.7,0.9c-8.9-0.3-32.2,0.3-32.2,0.3l-4.3-1.7c0,0-3.8,1.6-7.7-1c-1.4-1-2.8-1.9-3.9-2.8

c-0.4,0.1-6.5,2.2-5.9,15.2c0.6,13.5,3.6,27.9,4.5,29c0.9,1,4.6,6,20.3,5.7L199.9,233z"
                        ></path>
                        <path
                          data-id="AI00"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M152.3,11.7c0,0-15.3-13-36.9-11.6S78.9,11.4,78.9,11.4l11,12.9h51.7L152.3,11.7z"
                        ></path>
                        <path
                          data-id="AI20"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M155.6,92.5c0,0-11.6,1.3-14.2,20.2C138.9,131.7,133,232,133,232s0.3,4.1-8,4.1s-17.5,0-17.5,0

s-6.7,0-6.7-4.9c0-6.9-3.9-97.2-10-125.1c0,0-4.1-12-14.2-13.6H155.6z"
                        ></path>
                        <path
                          data-id="AI0L"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M76.9,11.7L88,25.1c0,0-0.9,55.4-10.5,64l-3.3,1.8l-68.3-3L0,35.9C0,35.9,37.7,17.1,76.9,11.7z"
                        ></path>
                        <path
                          data-id="AI0R"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M154.2,12l-11,13.2c0,0,0.9,55.5,10.6,64.1l3.4,1.8l68.7-3l5.9-52C231.8,36.2,193.6,17.3,154.2,12z"
                        ></path>
                        <path
                          data-id="AI10"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M141.6,26.1l-51.5,0c0,0-1.1,61.8-12,64.7h76.2C154.2,90.8,142.8,91.1,141.6,26.1z"
                        ></path>
                        <path
                          data-id="AI6R"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M180.9,353.1v5c0,0,0.7,6.3-5.9,6.3s-22.4,0-22.4,0s-4.4-0.9-4.4-6s0-5.6,0-5.6S180.9,353.2,180.9,353.1z"
                        ></path>
                        <path
                          data-id="AI6L"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M80,353.1v5c0,0,0.7,6.3-5.9,6.3s-22.7,0-22.7,0s-4.5-0.9-4.5-6s0-5.6,0-5.6S80,353.2,80,353.1z"
                        ></path>
                        <path
                          data-id="AI70"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M128.7,353.1v4.7c0,0,0.6,5.9-5.2,5.9c-5.8,0-20,0-20,0s-4-0.8-4-5.6c0-4.8,0-5.2,0-5.2

S128.7,353.2,128.7,353.1z"
                        ></path>
                        <path
                          data-id="AI3R"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M199.2,233.8l1.8-9.1c0,0,0.1-7.5-8.4-7.5c-6.9,0-24.1,0-24.1,0s-7,0.8-6.1,7.7c0.8,6.1,1.7,8.4,1.7,8.4

s0.9,3.2,5.9,3.2s23.1,0,23.4,0C193.8,236.5,198.4,236.4,199.2,233.8z"
                        ></path>
                        <g class="inactive">
                  <path
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    d="

		M203.7,429.5c0,0-19.1,29.3-48,29.3s-80.9,0-80.9,0s-38.2-3.1-49.6-28.2"
                  ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M217.4,183.4c-6.8,6.9-11.4,3.7-11.4,3.7c-0.8,0.7-3.5,1.2-3.5,1.2s-36.5,0.1-41.2,0.1s-5.3-1.6-5.3-1.6

	c-5.7,2.5-11.6-3.9-11.6-3.9"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M206,187.1c0,0,8.1-8.2,6.5-26.3s-2.8-23.9-10-35.1"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M211.6,187.6c0,0,6.3,1.9,6,12c-0.3,10-4.8,19.8-7.6,22.1c-2.4,1.9-3.3,2.4-8.4,2.4c0,0,0-7.2-7.8-7.5c-7.8-0.3-25.1,0-25.1,0

	s-7-0.3-7,7.6c0,0-6.4,3.1-12.7-7.3c-6.3-10.5-5.2-21.2,0.9-30"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M201.9,126c0,0-7.3,38.3-4.9,62.5c0,0,0.7,9.3,4,16c3.3,6.7,8.1,14.9,1.5,18.8"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M157,187.1c0,0-8.1-8.2-6.5-26.3s2.8-23.9,10-35.1"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M161.1,126c0,0,7.3,38.3,4.9,62.5c0,0-0.7,9.3-4,16c-3.3,6.7-8.1,14.9-1.5,18.8"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="198"
                            y1="153"
                            x2="164.9"
                            y2="153"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="198"
                            y1="197.7"
                            x2="164.9"
                            y2="197.7"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="201.6"
                            y1="224"
                            x2="199.9"
                            y2="233"
                          ></line>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M161.7,224.2"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="161.7"
                            y1="224.2"
                            x2="163.3"
                            y2="232.9"
                          ></line>
                </g>
                        <path
                          data-id="AI1L"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M16.7,183c6.3,5.5,11.9,3.8,11.9,3.8c1.3,1.5,5.3,1.6,5.3,1.6s32.9-0.4,38.1,0c5.2,0.3,3.7-1.6,8.6-0.9

c4.9,0.7,7.7-2.4,8.6-3.4c0.2-0.2,0.6-0.4,1-0.6c0,0,0,0,0,0c0,0,5.7-12.9,2.1-35.7c-3.6-22.9-11.2-22.1-16.1-22.4

c-4.9-0.3-47.8,0.3-47.8,0.3s-10-0.4-13.5,21.8c-3.4,22.3,2.2,35.4,2.2,35.4S16.9,183,16.7,183z"
                        ></path>
                        <path
                          data-id="AI2L"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M72.5,233c0,0,18.2,1.3,20.3-9.7c2.5-12.9,3-29.7,3-29.7s0.4-6.1-5.5-9.9l-2.1,1.3c0,0-4.4,3.1-6.2,2.9

c-1.8-0.2-4.2-0.6-4.2-0.6s-3.8,1.2-12.7,0.9c-8.9-0.3-32.2,0.3-32.2,0.3l-4.3-1.7c0,0-3.8,1.6-7.7-1c-1.4-1-2.8-1.9-3.9-2.8

c-0.4,0.1-6.5,2.2-5.9,15.2c0.6,13.5,3.6,27.9,4.5,29c0.9,1,4.6,6,20.3,5.7L72.5,233z"
                        ></path>
                        <path
                          data-id="AI3L"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M71.7,233.8l1.8-9.1c0,0,0.1-7.5-8.4-7.5c-6.9,0-24.1,0-24.1,0s-7,0.8-6.1,7.7c0.8,6.1,1.7,8.4,1.7,8.4

s0.9,3.2,5.9,3.2s23.1,0,23.4,0S71,236.4,71.7,233.8z"
                        ></path>
                        <g class="inactive">
                  <path
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    d="

	M90,183.4c-6.8,6.9-11.4,3.7-11.4,3.7c-0.8,0.7-3.5,1.2-3.5,1.2s-36.5,0.1-41.2,0.1s-5.3-1.6-5.3-1.6c-5.7,2.5-11.6-3.9-11.6-3.9"
                  ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M78.5,187.1c0,0,8.1-8.2,6.5-26.3s-2.8-23.9-10-35.1"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M84.1,187.6c0,0,6.3,1.9,6,12c-0.3,10-4.8,19.8-7.6,22.1c-2.4,1.9-3.3,2.4-8.4,2.4c0,0,0-7.2-7.8-7.5c-7.8-0.3-25.1,0-25.1,0

	s-7-0.3-7,7.6c0,0-6.4,3.1-12.7-7.3c-6.3-10.5-5.2-21.2,0.9-30"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M74.4,126c0,0-7.3,38.3-4.9,62.5c0,0,0.7,9.3,4,16c3.3,6.7,8.1,14.9,1.5,18.8"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M29.5,187.1c0,0-8.1-8.2-6.5-26.3s2.8-23.9,10-35.1"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M33.6,126c0,0,7.3,38.3,4.9,62.5c0,0-0.7,9.3-4,16c-3.3,6.7-8.1,14.9-1.5,18.8"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="70.5"
                            y1="153"
                            x2="37.5"
                            y2="153"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="70.5"
                            y1="197.7"
                            x2="37.5"
                            y2="197.7"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="74.1"
                            y1="224"
                            x2="72.5"
                            y2="233"
                          ></line>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

	M34.2,224.2"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="34.2"
                            y1="224.2"
                            x2="35.8"
                            y2="232.9"
                          ></line>
                </g>
                        <path
                          data-id="AI30"
                          class="color2 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          d="M84.3,114.8c0-10-15.2-18.1-33.9-18.1s-33.9,8.1-33.9,18.1s15.2,18.1,33.9,18.1S84.3,124.8,84.3,114.8z

 M24.2,115.5c0-7.3,11.8-13.1,26.3-13.1s26.3,5.9,26.3,13.1c0,7.3-11.8,13.1-26.3,13.1S24.2,122.7,24.2,115.5z"
                        ></path>
                        <ellipse
                          data-id="AI40"
                          class="color1 js_car-part"
                          @click="onClickNewDamage($event)"
                          @mouseover="onOverSvg($event)"
                          @mouseout="OnOutSvg"
                          cx="50.4"
                          cy="114.8"
                          rx="14.8"
                          ry="8.3"
                        ></ellipse>
                        <g class="inactive">
                  <path
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    d="

		M152.3,364.3c0,0,21.4,0,24.8,0c4.7,0,4.1-7.4,4.1-7.4s18,0.4,24.8,0c6.8-0.4,8.9-7.8,8.9-7.8s3-25.6,2.8-34

		c-0.1-8.4-7.8-11.1-7.8-11.1c1.3-0.7,3.5-3.7,4.3-5.2c0.7-1.5,3-15.2,2.4-21.3c-0.6-6.1-9.6-17.3-13.7-21

		c-4.1-3.7-8.4-2.2-8.4-2.2c-3-3.7-7.4-4.3-7.4-4.3l-40.8,0.1l-1.8,1.8h-13.6l-1-1h-13.1h-5.3H98.2l-1,1H83.6l-1.8-1.8l-40.8-0.1

		c0,0-4.4,0.6-7.4,4.3c0,0-4.3-1.5-8.4,2.2c-4.1,3.7-13.1,14.9-13.7,21c-0.6,6.1,1.6,19.8,2.4,21.3c0.7,1.5,3,4.4,4.3,5.2

		c0,0-7.7,2.7-7.8,11.1c-0.1,8.4,2.8,34,2.8,34s2.1,7.4,8.9,7.8c6.8,0.4,24.8,0,24.8,0s-0.6,7.4,4.1,7.4c3.4,0,24.8,0,24.8,0

		s4-0.3,4-5.9h19.5c0,0,1.6,5.2,6.2,5.2c1.8,0,4,0,5.9,0c2.9,0,5.3,0,5.3,0c1.9,0,4.1,0,5.9,0c4.6,0,6.2-5.2,6.2-5.2h19.5

		C148.3,364,152.3,364.3,152.3,364.3z"
                  ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M83.9,252.5l-5.5,52.7l11.1,31.3l0.9,1.9v7.4c0,0-1.5,7.2-11.8,7.2s-30.4,0-30.4,0s-9.7,1-12.8-5.9v-9.3l9.3-32.7l-10.9-50.8"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="77.8"
                            y1="305.1"
                            x2="44.7"
                            y2="305.1"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="83.3"
                            y1="319.4"
                            x2="41.4"
                            y2="319.4"
                          ></line>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M33.2,254.7c0,0-6.5,8-6.9,23.3c-0.4,15.4,1.9,26.7,8.6,27.2l9.5,0.9"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M31.3,303.6c0,0-10.8,5.5-10.6,17c0.1,11.5,5,30.6,17.4,30.6"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M143.7,252.5l5.5,52.7l-11.1,31.3l-0.9,1.9v7.4c0,0,1.5,7.2,11.8,7.2s30.4,0,30.4,0s9.7,1,12.8-5.9v-9.3l-9.3-32.7l10.9-50.8"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="182.8"
                            y1="305.1"
                            x2="149.7"
                            y2="305.1"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="144.3"
                            y1="319.4"
                            x2="186.2"
                            y2="319.4"
                          ></line>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M194.3,254.7c0,0,6.5,8,6.9,23.3c0.4,15.4-1.9,26.7-8.6,27.2l-9.5,0.9"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M196.3,303.6c0,0,10.8,5.5,10.6,17c-0.1,11.5-5,30.6-17.4,30.6"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M97.2,252l4,53.5L90.8,338v7.8c0,0,1.8,7.2,9.2,7.2c7.4,0,28.5,0,28.5,0s8.7-1.5,8.7-7.2c0-5.8,0.3-6.6,0.3-6.6l-9.6-32.7

		l3.4-54.1"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="127.4"
                            y1="306"
                            x2="101.8"
                            y2="306"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="131.3"
                            y1="319.1"
                            x2="97.5"
                            y2="319.1"
                          ></line>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M149.2,305.2c0,0-3.4-1.5-9,1.8c-5.6,3.3-10.5,2.8-10.5,2.8"
                          ></path>
                          <path
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            d="

		M79.5,306.7c0,0,3.4-1.5,9,1.8c5.6,3.3,10.5,2.8,10.5,2.8"
                          ></path>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="79.6"
                            y1="353.2"
                            x2="79.6"
                            y2="357.8"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="99.4"
                            y1="353.2"
                            x2="99.4"
                            y2="357.8"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="128.3"
                            y1="353.2"
                            x2="128.3"
                            y2="357.8"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="46.8"
                            y1="353.2"
                            x2="46.8"
                            y2="358"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="148"
                            y1="353.2"
                            x2="148"
                            y2="357.8"
                          ></line>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            x1="181.2"
                            y1="353.2"
                            x2="181.2"
                            y2="358"
                          ></line>
                </g>
              </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="height: 30px">
                <div class="col-12 text-center bg-blue-2 q-mt-xs " v-if="damageDetails.show"   >
                  <div class="text-subtitle1  ">
                    {{damageDetails.DamageTitle}}
                  </div>
                </div>
              </div>
            </div>

          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>

    <!-- İleride row by type olabilir -->
    <div class="col-8  ">
      <div class="row">

        <div class="col-12 q-pl-md ">
          <q-table
            :rows="damagesRow"
            :columns="DamageRowColumns"

            selection="multiple"
            v-model:selected="selectedDamages"
            class="no-box-shadow"
            row-key="id"
            table-header-style="cursor: not-allowed !important;"
            style="background: #f9f9f9 !important;"
            @update:selected="onSelectedDamages"
          >

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th></q-th>
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class=" "
                >
                  {{ col.label }}

                </q-th>
                <q-th></q-th>
              </q-tr>


            </template>

            <template v-slot:body="props">

              <q-tr :props="props" class="text-center" >

                <q-td >
                  <q-checkbox  v-model="props.selected"   color="teal" :disable="!props.row.DamageMaintenanceStatus.includes('Waiting')"/>
                </q-td>
                <q-td>
                  {{props.row.DamageTitle}}
                </q-td>
                <q-td>
                  {{props.row.DamagePrice}}
                </q-td>
                <q-td>
                  {{props.row.DamageDescription.substring(1,20)+"..."}}
                </q-td>
                <q-td class="text-left">
                  <q-badge  :color="   carDamageLevelPointer(props.row.DamageLevel).color" rounded   >

                  </q-badge>
                  {{ carDamageLevelPointer(props.row.DamageLevel).level }}

                </q-td>
                <q-td>
                  {{props.row.DamageCode}}
                </q-td>

                <q-td>
                  <q-chip color="positive" square  text-color="white"    v-if="props.row.DamageMaintenanceStatus === 'Completed'"  >
                    Hasar Kapatıldı.
                  </q-chip>
                  <q-chip color="blue-6" square text-color="white"  v-if="props.row.DamageMaintenanceStatus === 'Processing'">
                    Tamir Ediliyor.
                  </q-chip>
                  <q-chip color="warning" square text-color="dark"  v-if="props.row.DamageMaintenanceStatus === 'Waiting'">
                    Hasar Beklemede.
                  </q-chip>
                </q-td>
                <q-td>

                  <q-btn  flat round color="blue-grey-9"  @click="editDamage(props.row)">
                    <i class="fas fa-edit"></i>
                  </q-btn>

                  <q-btn flat round color="primary" :disable="!props.row.DamageMaintenanceStatus.includes('Waiting')"  @click="removeDamage(props.row.id)" >
                    <i class="fas fa-trash-alt"></i>
                  </q-btn>

                </q-td>
              </q-tr>
            </template>



          </q-table>
        </div>
      </div>
    </div>



    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4" >Yeni Hasar Kaydı</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            class="q-gutter-md"
            @submit="onSubmitNewDamage()"
          >
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Hasar Başlığı</div>
              <q-input
                outlined
                dense
                v-model="damageFormFields.DamageTitle"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                class="col-12"
                hide-bottom-space
              />
            </div>
            <div class="row">
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-10">Onarım Masrafı</div>
                <q-input
                  outlined
                  dense
                  v-model="damageFormFields.damage_price"

                   type="number"
                   placeholder="100.00 TL"

                  class="col-12"
                  hide-bottom-space
                />
              </div>
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-10">Kullanılan Malzeme</div>
                <q-input
                  outlined
                  dense
                  v-model="damageFormFields.damage_material"

                  type="text"
                  placeholder="Dayton Lastik"

                  class="col-12"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Hasar Açıklaması</div>
              <q-input
                outlined
                dense
                v-model="damageFormFields.DamageDescription"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                type="textarea"
                placeholder="Hasar detaylı açıklaması"
                class="col-12"
                hide-bottom-space
              />
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Lütfen Hasar Oranı Seçiniz.</div>
              <div class="q-gutter-sm col-12">
                <q-radio v-model="damageFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="low" label="Düşük" />
                <q-radio v-model="damageFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="medium" label="Orta" />
                <q-radio v-model="damageFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="high" label="Yüksek" />
                <q-radio v-model="damageFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="veryHigh" label="Çok Yüksek" />
              </div>
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Müşteri Seçiniz</div>

              <q-select
                v-model="damageFormFields.customer_id"
                :options="customerOptions"
                :option-label="(items) => items.length !== 0 ? items.Name + ' '+items.Surname : items.Name "
                option-value="id"
                emit-value
                map-options
                use-input
                outlined
                class="col-12"
                dense
                @filter="filterOnCustomersOption"
              />
            </div>
            <div class="text-right"  >

              <q-btn label="Sıfırla" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="Kaydet" type="submit" color="positive"  icon-right="save"   flat/>
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>

    <q-dialog v-model="editModal" persistent>
      <q-card style="min-width: 500px">
        <q-bar class="q-pa-md" style="height: 50px">
          <div class="text-h4" >Yeni Hasar Kaydı</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Kapat</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            class="q-gutter-md"
            @submit="onUpdateDamage()"
          >
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Hasar Başlığı</div>
              <q-input
                outlined
                dense
                v-model="damageEditFormFields.DamageTitle"
                placeholder="Kaportada çızık var"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                class="col-12"
                hide-bottom-space
              />
            </div>
            <div class="row">
              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-10">Onarım Masrafı</div>
                <q-input
                  outlined
                  dense
                  v-model="damageEditFormFields.DamagePrice"
                   type="number"
                  placeholder="100.00 TL"

                  class="col-12"
                  hide-bottom-space
                />
              </div>

              <div class="col-6 q-pa-xs">
                <div class="text-subtitle2 text-grey-10">Kullanılan Malzeme</div>
                <q-input
                  outlined
                  dense
                  v-model="damageEditFormFields.DamageMaterials"
                   type="text"
                  placeholder="Dayton Lastik"

                  class="col-12"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Hasar Açıklaması</div>
              <q-input
                outlined
                dense
                v-model="damageEditFormFields.DamageDescription"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Zorunlu alan']"
                type="textarea"
                placeholder="Hasar detaylı açıklaması"
                class="col-12"
                hide-bottom-space
              />
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Lütfen Hasar Oranı Seçiniz.</div>
              <div class="q-gutter-sm col-12">
                <q-radio v-model="damageEditFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="low" label="Düşük" />
                <q-radio v-model="damageEditFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="medium" label="Orta" />
                <q-radio v-model="damageEditFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="high" label="Yüksek" />
                <q-radio v-model="damageEditFormFields.DamageLevel" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="veryHigh" label="Çok Yüksek" />
              </div>
            </div>
            <div class="row">
              <div class="text-subtitle2 text-grey-10">Müşteri Seçiniz</div>


              <q-select
                v-model="damageEditFormFields.customer_id"
                :options="customerOptions"
                :option-label="(items) => items ? items.Name + ' '+items.Surname : items.Name "
                option-value="id"
                emit-value
                map-options
                use-input
                outlined
                class="col-12"
                dense
                @filter="filterOnCustomersOption"
              />
            </div>
            <div class="text-right"  >

              <q-btn label="Güncelle" type="submit" color="blue-grey-8"  icon-right="save"   :disable="!damageEditFormFields.DamageMaintenanceStatus.includes('Waiting')"  />
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import DamageRowColumns from "components/Damages/CarDamagesRowColumns";
import {useStore} from "vuex";

export default {
  name: "CarDamages",
  props : {
    carId : {
      required : true,
      type : Number
    }
  },
  setup() {
    const $store = useStore();
    const customers = computed(() => {
      return JSON.parse(JSON.stringify($store.getters['CustomersModule/getRecords']))
    })
    const customerOptions = ref(customers.value)
    const selectedDamages = ref([])
    return {
      selectedDamages,
      damageTab: ref('exterior'),
      DamageRowColumns,
      carDamageLevelPointer(level) {
        switch (level) {
          case 'low' :
            return {
              color: 'orange',
              level: 'Az'
            }
          case 'medium' :
            return {
              color: 'deep-orange',
              level: 'Orta'
            }
          case 'high' :
            return {
              color: 'red',
              level: 'Yüksek'
            }
          case 'veryHigh' :
            return  {
              color: 'negative',
              level: 'Çok Yüksek'
            }
          default :
            return  {
              color: 'negative',
              level: 'Çok Yüksek'
            }
        }
      },
      showModal:ref(false),
      editModal : ref(false),
      damageFormFields : ref( {
        DamageTitle : ref(''),
        DamageDescription:ref(''),
        DamageLevel:ref('low'),
        damageSvgCode : ref(''),
        customer_id : ref(''),
        damage_price : ref(''),
        damage_material : ref('')
      }),
      damageEditFormFields : ref({
        id : ref(''),
        DamageTitle : ref(''),
        DamageDescription:ref(''),
        DamageLevel:ref(''),
        DamageSvgCode : ref(''),
        customer_id : ref(''),
        DamageMaintenanceStatus : ref(),
        cars_id : ref(''),
        DamagePrice : ref(''),
        DamageMaterials : ref('')
      }),
      damageDetails : ref({
        show:ref(false),
        DamageTitle : ''
      }),
      customerOptions,
      filterOnCustomersOption (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          customerOptions.value =  customers.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
        })
      },
    }
  },
  computed: {
    damagesRow() {
      return this.$store.getters['CarDamagesModule/carDamage']
    }
  },
  methods : {
    onClickNewDamage(event) {
      this.showModal = true
      this.damageFormFields.damageSvgCode = event.target.getAttribute('data-id');
    },
    onSubmitNewDamage() {
      let formData = new FormData();
      formData.append('DamageCode', this.damageFormFields.damageSvgCode)
      formData.append('DamageLevel',this.damageFormFields.DamageLevel)
      formData.append('DamageTitle',this.damageFormFields.DamageTitle)
      formData.append('DamageDescription',this.damageFormFields.DamageDescription)
      formData.append('customer_id',this.damageFormFields.customer_id)
      formData.append('DamagePrice',this.damageFormFields.damage_price)
      formData.append('DamageMaterials',this.damageFormFields.damage_material)
      formData.append('DamageMaintenanceStatus','Waiting')
      formData.append('cars_id',this.carId)
      this.$store.dispatch('CarDamagesModule/create',formData).then(res => {
        if (res === true)
        {
          this.showModal = false
          this.resetCarDamageFields()
        }
      })

    },
    editDamage(damage) {
      let item = JSON.parse(JSON.stringify(damage))
      item.customer_id = parseInt(item.customer_id)
      this.damageEditFormFields =item
      this.editModal = true
    },
    onUpdateDamage() {
    let formData = new FormData();
     for (const [k,v] of Object.entries(this.damageEditFormFields)) {
       formData.append(k,v)
     }
      formData.append('_method','PUT');
      this.$store.dispatch('CarDamagesModule/update',formData).then(res => {
        this.onReset()
        this.editModal = false
      })
    },
    removeDamage(damageId) {

      this.damagesRow = this.damagesRow.filter(e => {
        return +e.id !== +damageId
      })

    },
    onOverSvg(event) {
      this.damageDetails.show = true
      this.damageDetails.DamageTitle = event.target.getAttribute('data-id') //+' / '+event.target.getAttribute('data-description')
    },
    OnOutSvg() {
      this.damageDetails.show = false
      this.damageDetails.DamageTitle = ''
    },
    resetCarDamageFields() {
      this.damageFormFields.DamageTitle = ''
      this.damageFormFields.DamageDescription = ''
      this.damageFormFields.DamageLevel = 'low'
      this.damageFormFields.damageSvgCode = ''
      this.damageFormFields.customer_id  = ''
    },
    onReset(){
      this.damageEditFormFields = ''
    },
    onSelectedDamages() {
      console.log(this.selectedDamages)
     this.$emit('selected-damages', JSON.parse(JSON.stringify(this.selectedDamages)))
    }
  },
  mounted() {
    this.$store.dispatch('CarDamagesModule/getWithCarId',this.carId)
    this.$store.dispatch('CustomersModule/get')
  }
}
</script>


<style scoped>


.damages {
  position: relative;
}
.damages table {
  width: 100%;
}
.damages .tabs__head {
  padding-left: 0;
  padding-right: 0;
  margin-left: 330px;
}
@media screen and (max-width: 991px) {
  .damages .tabs__head {
    margin-left: 0;
  }
}
.damages .tabs__head .tab {
  height: 60px;
}
.damages .tabs__title {
  position: absolute;
  top: 22px;
  left: 0;
}
@media screen and (max-width: 991px) {
  .damages .tabs__title {
    position: static;
  }
}
.damages .tabs__content {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
.damage {
  display: flex;
  min-width: 0;
}
@media screen and (max-width: 991px) {
  .damage {
    display: block;
  }
}
.damage__left {
  flex-shrink: 0;
  padding-top: 21px;
  padding-right: 45px;
  max-width: 320px;
  width: 100%;
  margin: auto;
}
@media screen and (max-width: 991px) {
  .damage__left {
    padding-left: 15px;
    padding-right: 15px;
  }
}
@media screen and (max-width: 575px) {
  .damage__left {
    padding-left: 0;
    padding-right: 0;
  }
}
.damage__right {
  flex-grow: 1;
}
.damage__info {
  max-height: 450px;
  position: relative;
}
.damage__info table {
  margin-top: 21px;
  table-layout: fixed;
}
.damage__view {
  /*width: 275px;*/
  height: 340px;
  padding: 10px;
  position: relative;
  overflow: hidden;
}
@media screen and (max-width: 991px) {
  .damage__view {
    margin: auto;
  }
}
@media screen and (max-width: 575px) {
  .damage__view {
    width: 250px;
  }
}
.damage__view .svg-place {
  width: 100%;
  height: 100%;
}
.damage__view:hover .damage__help {
  transform: translateY(150%);
}
.damage__view svg {
  width: 100%;
  height: 100%;
}
.damage__view .inactive {
  fill: none !important;
  pointer-events: none !important;
}
.damage__view .inactive.filled {
  fill: #adabc1 !important;
}
.damage__view--exterior circle,
.damage__view--exterior ellipse,
.damage__view--exterior line,
.damage__view--exterior path,
.damage__view--exterior polygon,
.damage__view--exterior polyline,
.damage__view--exterior rect {
  stroke: #adabc1;
  cursor: pointer;
  fill: #fff;
}
.damage__view--exterior circle:hover,
.damage__view--exterior ellipse:hover,
.damage__view--exterior line:hover,
.damage__view--exterior path:hover,
.damage__view--exterior polygon:hover,
.damage__view--exterior polyline:hover,
.damage__view--exterior rect:hover {
  fill: rgba(111, 191, 31, 0.7);
}
.damage__view--exterior .filled {
  fill: #adabc1;
  stroke: none;
}
.damage__view--exterior line {
  pointer-events: none;
}
.damage__view--interior circle,
.damage__view--interior ellipse,
.damage__view--interior line,
.damage__view--interior path,
.damage__view--interior polygon,
.damage__view--interior polyline,
.damage__view--interior rect {
  cursor: pointer;
}
.damage__view--interior circle.color1,
.damage__view--interior ellipse.color1,
.damage__view--interior line.color1,
.damage__view--interior path.color1,
.damage__view--interior polygon.color1,
.damage__view--interior polyline.color1,
.damage__view--interior rect.color1 {
  fill: #899198;
}
.damage__view--interior circle.color2,
.damage__view--interior ellipse.color2,
.damage__view--interior line.color2,
.damage__view--interior path.color2,
.damage__view--interior polygon.color2,
.damage__view--interior polyline.color2,
.damage__view--interior rect.color2 {
  fill: #a4afba;
}
.damage__view--interior circle:hover,
.damage__view--interior ellipse:hover,
.damage__view--interior line:hover,
.damage__view--interior path:hover,
.damage__view--interior polygon:hover,
.damage__view--interior polyline:hover,
.damage__view--interior rect:hover {
  fill: rgba(111, 191, 31, 0.7);
}
</style>
