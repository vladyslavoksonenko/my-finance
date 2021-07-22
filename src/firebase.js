import firebase from "firebase";

import {ref, onUnmounted, computed} from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyDcUIkydrkmTxDZFdDB3rDK2AW3YZQtF6M",
  authDomain: "my-finance-f5194.firebaseapp.com",
  databaseURL: "https://my-finance-f5194-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-finance-f5194",
  storageBucket: "my-finance-f5194.appspot.com",
  messagingSenderId: "331815896115",
  appId: "1:331815896115:web:2cc974762d57bd5b354f46",
  measurementId: "G-1CH84V1LH7"
})

const auth = firebase.auth()


export function useAuth () {

  const user = ref(null)
  const userData = ref(null)

  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)

  const isLogin = computed(() => user.value !== null)

  const signIn = async (email, password) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      user.value = result
      return result
    } catch (error) {
      return error
    }
  }

  const signOut = () => auth.signOut()

  const signUp = async (name, email, password) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password)
      user.value = await result.user

      await firebase.database().ref(`users/${user.value.uid}/info`).set({
        id: user.value.uid,
        name: name,
        email: email,
        bill: 0
      })
      return result
    } catch (error) {
      return error
    }
  }

  const getUid = async  () => {
    const user = await auth.currentUser
    return user ? user.uid : null
  }

  const getUserData = async () => {
    const uid = await getUid()
    const userDataV = await firebase.database().ref(`/users/${uid}/info/`).once('value')
    const resultUserData = await userDataV.val()
    userData.value = resultUserData
    return resultUserData
  }

  const getUser = computed(() => userData.value)

  return { user, isLogin, signIn, signOut, signUp, getUid, getUserData, userData, getUser}
}


