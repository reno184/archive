import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const auth = admin.auth();

//

exports.default = functions
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET,POST');
            res.set('Access-Control-Allow-Headers', 'authorization, content-type');
            res.sendStatus(204);
        } else {
            if(req.headers && req.headers.authorization){
                const decotedToken = await auth.verifyIdToken((req.headers && req.headers.authorization) || '');
                if (decotedToken && decotedToken.uid) {
                    if (req.query['order-token']) {
                        const refdocUser = db.doc('anonymous/' + decotedToken.uid);
                        const docUser = await refdocUser.get();
                        if (docUser.exists) {
                            const tokenRef = db.doc('orderToken/' + req.query['order-token'])
                            const tokenDoc = await tokenRef.get();
                            if (tokenDoc.exists) {
                                const placeId = (tokenDoc.data() || {}).placeId;
                                const zoneId = (tokenDoc.data() || {}).zoneId;
                                const zoneRef = db.doc(`resto/${placeId}/zone/${zoneId}`);
                                try {
                                    // note la transaction ne sert qu'a ajouter la nouvelle commande à la liste des commandes de la table
                                    await db.runTransaction(async (transaction) => {
                                        const zoneDoc = await transaction.get(zoneRef)
                                        // si la place assise correspondant à l'ancien order-code existe dans le restaurant
                                        if (zoneDoc.exists) {
                                            // User anonymous  mise-à-jour de la dernière date de commande,
                                            // compteur de tentative remi à zero
                                            transaction.update(refdocUser, {
                                                orderAuthenticated: admin.firestore.FieldValue.serverTimestamp(),
                                                orderAttempt: 0
                                            })
                                            // ajoute la nouvelle commande à la liste des commandes de la zone (table)
                                            const newToken = `
                                            ${Math.floor(Math.random() * 10)}
                                            ${Math.floor(Math.random() * 10)}
                                            ${Math.floor(Math.random() * 10)}
                                            ${Math.floor(Math.random() * 10)}`;
                                            const orders = (zoneDoc.data() || {}).orders || {}
                                            const orderId = Date.now()
                                            orders[orderId] = {
                                                data: req.body,
                                                ordered: admin.firestore.FieldValue.serverTimestamp(),
                                                anonymousId: decotedToken.uid
                                            }
                                            // note
                                            transaction.update(zoneRef, {
                                                token: newToken,
                                                counter: admin.firestore.FieldValue.increment(1),
                                                orders
                                            })
                                            // 2- Regénération d'un nouveau code
                                            transaction.set(db.doc(`orderToken/${newToken}`), {
                                                placeId,
                                                zoneId,
                                            });
                                            // 3-ajout de la commande au panier du user
                                            transaction.set(refdocUser.collection('orders').doc(orderId.toString()), {
                                                ordered: admin.firestore.FieldValue.serverTimestamp(),
                                                status: 0,
                                                data: req.body
                                            });
                                            return 'transaction update user, zone (table) ang add newtoken before delete are ok'
                                        } else {
                                            throw new Error('Zone (table) not found');
                                        }
                                    });
                                    await tokenRef.delete()
                                    res.sendStatus(200);
                                } catch (e) {
                                    // zone table not found
                                    res.sendStatus(501);
                                }
                            } else {
                                // order code not found
                                await refdocUser.update({
                                    orderAttempt: admin.firestore.FieldValue.increment(1)
                                })
                                res.sendStatus(403);
                            }
                        } else {
                            // User anonymmous not exists
                            res.sendStatus(404);
                        }
                    } else {
                        // req query params order-token missing
                        res.sendStatus(401);
                    }
                } else {
                    // token not valid
                    res.sendStatus(401)
                }
            }else{
                // req header authorization missing
                res.sendStatus(401)
            }
        }
    });
