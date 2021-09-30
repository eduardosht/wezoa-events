import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export const authConfig = firebase.default.initializeApp({
    apiKey: "AIzaSyA3e8yfl0l4FMCafjiQFuqs-ZEbBSFx5Ik",
    authDomain: "wezoaproject.firebaseapp.com",
    databaseURL: "https://wezoaproject-default-rtdb.firebaseio.com",
    projectId: "wezoaproject",
    storageBucket: "wezoaproject.appspot.com",
    messagingSenderId: "904398044615",
    appId: "1:904398044615:web:9b6367e64d1f2a7974ede2"
});