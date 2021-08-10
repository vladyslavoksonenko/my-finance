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

const getUid = async () => {
  const user = await auth.currentUser
  return user ? user.uid : null
}

// Получаю Инфу из БД про Юзера

export const getUserData = () => {
  const userData = ref({})
  const isLoadingUserData = ref(true)
  const fetch = async () => {
    try {
      const uid = await getUid()
      userData.value = await (await firebase.database().ref(`/users/${uid}/info/`).once('value')).val()

    } catch (e) {
      alert("Error:")
    }
  }

  onMounted(fetch)

  isLoadingUserData.value = false;
  return { userData, isLoadingUserData}
}


// Category

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

export const getCategories = () => {
  const categories = ref(null)
  const isLoadingCategories = ref(true)
  const fetch = async () => {
    try {
      const uid = await getUid()
      const res = await ((await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()) || {}
      categories.value = Object.keys(res).map(key => ({...res[key], id: key}))
      isLoadingCategories.value = false
      // Одно и тоже (Спред)
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
  onMounted(fetch)

  return { isLoadingCategories, categories }
}

export const editCategory = async (id, title, limit) => {
  try {
    const uid = await getUid()
    await firebase.database().ref(`/users/${uid}/categories/`).child(id).update({title, limit})
  } catch (e) {
    alert(e)
  }
}

export const deletedCategories = async (id) => {
  try {
    const uid = await getUid()
    await firebase.database().ref(`/users/${uid}/categories/`).child(id).remove()
  } catch (e) {
    alert(e)
  }
}

// NewEntry

export const newEntry = async (operation, resultOperation) => {
  try {
    const uid = await getUid()
    await firebase.database().ref(`/users/${uid}/info/`).update({bill: resultOperation})
    await firebase.database().ref(`/users/${uid}/operations`).push({ ...operation })

  } catch (e) {
    alert(e)
  }
}

export const getEntries = () => {
  const operations = ref(null)
  const isLoadingOperations = ref(true)

  const fetch = async () => {
    try {
      const uid = await getUid()
      const res = await ((await firebase.database().ref(`/users/${uid}/operations`).once('value')).val()) || {}
      operations.value = Object.keys(res).map(key => ({...res[key], id: key}))
      isLoadingOperations.value = false

    } catch (e) {
      alert(e)
    }
  }

  onMounted(fetch)

  return {operations, isLoadingOperations}
}

//
// export default class FirebaseServer {
//   constructor(options) {
//     this.auth = firebase.auth()
//   }
//
//
//
// }





