import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// met à jour le compteur des stats
exports.default = functions
    .region('europe-west1')
    .firestore.document('resto/{restoId}/article/{articleId}')
    .onCreate((snapshot, context) => {
        const statRef = db.collection("resto/" + context.params.restoId + "/stat").doc('article');
        return statRef.update({
            counter: admin.firestore.FieldValue.increment(1)
        })
    });

