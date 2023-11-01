/*
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

exports.default = functions
    .region('europe-west1')
    .auth.user().onDelete((user) => {
        return db.doc("anonymous/" + user.uid).delete();
    })
*/


import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const auth = admin.auth();
exports.default = functions
    .region('europe-west1').firestore
    .document('anonymous/{anonymousId}')
    .onDelete((snapshot, context) => {
        return auth.deleteUser(context.params.anonymousId);
    });
