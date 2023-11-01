import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

import cors = require("cors");
import episode from "./feature/episode";
import vocabulary from "./feature/vocabulary";
const app = express();

admin.initializeApp();
// const auth = admin.auth();
const db = admin.firestore();

// todo study and make documentation about npm cors
app.use(cors({origin: "*"}));

app.use((req, res, next) => {
    req.headers["authorization"] ? next() : res.sendStatus(401);
});

/* app.use((req, res, next) => {
  auth.verifyIdToken(req.headers.authorization as string).then((decodedToken) => {
       decodedToken ? next() : res.sendStatus(401);
  });
});*/

app.use("/apiMamba/episode", episode(db).router);
app.use("/apiMamba/vocabulary", vocabulary(db).router);

exports.mambaBlog = functions.https.onRequest(app);
