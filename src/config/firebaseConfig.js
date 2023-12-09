import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDVB1TlnTW510qadUbjSoMw-d9V11PVPoI",
  authDomain: "elderly-care-mobile-app.firebaseapp.com",
  databaseURL: "https://elderly-care-mobile-app-default-rtdb.firebaseio.com",
  projectId: "elderly-care-mobile-app",
  storageBucket: "elderly-care-mobile-app.appspot.com",
  messagingSenderId: "751038014369",
  appId: "1:751038014369:web:c00d7da07398e729cca1e0",
  measurementId: "G-9RGEXC9QP6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;