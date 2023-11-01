import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// met à jour le compteur stat
exports.default = functions
    .region('europe-west1').firestore
    .document('resto/{restoId}/group/{groupId}/block/{blockId}/article/{articleId}')
    .onCreate(async (snapshot, context) => {
        const ref = db.doc("resto/" + context.params.restoId + "/group/" + context.params.groupId);
        const docGroup = await ref.get();
        // @ts-ignore
        const blocks = docGroup.data().blocks;
        blocks[context.params.blockId].counter++;
        await ref.update({blocks})
        // @ts-ignore
        await db.doc("resto/" + context.params.restoId + "/article/" + context.params.articleId).update({counterBlock: admin.firestore.FieldValue.increment(1)})
        // @ts-ignore
        return db.doc("resto/" + context.params.restoId + "/article/" + context.params.articleId + '/block/' + context.params.blockId).set({
            id: context.params.blockId,
            name: blocks[context.params.blockId].name,
            ref: `resto/${context.params.restoId}/group/${context.params.groupId}/block/${context.params.blockId}/article/${context.params.articleId}`
        })

    });
