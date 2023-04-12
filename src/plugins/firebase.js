import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCJCPiLJI_Z22XPE6z5Lt-kkm8Pe_9bVG8',
  authDomain: 'js-hiroba.firebaseapp.com',
  projectId: 'js-hiroba',
  storageBucket: 'js-hiroba.appspot.com',
  messagingSenderId: '221494043726',
  appId: '1:221494043726:web:ea25e09f171d3769984f1f',
  measurementId: 'G-XTRC17KCB5',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
