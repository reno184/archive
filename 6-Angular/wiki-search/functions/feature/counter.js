const functions  = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

module.exports  = functions.https.onRequest( async (req, res) => {
    let i = 0;
    const snapShot = await db.collection('anonymous').get()
    snapShot.forEach(element  =>{
        i++;
    })
    console.log('------------',i)
    res.send({ result: i.toString()}).status(200)
});
