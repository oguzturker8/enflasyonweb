import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCXDaIF5mhd1PABfCZnPyMkWHwGXfIPXlg",
  authDomain: "enflasyon-13bde.firebaseapp.com",
  databaseURL: "https://enflasyon-13bde.firebaseio.com",
  projectId: "enflasyon-13bde",
  storageBucket: "enflasyon-13bde.appspot.com",
  messagingSenderId: "158455122509",
  appId: "1:158455122509:web:fb4fe1540db13413226a04",
  measurementId: "G-701YMSNX77",
};

const fire = firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
