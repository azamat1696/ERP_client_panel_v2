/*
export function someMutation (state) {
}
*/
export function setterReservationReports(state,payload) {
  state.reservationReports = payload.rows
  state.reservationReportsCopy = payload.rows
  state.currencyRates = payload.currencies[0]
  state.canvas.dataRangesTitle = []
  state.canvas.dataRanges = []
  payload.canvas.forEach(e => {
     state.canvas.dataRangesTitle.push(e.GroupName)
     state.canvas.dataRanges.push(+e.count)
  })
}
export function setterEmptyReservationReports(state) {
  state.reservationReports = []
  state.currencyRates = []
  state.canvas.dataRangesTitle = []
  state.canvas.dataRanges = []

}
export function setterCarReports(state,payload) {
  state.carReports = payload.rows
  //state.currencyRates = payload.currencies[0]

  // state.canvas.dataRangesTitle = []
  // state.canvas.dataRanges = []
  // payload.canvas.forEach(e => {
  //   state.canvas.dataRangesTitle.push(e.GroupName)
  //   state.canvas.dataRanges.push(+e.count)
  // })
}
export function setterDamageReports(state,payload) {
   state.damageReports = payload.rows
   state.totalDamagePrice = payload.canvas
}

export function setterReservationReportByFilter(state,payload) {
  state.reservationReports = payload
}
