const functions = require("firebase-functions");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
});

app.use(bodyParser.json());
app.use(cors({ origin: '*'}));
app.use('/', require('./apiRouter'));

// valid http://localhost:5001/dev-mamba/us-central1/apimamba/carte
exports.apimamba = functions.https.onRequest(app);
