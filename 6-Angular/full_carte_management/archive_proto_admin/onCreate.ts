import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

exports.default = functions
    .region('europe-west1')
    .auth.user().onCreate((user) => {
        if(!user.email){
            const statRef = db.doc("anonymous/" + user.uid);
            return statRef.set({
                uid: user.uid,
                placeAttempt: 0,
                orderAttempt: 0,
                createdDate: admin.firestore.FieldValue.serverTimestamp()
            })
        }else{
            return null
        }
    })
