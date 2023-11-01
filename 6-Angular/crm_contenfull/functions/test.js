const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const fs = require('fs');
// permet de lancer des processus en asynchrone un peu comme une requête ajax côté front
const spawn = require('child-process-promise').spawn;

const storage = new Storage()


module.exports = functions.storage.object().onFinalize(async (object, context) => {
    const bucket = storage.bucket(object.bucket);
    const srcFilePath = object.name; // File path in the bucket.
    console.log('*******',object.name)
    console.log('--------',bucket.file(srcFilePath).type);
    return;
});
