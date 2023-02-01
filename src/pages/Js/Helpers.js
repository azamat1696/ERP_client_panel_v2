 export function dateFormat(date) {
   const curDate = new Date(date);
   const curDay = (curDate.getDate().toString().length === 1) ? "0"+curDate.getDate() : curDate.getDate();
   const curMonth = ((curDate.getMonth()+1).toString().length === 1) ? "0"+(curDate.getMonth()+1) : (curDate.getMonth()+1);
   const curHours = (curDate.getHours() !== 0) ? " - "+ curDate.getHours() +" : " : '';
   const curMinutes = (curDate.getMinutes() !== 0) ? curDate.getMinutes() : '';

   return curDay+"."+curMonth+"."+ curDate.getFullYear() + curHours + curMinutes;
 }
