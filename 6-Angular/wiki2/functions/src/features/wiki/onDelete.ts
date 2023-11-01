import * as functions from 'firebase-functions';
import {DocumentData} from '@angular/fire/compat/firestore';
import * as admin from 'firebase-admin';

const db = admin.firestore();

exports.default = functions.region('europe-west1').firestore
    .document('wiki/{wikiId}')
    .onDelete((snapshot) => {
      const data = snapshot.data();
      const tags: string[] = data.desc.toLowerCase().split(' ');

      return db.runTransaction(async () => {
        const element: DocumentData = await db.doc('stats/desc').get();
        const clone = {...element.data()};

        for (let i = 0; i < tags.length; i++) {
          for (const [key, value] of Object.entries(element.data())) {
            if (tags.includes(key.toLowerCase())) {
              clone[key] = value as number -1;
            }
          }
        }

        return db.doc('stats/desc').update(clone);
      });
    });
