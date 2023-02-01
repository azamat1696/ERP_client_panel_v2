 import {api} from "boot/axios";
 import {Notify} from "quasar";
 const url = 'auth';
 const state = {
   panelAuthToken  : "",
   userDetail : {},
   notifications : []
}
const mutations = {
   setToken(state,token) {
     state.panelAuthToken = token;
   },
  setUserDetail(state,userDetail) {
    state.userDetail = userDetail
  },
  clearToken(state) {
     state.panelAuthToken = '';
     state.userDetail = {};

  },
  setNotifications(state,notifications) {
    state.notifications = notifications
  },
  setMarkNotifications(state,notificationID) {
    for(let i=0; i < state.notifications.length; i++ )
    {
      if(state.notifications[i].id === notificationID)
      {
        state.notifications.splice(i,1)
        break;
      }
    }
  },

}
const actions = {
  login({commit,dispatch},payload) {
    let loginData = new FormData();
    loginData.append('email',payload.email);
    loginData.append('password',payload.password);

   return  api.post('auth-login',loginData).then(res => {
      // WHEN SUCCESSFULLY
      api.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token;
      commit('setToken',res.data.token);
      commit('setUserDetail',res.data.userDetail);

      localStorage.setItem('panelAuthToken',res.data.token);
      localStorage.setItem('userDetail',JSON.stringify(res.data.userDetail));


      // const  time = new Date().getTime();
      // localStorage.setItem('expirationDate', time  + res.data.expiresIn*1000000 );
      //
      // dispatch('setTimeoutTimer',res.data.expiresIn);

      Notify.create({
        color : 'positive',
        position : 'top-right',
        progress : true,
        timeout : 1000,
        message : 'Giriş Başarılı',
        icon : 'done'
      });

      this.$router.push(('/')).catch(er => {
        console.log("Error On login:======>",er)
      })
    }).catch(er => {
      console.log(er.message)
      Notify.create({
        color : 'negative',
        position : 'center',
        progress : true,
        timeout : 1500,
        message : 'Sistem Hatası : '+er.message,
        icon : 'done'
      })
    }).finally(fi => {
      console.log("Finally----")
    })
  },
  logOut({commit}) {
    commit('clearToken');
    localStorage.removeItem('panelAuthToken');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('expirationDate');
    this.$router.replace('/auth/login').catch((er) => {
      console.log(er)});
  },
  setTimeoutTimer({dispatch},expiresIn) {
    setTimeout(() => {
      dispatch('logOut')
    },expiresIn)
  },
  notifications({commit}){
    api.get('notifications').then(res => {

      commit('setNotifications',res.data)
    }).catch(er =>{
      console.log("Error",er)
    })
  },
  markNotification({commit},payload){
    api.post('mark-notifications',payload).then(res => {
      console.log("Gelen Notifyes",res.data)
      commit('setMarkNotifications',payload.get('id'))
    }).catch(er =>{
      console.log("Error",er)
    })
  },
  initAuth({commit,dispatch}) {

    let token = localStorage.getItem('panelAuthToken');
    if (token)
    {
        commit('setToken',token);
        this.$router.go(1)
        commit('setUserDetail',JSON.parse(localStorage.getItem('userDetail')))
    }else {
      this.$router.push('/auth/login').catch((er) => {
        console.log(er)});
      return false
    }


    // let token = localStorage.getItem('panelAuthToken');
    // if (token)
    // {
    //   let expirationDate = localStorage.getItem('expirationDate')
    //
    //   let time = new Date().getTime();
    //   if (time >= +expirationDate) {
    //     console.log('Token time expired, logouted,========|')
    //     dispatch('logOut')
    //   } else {
    //     commit('setToken',token);
    //     let timerSecond = +expirationDate - time;
    //     dispatch('setTimeoutTimer',timerSecond);
    //     console.log("Buradaa setTimoutTimer")
    //     this.$router.go(1)
    //     commit('setUserDetail',JSON.parse(localStorage.getItem('userDetail')))
    //     // this.$router.push('/').catch((er) => {
    //     //   console.log(er)})
    //   }
    // }else {
    //   this.$router.push('/auth/login').catch((er) => {
    //     console.log(er)});
    //   return false
    // }



  }
}

const getters = {

  userDetailGetter : (state) => {
    return state.userDetail
  },
  getterUserNotifications : (state) => {
    return state.notifications
  },
  getterUserNotificationCount : (state) => {
    return state.notifications.length
  }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}
