import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const auth = admin.auth();

exports.default = functions
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'authorization');
            res.status(204).send('');
        } else {
            const decotedToken = await auth.verifyIdToken((req.headers && req.headers.authorization) || '');
            if (decotedToken.uid) {
                const snapshot = await db.collection('resto' ).get();
                const temp:any = [];
                // @ts-ignore
                snapshot.forEach(doc=>{
                    temp.push({id : doc.id, name : doc.id})
                })
                res.status(200).json(temp)
            } else {
                res.status(401).send('decodedtoken invalid')
            }
        }
    });
