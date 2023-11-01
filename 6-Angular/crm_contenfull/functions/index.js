const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp();
const auth = admin.auth();

//  const middleware = require('./middleware'); 
const app = express();

app.use(cors);

app.use((req, res, next) => {
    if (req.headers['authorization']) {
        next()
    } else {
        res.status(402).send('headers failed')
    }
});

app.use((req, res, next) => {
        auth.verifyIdToken(req.headers['authorization']).then((decodedToken) => {
            if (decodedToken) {
                req.decodedToken = decodedToken
                next()
            } else {
                res.status(401).send('toke invalid')
            }
        });
});

app.use('/auth', require('./auth'));

app.use((req, res, next) => {
    if (req.decodedToken.role) {
        next()
    } else {
        res.sendStatus(401)
    }
});

app.use('/contentful', require('./routerFeature'));

app.get('', (req, res) => {
    res.sendStatus(200)
});

app.get('*', (req, res, next) => {
    res.sendStatus(404)
});

exports.crmContentFul = functions.https.onRequest(app);
exports.copyImage = require('./copyImage');
exports.test = require('./test');
// exports.resizeImg = require('./resizeImg');
// exports.deleteImg = require('./deleteImg');
