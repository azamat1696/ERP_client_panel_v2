/*
export function someGetter (state) {
}
*/
export function currentReservationsGetter(state)
{
  return state.CurrentReservations
}
export function oldReservationsGetter(state)
{
  return state.OldReservations
}
export function currentReservationCountGetter(state)
{
  return state.CurrentReservationCount
}
export function currentReturnReservationGetter(state) {
  return state.ReturnReservations
}
export function currentReturnReservationCountGetter(state) {
  return state.ReturnReservations.length
}
export function  currentReservationCopiesGetter(state) {
  return state.CurrentReservationsCopy
}
export function incrementGetters(state){
  return state.Increment
}
