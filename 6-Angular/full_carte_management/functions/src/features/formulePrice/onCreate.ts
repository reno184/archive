import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// met à jour le compteur stat
exports.default = functions
    .region('europe-west1').firestore
    .document('resto/{restoId}/formule/{formuleId}/composition/{compositionId}/block/{blockId}/article/{articleId}')
    .onCreate(async (snapshot, context) => {
        const ref = db.doc("resto/" + context.params.restoId + "/formule/" + context.params.formuleId);
        const docFormule = await ref.get();
        // @ts-ignore
        const compositions = docFormule.data().compositions;
        compositions[context.params.compositionId].blocks[context.params.blockId].counter++;
        await ref.update({compositions})
        // @ts-ignore
        await db.doc("resto/" + context.params.restoId + "/article/" + context.params.articleId).update({counterBlock: admin.firestore.FieldValue.increment(1)})
        // @ts-ignore

        return db.doc("resto/" + context.params.restoId + "/article/" + context.params.articleId + '/block/' + context.params.blockId).set({
            id: context.params.blockId,
            name: (docFormule.data() || {}).name,
            ref: `resto/${context.params.restoId}/formule/${context.params.formuleId}/composition/${context.params.compositionId}/block/${context.params.blockId}/article/${context.params.articleId}`
        })


    });
