import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAf04A9Q_HR8XfQKlzGRMaL6_h6gqR6ZVA",
  authDomain: "pra186pushnotificationpoc.firebaseapp.com",
  projectId: "pra186pushnotificationpoc",
  storageBucket: "pra186pushnotificationpoc.appspot.com",
  messagingSenderId: "400081599080",
  appId: "1:400081599080:web:54224e03849da56898d9dd",
  measurementId: "G-QBV9JQ6M2K"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BJTYfbm7o5KAoxdAYlXzYODoaVavx0VREBlCh-CkrrAGDlmo-OAfFY9z_DFV7P5joPevAKlFBuUMpBJZTrhh8CM'})
    .then((currentToken) => {
            if (currentToken) {
            console.log('Show token for client: ', currentToken);
            setTokenFound(true);
            } else {
            console.log('No token available. Request again.');
            setTokenFound(false);
            }
        })
    .catch((err) => {
    console.log('Error. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});