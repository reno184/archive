import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const auth = admin.auth()
exports.default = functions
    .region('europe-west1')
    .https.onRequest((req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'authorization');
            res.sendStatus(204);
        } else {
            // todo rename basket en order
            // todo voir pour le timeout
            db.runTransaction(async (transaction) => {
                const decotedToken = await auth.verifyIdToken((req.headers && req.headers.authorization) || '');
                if (decotedToken) {
                    const uid = decotedToken.uid;
                    const placeToken = req.query['place-token']
                    // @ts-ignore
                    const placeIdDoc = await transaction.get(db.doc(`placeToken/${placeToken}`));
                    // @ts-ignore
                    if (placeIdDoc.exists) {
                        // @ts-ignore
                        const data = placeIdDoc.data() || {};
                        // note
                        // placeId permet d'authorizer uniuquement les utilisateurs qui ont accès de lire la carte (rules)
                        // zoneId sur un utilisateur permet de mettre à jour les commandes
                        await transaction.update(db.doc("anonymous/" + uid), {
                            placeAttempt: 0,
                            placeId: data.placeId,
                            lastRegister: admin.firestore.FieldValue.serverTimestamp()
                        })
                        return {status: 200, message: 'ok success'}
                    } else {
                        await transaction.update(db.doc("anonymous/" + uid), {
                            placeAttempt: admin.firestore.FieldValue.increment(1)
                        })
                        // todo faire un trigger si plus de deux alors deconnexion
                        return {status: 404, message: 'place-token not found'}
                    }
                } else {
                    return {status: 401, message: 'decotedToken invalid'}
                }

            }).then(rep =>{
                res.status(rep.status).send(rep.message)
            }).catch((err) => {
                console.error(err)
                res.sendStatus(500)
            })
        }
    });

//    https://europe-west1-mambastore-be999.cloudfunctions.net/onPlaceTokenRequest-default?place-id=aaa&place-token=1&uid=hOHzs5oeZWN5pcXj03rfG21aeDj1
