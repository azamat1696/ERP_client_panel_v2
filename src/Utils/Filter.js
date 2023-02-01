export default function (stack,searchKey,searchKeyValue) {
  let data;
  for (let itemKey of Object.keys(stack)) {
    if (itemKey === stack[searchKey])  {
      data.push(stack[searchKey])
    }
  }
}
