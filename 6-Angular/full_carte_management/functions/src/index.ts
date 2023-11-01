import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest(async (request, response) => {
 response.send('hello word !');
});

exports.onCreateAnswer = require('./features/answer/onCreate');
exports.onDeleteAnswer = require('./features/answer/onDelete');
exports.onCreateArticle = require('./features/article/onCreate');
exports.onDeleteArticle = require('./features/article/onDelete');
exports.onUpdateArticle = require('./features/article/onUpdate');
exports.onCreatePrice = require('./features/price/onCreate');
exports.onCreateGroup = require('./features/group/onCreate');
exports.calcCounter = require('./features/httpRequest/calcCounter');
exports.onCreatePrice = require('./features/price/onCreate');
exports.onDeletePrice = require('./features/price/onDelete');
exports.onCreateQuestion = require('./features/question/onCreate');
exports.onDeleteQuestion = require('./features/question/onDelete');
exports.onUpdateQuestion = require('./features/question/onUpdate');

exports.getArticleJSON = require('./features/httpRequest/getArticleJSON');
exports.getCarte = require('./features/httpRequest/getCarte');
exports.getRestoList = require('./features/httpRequest/getRestoList');
