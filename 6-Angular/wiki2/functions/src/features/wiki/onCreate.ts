
/*
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DocumentData} from '@angular/fire/compat/firestore';

const db = admin.firestore();

exports.default = functions.region('europe-west1').firestore
    .document('wiki/{wikiId}')
    .onCreate((snapshot, context) => {
      const data = snapshot.data();
      const tags: string[] = data.desc.toLowerCase().split(' ');

      return db.runTransaction(async () => {
        const clone = {};
        const element: DocumentData = await db.doc('stats/desc').get();
        for (let i = 0; i < tags.length; i++) {
          for (const [key, value] of Object.entries(element.data())) {
            if (tags[i] === key.toLowerCase() ) {
              clone[key] = value +1;
            } else {
              clone[tags[i]] = 1;
            }
          }
        }
        return db.doc('stats/desc').update(clone);
      });
    });
*/
