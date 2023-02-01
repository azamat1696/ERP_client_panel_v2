/*
export function someMutation (state) {
}
*/

export function setFindCar(state,car) {
  state.FindCar = car
}
export function unsetFindCar(state) {
  state.FindCar = null
}
export function setNewInspection(state,inspection)  {
  const testFind = state.Inspections.find(e => e.LicencePlate === inspection.LicencePlate)
  if (testFind) {
    for (let i = 0; i < state.Inspections.length; i++)
    {
      if (state.Inspections[i].LicencePlate === inspection.LicencePlate)
      {
        state.Inspections.splice(i,1);
        break;
      }
    }
  }
  state.Inspections.push(inspection)
}

export function setUpdatedInspection(state,item)  {
    state.Inspections.forEach(function (el,i) {
      if(el.id === item.id){
        state.Inspections[i] = item
      }
    })
}

export function setInspections(state,inspections)
{
  state.Inspections = inspections
}
