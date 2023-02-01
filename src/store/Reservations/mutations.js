export function setLastReservation(state,reservations)
{
  state.CurrentReservations = reservations
  state.CurrentReservationsCopy = reservations
  state.CurrentReservationCount = reservations.filter(e => e.ReservationStatus === 'Continues').length
  state.ReturnReservations = reservations.filter(e => isTodayReturn(e.EndDateTime))
}

export function setReservationsByFilter(state,payload) {
  state.CurrentReservations = payload
}
export function setOldReservation(state,reservations)
{
  state.OldReservations = reservations
}


export function replaceReservation(state,newReservation)
{
  //state.CurrentReservations.push(newReservation)
   state.CurrentReservations.forEach(function(el,i)  {
     if (+el.id === +newReservation.id)
       state.CurrentReservations[i] = newReservation;
   })
}

export function changeInvoiceNo(state,updateFields)
{
  console.log('sasasas',updateFields)
  state.CurrentReservations.forEach(function(el,i)  {
    if (+el.id === +updateFields.id)
      state.CurrentReservations[i]  = updateFields;
  })
}

export function changeReceiptNo(state,updateFields)
{
  state.CurrentReservations.forEach(function(el,i)  {
    if (+el.id === +updateFields.id)
      state.CurrentReservations[i] = updateFields;
  })
}

export function changeReservationNo(state,updateFields)
{
  state.CurrentReservations.forEach(function(el,i)  {
    if (+el.id === +updateFields.reservation_id)
      state.CurrentReservations[i].ReservationNo = updateFields.ReservationNo;
  })
}


const isTodayReturn = (someDate) => {
  const endDate = new Date(someDate)
  const today = new Date()
  return   endDate.getDate() === today.getDate() &&
    endDate.getMonth() === today.getMonth() &&
    endDate.getFullYear() === today.getFullYear()
}

export function increment(state,data) {
      state.Increment = data
}
