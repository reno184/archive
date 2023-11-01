import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
// met à jour le compteur stat
exports.default = functions
    .region('europe-west1').firestore
    .document('resto/{restoId}/price/{priceId}')
    .onCreate( async(snapshot, context) => {
        const tab = context.params.priceId.split('_');
        console.log(tab,tab.length)
        let refDocArticle;
        if(tab.length === 4){
            const refDocFormule = db.doc("resto/" + context.params.restoId + "/formule/" + tab[0]);
            const docFormule = await refDocFormule.get();
            // @ts-ignore
            const compositions = docFormule.data().compositions;
            compositions[tab[1]].blocks[tab[2]].counter++;
            await refDocFormule.update({compositions})
            refDocArticle = db.doc("resto/" + context.params.restoId + "/article/"+tab[3]);
        }else{
            const refDocGroup = db.doc("resto/" + context.params.restoId + "/group/" + tab[0]);
            const docGroup = await refDocGroup.get();
            // @ts-ignore
            const blocks = docGroup.data().blocks;
            for (const block of blocks) {
                if (block.id === tab[1]) {
                    block.counter++;
                }
            }
            await refDocGroup.update({blocks});
            refDocArticle = db.doc("resto/" + context.params.restoId + "/article/" + tab[2]);
        }
        return refDocArticle.update({counterBlock: admin.firestore.FieldValue.increment(1)})
    });
