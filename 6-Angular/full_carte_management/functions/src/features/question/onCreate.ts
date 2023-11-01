import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

exports.default = functions
    .region('europe-west1').firestore
    .document('resto/{restoId}/question/{questionId}')
    .onCreate((snapshot, context) => {
        const statRef = db.collection("resto/" + context.params.restoId + "/stat").doc('question');
        return statRef.update({
            counter: admin.firestore.FieldValue.increment(1),
            lastAdded: admin.firestore.FieldValue.serverTimestamp()
        })
    });
