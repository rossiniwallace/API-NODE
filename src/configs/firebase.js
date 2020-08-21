const firebase = require('firebase');

const config = require('./firebase.json');

const customFirebase = firebase.initializeApp(config);

module.exports = customFirebase;


