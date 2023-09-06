import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    const app = initializeApp(firebaseConfig);
}

const provider = new GoogleAuthProvider();

 export const handleGoogleSignIn = () => {
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        photo: ''
      }
      return signedOutUser;
    }).catch((err) => {
      console.log(err);
      console.log(err.message);
    });
  }
  export const createUserWithEmailAndPasswordfun = (name , email , password) => {
    const auth = getAuth();
   return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }
  export const signInWithEmailAndPasswordfun = (email , password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = { };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }

  const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: { name }
    }).then(() => {
      console.log(name , "Updated profile");
    }).catch((error) => {
      
    });
  }