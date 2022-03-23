
import firebase from 'firebase/app'
import 'firebase/firestore'




  const firebaseConfig = {
    apiKey: "AIzaSyAtboc-_e5zaq5sVgekUt14f6Ib3Zp9-Z0",
    authDomain: "movies-a88e9.firebaseapp.com",
    projectId: "movies-a88e9",
    storageBucket: "movies-a88e9.appspot.com",
    messagingSenderId: "689185259201",
    appId: "1:689185259201:web:9adbba20c5f4d3de889e40"

};

  firebase.initializeApp(firebaseConfig);


  export default firebase;