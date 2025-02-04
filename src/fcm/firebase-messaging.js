// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import 'firebase/messaging';
// import { cookie } from '../util';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FCM_API_KEY,
//     authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FCM_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FCM_APP_ID,
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// console.log(process.env.REACT_APP_FCM_VAPID_KEY)

// const requestPermission = () => {
//     Notification.requestPermission()
//         .then(async (permission) => {
//             if (permission === 'granted') {
//                 try {
//                     const token = await messaging.getToken({ vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
//                     console.log(token);
//                     cookie.setCookie('fcm-token', token);
//                 } catch (err) {
//                     console.log(`getToken Error ${err}`);
//                 }
//             } else if (permission === 'denied') {
//                 console.log('block permission');
//             }
//         })
// }

// export {
//     messaging,
//     requestPermission,
// };

// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/messaging';
import { cookie } from '../util';

// Firebase 설정 정보
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FCM_APP_ID,
};

// Firebase 초기화 (중복 방지)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firebase Messaging 객체 생성
let messaging = null;

// FCM 지원 여부 확인 (iOS Safari 차단 제거)
if (typeof window !== "undefined" && 'Notification' in window) {
    if (window.location.protocol === "https:" || window.location.hostname === "localhost") {
        messaging = firebase.messaging();
        console.log("Firebase Messaging 초기화 완료 ✅");
    } else {
        console.warn("FCM은 HTTPS 환경에서만 동작합니다. (현재 프로토콜: " + window.location.protocol + ")");
    }
} else {
    console.warn("이 브라우저에서는 FCM을 사용할 수 없습니다.");
}

// VAPID 키 확인
console.log("VAPID Key:", process.env.REACT_APP_FCM_VAPID_KEY);

// 푸시 알림 권한 요청 및 토큰 발급
const requestPermission = async () => {
    if (!messaging) {
        console.log("Firebase Messaging이 지원되지 않는 환경입니다.");
        return;
    }

    try {
        console.log("알림 권한 요청 중...");
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log("알림 권한이 허용됨 ✅");

            // VAPID 키 확인
            const vapidKey = process.env.REACT_APP_FCM_VAPID_KEY;
            if (!vapidKey) {
                console.error("VAPID 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
                return;
            }

            // Firebase Messaging 토큰 요청
            const token = await messaging.getToken({ vapidKey });
            console.log("FCM Token 발급 완료:", token);

            // 토큰을 쿠키에 저장
            cookie.setCookie('fcm-token', token);
        } else if (permission === 'denied') {
            console.warn("알림 권한이 거부됨 ❌");
        } else {
            console.warn("알림 권한이 설정되지 않음 (사용자가 아직 결정하지 않음) ⚠️");
        }
    } catch (err) {
        console.error("FCM 토큰 가져오기 오류:", err);
    }
};

// Firebase Messaging을 사용할 수 있는지 확인하는 함수 (테스트용)
const isMessagingAvailable = () => {
    return messaging !== null;
};

// requestPermission 함수와 messaging 객체를 export
export {
    messaging,
    requestPermission,
    isMessagingAvailable
};
