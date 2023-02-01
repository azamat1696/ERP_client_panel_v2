
export function setInvoiceSales (state,payload) {
  state.InvoiceSales = payload
}
export function pushInvoiceSales (state,invoiceSales) {
  state.InvoiceSales.push(invoiceSales)
}
export function changeInvoiceSales(state,updateFields)
{
  state.InvoiceSales.forEach(function(el,i)  {
    if (+el.id === +updateFields.id)
      state.InvoiceSales[i] = updateFields;
  })
}
