const admin = require("firebase-admin");

admin.initializeApp();

exports.counter = require('./feature/counter');
