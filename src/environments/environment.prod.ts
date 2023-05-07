export const environment = {
  firebase: {
    projectId: 'webfejl2023-szerviz-erik',
    appId: '1:907017916479:web:dcd14a1900a13c7edb288a',
    databaseURL: 'https://webfejl2023-szerviz-erik-default-rtdb.firebaseio.com',
    storageBucket: 'webfejl2023-szerviz-erik.appspot.com',
    apiKey: 'AIzaSyDgietfcC0ESokH2KTsZ9GyCGqUymq4loU',
    authDomain: 'webfejl2023-szerviz-erik.firebaseapp.com',
    messagingSenderId: '907017916479',
  },
      production: true,
      shopName: 'Erik Repair',
      onGuardFailRedirect: '/welcome',
    invalidEmailErrorSignal: 'validate/email',
    invalidPasswordErrorSignal: 'validate/password',
    passwordMatchErrorSignal: 'validate/password-match',
    passwordChangeSuccessSignal: 'profile/password-change',
    passwordChangeFailedSignal: 'profile/password-change-failed',
    passwordChangeBadOldPasswordSignal: 'profile/password-change-failed-bad-old-password',
    addressChangeSuccessSignal: 'profile/address-change-success',
    addressChangeFailedSignal: 'profile/address-change-failed',
    appointmentCreationSuccessSignal: 'booking/creation-success',
    appointmentCreationFailedSignal: 'booking/creation-failed'
  }