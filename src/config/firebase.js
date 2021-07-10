import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";

export const firebaseHandler = firebase.initializeApp(firebaseConfig);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();