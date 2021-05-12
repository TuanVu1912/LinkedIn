import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAygMj9cbqfVQA1JDGrCJa-HXnrvP39cbM",
  authDomain: "linkedin-clone-f1a4c.firebaseapp.com",
  projectId: "linkedin-clone-f1a4c",
  storageBucket: "linkedin-clone-f1a4c.appspot.com",
  messagingSenderId: "40421738878",
  appId: "1:40421738878:web:04d688f75f08616717cb2f",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;
