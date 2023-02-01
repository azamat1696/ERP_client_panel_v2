import {Notify} from "quasar";

export function SuccessHandlePrint (type,operation,timeout=1000,position='top-right') {

  timeout += 500
  Notify.create({
    type:type,
    message: message(operation),
    timeout:timeout,
    position:position,
    progress:true
  })
}
function message(status) {

  let msg = '';
   switch (status) {
     case 'created':
      msg = 'Başarıyla Kaydedildi .!'
     break
     case 'updated':
       msg = 'Kayıt Başarıyla Güncellendi .!'
     break
     case 'deleted':
       msg = 'Kayıt Başarıyla Silindi .!'
     break
     case 'searched':
       msg = 'Kayıt Başarıyla Filtireledi .!'
       break
     case 'sendMail':
       msg = 'Mail Başarıyla Gönderildi.'
       break
   }
   return msg;
}
