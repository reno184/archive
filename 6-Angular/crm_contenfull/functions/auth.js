const router = require('express').Router();
const admin = require('firebase-admin');
const auth = admin.auth();

const db = admin.firestore();
router.get("/addclaim", (req, res) => {
    db.collection(`crm_contentFul/habilitation/users`).doc(req.decodedToken.uid).get().then(doc => {
        if(doc.exists && !!doc.data().role){
            auth.setCustomUserClaims(req.decodedToken.uid, {
                role: doc.data().role
            }).then(() => res.sendStatus(200))
        }else{
            console.error('user not found')
            res.sendStatus(500)
        }
    })
})

router.get("/removeclaim", (req, res) => {
    auth.setCustomUserClaims(req.decodedToken.uid, {}).then(() => res.sendStatus(200))
})

router.get("/checkclaim", async (req, res) => {
    const userRecord = await auth.getUser(req.decodedToken.uid)
    res.sendStatus(userRecord.customClaims['role'] ? 200 : 404)
})

module.exports = router;
