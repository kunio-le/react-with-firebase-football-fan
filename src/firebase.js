import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyCGNSUPWcuE8Q-KSidj2js3zdrWwKSe4XQ',
    authDomain: 'mancity-9d731.firebaseapp.com',
    databaseURL: 'https://mancity-9d731.firebaseio.com',
    projectId: 'mancity-9d731',
    storageBucket: 'mancity-9d731.appspot.com',
    messagingSenderId: '740693463725'
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();

const matchesData = firebaseDB.ref('matches');

const promotionsData = firebaseDB.ref('promotions');

const teamsData = firebaseDB.ref('teams');

export { firebase, matchesData, promotionsData, teamsData, firebaseDB };
