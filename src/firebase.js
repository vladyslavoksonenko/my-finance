import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';

import { ref, onUnmounted, computed } from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyDcUIkydrkmTxDZFdDB3rDK2AW3YZQtF6M",
  authDomain: "my-finance-f5194.firebaseapp.com",
  projectId: "my-finance-f5194",
  storageBucket: "my-finance-f5194.appspot.com",
  messagingSenderId: "331815896115",
  appId: "1:331815896115:web:2cc974762d57bd5b354f46",
  measurementId: "G-1CH84V1LH7"
})

const auth = firebase.auth()

export function useAuth () {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      return error
    }
  }

  const signOut = () => auth.signOut()

  const signUp = async (name, email, password) => {
    try {
      return await auth.createUserWithEmailAndPassword(email, password)

    } catch (error) {
      return error
    }
  }

  return { user, isLogin, signIn, signOut, signUp }
}
