// Seu código Firebase aqui
const firebaseConfig = {
    apiKey: "AIzaSyDBKDij3FmaFcU_AL9C-Nu03potbxjBAJk",
    authDomain: "cb-doacoes.firebaseapp.com",
    databaseURL: "https://cb-doacoes-default-rtdb.firebaseio.com",
    projectId: "cb-doacoes",
    storageBucket: "cb-doacoes.appspot.com",
    messagingSenderId: "247415912881",
    appId: "1:247415912881:web:012ccb16f3f7124f98e590",
    measurementId: "G-H77Z5LHL59"
};

firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados
const database = firebase.database();