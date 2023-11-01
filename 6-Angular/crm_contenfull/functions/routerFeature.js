const router = require('express').Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const sanitizeHtml = require('sanitize-html');
const _s = require("underscore.string");
const allowedTags = ['p', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4'];

const getUrl = (req) => {
    return `crm_contentFul/${req.params.feature}/items`;
}


router.get("/list/:feature", async (req, res) => {
    const snapshot = await db.collection(getUrl(req)).orderBy('rank').get();
    const re = {}
    snapshot.forEach(doc => {
        re[doc.id] = doc.data();
    })
    res.status(200).json(re);
});
//todo revoir comment fonctionne le sanitize (allowed tags) et voir comment arrive à ajouter la lessaon
router.post("/add/:feature", async (req, res) => {
    const newId = Date.now().toString();

    console.log('-------------req params features----------', req.params.feature)

    const obj = {
        "title-US": sanitizeHtml(req.body['title-US'], {allowedTags: false}),
        "title-DE": sanitizeHtml(req.body['title-DE'], {allowedTags: false}),
        "slug": _s.slugify(req.body['slug']),
        "rank": 0,
        "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
    };

    if (req.params.feature === "lesson") {
        obj['parent-course'] = parseInt(req.body['parent-course'])
    } else {
        obj['short-description-US'] = sanitizeHtml(req.body['short-description-US'], {allowedTags: false});
        obj['short-description-DE'] = sanitizeHtml(req.body['short-description-DE'], {allowedTags: false});
        obj['description-US'] = sanitizeHtml(req.body['description-US'], {allowedTags: allowedTags});
        obj['description-DE'] = sanitizeHtml(req.body['description-DE'], {allowedTags: allowedTags});
        obj['duration'] = parseInt(req.body['duration']);
        obj['categories'] = req.body['categories'];
        obj['levels'] = req.body['levels'];
        obj['thumbPath'] = req.body['thumbPath'];
        obj['imgPath'] = req.body['imgPath'];
    }

    console.log('-------------req params obj----------', obj)
    await db.collection(getUrl(req)).doc(newId).set(obj);
    res.status(200).json(Object.assign({id: newId}, obj));
});

router.post("/sort/:feature", async (req, res) => {
    const batch = db.batch();
    req.body.forEach(item => {
        batch.update(db.collection(getUrl(req)).doc(item.id), {rank: item.rank});
    })
    await batch.commit();
    res.sendStatus(200);
});

router.put("/update/:feature/:id", async (req, res) => {
    await db.collection(getUrl(req)).doc(req.params.id).update(req.body);
    res.sendStatus(200);
});

router.delete("/delete/:feature/:id", async (req, res) => {
    await db.collection(getUrl(req)).doc(req.params.id).delete()
    res.sendStatus(200);
});

module.exports = router;
