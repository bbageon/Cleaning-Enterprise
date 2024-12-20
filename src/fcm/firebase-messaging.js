// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/messaging';
import { cookie } from '../util';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FCM_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

console.log(process.env.REACT_APP_FCM_VAPID_KEY)

const requestPermission = () => {
    Notification.requestPermission()
        .then(async (permission) => {
            if (permission === 'granted') {
                try {
                    const token = await messaging.getToken({ vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
                    console.log(token);
                    cookie.setCookie('fcm-token', token);
                } catch (err) {
                    console.log(`getToken Error ${err}`);
                }
            } else if (permission === 'denied') {
                console.log('block permission');
            }
        })
}

export {
    messaging,
    requestPermission,
};