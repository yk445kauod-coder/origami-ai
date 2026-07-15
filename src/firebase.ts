import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  push, 
  set, 
  onChildAdded, 
  onChildChanged, 
  onChildRemoved, 
  onValue,
  serverTimestamp,
  update,
  remove,
} from 'firebase/database';
import type { Database } from 'firebase/database';

// Firebase configuration - same as reference app for compatibility
const firebaseConfig = {
  apiKey: "AIzaSyDdH9l46XTcqoy2-k15QG4MmqSo1CHp1Yc",
  authDomain: "my-result-db.firebaseapp.com",
  databaseURL: "https://my-result-db-default-rtdb.firebaseio.com",
  projectId: "my-result-db",
  storageBucket: "my-result-db.firebasestorage.app",
  messagingSenderId: "916398855365",
  appId: "1:916398855365:web:d0e6c379bdad48c8b24cac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Database = getDatabase(app);

// Database paths
export const CHAT_PATH = 'egytronic_chat_v2';
export const TYPING_PATH = 'egytronic_typing';

export { auth, db, signInAnonymously, onAuthStateChanged };
export { ref, push, set, onChildAdded, onChildChanged, onChildRemoved, onValue, serverTimestamp, update, remove };
