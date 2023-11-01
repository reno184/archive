import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// met à jour le compteur du parent (question)
exports.default = functions
    .region('europe-west1')
    .firestore.document('resto/{restoId}/question/{questionId}/answer/{answerId}')
    .onDelete((change, context) => {
        const ref = db.collection("resto/" + context.params.restoId + "/question").doc(context.params.questionId);
        return ref.update({counter: admin.firestore.FieldValue.increment(-1)}).catch(err => console.error(err))
    });
