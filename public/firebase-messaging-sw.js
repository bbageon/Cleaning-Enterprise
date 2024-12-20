// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDzNOx84tx21x2oNV4AvOg5NI43FwKkm3E',
    projectId: 'fcm-test-a6b38',
    messagingSenderId: '26071289851',
    appId: '1:26071289851:web:ba48ef3b44211173b4855e',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const backgroundMessaging = firebaseApp.messaging();

backgroundMessaging.onBackgroundMessage((payload) => {
    console.log('Received background message', payload);

    const notificationTitle = payload?.data?.sender;
    const notificationOptions = {
        body: payload?.data?.message,
        data: { url: payload?.data?.url || '/chatroom' },
    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // 알림 닫기

    const url = event.notification.data?.url || '/'; // 클릭 시 이동할 URL
    const origin = self.location.origin;

    event.waitUntil(
        // 이미 열린 클라이언트(탭)를 확인
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // 열린 탭 중에서 동일한 URL을 가진 탭을 찾기
            for (const client of clientList) {
                // client.url을 origin과 결합하여 URL을 정확히 비교
                if (client.url === origin + url) {
                    return client.focus(); // 해당 탭을 활성화
                }
            }

            // 동일한 URL을 가진 탭이 없다면 새 창을 열기
            if (clients.openWindow) {
                return clients.openWindow(url); // 새 탭에서 URL 열기
            }
        })
    );
});