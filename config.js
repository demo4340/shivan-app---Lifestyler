import firebase from 'firebase';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBZZ5Yfm_rHg408vk2w0If8S_gf44gIqbM',
  authDomain: 'lifestyler-2e43a.firebaseapp.com',
  projectId: 'lifestyler-2e43a',
  storageBucket: 'lifestyler-2e43a.appspot.com',
  messagingSenderId: '754252579999',
  appId: '1:754252579999:web:7dc3c6f9c97110e0228eaa',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  

export default firebase.firestore();     