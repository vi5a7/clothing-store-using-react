import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAWziegEpShkyi_x3NuJBlNhHSs8xsuNVY",
    authDomain: "clothing-store-b7336.firebaseapp.com",
    projectId: "clothing-store-b7336",
    storageBucket: "clothing-store-b7336.appspot.com",
    messagingSenderId: "343772512890",
    appId: "1:343772512890:web:502c7ac6008d7d6baff1c3"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    if(!snapShot.exists){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase