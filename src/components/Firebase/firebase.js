import * as firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    if (process.env.NODE_ENV === 'production') {
      firebase.analytics()
    }

    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => {
    /* Implementaiton to allow Async/Await
       and prevent UnCaught Error
    */
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((userCreds) => resolve(userCreds))
        .catch((reason) => reject(reason));
    });
  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doAddProfileName = name => this.auth.currentUser.updateProfile({
    displayName: name
  })

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    })

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged(authUser => {
    if (authUser) { 
      this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();
          // default empty roles
          if (!dbUser.roles) { 
            dbUser.roles = {};
          }
          
          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };
          next(authUser);
        });
      } else {
        fallback();
      }
    });
  
  // *** User API ***
  
  user = uid => (
    /* Point to different DB based on the environment */
    process.env.NODE_ENV === 'production' ?
      this.db.ref(`users/${uid}`) :
      this.db.ref(`test_users/${uid}`)
  )

  users = () => (
    /* Point to different DB based on the environment */
    process.env.NODE_ENV === 'production' ?
      this.db.ref('users') :
      this.db.ref('test_users')
  )
}

export default Firebase
