export function setInvoice (state,payload) {
  state.Invoices = payload
}

export function changeInvoiceNoAtReport(state,updateFields)
{
  state.Invoices.forEach(function(el,i)  {
    if (+el.id === +updateFields.id)
      state.Invoices[i].InvoiceNo  = updateFields.InvoiceNo;
  })
}

export function changeReceiptNoAtReport(state,updateFields)
{
  state.Invoices.forEach(function(el,i)  {
    if (+el.id === +updateFields.id)
      state.Invoices[i].ReceiptCollectionNo = updateFields.ReceiptCollectionNo;
  })
}

export function changeReservationNo(state,updateFields)
{
  state.Invoices.forEach(function(el,i)  {
    if (+el.id === +updateFields.reservation_id)
      state.Invoices[i].ReservationNo = updateFields.ReservationNo;
  })
}
