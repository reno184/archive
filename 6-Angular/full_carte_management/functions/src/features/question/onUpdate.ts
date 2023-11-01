import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// change le nom dans la question dans tous les articles concernés
exports.default = functions
    .region('europe-west1').firestore
    .document('resto/{restoId}/question/{questionId}')
    .onUpdate((change, context) => {
        // vérification si on change le libelle d'une question
        if (change.before.data().name !== change.after.data().name) {
            const questionId = context.params.questionId;
            return db.runTransaction(async (transaction) => {
                const snapshot = await transaction.get(db.collection("resto/" + context.params.restoId + "/article"));
                // on parcour tous les articles
                snapshot.forEach(doc => {
                    const datas = doc.data();
                    // si l'article possède une question qui a changé de libellé
                    if (datas.questions && datas.questions[questionId]) {
                        const questions = datas.questions;
                        questions[questionId].name = change.after.data().name;
                        transaction.update(db.collection("resto/" + context.params.restoId + "/article").doc(doc.id), {questions});
                    }
                })
            }).then(() => console.log('Transaction success!'))
                .catch((e) => console.log('Transaction failure:', e))
        } else {
            console.log("No Update article name");
            return Promise.resolve()
        }
    });
