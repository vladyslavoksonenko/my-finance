import firebase from "firebase";

import {ref, onUnmounted, computed, onMounted} from "vue";

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



export const useAuth = () => {

  const user = ref(null)
  const userData = ref(null)

  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)

  const isLogin = computed(() => user.value !== null)

  // Login
  const signIn = async (email, password) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      user.value = result
      return result
    } catch (error) {
      return error
    }
  }

  // Log out
  const signOut = () => auth.signOut()

    // register
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


  const fetchUserData = async () => {
    const uid = await getUid()
    const userDataV = await firebase.database().ref(`/users/${uid}/info/`).once('value')
    const resultUserData = await userDataV.val()
    userData.value = resultUserData
    return resultUserData
  }


  return { user, isLogin, signIn, signOut, signUp, getUid, fetchUserData, userData}
}

// Получаю ID

const getUid = async  () => {
  const user = await auth.currentUser
  return user ? user.uid : null
}

// Получаю Инфу из БД про Юзера

export const getUserData = () => {

  const userInfo = ref(null)

  const fetching = async () => {
    try {
      const uid = await getUid()
      const response = await firebase.database().ref(`/users/${uid}/info/`).once('value')
      const responseData = await response.val()

      userInfo.value = await responseData

    } catch (e) {
      alert("Error:")
    }
  }
  onMounted(fetching)

  return { userInfo, fetching }
}

export const createCategory = async (title, limit) => {
  try {
    const uid = await getUid()
    const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
    return { title, limit, id: category.key }
  } catch (e) {
    alert(e)
    throw e
  }
}

export const getCategories = async () => {
  try {
    const uid = await getUid()
    const categories = await ((await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()) || {}

    return Object.keys(categories).map(key => ({...categories[key], id: key}))
      // Одно и тоже (не забывай про спред)
    // const resultCategories = []
    // Object.keys(categories).forEach((key) => {
    //   resultCategories.push({
    //     title: categories[key].title,
    //     limit: categories[key].limit,
    //     id: key
    //   })
    // })
    // return resultCategories

  } catch (e) {
    alert(e)
    throw e
  }
}

export const editCategory = async (id, title, limit) => {
  try {
    const uid = await getUid()
    await firebase.database().ref(`/users/${uid}/categories/`).child(id).update({title, limit})
  } catch (e) {
    alert(e)
  }
}




