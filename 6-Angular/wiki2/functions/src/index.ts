
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.onCreateAnswer = require('./features/referers/onCreate');
exports.getCounter = require('./features/counter/onRequest');
exports.onCreateWiki = require('./features/wiki/onCreate');
exports.onDeleteWiki = require('./features/wiki/onDelete');
exports.onUpdateWiki = require('./features/wiki/onUpdate');

exports.getCollection = require('./features/counter/collection');
