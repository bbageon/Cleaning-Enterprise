// FCM
// import '../fcm/firebase-messaging';
import { requestPermission } from '../fcm/firebase-messaging';

import Router from '../routes';

requestPermission();

const App = () => {
    return (
        <Router />
    )
}

export default App;